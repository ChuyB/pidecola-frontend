"use server";

import { jwtDecode } from "jwt-decode";
import { getAuthCookies } from "../services/authCookie";
import { isAccessTokenExpired, refreshTokens } from "./session";
import { revalidateTag } from "next/cache";
import { Ride } from "../types/rides.type";

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

  revalidateTag("current_ride");

  return { status: res.status };
}

export async function getUserRide() {
  const { access } = getAuthCookies();
  if (!access) return [];

  const { user_id } = jwtDecode(access) as { user_id: string };

  const res = await fetch(
    `${SERVER}/ride_requests/${user_id}/get_by_user_id/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      cache: "no-cache",
      next: {
        tags: ["current_ride"],
      },
    },
  );
  const result = await res.json();

  return result as Ride[];
}

export async function cancelRide(id: number) {
  if (isAccessTokenExpired()) await refreshTokens();

  const { access } = getAuthCookies();
  if (!access) return;

  await fetch(`${SERVER}/ride_requests/${id}/cancel/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  revalidateTag("current_ride");
  revalidateTag("rides_list");
}

export async function getAllRides() {
  const { access } = getAuthCookies();
  if (!access) return [];

  const res = await fetch(`${SERVER}/ride_requests/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    cache: "no-cache",
    next: {
      tags: ["rides_list"],
    },
  });

  const result = await res.json();

  if (res.status === 200) return result as Ride[];
  return null;
}
