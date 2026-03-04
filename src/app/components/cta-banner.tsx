import Link from "next/link";

export const CTABanner = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-primary relative overflow-hidden flex flex-col lg:flex-row items-center justify-between px-12 lg:px-24 py-16 lg:py-0 h-auto lg:h-[460px]">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4 pointer-events-none" />

          <div className="lg:w-1/2 space-y-6 z-10 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Start posting <br /> jobs today
            </h2>
            <p className="text-white/80 text-xl">
              Start posting jobs for only $10.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-primary px-8 py-4 font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              Sign Up For Free
            </Link>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0 relative z-10 flex justify-center items-end h-full">
            {/* Using a placeholder for the dashboard graphic */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 w-full max-w-md h-[300px] mb-[-20px] backdrop-blur-sm flex items-center justify-center">
              <div className="text-white/40 text-center">
                <div className="text-4xl mb-2 font-bold">QuickHire</div>
                <p>Dashboard Interface Graphic</p>
              </div>
            </div>

            {/* Floating tag like in design */}
            <div className="absolute top-1/2 left-0 bg-[#FF4F81] text-white px-6 py-2 rounded-full font-bold shadow-2xl animate-pulse hidden lg:block">
              1192 Hug × 460 Hug
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
