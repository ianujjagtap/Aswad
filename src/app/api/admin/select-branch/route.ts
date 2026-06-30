import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { ADMIN_BRANCH_COOKIE } from "@/lib/constants";
import { getAllBranches } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user || session.user.role !== "superadmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  let branchId: string;
  try {
    const body = await request.json();
    branchId = body.branchId;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!branchId || typeof branchId !== "string") {
    return NextResponse.json({ error: "branchId is required" }, { status: 400 });
  }

  // Validate branch exists
  const branches = await getAllBranches();
  const valid = branches.some((b) => b.id === branchId);
  if (!valid) {
    return NextResponse.json({ error: "Branch not found" }, { status: 404 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_BRANCH_COOKIE, branchId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}
