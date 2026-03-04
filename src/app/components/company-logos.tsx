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
      <div className="container px-4 mx-auto md:px-8">
        <p className="mb-6 text-sm text-text-gray lg:text-base">
          Companies we helped grow
        </p>
        <div className="grid grid-cols-2 gap-8 items-center opacity-60 md:grid-cols-3 lg:grid-cols-5 md:gap-12">
          {companies.map((company) => (
            <div
              key={company.name}
              className="relative mx-auto w-full h-8 md:h-10"
            >
              <Image
                src={company.src}
                alt={`${company.name} logo`}
                fill
                className="object-contain grayscale transition-all hover:grayscale-0"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
