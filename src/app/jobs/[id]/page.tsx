"use client";

import { useGetJobDetail } from "@/services/job-service";
import { Briefcase, Clock, DollarSign, LucideIcon, MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { ApplyForm } from "./components/apply-form";

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <div className="flex gap-4 items-start">
    <div className="flex justify-center items-center w-12 h-12 rounded-full bg-bg-light text-primary shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-sm text-text-light">{label}</p>
      <p className="font-bold text-text-dark">{value}</p>
    </div>
  </div>
);

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: job, isLoading } = useGetJobDetail(id);

  if (isLoading) {
    return (
      <div className="container px-4 py-20 mx-auto animate-pulse">
        <div className="mb-10 w-1/3 h-10 rounded bg-bg-light" />
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="h-96 rounded lg:w-2/3 bg-bg-light" />
          <div className="h-96 rounded lg:w-1/3 bg-bg-light" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container px-4 py-32 mx-auto text-center">
        <h1 className="mb-4 text-4xl font-bold">Job not found</h1>
        <p className="text-text-gray">
          The job you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="py-20 border-b bg-bg-light border-border-base">
        <div className="container flex flex-col gap-8 justify-between items-center px-4 mx-auto md:px-8 md:flex-row">
          <div className="flex gap-8 items-center">
            <div className="flex justify-center items-center w-24 h-24 text-4xl font-black text-white rounded-xl shadow-lg bg-primary">
              {job.company?.[0]}
            </div>
            <div>
              <h1 className="mb-2 text-4xl font-bold text-text-dark">
                {job.title}
              </h1>
              <p className="flex gap-2 items-center text-xl text-text-gray">
                {job.company}{" "}
                <span className="w-1.5 h-1.5 bg-text-light rounded-full" />{" "}
                {job.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-20 mx-auto md:px-8">
        <div className="flex flex-col gap-16 lg:flex-row">
          {/* Left Column: Description */}
          <div className="lg:w-2/3">
            <h2 className="mb-8 text-3xl font-bold text-text-dark">
              Description
            </h2>
            <div className="max-w-none leading-relaxed whitespace-pre-wrap prose prose-lg text-text-gray">
              {job.description}
            </div>

            <hr className="my-12 border-border-base" />

            <h3 className="mb-6 text-2xl font-bold text-text-dark">
              Requirements
            </h3>
            <ul className="space-y-4 text-lg list-disc list-inside text-text-gray">
              <li>
                Strong background in {job.category} with 3+ years experience
              </li>
              <li>Excellent communication and teamwork skills</li>
              <li>Passionate about solving complex problems</li>
              <li>Experience working with modern tools and frameworks</li>
            </ul>
          </div>

          {/* Right Column: Sidebar & Form */}
          <div className="lg:w-1/3">
            <div className="space-y-12">
              <section className="p-8 bg-white border border-border-base">
                <h3 className="mb-8 text-2xl font-bold text-text-dark">
                  Job Information
                </h3>
                <div className="space-y-6">
                  <InfoItem
                    icon={Briefcase}
                    label="Category"
                    value={job.category}
                  />
                  <InfoItem icon={Clock} label="Job Type" value={job.type} />
                  <InfoItem
                    icon={MapPin}
                    label="Location"
                    value={job.location}
                  />
                  <InfoItem
                    icon={DollarSign}
                    label="Salaries"
                    value="$50k - $80k"
                  />
                </div>
              </section>

              <ApplyForm jobId={job.id} jobTitle={job.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
