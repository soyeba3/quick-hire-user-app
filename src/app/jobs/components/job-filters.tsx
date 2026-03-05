"use client";

import { Job } from "@/types";
import { Check } from "lucide-react";
import { useMemo } from "react";

interface FilterSectionProps {
  title: string;
  options: { label: string; count?: number; value: string }[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const FilterSection = ({
  title,
  options,
  selectedValue,
  onSelect,
}: FilterSectionProps) => (
  <div className="mb-10">
    <h4 className="mb-6 text-xl font-bold tracking-tight text-text-dark">
      {title}
    </h4>
    <div className="space-y-4">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex gap-3 items-center cursor-pointer group"
          onClick={() => onSelect(option.value)}
        >
          <div
            className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
              selectedValue === option.value
                ? "bg-primary border-primary"
                : "border-border-base group-hover:border-primary"
            }`}
          >
            {selectedValue === option.value && (
              <Check size={16} className="text-white" />
            )}
          </div>
          <span
            className={`text-lg transition-colors ${
              selectedValue === option.value
                ? "text-text-dark font-semibold"
                : "text-text-gray"
            }`}
          >
            {option.label}
          </span>
          {option.count !== undefined && (
            <span className="ml-auto text-text-light">({option.count})</span>
          )}
        </label>
      ))}
    </div>
  </div>
);

export const JobFilters = ({
  jobs = [],
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
}: {
  jobs?: Job[];
  selectedType: string;
  setSelectedType: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
}) => {
  const typeOptions = useMemo(
    () =>
      [
        { label: "Full-Time", value: "Full-Time" },
        { label: "Part-Time", value: "Part-Time" },
        { label: "Contract", value: "Contract" },
        { label: "Remote", value: "Remote" },
      ].map((opt) => ({
        ...opt,
        count: jobs.filter((job) => job.type === opt.value).length,
      })),
    [jobs],
  );

  const categoryOptions = useMemo(
    () =>
      [
        { label: "Design", value: "Design" },
        { label: "Sales", value: "Sales" },
        { label: "Marketing", value: "Marketing" },
        { label: "Finance", value: "Finance" },
        { label: "Technology", value: "Technology" },
        { label: "Engineering", value: "Engineering" },
        { label: "Business", value: "Business" },
        { label: "Human Resource", value: "Human Resource" },
      ].map((opt) => ({
        ...opt,
        count: jobs.filter((job) => job.category === opt.value).length,
      })),
    [jobs],
  );

  return (
    <aside className="w-full shrink-0 md:w-80">
      <FilterSection
        title="Type of Employment"
        options={typeOptions}
        selectedValue={selectedType}
        onSelect={(v) => setSelectedType(selectedType === v ? "" : v)}
      />
      <FilterSection
        title="Categories"
        options={categoryOptions}
        selectedValue={selectedCategory}
        onSelect={(v) => setSelectedCategory(selectedCategory === v ? "" : v)}
      />
    </aside>
  );
};
