import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // allow next internal and static
  const { pathname, origin } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/internal/is-blocked") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Если пользователь не авторизован и путь защищён
  const isProtected = [
    "/admin",
    "/profile",
    "/checkout",
    "/orders",
    "/basket",
  ].some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Обновляем признак блокировки на лету
  let isBlocked = token?.isBlocked as boolean | undefined;
  if (token?.id) {
    try {
      const res = await fetch(`${origin}/api/internal/is-blocked?id=${token.id}`, {
        headers: { "content-type": "application/json" },
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { isBlocked?: boolean };
        if (typeof data.isBlocked === "boolean") {
          isBlocked = data.isBlocked;
        }
      }
    } catch {}
  }

  // Если пользователь заблокирован и не на странице /blocked
  if (isBlocked && pathname !== "/blocked") {
    return NextResponse.redirect(new URL("/blocked", req.url));
  }

  // Проверка доступа к админке
  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|api/internal/is-blocked).*)",
    "/admin/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/basket/:path*",
    "/blocked",
  ],
};
