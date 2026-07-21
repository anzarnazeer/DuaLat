"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Review } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import SizeSelector from '@/components/SizeSelector';
import GrowWithMeGuide from '@/components/GrowWithMeGuide';
import { ArrowLeft, Star, ShoppingCart, HelpCircle, CheckCircle, RefreshCw, X, ShieldAlert } from 'lucide-react';
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

  const price = product.salePrice ?? product.basePrice;
  const isSale = !!product.salePrice;

  // Calculate dynamic Fit percentages from reviews
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

  const selectedSizeStock = product.sizes.find(s => s.size === selectedSize);
  const isOutOfStock = selectedSizeStock && selectedSizeStock.stockCount === 0;

  return (
    <div className="space-y-12">
      {/* Back button */}
      <Link 
        href="/shop" 
        className="inline-flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary-500 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      {/* Main product view */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          {/* Active Image Box with zoom-on-hover */}
          <div className="aspect-square w-full rounded-3xl overflow-hidden bg-white border border-cream-200 shadow-sm relative group">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {isSale && (
              <span className="absolute left-4 top-4 bg-accent-500 text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-sm">
                Sale Wear
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-20 w-20 rounded-2xl overflow-hidden border-2 bg-white transition-all cursor-pointer ${
                    idx === activeImageIndex 
                      ? 'border-primary-500 scale-95 shadow-sm' 
                      : 'border-cream-200 hover:border-primary-300'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="h-full w-full object-cover object-center" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Purchasing */}
        <div className="space-y-6">
          
          {/* Header titles */}
          <div className="space-y-2">
            <span className="text-xs text-primary-600 font-extrabold uppercase tracking-widest">{product.category} Wear</span>
            <h1 className="font-nunito text-3xl font-black text-charcoal">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <div className="flex text-primary-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="font-bold text-charcoal">{product.rating}</span>
              <span>•</span>
              <button 
                onClick={() => {
                  const el = document.getElementById('reviews-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:underline text-xs font-semibold cursor-pointer text-gray-400 hover:text-primary-500"
              >
                {product.reviews.length} Parent Reviews
              </button>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="flex items-baseline gap-3 bg-white p-4 rounded-2xl border border-cream-200 w-fit">
            <span className="text-2xl font-black text-charcoal">
              ${price.toFixed(2)}
            </span>
            {isSale && (
              <span className="text-sm text-gray-400 line-through">
                ${product.basePrice.toFixed(2)}
              </span>
            )}
            {isSale && (
              <span className="text-xs font-bold text-accent-500 bg-accent-50 px-2 py-0.5 rounded border border-accent-100 ml-2">
                Save ${(product.basePrice - product.salePrice!).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            {product.description}
          </p>

          {/* Fabric transparency cards */}
          <div className="grid grid-cols-2 gap-3">
            {product.fabricTags.map((tag) => (
              <div 
                key={tag} 
                className="p-3 bg-white rounded-2xl border border-cream-200 flex items-start gap-2.5 shadow-xs"
              >
                <span className="text-xl">
                  {tag.includes('Organic') ? '🌿' : tag.includes('Tagless') || tag.includes('Itch-Free') ? '🏷️' : '🍼'}
                </span>
                <div>
                  <h4 className="font-nunito text-[11px] font-bold text-charcoal leading-tight">{tag}</h4>
                  <p className="text-[9px] text-gray-400 leading-normal mt-0.5">
                    {tag.includes('Organic') ? 'Chemical-free safety' : tag.includes('Tagless') ? 'Flatlock stitching' : 'Sensitive skin guard'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Size Selector */}
          <div className="space-y-4 pt-4 border-t border-cream-200">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-charcoal">Size & Fitting Help:</span>
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(true)}
                className="text-xs font-bold text-primary-500 hover:text-primary-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                📐 Grow-With-Me Calculator
              </button>
            </div>
            
            <SizeSelector 
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={(size) => setSelectedSize(size)}
            />
          </div>

          {/* Purchase CTA */}
          <div className="pt-4 space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || isOutOfStock}
              className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl shadow-md transition-all cursor-pointer ${
                !selectedSize 
                  ? 'bg-cream-200 text-gray-400 border border-cream-300 shadow-none cursor-not-allowed'
                  : isOutOfStock
                  ? 'bg-gray-100 text-gray-300 border border-gray-200 shadow-none cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 text-white hover:scale-[1.01]'
              }`}
            >
              <ShoppingCart size={18} />
              {!selectedSize 
                ? 'Please Select a Size First' 
                : isOutOfStock 
                ? 'Selected Size Out of Stock' 
                : `Add to Cart • $${price.toFixed(2)}`
              }
            </button>
            
            {/* Quick checkout trust badges */}
            <div className="flex justify-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-wider py-1">
              <span className="flex items-center gap-1 text-secondary-600"><CheckCircle size={12} /> Free returns</span>
              <span className="flex items-center gap-1 text-secondary-600"><CheckCircle size={12} /> Secure Checkout</span>
            </div>
          </div>

        </div>
      </div>

      {/* Fabric care details & instructions */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-nunito text-base font-bold text-charcoal mb-2">🌿 Fabric Details & Material Safety</h3>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">{product.fabricDetails}</p>
        </div>
        <div>
          <h3 className="font-nunito text-base font-bold text-charcoal mb-2">🧼 Care & Washing Instructions</h3>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">{product.careInstructions}</p>
        </div>
      </div>

      {/* Reviews & Fit Feedback System */}
      <div id="reviews-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-6">
        <h3 className="font-nunito text-xl font-bold text-charcoal border-b border-cream-100 pb-3">Parent Reviews & Fit Analysis</h3>

        {/* Fit Analysis dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Average Rating summary */}
          <div className="text-center md:border-r border-cream-100 md:pr-6 space-y-2">
            <span className="text-4xl font-black text-charcoal">{product.rating}</span>
            <div className="flex justify-center text-primary-500">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <p className="text-xs text-gray-400 font-semibold">Based on {product.reviews.length} parents' reviews</p>
          </div>

          {/* Fit feedback graph */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Real Parent Fit Indicators</h4>
            
            {/* True to Size bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-600">
                <span>True to Size</span>
                <span>{fitStats.trueToSize}%</span>
              </div>
              <div className="w-full bg-cream-100 h-2 rounded-full overflow-hidden">
                <div className="bg-secondary-400 h-full rounded-full" style={{ width: `${fitStats.trueToSize}%` }} />
              </div>
            </div>

            {/* Runs Small bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-600">
                <span>Runs Small (Recommended sizing up)</span>
                <span>{fitStats.runsSmall}%</span>
              </div>
              <div className="w-full bg-cream-100 h-2 rounded-full overflow-hidden">
                <div className="bg-accent-400 h-full rounded-full" style={{ width: `${fitStats.runsSmall}%` }} />
              </div>
            </div>

            {/* Runs Large bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-600">
                <span>Runs Large</span>
                <span>{fitStats.runsLarge}%</span>
              </div>
              <div className="w-full bg-cream-100 h-2 rounded-full overflow-hidden">
                <div className="bg-primary-400 h-full rounded-full" style={{ width: `${fitStats.runsLarge}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List & filters */}
        <div className="pt-6 border-t border-cream-100 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
            <h4 className="text-sm font-bold text-charcoal">Reviews Feed</h4>
            
            {/* Fit Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'True to Size', 'Runs Small', 'Runs Large'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setReviewFitFilter(filter)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    reviewFitFilter === filter
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-cream-50 text-gray-500 border-cream-200 hover:bg-cream-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          {filteredReviews.length === 0 ? (
            <div className="text-center py-10 bg-cream-50 rounded-2xl border border-cream-200">
              <p className="text-xs text-gray-400 font-bold">No reviews found matching fit filter "{reviewFitFilter}"</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="p-4 bg-cream-50/50 rounded-2xl border border-cream-100 space-y-2.5"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h5 className="font-nunito text-xs font-bold text-charcoal">{rev.reviewerName}</h5>
                      <span className="text-[9px] text-gray-400">Published on {rev.date}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex text-primary-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[9px] font-bold bg-white text-gray-400 border border-cream-200 px-2 py-0.5 rounded-md">
                      Size: {rev.sizePurchased}
                    </span>
                    <span className={`text-[9px] font-bold border px-2 py-0.5 rounded-md ${
                      rev.fitFeedback === 'True to Size' 
                        ? 'bg-secondary-50 text-secondary-600 border-secondary-100' 
                        : 'bg-accent-50 text-accent-600 border-accent-100'
                    }`}>
                      Fit: {rev.fitFeedback}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grow-With-Me Calculator Modal Dialog */}
      <AnimatePresence>
        {isCalculatorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCalculatorOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl p-1 z-50 max-w-lg w-full shadow-2xl overflow-hidden border border-cream-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCalculatorOpen(false)}
                className="absolute right-4 top-4 z-10 p-2 hover:bg-cream-100 rounded-xl text-gray-400 hover:text-charcoal cursor-pointer"
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
