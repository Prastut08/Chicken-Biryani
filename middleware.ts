import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_SECRET =
  process.env.AUTH_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "chicken-biryani-super-secret-key-2026";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/select-role",
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
  const token = await getToken({ req: request, secret: AUTH_SECRET });
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isApiAuthRoute = pathname.startsWith("/api/auth");

  if (isPublicRoute || isApiAuthRoute) {
    if (isPublicRoute && token && (pathname === "/login" || pathname === "/select-role")) {
      const role = (token.role ?? "student").toLowerCase();
      const dashboardMap: Record<string, string> = {
        student: "/student/dashboard",
        faculty: "/faculty/dashboard",
        admin: "/admin/dashboard",
      };
      return NextResponse.redirect(
        new URL(dashboardMap[role] || "/student/dashboard", request.url)
      );
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/select-role", request.url));
  }

  const role = ((token.role as string) ?? "student").toLowerCase() as
    | "student"
    | "faculty"
    | "admin";

  const allowedPrefixes = roleRoutes[role] ?? [];
  const hasAccess = allowedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!hasAccess) {
    const dashboardMap: Record<string, string> = {
      student: "/student/dashboard",
      faculty: "/faculty/dashboard",
      admin: "/admin/dashboard",
    };
    return NextResponse.redirect(new URL(dashboardMap[role] || "/student/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth/register).*)"],
};
