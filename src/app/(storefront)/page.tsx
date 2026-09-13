import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Heart, Shield, RefreshCw, MessageCircle, Check } from 'lucide-react';
import type { Product } from '@/lib/mockData';

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Baby Girl Dresses & Modest Kidswear Online in India | Dualat",
  description: "Shop comfortable, modest and beautiful dresses for baby girls and little girls at Dualat. Explore everyday, festive and special occasion styles with delivery across India.",
  alternates: {
    canonical: "https://www.dualat.in",
  },
  openGraph: {
    title: "Dualat | Modest, Comfortable & Beautiful Kidswear for Little Girls",
    description: "Thoughtfully designed outfits for baby girls and little girls aged 0–9 years. Delivering across India from Kerala.",
    url: "https://www.dualat.in",
    siteName: "Dualat",
    locale: "en_IN",
    type: "website",
  },
};

const AGE_CARDS = [
  { label: '0–1Y', range: 'Baby Girls (0–12M)', href: '/age/0-1-years', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/sweatt.png' },
  { label: '1–2Y', range: 'Toddlers (1–2 Years)', href: '/age/1-2-years', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/freee.png' },
  { label: '2–3Y', range: 'Toddlers (2–3 Years)', href: '/age/2-3-years', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/ind.png' },
  { label: '3–5Y', range: 'Little Girls (3–5 Years)', href: '/age/3-5-years', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/green%20lace.png' },
  { label: '5–7Y', range: 'Young Girls (5–7 Years)', href: '/age/5-7-years', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/red%20lace.png' },
  { label: '7–9Y', range: 'Growing Girls (7–9 Years)', href: '/age/7-9-years', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/ind.png' },
];

const CATEGORY_TILES = [
  { title: 'Dresses & Frocks', subtitle: 'Delicate lace & gentle flares', href: '/girls/dresses', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/green%20lace.png' },
  { title: 'Two-Piece Co-ords', subtitle: 'Effortless matching sets', href: '/girls/two-piece-sets', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/freee.png' },
  { title: 'Everyday Cotton Wear', subtitle: 'Breathable daytime staples', href: '/girls/everyday-wear', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/sweatt.png' },
  { title: 'Festive & Celebrations', subtitle: 'Graceful heirloom moments', href: '/girls/festive-wear', image: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/red%20lace.png' },
];

const COMMUNITY_IMAGES = [
  { url: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/green%20lace.png', alt: 'Dualat Green Lace Dress' },
  { url: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/freee.png', alt: 'Dualat Pink Plaid Set' },
  { url: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/sweatt.png', alt: 'Dualat Cream Ruffle Dress' },
  { url: 'https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/ind.png', alt: 'Dualat Blue Daisy Dress' },
];

export default async function HomePage() {
  // Server-rendered query: Real authentic Dualat products from DB
  const rawProducts = await prisma.product.findMany({
    include: {
      sizes: { orderBy: { size: 'asc' } },
      reviews: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allProducts = rawProducts as any as Product[];
  const newArrivals = allProducts.slice(0, 4);
  const bestSellers = allProducts.length > 4 ? allProducts.slice(2, 6) : allProducts;

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dualat",
    "url": "https://www.dualat.in",
    "logo": "https://www.dualat.in/icon.png",
    "description": "Modest, comfortable and beautiful kidswear for little girls aged 0–9 years.",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    }
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dualat",
    "url": "https://www.dualat.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.dualat.in/shop?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20 py-2 text-[#242220]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Boutique & Editorial)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl bg-[#faf8f5] border border-[#e6e1d7] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[440px] sm:min-h-[500px]">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 space-y-5 text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#b85d68] border border-[#f4dcda] text-[10px] font-bold uppercase tracking-widest shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b85d68]" /> DUALAT
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#242220] leading-[1.15] tracking-tight">
                Made for Her Little Moments
              </h1>
              <p className="text-sm sm:text-base text-[#6b6661] max-w-md leading-relaxed font-medium">
                Modest, comfortable and beautiful outfits thoughtfully chosen for little girls aged 0–9 years.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/girls"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#242220] hover:bg-[#b85d68] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
              >
                Shop New Arrivals <ArrowRight size={14} />
              </Link>
              <Link
                href="#shop-by-age"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#f3efe9] text-[#242220] border border-[#e6e1d7] font-bold text-xs uppercase tracking-wider transition-all duration-300"
              >
                Shop by Age
              </Link>
            </div>
          </div>

          {/* Right Genuine Dualat Imagery */}
          <div className="lg:col-span-6 h-[320px] sm:h-[420px] lg:h-full relative overflow-hidden bg-[#f3efe9]">
            <img
              src="https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/green%20lace.png"
              alt="Dualat Green Lace Boutique Girl Dress"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:hidden" />
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SHOP BY AGE (Visual Cards Linking to Crawlable Pages)
         ───────────────────────────────────────────────────────────── */}
      <section id="shop-by-age" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-[#e6e1d7] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#b85d68]">Tailored Fits</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242220] mt-0.5">Shop by Age</h2>
          </div>
          <Link
            href="/size-guide"
            className="text-xs font-bold uppercase tracking-wider text-[#b85d68] hover:underline"
          >
            Measurement Guide &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {AGE_CARDS.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group flex flex-col bg-white rounded-2xl border border-[#e6e1d7] overflow-hidden hover:border-[#b85d68] hover:shadow-md transition-all text-center"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#faf8f5]">
                <img
                  src={card.image}
                  alt={`Dualat Outfits for ${card.label}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 bg-white">
                <span className="font-serif text-sm font-bold text-[#242220] block group-hover:text-[#b85d68] transition-colors">
                  {card.label}
                </span>
                <span className="text-[10px] text-[#8c8780] font-medium block truncate mt-0.5">
                  {card.range}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. NEW ARRIVALS (Real Products, Server-Rendered HTML)
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-[#e6e1d7] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#b85d68]">Just Tailored</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242220] mt-0.5">New Arrivals</h2>
          </div>
          <Link
            href="/girls"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#b85d68] hover:text-[#9e4652] transition-colors"
          >
            View All Girls Outfits <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SHOP BY CATEGORY (Dresses, Sets, Everyday, Festive)
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="border-b border-[#e6e1d7] pb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#b85d68]">Curated Collections</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242220] mt-0.5">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORY_TILES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative flex flex-col bg-white rounded-2xl border border-[#e6e1d7] overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#faf8f5]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 space-y-1 bg-white">
                <h3 className="font-serif text-base font-bold text-[#242220] group-hover:text-[#b85d68] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#6b6661]">{cat.subtitle}</p>
                <div className="pt-2 text-[10px] font-bold text-[#b85d68] uppercase tracking-wider flex items-center gap-1">
                  Explore <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. BEST SELLERS
         ───────────────────────────────────────────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-[#e6e1d7] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#b85d68]">Cherished Pieces</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242220] mt-0.5">Best Sellers</h2>
            </div>
            <Link
              href="/girls"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#b85d68] hover:text-[#9e4652] transition-colors"
            >
              Shop All <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={`bestseller-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. WHY DUALAT (4 Concise Value Propositions)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#e6e1d7] shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#b85d68]">Our Promise</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242220]">Why Parents Choose Dualat</h2>
          <p className="text-xs sm:text-sm text-[#6b6661] leading-relaxed">
            Thoughtful clothing created for mothers who value comfort, modest elegance, and lasting quality for their little girls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          <div className="space-y-2.5 p-4 rounded-xl bg-[#faf8f5] border border-[#e6e1d7]/60">
            <div className="w-8 h-8 rounded-lg bg-[#fdf8f7] text-[#b85d68] flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-serif text-sm font-bold text-[#242220]">Comfort-First Styles</h3>
            <p className="text-xs text-[#6b6661] leading-relaxed">
              Relaxed silhouettes, soft necklines, and elasticated fits that let little girls crawl, run, and play without restriction.
            </p>
          </div>

          <div className="space-y-2.5 p-4 rounded-xl bg-[#faf8f5] border border-[#e6e1d7]/60">
            <div className="w-8 h-8 rounded-lg bg-[#f8faf8] text-[#719373] flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-serif text-sm font-bold text-[#242220]">Thoughtfully Selected Fabrics</h3>
            <p className="text-xs text-[#6b6661] leading-relaxed">
              Breathable natural cottons, soft poplins, and gentle textured weaves handpicked for warm Indian weather.
            </p>
          </div>

          <div className="space-y-2.5 p-4 rounded-xl bg-[#faf8f5] border border-[#e6e1d7]/60">
            <div className="w-8 h-8 rounded-lg bg-[#faf7f2] text-[#af8558] flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-serif text-sm font-bold text-[#242220]">Easy Everyday Dressing</h3>
            <p className="text-xs text-[#6b6661] leading-relaxed">
              Two-piece co-ord sets and effortless dresses that make busy mornings peaceful and outings delightfully simple.
            </p>
          </div>

          <div className="space-y-2.5 p-4 rounded-xl bg-[#faf8f5] border border-[#e6e1d7]/60">
            <div className="w-8 h-8 rounded-lg bg-[#fdf8f7] text-[#b85d68] flex items-center justify-center font-bold text-xs">
              04
            </div>
            <h3 className="font-serif text-sm font-bold text-[#242220]">Made for Little Moments</h3>
            <p className="text-xs text-[#6b6661] leading-relaxed">
              Timeless checks, soft contrast collars, and heirloom lace trims designed for the memories your family treasures most.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. FOUNDER STORY (Born from Motherhood)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#faf8f5] p-8 sm:p-12 rounded-3xl border border-[#e6e1d7] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#b85d68] border border-[#f4dcda] text-[10px] font-bold uppercase tracking-widest shadow-2xs">
              <Heart size={11} className="fill-[#b85d68]" /> Born from Motherhood
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#242220]">
              Clothing Inspired by a Mother's Search
            </h2>
            <p className="text-xs sm:text-sm text-[#6b6661] leading-relaxed">
              Dualat was born in Kerala from a simple personal need: as a mother dressing my own daughter, I found it surprisingly hard to find clothes that were modest, exceptionally comfortable, and timelessly beautiful.
            </p>
            <p className="text-xs sm:text-sm text-[#6b6661] leading-relaxed">
              Every Dualat dress and two-piece set is curated with that maternal care — gentle on tender skin, easy for active girls, and crafted with quiet, graceful elegance.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b85d68] hover:underline uppercase tracking-wider"
              >
                Read Our Full Story &rarr;
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-[#e6e1d7] shadow-xs bg-[#f3efe9]">
            <img
              src="https://bgguelrnpb8jmu9w.public.blob.vercel-storage.com/ind.png"
              alt="Dualat Blue Daisy Cotton Dress"
              className="w-full h-full object-cover object-center"
            />
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. INSTAGRAM / COMMUNITY UGC
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6 text-center">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#b85d68]">Follow Our Journey</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242220]">Moments in Dualat</h2>
          <p className="text-xs text-[#6b6661]">Tag us at <strong className="text-[#242220]">@dualat.in</strong> to share your daughter&apos;s special little moments.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {COMMUNITY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#e6e1d7] bg-[#faf8f5]"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#242220]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <InstagramIcon size={24} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. NEWSLETTER / WHATSAPP (Join the Dualat Circle)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#e6e1d7] shadow-xs text-center space-y-6 max-w-3xl mx-auto">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#b85d68]">Stay Connected</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242220]">Join the Dualat Circle</h2>
          <p className="text-xs sm:text-sm text-[#6b6661] max-w-md mx-auto leading-relaxed">
            Receive early previews of new seasonal collections, sizing advice, and gentle parenting thoughts.
          </p>
        </div>

        {/* Email Signup Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full rounded-full bg-[#f3efe9] px-5 py-3 text-xs border border-transparent focus:border-[#b85d68] focus:bg-white focus:outline-none text-[#242220]"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#b85d68] hover:bg-[#9e4652] text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Subscribe
          </button>
        </form>

        {/* WhatsApp Personal Help */}
        <div className="pt-4 border-t border-[#f3efe9] flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#6b6661]">
          <span>Prefer personal shopping assistance?</span>
          <a
            href="https://wa.me/918848722023?text=Hello%20Dualat%2C%20I%20would%20like%20shopping%20assistance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-[#719373] hover:underline"
          >
            <MessageCircle size={15} /> Chat with us on WhatsApp (+91 88487 22023)
          </a>
        </div>
      </section>
    </div>
  );
}
