import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/contact",
  "/pricing",
  "/faq",
  "/api/auth",
];

const roleRoutes: Record<string, string[]> = {
  student: ["/student"],
  faculty: ["/faculty"],
  admin: ["/admin"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isApiAuthRoute = pathname.startsWith("/api/auth");

  if (isPublicRoute || isApiAuthRoute) {
    if (isPublicRoute && token && pathname === "/login") {
      const role = token.role ?? "student";
      const dashboardMap: Record<string, string> = {
        student: "/student/dashboard",
        faculty: "/faculty/dashboard",
        admin: "/admin/dashboard",
      };
      return NextResponse.redirect(new URL(dashboardMap[role] || "/student/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = token.role as "student" | "faculty" | "admin" | undefined;

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const allowedPrefixes = roleRoutes[role] ?? [];
  const hasAccess = allowedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!hasAccess) {
    const dashboardMap: Record<string, string> = {
      student: "/student/dashboard",
      faculty: "/faculty/dashboard",
      admin: "/admin/dashboard",
    };
    return NextResponse.redirect(new URL(dashboardMap[role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth/register).*)"],
};
