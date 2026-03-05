import { MapPin, Search } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="overflow-visible relative z-10 pt-32 bg-bg-light lg:pt-40 lg:pb-0">
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0 opacity-100 pointer-events-none">
        <Image
          src="/images/Pattern.png"
          alt="Background pattern"
          fill
          className="object-cover object-top-right lg:object-contain"
          priority
        />
      </div>

      <div className="w-full max-w-[1440px] relative z-10 px-4 mx-auto md:px-12 lg:px-20 xl:px-24">
        <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start lg:gap-0">
          <div className="pb-16 space-y-8 lg:w-1/2 lg:space-y-12 lg:pb-32">
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-text-dark">
              <Image
                src="/images/title.svg"
                alt="Discover more than 5000+ Jobs"
                width={600}
                height={200}
                className="w-full max-w-[500px] lg:max-w-none h-auto object-contain"
                priority
              />
            </h1>
            <p className="max-w-lg text-xl leading-relaxed text-text-gray">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            <div className="bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center gap-4 lg:gap-6 w-full lg:w-[800px] mt-6 relative z-10 border border-border-base/10">
              <div className="flex gap-3 items-center pb-3 w-full border-b md:flex-1 md:w-auto md:border-b-0 md:border-r border-border-base/50 md:pb-0 md:pr-4">
                <Search className="text-text-light min-w-[20px]" size={20} />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full focus:outline-none text-text-dark text-[15px] placeholder:text-text-light/70 truncate"
                />
              </div>
              <div className="flex gap-3 items-center pb-3 w-full border-b md:flex-1 md:w-auto md:border-b-0 border-border-base/50 md:pb-0 md:pr-2 lg:pl-2">
                <MapPin className="text-text-light min-w-[20px]" size={20} />
                <select className="w-full focus:outline-none text-text-dark text-[15px] bg-transparent appearance-none">
                  <option>Florence, Italy</option>
                  <option>New York, USA</option>
                  <option>London, UK</option>
                </select>
              </div>
              <button className="bg-primary text-white px-8 py-3.5 font-bold transition-all hover:bg-opacity-90 w-full md:w-auto text-[15px] shrink-0">
                Search my job
              </button>
            </div>

            <p className="text-sm font-medium text-text-gray">
              Popular :{" "}
              <span className="font-semibold text-text-dark">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </p>
          </div>

          <div className="lg:w-1/2 hidden lg:block relative h-[450px] md:h-[600px] lg:h-[750px] w-full flex justify-center lg:justify-end items-end lg:absolute lg:right-0 lg:bottom-0 z-20 pointer-events-none lg:-mr-12">
            <div className=" relative z-10 w-full h-full max-w-[500px] lg:max-w-[800px] lg:mx-0 mx-auto">
              <Image
                src="/images/man.png"
                alt="Job seeker pointing"
                fill
                className="object-contain object-bottom lg:object-bottom-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
