import { redirect } from "next/navigation";

import { QRCodeClient } from "@/components/admin/qr-code-client";
import { requireAuth, getAdminBranchId } from "@/lib/auth-helpers";
import { getBranchMenuData } from "@/lib/db/queries";

export default async function QRPage() {
  await requireAuth();
  const branchId = await getAdminBranchId();

  if (!branchId) {
    redirect("/admin/login");
  }

  const data = await getBranchMenuData(branchId);
  if (!data) {
    redirect("/admin/dashboard");
  }

  return <QRCodeClient slug={data.slug} branchName={data.nameMr} />;
}
