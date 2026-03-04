import { z } from "zod";

export const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  resumeLink: z.string().url("Please provide a valid URL for your resume"),
  coverNote: z.string().min(20, "Cover note must be at least 20 characters"),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
