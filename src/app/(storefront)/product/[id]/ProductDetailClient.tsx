"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Product, Review } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import SizeSelector from '@/components/SizeSelector';
import ProductCard from '@/components/ProductCard';
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  MessageCircle,
  Ruler,
  CheckCircle,
  Calendar,
  MapPin,
  ChevronDown,
  X,
  ShieldCheck
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts?: Product[];
}

const SIZE_MODAL_ROWS = [
  { age: '0–3 Months', size: '0–3M', chest: '16–17"', waist: '16.5"', length: '14"' },
  { age: '3–6 Months', size: '3–6M', chest: '17–18"', waist: '17"', length: '15"' },
  { age: '6–12 Months', size: '6–12M', chest: '18–19"', waist: '18"', length: '16.5"' },
  { age: '1–2 Years', size: '1Y / 2Y', chest: '19–20"', waist: '19"', length: '18"' },
  { age: '2–3 Years', size: '2Y / 3Y', chest: '20–21"', waist: '20"', length: '20"' },
  { age: '3–4 Years', size: '3Y / 4Y', chest: '21–22"', waist: '20.5"', length: '22"' },
  { age: '4–5 Years', size: '4Y / 5Y', chest: '22–23"', waist: '21"', length: '24"' },
  { age: '5–7 Years', size: '5–7Y', chest: '23–25"', waist: '22"', length: '26"' },
  { age: '7–9 Years', size: '7–9Y', chest: '25–27"', waist: '23"', length: '29"' },
];

