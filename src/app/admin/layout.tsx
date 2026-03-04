"use client";

import { useAuth } from "@/lib/auth/use-auth";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: any;
  label: string;
  href: string;
  active: boolean;
}) => (
  <Link
    href={href}
    className={`flex items-center gap-4 px-6 py-4 transition-all border-l-4 ${
      active
        ? "bg-primary/10 border-primary text-primary font-bold"
        : "border-transparent text-text-gray hover:bg-bg-light hover:text-text-dark"
    }`}
  >
    <Icon size={24} />
    <span className="text-lg">{label}</span>
  </Link>
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, removeAuth, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined || isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-light">
      {/* Admin Sidebar */}
      <aside className="w-80 bg-white border-r border-border-base flex flex-col fixed inset-y-0 shadow-sm z-50">
        <div className="p-8 border-b border-border-base flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg" />
          <span className="text-2xl font-black text-text-dark tracking-tighter italic">
            QuickHire Admin
          </span>
        </div>

        <nav className="flex-grow py-8">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/admin"
            active={pathname === "/admin"}
          />
          <SidebarItem
            icon={Briefcase}
            label="Job Listings"
            href="/admin/jobs"
            active={pathname.includes("/admin/jobs")}
          />
          <SidebarItem
            icon={FileText}
            label="Applications"
            href="/admin/applications"
            active={pathname.includes("/admin/applications")}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/admin/settings"
            active={pathname.includes("/admin/settings")}
          />
        </nav>

        <div className="p-8 border-t border-border-base">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-text-dark font-bold truncate">{user?.email}</p>
              <p className="text-text-light text-sm">Administrator</p>
            </div>
          </div>
          <button
            onClick={() => {
              removeAuth();
              router.push("/login");
            }}
            className="flex items-center gap-3 text-red-500 font-bold hover:text-red-600 transition-colors w-full"
          >
            <LogOut size={24} />
            <span className="text-lg">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-80 flex-grow p-12 overflow-y-auto">{children}</main>
    </div>
  );
}
