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

/**
 * Get the branch ID for the current admin user.
 * - Superadmin: uses cookie if set, otherwise auto-selects the first branch.
 * - Regular admin: looks up the assigned branch.
 * Never redirects — always returns an ID or null.
 */
export async function getAdminBranchId(): Promise<string | null> {
  const session = await requireAuth();
  const cookieStore = await cookies();

  if (session.user.role === "superadmin") {
    // Check cookie first
    const cookieBranch = cookieStore.get(ADMIN_BRANCH_COOKIE)?.value;
    if (cookieBranch) return cookieBranch;

    // No cookie — auto-select first branch
    const branches = await getAllBranches();
    if (branches.length > 0) return branches[0].id;

    return null;
  }

  const branch = await getBranchForAdmin(session.user.id, session.user.role);
  return branch?.id ?? null;
}

export async function assertBranchAccess(branchId: string) {
  const session = await requireAuth();
  if (session.user.role === "superadmin") return;

  const branch = await getBranchForAdmin(session.user.id, session.user.role);
  if (!branch || branch.id !== branchId) {
    throw new Error("Unauthorized branch access");
  }
}
