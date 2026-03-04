"use client";

import { useSubmitApplication } from "@/services/application-service";
import { useState } from "react";

export const ApplyForm = ({
  jobId,
  jobTitle,
}: {
  jobId: number;
  jobTitle: string;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });

  const { mutate: apply, isPending } = useSubmitApplication();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apply(
      {
        jobId,
        ...formData,
      },
      {
        onSuccess: () => {
          setFormData({ name: "", email: "", resumeLink: "", coverNote: "" });
        },
      },
    );
  };

  return (
    <div className="sticky top-8 p-8 bg-white border border-border-base">
      <h3 className="mb-2 text-2xl font-bold text-text-dark">
        Apply for this job
      </h3>
      <p className="mb-8 italic text-text-light">Job: {jobTitle}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-bold text-text-dark">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Enter your full name"
            className="px-4 py-3 w-full border border-border-base focus:outline-none focus:border-primary"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-text-dark">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="px-4 py-3 w-full border border-border-base focus:outline-none focus:border-primary"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-text-dark">
            Resume Link (URL)
          </label>
          <input
            type="url"
            required
            placeholder="Link to your resume (Drive/Dropbox/etc)"
            className="px-4 py-3 w-full border border-border-base focus:outline-none focus:border-primary"
            value={formData.resumeLink}
            onChange={(e) =>
              setFormData({ ...formData, resumeLink: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-text-dark">
            Cover Note
          </label>
          <textarea
            required
            rows={4}
            placeholder="Why are you a good fit?"
            className="px-4 py-3 w-full border resize-none border-border-base focus:outline-none focus:border-primary"
            value={formData.coverNote}
            onChange={(e) =>
              setFormData({ ...formData, coverNote: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="py-4 w-full font-bold text-white transition-all bg-primary hover:bg-opacity-90 disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};
