import { redirect } from "next/navigation";

import { QRCodeClient } from "@/components/admin/qr-code-client";
import {
  redirectToBranchPicker,
  requireAdminBranchId,
  requireAuth,
} from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function QRPage() {
  const session = await requireAuth();
  const branchId = await requireAdminBranchId("/admin/qr");

  const data = await getBranchMenuData(branchId);
  if (!data) {
    if (session.user.role === "superadmin") {
      redirectToBranchPicker("/admin/qr");
    }
    redirect("/admin/dashboard");
  }

  return <QRCodeClient slug={data.slug} branchName={data.nameMr} />;
}
