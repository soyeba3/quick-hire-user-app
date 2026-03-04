export interface ApiResponse<T> {
  status: "success" | "error";
  statusCode: number;
  path: string;
  timestamp: string;
  data: T;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  companyLogo: string | null;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  applicationCount?: number;
}

export interface Application {
  id: number;
  jobId: number;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
}

export interface PaginatedData<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
