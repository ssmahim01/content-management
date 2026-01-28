/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export default auth((req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const session = (req as any).auth;

  // Redirect unauthenticated users away from dashboard
  if (!session && pathname.startsWith("/dashboard")) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (session && (pathname === "/login" || pathname === "/register")) {
    const url = new URL("/dashboard", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
