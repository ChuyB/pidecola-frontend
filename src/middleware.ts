import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/services/checkSession";
import { getUserRole } from "./lib/services/roles";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const accessToken = request.cookies.get("access_token")?.value;

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

  // Ejemplo de ruta protegida
  // if (pathname.startsWith("/forbidden-route")) {
  //   const userRole = await getUserRole(accessToken);
  //   if (userRole !== "admin")
  //     return NextResponse.redirect(new URL("/request-ride", request.url));
  // }
}
