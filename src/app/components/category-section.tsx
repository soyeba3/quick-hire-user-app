import {
  ArrowRight,
  Briefcase,
  Code,
  Megaphone,
  Palette,
  PieChart,
  Settings,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Design", count: 235, icon: Palette, color: "text-primary" },
  { name: "Sales", count: 756, icon: Target, color: "text-primary" },
  { name: "Marketing", count: 140, icon: Megaphone, color: "text-primary" },
  { name: "Finance", count: 325, icon: PieChart, color: "text-primary" },
  { name: "Technology", count: 436, icon: Code, color: "text-primary" },
  { name: "Engineering", count: 542, icon: Settings, color: "text-primary" },
  { name: "Business", count: 211, icon: Briefcase, color: "text-primary" },
  { name: "Human Resource", count: 346, icon: Users, color: "text-primary" },
];

export const CategorySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-5xl font-bold">
            Explore by <span className="text-secondary">category</span>
          </h2>
          <Link
            href="/jobs"
            className="text-primary font-bold flex items-center gap-2 group border-b-2 border-transparent hover:border-primary transition-all pb-1"
          >
            Show all jobs{" "}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/jobs?category=${cat.name}`}
              className="p-8 border border-border-base transition-all hover:bg-primary hover:text-white group"
            >
              <cat.icon
                size={40}
                className={`${cat.color} group-hover:text-white mb-6 transition-colors`}
              />
              <h3 className="text-2xl font-bold mb-2 group-hover:text-white">
                {cat.name}
              </h3>
              <div className="flex justify-between items-center text-text-light group-hover:text-white/80">
                <span>{cat.count} jobs available</span>
                <ArrowRight
                  size={20}
                  className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
