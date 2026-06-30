import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAllBranches, getBranchForAdmin } from "@/lib/db/queries";
import { ADMIN_BRANCH_COOKIE } from "@/lib/constants";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
}

export async function requireSuperAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "superadmin") redirect("/admin/dashboard");
  return session;
}

export async function getAdminBranchId(): Promise<string | null> {
  const session = await requireAuth();
  const cookieStore = await cookies();

  if (session.user.role === "superadmin") {
    // 1. Prefer the explicitly selected branch cookie
    const cookieBranch = cookieStore.get(ADMIN_BRANCH_COOKIE)?.value;
    if (cookieBranch) return cookieBranch;

    // 2. No cookie set — if there is exactly one branch, use it automatically
    //    so superadmins don't need to "pick" on a fresh session/device.
    //    (If there are multiple branches they still need to pick one.)
    const branches = await getAllBranches();
    if (branches.length === 1) return branches[0].id;

    return null;
  }

  const branch = await getBranchForAdmin(session.user.id, session.user.role);
  return branch?.id ?? null;
}

export async function requireAdminBranchId(): Promise<string> {
  const branchId = await getAdminBranchId();
  if (!branchId) {
    if ((await requireAuth()).user.role === "superadmin") {
      redirect("/admin/branches?pick=1");
    }
    redirect("/admin/dashboard");
  }
  return branchId;
}

export async function assertBranchAccess(branchId: string) {
  const session = await requireAuth();
  if (session.user.role === "superadmin") return;

  const branch = await getBranchForAdmin(session.user.id, session.user.role);
  if (!branch || branch.id !== branchId) {
    throw new Error("Unauthorized branch access");
  }
}
