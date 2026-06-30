import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Superadmin-only routes
    if (
      (pathname.startsWith("/admin/branches") ||
        pathname.startsWith("/admin/users")) &&
      session.user.role !== "superadmin"
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === "/admin/login" && session?.user) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
