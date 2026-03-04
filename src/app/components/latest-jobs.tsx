import { JobCard } from "@/components/job-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const latestJobs = [
  {
    id: 9,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: ["Marketing", "Design"],
    type: "Full-Time",
    logoBg: "bg-green",
  },
  {
    id: 10,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    tags: ["Marketing", "Design"],
    type: "Full-Time",
    logoBg: "bg-blue-600",
  },
  {
    id: 11,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    tags: ["Marketing", "Design"],
    type: "Full-Time",
    logoBg: "bg-orange-500",
  },
  {
    id: 12,
    title: "HR Manager",
    company: "Packer",
    location: "Lucerne, Switzerland",
    tags: ["Marketing", "Design"],
    type: "Full-Time",
    logoBg: "bg-red-500",
  },
  {
    id: 13,
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: ["Marketing", "Design"],
    type: "Full-Time",
    logoBg: "bg-teal-500",
  },
];

export const LatestJobs = () => {
  return (
    <section className="py-24 bg-white border-t border-border-base">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-5xl font-bold">
            Latest <span className="text-secondary">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="text-primary font-bold flex items-center gap-2 group border-b-2 border-transparent hover:border-primary transition-all pb-1"
          >
            Show all jobs{" "}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestJobs.map((job) => (
            <JobCard key={job.id} {...job} variant="list" />
          ))}
        </div>
      </div>
    </section>
  );
};
