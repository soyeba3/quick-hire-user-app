"use client";

import useAuth from "@/lib/auth/use-auth/use-auth";
import { clsx, type ClassValue } from "clsx";
import Image from "next/image";
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
    <nav className="flex absolute top-0 left-0 z-50 items-center w-full h-24 bg-transparent">
      <div className="w-full max-w-[1440px] px-4 md:px-12 lg:px-20 xl:px-24 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/images/logo/logo.png"
            alt="QuickHire Logo"
            width={112}
            height={112}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden gap-8 items-center text-sm font-semibold md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-text-gray transition-colors hover:text-primary",
                pathname === link.href && "text-text-dark",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 items-center text-sm font-bold lg:gap-6">
          {isAuthenticated === true ? (
            <>
              {user?.role === "admin" && (
                <Link
                  href="/admin/jobs"
                  className="px-4 py-2 transition-colors text-primary hover:text-primary/80"
                >
                  Dashboard
                </Link>
              )}
              <div className="hidden w-px h-6 md:block bg-border-base" />
              <button
                onClick={removeAuth}
                className="px-6 py-3 transition-all text-text-dark hover:text-primary active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-3 transition-colors text-primary hover:text-primary/80"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-8 py-3 text-white transition-all bg-primary hover:bg-opacity-90 active:scale-95"
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
