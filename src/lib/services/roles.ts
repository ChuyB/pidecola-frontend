import { jwtDecode } from "jwt-decode";

enum Role {
  ADMIN = "admin",
  USER = "user",
  DRIVER = "driver",
}

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
