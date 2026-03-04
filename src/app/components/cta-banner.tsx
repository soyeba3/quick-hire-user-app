import Image from "next/image";
import Link from "next/link";

export const CTABanner = () => {
  return (
    <section className="overflow-hidden py-24 bg-white">
      <div className="container px-4 mx-auto md:px-8">
        <div className="relative w-full min-h-[420px] flex flex-col lg:flex-row items-center group">
          {/* Background Shape */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/rectangle.svg"
              alt="background"
              fill
              className="object-fill select-none"
              priority
            />
          </div>

          {/* Content Area */}
          <div className="relative z-10 lg:w-[45%] px-8 lg:pl-20 py-16 lg:py-0 text-white flex flex-col items-start text-left">
            <h2 className="text-4xl lg:text-5xl font-black leading-[1.1] mb-6">
              Start posting <br />
              jobs today
            </h2>
            <p className="mb-8 text-lg font-medium text-white/90">
              Start posting jobs for only $10.
            </p>
            <Link
              href="/signup"
              className="px-10 py-5 text-lg font-extrabold bg-white rounded-sm shadow-lg transition-all text-[#4640DE] hover:bg-gray-50 active:scale-95 whitespace-nowrap"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Graphic Area */}
          <div className="relative z-10 lg:w-[55%] w-full h-[300px] lg:h-[450px] flex items-center justify-center lg:justify-end lg:pr-4 overflow-visible">
            <div className="relative w-full h-full max-w-[650px] lg:scale-110 lg:translate-x-10 lg:translate-y-4 transition-transform duration-500 group-hover:scale-[1.12]">
              <Image
                src="/images/dashboard_ompany.svg"
                alt="QuickHire Dashboard"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Circular Portrait at the bottom */}
          <div className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 z-20 hidden lg:block translate-y-2">
            <div className="relative w-[75px] h-[75px] rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
              <Image
                src="/images/man.png"
                alt="QuickHire User"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
