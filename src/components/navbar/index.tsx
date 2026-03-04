"use client";

import useAuth from "@/lib/auth/use-auth/use-auth";
import { clsx, type ClassValue } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, user, removeAuth } = useAuth();

  const navLinks = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "Browse Companies", href: "/companies" },
  ];

  return (
    <nav className="flex items-center w-full h-20 bg-white border-b border-border-base">
      <div className="container flex justify-between items-center px-4 mx-auto md:px-8">
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-primary">
            <div className="w-4 h-4 bg-white rounded-full translate-x-1" />
          </div>
          <span className="text-2xl font-bold text-text-dark">QuickHire</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden gap-8 items-center md:flex">
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
        <div className="flex gap-4 items-center">
          {isAuthenticated === true ? (
            <>
              {user?.role === "admin" && (
                <Link
                  href="/admin/jobs"
                  className="px-4 py-2 font-bold transition-colors text-primary hover:bg-bg-light"
                >
                  Dashboard
                </Link>
              )}
              <div className="mx-2 w-px h-6 bg-border-base" />
              <button
                onClick={removeAuth}
                className="px-6 py-3 font-bold rounded transition-all bg-bg-light text-text-dark hover:bg-gray-200 active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-3 font-bold rounded transition-colors text-primary hover:bg-bg-light"
              >
                Login
              </Link>
              <div className="w-px h-6 bg-border-base" />
              <Link
                href="/signup"
                className="px-6 py-3 font-bold text-white rounded transition-all bg-primary hover:bg-opacity-90 active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
