"use client";

import { useAuth } from "@/lib/auth/use-auth";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Menu,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  active: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <div className="flex fixed top-0 right-0 left-0 z-40 justify-between items-center p-4 bg-white border-b lg:hidden border-border-base">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-lg bg-primary" />
          <span className="text-xl italic font-black tracking-tighter text-text-dark">
            QuickHire Admin
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-lg bg-bg-light text-text-dark"
        >
          <Menu size={24} />
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-80 bg-white border-r shadow-sm border-border-base transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex gap-3 justify-between items-center p-8 border-b border-border-base">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-lg bg-primary" />
            <span className="text-2xl italic font-black tracking-tighter text-text-dark">
              QuickHire Admin
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg lg:hidden bg-bg-light text-text-dark"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="py-8 grow">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/admin"
            active={pathname === "/admin"}
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarItem
            icon={Briefcase}
            label="Job Listings"
            href="/admin/jobs"
            active={pathname.includes("/admin/jobs")}
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarItem
            icon={FileText}
            label="Applications"
            href="/admin/applications"
            active={pathname.includes("/admin/applications")}
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/admin/settings"
            active={pathname.includes("/admin/settings")}
            onClick={() => setIsSidebarOpen(false)}
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

      <main className="overflow-y-auto p-4 pt-24 grow md:p-8 lg:p-12 lg:ml-80 lg:pt-12">
        {children}
      </main>
    </div>
  );
}
