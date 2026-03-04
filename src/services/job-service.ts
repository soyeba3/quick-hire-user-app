import {
  createJob,
  CreateJobInput,
  deleteJob,
  getJobDetail,
  getJobs,
  JobFilters,
  updateJob,
} from "@/app/actions/job-action";
import { useAuth } from "@/lib/auth/use-auth";
import { Job, PaginatedData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetJobs = (filters: JobFilters = {}) => {
  return useQuery<PaginatedData<Job>>({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const res = await getJobs(filters);
      return res.data;
    },
  });
};

export const useGetJobDetail = (id: string) => {
  return useQuery<Job>({
    queryKey: ["job", id],
    queryFn: async () => {
      const res = await getJobDetail(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation<Job, Error, CreateJobInput>({
    mutationFn: async (data) => {
      const res = await createJob(token as string, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation<Job, Error, { id: number; data: Partial<CreateJobInput> }>(
    {
      mutationFn: async ({ id, data }) => {
        const res = await updateJob(token as string, id, data);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
      },
    },
  );
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation<{ message: string }, Error, number>({
    mutationFn: async (id) => {
      const res = await deleteJob(token as string, id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};
