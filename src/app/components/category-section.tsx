import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Design", count: 235, icon: "/images/category-icon/Icon7.svg" },
  { name: "Sales", count: 756, icon: "/images/category-icon/Icon.svg" },
  { name: "Marketing", count: 140, icon: "/images/category-icon/Icon2.svg" },
  { name: "Finance", count: 325, icon: "/images/category-icon/Icon3.svg" },
  { name: "Technology", count: 436, icon: "/images/category-icon/Icon4.svg" },
  { name: "Engineering", count: 542, icon: "/images/category-icon/vector.svg" },
  { name: "Business", count: 211, icon: "/images/category-icon/Icon6.svg" },
  {
    name: "Human Resource",
    count: 346,
    icon: "/images/category-icon/Icon5.svg",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 mx-auto md:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold md:text-5xl">
            Explore by <span className="text-secondary">category</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden gap-2 items-center pb-1 font-bold border-b-2 border-transparent transition-all md:flex text-primary group hover:border-primary"
          >
            Show all jobs{" "}
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/jobs?category=${cat.name}`}
              className="flex gap-6 items-center p-6 border transition-all group border-border-base lg:flex-col lg:items-start lg:p-8 hover:bg-primary hover:text-white"
            >
              <div className="relative w-12 h-12 shrink-0 lg:mb-8">
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  fill
                  className="object-contain transition-all group-hover:brightness-0 group-hover:invert"
                />
              </div>

              <div className="flex-grow lg:flex-grow-0">
                <h3 className="text-xl font-bold lg:text-2xl lg:mb-3 group-hover:text-white">
                  {cat.name}
                </h3>
                <p className="text-text-light lg:hidden group-hover:text-white/80">
                  {cat.count} jobs available
                </p>
              </div>

              <div className="transition-colors lg:hidden text-text-dark group-hover:text-white">
                <ArrowRight
                  size={24}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>

              <div className="hidden justify-between items-center mt-auto w-full lg:flex text-text-light group-hover:text-white/80">
                <span className="text-lg">{cat.count} jobs available</span>
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
