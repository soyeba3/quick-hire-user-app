"use client";

import { useCreateJob } from "@/services/job-service";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { JobInput, jobSchema } from "./schemas/job.schema";

export default function CreateJobPage() {
  const router = useRouter();
  const { mutate: createJob, isPending } = useCreateJob();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      category: "Technology",
      type: "Full-Time",
    },
  });

  const onSubmit = (data: JobInput) => {
    createJob(data, {
      onSuccess: () => {
        router.push("/admin");
      },
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin"
        className="flex gap-2 items-center mb-8 text-lg font-bold transition-colors text-text-gray hover:text-primary"
      >
        <ArrowLeft size={24} />
        Back to Dashboard
      </Link>

      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-text-dark">Post a New Job</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="p-12 space-y-8 bg-white border shadow-sm border-border-base">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-xl font-bold text-text-dark">
                Job Title
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="e.g. Senior Product Designer"
                className={`w-full px-6 py-4 border focus:outline-none focus:border-primary text-lg ${
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
              <label className="block text-xl font-bold text-text-dark">
                Company Name
              </label>
              <input
                type="text"
                {...register("company")}
                placeholder="e.g. Acme Corp"
                className={`w-full px-6 py-4 border focus:outline-none focus:border-primary text-lg ${
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

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <label className="block text-xl font-bold text-text-dark">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                placeholder="e.g. San Francisco, CA"
                className={`w-full px-6 py-4 border focus:outline-none focus:border-primary text-lg ${
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
              <label className="block text-xl font-bold text-text-dark">
                Category
              </label>
              <select
                {...register("category")}
                className={`w-full px-6 py-4 border focus:outline-none focus:border-primary text-lg bg-white appearance-none ${
                  errors.category ? "border-red-500" : "border-border-base"
                }`}
              >
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Business">Business</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label className="block text-xl font-bold text-text-dark">
                Employment Type
              </label>
              <select
                {...register("type")}
                className={`w-full px-6 py-4 border focus:outline-none focus:border-primary text-lg bg-white appearance-none ${
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
            <label className="block text-xl font-bold text-text-dark">
              Job Description
            </label>
            <textarea
              {...register("description")}
              rows={12}
              placeholder="Detailed job description..."
              className={`w-full px-6 py-4 border focus:outline-none focus:border-primary text-lg resize-none ${
                errors.description ? "border-red-500" : "border-border-base"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-8">
            <button
              type="submit"
              disabled={isPending}
              className="flex gap-3 items-center px-12 py-5 text-xl font-bold text-white shadow-xl transition-all bg-primary hover:bg-opacity-90 shadow-primary/20 disabled:opacity-50"
            >
              <Save size={24} />
              {isPending ? "Posting..." : "Review and Post Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
