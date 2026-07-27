"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Review } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import SizeSelector from '@/components/SizeSelector';
import GrowWithMeGuide from '@/components/GrowWithMeGuide';
import { ArrowLeft, Star, ShoppingBag, HelpCircle, CheckCircle, RefreshCw, X, ShieldAlert, Heart, Truck, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [reviewFitFilter, setReviewFitFilter] = useState<'All' | 'Runs Small' | 'True to Size' | 'Runs Large'>('All');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Zipcode check state
  const [zipcode, setZipcode] = useState('');
  const [zipStatus, setZipStatus] = useState<'idle' | 'checking' | 'verified' | 'invalid'>('idle');

  const price = product.salePrice ?? product.basePrice;
  const isSale = !!product.salePrice;
  const discountPercent = isSale 
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100) 
    : 0;

  // Fit calculations
  const fitStats = useMemo(() => {
    const total = product.reviews.length;
    if (total === 0) return { trueToSize: 0, runsSmall: 0, runsLarge: 0 };
    
    let trueToSize = 0;
    let runsSmall = 0;
    let runsLarge = 0;

    product.reviews.forEach((r) => {
      if (r.fitFeedback === 'True to Size') trueToSize++;
      else if (r.fitFeedback === 'Runs Small') runsSmall++;
      else if (r.fitFeedback === 'Runs Large') runsLarge++;
    });

    return {
      trueToSize: Math.round((trueToSize / total) * 100),
      runsSmall: Math.round((runsSmall / total) * 100),
      runsLarge: Math.round((runsLarge / total) * 100),
    };
  }, [product.reviews]);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    if (reviewFitFilter === 'All') return product.reviews;
    return product.reviews.filter((r) => r.fitFeedback === reviewFitFilter);
  }, [product.reviews, reviewFitFilter]);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize, 1);
    }
  };

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipcode.trim()) return;
    setZipStatus('checking');
    setTimeout(() => {
      if (/^\d{5,6}$/.test(zipcode.trim())) {
        setZipStatus('verified');
      } else {
        setZipStatus('invalid');
      }
    }, 800);
  };

  const selectedSizeStock = product.sizes.find(s => s.size === selectedSize);
  const isOutOfStock = selectedSizeStock && selectedSizeStock.stockCount === 0;

  return (
    <div className="space-y-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-[#9496a2] font-semibold flex items-center gap-1.5 uppercase tracking-wider">
        <span className="hover:text-charcoal cursor-pointer" onClick={() => window.location.href = '/'}>Home</span>
        <span>/</span>
        <span className="hover:text-charcoal cursor-pointer" onClick={() => window.location.href = '/shop'}>Kids Wear</span>
        <span>/</span>
        <span className="text-[#282c3f] font-extrabold">{product.name}</span>
      </div>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-6 border border-cream-300 rounded shadow-xs">
        
        {/* Left Side: Image Gallery Layout */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          
          {/* Thumbnails list on left on desktop */}
          {product.images.length > 1 && (
            <div className="flex flex-row md:flex-col gap-2.5 order-2 md:order-1 shrink-0 overflow-x-auto md:overflow-x-visible md:max-h-[500px]">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-16 w-16 md:h-20 md:w-20 rounded overflow-hidden border bg-[#f5f5f6] transition-all cursor-pointer ${
                    idx === activeImageIndex 
                      ? 'border-primary-500 ring-1 ring-primary-500 scale-95 shadow-xs' 
                      : 'border-cream-300 hover:border-charcoal'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="h-full w-full object-cover object-center" />
                </button>
              ))}
            </div>
          )}

          {/* Active Image Box */}
          <div className="aspect-[3/4] w-full rounded overflow-hidden bg-[#f5f5f6] border border-cream-300 relative group order-1 md:order-2">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {isSale && (
              <span className="absolute left-4 top-4 bg-primary-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded shadow">
                Sale Wear
              </span>
            )}
          </div>

        </div>

        {/* Right Side: Product Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header titles */}
          <div className="space-y-1.5 border-b border-cream-300 pb-4">
            <h1 className="font-assistant text-xl font-black text-[#282c3f] tracking-wide uppercase">DuaLat</h1>
            <p className="text-base text-gray-500 font-medium">{product.name}</p>
            
            {/* Rating pill */}
            <div className="flex items-center gap-1.5 pt-1.5 text-xs text-gray-500">
              <div className="flex bg-[#f5f5f6] px-2.5 py-1 rounded border border-cream-300 items-center gap-1 font-bold text-charcoal shadow-xs">
                <span>{product.rating}</span>
                <Star size={11} fill="#ff3f6c" className="text-primary-500" />
                <span className="text-gray-300 mx-0.5">|</span>
                <span>{product.reviews.length} Ratings</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-2xl font-extrabold text-[#282c3f]">
              ₹{price.toFixed(2)}
            </span>
            {isSale && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.basePrice.toFixed(2)}
                </span>
                <span className="text-base font-extrabold text-accent-400">
                  ({discountPercent}% OFF)
                </span>
              </>
            )}
          </div>
          <p className="text-[10px] font-bold text-secondary-600 uppercase tracking-wide">inclusive of all taxes</p>

          {/* Sizes Section */}
          <div className="space-y-3.5 pt-4 border-t border-cream-300">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-[#282c3f] uppercase tracking-wider">Select Size</span>
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(true)}
                className="text-[10px] font-black text-primary-500 hover:text-primary-600 uppercase tracking-widest flex items-center gap-1 cursor-pointer"
              >
                📐 Size Chart
              </button>
            </div>
            
            <SizeSelector 
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={(size) => setSelectedSize(size)}
            />
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || isOutOfStock}
              className={`flex-1 flex items-center justify-center gap-2.5 font-extrabold text-sm py-4 px-6 rounded shadow transition-all cursor-pointer uppercase tracking-wider ${
                !selectedSize 
                  ? 'bg-cream-300 text-gray-400 border border-cream-300 shadow-none cursor-not-allowed'
                  : isOutOfStock
                  ? 'bg-cream-200 text-gray-400 border border-cream-200 shadow-none cursor-not-allowed line-through'
                  : 'bg-primary-500 hover:bg-primary-600 text-white hover:scale-[1.01]'
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
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 border font-extrabold text-sm py-4 px-6 rounded transition-all cursor-pointer uppercase tracking-wider ${
                isWishlisted
                  ? 'bg-[#ff3f6c] border-[#ff3f6c] text-white'
                  : 'border-charcoal hover:bg-cream-200 text-[#282c3f]'
              }`}
            >
              <Heart size={16} fill={isWishlisted ? "white" : "none"} />
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>

          {/* Zipcode Check (Pincode checker) */}
          <div className="pt-6 border-t border-cream-300 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-black text-[#282c3f] uppercase tracking-wider">
              <Truck size={16} className="text-[#696e79]" /> Delivery Options
            </div>
            
            <form onSubmit={handleZipCheck} className="flex gap-2 max-w-sm">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MapPin size={14} />
                </div>
                <input
                  type="text"
                  placeholder="Enter Zip Code / Pincode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  maxLength={6}
                  className="w-full rounded border border-cream-300 py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:border-charcoal"
                />
              </div>
              <button 
                type="submit"
                className="bg-transparent border border-primary-500 hover:bg-primary-50 text-primary-500 font-extrabold text-[10px] uppercase tracking-wider px-5 rounded cursor-pointer transition-colors"
              >
                Check
              </button>
            </form>

            {/* Zip Status */}
            {zipStatus === 'checking' && (
              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                <span className="animate-spin h-3.5 w-3.5 border border-primary-500 border-t-transparent rounded-full" />
                Verifying local logistics coverage...
              </p>
            )}
            {zipStatus === 'verified' && (
              <div className="p-3 bg-secondary-50 border border-secondary-200 text-[#016250] rounded space-y-1 text-xs">
                <p className="font-extrabold flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-secondary-600" /> Deliverable to Pincode {zipcode}
                </p>
                <p className="text-[10px] text-gray-500 leading-normal flex items-center gap-1 pl-5">
                  <Calendar size={12} /> Expected delivery by <strong>Wednesday, Jul 29</strong>
                </p>
              </div>
            )}
            {zipStatus === 'invalid' && (
              <p className="text-[10px] text-accent-500 font-extrabold flex items-center gap-1">
                <ShieldAlert size={14} /> Invalid Zip code. Please enter 5 or 6 numeric digits.
              </p>
            )}
          </div>

          {/* Accordion Specifications */}
          <div className="pt-6 border-t border-cream-300 space-y-2">
            <details className="group border-b border-cream-300 pb-2.5 cursor-pointer" open>
              <summary className="list-none flex justify-between items-center text-xs font-black text-[#282c3f] uppercase tracking-wider select-none">
                <span>Product Description</span>
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-gray-400" />
              </summary>
              <p className="text-xs text-[#696e79] leading-relaxed font-semibold mt-2.5">
                {product.description}
              </p>
            </details>

            <details className="group border-b border-cream-300 pb-2.5 cursor-pointer">
              <summary className="list-none flex justify-between items-center text-xs font-black text-[#282c3f] uppercase tracking-wider select-none">
                <span>Specifications</span>
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-gray-400" />
              </summary>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs mt-3 pl-1 font-semibold text-[#696e79]">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Material</span>
                  <span className="text-charcoal mt-0.5 block">{product.fabricTags[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Safety</span>
                  <span className="text-charcoal mt-0.5 block">Tagless / Flatlock joints</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Dye Grade</span>
                  <span className="text-charcoal mt-0.5 block">Water-based Hypoallergenic</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Category</span>
                  <span className="text-charcoal mt-0.5 block capitalize">{product.category} Wear</span>
                </div>
              </div>
            </details>

            <details className="group border-b border-cream-300 pb-2.5 cursor-pointer">
              <summary className="list-none flex justify-between items-center text-xs font-black text-[#282c3f] uppercase tracking-wider select-none">
                <span>Care & Wash Guide</span>
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-gray-400" />
              </summary>
              <p className="text-xs text-[#696e79] leading-relaxed font-semibold mt-2.5">
                {product.careInstructions}
              </p>
            </details>
          </div>

        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews-section" className="bg-white p-6 sm:p-8 border border-cream-300 rounded shadow-xs space-y-6">
        <h3 className="font-assistant text-base font-black text-[#282c3f] uppercase tracking-wider border-b border-cream-300 pb-3">Parent Reviews & Fit Analysis</h3>

        {/* Fit dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:border-r border-cream-300 md:pr-6 space-y-1">
            <span className="text-4xl font-black text-[#282c3f]">{product.rating}</span>
            <div className="flex justify-center text-primary-500">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Based on {product.reviews.length} Ratings</p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider mb-2">Real Parent Fit Indicators</h4>
            
            {/* True to Size */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-600">
                <span>True to Size</span>
                <span>{fitStats.trueToSize}%</span>
              </div>
              <div className="w-full bg-cream-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary-500 h-full rounded-full" style={{ width: `${fitStats.trueToSize}%` }} />
              </div>
            </div>

            {/* Runs Small */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-600">
                <span>Runs Small</span>
                <span>{fitStats.runsSmall}%</span>
              </div>
              <div className="w-full bg-cream-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-accent-400 h-full rounded-full" style={{ width: `${fitStats.runsSmall}%` }} />
              </div>
            </div>

            {/* Runs Large */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-600">
                <span>Runs Large</span>
                <span>{fitStats.runsLarge}%</span>
              </div>
              <div className="w-full bg-cream-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-500 h-full rounded-full" style={{ width: `${fitStats.runsLarge}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Feed */}
        <div className="pt-6 border-t border-cream-300 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
            <h4 className="text-xs font-black text-[#282c3f] uppercase tracking-wider">Reviews Feed</h4>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'True to Size', 'Runs Small', 'Runs Large'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setReviewFitFilter(filter)}
                  className={`text-[9px] font-bold px-3 py-1.5 rounded border transition-all cursor-pointer ${
                    reviewFitFilter === filter
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-white text-gray-500 border-cream-300 hover:bg-cream-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          {filteredReviews.length === 0 ? (
            <div className="text-center py-10 bg-[#f5f5f6] rounded border border-cream-300">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">No reviews found matching fit filter "{reviewFitFilter}"</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="p-4 bg-white rounded border border-cream-300 space-y-2.5"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h5 className="font-assistant text-xs font-bold text-charcoal uppercase tracking-wide">{rev.reviewerName}</h5>
                      <span className="text-[9px] text-gray-400">Published on {rev.date}</span>
                    </div>
                    <div className="flex text-primary-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[9px] font-bold bg-[#f5f5f6] text-gray-500 border border-cream-300 px-2 py-0.5 rounded">
                      Size: {rev.sizePurchased}
                    </span>
                    <span className={`text-[9px] font-bold border px-2 py-0.5 rounded ${
                      rev.fitFeedback === 'True to Size' 
                        ? 'bg-secondary-50 text-secondary-600 border-secondary-200' 
                        : 'bg-accent-50 text-accent-600 border-accent-200'
                    }`}>
                      Fit: {rev.fitFeedback}
                    </span>
                  </div>

                  <p className="text-xs text-[#696e79] leading-relaxed font-semibold">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Calculator Modal */}
      <AnimatePresence>
        {isCalculatorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCalculatorOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded p-1 z-50 max-w-lg w-full shadow-2xl overflow-hidden border border-cream-300"
            >
              <button
                onClick={() => setIsCalculatorOpen(false)}
                className="absolute right-4 top-4 z-10 p-2 hover:bg-cream-200 rounded text-gray-400 hover:text-charcoal cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="p-1">
                <GrowWithMeGuide />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

