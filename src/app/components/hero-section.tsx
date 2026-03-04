import { MapPin, Search } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-bg-light pt-20 pb-0 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1]">
              Discover <br />
              more than <br />
              <span className="text-secondary relative">
                5000+ Jobs
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 355 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 17C100 3 250 3 352 17"
                    stroke="#26A4FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-text-gray max-w-lg leading-relaxed">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-4 shadow-xl border border-border-base flex flex-col md:row items-center gap-4 max-w-3xl">
              <div className="flex items-center gap-3 flex-grow border-b md:border-b-0 md:border-r border-border-base pb-4 md:pb-0 md:pr-4 w-full">
                <Search className="text-text-dark" size={24} />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full focus:outline-none text-text-dark font-medium"
                />
              </div>
              <div className="flex items-center gap-3 flex-grow w-full">
                <MapPin className="text-text-dark" size={24} />
                <select className="w-full focus:outline-none text-text-dark font-medium bg-transparent appearance-none">
                  <option>Florence, Italy</option>
                  <option>New York, USA</option>
                  <option>London, UK</option>
                </select>
              </div>
              <button className="bg-primary text-white px-10 py-4 font-bold transition-all hover:bg-opacity-90 w-full md:w-auto">
                Search my job
              </button>
            </div>

            <p className="text-text-gray">
              Popular :{" "}
              <span className="text-text-dark font-semibold">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </p>
          </div>

          {/* Right Content: Hero Image */}
          <div className="lg:w-1/2 relative h-[600px] w-full flex items-end">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl opacity-50 -z-10" />

            {/* Using a placeholder for now as per user instruction "I will provide fixed images in public folder after implementation" */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-[450px] h-[550px] bg-gray-200 rounded-2xl flex items-center justify-center border-4 border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">
                  Hero Image Placeholder
                </p>
              </div>

              {/* Optional: Add some floating decorative elements to mimic design */}
              <div className="absolute top-20 right-10 bg-white p-4 shadow-lg rounded-xl flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 bg-green/20 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-green rounded-full" />
                </div>
                <div>
                  <p className="text-sm font-bold">New Jobs</p>
                  <p className="text-xs text-text-light">150+ Added today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
