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
      <div className="flex flex-col gap-6 p-6 bg-white border transition-all border-border-base md:flex-row md:items-center md:justify-between hover:shadow-xl group">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div
            className={`flex justify-center items-center w-14 h-14 text-2xl font-bold text-white rounded-xl shadow-sm ${logoBg} shrink-0`}
          >
            {company.charAt(0)}
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-bold transition-colors lg:text-2xl text-text-dark group-hover:text-primary">
              {title}
            </h4>
            <p className="flex gap-2 items-center text-base text-gray-500 md:text-lg">
              {company} <span className="w-1 h-1 bg-gray-400 rounded-full" />{" "}
              {location}
            </p>
            <div className="flex flex-wrap gap-3 mt-4 md:mt-2">
              <span className="px-4 py-1 text-sm font-bold text-green-500 bg-green-50 rounded-full">
                {type}
              </span>
              <div className="w-px h-6 bg-gray-200" />
              {tags.map((tag, idx) => (
                <span
                  key={tag}
                  className={`px-4 py-1 text-sm font-bold rounded-full border ${
                    idx === 0
                      ? "border-orange-400 text-orange-400"
                      : "border-blue-600 text-blue-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden flex-col gap-3 items-end md:flex shrink-0">
          <span className="inline-block px-8 py-3 font-bold text-white shadow-lg transition-all bg-primary hover:bg-opacity-90 active:scale-95 shadow-primary/20">
            Apply
          </span>
          <p className="text-sm italic font-medium text-text-light">
            5 days ago
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 bg-white border transition-shadow border-border-base hover:shadow-xl group">
      <div className="flex justify-between items-start mb-6">
        <div
          className={`flex justify-center items-center w-12 h-12 text-xl font-bold text-white rounded-md ${logoBg}`}
        >
          {company.charAt(0)}
        </div>
        <span className="px-3 py-1 text-sm font-bold tracking-wider uppercase border text-primary border-primary">
          {type}
        </span>
      </div>

      <h4 className="mb-2 text-xl font-bold transition-colors text-text-dark group-hover:text-primary">
        {title}
      </h4>
      <p className="flex gap-2 items-center mb-6 text-text-light">
        {company} <span className="w-1 h-1 rounded-full bg-text-light" />{" "}
        {location}
      </p>

      <p className="mb-6 text-sm line-clamp-2 text-text-gray">
        We are looking for a passionate {title} to join our growing team...
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
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
