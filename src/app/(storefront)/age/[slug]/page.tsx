import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/mockData';

interface AgePageProps {
  params: Promise<{ slug: string }>;
}

const AGE_CONFIG: Record<string, { label: string; ageRange: string; dbSizes: string[]; description: string }> = {
  "0-1-years": {
    label: "0–1 Years",
    ageRange: "Baby Girls (0–12 Months)",
    dbSizes: ["Newborn", "0-3M", "3-6M", "6-12M"],
    description: "Ultra-soft cotton rompers, gentle baby frocks, and delicate contrast collar outfits specially tailored for your baby girl's first year."
  },
  "1-2-years": {
    label: "1–2 Years",
    ageRange: "Toddler Girls (12–24 Months)",
    dbSizes: ["1Y", "2Y"],
    description: "Comfortable toddler frocks and co-ord sets with flexible waistbands for curious little explorers taking their first steps."
  },
  "2-3-years": {
    label: "2–3 Years",
    ageRange: "Toddler Girls (2–3 Years)",
    dbSizes: ["2Y", "3Y"],
    description: "Charming tiered dresses and two-piece sets designed with breathable cotton blends for active playtime and day outings."
  },
  "3-5-years": {
    label: "3–5 Years",
    ageRange: "Preschool Girls (3–5 Years)",
    dbSizes: ["3Y", "4Y", "5Y"],
    description: "Graceful cotton dresses featuring delicate lace detailing, gentle flutter sleeves, and modest flares for her daily adventures."
  },
  "5-7-years": {
    label: "5–7 Years",
    ageRange: "Young Girls (5–7 Years)",
    dbSizes: ["4Y", "5Y"],
    description: "Timeless modest silhouettes in breathable fabrics that keep young girls feeling elegant, confident, and comfortable."
  },
  "7-9-years": {
    label: "7–9 Years",
    ageRange: "Young Girls (7–9 Years)",
    dbSizes: ["5Y"],
    description: "Refined modest dresses and co-ords for growing girls, featuring gentle drape, classic checks, and breathable comfort."
  },
};

export async function generateStaticParams() {
  return Object.keys(AGE_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AgePageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = AGE_CONFIG[slug];
  if (!config) return { title: 'Age Collection | Dualat' };

  return {
    title: `${config.ageRange} Outfits | Dualat Kidswear India`,
    description: config.description,
    alternates: {
      canonical: `https://www.dualat.in/age/${slug}`,
    },
    openGraph: {
      title: `${config.label} Dresses & Kidswear | Dualat`,
      description: config.description,
      url: `https://www.dualat.in/age/${slug}`,
    },
  };
}

export default async function AgeCollectionPage({ params }: AgePageProps) {
  const { slug } = await params;
  const config = AGE_CONFIG[slug];

  if (!config) {
    notFound();
  }

  // Fetch real products from DB that have matching sizes in stock or available
  const allProducts = await prisma.product.findMany({
    include: {
      sizes: { orderBy: { size: 'asc' } },
      reviews: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Filter products having at least one size in config.dbSizes
  const matchingProducts = allProducts.filter((product) =>
    product.sizes.some((s) => config.dbSizes.includes(s.size))
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayProducts = matchingProducts as any as Product[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${config.label} Girls Clothing`,
    "description": config.description,
    "url": `https://www.dualat.in/age/${slug}`,
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
          "name": "Shop by Age",
          "item": "https://www.dualat.in/shop"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": config.label,
          "item": `https://www.dualat.in/age/${slug}`
        }
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
        <Link href="/shop" className="hover:text-[#242220]">Shop by Age</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">{config.label}</span>
      </nav>

      {/* Header Banner */}
      <header className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e6e1d7] shadow-xs space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] text-[10px] font-bold uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b85d68]" /> Sized for {config.label}
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#242220]">
          {config.ageRange} Outfits
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661] max-w-2xl leading-relaxed">
          {config.description}
        </p>
      </header>

      {/* Age Navigation Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {Object.entries(AGE_CONFIG).map(([key, item]) => (
          <Link
            key={key}
            href={`/age/${key}`}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border ${
              slug === key
                ? 'bg-[#b85d68] text-white border-[#b85d68]'
                : 'bg-white text-[#242220] border-[#e6e1d7] hover:border-[#b85d68]'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Crawlable Products Grid (Server-Rendered) */}
      <section className="space-y-4">
        <div className="flex justify-between items-center text-xs text-[#8c8780] font-semibold uppercase tracking-wider border-b border-[#e6e1d7] pb-3">
          <span>{displayProducts.length} Outfits Available in this Age Bracket</span>
          <Link href="/size-guide" className="text-[#b85d68] hover:underline font-bold">
            View Complete Size Chart &rarr;
          </Link>
        </div>

        {displayProducts.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-[#e6e1d7] space-y-3">
            <p className="font-serif text-lg text-[#242220] font-bold">Outfits Restocking Soon</p>
            <p className="text-xs text-[#6b6661]">We are currently handcrafting more outfits for this age group.</p>
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
    </div>
  );
}
