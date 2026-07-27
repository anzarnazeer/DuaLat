"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  ShoppingBag, Search, ChevronDown, Loader2, Package, RefreshCw,
} from "lucide-react";

interface OrderItem {
  id: string;
  quantity: number;
  selectedSize: string;
  priceAtTime: number;
  product: { name: string; images: string[] };
}
interface Order {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

const STATUS_STYLES: Record<string, string> = {
  PENDING:   "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  CONFIRMED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  SHIPPED:   "bg-violet-500/10 text-violet-400 border-violet-500/20",
  DELIVERED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function OrderRow({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: string) => void }) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    await onStatusChange(order.id, newStatus);
    setUpdating(false);
  };

  return (
    <>
      <tr
        className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
        onClick={() => setOpen((o) => !o)}
      >
        <td className="px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-white">{order.fullName}</p>
            <p className="text-xs text-white/40">{order.email}</p>
          </div>
        </td>
        <td className="px-5 py-4">
          <div className="text-xs font-mono text-white/40">{order.id.slice(0, 8)}…</div>
        </td>
        <td className="px-5 py-4">
          <div className="text-xs text-white/50">
            {order.city}, {order.state}
          </div>
        </td>
        <td className="px-5 py-4">
          <span className="text-sm font-bold text-white">₹{order.totalPrice.toFixed(2)}</span>
        </td>
        <td className="px-5 py-4">
          <StatusBadge status={order.status} />
        </td>
        <td className="px-5 py-4">
          <span className="text-xs text-white/30">
            {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </td>
        <td className="px-5 py-4">
          <ChevronDown
            size={14}
            className={`text-white/30 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </td>
      </tr>

      {/* Expanded detail row */}
      {open && (
        <tr>
          <td colSpan={7} className="bg-white/[0.01] border-t border-b border-white/[0.06]">
            <div className="px-5 py-5 space-y-5">
              {/* Items */}
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Order Items</p>
                <div className="space-y-2.5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                        {item.product.images[0] ? (
                          <Image src={item.product.images[0]} alt={item.product.name} width={40} height={40} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><Package size={14} className="text-white/20" /></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{item.product.name}</p>
                        <p className="text-xs text-white/40">Size: {item.selectedSize} × {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold text-white flex-shrink-0">
                        ₹{(item.priceAtTime * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping address */}
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Shipping Address</p>
                <p className="text-sm text-white/60">
                  {order.addressLine1}{order.addressLine2 ? `, ${order.addressLine2}` : ""}<br />
                  {order.city}, {order.state} {order.zipCode}, {order.country}<br />
                  <span className="text-white/40">{order.phone}</span>
                </p>
              </div>

              {/* Status control */}
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      disabled={order.status === s || updating}
                      onClick={(e) => { e.stopPropagation(); handleStatusChange(s); }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all disabled:opacity-40 ${
                        order.status === s
                          ? STATUS_STYLES[s] + " cursor-default"
                          : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {updating && order.status !== s ? <Loader2 size={11} className="animate-spin inline mr-1" /> : null}
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const fetchOrders = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    // Optimistic update
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.fullName.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "ALL" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-sm text-white/40 mt-1">{orders.length} total orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or ID…"
            className="bg-[#1a1a22] border border-white/10 rounded-xl pl-8 pr-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all w-64"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-[#1a1a22] border border-white/10 rounded-xl p-1">
          {["ALL", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === s ? "bg-violet-500/20 text-violet-300" : "text-white/30 hover:text-white/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#1a1a22] rounded-2xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-white/30">
            <Loader2 size={24} className="animate-spin mr-3" /> Loading orders…
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag size={40} className="mx-auto text-white/10 mb-4" />
            <p className="text-white/30 text-sm">
              {search || filterStatus !== "ALL" ? "No orders match your filters" : "No orders yet"}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Customer", "Order ID", "Location", "Total", "Status", "Date", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-white/30 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((order) => (
                <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
