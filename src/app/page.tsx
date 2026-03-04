import { CategorySection } from "./components/category-section";
import { CompanyLogos } from "./components/company-logos";
import { CTABanner } from "./components/cta-banner";
import { FeaturedJobs } from "./components/featured-jobs";
import { HeroSection } from "./components/hero-section";
import { LatestJobs } from "./components/latest-jobs";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CompanyLogos />
      <CategorySection />
      <CTABanner />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
}
