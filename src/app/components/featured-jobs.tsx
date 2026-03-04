import { JobCard } from "@/components/job-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const sampleJobs = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    tags: ["Marketing", "Design"],
    type: "Full Time",
    logoBg: "bg-black",
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    tags: ["Design", "Business"],
    type: "Full Time",
    logoBg: "bg-primary",
  },
  {
    id: 3,
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    tags: ["Marketing", "Design"],
    type: "Full Time",
    logoBg: "bg-green",
  },
  {
    id: 4,
    title: "Visual Designer",
    company: "Blinkist",
    location: "Granada, Spain",
    tags: ["Design"],
    type: "Full Time",
    logoBg: "bg-secondary",
  },
  {
    id: 5,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    tags: ["Marketing", "Design"],
    type: "Full Time",
    logoBg: "bg-blue-600",
  },
  {
    id: 6,
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    tags: ["Design", "Business"],
    type: "Full Time",
    logoBg: "bg-teal-500",
  },
  {
    id: 7,
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    tags: ["Marketing"],
    type: "Full Time",
    logoBg: "bg-orange-500",
  },
  {
    id: 8,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    tags: ["Technology"],
    type: "Full Time",
    logoBg: "bg-sky-400",
  },
];

export const FeaturedJobs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto md:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold lg:text-5xl">
            Featured <span className="text-secondary">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden gap-2 items-center pb-1 font-bold border-b-2 border-transparent transition-all md:flex text-primary group hover:border-primary"
          >
            Show all jobs{" "}
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sampleJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};
