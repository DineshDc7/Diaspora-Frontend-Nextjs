import { NextResponse } from "next/server";

export function proxy(req) {
  const { pathname } = req.nextUrl;

  // Cookies set by Node backend
  const accessToken = req.cookies.get("accessToken")?.value;
  const role = req.cookies.get("user_role")?.value;

  // Public signup routes (should NOT require auth)
  const isAdminSignup = pathname.startsWith("/admin/signup");
  const isInvestorSignup = pathname.startsWith("/investors/investorsignup"); // ✅ fixed
  const isOwnerSignup = pathname.startsWith("/business-owner/ownersignup");

  if (isAdminSignup || isInvestorSignup || isOwnerSignup) {
    return NextResponse.next();
  }

  // Protected areas (require login)
  const isAdmin = pathname.startsWith("/admin");
  const isInvestor = pathname.startsWith("/investors"); // ✅ fixed
  const isOwner = pathname.startsWith("/business-owner");

  const isProtected = isAdmin || isInvestor || isOwner;

  const refreshToken = req.cookies.get("refreshToken")?.value;

// If user has refreshToken, allow access so Axios can refresh silently
if (isProtected && !accessToken && !refreshToken) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

  // Role-based access
  if (isAdmin && role && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  if (isInvestor && role && role !== "INVESTOR") {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  if (isOwner && role && role !== "BUSINESS_OWNER") {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/investors/:path*", "/business-owner/:path*"], // ✅ fixed
};