import { jwtDecode } from "jwt-decode";
import { Role } from "../types/user.type";

const SERVER = process.env.NEXT_PUBLIC_API_URL;

const getUserRole = async (accessToken: string | undefined) => {
  if (!accessToken) return null;

  const { user_id } = jwtDecode(accessToken) as { user_id: string };

  const res = await fetch(`${SERVER}/accounts/${user_id}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const { role } = await res.json();

  return role as Role;
};

export { Role, getUserRole };

export const userHasRideOrRequest = async (accessToken: string | undefined) => {
  if (!accessToken) return null;

  const { user_id } = jwtDecode(accessToken) as { user_id: string };

  const res = await fetch(`${SERVER}/accounts/${user_id}/has_ride_or_request`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  return result as { ride: boolean; request: boolean };
};
