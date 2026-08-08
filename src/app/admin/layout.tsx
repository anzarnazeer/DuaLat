"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Star,
  BarChart3,
  LogOut,
  Sparkles,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",   href: "/admin",          icon: LayoutDashboard },
  { label: "Products",    href: "/admin/products",  icon: Package },
  { label: "Orders",      href: "/admin/orders",    icon: ShoppingBag },
  { label: "Reviews",     href: "/admin/reviews",   icon: Star },
  { label: "Analytics",   href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white flex flex-col md:flex-row relative overflow-x-hidden">
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Top Header */}
      <header className="flex md:hidden items-center justify-between px-5 py-4 bg-[#141418] border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-white tracking-tight">DuaLat</div>
            <div className="text-[10px] text-white/40 font-medium uppercase tracking-widest">Admin Console</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* ─── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#141418] border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo & Close Button */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-white tracking-tight">DuaLat</div>
              <div className="text-[10px] text-white/40 font-medium uppercase tracking-widest">Admin Console</div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/10 text-violet-300 border border-violet-500/20"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <Icon
                  size={16}
                  className={isActive ? "text-violet-400" : "text-white/30 group-hover:text-white/50"}
                />
                {label}
                {isActive && (
                  <ChevronRight size={12} className="ml-auto text-violet-400/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <Sparkles size={15} />
            Back to Store
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              signOut({ callbackUrl: "/admin/login" });
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ─── Main content ─────────────────────────────────────── */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
