import { redirect } from "next/navigation";

import { CustomizeForm } from "@/components/admin/customize-form";
import {
  redirectToBranchPicker,
  requireAdminBranchId,
  requireAuth,
} from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function CustomizePage() {
  const session = await requireAuth();
  const branchId = await requireAdminBranchId("/admin/customize");

  const data = await getBranchMenuData(branchId);
  if (!data) {
    if (session.user.role === "superadmin") {
      redirectToBranchPicker("/admin/customize");
    }
    redirect("/admin/dashboard");
  }

  return <CustomizeForm data={data} />;
}
