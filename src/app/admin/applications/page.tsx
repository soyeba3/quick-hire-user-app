"use client";

import { useGetApplications } from "@/services/application-service";
import { useGetJobs } from "@/services/job-service";
import { format } from "date-fns";
import { Clock, ExternalLink, Mail, User } from "lucide-react";

export default function ApplicationsPage() {
  const { data: appsData, isLoading } = useGetApplications({ limit: 100 });
  const { data: jobsData } = useGetJobs({ limit: 100 });

  const getJobTitle = (jobId: number) => {
    return jobsData?.items.find((j) => j.id === jobId)?.title || "Unknown Job";
  };

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-text-dark">Job Applications</h1>
        <p className="text-text-gray mt-2 text-lg">
          Review and manage candidates who applied for jobs
        </p>
      </div>

      <div className="bg-white border border-border-base shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-base bg-bg-light/50">
                <th className="px-8 py-6 text-text-dark font-bold text-lg">
                  Candidate
                </th>
                <th className="px-8 py-6 text-text-dark font-bold text-lg">
                  Applied For
                </th>
                <th className="px-8 py-6 text-text-dark font-bold text-lg">
                  Date Applied
                </th>
                <th className="px-8 py-6 text-text-dark font-bold text-lg">
                  Cover Note
                </th>
                <th className="px-8 py-6 text-text-dark font-bold text-lg text-right">
                  Resume
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-base">
              {isLoading
                ? [1, 2, 3].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-8 py-10 h-24 bg-white" />
                    </tr>
                  ))
                : appsData?.items.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-bg-light/30 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <User size={24} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-text-dark font-bold text-lg">
                              {app.name}
                            </span>
                            <span className="text-text-light flex items-center gap-1">
                              <Mail size={14} /> {app.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-text-dark font-bold text-lg">
                          {getJobTitle(app.jobId)}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-text-gray text-lg">
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          {format(new Date(app.createdAt), "dd MMM yyyy")}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-text-gray line-clamp-2 max-w-xs italic">
                          "{app.coverNote}"
                        </p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <a
                          href={app.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all"
                        >
                          View Resume
                          <ExternalLink size={18} />
                        </a>
                      </td>
                    </tr>
                  ))}
              {(!appsData || appsData.items.length === 0) && !isLoading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-20 text-center text-text-gray text-xl italic"
                  >
                    No applications received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
