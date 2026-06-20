import { asc, eq } from "drizzle-orm";

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

export async function getBranchBySlug(
  slug: string
): Promise<BranchMenuData | null> {
  const [branch] = await db
    .select()
    .from(branches)
    .where(eq(branches.slug, slug))
    .limit(1);

  if (!branch || !branch.isActive) return null;

  return getBranchMenuData(branch.id);
}

export async function getBranchMenuData(
  branchId: string
): Promise<BranchMenuData | null> {
  const [branch] = await db
    .select()
    .from(branches)
    .where(eq(branches.id, branchId))
    .limit(1);

  if (!branch) return null;

  const [config] = await db
    .select()
    .from(menuConfigs)
    .where(eq(menuConfigs.branchId, branchId))
    .limit(1);

  const links = await db
    .select()
    .from(socialLinks)
    .where(eq(socialLinks.branchId, branchId))
    .orderBy(asc(socialLinks.displayOrder));

  const pages = await db
    .select()
    .from(menuPages)
    .where(eq(menuPages.branchId, branchId))
    .orderBy(asc(menuPages.displayOrder));

  const pagesData = await Promise.all(
    pages.map(async (page) => {
      const cats = await db
        .select()
        .from(categories)
        .where(eq(categories.pageId, page.id))
        .orderBy(asc(categories.displayOrder));

      const catsWithItems = await Promise.all(
        cats.map(async (cat) => {
          const items = await db
            .select()
            .from(menuItems)
            .where(eq(menuItems.categoryId, cat.id))
            .orderBy(asc(menuItems.displayOrder));

          return {
            id: cat.id,
            nameMr: cat.nameMr,
            nameEn: cat.nameEn,
            columnSide: cat.columnSide,
            displayOrder: cat.displayOrder,
            isVisible: cat.isVisible,
            items: items.map((item) => ({
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
        })
      );

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
    })
  );

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
