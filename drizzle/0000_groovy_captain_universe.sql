CREATE TYPE "public"."column_side" AS ENUM('left', 'right');--> statement-breakpoint
CREATE TYPE "public"."menu_category_type" AS ENUM('veg', 'non-veg');--> statement-breakpoint
CREATE TYPE "public"."social_platform" AS ENUM('instagram', 'zomato', 'swiggy', 'facebook', 'whatsapp', 'website', 'custom');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('superadmin', 'admin');--> statement-breakpoint
CREATE TABLE "branches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name_mr" text NOT NULL,
	"name_en" text NOT NULL,
	"tagline_mr" text,
	"tagline_en" text,
	"since_mr" text,
	"since_en" text,
	"proprietor_mr" text,
	"proprietor_en" text,
	"brand_logo_text" text,
	"address_mr" text,
	"address_en" text,
	"phone" text,
	"admin_id" uuid,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "branches_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_id" uuid NOT NULL,
	"name_mr" text NOT NULL,
	"name_en" text NOT NULL,
	"column_side" "column_side" DEFAULT 'left' NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "menu_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"branch_id" uuid NOT NULL,
	"bg_image_url" text,
	"font_family" text DEFAULT 'Noto Sans Devanagari',
	"primary_color" text DEFAULT '#8B1A1A',
	"secondary_color" text DEFAULT '#D4A517',
	"accent_color" text DEFAULT '#FFF8E7',
	"version" integer DEFAULT 1 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "menu_configs_branch_id_unique" UNIQUE("branch_id")
);
--> statement-breakpoint
CREATE TABLE "menu_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid NOT NULL,
	"name_mr" text NOT NULL,
	"name_en" text NOT NULL,
	"description_mr" text,
	"description_en" text,
	"price" integer NOT NULL,
	"image_url" text,
	"is_available" boolean DEFAULT true NOT NULL,
	"is_veg" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "menu_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"branch_id" uuid NOT NULL,
	"title_mr" text NOT NULL,
	"title_en" text NOT NULL,
	"category" "menu_category_type" NOT NULL,
	"bottom_text_mr" text,
	"bottom_text_en" text,
	"image1_url" text,
	"image2_url" text,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"branch_id" uuid NOT NULL,
	"platform" "social_platform" DEFAULT 'custom' NOT NULL,
	"label_mr" text NOT NULL,
	"label_en" text NOT NULL,
	"url" text NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"name" text NOT NULL,
	"role" "user_role" DEFAULT 'admin' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_page_id_menu_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."menu_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_configs" ADD CONSTRAINT "menu_configs_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_pages" ADD CONSTRAINT "menu_pages_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;