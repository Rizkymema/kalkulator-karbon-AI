import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const isAdmin = token?.role === "ADMIN";

  const { pathname } = req.nextUrl;

  console.log('Middleware:', { pathname, isAuthenticated, role: token?.role });

  // Hanya rute admin yang membutuhkan autentikasi
  const adminRoutes = ["/admin"];
  const requiresAdmin = adminRoutes.some((route) => pathname.startsWith(route));

  // Redirect ke beranda jika mencoba akses admin tanpa hak
  if (requiresAdmin && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Jika sudah login dan mencoba akses login/register, redirect berdasarkan role
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/register"
  ],
};
