import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get("admin_session")?.value;

  // ==========================================
  // PUBLIC AUTH PAGES
  // ==========================================

  if (
    pathname === "/admin/login" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/reset-password"
  ) {
    // Login page par logged-in user ko admin dashboard bhejo
    if (pathname === "/admin/login" && session) {
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );
    }

    // Forgot/Reset Password hamesha public
    return NextResponse.next();
  }

  // ==========================================
  // PROTECT ADMIN PAGES
  // ==========================================

  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};