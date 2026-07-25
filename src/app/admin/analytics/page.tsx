"use client";

import { BarChart3 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center mb-6">
        <BarChart3 size={28} className="text-violet-400" />
      </div>
      <h1 className="text-xl font-bold text-white mb-2">Analytics</h1>
      <p className="text-white/40 text-sm max-w-sm">
        Detailed analytics charts (revenue over time, top products, conversion rates) are coming soon.
        All data is live in your Neon database and ready to be queried.
      </p>
    </div>
  );
}
