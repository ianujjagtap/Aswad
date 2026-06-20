import { redirect } from "next/navigation";

import { getAdminBranchId, requireAuth } from "@/lib/auth-helpers";
import { getBranchMenuData, getBranchStats } from "@/lib/db/queries";
import { DashboardClient } from "@/components/admin/dashboard-client";

export default async function DashboardPage() {
  const session = await requireAuth();
  const branchId = await getAdminBranchId();

  if (!branchId && session.user.role === "superadmin") {
    redirect("/admin/branches?pick=1");
  }

  if (!branchId) redirect("/admin/login");

  const [data, stats] = await Promise.all([
    getBranchMenuData(branchId),
    getBranchStats(branchId),
  ]);

  if (!data) redirect("/admin/branches");

  return (
    <DashboardClient 
      sessionName={session.user.name ?? "Admin"} 
      data={data} 
      stats={stats} 
    />
  );
}
