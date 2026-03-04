"use client";

import { useCreateJob } from "@/services/job-service";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "Technology",
    type: "Full-Time",
    description: "",
  });

  const router = useRouter();
  const { mutate: createJob, isPending } = useCreateJob();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJob(formData, {
      onSuccess: () => {
        router.push("/admin");
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/admin"
        className="flex items-center gap-2 text-text-gray hover:text-primary transition-colors mb-8 font-bold text-lg"
      >
        <ArrowLeft size={24} />
        Back to Dashboard
      </Link>

      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-text-dark">Post a New Job</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="bg-white p-12 border border-border-base shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-xl font-bold text-text-dark">
                Job Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Product Designer"
                className="w-full px-6 py-4 border border-border-base focus:outline-none focus:border-primary text-lg"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-3">
              <label className="block text-xl font-bold text-text-dark">
                Company Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Corp"
                className="w-full px-6 py-4 border border-border-base focus:outline-none focus:border-primary text-lg"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="block text-xl font-bold text-text-dark">
                Location
              </label>
              <input
                type="text"
                required
                placeholder="e.g. San Francisco, CA"
                className="w-full px-6 py-4 border border-border-base focus:outline-none focus:border-primary text-lg"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div className="space-y-3">
              <label className="block text-xl font-bold text-text-dark">
                Category
              </label>
              <select
                className="w-full px-6 py-4 border border-border-base focus:outline-none focus:border-primary text-lg bg-white appearance-none"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option>Technology</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Business</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="block text-xl font-bold text-text-dark">
                Employment Type
              </label>
              <select
                className="w-full px-6 py-4 border border-border-base focus:outline-none focus:border-primary text-lg bg-white appearance-none"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Remote</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xl font-bold text-text-dark">
              Job Description
            </label>
            <textarea
              required
              rows={12}
              placeholder="Detailed job description..."
              className="w-full px-6 py-4 border border-border-base focus:outline-none focus:border-primary text-lg resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end pt-8">
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white px-12 py-5 font-bold flex items-center gap-3 transition-all hover:bg-opacity-90 shadow-xl shadow-primary/20 disabled:opacity-50 text-xl"
            >
              <Save size={24} />
              {isPending ? "Posting..." : "Review and Post Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
