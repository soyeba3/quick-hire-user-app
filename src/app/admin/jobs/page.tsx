"use client";

import { useDeleteJob, useGetJobs } from "@/services/job-service";
import { Job } from "@/types";
import { format } from "date-fns";
import { Edit2, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteConfirmModal from "./components/delete-confirm-modal";

export default function AdminJobsPage() {
  const { data: jobsData, isLoading } = useGetJobs({ limit: 50 });
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();

  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const handleDeleteConfirm = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete.id, {
        onSuccess: () => setJobToDelete(null),
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-6 justify-between items-start my-12 md:flex-row md:items-center md:mb-12">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl text-text-dark">
            Job Listings
          </h1>
          <p className="mt-2 text-base md:text-lg text-text-gray">
            Manage all your posted jobs from here
          </p>
        </div>
        <Link
          href="/admin/jobs/create"
          className="flex gap-2 items-center px-6 py-3 w-full font-bold text-white shadow-lg transition-all md:px-8 md:py-4 md:w-auto bg-primary hover:bg-opacity-90 shadow-primary/20"
        >
          <Plus size={20} />
          Post a New Job
        </Link>
      </div>

      <div className="bg-white border shadow-sm border-border-base">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-base bg-bg-light/50">
                <th className="px-4 py-4 text-base font-bold md:px-8 md:py-6 md:text-lg text-text-dark">
                  Roles
                </th>
                <th className="px-4 py-4 text-base font-bold md:px-8 md:py-6 md:text-lg text-text-dark">
                  Category
                </th>
                <th className="px-4 py-4 text-base font-bold md:px-8 md:py-6 md:text-lg text-text-dark">
                  Date Posted
                </th>
                <th className="px-4 py-4 text-base font-bold md:px-8 md:py-6 md:text-lg text-text-dark">
                  Status
                </th>
                <th className="px-4 py-4 text-base font-bold text-center md:px-8 md:py-6 md:text-lg text-text-dark">
                  Applications
                </th>
                <th className="px-4 py-4 text-base font-bold text-right md:px-8 md:py-6 md:text-lg text-text-dark">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-base">
              {isLoading
                ? [1, 2, 3].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-8 py-10 h-24 bg-white" />
                    </tr>
                  ))
                : jobsData?.items.map((job) => (
                    <tr
                      key={job.id}
                      className="transition-colors hover:bg-bg-light/30"
                    >
                      <td className="px-4 py-4 md:px-8 md:py-6">
                        <div className="flex flex-col">
                          <span className="text-base font-bold md:text-lg text-text-dark line-clamp-1">
                            {job.title}
                          </span>
                          <span className="text-sm whitespace-nowrap text-text-light">
                            {job.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 md:px-8 md:py-6">
                        <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full border md:px-4 md:text-sm bg-primary/10 text-primary border-primary/20">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-base whitespace-nowrap md:px-8 md:py-6 md:text-lg text-text-gray">
                        {format(new Date(job.createdAt), "dd MMM yyyy")}
                      </td>
                      <td className="px-4 py-4 md:px-8 md:py-6">
                        <span className="flex gap-2 items-center px-4 py-1 text-sm font-bold text-green-500 rounded-full border border-green-500/20 bg-green-500/10 w-fit">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Live
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center md:px-8 md:py-6">
                        <span className="px-3 py-1 font-bold rounded-lg border md:px-4 md:py-2 md:font-black bg-bg-light text-text-dark border-border-base">
                          {job.applicationCount ?? 0}
                        </span>
                      </td>
                      <td className="px-4 py-4 md:px-8 md:py-6">
                        <div className="flex gap-2 justify-end items-center md:gap-4">
                          <Link
                            href={`/jobs/${job.id}`}
                            target="_blank"
                            className="p-2.5 rounded-xl border transition-colors md:p-3 text-text-light hover:text-primary border-border-base hover:border-primary"
                          >
                            <Eye size={20} />
                          </Link>
                          <Link
                            href={`/admin/jobs/${job.id}`}
                            className="p-2.5 rounded-xl border transition-colors md:p-3 text-text-light hover:text-primary border-border-base hover:border-primary"
                          >
                            <Edit2 size={20} />
                          </Link>
                          <button
                            onClick={() => setJobToDelete(job)}
                            className="p-2.5 rounded-xl border transition-colors md:p-3 text-text-light hover:text-red-500 border-border-base hover:border-red-500"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={jobToDelete !== null}
        jobTitle={jobToDelete?.title ?? ""}
        isPending={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={() => setJobToDelete(null)}
      />
    </div>
  );
}
