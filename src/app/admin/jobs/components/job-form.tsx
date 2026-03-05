"use client";

import { useCreateJob, useUpdateJob } from "@/services/job-service";
import { Job } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { JobInput, jobSchema } from "../create/schemas/job.schema";

type JobFormProps = {
  jobToEdit?: Job;
};

export default function JobForm({ jobToEdit }: JobFormProps) {
  const router = useRouter();
  const { mutate: createJob, isPending: isCreating } = useCreateJob();
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();

  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
    defaultValues: jobToEdit
      ? {
          title: jobToEdit.title,
          company: jobToEdit.company,
          location: jobToEdit.location,
          category: jobToEdit.category as JobInput["category"],
          type: jobToEdit.type as JobInput["type"],
          description: jobToEdit.description,
        }
      : {
          category: "Technology",
          type: "Full-Time",
        },
  });

  const onSubmit = (data: JobInput) => {
    if (jobToEdit) {
      updateJob(
        { id: jobToEdit.id, data },
        { onSuccess: () => router.push("/admin/jobs") },
      );
    } else {
      createJob(data, {
        onSuccess: () => router.push("/admin/jobs"),
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin/jobs"
        className="flex gap-2 items-center mb-8 text-lg font-bold transition-colors text-text-gray hover:text-primary"
      >
        <ArrowLeft size={24} />
        Back to Jobs
      </Link>

      <div className="flex justify-between items-center mb-8 md:mb-12">
        <h1 className="text-3xl font-bold md:text-4xl text-text-dark">
          {jobToEdit ? "Edit Job" : "Post a New Job"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="p-6 space-y-6 bg-white border shadow-sm md:p-12 md:space-y-8 border-border-base">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="space-y-3">
              <label className="block text-lg font-bold md:text-xl text-text-dark">
                Job Title
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="e.g. Senior Product Designer"
                className={`w-full px-4 py-3 md:px-6 md:py-4 border focus:outline-none focus:border-primary text-base md:text-lg ${
                  errors.title ? "border-red-500" : "border-border-base"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label className="block text-lg font-bold md:text-xl text-text-dark">
                Company Name
              </label>
              <input
                type="text"
                {...register("company")}
                placeholder="e.g. Acme Corp"
                className={`w-full px-4 py-3 md:px-6 md:py-4 border focus:outline-none focus:border-primary text-base md:text-lg ${
                  errors.company ? "border-red-500" : "border-border-base"
                }`}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div className="space-y-3">
              <label className="block text-lg font-bold md:text-xl text-text-dark">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                placeholder="e.g. San Francisco, CA"
                className={`w-full px-4 py-3 md:px-6 md:py-4 border focus:outline-none focus:border-primary text-base md:text-lg ${
                  errors.location ? "border-red-500" : "border-border-base"
                }`}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label className="block text-lg font-bold md:text-xl text-text-dark">
                Category
              </label>
              <select
                {...register("category")}
                className={`w-full px-4 py-3 md:px-6 md:py-4 border focus:outline-none focus:border-primary text-base md:text-lg bg-white appearance-none ${
                  errors.category ? "border-red-500" : "border-border-base"
                }`}
              >
                <option value="Technology">Technology</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Business">Business</option>
                <option value="Human Resource">Human Resource</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label className="block text-lg font-bold md:text-xl text-text-dark">
                Employment Type
              </label>
              <select
                {...register("type")}
                className={`w-full px-4 py-3 md:px-6 md:py-4 border focus:outline-none focus:border-primary text-base md:text-lg bg-white appearance-none ${
                  errors.type ? "border-red-500" : "border-border-base"
                }`}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-bold md:text-xl text-text-dark">
              Job Description
            </label>
            <textarea
              {...register("description")}
              rows={12}
              placeholder="Detailed job description..."
              className={`w-full px-4 py-3 md:px-6 md:py-4 border focus:outline-none focus:border-primary text-base md:text-lg resize-none ${
                errors.description ? "border-red-500" : "border-border-base"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4 md:pt-8">
            <button
              type="submit"
              disabled={isPending}
              className="flex gap-3 justify-center items-center px-8 py-4 w-full text-lg font-bold text-white shadow-xl transition-all md:px-12 md:py-5 md:text-xl md:w-auto bg-primary hover:bg-opacity-90 shadow-primary/20 disabled:opacity-50"
            >
              <Save size={24} />
              {isPending
                ? jobToEdit
                  ? "Saving..."
                  : "Posting..."
                : jobToEdit
                  ? "Save Changes"
                  : "Review and Post Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
