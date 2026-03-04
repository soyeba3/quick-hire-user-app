import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Logo & Description */}
        <div className="md:col-span-1 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full translate-x-1" />
            </div>
            <span className="text-2xl font-bold text-white uppercase tracking-tight">
              QuickHire
            </span>
          </Link>
          <p className="text-text-light leading-relaxed">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>
        </div>

        {/* Column 2: About */}
        <div>
          <h4 className="text-xl font-bold mb-6">About</h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/companies"
                className="text-text-light hover:text-white transition-colors"
              >
                Companies
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-text-light hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-text-light hover:text-white transition-colors"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/advice"
                className="text-text-light hover:text-white transition-colors"
              >
                Advice
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-text-light hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h4 className="text-xl font-bold mb-6">Resources</h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/help"
                className="text-text-light hover:text-white transition-colors"
              >
                Help Docs
              </Link>
            </li>
            <li>
              <Link
                href="/guide"
                className="text-text-light hover:text-white transition-colors"
              >
                Guide
              </Link>
            </li>
            <li>
              <Link
                href="/updates"
                className="text-text-light hover:text-white transition-colors"
              >
                Updates
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-text-light hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold">Get job notifications</h4>
          <p className="text-text-light">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-white text-text-dark px-4 py-3 flex-grow focus:outline-none"
            />
            <button className="bg-primary text-white px-6 py-3 font-bold transition-all hover:bg-opacity-90">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-gray-700 flex flex-col md:row justify-between items-center gap-6">
        <p className="text-text-light text-sm">
          {currentYear} © QuickHire. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="#"
            className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"
          >
            <Facebook size={18} />
          </Link>
          <Link
            href="#"
            className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"
          >
            <Instagram size={18} />
          </Link>
          <Link
            href="#"
            className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href="#"
            className="p-2 bg-gray-800 rounded-full hover:bg-primary transition-colors"
          >
            <Twitter size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
