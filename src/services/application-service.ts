import { useToast } from "@/components/toasts";
import useAxios from "@/hooks/use-axios";
import { ApiResponse, Application, PaginatedData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface CreateApplicationDto {
  jobId: number;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
}

export const useSubmitApplication = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (application: CreateApplicationDto) => {
      const { data } = await axios.post<ApiResponse<Application>>(
        "/applications",
        application,
      );
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["job", variables.jobId] });
      showToast({
        variant: "success",
        description: "Application submitted successfully",
      });
    },
    onError: () => {
      showToast({
        variant: "error",
        description: "Failed to submit application",
      });
    },
  });
};

export const useGetApplications = (params?: {
  page?: number;
  limit?: number;
}) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["applications", params],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<PaginatedData<Application>>>(
        "/admin/applications",
        {
          params,
        },
      );
      return data.data;
    },
  });
};
