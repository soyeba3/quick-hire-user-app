"use client";

import {
  ApplicationInput,
  applicationSchema,
} from "@/app/jobs/schemas/application.schema";
import { useSubmitApplication } from "@/services/application-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const ApplyForm = ({
  jobId,
  jobTitle,
}: {
  jobId: number;
  jobTitle: string;
}) => {
  const { mutate: apply, isPending } = useSubmitApplication();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = (data: ApplicationInput) => {
    apply(
      {
        jobId,
        ...data,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <div className="sticky top-8 p-8 bg-white border border-border-base">
      <h3 className="mb-2 text-2xl font-bold text-text-dark">
        Apply for this job
      </h3>
      <p className="mb-8 italic text-text-light">Job: {jobTitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 font-bold text-text-dark">
            Full Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 border focus:outline-none focus:border-primary ${
              errors.name ? "border-red-500" : "border-border-base"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-bold text-text-dark">
            Email Address
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email address"
            className={`w-full px-4 py-3 border focus:outline-none focus:border-primary ${
              errors.email ? "border-red-500" : "border-border-base"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-bold text-text-dark">
            Resume Link (URL)
          </label>
          <input
            type="url"
            {...register("resumeLink")}
            placeholder="Link to your resume (Drive/Dropbox/etc)"
            className={`w-full px-4 py-3 border focus:outline-none focus:border-primary ${
              errors.resumeLink ? "border-red-500" : "border-border-base"
            }`}
          />
          {errors.resumeLink && (
            <p className="mt-1 text-sm text-red-500">
              {errors.resumeLink.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-bold text-text-dark">
            Cover Note
          </label>
          <textarea
            {...register("coverNote")}
            rows={4}
            placeholder="Why are you a good fit?"
            className={`w-full px-4 py-3 border focus:outline-none focus:border-primary resize-none ${
              errors.coverNote ? "border-red-500" : "border-border-base"
            }`}
          />
          {errors.coverNote && (
            <p className="mt-1 text-sm text-red-500">
              {errors.coverNote.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="py-4 w-full font-bold text-white transition-all bg-primary hover:bg-opacity-90 disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};
