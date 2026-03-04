import { config } from "@/config";
import { ApiResponse } from "@/types";

export async function fetchWrapper<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${config.apiEndpoint}${path}`;

  const headers = new Headers({
    "Content-Type": "application/json",
    ...options.headers,
  });

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = (await res.json()) as ApiResponse<T>;

  if (!res.ok) {
    throw new Error(
      (data as ApiResponse<T> & { message?: string }).message ||
        "Something went wrong",
    );
  }

  return data;
}

export async function authenticatedFetchWrapper<T>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  });

  return fetchWrapper<T>(path, {
    ...options,
    headers: Object.fromEntries(headers.entries()),
  });
}
