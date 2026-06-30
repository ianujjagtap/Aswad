import type { Metadata } from "next";

import { getBranchBySlug } from "@/lib/db/queries";

import { MenuCard } from "./menu-card";

interface MenuPageProps {
  params: Promise<{ branchSlug: string }>;
}

export async function generateMetadata({
  params,
}: MenuPageProps): Promise<Metadata> {
  const { branchSlug } = await params;
  const branch = await getBranchBySlug(branchSlug);

  if (!branch) {
    return { title: "Menu Not Found" };
  }

  return {
    title: `आस्वाद | ${branch.nameMr} Menu`,
    description: `${branch.nameEn} - Digital menu. ${branch.addressEn}. Ph. ${branch.phone}`,
    openGraph: {
      title: `${branch.nameEn} | Aaswad Shahi Biryani`,
      description: `${branch.nameMr} - Authentic Biryani & Indian Cuisine. Digital menu card.`,
      type: "website",
      siteName: "Aaswad Shahi Biryani",
      images: [
        {
          url: "/Aaswad-logo.jpeg",
          width: 1200,
          height: 630,
          alt: `${branch.nameMr} - Aaswad Shahi Biryani`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${branch.nameEn} | Aaswad Shahi Biryani`,
      description: `${branch.nameMr} - Authentic Biryani & Indian Cuisine.`,
      images: ["/Aaswad-logo.jpeg"],
    },
  };
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { branchSlug } = await params;
  const branch = await getBranchBySlug(branchSlug);

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
