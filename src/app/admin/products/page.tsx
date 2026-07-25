"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Plus, Search, Pencil, Trash2, Star, Package,
  X, ChevronDown, Loader2, AlertCircle, Check, Upload, Image as ImageIcon
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
interface SizeStock {
  id: string;
  size: string;
  stockCount: number;
  weightRange: string;
  heightRange: string;
}
interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  salePrice: number | null;
  category: string;
  collection: string;
  images: string[];
  fabricTags: string[];
  fabricDetails: string;
  careInstructions: string;
  rating: number;
  sizes: SizeStock[];
}

const SIZES = ["Newborn", "0-3M", "3-6M", "6-12M", "1Y", "2Y", "3Y", "4Y", "5Y"];
const EMPTY_FORM = {
  name: "", description: "", basePrice: "", salePrice: "",
  category: "unisex", collection: "basics",
  images: [""], fabricTags: [""],
  fabricDetails: "", careInstructions: "",
  sizes: SIZES.slice(0, 3).map((s) => ({ size: s, stockCount: "10", weightRange: "", heightRange: "" })),
};

// ─── Reusable field component ───────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all";
const selectCls = `${inputCls} appearance-none cursor-pointer`;

// ─── Product Form Modal ────────────────────────────────────────────────────
function ProductModal({
  product, onClose, onSaved,
}: {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState(
    product
      ? {
          name: product.name,
          description: product.description,
          basePrice: String(product.basePrice),
          salePrice: product.salePrice ? String(product.salePrice) : "",
          category: product.category,
          collection: product.collection,
          images: product.images.length ? product.images : [""],
          fabricTags: product.fabricTags.length ? product.fabricTags : [""],
          fabricDetails: product.fabricDetails,
          careInstructions: product.careInstructions,
          sizes: product.sizes.map((s) => ({
            size: s.size,
            stockCount: String(s.stockCount),
            weightRange: s.weightRange,
            heightRange: s.heightRange,
          })),
        }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploadingImage(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) throw new Error("Upload failed. Make sure Vercel Blob is configured.");
      
      const newBlob = await response.json();
      
      const arr = [...form.images];
      if (index !== undefined) {
        arr[index] = newBlob.url;
      } else {
        if (arr.length === 1 && arr[0] === "") {
          arr[0] = newBlob.url;
        } else {
          arr.push(newBlob.url);
        }
      }
      setForm(f => ({ ...f, images: arr }));
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploadingImage(false);
      e.target.value = ""; // Reset input
    }
  };

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    try {
      const url = isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          basePrice: Number(form.basePrice),
          salePrice: form.salePrice ? Number(form.salePrice) : null,
          sizes: form.sizes.map((s) => ({ ...s, stockCount: Number(s.stockCount) })),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save"); setSaving(false); return; }
      onSaved();
    } catch {
      setError("Network error"); setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4">
      <div className="w-full max-w-2xl bg-[#1a1a22] rounded-3xl border border-white/10 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-lg font-bold text-white">{isEdit ? "Edit Product" : "Add New Product"}</h2>
            <p className="text-xs text-white/40 mt-0.5">{isEdit ? `Editing: ${product!.name}` : "Fill in the details below"}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
            <X size={15} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-4">
            <Field label="Product Name">
              <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Cloud-Soft Organic Romper" />
            </Field>
            <Field label="Description">
              <textarea className={`${inputCls} resize-none h-24`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the product..." />
            </Field>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Base Price ($)">
              <input className={inputCls} type="number" min="0" step="0.01" value={form.basePrice} onChange={(e) => set("basePrice", e.target.value)} placeholder="32.00" />
            </Field>
            <Field label="Sale Price ($) — optional">
              <input className={inputCls} type="number" min="0" step="0.01" value={form.salePrice} onChange={(e) => set("salePrice", e.target.value)} placeholder="26.00" />
            </Field>
          </div>

          {/* Category & Collection */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <div className="relative">
                <select className={selectCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="unisex">Unisex</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              </div>
            </Field>
            <Field label="Collection">
              <div className="relative">
                <select className={selectCls} value={form.collection} onChange={(e) => set("collection", e.target.value)}>
                  <option value="loungewear">Loungewear</option>
                  <option value="playground">Playground</option>
                  <option value="basics">Basics</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              </div>
            </Field>
          </div>

          {/* Images */}
          <Field label="Images (Upload or paste URL)">
            <div className="space-y-3">
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-2 items-center">
                  {img && img.startsWith('http') ? (
                    <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10 text-white/20">
                      <ImageIcon size={16} />
                    </div>
                  )}
                  <input className={inputCls} value={img} onChange={(e) => { const arr = [...form.images]; arr[i] = e.target.value; set("images", arr); }} placeholder="https://..." />
                  
                  {/* Upload Button for this specific index */}
                  <label className="flex-shrink-0 cursor-pointer w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-violet-400 transition-all border border-white/5 shadow-sm">
                    {uploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, i)} disabled={uploadingImage} />
                  </label>

                  {form.images.length > 1 && (
                    <button type="button" onClick={() => set("images", form.images.filter((_, j) => j !== i))} className="w-10 h-10 flex-shrink-0 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all border border-red-500/10">
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => set("images", [...form.images, ""])} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
                  + Add another URL
                </button>
                <span className="text-white/20 text-xs">|</span>
                <label className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium cursor-pointer">
                  + Upload new image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} disabled={uploadingImage} />
                </label>
              </div>
            </div>
          </Field>

          {/* Fabric Tags */}
          <Field label="Fabric Tags (e.g. 100% Organic Cotton)">
            <div className="space-y-2">
              {form.fabricTags.map((tag, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={tag} onChange={(e) => { const arr = [...form.fabricTags]; arr[i] = e.target.value; set("fabricTags", arr); }} placeholder="e.g. Tagless/Itch-Free" />
                  {form.fabricTags.length > 1 && (
                    <button onClick={() => set("fabricTags", form.fabricTags.filter((_, j) => j !== i))} className="w-9 h-9 flex-shrink-0 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all">
                      <X size={13} />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => set("fabricTags", [...form.fabricTags, ""])} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
                + Add tag
              </button>
            </div>
          </Field>

          {/* Fabric Details & Care */}
          <div className="grid grid-cols-1 gap-4">
            <Field label="Fabric Details">
              <textarea className={`${inputCls} resize-none h-20`} value={form.fabricDetails} onChange={(e) => set("fabricDetails", e.target.value)} placeholder="Detailed fabric composition..." />
            </Field>
            <Field label="Care Instructions">
              <textarea className={`${inputCls} resize-none h-20`} value={form.careInstructions} onChange={(e) => set("careInstructions", e.target.value)} placeholder="Machine wash cold..." />
            </Field>
          </div>

          {/* Sizes */}
          <Field label="Sizes & Stock">
            <div className="space-y-2">
              {form.sizes.map((s, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 items-center">
                  <div className="relative">
                    <select
                      className={`${selectCls} text-xs py-2`}
                      value={s.size}
                      onChange={(e) => { const arr = [...form.sizes]; arr[i] = { ...arr[i], size: e.target.value }; set("sizes", arr); }}
                    >
                      {SIZES.map((sz) => <option key={sz}>{sz}</option>)}
                    </select>
                  </div>
                  <input className={`${inputCls} text-xs py-2`} type="number" min="0" placeholder="Stock" value={s.stockCount} onChange={(e) => { const arr = [...form.sizes]; arr[i] = { ...arr[i], stockCount: e.target.value }; set("sizes", arr); }} />
                  <input className={`${inputCls} text-xs py-2`} placeholder="e.g. 8-12 lbs" value={s.weightRange} onChange={(e) => { const arr = [...form.sizes]; arr[i] = { ...arr[i], weightRange: e.target.value }; set("sizes", arr); }} />
                  <div className="flex gap-1">
                    <input className={`${inputCls} text-xs py-2`} placeholder="e.g. 21-24 in" value={s.heightRange} onChange={(e) => { const arr = [...form.sizes]; arr[i] = { ...arr[i], heightRange: e.target.value }; set("sizes", arr); }} />
                    {form.sizes.length > 1 && (
                      <button onClick={() => set("sizes", form.sizes.filter((_, j) => j !== i))} className="w-8 h-9 flex-shrink-0 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all">
                        <X size={11} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-4 gap-2 text-[10px] text-white/20 font-medium pl-0.5">
                <span>Size</span><span>Stock</span><span>Weight</span><span>Height</span>
              </div>
              <button
                onClick={() => set("sizes", [...form.sizes, { size: SIZES[0], stockCount: "10", weightRange: "", heightRange: "" }])}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                + Add size
              </button>
            </div>
          </Field>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/5">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl transition-all disabled:opacity-60 shadow-lg shadow-violet-500/20"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {saving ? "Saving…" : isEdit ? "Update Product" : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Products Page ────────────────────────────────────────────────────
export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalProduct, setModalProduct] = useState<Product | null | undefined>(undefined); // undefined = closed
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setDeletingId(null);
    fetchProducts();
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-white/40 mt-1">{products.length} items in catalog</p>
        </div>
        <button
          onClick={() => setModalProduct(null)}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl transition-all shadow-lg shadow-violet-500/20"
        >
          <Plus size={15} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="w-full bg-[#1a1a22] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
        />
      </div>

      {/* Products Table */}
      <div className="bg-[#1a1a22] rounded-2xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-white/30">
            <Loader2 size={24} className="animate-spin mr-3" /> Loading products…
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Package size={40} className="mx-auto text-white/10 mb-4" />
            <p className="text-white/30 text-sm">
              {search ? "No products match your search" : "No products yet — add your first one!"}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Product", "Category", "Price", "Stock", "Rating", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-white/30 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((p) => {
                const totalStock = p.sizes.reduce((sum, s) => sum + s.stockCount, 0);
                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                          {p.images[0] ? (
                            <Image src={p.images[0]} alt={p.name} width={44} height={44} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><Package size={16} className="text-white/20" /></div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate max-w-[180px]">{p.name}</p>
                          <p className="text-xs text-white/30 capitalize">{p.collection}</p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold capitalize bg-white/5 text-white/50 px-2.5 py-1 rounded-lg">{p.category}</span>
                    </td>
                    {/* Price */}
                    <td className="px-5 py-4">
                      <div>
                        {p.salePrice ? (
                          <>
                            <span className="text-sm font-bold text-emerald-400">${p.salePrice.toFixed(2)}</span>
                            <span className="text-xs text-white/30 line-through ml-1.5">${p.basePrice.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-white">${p.basePrice.toFixed(2)}</span>
                        )}
                      </div>
                    </td>
                    {/* Stock */}
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        totalStock === 0 ? "bg-red-500/15 text-red-400" :
                        totalStock < 10 ? "bg-amber-500/15 text-amber-400" :
                        "bg-emerald-500/10 text-emerald-400"
                      }`}>
                        {totalStock} units
                      </span>
                    </td>
                    {/* Rating */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm text-white/70">{p.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setModalProduct(p)}
                          className="w-8 h-8 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 flex items-center justify-center transition-all"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all disabled:opacity-50"
                        >
                          {deletingId === p.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalProduct !== undefined && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(undefined)}
          onSaved={() => { setModalProduct(undefined); fetchProducts(); }}
        />
      )}
    </div>
  );
}
