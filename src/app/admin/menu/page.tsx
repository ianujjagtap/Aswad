import { redirect } from "next/navigation";

import { MenuEditor } from "@/components/admin/menu-editor";
import { getAdminBranchId, requireAuth } from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function MenuPage() {
  await requireAuth();
  const branchId = await getAdminBranchId();
  if (!branchId) redirect("/admin/branches?pick=1");

  const data = await getBranchMenuData(branchId);
  if (!data) redirect("/admin/dashboard");

  return <MenuEditor branchId={branchId} initialData={data} />;
}
