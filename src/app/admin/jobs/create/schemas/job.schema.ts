import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  type: z.string().min(1, "Please select an employment type"),
  description: z.string().min(50, "Description must be at least 50 characters"),
});

export type JobInput = z.infer<typeof jobSchema>;
