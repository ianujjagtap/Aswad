export type Locale = "mr" | "en";
export type MenuCategoryType = "veg" | "non-veg";
export type ColumnSide = "left" | "right";

export type SocialPlatform =
  | "instagram"
  | "zomato"
  | "swiggy"
  | "facebook"
  | "whatsapp"
  | "website"
  | "custom";

export interface MenuItemData {
  id: string;
  nameMr: string;
  nameEn: string;
  descriptionMr?: string | null;
  descriptionEn?: string | null;
  price: number;
  isVeg: boolean;
  isAvailable: boolean;
  imageUrl?: string | null;
  displayOrder: number;
}

export interface MenuCategoryData {
  id: string;
  nameMr: string;
  nameEn: string;
  columnSide: ColumnSide;
  displayOrder: number;
  isVisible: boolean;
  items: MenuItemData[];
}

export interface MenuPageData {
  id: string;
  titleMr: string;
  titleEn: string;
  category: MenuCategoryType;
  bottomTextMr?: string | null;
  bottomTextEn?: string | null;
  image1Url?: string | null;
  image2Url?: string | null;
  displayOrder: number;
  leftColumn: MenuCategoryData[];
  rightColumn: MenuCategoryData[];
}

export interface SocialLinkData {
  id: string;
  platform: SocialPlatform;
  labelMr: string;
  labelEn: string;
  url: string;
  displayOrder: number;
}

export interface BranchMenuData {
  id: string;
  slug: string;
  nameMr: string;
  nameEn: string;
  taglineMr: string;
  taglineEn: string;
  sinceMr: string;
  sinceEn: string;
  proprietorMr: string;
  proprietorEn: string;
  brandLogoText: string;
  addressMr: string;
  addressEn: string;
  phone: string;
  socialLinks: SocialLinkData[];
  pages: MenuPageData[];
  config: {
    bgImageUrl: string | null;
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export function t(
  locale: Locale,
  mr: string | null | undefined,
  en: string | null | undefined
): string {
  if (locale === "en") return en || mr || "";
  return mr || en || "";
}
