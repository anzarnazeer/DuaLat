"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { AGE_GROUPS, CURATED_COLLECTIONS } from '@/lib/mockData';
import type { Product } from '@/lib/mockData';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Star, Heart, Check, Sparkles, ChevronLeft, ChevronRight, Percent, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    comment: "The tagless interior is amazing. Other brands left red marks on my baby's neck, but DuaLat is completely itch-free. Very high quality organic cotton.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

const HERO_SLIDES = [
  {
    id: 1,
    title: "KIDS FASHION CARNIVAL",
    subtitle: "BUTTERY-SOFT GOTS ORGANIC ROMPERS",
    offer: "FLAT 20% OFF",
    cta: "Shop Rompers",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200",
    tag: "BEST SELLER",
    bgColor: "bg-rose-50"
  },
  {
    id: 2,
    title: "PLAYGROUND PROOF GEAR",
    subtitle: "DURABLE WAIST JOGGERS & TOUGH KNEES",
    offer: "UNDER ₹45",
    cta: "Explore Activewear",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=1200",
    tag: "BUDGET BUYS",
    bgColor: "bg-blue-50"
  },
  {
    id: 3,
    title: "COZY LOUNGEWEAR SETS",
    subtitle: "HYPOALLERGENIC TAGLESS SLEEPMIS",
    offer: "MIN. 30% OFF",
    cta: "Explore Basics",
    image: "https://images.unsplash.com/photo-1544123089-c8d7bd6d8338?auto=format&fit=crop&q=80&w=1200",
    tag: "NEW ARRIVALS",
    bgColor: "bg-amber-50"
  }
];

