"use client";

import { useEffect, useState } from "react";
import { Star, Trash2, Loader2 } from "lucide-react";

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  sizePurchased: string;
  fitFeedback: string;
  createdAt: string;
  product: { name: string };
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/reviews")
      .then((r) => r.json())
      .then((data) => { setReviews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    setDeletingId(id);
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reviews</h1>
        <p className="text-sm text-white/40 mt-1">{reviews.length} customer reviews</p>
      </div>

      <div className="bg-[#1a1a22] rounded-2xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-white/30">
            <Loader2 size={24} className="animate-spin mr-3" /> Loading reviews…
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-20 text-center">
            <Star size={40} className="mx-auto text-white/10 mb-4" />
            <p className="text-white/30 text-sm">No reviews yet</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {reviews.map((r) => (
              <div key={r.id} className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{r.reviewerName}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={i < r.rating ? "text-amber-400 fill-amber-400" : "text-white/10"} />
                      ))}
                    </div>
                    <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">{r.fitFeedback.replace("_", " ")}</span>
                  </div>
                  <p className="text-xs text-white/60 mb-1">{r.comment}</p>
                  <p className="text-[11px] text-white/30">
                    On <span className="text-violet-400">{r.product.name}</span> · Size: {r.sizePurchased} ·{" "}
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={deletingId === r.id}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all flex-shrink-0"
                >
                  {deletingId === r.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
