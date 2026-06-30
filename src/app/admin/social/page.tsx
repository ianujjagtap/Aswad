import { redirect } from "next/navigation";

import { SocialLinksForm } from "@/components/admin/social-links-form";
import {
  redirectToBranchPicker,
  requireAdminBranchId,
  requireAuth,
} from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function SocialPage() {
  const session = await requireAuth();
  const branchId = await requireAdminBranchId("/admin/social");

  const data = await getBranchMenuData(branchId);
  if (!data) {
    if (session.user.role === "superadmin") {
      redirectToBranchPicker("/admin/social");
    }
    redirect("/admin/dashboard");
  }

  return (
    <SocialLinksForm branchId={branchId} initialLinks={data.socialLinks} />
  );
}
