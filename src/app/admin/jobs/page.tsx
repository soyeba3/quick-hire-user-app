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
      <div className="flex justify-between items-center mt-12 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-text-dark">Job Listings</h1>
          <p className="mt-2 text-lg text-text-gray">
            Manage all your posted jobs from here
          </p>
        </div>
        <Link
          href="/admin/jobs/create"
          className="flex gap-2 items-center px-8 py-4 font-bold text-white shadow-lg transition-all bg-primary hover:bg-opacity-90 shadow-primary/20"
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
                <th className="px-8 py-6 text-lg font-bold text-text-dark">
                  Roles
                </th>
                <th className="px-8 py-6 text-lg font-bold text-text-dark">
                  Category
                </th>
                <th className="px-8 py-6 text-lg font-bold text-text-dark">
                  Date Posted
                </th>
                <th className="px-8 py-6 text-lg font-bold text-text-dark">
                  Status
                </th>
                <th className="px-8 py-6 text-lg font-bold text-text-dark">
                  Applications
                </th>
                <th className="px-8 py-6 text-lg font-bold text-right text-text-dark">
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
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-text-dark">
                            {job.title}
                          </span>
                          <span className="text-text-light">{job.type}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1 text-sm font-bold tracking-wider uppercase rounded-full border bg-primary/10 text-primary border-primary/20">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-lg text-text-gray">
                        {format(new Date(job.createdAt), "dd MMM yyyy")}
                      </td>
                      <td className="px-8 py-6">
                        <span className="flex gap-2 items-center px-4 py-1 font-bold text-green-500 rounded-full border border-green-500/20 bg-green-500/10 w-fit">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Live
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="px-4 py-2 font-black rounded-lg border bg-bg-light text-text-dark border-border-base">
                          {job.applicationCount ?? 0}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-4 justify-end items-center">
                          <Link
                            href={`/jobs/${job.id}`}
                            target="_blank"
                            className="p-3 rounded-xl border transition-colors text-text-light hover:text-primary border-border-base hover:border-primary"
                          >
                            <Eye size={20} />
                          </Link>
                          <Link
                            href={`/admin/jobs/${job.id}`}
                            className="p-3 rounded-xl border transition-colors text-text-light hover:text-primary border-border-base hover:border-primary"
                          >
                            <Edit2 size={20} />
                          </Link>
                          <button
                            onClick={() => setJobToDelete(job)}
                            className="p-3 rounded-xl border transition-colors text-text-light hover:text-red-500 border-border-base hover:border-red-500"
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
