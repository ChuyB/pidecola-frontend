import { NextResponse, type NextRequest } from "next/server";
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

const SERVER = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fix to Server Actions getting outdated cookies:
 * From https://github.com/vercel/next.js/discussions/50374#discussioncomment-6732402
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 */
export function applySetCookie(req: NextRequest, res: NextResponse) {
  // 1. Parse Set-Cookie header from the response
  const setCookies = new ResponseCookies(res.headers);

  // 2. Construct updated Cookie header for the request
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
  //    on a dummy response
  // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
  const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });

  // 4. Copy the “request header overrides” headers from our dummy response to the real response
  dummyRes.headers.forEach((value, key) => {
    if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
      res.headers.set(key, value);
    }
  });
}

export async function checkSession(refreshToken: string | undefined) {
  if (!refreshToken) return { isValidSession: false, response: null };
  const res = await fetch(`${SERVER}/auth/refresh/`, {
    method: "POST",
    body: JSON.stringify({ refresh: refreshToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { access } = await res.json();

  if (res.status === 200) {
    // Resets access token
    const response = NextResponse.next();
    response.cookies.set("access_token", access, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return { isValidSession: true, response };
  }

  return { isValidSession: false, response: null };
}
