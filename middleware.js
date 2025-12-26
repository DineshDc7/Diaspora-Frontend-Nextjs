import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Cookies set after login (we will set these in /api/auth/login)
  const accessToken = req.cookies.get("access_token")?.value;
  const role = req.cookies.get("user_role")?.value; // we will set this too for role routing

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");

  // Public routes: allow
  if (pathname === "/" || isAuthPage) return NextResponse.next();

  // Protected route groups
  const isAdmin = pathname.startsWith("/admin");
  const isInvestor = pathname.startsWith("/investor");
  const isOwner = pathname.startsWith("/business-owner");

  const isProtected = isAdmin || isInvestor || isOwner;

  // If trying to access protected area without token => redirect to login
  if (isProtected && !accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Role-based blocking (basic)
  if (isAdmin && role && role !== "ADMIN") return NextResponse.redirect(new URL("/not-authorized", req.url));
  if (isInvestor && role && role !== "INVESTOR") return NextResponse.redirect(new URL("/not-authorized", req.url));
  if (isOwner && role && role !== "BUSINESS_OWNER") return NextResponse.redirect(new URL("/not-authorized", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/investor/:path*", "/business-owner/:path*"],
};