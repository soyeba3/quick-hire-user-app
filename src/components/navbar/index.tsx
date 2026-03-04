"use client";

import { clsx, type ClassValue } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "Browse Companies", href: "/companies" },
  ];

  return (
    <nav className="w-full bg-white border-b border-border-base h-20 flex items-center">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full translate-x-1" />
          </div>
          <span className="text-2xl font-bold text-text-dark">QuickHire</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-text-gray font-medium transition-colors hover:text-primary",
                pathname === link.href && "text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-primary font-bold px-6 py-3 rounded hover:bg-bg-light transition-colors"
          >
            Login
          </Link>
          <div className="w-[2px] h-6 bg-border-base" />
          <Link
            href="/signup"
            className="bg-primary text-white font-bold px-6 py-3 rounded transition-all hover:bg-opacity-90 active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
