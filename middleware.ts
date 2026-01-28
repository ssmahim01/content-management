import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/login", "/register"];

function isAdminRoute(pathname: string) {
  return ADMIN_ROUTES.some((route) => pathname.startsWith(route));
}

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.includes(pathname);
}

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("admin_token");
  return response;
}

function redirectToDashboard(request: NextRequest) {
  return NextResponse.redirect(new URL("/admin/dashboard", request.url));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  if (isAdminRoute(pathname)) {
    if (!token) {
      return redirectToLogin(request);
    }
    return NextResponse.next();
  }

  if (isAuthRoute(pathname)) {
    if (token) {
      return redirectToDashboard(request);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
