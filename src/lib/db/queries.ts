import { asc, eq, inArray } from "drizzle-orm";
import { cache } from "react";

import { db } from "./index";
import {
  branches,
  categories,
  menuConfigs,
  menuItems,
  menuPages,
  socialLinks,
} from "./schema";
import type { BranchMenuData } from "../types/menu";

/**
 * Cached version — React deduplicates calls with the same slug
 * within a single request (generateMetadata + page render).
 */
export const getBranchBySlug = cache(
  async (slug: string): Promise<BranchMenuData | null> => {
    const [branch] = await db
      .select()
      .from(branches)
      .where(eq(branches.slug, slug))
      .limit(1);

    if (!branch || !branch.isActive) return null;

    return getBranchMenuData(branch.id);
  }
);

export async function getBranchMenuData(
  branchId: string
): Promise<BranchMenuData | null> {
  // 1. Fetch branch, config, social links, and pages IN PARALLEL
  const [branchResult, configResult, links, pages] = await Promise.all([
    db.select().from(branches).where(eq(branches.id, branchId)).limit(1),
    db
      .select()
      .from(menuConfigs)
      .where(eq(menuConfigs.branchId, branchId))
      .limit(1),
    db
      .select()
      .from(socialLinks)
      .where(eq(socialLinks.branchId, branchId))
      .orderBy(asc(socialLinks.displayOrder)),
    db
      .select()
      .from(menuPages)
      .where(eq(menuPages.branchId, branchId))
      .orderBy(asc(menuPages.displayOrder)),
  ]);

  const branch = branchResult[0];
  const config = configResult[0];
  if (!branch) return null;

  // 2. If there are pages, fetch ALL categories for ALL pages in ONE query
  let allCategories: (typeof categories.$inferSelect)[] = [];
  if (pages.length > 0) {
    const pageIds = pages.map((p) => p.id);
    allCategories = await db
      .select()
      .from(categories)
      .where(inArray(categories.pageId, pageIds))
      .orderBy(asc(categories.displayOrder));
  }

  // 3. If there are categories, fetch ALL items for ALL categories in ONE query
  let allItems: (typeof menuItems.$inferSelect)[] = [];
  if (allCategories.length > 0) {
    const catIds = allCategories.map((c) => c.id);
    allItems = await db
      .select()
      .from(menuItems)
      .where(inArray(menuItems.categoryId, catIds))
      .orderBy(asc(menuItems.displayOrder));
  }

  // 4. Group items by categoryId (in-memory, instant)
  const itemsByCategoryId = new Map<
    string,
    (typeof menuItems.$inferSelect)[]
  >();
  for (const item of allItems) {
    const list = itemsByCategoryId.get(item.categoryId) ?? [];
    list.push(item);
    itemsByCategoryId.set(item.categoryId, list);
  }

  // 5. Group categories by pageId (in-memory, instant)
  const catsByPageId = new Map<
    string,
    (typeof categories.$inferSelect)[]
  >();
  for (const cat of allCategories) {
    const list = catsByPageId.get(cat.pageId) ?? [];
    list.push(cat);
    catsByPageId.set(cat.pageId, list);
  }

  // 6. Assemble final data — zero DB calls, pure in-memory mapping
  const pagesData = pages.map((page) => {
    const pageCats = catsByPageId.get(page.id) ?? [];

    const catsWithItems = pageCats.map((cat) => {
      const catItems = itemsByCategoryId.get(cat.id) ?? [];
      return {
        id: cat.id,
        nameMr: cat.nameMr,
        nameEn: cat.nameEn,
        columnSide: cat.columnSide,
        displayOrder: cat.displayOrder,
        isVisible: cat.isVisible,
        items: catItems.map((item) => ({
          id: item.id,
          nameMr: item.nameMr,
          nameEn: item.nameEn,
          descriptionMr: item.descriptionMr,
          descriptionEn: item.descriptionEn,
          price: item.price,
          isVeg: item.isVeg,
          isAvailable: item.isAvailable,
          imageUrl: item.imageUrl,
          displayOrder: item.displayOrder,
        })),
      };
    });

    return {
      id: page.id,
      titleMr: page.titleMr,
      titleEn: page.titleEn,
      category: page.category,
      bottomTextMr: page.bottomTextMr,
      bottomTextEn: page.bottomTextEn,
      image1Url: page.image1Url,
      image2Url: page.image2Url,
      displayOrder: page.displayOrder,
      leftColumn: catsWithItems.filter((c) => c.columnSide === "left"),
      rightColumn: catsWithItems.filter((c) => c.columnSide === "right"),
    };
  });

  return {
    id: branch.id,
    slug: branch.slug,
    nameMr: branch.nameMr,
    nameEn: branch.nameEn,
    taglineMr: branch.taglineMr ?? "",
    taglineEn: branch.taglineEn ?? "",
    sinceMr: branch.sinceMr ?? "",
    sinceEn: branch.sinceEn ?? "",
    proprietorMr: branch.proprietorMr ?? "",
    proprietorEn: branch.proprietorEn ?? "",
    brandLogoText: branch.brandLogoText ?? "Aaasvaad",
    addressMr: branch.addressMr ?? "",
    addressEn: branch.addressEn ?? "",
    phone: branch.phone ?? "",
    socialLinks: links.map((l) => ({
      id: l.id,
      platform: l.platform,
      labelMr: l.labelMr,
      labelEn: l.labelEn,
      url: l.url,
      displayOrder: l.displayOrder,
    })),
    pages: pagesData,
    config: {
      bgImageUrl: config?.bgImageUrl ?? null,
      fontFamily: config?.fontFamily ?? "Noto Sans Devanagari",
      primaryColor: config?.primaryColor ?? "#8B1A1A",
      secondaryColor: config?.secondaryColor ?? "#D4A517",
      accentColor: config?.accentColor ?? "#FFF8E7",
    },
  };
}

export async function getBranchForAdmin(userId: string, role: string) {
  if (role === "superadmin") return null;

  const [branch] = await db
    .select()
    .from(branches)
    .where(eq(branches.adminId, userId))
    .limit(1);

  return branch ?? null;
}

export async function getAllBranches() {
  return db.select().from(branches).orderBy(asc(branches.nameMr));
}

export async function getBranchStats(branchId: string) {
  const data = await getBranchMenuData(branchId);
  if (!data) {
    return { categories: 0, items: 0, available: 0, unavailable: 0, pages: 0 };
  }

  let items = 0;
  let available = 0;
  let categoriesCount = 0;

  for (const page of data.pages) {
    for (const col of [...page.leftColumn, ...page.rightColumn]) {
      categoriesCount++;
      for (const item of col.items) {
        items++;
        if (item.isAvailable) available++;
      }
    }
  }

  return {
    categories: categoriesCount,
    items,
    available,
    unavailable: items - available,
    pages: data.pages.length,
  };
}

export async function getAllUsers() {
  const { users } = await import("./schema");
  return db.select().from(users).orderBy(asc(users.name));
}
