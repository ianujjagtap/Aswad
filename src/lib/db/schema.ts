import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["superadmin", "admin"]);
export const menuCategoryTypeEnum = pgEnum("menu_category_type", [
  "veg",
  "non-veg",
]);
export const columnSideEnum = pgEnum("column_side", ["left", "right"]);
export const socialPlatformEnum = pgEnum("social_platform", [
  "instagram",
  "zomato",
  "swiggy",
  "facebook",
  "whatsapp",
  "website",
  "custom",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: userRoleEnum("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const branches = pgTable("branches", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  nameMr: text("name_mr").notNull(),
  nameEn: text("name_en").notNull(),
  taglineMr: text("tagline_mr"),
  taglineEn: text("tagline_en"),
  sinceMr: text("since_mr"),
  sinceEn: text("since_en"),
  proprietorMr: text("proprietor_mr"),
  proprietorEn: text("proprietor_en"),
  brandLogoText: text("brand_logo_text"),
  addressMr: text("address_mr"),
  addressEn: text("address_en"),
  phone: text("phone"),
  adminId: uuid("admin_id").references(() => users.id),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const menuConfigs = pgTable("menu_configs", {
  id: uuid("id").primaryKey().defaultRandom(),
  branchId: uuid("branch_id")
    .references(() => branches.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  bgImageUrl: text("bg_image_url"),
  fontFamily: text("font_family").default("Noto Sans Devanagari"),
  primaryColor: text("primary_color").default("#8B1A1A"),
  secondaryColor: text("secondary_color").default("#D4A517"),
  accentColor: text("accent_color").default("#FFF8E7"),
  version: integer("version").default(1).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const socialLinks = pgTable("social_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  branchId: uuid("branch_id")
    .references(() => branches.id, { onDelete: "cascade" })
    .notNull(),
  platform: socialPlatformEnum("platform").notNull().default("custom"),
  labelMr: text("label_mr").notNull(),
  labelEn: text("label_en").notNull(),
  url: text("url").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

export const menuPages = pgTable("menu_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  branchId: uuid("branch_id")
    .references(() => branches.id, { onDelete: "cascade" })
    .notNull(),
  titleMr: text("title_mr").notNull(),
  titleEn: text("title_en").notNull(),
  category: menuCategoryTypeEnum("category").notNull(),
  bottomTextMr: text("bottom_text_mr"),
  bottomTextEn: text("bottom_text_en"),
  image1Url: text("image1_url"),
  image2Url: text("image2_url"),
  displayOrder: integer("display_order").default(0).notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  pageId: uuid("page_id")
    .references(() => menuPages.id, { onDelete: "cascade" })
    .notNull(),
  nameMr: text("name_mr").notNull(),
  nameEn: text("name_en").notNull(),
  columnSide: columnSideEnum("column_side").notNull().default("left"),
  displayOrder: integer("display_order").default(0).notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
});

export const menuItems = pgTable("menu_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
  nameMr: text("name_mr").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionMr: text("description_mr"),
  descriptionEn: text("description_en"),
  price: integer("price").notNull(),
  imageUrl: text("image_url"),
  isAvailable: boolean("is_available").default(true).notNull(),
  isVeg: boolean("is_veg").default(false).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Branch = typeof branches.$inferSelect;
export type NewBranch = typeof branches.$inferInsert;
export type MenuConfig = typeof menuConfigs.$inferSelect;
export type SocialLink = typeof socialLinks.$inferSelect;
export type MenuPage = typeof menuPages.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
