import { redirect } from "next/navigation";

import { DashboardClient } from "@/components/admin/dashboard-client";
import { requireAuth, getAdminBranchId } from "@/lib/auth-helpers";
import { getBranchMenuData, getBranchStats } from "@/lib/db/queries";

export default async function DashboardPage() {
  const session = await requireAuth();
  const branchId = await getAdminBranchId();

  if (!branchId) {
    redirect("/admin/login");
  }

  const [data, stats] = await Promise.all([
    getBranchMenuData(branchId),
    getBranchStats(branchId),
  ]);

  if (!data) {
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
