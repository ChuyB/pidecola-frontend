import { NextResponse } from "next/server";

const SERVER = process.env.NEXT_PUBLIC_API_URL;

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
