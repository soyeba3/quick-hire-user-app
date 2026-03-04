"use client";

import { Check } from "lucide-react";

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
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
}: {
  selectedType: string;
  setSelectedType: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
}) => {
  const typeOptions = [
    { label: "Full-Time", value: "Full-Time" },
    { label: "Part-Time", value: "Part-Time" },
    { label: "Contract", value: "Contract" },
    { label: "Remote", value: "Remote" },
  ];

  const categoryOptions = [
    { label: "Design", count: 24, value: "Design" },
    { label: "Sales", count: 12, value: "Sales" },
    { label: "Marketing", count: 42, value: "Marketing" },
    { label: "Finance", count: 18, value: "Finance" },
    { label: "Technology", count: 56, value: "Technology" },
    { label: "Engineering", count: 34, value: "Engineering" },
    { label: "Business", count: 22, value: "Business" },
    { label: "Human Resource", count: 15, value: "Human Resource" },
  ];

  return (
    <aside className="flex-shrink-0 w-full md:w-80">
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
