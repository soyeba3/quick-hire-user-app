"use client";

import { useDeleteJob, useGetJobs } from "@/services/job-service";
import { format } from "date-fns";
import { Edit2, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: jobsData, isLoading } = useGetJobs({ limit: 50 });
  const { mutate: deleteJob } = useDeleteJob();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-text-dark">Job Listings</h1>
          <p className="text-text-gray mt-2 text-lg">
            Manage all your posted jobs from here
          </p>
        </div>
        <Link
          href="/admin/jobs/create"
          className="bg-primary text-white px-8 py-4 font-bold flex items-center gap-2 transition-all hover:bg-opacity-90 shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          Post a New Job
        </Link>
      </div>

      <div className="bg-white border border-border-base shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-base bg-bg-light/50">
                <th className="px-8 py-6 text-text-dark font-bold text-lg">
                  Roles
                </th>
                <th className="px-8 py-6 text-text-dark font-bold text-lg">
                  Category
                </th>
                <th className="px-8 py-6 text-text-dark font-bold text-lg">
                  Date Posted
                </th>
                <th className="px-8 py-6 text-text-dark font-bold text-lg">
                  Status
                </th>
                <th className="px-8 py-6 text-text-dark font-bold text-lg">
                  Applications
                </th>
                <th className="px-8 py-6 text-text-dark font-bold text-lg text-right">
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
                      className="hover:bg-bg-light/30 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-text-dark font-bold text-lg">
                            {job.title}
                          </span>
                          <span className="text-text-light">{job.type}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-bold uppercase tracking-wider">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-text-gray text-lg">
                        {format(new Date(job.createdAt), "dd MMM yyyy")}
                      </td>
                      <td className="px-8 py-6">
                        <span className="flex items-center gap-2 text-green-500 font-bold border border-green-500/20 bg-green-500/10 px-4 py-1 rounded-full w-fit">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Live
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="bg-bg-light px-4 py-2 font-black text-text-dark border border-border-base rounded-lg">
                          {job.applicationCount || 0}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end items-center gap-4">
                          <Link
                            href={`/jobs/${job.id}`}
                            target="_blank"
                            className="p-3 text-text-light hover:text-primary transition-colors border border-border-base rounded-xl hover:border-primary"
                          >
                            <Eye size={20} />
                          </Link>
                          <button className="p-3 text-text-light hover:text-primary transition-colors border border-border-base rounded-xl hover:border-primary">
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="p-3 text-text-light hover:text-red-500 transition-colors border border-border-base rounded-xl hover:border-red-500"
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
    </div>
  );
}
