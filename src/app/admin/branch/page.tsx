import { redirect } from "next/navigation";

import { BranchInfoForm } from "@/components/admin/branch-info-form";
import { getAdminBranchId, requireAuth } from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function BranchPage() {
  await requireAuth();
  const branchId = await getAdminBranchId();
  if (!branchId) redirect("/admin/branches?pick=1");

  const data = await getBranchMenuData(branchId);
  if (!data) redirect("/admin/dashboard");

  return <BranchInfoForm data={data} />;
}
