"use client";

import { Facebook, Globe, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="py-16 text-white" style={{ backgroundColor: "#202430" }}>
      <div className="container px-4 mx-auto md:px-8">
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-8 md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex gap-2 items-center">
              <Image
                src="/images/logo/logo.png"
                alt="QuickHire Logo"
                width={112}
                height={112}
                className="object-contain text-white"
              />
            </Link>
            <p className="max-w-xs text-base leading-relaxed text-[#D6DDEB]">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          <div>
            <h4 className="mb-8 text-xl font-bold text-white">About</h4>
            <ul className="space-y-4 text-[#D6DDEB]">
              <li>
                <Link
                  href="/companies"
                  className="transition-colors hover:text-white"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="transition-colors hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/advice"
                  className="transition-colors hover:text-white"
                >
                  Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-xl font-bold text-white">Resources</h4>
            <ul className="space-y-4 text-[#D6DDEB]">
              <li>
                <Link
                  href="/help"
                  className="transition-colors hover:text-white"
                >
                  Help Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="transition-colors hover:text-white"
                >
                  Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/updates"
                  className="transition-colors hover:text-white"
                >
                  Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-bold text-white">
              Get job notifications
            </h4>
            <p className="text-[#D6DDEB]">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 w-full text-gray-900 bg-white focus:outline-none"
              />
              <button className="px-8 py-3 font-bold text-white transition-all bg-primary hover:bg-opacity-90">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col gap-8 justify-between items-center md:flex-row">
            <p className="text-sm text-gray-400">
              {currentYear} @ QuickHire. All rights reserved.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Globe, Linkedin, Twitter].map(
                (Icon, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className="p-3 rounded-full transition-colors bg-white/5 hover:bg-white/10"
                  >
                    <Icon size={18} className="text-white" />
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
