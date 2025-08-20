import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Если пользователь не авторизован
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Если пользователь не админ, редиректим
  if (token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url)); // или куда угодно
  }

  // Пользователь авторизован и он админ — пропускаем
  return NextResponse.next();
}

// Применяем middleware только к /admin
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
