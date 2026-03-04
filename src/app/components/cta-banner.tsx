import Image from "next/image";
import Link from "next/link";

export const CTABanner = () => {
  return (
    <section className="overflow-hidden py-16 bg-white">
      <div className="container px-4 mx-auto md:px-8">
        <div
          className="relative w-full min-h-[480px] lg:h-[480px] flex items-center overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/rectangle.svg')" }}
        >
          <div className="flex relative z-20 flex-col items-start px-8 w-full text-left lg:w-1/2 lg:pl-20">
            <h2 className="text-4xl lg:text-[56px] font-bold leading-[1.1] mb-5 text-white">
              Start posting <br />
              jobs today
            </h2>
            <p className="mb-10 text-lg font-normal text-white/90">
              Start posting jobs for only $10.
            </p>
            <Link
              href="/login"
              className="px-10 py-4 text-base font-bold bg-white rounded text-[#4640DE] hover:bg-gray-50 transition-all active:scale-95 whitespace-nowrap inline-block shadow-lg"
            >
              Sign Up For Free
            </Link>
          </div>

          <div className="absolute right-0 bottom-0 top-0 lg:w-[650px] hidden lg:flex items-end justify-end pointer-events-none transform lg:-translate-x-20">
            <div className="relative w-full h-[95%] mb-0">
              <Image
                src="/images/dashboard_ompany.svg"
                alt="QuickHire Dashboard"
                fill
                className="object-contain object-bottom-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
