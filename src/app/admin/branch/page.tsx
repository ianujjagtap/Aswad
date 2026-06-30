import { redirect } from "next/navigation";

import { BranchInfoForm } from "@/components/admin/branch-info-form";
import {
  redirectToBranchPicker,
  requireAdminBranchId,
  requireAuth,
} from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function BranchPage() {
  const session = await requireAuth();
  const branchId = await requireAdminBranchId("/admin/branch");

  const data = await getBranchMenuData(branchId);
  if (!data) {
    if (session.user.role === "superadmin") {
      redirectToBranchPicker("/admin/branch");
    }
    redirect("/admin/dashboard");
  }

  return <BranchInfoForm data={data} />;
}
