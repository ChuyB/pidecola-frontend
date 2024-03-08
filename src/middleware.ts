import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/services/checkSession";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // Si un usuario tiene una sesión válida, no tiene que entrar en login o register
  if (
    pathname === "/" ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/login")
  ) {
    const isValidSession = await checkSession(refreshToken);

    if (isValidSession)
      return NextResponse.redirect(new URL("/request-ride", request.url));
  }

  // Si un usuario no tiene una sesión válida tiene que registrarse
  if (pathname.startsWith("/profile") || pathname.startsWith("/request-ride")) {
    const isValidSession = await checkSession(refreshToken);

    if (!isValidSession)
      return NextResponse.redirect(new URL("/login", request.url));
  }
}
