"use server";

import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

import {
  assertBranchAccess,
  requireAuth,
  requireSuperAdmin,
} from "@/lib/auth-helpers";
import { ADMIN_BRANCH_COOKIE, MAX_SOCIAL_LINKS } from "@/lib/constants";
import { db } from "@/lib/db";
import { getBranchMenuData } from "@/lib/db/queries";
import {
  branches,
  categories,
  menuConfigs,
  menuItems,
  menuPages,
  socialLinks,
  users,
} from "@/lib/db/schema";

const branchInfoSchema = z.object({
  branchId: z.string().uuid(),
  nameMr: z.string().min(1),
  nameEn: z.string().min(1),
  taglineMr: z.string().optional(),
  taglineEn: z.string().optional(),
  sinceMr: z.string().optional(),
  sinceEn: z.string().optional(),
  proprietorMr: z.string().optional(),
  proprietorEn: z.string().optional(),
  brandLogoText: z.string().optional(),
  addressMr: z.string().optional(),
  addressEn: z.string().optional(),
  phone: z.string().optional(),
});

export async function updateBranchInfo(data: z.infer<typeof branchInfoSchema>) {
  await assertBranchAccess(data.branchId);
  const parsed = branchInfoSchema.parse(data);

  await db
    .update(branches)
    .set({
      nameMr: parsed.nameMr,
      nameEn: parsed.nameEn,
      taglineMr: parsed.taglineMr,
      taglineEn: parsed.taglineEn,
      sinceMr: parsed.sinceMr,
      sinceEn: parsed.sinceEn,
      proprietorMr: parsed.proprietorMr,
      proprietorEn: parsed.proprietorEn,
      brandLogoText: parsed.brandLogoText,
      addressMr: parsed.addressMr,
      addressEn: parsed.addressEn,
      phone: parsed.phone,
    })
    .where(eq(branches.id, parsed.branchId));

  revalidateBranch(parsed.branchId);
  return { success: true };
}

const configSchema = z.object({
  branchId: z.string().uuid(),
  fontFamily: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  bgImageUrl: z.string().nullable().optional(),
});

export async function updateMenuConfig(data: z.infer<typeof configSchema>) {
  await assertBranchAccess(data.branchId);
  const parsed = configSchema.parse(data);

  await db
    .update(menuConfigs)
    .set({
      fontFamily: parsed.fontFamily,
      primaryColor: parsed.primaryColor,
      secondaryColor: parsed.secondaryColor,
      accentColor: parsed.accentColor,
      bgImageUrl: parsed.bgImageUrl,
      updatedAt: new Date(),
    })
    .where(eq(menuConfigs.branchId, parsed.branchId));

  revalidateBranch(parsed.branchId);
  return { success: true };
}

const socialLinkSchema = z.object({
  id: z.string().uuid().optional(),
  branchId: z.string().uuid(),
  platform: z.enum([
    "instagram",
    "zomato",
    "swiggy",
    "facebook",
    "whatsapp",
    "website",
    "custom",
  ]),
  labelMr: z.string().min(1),
  labelEn: z.string().min(1),
  url: z.string().url(),
  displayOrder: z.number().int().min(0),
});

export async function saveSocialLinks(
  branchId: string,
  links: Omit<z.infer<typeof socialLinkSchema>, "branchId">[]
) {
  await assertBranchAccess(branchId);

  if (links.length > MAX_SOCIAL_LINKS) {
    return { error: `Maximum ${MAX_SOCIAL_LINKS} social links allowed` };
  }

  await db.delete(socialLinks).where(eq(socialLinks.branchId, branchId));

  for (const link of links) {
    const parsed = socialLinkSchema.parse({ ...link, branchId });
    await db.insert(socialLinks).values({
      branchId: parsed.branchId,
      platform: parsed.platform,
      labelMr: parsed.labelMr,
      labelEn: parsed.labelEn,
      url: parsed.url,
      displayOrder: parsed.displayOrder,
    });
  }

  revalidateBranch(branchId);
  return { success: true };
}

const pageSchema = z.object({
  branchId: z.string().uuid(),
  titleMr: z.string().min(1),
  titleEn: z.string().min(1),
  category: z.enum(["veg", "non-veg"]),
  bottomTextMr: z.string().optional(),
  bottomTextEn: z.string().optional(),
  image1Url: z.string().nullable().optional(),
  image2Url: z.string().nullable().optional(),
  displayOrder: z.number().int(),
});

