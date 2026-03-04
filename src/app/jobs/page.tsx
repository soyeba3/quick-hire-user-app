"use client";

import { JobCard } from "@/components/job-card";
import { useGetJobs } from "@/services/job-service";
import { Grid, List as ListIcon, MapPin, Search } from "lucide-react";
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
    <div className="bg-white min-h-screen">
      {/* Header / Search Section */}
      <div className="border-b border-border-base py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-text-dark mb-8">
              Find your dream job
            </h1>

            <div className="bg-white p-4 shadow-xl border border-border-base flex flex-col md:row items-center gap-4">
              <div className="flex items-center gap-3 flex-grow border-b md:border-b-0 md:border-r border-border-base pb-4 md:pb-0 md:pr-4 w-full">
                <Search className="text-primary" size={24} />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full focus:outline-none text-text-dark font-medium"
                />
              </div>
              <div className="flex items-center gap-3 flex-grow w-full">
                <MapPin className="text-primary" size={24} />
                <select className="w-full focus:outline-none text-text-dark font-medium bg-transparent appearance-none">
                  <option>Florence, Italy</option>
                  <option>New York, USA</option>
                </select>
              </div>
              <button className="bg-primary text-white px-10 py-4 font-bold transition-all hover:bg-opacity-90 w-full md:w-auto">
                Search
              </button>
            </div>

            <p className="mt-4 text-text-gray">
              Popular :{" "}
              <span className="text-text-dark font-medium">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row gap-12">
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
              <p className="text-text-light mt-1">
                Showing {jobsData?.items?.length || 0} results
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-text-gray font-medium mr-2">
                Sort by: <span className="text-text-dark">Newest</span>
              </span>
              <div className="flex border border-border-base rounded overflow-hidden">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-bg-light animate-pulse rounded-lg"
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
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  type={job.type}
                  tags={[job.category]}
                  variant={viewMode}
                />
              ))}
              {(!jobsData || jobsData.items.length === 0) && (
                <div className="py-20 text-center border border-dashed border-border-base rounded-xl">
                  <p className="text-text-gray text-xl">
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
