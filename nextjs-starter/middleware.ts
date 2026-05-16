import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Protect /dashboard and /security — redirect unauthenticated users to home.
export default auth((req) => {
  const isProtected =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/security");

  if (!req.auth && isProtected) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
