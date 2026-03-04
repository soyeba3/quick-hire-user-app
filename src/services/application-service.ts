import {
  deleteApplication,
  getAdminApplications,
  submitApplication,
  SubmitApplicationInput,
} from "@/app/actions/application-action";
import { useAuth } from "@/lib/auth/use-auth";
import { Application, PaginatedData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSubmitApplication = () => {
  return useMutation<Application, Error, SubmitApplicationInput>({
    mutationFn: async (data) => {
      const res = await submitApplication(data);
      return res.data;
    },
  });
};

export const useGetApplications = (
  filters: { limit?: number; offset?: number } = {},
) => {
  const { token } = useAuth();

  return useQuery<PaginatedData<Application>>({
    queryKey: ["applications", filters],
    queryFn: async () => {
      const res = await getAdminApplications(token as string, filters);
      return res.data;
    },
    enabled: !!token,
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation<{ message: string }, Error, number>({
    mutationFn: async (id) => {
      const res = await deleteApplication(token as string, id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};
