"use client";

import { useGetJobDetail } from "@/services/job-service";
import { Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { ApplyForm } from "./components/apply-form";

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-bg-light rounded-full flex items-center justify-center text-primary shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-text-light text-sm">{label}</p>
      <p className="text-text-dark font-bold">{value}</p>
    </div>
  </div>
);

export default function JobDetailPage() {
  const { id } = useParams();
  const { data: job, isLoading } = useGetJobDetail(id as string);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 animate-pulse">
        <div className="h-10 bg-bg-light w-1/3 mb-10 rounded" />
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3 h-96 bg-bg-light rounded" />
          <div className="lg:w-1/3 h-96 bg-bg-light rounded" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Job not found</h1>
        <p className="text-text-gray">
          The job you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="bg-bg-light py-20 border-b border-border-base">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-primary rounded-xl flex items-center justify-center text-white font-black text-4xl shadow-lg">
              {job.company.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-text-dark mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-text-gray flex items-center gap-2">
                {job.company}{" "}
                <span className="w-1.5 h-1.5 bg-text-light rounded-full" />{" "}
                {job.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Description */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-text-dark mb-8">
              Description
            </h2>
            <div className="prose prose-lg max-w-none text-text-gray leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>

            <hr className="my-12 border-border-base" />

            <h3 className="text-2xl font-bold text-text-dark mb-6">
              Requirements
            </h3>
            <ul className="list-disc list-inside space-y-4 text-text-gray text-lg">
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
              <section className="bg-white p-8 border border-border-base">
                <h3 className="text-2xl font-bold text-text-dark mb-8">
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
