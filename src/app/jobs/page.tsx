"use client";

import { JobCard } from "@/components/job-card";
import { useGetJobs } from "@/services/job-service";
import { Grid, List as ListIcon, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { JobFilters } from "./components/job-filters";

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: jobsData, isLoading } = useGetJobs({
    search: search || undefined,
    type: selectedType || undefined,
    category: selectedCategory || undefined,
    limit: 10,
  });

  return (
    <div className="mt-12 min-h-screen bg-white">
      <div className="py-12 border-b border-border-base">
        <div className="container px-4 mx-auto md:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-4xl font-bold text-text-dark">
              Find your dream job
            </h1>

            <div className="flex flex-col gap-4 items-center p-4 bg-white border shadow-xl border-border-base md:row">
              <div className="flex flex-grow gap-3 items-center pb-4 w-full border-b md:border-b-0 md:border-r border-border-base md:pb-0 md:pr-4">
                <Search className="text-primary" size={24} />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full font-medium focus:outline-none text-text-dark"
                />
              </div>
              <div className="flex flex-grow gap-3 items-center w-full">
                <MapPin className="text-primary" size={24} />
                <select className="w-full font-medium bg-transparent appearance-none focus:outline-none text-text-dark">
                  <option>Florence, Italy</option>
                  <option>New York, USA</option>
                </select>
              </div>
              <button className="px-10 py-4 w-full font-bold text-white transition-all bg-primary hover:bg-opacity-90 md:w-auto">
                Search
              </button>
            </div>

            <p className="mt-4 text-text-gray">
              Popular :{" "}
              <span className="font-medium text-text-dark">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-12 px-4 py-16 mx-auto md:px-8 md:flex-row">
        {/* Filters Sidebar */}
        <JobFilters
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Main Content */}
        <div className="flex-grow">
          {/* Controls */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text-dark">All Jobs</h2>
              <p className="mt-1 text-text-light">
                Showing {jobsData?.items?.length || 0} results
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <span className="mr-2 font-medium text-text-gray">
                Sort by: <span className="text-text-dark">Newest</span>
              </span>
              <div className="flex overflow-hidden rounded border border-border-base">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-bg-light text-primary" : "bg-white text-text-light hover:text-primary"}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-bg-light text-primary" : "bg-white text-text-light hover:text-primary"}`}
                >
                  <ListIcon size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Job List */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-lg animate-pulse bg-bg-light"
                />
              ))}
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {(jobsData?.items || []).map((job) => (
                <Link href={`/jobs/${job.id}`} key={job.id} className="block">
                  <JobCard
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    type={job.type}
                    tags={[job.category]}
                    variant={viewMode}
                  />
                </Link>
              ))}
              {(!jobsData || jobsData.items.length === 0) && (
                <div className="py-20 text-center rounded-xl border border-dashed border-border-base">
                  <p className="text-xl text-text-gray">
                    No jobs found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
