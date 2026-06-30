import { redirect } from "next/navigation";

import { CustomizeForm } from "@/components/admin/customize-form";
import { requireAuth, getAdminBranchId } from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function CustomizePage() {
  await requireAuth();
  const branchId = await getAdminBranchId();

  if (!branchId) {
    redirect("/admin/login");
  }

  const data = await getBranchMenuData(branchId);
  if (!data) {
    redirect("/admin/dashboard");
  }

  return <CustomizeForm data={data} />;
}
