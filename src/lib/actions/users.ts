"use server";

import { setAuthCookies, getAuthCookies } from "../services/authCookie";
import { jwtDecode } from "jwt-decode";
import { isAccessTokenExpired, refreshTokens } from "./session";

const SERVER = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(_currentState: unknown, formData: FormData) {
  const req = {
    username: formData.get("email"),
    password: formData.get("password"),
  };
  const res = await fetch(`${SERVER}/auth/login/`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  setAuthCookies(res, result);
  return { status: res.status, message: result.message };
}

export async function logoutUser() {
  const { refresh } = getAuthCookies();
  setAuthCookies(null, { refresh: "", access: "" }, 0);
  if (!refresh) return;

  await fetch(`${SERVER}/auth/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });
}

export async function registerUser(_currentState: unknown, formData: FormData) {
  const req = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    phone_number: formData.get("phoneNumber"),
    password: formData.get("password"),
  };
  const res = await fetch(`${SERVER}/auth/register/`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  setAuthCookies(res, result);
  return { status: res.status, message: result.message };
}

export async function getUserEmail() {
  const cookies = getAuthCookies();
  if (!cookies) return;

  const isExpired = isAccessTokenExpired();
  if (isExpired) await refreshTokens();
  const { refresh, access } = getAuthCookies();
  if (!refresh || !access) return;

  const { user_id } = jwtDecode(access) as { user_id: string };
  const res = await fetch(`${SERVER}/accounts/${user_id}/`);

  if (res.status === 401) return;
  const result = await res.json();
  return { email: result.email };
}
