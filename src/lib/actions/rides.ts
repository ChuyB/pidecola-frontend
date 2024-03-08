"use server";

import { jwtDecode } from "jwt-decode";
import { getAuthCookies } from "../services/authCookie";
import { isAccessTokenExpired, refreshTokens } from "./session";

const SERVER = process.env.NEXT_PUBLIC_API_URL;

export async function getRoutes() {
  if (isAccessTokenExpired()) await refreshTokens();

  const { access } = getAuthCookies();
  if (!access) return;

  const res = await fetch(`${SERVER}/routes/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  const result = await res.json();

  return result;
}

export async function requestRide(_currentState: unknown, formData: FormData) {
  const rawReq = Object.fromEntries(formData);

  if (isAccessTokenExpired()) refreshTokens();

  const { access } = getAuthCookies();
  if (!access) return;

  const { user_id } = jwtDecode(access) as { user_id: string };

  const req = { user: user_id, origin: "", destination: "" };

  if (rawReq.usb === "from") {
    req.origin = "USB";
    req.destination = rawReq.routeName as string;
  } else {
    req.origin = rawReq.routeName as string;
    req.destination = "USB";
  }

  const res = await fetch(`${SERVER}/ride_requests/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(req),
  });

  return { status: res.status };
}
