import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, expectedSessionToken } from "@/lib/adminAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page must stay reachable while unauthenticated.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (token && token === (await expectedSessionToken())) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