export async function createMenuPage(data: z.infer<typeof pageSchema>) {
  await assertBranchAccess(data.branchId);
  const parsed = pageSchema.parse(data);

  const [page] = await db
    .insert(menuPages)
    .values(parsed)
    .returning({ id: menuPages.id });

  revalidateBranch(parsed.branchId);
  return { success: true, id: page.id };
}

export async function updateMenuPage(
  pageId: string,
  branchId: string,
  data: Partial<z.infer<typeof pageSchema>>
) {
  await assertBranchAccess(branchId);

  await db
    .update(menuPages)
    .set({
      titleMr: data.titleMr,
      titleEn: data.titleEn,
      category: data.category,
      bottomTextMr: data.bottomTextMr,
      bottomTextEn: data.bottomTextEn,
      image1Url: data.image1Url,
      image2Url: data.image2Url,
      displayOrder: data.displayOrder,
    })
    .where(eq(menuPages.id, pageId));

  revalidateBranch(branchId);
  return { success: true };
}

export async function deleteMenuPage(pageId: string, branchId: string) {
  await assertBranchAccess(branchId);
  await db.delete(menuPages).where(eq(menuPages.id, pageId));
  revalidateBranch(branchId);
  return { success: true };
}

const categorySchema = z.object({
  pageId: z.string().uuid(),
  branchId: z.string().uuid(),
  nameMr: z.string().min(1),
  nameEn: z.string().min(1),
  columnSide: z.enum(["left", "right"]),
  displayOrder: z.number().int(),
});

export async function createCategory(data: z.infer<typeof categorySchema>) {
  await assertBranchAccess(data.branchId);
  const parsed = categorySchema.parse(data);

  const [cat] = await db
    .insert(categories)
    .values({
      pageId: parsed.pageId,
      nameMr: parsed.nameMr,
      nameEn: parsed.nameEn,
      columnSide: parsed.columnSide,
      displayOrder: parsed.displayOrder,
    })
    .returning({ id: categories.id });

  revalidateBranch(parsed.branchId);
  return { success: true, id: cat.id };
}

export async function updateCategory(
  categoryId: string,
  branchId: string,
  data: { nameMr: string; nameEn: string; columnSide?: "left" | "right"; isVisible?: boolean }
) {
  await assertBranchAccess(branchId);

  await db
    .update(categories)
    .set({
      nameMr: data.nameMr,
      nameEn: data.nameEn,
      columnSide: data.columnSide,
      isVisible: data.isVisible,
    })
    .where(eq(categories.id, categoryId));

  revalidateBranch(branchId);
  return { success: true };
}

export async function deleteCategory(categoryId: string, branchId: string) {
  await assertBranchAccess(branchId);
  await db.delete(categories).where(eq(categories.id, categoryId));
  revalidateBranch(branchId);
  return { success: true };
}

const itemSchema = z.object({
  categoryId: z.string().uuid(),
  branchId: z.string().uuid(),
  nameMr: z.string().min(1),
  nameEn: z.string().min(1),
  descriptionMr: z.string().optional(),
  descriptionEn: z.string().optional(),
  price: z.number().int().positive(),
  isVeg: z.boolean(),
  isAvailable: z.boolean(),
  displayOrder: z.number().int(),
});

export async function createMenuItem(data: z.infer<typeof itemSchema>) {
  await assertBranchAccess(data.branchId);
  const parsed = itemSchema.parse(data);

  const [item] = await db
    .insert(menuItems)
    .values({
      categoryId: parsed.categoryId,
      nameMr: parsed.nameMr,
      nameEn: parsed.nameEn,
      descriptionMr: parsed.descriptionMr,
      descriptionEn: parsed.descriptionEn,
      price: parsed.price,
      isVeg: parsed.isVeg,
      isAvailable: parsed.isAvailable,
      displayOrder: parsed.displayOrder,
    })
    .returning({ id: menuItems.id });

  revalidateBranch(parsed.branchId);
  return { success: true, id: item.id };
}

export async function updateMenuItem(
  itemId: string,
  branchId: string,
  data: Partial<Omit<z.infer<typeof itemSchema>, "categoryId" | "branchId">>
) {
  await assertBranchAccess(branchId);

  await db
    .update(menuItems)
    .set({
      nameMr: data.nameMr,
      nameEn: data.nameEn,
      descriptionMr: data.descriptionMr,
      descriptionEn: data.descriptionEn,
      price: data.price,
      isVeg: data.isVeg,
      isAvailable: data.isAvailable,
      displayOrder: data.displayOrder,
    })
    .where(eq(menuItems.id, itemId));

  revalidateBranch(branchId);
  return { success: true };
}

