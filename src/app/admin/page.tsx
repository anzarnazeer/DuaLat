"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Star,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Clock,
} from "lucide-react";

interface StatsData {
  totalProducts: number;
  totalOrders: number;
  totalReviews: number;
  totalRevenue: number;
  recentOrders: {
    id: string;
    fullName: string;
    email: string;
    totalPrice: number;
    status: string;
    createdAt: string;
  }[];
  lowStockItems: {
    id: string;
    size: string;
    stockCount: number;
    product: { name: string };
  }[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  CONFIRMED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  SHIPPED:   "bg-violet-500/10 text-violet-400 border-violet-500/20",
  DELIVERED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const KPI_CARDS = [
    {
      label: "Total Revenue",
      value: stats ? `₹${stats.totalRevenue.toFixed(2)}` : "—",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/20",
      sub: "All confirmed orders",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? "—",
      icon: ShoppingBag,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
      sub: "Lifetime orders",
    },
    {
      label: "Products",
      value: stats?.totalProducts ?? "—",
      icon: Package,
      color: "from-violet-500 to-fuchsia-500",
      shadow: "shadow-violet-500/20",
      sub: "Active catalog items",
    },
    {
      label: "Reviews",
      value: stats?.totalReviews ?? "—",
      icon: Star,
      color: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/20",
      sub: "Customer reviews",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-white/40 mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
          <Clock size={12} />
          Live data from Neon DB
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map(({ label, value, icon: Icon, color, shadow, sub }) => (
          <div
            key={label}
            className="bg-[#1a1a22] rounded-2xl border border-white/5 p-5 flex flex-col gap-4 hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{label}</span>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg ${shadow}`}>
                <Icon size={16} className="text-white" />
              </div>
            </div>
            <div>
              <div className={`text-3xl font-black text-white ${loading ? "animate-pulse bg-white/10 rounded-lg w-20 h-8" : ""}`}>
                {!loading && value}
              </div>
              <div className="text-xs text-white/30 mt-1">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-[#1a1a22] rounded-2xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-violet-400" />
              <span className="font-semibold text-sm text-white">Recent Orders</span>
            </div>
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading && (
              <div className="p-6 text-center text-white/30 text-sm animate-pulse">Loading orders…</div>
            )}
            {!loading && stats?.recentOrders.length === 0 && (
              <div className="p-8 text-center">
                <ShoppingBag size={32} className="mx-auto text-white/10 mb-3" />
                <p className="text-white/30 text-sm">No orders yet. They&apos;ll appear here once customers checkout.</p>
              </div>
            )}
            {stats?.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{order.fullName}</p>
                  <p className="text-xs text-white/40 truncate">{order.email}</p>
                </div>
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-white">₹{order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-[#1a1a22] rounded-2xl border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-white/5">
            <AlertTriangle size={15} className="text-amber-400" />
            <span className="font-semibold text-sm text-white">Low Stock Alerts</span>
          </div>
          <div className="divide-y divide-white/5">
            {loading && (
              <div className="p-6 text-center text-white/30 text-sm animate-pulse">Checking inventory…</div>
            )}
            {!loading && stats?.lowStockItems.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-emerald-400 text-sm font-medium">✓ All stock levels healthy</p>
              </div>
            )}
            {stats?.lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white/80 truncate">{item.product.name}</p>
                  <p className="text-[11px] text-white/40">Size: {item.size}</p>
                </div>
                <span className={`ml-3 text-xs font-black px-2 py-0.5 rounded-md flex-shrink-0 ${
                  item.stockCount === 0
                    ? "bg-red-500/15 text-red-400"
                    : "bg-amber-500/15 text-amber-400"
                }`}>
                  {item.stockCount === 0 ? "OUT" : `${item.stockCount} left`}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/5">
            <Link
              href="/admin/products"
              className="block text-center text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              Manage inventory →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
