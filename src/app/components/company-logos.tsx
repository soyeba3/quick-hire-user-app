import Image from "next/image";

export const CompanyLogos = () => {
  const companies = [
    { name: "vodafone", src: "/images/other-companies-logo/vodafone-logo.png" },
    { name: "intel", src: "/images/other-companies-logo/intel-3.png" },
    { name: "tesla", src: "/images/other-companies-logo/tesla-9 1.png" },
    { name: "amd", src: "/images/other-companies-logo/amd-logo-1.png" },
    { name: "talkit", src: "/images/other-companies-logo/talkit 1.png" },
  ];

  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <p className="text-text-gray mb-6 text-sm lg:text-base">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap justify-between items-center gap-6 md:gap-8 opacity-60">
          {companies.map((company) => (
            <div
              key={company.name}
              className="relative h-6 md:h-8 w-24 md:w-32"
            >
              <Image
                src={company.src}
                alt={`${company.name} logo`}
                fill
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
