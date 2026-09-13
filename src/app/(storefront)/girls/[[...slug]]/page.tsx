import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Filter } from 'lucide-react';
import type { Product } from '@/lib/mockData';

interface CollectionPageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CATEGORY_MAP: Record<string, { title: string; subtitle: string; description: string }> = {
  default: {
    title: "Girls' Collection",
    subtitle: "Modest & Beautiful Outfits",
    description: "Explore our complete boutique collection of dresses, two-piece sets, and everyday essentials for baby girls and little girls aged 0–9 years."
  },
  dresses: {
    title: "Girls' Dresses & Frocks",
    subtitle: "Flowy & Graceful Silhouettes",
    description: "Breathable cotton dresses with delicate lace detailing, gentle contrast collars, and tiered flares designed for her happiest moments."
  },
  frocks: {
    title: "Little Girls' Frocks",
    subtitle: "Everyday & Playtime Comfort",
    description: "Relaxed-fit frocks that let active toddlers and young girls run, twirl, and play with absolute ease and natural comfort."
  },
  "two-piece-sets": {
    title: "Two-Piece Sets & Co-ords",
    subtitle: "Thoughtfully Paired Styling",
    description: "Matching tops and elasticated bottoms crafted in breathable cotton blends for effortless morning dressing and cute outing looks."
  },
  "everyday-wear": {
    title: "Everyday Wear for Girls",
    subtitle: "Comfortable Day-to-Day Staples",
    description: "Soft, resilient, and skin-friendly outfits designed to handle active play, gentle naptimes, and daily adventures."
  },
  "party-wear": {
    title: "Occasion & Party Wear",
    subtitle: "Memorable Milestone Celebrations",
    description: "Heirloom lace accents, sweet collars, and refined pastels that photograph beautifully without irritating delicate skin."
  },
  "festive-wear": {
    title: "Festive Outfits for Little Girls",
    subtitle: "Graceful Indian Festive Styles",
    description: "Celebrate Onam, Eid, Diwali, and family festivals in modest, elegant, and heat-friendly festive wear for baby girls."
  }
};

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const subCategory = slug?.[0] || 'default';
  const meta = CATEGORY_MAP[subCategory] || CATEGORY_MAP.default;

  const canonicalUrl = subCategory === 'default' 
    ? 'https://www.dualat.in/girls'
    : `https://www.dualat.in/girls/${subCategory}`;

  return {
    title: `${meta.title} | Dualat Kidswear Online India`,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${meta.title} | Dualat`,
      description: meta.description,
      url: canonicalUrl,
    },
  };
}

export default async function GirlsCollectionPage({ params, searchParams }: CollectionPageProps) {
  const { slug } = await params;
  const subCategory = slug?.[0] || 'default';
  const info = CATEGORY_MAP[subCategory] || CATEGORY_MAP.default;

  // Server-Side Query: fetch real products directly from DB
  const rawProducts = await prisma.product.findMany({
    include: {
      sizes: { orderBy: { size: 'asc' } },
      reviews: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Filter for girls or subcategory if relevant
  let products = rawProducts.filter(p => p.category === 'girls' || p.category === 'unisex');

  if (subCategory === 'two-piece-sets') {
    const setProducts = products.filter(p => 
      p.name.toLowerCase().includes('set') || 
      p.name.toLowerCase().includes('co-ord') ||
      p.description.toLowerCase().includes('set')
    );
    if (setProducts.length > 0) products = setProducts;
  } else if (subCategory === 'dresses' || subCategory === 'frocks') {
    const dressProducts = products.filter(p => 
      p.name.toLowerCase().includes('dress') || 
      p.name.toLowerCase().includes('frock') ||
      p.description.toLowerCase().includes('dress')
    );
    if (dressProducts.length > 0) products = dressProducts;
  }

  // Cast for component compatibility
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayProducts = products as any as Product[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": info.title,
    "description": info.description,
    "url": subCategory === 'default' ? "https://www.dualat.in/girls" : `https://www.dualat.in/girls/${subCategory}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.dualat.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Girls",
          "item": "https://www.dualat.in/girls"
        },
        ...(subCategory !== 'default' ? [{
          "@type": "ListItem",
          "position": 3,
          "name": info.title,
          "item": `https://www.dualat.in/girls/${subCategory}`
        }] : [])
      ]
    }
  };

  return (
    <div className="space-y-8 py-4 sm:py-6 text-[#242220]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <Link href="/girls" className="hover:text-[#242220]">Girls</Link>
        {subCategory !== 'default' && (
          <>
            <span>/</span>
            <span className="text-[#242220] font-bold">{info.title}</span>
          </>
        )}
      </nav>

      {/* Header Banner */}
      <header className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e6e1d7] shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] text-[10px] font-bold uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b85d68]" /> {info.subtitle}
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#242220]">
          {info.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661] max-w-2xl leading-relaxed">
          {info.description}
        </p>
      </header>

      {/* Subcategory Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/girls"
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${
            subCategory === 'default'
              ? 'bg-[#b85d68] text-white border-[#b85d68]'
              : 'bg-white text-[#242220] border-[#e6e1d7] hover:border-[#b85d68]'
          }`}
        >
          All Girls
        </Link>
        <Link
          href="/girls/dresses"
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${
            subCategory === 'dresses'
              ? 'bg-[#b85d68] text-white border-[#b85d68]'
              : 'bg-white text-[#242220] border-[#e6e1d7] hover:border-[#b85d68]'
          }`}
        >
          Dresses
        </Link>
        <Link
          href="/girls/two-piece-sets"
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${
            subCategory === 'two-piece-sets'
              ? 'bg-[#b85d68] text-white border-[#b85d68]'
              : 'bg-white text-[#242220] border-[#e6e1d7] hover:border-[#b85d68]'
          }`}
        >
          Two-Piece Sets
        </Link>
        <Link
          href="/girls/everyday-wear"
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${
            subCategory === 'everyday-wear'
              ? 'bg-[#b85d68] text-white border-[#b85d68]'
              : 'bg-white text-[#242220] border-[#e6e1d7] hover:border-[#b85d68]'
          }`}
        >
          Everyday
        </Link>
        <Link
          href="/girls/festive-wear"
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${
            subCategory === 'festive-wear'
              ? 'bg-[#b85d68] text-white border-[#b85d68]'
              : 'bg-white text-[#242220] border-[#e6e1d7] hover:border-[#b85d68]'
          }`}
        >
          Festive & Occasion
        </Link>
      </div>

      {/* Crawlable Products Grid (Server-Rendered) */}
      <section className="space-y-4">
        <div className="flex justify-between items-center text-xs text-[#8c8780] font-semibold uppercase tracking-wider border-b border-[#e6e1d7] pb-3">
          <span>Showing {displayProducts.length} Outfits</span>
          <Link href="/shop" className="text-[#b85d68] hover:underline font-bold">
            Detailed Filters & Sorting &rarr;
          </Link>
        </div>

        {displayProducts.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-[#e6e1d7] space-y-3">
            <p className="font-serif text-lg text-[#242220] font-bold">New Designs Coming Soon</p>
            <p className="text-xs text-[#6b6661]">We are currently tailoring more pieces for this category.</p>
            <Link
              href="/girls"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b85d68] underline uppercase tracking-wider pt-2"
            >
              Browse All Girls Outfits &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Helpful Sizing Assistance Banner */}
      <div className="p-6 rounded-2xl bg-[#faf8f5] border border-[#e6e1d7] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-serif font-bold text-base text-[#242220]">Unsure about your daughter's fit?</p>
          <p className="text-xs text-[#6b6661]">Check our measurement chart or chat with us directly for mother-to-mother sizing guidance.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/size-guide"
            className="px-4 py-2 rounded-full bg-white hover:bg-[#f3efe9] border border-[#e6e1d7] text-xs font-bold text-[#242220] uppercase tracking-wider transition-colors"
          >
            Size Guide
          </Link>
          <a
            href="https://wa.me/918848722023?text=Hi%20Dualat%2C%20I%20need%20help%20choosing%20a%20dress%20size"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[#719373] hover:bg-[#58765a] text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            WhatsApp Help
          </a>
        </div>
      </div>
    </div>
  );
}
