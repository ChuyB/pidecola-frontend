"use server";
// Conjunto de funciones de API relacionadas a los usuarios

import { baseAuthFetch, getCookiesJson } from "./baseApi";

// TODO: Los tipos de datos deberian ser mas especificos.
// Ej: Convertir las fechas de string a fechas e indicar
// los campos que pueden ser nulos
type UserModel = {
  created_at: string;
  date_joined: string;
  email: string;
  first_name: string;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
  last_name: string;
  rating: number;
  rating_count: number;
  role: string;
  username: string;
  likes_count: number;
  dislikes_count: number;
  rides_given: number;
  rides_recieved: number;
};

type loggin_info = {
  is_currently_logged_user: boolean;
};

export type User = UserModel & loggin_info;

// Retorna la informacion de un usuario en especifico segun el id
// Ademas, retorna un campo extra que indica si es la informacion
// del usuario actualmente logeado en la aplicacion
// @param {user_id}: id del usuario para buscar la informacion
export async function getUserData(user_id: Number): Promise<User> {
  const { user_id: logged_user_id } = await getCookiesJson();
  const is_currently_logged_user = logged_user_id == user_id;
  return await baseAuthFetch(`accounts/${user_id}`, "GET")
    .then((r) => r.json())
    .then((data) => {
      return {
        is_currently_logged_user: is_currently_logged_user,
        ...data,
      };
    });
}

// Edita la informacion del usuario
// @param {user_id}: id del usuario para buscar la informacion
export async function pathUserData(
  _currentState: unknown,
  formData: { [key: string]: string },
): Promise<{ status: number }> {
  const { user_id } = await getCookiesJson();
  const result = await baseAuthFetch(
    `accounts/${user_id}/`,
    "PATCH",
    {},
    JSON.stringify(formData),
  );

  return { status: Number(result.status) };
}
