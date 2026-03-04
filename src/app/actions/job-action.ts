"use server";

import { authenticatedFetchWrapper, fetchWrapper } from "@/lib/fetch-wrapper";
import { ApiResponse, Job, PaginatedData } from "@/types";

export type JobFilters = {
  search?: string;
  category?: string;
  type?: string;
  location?: string;
  limit?: number;
  offset?: number;
};

export type CreateJobInput = {
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
};

export async function getJobs(
  filters: JobFilters = {},
): Promise<ApiResponse<PaginatedData<Job>>> {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.type) params.set("type", filters.type);
  if (filters.location) params.set("location", filters.location);
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.offset) params.set("offset", String(filters.offset));

  const query = params.toString();

  return fetchWrapper<PaginatedData<Job>>(`/jobs${query ? `?${query}` : ""}`);
}

export async function getJobDetail(id: string): Promise<ApiResponse<Job>> {
  return fetchWrapper<Job>(`/jobs/${id}`);
}

export async function getAdminJobs(
  token: string,
  filters: JobFilters = {},
): Promise<ApiResponse<PaginatedData<Job>>> {
  const params = new URLSearchParams();

  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.offset) params.set("offset", String(filters.offset));

  const query = params.toString();

  return authenticatedFetchWrapper<PaginatedData<Job>>(
    `/jobs/admin/jobs${query ? `?${query}` : ""}`,
    token,
  );
}

export async function createJob(
  token: string,
  data: CreateJobInput,
): Promise<ApiResponse<Job>> {
  return authenticatedFetchWrapper<Job>("/jobs/admin/jobs", token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateJob(
  token: string,
  id: number,
  data: Partial<CreateJobInput>,
): Promise<ApiResponse<Job>> {
  return authenticatedFetchWrapper<Job>(`/jobs/admin/jobs/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteJob(
  token: string,
  id: number,
): Promise<ApiResponse<{ message: string }>> {
  return authenticatedFetchWrapper<{ message: string }>(
    `/jobs/admin/jobs/${id}`,
    token,
    { method: "DELETE" },
  );
}
