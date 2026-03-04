"use client";

import { apiEndpoint } from "@/config";
import { useAuth } from "@/lib/auth/use-auth";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function useAxios(): AxiosInstance {
  const router = useRouter();
  const { token, isAuthenticated } = useAuth();

  const axiosClient = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: apiEndpoint,
      headers: {
        "Content-Type": "application/json",
      },
    });

    axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
    );

    axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      (error: AxiosError): Promise<never> => {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 401 && isAuthenticated) {
            router.push("/logout");
          }

          return Promise.reject(error.response.data);
        }

        return Promise.reject(error);
      },
    );

    return axiosInstance;
  }, [token, router, isAuthenticated]);

  return axiosClient;
}