export default function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Delivery check state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checking' | 'verified' | 'invalid'>('idle');

  // Scroll tracking for mobile sticky bar
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const price = product.salePrice ?? product.basePrice;
  const isSale = !!product.salePrice && product.salePrice < product.basePrice;
  const discountPercent = isSale 
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize, 1);
    }
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim()) return;
    setPincodeStatus('checking');
    setTimeout(() => {
      if (/^\d{6}$/.test(pincode.trim())) {
        setPincodeStatus('verified');
      } else {
        setPincodeStatus('invalid');
      }
    }, 600);
  };

  const selectedSizeStock = product.sizes?.find(s => s.size === selectedSize);
  const isOutOfStock = selectedSizeStock && selectedSizeStock.stockCount === 0;

  const images = product.images?.length > 0 
    ? product.images 
    : ['/placeholder.png'];

  const whatsappInquiryUrl = `https://wa.me/918848722023?text=${encodeURIComponent(
    `Hello Dualat, I need help choosing the right size for: ${product.name} (₹${price})`
  )}`;

  return (
    <div className="space-y-12 text-[#242220]">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <Link href="/girls" className="hover:text-[#242220]">Girls</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold truncate max-w-[240px]">{product.name}</span>
      </nav>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-[#e6e1d7] shadow-xs">
        
        {/* Left Side: Image Gallery Layout */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          
          {/* Thumbnails list on left on desktop */}
          {images.length > 1 && (
            <div className="flex flex-row md:flex-col gap-2.5 order-2 md:order-1 shrink-0 overflow-x-auto md:overflow-x-visible md:max-h-[540px] scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden border bg-[#faf8f5] transition-all cursor-pointer ${
                    idx === activeImageIndex 
                      ? 'border-[#b85d68] ring-2 ring-[#b85d68]/20 shadow-xs' 
                      : 'border-[#e6e1d7] hover:border-[#242220]'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="h-full w-full object-cover object-center" />
                </button>
              ))}
            </div>
          )}

          {/* Active Main Image Box */}
          <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#faf8f5] border border-[#e6e1d7] relative group order-1 md:order-2">
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {isSale && (
              <span className="absolute left-4 top-4 bg-[#b85d68] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                Special Price
              </span>
            )}
          </div>

        </div>

        {/* Right Side: Product Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header titles */}
          <div className="space-y-2 border-b border-[#e6e1d7] pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b85d68]">
                Dualat Boutique
              </span>
              <span className="text-[10px] text-[#8c8780] font-medium capitalize">
                {product.category} Wear
              </span>
            </div>
            
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242220] leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#242220]">
                ₹{price}
              </span>
              {isSale && (
                <>
                  <span className="text-sm text-[#8c8780] line-through font-medium">
                    ₹{product.basePrice}
                  </span>
                  <span className="text-xs font-bold text-[#b85d68] bg-[#fdf8f7] px-2 py-0.5 rounded-full border border-[#f4dcda]">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>
            <p className="text-[10px] font-medium text-[#8c8780] uppercase tracking-wider">
              Inclusive of all taxes • Pan-India door delivery
            </p>
          </div>

          {/* Sizes Section */}
          <div className="space-y-3 pt-4 border-t border-[#e6e1d7]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#242220] uppercase tracking-wider">
                Select Age / Size
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[11px] font-bold text-[#b85d68] hover:underline uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <Ruler size={13} /> Size Chart
              </button>
            </div>
            
            <SizeSelector 
              sizes={product.sizes || []}
              selectedSize={selectedSize}
              onSelectSize={(size) => setSelectedSize(size)}
            />
          </div>

          {/* WhatsApp Direct Assistance */}
          <div className="p-3.5 rounded-xl bg-[#f8faf8] border border-[#dde6dd] flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <p className="font-bold text-[#242220]">Need help picking a size?</p>
              <p className="text-[11px] text-[#6b6661]">A mother on our team can advise on fit & growth room.</p>
            </div>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#719373] hover:bg-[#58765a] text-white font-bold text-[10px] uppercase tracking-wider transition-colors shrink-0"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || isOutOfStock}
              className={`flex-1 flex items-center justify-center gap-2.5 font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-all cursor-pointer shadow-sm ${
                !selectedSize 
                  ? 'bg-[#e6e1d7] text-[#8c8780] cursor-not-allowed shadow-none'
                  : isOutOfStock
                  ? 'bg-[#f3efe9] text-[#8c8780] cursor-not-allowed line-through'
                  : 'bg-[#242220] hover:bg-[#b85d68] text-white hover:scale-[1.01]'
              }`}
            >
              <ShoppingBag size={16} />
              {!selectedSize 
                ? 'Select Size to Add' 
                : isOutOfStock 
                ? 'Out of Stock' 
                : 'Add to Bag'
              }
            </button>

            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`flex items-center justify-center gap-2 border font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-all cursor-pointer ${
                isWishlisted
                  ? 'bg-[#fdf8f7] border-[#b85d68] text-[#b85d68]'
                  : 'border-[#e6e1d7] hover:border-[#242220] text-[#242220]'
              }`}
            >
              <Heart size={16} fill={isWishlisted ? "#b85d68" : "none"} className={isWishlisted ? "text-[#b85d68]" : ""} />
              {isWishlisted ? 'Saved' : 'Wishlist'}
            </button>
          </div>

          {/* Pincode Delivery Check */}
          <div className="pt-6 border-t border-[#e6e1d7] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#242220] uppercase tracking-wider">
              <Truck size={15} className="text-[#8c8780]" /> Delivery Estimator
            </div>
            
            <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
              <div className="relative flex-1">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c8780]">
                  <MapPin size={13} />
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="w-full rounded-full bg-[#f3efe9] border border-transparent focus:border-[#b85d68] py-2 pl-9 pr-3 text-xs focus:outline-none text-[#242220]"
                />
              </div>
              <button 
                type="submit"
                className="bg-white border border-[#e6e1d7] hover:border-[#b85d68] text-[#242220] hover:text-[#b85d68] font-bold text-[10px] uppercase tracking-wider px-4 rounded-full transition-colors cursor-pointer"
              >
                Check
              </button>
            </form>

            {pincodeStatus === 'checking' && (
              <p className="text-[10px] text-[#8c8780] font-medium flex items-center gap-1.5">
                <span className="animate-spin h-3 w-3 border border-[#b85d68] border-t-transparent rounded-full" />
                Checking pin code coverage...
              </p>
            )}
            {pincodeStatus === 'verified' && (
              <div className="p-3 bg-[#f8faf8] border border-[#dde6dd] text-[#465d48] rounded-xl space-y-1 text-xs">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-[#719373]" /> Door delivery available to {pincode}
                </p>
                <p className="text-[11px] text-[#6b6661] flex items-center gap-1 pl-5">
                  <Calendar size={12} /> Expected delivery within <strong>4–7 business days</strong>
                </p>
              </div>
            )}
            {pincodeStatus === 'invalid' && (
              <p className="text-[11px] text-[#9e4652] font-semibold">
                Please enter a valid 6-digit Indian pincode.
              </p>
            )}
          </div>

          {/* Accordion Specifications */}
          <div className="pt-6 border-t border-[#e6e1d7] space-y-2 text-xs">
            <details className="group border-b border-[#f3efe9] pb-3 cursor-pointer" open>
              <summary className="list-none flex justify-between items-center font-bold text-[#242220] uppercase tracking-wider select-none">
                <span>Description & Fit</span>
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-[#8c8780]" />
              </summary>
              <p className="text-xs text-[#6b6661] leading-relaxed font-normal mt-2.5">
                {product.description}
              </p>
            </details>

            <details className="group border-b border-[#f3efe9] pb-3 cursor-pointer">
              <summary className="list-none flex justify-between items-center font-bold text-[#242220] uppercase tracking-wider select-none">
                <span>Fabric & Materials</span>
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-[#8c8780]" />
              </summary>
              <p className="text-xs text-[#6b6661] leading-relaxed font-normal mt-2.5">
                {product.fabricDetails || "Crafted from soft, breathable cotton tailored for ease of movement and delicate skin."}
              </p>
            </details>

            <details className="group border-b border-[#f3efe9] pb-3 cursor-pointer">
              <summary className="list-none flex justify-between items-center font-bold text-[#242220] uppercase tracking-wider select-none">
                <span>Wash & Care Instructions</span>
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-[#8c8780]" />
              </summary>
              <p className="text-xs text-[#6b6661] leading-relaxed font-normal mt-2.5">
                {product.careInstructions || "Gentle cold hand or machine wash with like colors. Do not bleach. Dry in shade. Iron on low heat."}
              </p>
            </details>

            <details className="group border-b border-[#f3efe9] pb-3 cursor-pointer">
              <summary className="list-none flex justify-between items-center font-bold text-[#242220] uppercase tracking-wider select-none">
                <span>Shipping & 7-Day Exchange</span>
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-[#8c8780]" />
              </summary>
              <div className="text-xs text-[#6b6661] leading-relaxed font-normal mt-2.5 space-y-1.5">
                <p>• <strong>Dispatched:</strong> Within 24–48 business hours from Kerala, India.</p>
                <p>• <strong>Delivery:</strong> 4–7 business days pan India.</p>
                <p>• <strong>Exchange:</strong> Easy size exchange within 7 days for unworn outfits.</p>
              </div>
            </details>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          You May Also Love (Related Outfits)
         ───────────────────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="border-b border-[#e6e1d7] pb-3 flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#b85d68]">More Choices</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#242220]">You May Also Love</h2>
            </div>
            <Link href="/girls" className="text-xs font-bold uppercase tracking-wider text-[#b85d68] hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          Size Guide Modal
         ───────────────────────────────────────────────────────────── */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#242220]/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#e6e1d7] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#e6e1d7] pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#242220]">Dualat Girls Size Chart</h3>
                <p className="text-xs text-[#8c8780] mt-0.5">Approximate measurements in inches</p>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#f3efe9] text-[#242220] cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#faf8f5] text-[10px] font-bold uppercase tracking-wider text-[#6b6661]">
                  <tr>
                    <th className="p-3">Age Group</th>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest</th>
                    <th className="p-3">Waist</th>
                    <th className="p-3">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3efe9] text-[#242220]">
                  {SIZE_MODAL_ROWS.map((row) => (
                    <tr key={row.size} className="hover:bg-[#fdf8f7]">
                      <td className="p-3 font-bold text-[#b85d68]">{row.age}</td>
                      <td className="p-3 font-semibold">{row.size}</td>
                      <td className="p-3 text-[#6b6661]">{row.chest}</td>
                      <td className="p-3 text-[#6b6661]">{row.waist}</td>
                      <td className="p-3 text-[#6b6661]">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#faf8f5] p-4 rounded-xl text-xs text-[#6b6661] space-y-1">
              <p className="font-bold text-[#242220]">Mother&apos;s Advice:</p>
              <p>If your child is between sizes or tall for her age, we recommend sizing up so she enjoys more months of comfortable wear.</p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          Sticky Add to Bag Bar on Mobile (Appears on scroll)
         ───────────────────────────────────────────────────────────── */}
      {showStickyBar && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#e6e1d7] p-3 z-30 shadow-2xl flex items-center justify-between gap-3 animate-fade-in pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#242220] truncate">{product.name}</p>
            <p className="text-xs font-serif font-extrabold text-[#b85d68]">₹{price}</p>
          </div>
          <button
            onClick={() => {
              if (selectedSize) {
                handleAddToCart();
              } else {
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }
            }}
            className="px-5 py-2.5 rounded-full bg-[#242220] hover:bg-[#b85d68] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs"
          >
            {selectedSize ? 'Add to Bag' : 'Select Size'}
          </button>
        </div>
      )}
    </div>
  );
}
