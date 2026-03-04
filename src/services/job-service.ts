import { useToast } from "@/components/toasts";
import useAxios from "@/hooks/use-axios";
import { ApiResponse, Job, PaginatedData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetJobs = (params?: {
  search?: string;
  category?: string;
  type?: string;
  page?: number;
  limit?: number;
}) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["jobs", params],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<PaginatedData<Job>>>(
        "/jobs",
        {
          params,
        },
      );
      return data.data;
    },
  });
};

export const useGetJobDetail = (id: string | number) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<Job>>(`/jobs/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (job: Partial<Job>) => {
      const { data } = await axios.post<ApiResponse<Job>>("/admin/jobs", job);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      showToast({
        variant: "success",
        description: "Job created successfully",
      });
    },
    onError: () => {
      showToast({ variant: "error", description: "Failed to create job" });
    },
  });
};

export const useUpdateJob = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number | string;
      data: Partial<Job>;
    }) => {
      const { data: response } = await axios.put<ApiResponse<Job>>(
        `/admin/jobs/${id}`,
        data,
      );
      return response;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", id] });
      showToast({
        variant: "success",
        description: "Job updated successfully",
      });
    },
    onError: () => {
      showToast({ variant: "error", description: "Failed to update job" });
    },
  });
};

export const useDeleteJob = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (id: number | string) => {
      const { data } = await axios.delete<ApiResponse<null>>(
        `/admin/jobs/${id}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      showToast({
        variant: "success",
        description: "Job deleted successfully",
      });
    },
    onError: () => {
      showToast({ variant: "error", description: "Failed to delete job" });
    },
  });
};