const DEALS = [
  { id: 'deal-1', title: 'ORGANIC ROMPERS', discount: 'FLAT 20% OFF', image: 'https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&q=80&w=400', link: 'loungewear' },
  { id: 'deal-2', title: 'TOUGH JOGGERS', discount: 'UNDER ₹45', image: 'https://images.unsplash.com/photo-1519457497969-58b76ec1ec8b?auto=format&fit=crop&q=80&w=400', link: 'playground' },
  { id: 'deal-3', title: 'AIRY MUSLIN DRESSES', discount: 'MIN. 15% OFF', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400', link: 'basics' },
  { id: 'deal-4', title: 'SOFT ACCESSORIES', discount: 'STARTING AT ₹24', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400', link: 'basics' }
];

export default function Home() {
  const router = useRouter();
  const { setAgeFilter, setCollectionFilter, clearAllFilters } = useShop();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate hero slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

  // CONCEPT: useState + useEffect for data fetching in a Client Component.
  // Since this is a "use client" component, we can't use async/await directly.
  // Instead, we fetch data after the component mounts using useEffect.
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((products: Product[]) => setFeaturedProducts(products.slice(0, 4)))
      .catch((err) => console.error('Failed to load featured products:', err));
  }, []);

  return (
    <div className="space-y-14">
      
      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden bg-white border border-cream-300 rounded shadow-xs h-[320px] sm:h-[400px] md:h-[450px]">
        <div className="relative h-full w-full">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 flex flex-col md:flex-row items-center justify-between ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                } ${slide.bgColor}`}
              >
                <div className="p-8 sm:p-12 md:p-16 flex-1 space-y-3 sm:space-y-4 md:space-y-6 text-left max-w-xl z-20">
                  <div className="inline-flex items-center gap-1 bg-primary-500 text-white text-[9px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wider uppercase">
                    <Sparkles size={11} className="fill-white" /> {slide.tag}
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <h2 className="text-[10px] sm:text-xs font-bold tracking-widest text-[#696e79] uppercase">
                      {slide.subtitle}
                    </h2>
                    <h1 className="font-assistant text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#282c3f] leading-tight">
                      {slide.title}
                    </h1>
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-primary-500 tracking-wide">
                      {slide.offer}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        clearAllFilters();
                        router.push('/shop');
                      }}
                      className="inline-flex items-center gap-2 bg-[#282c3f] hover:bg-[#ff3f6c] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded tracking-wider uppercase transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
                    >
                      {slide.cta} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Banner Image */}
                <div className="relative h-1/2 md:h-full w-full md:w-1/2 overflow-hidden shrink-0 select-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#282c3f]/10 z-10" />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover object-center md:scale-[1.01]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-4 left-6 z-20 flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                idx === activeSlide ? 'bg-[#ff3f6c]' : 'bg-[#282c3f]/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Brand Promos Section: Deals of the Day */}
      <section className="space-y-5 bg-white p-6 border border-cream-300 rounded shadow-xs">
        <div className="border-b border-cream-300 pb-3.5">
          <h2 className="font-assistant text-[18px] sm:text-[22px] font-black tracking-widest text-[#282c3f] uppercase">
            Deals of the Day
          </h2>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            Grab them before they fly
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              onClick={() => handleCollectionClick(deal.link as any)}
              className="group relative flex flex-col bg-[#f5f5f6] border border-cream-300 rounded overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-cream-200">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center bg-white border-t border-cream-300 space-y-1">
                <h4 className="text-[10px] font-extrabold tracking-widest text-charcoal uppercase truncate">{deal.title}</h4>
                <p className="text-xs font-black text-primary-500 tracking-wide">{deal.discount}</p>
                <div className="inline-flex items-center text-[9px] font-extrabold text-[#696e79] uppercase tracking-wider group-hover:text-primary-500 pt-0.5">
                  Grab Now <ArrowUpRight size={10} className="ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Circular Shop by Age Section */}
      <section className="space-y-6">
        <div className="text-center border-b border-cream-300 pb-4 max-w-xl mx-auto">
          <h2 className="text-[20px] font-black text-charcoal uppercase tracking-widest">Shop By Age Group</h2>
          <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mt-0.5">Instant filters for rapid size matches</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-2">
          {AGE_GROUPS.map((age, index) => {
            const borderColors = [
              'hover:border-rose-400 hover:text-rose-500',
              'hover:border-blue-400 hover:text-blue-500',
              'hover:border-amber-400 hover:text-amber-500',
              'hover:border-emerald-400 hover:text-emerald-500',
            ];
            const colorClass = borderColors[index % borderColors.length];

            return (
              <button
                key={age.value}
                onClick={() => handleAgeClick(age.value)}
                className={`flex h-16 w-16 sm:h-20 sm:w-20 flex-col items-center justify-center rounded-full border border-cream-300 bg-white shadow-xs transition-all hover:scale-105 cursor-pointer font-extrabold text-charcoal ${colorClass}`}
              >
                <span className="text-[9px] text-[#9496a2] font-extrabold uppercase tracking-wide">Ages</span>
                <span className="text-xs font-black tracking-tight">{age.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Curated Collections Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-cream-300 pb-3">
          <div>
            <h2 className="text-[18px] sm:text-[22px] font-black text-charcoal uppercase tracking-widest">Shop by Milestone</h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Engineered designs for baby developments</p>
          </div>
          <button 
            onClick={() => {
              clearAllFilters();
              router.push('/shop');
            }}
            className="text-[10px] font-extrabold uppercase tracking-widest text-primary-500 hover:text-primary-600 flex items-center gap-1 cursor-pointer"
          >
            All Collections <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURATED_COLLECTIONS.map((col) => (
            <div 
              key={col.id}
              className="group flex flex-col bg-white rounded border border-cream-300 p-4 hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#f5f5f6]">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h3 className="font-assistant text-base font-extrabold text-charcoal mt-4 uppercase tracking-wider">{col.title}</h3>
              <p className="text-[11px] text-[#696e79] mt-1.5 leading-relaxed font-medium">{col.description}</p>
              
              <button
                onClick={() => handleCollectionClick(col.id as any)}
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#282c3f] group-hover:text-primary-500 transition-colors cursor-pointer self-start"
              >
                Shop Now <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products (Trending Favorites) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-cream-300 pb-3">
          <div>
            <h2 className="text-[18px] sm:text-[22px] font-black text-charcoal uppercase tracking-widest">Trending Favorites</h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Loved by parents, approved by active kids</p>
          </div>
          <button
            onClick={() => {
              clearAllFilters();
              router.push('/shop');
            }}
            className="text-[10px] font-extrabold uppercase tracking-widest text-primary-500 hover:text-primary-600 flex items-center gap-1 cursor-pointer"
          >
            Shop All <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="bg-white p-8 sm:p-12 border border-cream-300 rounded shadow-xs relative">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <div className="flex justify-center gap-0.5 text-primary-500 mb-2">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <h2 className="text-[18px] sm:text-xl font-black text-charcoal uppercase tracking-wider">Verified Parent Reviews</h2>
            <p className="text-[9px] text-[#9496a2] font-extrabold uppercase tracking-wider mt-0.5">Real feedback on organic comfort</p>
          </div>

          <div className="min-h-48 flex flex-col items-center justify-center text-center px-4 relative">
            <span className="absolute -top-6 left-0 text-7xl text-cream-300 select-none opacity-50">“</span>
            
            <p className="text-sm sm:text-base text-[#696e79] font-medium italic leading-relaxed max-w-xl relative z-10">
              {MOCK_TESTIMONIALS[activeTestimonial].comment}
            </p>

            <div className="flex items-center gap-3 mt-6">
              <img 
                src={MOCK_TESTIMONIALS[activeTestimonial].avatar} 
                alt={MOCK_TESTIMONIALS[activeTestimonial].parentName} 
                className="h-9 w-9 rounded-full object-cover border border-[#eaeaec] shrink-0" 
              />
              <div className="text-left">
                <h4 className="font-assistant text-xs font-bold text-charcoal flex items-center gap-1.5 uppercase tracking-wide">
                  {MOCK_TESTIMONIALS[activeTestimonial].parentName}
                  {MOCK_TESTIMONIALS[activeTestimonial].verified && (
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-secondary-50 text-secondary-600 text-[8px] font-bold" title="Verified Buyer">✓</span>
                  )}
                </h4>
                <p className="text-[9px] text-[#9496a2] font-semibold uppercase tracking-wider">Parent of baby ({MOCK_TESTIMONIALS[activeTestimonial].childAge})</p>
              </div>
            </div>
          </div>

          {/* Testimonial navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-cream-300">
            <div className="flex gap-1.5">
              {MOCK_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                    i === activeTestimonial ? 'bg-[#ff3f6c]' : 'bg-cream-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevTestimonial}
                className="p-1.5 border border-cream-300 bg-white hover:bg-cream-200 rounded text-charcoal cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-1.5 border border-cream-300 bg-white hover:bg-cream-200 rounded text-charcoal cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="bg-white rounded p-8 sm:p-12 border border-cream-300 grid grid-cols-1 md:grid-cols-2 gap-10 items-center overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-primary-500">
          <Heart size={200} />
        </div>
        
        <div className="order-2 md:order-1 space-y-6 relative z-10">
          <div className="space-y-2">
            <h2 className="font-assistant text-2xl md:text-3xl font-black text-charcoal uppercase tracking-wider">Meet the Founder</h2>
            <div className="h-1 w-12 bg-primary-500 rounded"></div>
          </div>
          
          <div className="space-y-4 text-sm text-[#696e79] leading-relaxed">
            <p>
              Hi, I'm <strong className="text-charcoal font-bold">Asna</strong>, a young entrepreneur and a proud mother of a beautiful 1-year-old girl.
            </p>
            <p>
              When I had my daughter, I struggled to find clothes in Kerala that were both stylish and gentle on her sensitive skin. That struggle became my mission. I founded DuaLat to bring premium, frictionless, and hypoallergenic kids' wear to parents like you and me.
            </p>
            <p>
              At DuaLat, our goal is simple: to provide the highest quality GOTS-certified organic clothing for babies and toddlers aged 6 months to 5 years. Every piece in our collection is chosen with the same care and love I have for my own daughter. Thank you for supporting a mother's dream.
            </p>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
              <span className="text-xl">👩‍👧</span>
            </div>
            <div>
              <p className="font-bold text-charcoal text-sm uppercase tracking-wider">Asna</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Founder, DuaLat</p>
            </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800" 
            alt="Asna - Founder of DuaLat" 
            className="w-full h-80 object-cover rounded-xl shadow-lg border border-cream-200"
          />
        </div>
      </section>

      {/* Brand Ethos Badge Grid */}
      <section className="bg-cream-200 rounded p-6 sm:p-10 border border-cream-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-1.5">
          <span className="text-2xl">🌿</span>
          <h4 className="font-assistant text-xs font-extrabold text-charcoal uppercase tracking-wider">Certified Organic</h4>
          <p className="text-[11px] text-[#696e79] leading-relaxed">GOTS certified organic cotton, grown chemical-free. Extremely gentle on baby skin.</p>
        </div>
        <div className="space-y-1.5">
          <span className="text-2xl">🏷️</span>
          <h4 className="font-assistant text-xs font-extrabold text-charcoal uppercase tracking-wider">Tagless Comfort</h4>
          <p className="text-[11px] text-[#696e79] leading-relaxed">Smooth tagless necklines and flatlock stitch seams to protect baby eczema spots.</p>
        </div>
        <div className="space-y-1.5">
          <span className="text-2xl">🧸</span>
          <h4 className="font-assistant text-xs font-extrabold text-charcoal uppercase tracking-wider">Eczema Friendly</h4>
          <p className="text-[11px] text-[#696e79] leading-relaxed">Water-based, non-toxic organic dye prints. No allergens or harsh metals.</p>
        </div>
        <div className="space-y-1.5">
          <span className="text-2xl">⚡</span>
          <h4 className="font-assistant text-xs font-extrabold text-charcoal uppercase tracking-wider">2-Way Diaper Zips</h4>
          <p className="text-[11px] text-[#696e79] leading-relaxed">Two-way diaper zipper integrations on rompers for changes in under 30 seconds.</p>
        </div>
      </section>

    </div>
  );
}

