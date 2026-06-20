import { hash } from "bcryptjs";
import { config } from "dotenv";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

import { db } from "./index";
import {
  SEED_BRANCH,
  SEED_BRANCH_ADMIN,
  SEED_PAGES,
  SEED_SOCIAL_LINKS,
  SEED_SUPERADMIN,
} from "./seed-data";
import {
  branches,
  categories,
  menuConfigs,
  menuItems,
  menuPages,
  socialLinks,
  users,
} from "./schema";

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  console.log("Seeding database...");

  const superHash = await hash(SEED_SUPERADMIN.password, 12);
  const branchHash = await hash(SEED_BRANCH_ADMIN.password, 12);

  const existingSuper = await db
    .select()
    .from(users)
    .where(eq(users.email, SEED_SUPERADMIN.email))
    .limit(1);

  let superAdminId: string;

  if (existingSuper[0]) {
    superAdminId = existingSuper[0].id;
    console.log("Superadmin already exists, skipping user create");
  } else {
    const [superAdmin] = await db
      .insert(users)
      .values({
        email: SEED_SUPERADMIN.email,
        passwordHash: superHash,
        name: SEED_SUPERADMIN.name,
        role: "superadmin",
      })
      .returning({ id: users.id });
    superAdminId = superAdmin.id;
    console.log("Created superadmin:", SEED_SUPERADMIN.email);
  }

  const existingBranchAdmin = await db
    .select()
    .from(users)
    .where(eq(users.email, SEED_BRANCH_ADMIN.email))
    .limit(1);

  let branchAdminId: string;

  if (existingBranchAdmin[0]) {
    branchAdminId = existingBranchAdmin[0].id;
  } else {
    const [branchAdmin] = await db
      .insert(users)
      .values({
        email: SEED_BRANCH_ADMIN.email,
        passwordHash: branchHash,
        name: SEED_BRANCH_ADMIN.name,
        role: "admin",
      })
      .returning({ id: users.id });
    branchAdminId = branchAdmin.id;
    console.log("Created branch admin:", SEED_BRANCH_ADMIN.email);
  }

  const existingBranch = await db
    .select()
    .from(branches)
    .where(eq(branches.slug, SEED_BRANCH.slug))
    .limit(1);

  if (existingBranch[0]) {
    console.log("Branch already seeded, skipping menu data");
    console.log("\nLogin credentials:");
    console.log(`  Superadmin: ${SEED_SUPERADMIN.email} / ${SEED_SUPERADMIN.password}`);
    console.log(`  Branch admin: ${SEED_BRANCH_ADMIN.email} / ${SEED_BRANCH_ADMIN.password}`);
    process.exit(0);
  }

  const [branch] = await db
    .insert(branches)
    .values({
      ...SEED_BRANCH,
      adminId: branchAdminId,
    })
    .returning({ id: branches.id });

  await db.insert(menuConfigs).values({ branchId: branch.id });

  for (const link of SEED_SOCIAL_LINKS) {
    await db.insert(socialLinks).values({ branchId: branch.id, ...link });
  }

  for (let pageIdx = 0; pageIdx < SEED_PAGES.length; pageIdx++) {
    const page = SEED_PAGES[pageIdx];
    const [menuPage] = await db
      .insert(menuPages)
      .values({
        branchId: branch.id,
        titleMr: page.titleMr,
        titleEn: page.titleEn,
        category: page.category,
        bottomTextMr: page.bottomTextMr,
        bottomTextEn: page.bottomTextEn,
        image1Url: page.image1Url,
        image2Url: page.image2Url,
        displayOrder: pageIdx,
      })
      .returning({ id: menuPages.id });

    for (let catIdx = 0; catIdx < page.categories.length; catIdx++) {
      const cat = page.categories[catIdx];
      const [category] = await db
        .insert(categories)
        .values({
          pageId: menuPage.id,
          nameMr: cat.nameMr,
          nameEn: cat.nameEn,
          columnSide: cat.columnSide,
          displayOrder: catIdx,
        })
        .returning({ id: categories.id });

      for (let itemIdx = 0; itemIdx < cat.items.length; itemIdx++) {
        const item = cat.items[itemIdx];
        await db.insert(menuItems).values({
          categoryId: category.id,
          nameMr: item.nameMr,
          nameEn: item.nameEn,
          descriptionMr: item.descriptionMr,
          descriptionEn: item.descriptionEn,
          price: item.price,
          isVeg: item.isVeg,
          displayOrder: itemIdx,
        });
      }
    }
  }

  console.log("Seeded branch:", SEED_BRANCH.slug);
  console.log("\nLogin credentials:");
  console.log(`  Superadmin: ${SEED_SUPERADMIN.email} / ${SEED_SUPERADMIN.password}`);
  console.log(`  Branch admin: ${SEED_BRANCH_ADMIN.email} / ${SEED_BRANCH_ADMIN.password}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
