import Link from "next/link";

interface JobCardProps {
  id: string | number;
  title: string;
  company: string;
  location: string;
  tags: string[];
  type: string;
  logoBg?: string;
  variant?: "grid" | "list";
}

export const JobCard = ({
  id,
  title,
  company,
  location,
  tags,
  type,
  logoBg = "bg-primary",
  variant = "grid",
}: JobCardProps) => {
  if (variant === "list") {
    return (
      <div className="bg-white p-6 border border-border-base flex items-center justify-between hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-6">
          <div
            className={`w-12 h-12 ${logoBg} rounded-md flex items-center justify-center text-white font-bold text-xl`}
          >
            {company.charAt(0)}
          </div>
          <div>
            <h4 className="text-xl font-bold text-text-dark">{title}</h4>
            <p className="text-text-light flex items-center gap-2">
              {company} <span className="w-1 h-1 bg-text-light rounded-full" />{" "}
              {location}
            </p>
            <div className="flex gap-2 mt-2">
              <span className="bg-green/10 text-green px-3 py-1 rounded-full text-xs font-bold">
                {type}
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-yellow/10 text-yellow px-3 py-1 rounded-full text-xs font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <Link
            href={`/jobs/${id}`}
            className="bg-primary text-white px-6 py-2 font-bold transition-all hover:bg-opacity-90"
          >
            Apply
          </Link>
          <p className="text-xs text-text-light">5 days ago</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 border border-border-base flex flex-col hover:shadow-xl transition-shadow group">
      <div className="flex justify-between items-start mb-6">
        <div
          className={`w-12 h-12 ${logoBg} rounded-md flex items-center justify-center text-white font-bold text-xl`}
        >
          {company.charAt(0)}
        </div>
        <span className="border border-primary text-primary px-3 py-1 text-sm font-bold uppercase tracking-wider">
          {type}
        </span>
      </div>

      <h4 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-text-light mb-6 flex items-center gap-2">
        {company} <span className="w-1 h-1 bg-text-light rounded-full" />{" "}
        {location}
      </p>

      <p className="text-text-gray text-sm mb-6 line-clamp-2">
        We are looking for a passionate {title} to join our growing team...
      </p>

      <div className="mt-auto flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`px-4 py-1.5 rounded-full text-xs font-bold ${
              tag === "Marketing"
                ? "bg-primary-light text-primary"
                : "bg-green/10 text-green"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
