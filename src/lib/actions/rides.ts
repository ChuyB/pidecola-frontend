"use server";

import { jwtDecode } from "jwt-decode";
import { getAuthCookies } from "../services/authCookie";
import { isAccessTokenExpired, refreshTokens } from "./session";
import { revalidateTag } from "next/cache";
import { Ride, RideRequest } from "../types/rides.type";

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

  revalidateTag("current_request");

  return { status: res.status };
}

export async function getUserCurrentRequest() {
  const { access } = getAuthCookies();
  if (!access) return null;

  const { user_id } = jwtDecode(access) as { user_id: string };

  const res = await fetch(`${SERVER}/ride_requests/${user_id}/active/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    cache: "no-cache",
    next: {
      tags: ["current_request"],
    },
  });
  const result = await res.json();
  const hasRide = Object.keys(result).length !== 0;

  if (hasRide) return result as RideRequest;

  return null;
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

  revalidateTag("current_request");
  revalidateTag("rides_list");
}

export async function reviewRide(id: number, review: "like" | "dislike") {
  if (isAccessTokenExpired()) await refreshTokens();

  const { access } = getAuthCookies();
  if (!access) return;

  await fetch(`${SERVER}/ride_requests/${id}/review/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({ review }),
  });

  revalidateTag("current_request");
  revalidateTag("rides_list");
}

export async function getAllRides(origin: string, destination: string) {
  const { access } = getAuthCookies();
  if (!access) return [];

  const res = await fetch(
    `${SERVER}/ride_requests/?origin=${origin}&destination=${destination}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      cache: "no-cache",
      next: {
        tags: ["rides_list"],
      },
    },
  );

  const result = await res.json();

  if (res.status === 200) return result as RideRequest[];
  return null;
}

export async function getUserCurrentRide() {
  const { access } = getAuthCookies();
  if (!access) return [];

  const { user_id } = jwtDecode(access) as { user_id: string };

  const res = await fetch(`${SERVER}/rides/${user_id}/get_by_user_id/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    cache: "no-cache",
    next: {
      tags: ["current_ride"],
    },
  });
  const result = await res.json();

  return result as Ride[];
}

export async function createNewRide(
  _currentState: unknown,
  formData: FormData,
) {
  const rawReq = Object.fromEntries(formData);
  if (isAccessTokenExpired()) refreshTokens();

  const { access } = getAuthCookies();
  if (!access) return;

  const { user_id } = jwtDecode(access) as { user_id: string };
  const routes = (rawReq.requests as string)
    .split(",")
    .map((id) => parseInt(id));

  const req = {
    user: user_id,
    origin: rawReq.origin as string,
    destination: rawReq.destination as string,
    requests: routes,
  };

  const res = await fetch(`${SERVER}/rides/`, {
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

export async function beginRide(id: number) {
  if (isAccessTokenExpired()) await refreshTokens();

  const { access } = getAuthCookies();
  if (!access) return;

  await fetch(`${SERVER}/rides/${id}/initiate/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  revalidateTag("current_ride");
}

export async function finishRide(id: number) {
  if (isAccessTokenExpired()) await refreshTokens();

  const { access } = getAuthCookies();
  if (!access) return;

  await fetch(`${SERVER}/rides/${id}/finish/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  revalidateTag("current_ride");
}
