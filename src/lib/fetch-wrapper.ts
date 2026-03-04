import { config } from "@/config";
import { ApiResponse } from "@/types";

async function baseFetch<T>(
  url: string,
  headers: Record<string, string>,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = (await res.json()) as ApiResponse<T>;

  if (!res.ok) {
    const errorData = data as ApiResponse<{ message?: string }>;
    throw new Error(errorData.data?.message ?? "Something went wrong");
  }

  return data;
}

export async function fetchWrapper<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${config.apiEndpoint}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  return baseFetch<T>(url, headers, options);
}

export async function authenticatedFetchWrapper<T>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${config.apiEndpoint}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return baseFetch<T>(url, headers, options);
}
