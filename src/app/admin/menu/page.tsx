import { redirect } from "next/navigation";

import { MenuEditor } from "@/components/admin/menu-editor";
import {
  redirectToBranchPicker,
  requireAdminBranchId,
  requireAuth,
} from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function MenuPage() {
  const session = await requireAuth();
  const branchId = await requireAdminBranchId("/admin/menu");

  const data = await getBranchMenuData(branchId);
  if (!data) {
    if (session.user.role === "superadmin") {
      redirectToBranchPicker("/admin/menu");
    }
    redirect("/admin/dashboard");
  }

  return <MenuEditor branchId={branchId} initialData={data} />;
}
