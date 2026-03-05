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
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl font-bold md:text-4xl text-text-dark">
          Job Applications
        </h1>
        <p className="mt-2 text-base md:text-lg text-text-gray">
          Review and manage candidates who applied for jobs
        </p>
      </div>

      <div className="bg-white border shadow-sm border-border-base">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-base bg-bg-light/50">
                <th className="px-4 py-4 text-base font-bold md:px-8 md:py-6 md:text-lg text-text-dark">
                  Candidate
                </th>
                <th className="px-4 py-4 text-base font-bold md:px-8 md:py-6 md:text-lg text-text-dark">
                  Applied For
                </th>
                <th className="px-4 py-4 text-base font-bold md:px-8 md:py-6 md:text-lg text-text-dark">
                  Date Applied
                </th>
                <th className="px-4 py-4 text-base font-bold md:px-8 md:py-6 md:text-lg text-text-dark">
                  Cover Note
                </th>
                <th className="px-4 py-4 text-base font-bold md:px-8 md:py-6 md:text-lg text-right text-text-dark">
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
                      className="transition-colors hover:bg-bg-light/30"
                    >
                      <td className="px-4 py-4 md:px-8 md:py-6">
                        <div className="flex gap-4 items-center">
                          <div className="hidden justify-center items-center w-12 h-12 rounded-full sm:flex bg-primary/10 text-primary">
                            <User size={24} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-bold md:text-lg text-text-dark whitespace-nowrap">
                              {app.name}
                            </span>
                            <span className="flex gap-1 items-center text-sm md:text-base text-text-light whitespace-nowrap">
                              <Mail size={14} /> {app.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 md:px-8 md:py-6">
                        <span className="text-base font-bold md:text-lg text-text-dark whitespace-nowrap">
                          {getJobTitle(app.jobId)}
                        </span>
                      </td>
                      <td className="px-4 py-4 md:px-8 md:py-6">
                        <div className="flex gap-2 items-center text-base md:text-lg text-text-gray whitespace-nowrap">
                          <Clock size={16} />
                          {format(new Date(app.createdAt), "dd MMM yyyy")}
                        </div>
                      </td>
                      <td className="px-4 py-4 md:px-8 md:py-6">
                        <p className="max-w-xs italic text-sm md:text-base text-text-gray line-clamp-2 min-w-[200px]">
                          {'"'}
                          {app.coverNote}
                          {'"'}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-right md:px-8 md:py-6">
                        <a
                          href={app.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex gap-2 items-center text-sm font-bold transition-all md:text-base text-primary hover:underline whitespace-nowrap"
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
                    className="px-8 py-20 text-xl italic text-center text-text-gray"
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
