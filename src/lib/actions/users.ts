"use server";

import { setAuthCookies, getAuthCookies } from "../services/authCookie";
import { jwtDecode } from "jwt-decode";
import { Vehicle } from "../types/vehicle.type";

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
  const { access } = getAuthCookies();
  if (!access) return null;

  const { user_id } = jwtDecode(access) as { user_id: string };
  const res = await fetch(`${SERVER}/accounts/${user_id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    cache: "force-cache",
  });

  if (res.status === 401) return null;
  const result = await res.json();
  return {
    email: result.email,
    name: `${result.first_name} ${result.last_name}`,
  };
}

export async function getUserRole() {
  const { access } = getAuthCookies();
  if (!access) return;

  const { user_id } = jwtDecode(access) as { user_id: string };
  const res = await fetch(`${SERVER}/accounts/${user_id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    cache: "force-cache",
  });

  if (res.status === 401) return;
  const result = await res.json();
  return result.role as string;
}

export async function getUserVehicles() {
  const { access } = getAuthCookies();
  if (!access) return null;

  const { user_id } = jwtDecode(access) as { user_id: string };
  const res = await fetch(`${SERVER}/accounts/${user_id}/vehicles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
      cache: "force-cache",
    },
  });
  if (res.status === 401) return null;
  const result = await res.json();
  return result as Vehicle[];
}

export async function registerVehicleUser(
  _currentState: unknown,
  formData: FormData,
) {
  const { access } = getAuthCookies();
  if (!access) return null;

  const { user_id } = jwtDecode(access) as { user_id: string };
  const req = {
    brand: formData.get("brand"),
    model: formData.get("model"),
    seats: formData.get("seats"),
    color: formData.get("color"),
    plate: formData.get("plate"),
    owner: user_id,
  };
  const res = await fetch(`${SERVER}/vehicles/`, {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });
  const result = await res.json();
  setAuthCookies(res, result);
  return { status: res.status, message: result.message };
}
