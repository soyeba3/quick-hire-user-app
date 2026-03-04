export const CompanyLogos = () => {
  const companies = ["vodafone", "intel", "TESLA", "AMD", "Talkit"];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <p className="text-text-gray mb-8">Companies we helped grow</p>
        <div className="flex flex-wrap justify-between items-center gap-8 opacity-40">
          {companies.map((company) => (
            <span
              key={company}
              className="text-3xl font-black text-text-dark tracking-tighter"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
