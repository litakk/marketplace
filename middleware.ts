import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Если пользователь не авторизован
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Если пользователь заблокирован и не на странице /blocked
  if (token.isBlocked && pathname !== "/blocked") {
    return NextResponse.redirect(new URL("/blocked", req.url));
  }

  // Проверка доступа к админке
  if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Всё ок — продолжаем
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/basket/:path*",
    "/blocked", // тоже обрабатываем (чтобы не было циклов редиректа)
  ],
};