export async function deleteMenuItem(itemId: string, branchId: string) {
  await assertBranchAccess(branchId);
  await db.delete(menuItems).where(eq(menuItems.id, itemId));
  revalidateBranch(branchId);
  return { success: true };
}

export async function saveFullMenu(branchId: string, payload: string) {
  await assertBranchAccess(branchId);
  const data = JSON.parse(payload) as Awaited<ReturnType<typeof getBranchMenuData>>;

  if (!data) return { error: "Invalid data" };

  for (const page of data.pages) {
    await db
      .update(menuPages)
      .set({
        titleMr: page.titleMr,
        titleEn: page.titleEn,
        category: page.category,
        bottomTextMr: page.bottomTextMr,
        bottomTextEn: page.bottomTextEn,
        image1Url: page.image1Url,
        image2Url: page.image2Url,
        displayOrder: page.displayOrder,
      })
      .where(eq(menuPages.id, page.id));

    for (const col of [...page.leftColumn, ...page.rightColumn]) {
      await db
        .update(categories)
        .set({
          nameMr: col.nameMr,
          nameEn: col.nameEn,
          columnSide: col.columnSide,
          displayOrder: col.displayOrder,
          isVisible: col.isVisible,
        })
        .where(eq(categories.id, col.id));

      for (const item of col.items) {
        await db
          .update(menuItems)
          .set({
            nameMr: item.nameMr,
            nameEn: item.nameEn,
            descriptionMr: item.descriptionMr,
            descriptionEn: item.descriptionEn,
            price: item.price,
            isVeg: item.isVeg,
            isAvailable: item.isAvailable,
            displayOrder: item.displayOrder,
          })
          .where(eq(menuItems.id, item.id));
      }
    }
  }

  revalidateBranch(branchId);
  return { success: true };
}

const createBranchSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  nameMr: z.string().min(1),
  nameEn: z.string().min(1),
  phone: z.string().optional(),
  addressMr: z.string().optional(),
  addressEn: z.string().optional(),
});

export async function createBranch(data: z.infer<typeof createBranchSchema>) {
  await requireSuperAdmin();
  const parsed = createBranchSchema.parse(data);

  try {
    const [branch] = await db
      .insert(branches)
      .values(parsed)
      .returning({ id: branches.id, slug: branches.slug });

    await db.insert(menuConfigs).values({ branchId: branch.id });

    revalidatePath("/admin/branches");
    return { success: true, branch };
  } catch {
    return { error: "Branch slug may already exist" };
  }
}

export async function assignBranchAdmin(branchId: string, adminId: string | null) {
  await requireSuperAdmin();

  await db
    .update(branches)
    .set({ adminId })
    .where(eq(branches.id, branchId));

  revalidatePath("/admin/branches");
  return { success: true };
}

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(["superadmin", "admin"]),
});

export async function createUser(data: z.infer<typeof createUserSchema>) {
  await requireSuperAdmin();
  const parsed = createUserSchema.parse(data);
  const passwordHash = await hash(parsed.password, 12);

  try {
    await db.insert(users).values({
      email: parsed.email,
      passwordHash,
      name: parsed.name,
      role: parsed.role,
    });
  } catch {
    return { error: "Email already exists" };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUser(userId: string) {
  const session = await requireSuperAdmin();
  if (session.user.id === userId) {
    return { error: "Cannot delete your own account" };
  }

  await db.delete(users).where(eq(users.id, userId));
  revalidatePath("/admin/users");
  return { success: true };
}

export async function setAdminBranch(branchId: string) {
  await requireSuperAdmin();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_BRANCH_COOKIE, branchId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return { success: true };
}

function revalidateBranch(branchId: string) {
  db.select({ slug: branches.slug })
    .from(branches)
    .where(eq(branches.id, branchId))
    .limit(1)
    .then(([b]) => {
      if (b) {
        revalidatePath(`/menu/${b.slug}`);
      }
      revalidatePath("/admin/menu");
      revalidatePath("/admin/branch");
      revalidatePath("/admin/social");
      revalidatePath("/admin/dashboard");
    });
}
