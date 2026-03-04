"use client";

import { useAuth } from "@/lib/auth/use-auth";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
}) => (
  <Link
    href={href}
    className={`flex items-center gap-4 px-6 py-4 transition-all border-l-4 ${
      active
        ? "font-bold bg-primary/10 border-primary text-primary"
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
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const { isAuthenticated, removeAuth, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (mounted === true && isAuthenticated === false) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (
    mounted === false ||
    isAuthenticated === undefined ||
    isAuthenticated === false
  ) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-16 h-16 rounded-full border-4 animate-spin border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-light">
      <aside className="flex fixed inset-y-0 z-50 flex-col w-80 bg-white border-r shadow-sm border-border-base">
        <div className="flex gap-3 items-center p-8 border-b border-border-base">
          <div className="w-10 h-10 rounded-lg bg-primary" />
          <span className="text-2xl italic font-black tracking-tighter text-text-dark">
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
          <div className="flex gap-4 items-center mb-8">
            <div className="flex justify-center items-center w-12 h-12 font-bold rounded-full bg-primary/20 text-primary">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold truncate text-text-dark">{user?.email}</p>
              <p className="text-sm text-text-light">Administrator</p>
            </div>
          </div>
          <button
            onClick={() => {
              removeAuth();
              router.push("/login");
            }}
            className="flex gap-3 items-center w-full font-bold text-red-500 transition-colors hover:text-red-600"
          >
            <LogOut size={24} />
            <span className="text-lg">Logout</span>
          </button>
        </div>
      </aside>

      <main className="overflow-y-auto flex-grow p-12 ml-80">{children}</main>
    </div>
  );
}
