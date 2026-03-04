import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  category: z.enum([
    "Design",
    "Sales",
    "Marketing",
    "Finance",
    "Technology",
    "Engineering",
    "Business",
    "Human Resource",
  ]),
  type: z.enum(["Full-Time", "Part-Time", "Contract", "Remote"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type JobInput = z.infer<typeof jobSchema>;
