"use server";

import { authenticatedFetchWrapper, fetchWrapper } from "@/lib/fetch-wrapper";
import { ApiResponse, Application, PaginatedData } from "@/types";

export type SubmitApplicationInput = {
  jobId: number;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
};

export async function submitApplication(
  data: SubmitApplicationInput,
): Promise<ApiResponse<Application>> {
  return fetchWrapper<Application>("/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAdminApplications(
  token: string,
  filters: { limit?: number; offset?: number } = {},
): Promise<ApiResponse<PaginatedData<Application>>> {
  const params = new URLSearchParams();

  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.offset) params.set("offset", String(filters.offset));

  const query = params.toString();

  return authenticatedFetchWrapper<PaginatedData<Application>>(
    `/applications/admin/applications${query ? `?${query}` : ""}`,
    token,
  );
}

export async function deleteApplication(
  token: string,
  id: number,
): Promise<ApiResponse<{ message: string }>> {
  return authenticatedFetchWrapper<{ message: string }>(
    `/applications/admin/applications/${id}`,
    token,
    { method: "DELETE" },
  );
}
