import { redirect } from "next/navigation";

import {
  redirectToBranchPicker,
  requireAdminBranchId,
  requireAuth,
} from "@/lib/auth-helpers";
import { getBranchMenuData, getBranchStats } from "@/lib/db/queries";
import { DashboardClient } from "@/components/admin/dashboard-client";

export default async function DashboardPage() {
  const session = await requireAuth();
  const branchId = await requireAdminBranchId("/admin/dashboard");

  const [data, stats] = await Promise.all([
    getBranchMenuData(branchId),
    getBranchStats(branchId),
  ]);

  if (!data) {
    if (session.user.role === "superadmin") {
      redirectToBranchPicker("/admin/dashboard");
    }
    redirect("/admin/login");
  }

  return (
    <DashboardClient
      sessionName={session.user.name ?? "Admin"}
      data={data}
      stats={stats}
    />
  );
}
