"use client";

import Link from "next/link";
import { Home, Building, Users, BarChart, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import apiClient from "../../../lib/apiClient";

const MenuItems = [
  { name: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { name: "Businesses", icon: Building, href: "/admin/business" },
  { name: "Reports", icon: BarChart, href: "/admin/allreports" },
  { name: "Users", icon: Users, href: "/admin/user" },
];
const MenuItemsBottom = [{ name: "Logout", icon: LogOut }];

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // call Next BFF, which forwards cookies to backend and clears them
      await apiClient.post("/api/auth/logout");
    } catch (e) {
      // even if backend errors, we still route away
      console.log("logout error:", e?.response?.data || e?.message || e);
    } finally {
      if (setOpen) setOpen(false);
      router.push("/login");
      router.refresh();
    }
  };

  const SidebarContent = ({ showClose = false }) => (
    <div className="w-64 bg-gray-900 border-r px-4 py-6 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <div className="w-10 h-auto">
          <Link href="/" onClick={() => setOpen && setOpen(false)}>
            <img src="/DI.png" alt="Diaspora Insight" />
          </Link>
        </div>
        <div>
          <Link href="/" onClick={() => setOpen && setOpen(false)}>
            <h4 className="font-semibold text-lg text-white">Diaspora Insight</h4>
          </Link>
          <p className="text-xs text-gray-400">
            Accountability for cross-border capital
          </p>
        </div>

        {showClose ? (
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setOpen && setOpen(false)}
              className="text-white"
              aria-label="Close sidebar"
              type="button"
            >
              ✕
            </button>
          </div>
        ) : null}
      </div>

      <nav className="space-y-2 py-6 flex-1">
        {MenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen && setOpen(false)}
              className={`w-full block text-left px-4 py-2 rounded-sm hover:text-gray-600 font-medium ${
                isActive ? "text-gray-400" : "text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-800">
        {MenuItemsBottom.map((item) => {
          const Icon = item.icon;
          return (
            <button
              type="button"
              key={item.name}
              onClick={handleLogout}
              className="w-full text-white text-left px-4 hover:text-gray-700 font-medium"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                <span>{item.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:z-30 md:h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile overlay sidebar */}
      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen && setOpen(false)}
          />

          <div className="absolute inset-y-0 left-0 w-64 shadow-lg">
            <SidebarContent showClose />
          </div>
        </div>
      ) : null}
    </>
  );
}
