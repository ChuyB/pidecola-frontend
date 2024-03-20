"use server";
import { jwtDecode } from "jwt-decode";
import { isAccessTokenExpired, refreshTokens } from "../actions/session";
import { getAuthCookies } from "../services/authCookie";

const SERVER = process.env.NEXT_PUBLIC_API_URL;

type Method_options = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

// Wrapper de la funcion fetch. Usada como base para realizar
// llamadas al back.
// @param {endpoint}: Ruta a llamar en el back
// @param {method}: Metodo de la request. Get, Post, etc
// @param {headers}: Headers de la request
// @param {body}: Cuerpo de la request
export async function baseFetch(
  endpoint: string,
  method: Method_options,
  headers?: { [key: string]: string },
  body?: string,
): Promise<Response> {
  const response = await fetch(`${SERVER}/${endpoint}`, {
    method: method,
    body: body,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });
  return response;
}

// Wrapper de la funcion baseFetch. Se encarga de incluir el token de acceso
// en los headers antes de realizar la request
// @param {endpoint}: Ruta a llamar en el back
// @param {method}: Metodo de la request. Get, Post, etc
// @param {headers}: Headers de la request
// @param {body}: Cuerpo de la request
export async function baseAuthFetch(
  endpoint: string,
  method: Method_options,
  headers?: { [key: string]: string },
  body?: string,
): Promise<Response> {
  const access = await getAccessToken();
  const new_headers = {
    ...headers,
    Authorization: `Bearer ${access}`,
  };
  return await baseFetch(endpoint, method, new_headers, body);
}

// TODO: Debe mejorarse el manejo del caso de cuanto no hay
// cookies
export async function getAccessToken() {
  const cookies = getAuthCookies();
  if (!cookies) return;

  if (isAccessTokenExpired()) await refreshTokens();
  const { refresh, access } = getAuthCookies();
  if (!refresh || !access) return;
  return access;
}

// TODO: Debe mejorarse el manejo del caso de cuanto no hay
// cookies
export async function getCookiesJson(): Promise<{ user_id: number }> {
  const access = await getAccessToken();
  return jwtDecode(access ?? "");
}
