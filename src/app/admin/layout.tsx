import { redirect } from "next/navigation";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminLanguageProvider } from "@/components/admin/admin-language-provider";
import { auth } from "@/lib/auth";
import { getAdminBranchId } from "@/lib/auth-helpers";
import { getBranchMenuData, getBranchForAdmin } from "@/lib/db/queries";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return <>{children}</>;
  }

  const isSuperAdmin = session.user.role === "superadmin";
  let branchName: string | undefined;
  let branchSlug: string | undefined;

  const branchId = await getAdminBranchId();

  if (branchId) {
    const data = await getBranchMenuData(branchId);
    branchName = data?.nameMr;
    branchSlug = data?.slug;
  } else if (!isSuperAdmin) {
    const branch = await getBranchForAdmin(session.user.id, session.user.role);
    if (!branch) {
      redirect("/admin/login");
    }
  }

  return (
    <AdminLanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <AdminSidebar
          userName={session.user.name ?? "Admin"}
          userRole={session.user.role}
          branchName={branchName}
          branchSlug={branchSlug}
          isSuperAdmin={isSuperAdmin}
        />
        <main className="min-h-screen lg:pl-64">
          <AdminHeader />
          {children}
        </main>
      </div>
    </AdminLanguageProvider>
  );
}
