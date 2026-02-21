import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const isAdmin = token?.role === "ADMIN";

  const { pathname } = req.nextUrl;

  console.log('Middleware:', { pathname, isAuthenticated, role: token?.role });

  // Rute yang membutuhkan autentikasi
  const authRoutes = ["/profil", "/riwayat", "/tebus", "/komunitas"];
  const requiresAuth = authRoutes.some((route) => pathname.startsWith(route));

  // Rute admin
  const adminRoutes = ["/admin"];
  const requiresAdmin = adminRoutes.some((route) => pathname.startsWith(route));

  // Redirect ke login jika belum login
  if (requiresAuth && !isAuthenticated) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect ke beranda jika mencoba akses admin tanpa hak
  if (requiresAdmin && !isAdmin) {
    return NextResponse.redirect(new URL("/login", req.url));
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
    "/profil/:path*", 
    "/riwayat/:path*", 
    "/tebus/:path*", 
    "/komunitas/:path*",
    "/admin/:path*",
    "/login",
    "/register"
  ],
};
