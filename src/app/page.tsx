"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { AGE_GROUPS, MOCK_PRODUCTS, CURATED_COLLECTIONS } from '@/lib/mockData';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Star, Heart, Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_TESTIMONIALS = [
  {
    id: 1,
    parentName: "Ashley Jenkins",
    childAge: "8 months old",
    rating: 5,
    comment: "The double zipper is a total lifesaver at 3 AM! The fabric is so soft and didn't irritate my son's eczema at all. We are officially hooked.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    parentName: "Marcus Vance",
    childAge: "2 years old",
    rating: 5,
    comment: "My toddler literally lives in the playground joggers. I was skeptical about the reinforced knees, but they have survived daily falls without a scratch!",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    parentName: "Elena Rostova",
    childAge: "Newborn",
    rating: 5,
    comment: "The tagless interior is amazing. Other brands left red marks on my baby's neck, but SproutWear is completely itch-free. Very high quality organic cotton.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

export default function Home() {
  const router = useRouter();
  const { setAgeFilter, setCollectionFilter, clearAllFilters } = useShop();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleAgeClick = (age: string) => {
    clearAllFilters();
    setAgeFilter(age);
    router.push('/shop');
  };

  const handleCollectionClick = (colId: 'loungewear' | 'playground' | 'basics') => {
    clearAllFilters();
    setCollectionFilter(colId);
    router.push('/shop');
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length);
  };

  // Curated list of 4 products to feature
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-50 via-cream-100 to-accent-50/60 p-8 sm:p-12 md:p-16 border border-cream-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-secondary-100 text-secondary-600 text-xs font-bold px-3 py-1.5 rounded-full border border-secondary-200 shadow-xs">
              <Sparkles size={12} className="animate-pulse" /> 100% GOTS Organic Cotton
            </div>

            <h1 className="font-nunito text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal leading-tight">
              Soft on skin.<br />
              <span className="text-primary-500">Easy on parents.</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
              Frictionless kids' wear for ages 0-5. Crafted with double-zippers for ultra-fast diaper changes, tagless interiors for itch-free play, and reinforced knees for adventurous crawlers.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => {
                  clearAllFilters();
                  router.push('/shop');
                }}
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                Shop New Arrivals <ArrowRight size={18} />
              </button>
              <button
                onClick={() => router.push('/product/prod-1')}
                className="inline-flex items-center gap-2 bg-white hover:bg-cream-100 text-charcoal border border-cream-200 font-bold px-6 py-3.5 rounded-2xl shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
              >
                Size Calculator
              </button>
            </div>
            
            {/* Rapid bullet checkmarks */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-cream-200/50">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary-100 text-secondary-600"><Check size={12} /></span>
                Tagless & Hypoallergenic
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary-100 text-secondary-600"><Check size={12} /></span>
                2-Way Diaper Zips
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary-100 text-secondary-600"><Check size={12} /></span>
                Free 30-Day Spill Returns
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary-100 text-secondary-600"><Check size={12} /></span>
                Reinforced Tough Knees
              </div>
            </div>
          </div>

          <div className="relative aspect-video md:aspect-square w-full rounded-2xl overflow-hidden shadow-lg border-2 border-white">
            <img 
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800" 
              alt="Baby smiling in cozy organic romper" 
              className="h-full w-full object-cover object-center"
            />
            {/* Dynamic floating badge */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-cream-200 shadow-md flex items-center gap-2">
              <span className="text-2xl animate-bounce">👼</span>
              <div>
                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Itch-Free Seal</p>
                <p className="text-xs font-black text-charcoal">Eczema Association Friendly</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Shop by Age Section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-black text-charcoal">Shop by Age Group</h2>
          <p className="text-sm text-gray-500 font-medium">Select age size to instantly filter and find ready-to-ship products</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {AGE_GROUPS.map((age, index) => {
            // Cycle backgrounds for playful pastel styling
            const bgClasses = [
              'bg-baby-pink hover:bg-baby-pink/80 border-rose-200 text-rose-800',
              'bg-baby-blue hover:bg-baby-blue/80 border-blue-200 text-blue-800',
              'bg-baby-yellow hover:bg-baby-yellow/80 border-amber-200 text-amber-800',
              'bg-secondary-100 hover:bg-secondary-200 border-secondary-200 text-secondary-800',
            ];
            const colorClass = bgClasses[index % bgClasses.length];

            return (
              <button
                key={age.value}
                onClick={() => handleAgeClick(age.value)}
                className={`flex h-20 w-20 sm:h-24 sm:w-24 flex-col items-center justify-center rounded-full border shadow-sm transition-all hover:scale-105 cursor-pointer font-extrabold ${colorClass}`}
              >
                <span className="text-xs font-bold uppercase tracking-wider">Ages</span>
                <span className="text-sm sm:text-base font-black">{age.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Curated Collections Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h2 className="text-3xl font-black text-charcoal">Curated Collections</h2>
            <p className="text-sm text-gray-500 font-medium">Made to fit key developmental milestones</p>
          </div>
          <button 
            onClick={() => {
              clearAllFilters();
              router.push('/shop');
            }}
            className="text-sm font-bold text-primary-500 hover:underline flex items-center gap-1 cursor-pointer"
          >
            See All Collections <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURATED_COLLECTIONS.map((col) => (
            <div 
              key={col.id}
              className={`group flex flex-col rounded-3xl p-6 border border-cream-200/50 shadow-xs hover:shadow-md transition-all duration-300 ${col.color}`}
            >
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white/50 border border-white/40">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h3 className="font-nunito text-xl font-bold text-charcoal mt-5">{col.title}</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">{col.description}</p>
              
              <button
                onClick={() => handleCollectionClick(col.id as any)}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-charcoal group-hover:text-primary-600 transition-colors cursor-pointer self-start"
              >
                Explore Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h2 className="text-3xl font-black text-charcoal">Trending Favorites</h2>
            <p className="text-sm text-gray-500 font-medium">Loved by parents, approved by happy crawlers</p>
          </div>
          <button
            onClick={() => {
              clearAllFilters();
              router.push('/shop');
            }}
            className="text-sm font-bold text-primary-500 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Shop All Clothing <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-200 shadow-sm relative">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <div className="flex justify-center gap-1 text-primary-500 mb-2">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal">Real Parents, Real Reassurance</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Verified Purchase Testimonials</p>
          </div>

          <div className="min-h-48 flex flex-col items-center justify-center text-center px-4 relative">
            {/* Big quote marks */}
            <span className="absolute -top-6 left-0 text-7xl text-cream-200 select-none">“</span>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-500 font-medium italic leading-relaxed max-w-xl relative z-10">
              {MOCK_TESTIMONIALS[activeTestimonial].comment}
            </p>

            <div className="flex items-center gap-3 mt-6">
              <img 
                src={MOCK_TESTIMONIALS[activeTestimonial].avatar} 
                alt={MOCK_TESTIMONIALS[activeTestimonial].parentName} 
                className="h-10 w-10 rounded-full object-cover border-2 border-primary-200 shrink-0" 
              />
              <div className="text-left">
                <h4 className="font-nunito text-sm font-bold text-charcoal flex items-center gap-1.5">
                  {MOCK_TESTIMONIALS[activeTestimonial].parentName}
                  {MOCK_TESTIMONIALS[activeTestimonial].verified && (
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-secondary-100 text-secondary-600 text-[8px] font-bold" title="Verified Buyer">✓</span>
                  )}
                </h4>
                <p className="text-[10px] text-gray-400">Parent of baby ({MOCK_TESTIMONIALS[activeTestimonial].childAge})</p>
              </div>
            </div>
          </div>

          {/* Testimonial navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-cream-100">
            <div className="flex gap-1.5">
              {MOCK_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors cursor-pointer ${
                    i === activeTestimonial ? 'bg-primary-500' : 'bg-cream-200'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevTestimonial}
                className="p-2 border border-cream-200 bg-white hover:bg-cream-50 rounded-xl text-charcoal cursor-pointer shadow-xs"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 border border-cream-200 bg-white hover:bg-cream-50 rounded-xl text-charcoal cursor-pointer shadow-xs"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Ethos / Reassurance Badge Grid */}
      <section className="bg-cream-50 rounded-3xl p-6 sm:p-10 border border-cream-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-2">
          <span className="text-3xl">🌿</span>
          <h4 className="font-nunito text-base font-bold text-charcoal">GOTS Certified Organic</h4>
          <p className="text-xs text-gray-400 leading-normal">Grown without heavy chemical pesticides. Completely soft & safe for brand-new baby skin.</p>
        </div>
        <div className="space-y-2">
          <span className="text-3xl">🏷️</span>
          <h4 className="font-nunito text-base font-bold text-charcoal">Itch-Free Seamless</h4>
          <p className="text-xs text-gray-400 leading-normal">Tagless neck lines and seamless flatlock stitch linings to prevent any eczema irritation.</p>
        </div>
        <div className="space-y-2">
          <span className="text-3xl">🧸</span>
          <h4 className="font-nunito text-base font-bold text-charcoal">Eczema Friendly</h4>
          <p className="text-xs text-gray-400 leading-normal">Dyed with water-based dyes, ensuring zero allergens touch your little ones.</p>
        </div>
        <div className="space-y-2">
          <span className="text-3xl">⚡</span>
          <h4 className="font-nunito text-base font-bold text-charcoal">Quick Diaper Zips</h4>
          <p className="text-xs text-gray-400 leading-normal">Fitted with 2-way zippers on rompers, so diaper swaps happen in under 30 seconds.</p>
        </div>
      </section>

    </div>
  );
}
