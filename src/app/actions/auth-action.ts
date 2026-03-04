"use server";

import { fetchWrapper } from "@/lib/fetch-wrapper";
import { ApiResponse } from "@/types";

type LoginInput = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    email: string;
    role: string;
  };
};

export async function login(
  data: LoginInput,
): Promise<ApiResponse<LoginResponse>> {
  return fetchWrapper<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
