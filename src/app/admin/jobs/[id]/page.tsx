"use client";

import { useGetJobDetail } from "@/services/job-service";
import { useParams } from "next/navigation";
import JobForm from "../components/job-form";

export default function EditJobPage() {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading } = useGetJobDetail(id);

  if (isLoading) {
    return (
      <div className="mx-auto space-y-8 max-w-5xl animate-pulse">
        <div className="w-48 h-8 rounded bg-bg-light" />
        <div className="w-64 h-12 rounded bg-bg-light" />
        <div className="p-12 space-y-8 bg-white border border-border-base">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 rounded bg-bg-light" />
          ))}
        </div>
      </div>
    );
  }

  if (job) {
    return <JobForm jobToEdit={job} />;
  }

  return <JobForm />;
}
