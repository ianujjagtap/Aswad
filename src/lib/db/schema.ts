import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// ── Enums ────────────────────────────────────────────────────────────────────

export const userRoleEnum = pgEnum("user_role", ["superadmin", "admin"]);

// ── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: userRoleEnum("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Branches ─────────────────────────────────────────────────────────────────

export const branches = pgTable("branches", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  address: text("address"),
  phone: text("phone"),
  zomatoLink: text("zomato_link"),
  swiggyLink: text("swiggy_link"),
  adminId: uuid("admin_id").references(() => users.id),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Menu Config (per branch styling) ─────────────────────────────────────────

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

// ── Categories ───────────────────────────────────────────────────────────────

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  branchId: uuid("branch_id")
    .references(() => branches.id, { onDelete: "cascade" })
    .notNull(),
  nameMr: text("name_mr").notNull(),
  nameEn: text("name_en").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
});

// ── Menu Items ───────────────────────────────────────────────────────────────

export const menuItems = pgTable("menu_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
  nameMr: text("name_mr").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionMr: text("description_mr"),
  price: integer("price").notNull(),
  imageUrl: text("image_url"),
  isAvailable: boolean("is_available").default(true).notNull(),
  isVeg: boolean("is_veg").default(false).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

// ── Types ────────────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Branch = typeof branches.$inferSelect;
export type NewBranch = typeof branches.$inferInsert;
export type MenuConfig = typeof menuConfigs.$inferSelect;
export type NewMenuConfig = typeof menuConfigs.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type MenuItem = typeof menuItems.$inferSelect;
export type NewMenuItem = typeof menuItems.$inferInsert;
