import { redirect } from "next/navigation";

import { SocialLinksForm } from "@/components/admin/social-links-form";
import { requireAuth, getAdminBranchId } from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function SocialPage() {
  await requireAuth();
  const branchId = await getAdminBranchId();

  if (!branchId) {
    redirect("/admin/login");
  }

  const data = await getBranchMenuData(branchId);
  if (!data) {
    redirect("/admin/dashboard");
  }

  return (
    <SocialLinksForm branchId={branchId} initialLinks={data.socialLinks} />
  );
}
