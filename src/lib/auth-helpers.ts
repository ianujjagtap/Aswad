import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAllBranches, getBranchForAdmin } from "@/lib/db/queries";
import { ADMIN_BRANCH_COOKIE } from "@/lib/constants";

const DEFAULT_ADMIN_NEXT_PATH = "/admin/dashboard";

export function normalizeAdminNextPath(nextPath?: string | null) {
  if (!nextPath?.startsWith("/admin")) {
    return DEFAULT_ADMIN_NEXT_PATH;
  }
  return nextPath;
}

export function redirectToBranchPicker(
  nextPath = DEFAULT_ADMIN_NEXT_PATH,
): never {
  const safeNextPath = normalizeAdminNextPath(nextPath);
  redirect(`/admin/branches?pick=1&next=${encodeURIComponent(safeNextPath)}`);
}

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
    // Trust the cookie — it was validated when set via the Route Handler
    const cookieBranch = cookieStore.get(ADMIN_BRANCH_COOKIE)?.value;
    if (cookieBranch) return cookieBranch;

    // No cookie yet — auto-select if there is exactly one branch
    const branches = await getAllBranches();
    if (branches.length === 1) return branches[0].id;

    return null;
  }

  const branch = await getBranchForAdmin(session.user.id, session.user.role);
  return branch?.id ?? null;
}

export async function requireAdminBranchId(
  nextPath = DEFAULT_ADMIN_NEXT_PATH,
): Promise<string> {
  const session = await requireAuth();
  const branchId = await getAdminBranchId();

  if (!branchId) {
    if (session.user.role === "superadmin") {
      redirectToBranchPicker(nextPath);
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
