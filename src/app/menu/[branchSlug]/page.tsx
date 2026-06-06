import type { Metadata } from "next";

import { aaswadMenuData } from "@/lib/demo-data";

import { MenuCard } from "./menu-card";

interface MenuPageProps {
  params: Promise<{ branchSlug: string }>;
}

export async function generateMetadata({
  params,
}: MenuPageProps): Promise<Metadata> {
  const { branchSlug } = await params;
  // TODO: Fetch from DB
  const branch = branchSlug === "aaswad-main" ? aaswadMenuData : null;

  if (!branch) {
    return { title: "Menu Not Found" };
  }

  return {
    title: `${branch.name} | Menu`,
    description: `${branch.name} - डिजिटल मेनू कार्ड. ${branch.address}. मो. ${branch.phone}`,
    openGraph: {
      title: `${branch.name} | Menu`,
      description: `${branch.name} - डिजिटल मेनू कार्ड. ${branch.address}`,
      type: "website",
    },
  };
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { branchSlug } = await params;
  // TODO: Fetch from DB using branchSlug
  const branch = branchSlug === "aaswad-main" ? aaswadMenuData : null;

  if (!branch) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, #E8860C 0%, #F5A623 50%, #D47B0A 100%)",
        }}
      >
        <div className="text-center">
          <h1 className="font-[var(--font-devanagari)] text-2xl font-bold text-[#3D1200]">
            मेनू सापडला नाही
          </h1>
          <p className="mt-2 text-[#3D1200]/60">Menu not found</p>
        </div>
      </div>
    );
  }

  return <MenuCard branch={branch} />;
}
