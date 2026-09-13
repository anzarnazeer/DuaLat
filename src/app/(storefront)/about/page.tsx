import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Heart, Shield, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story | Dualat - Modest & Beautiful Kidswear for Little Girls',
  description: 'Born from motherhood in Kerala, Dualat creates comfortable, modest and beautiful clothing thoughtfully chosen for little girls aged 0–9 years.',
  alternates: {
    canonical: 'https://www.dualat.in/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">Our Story</span>
      </nav>

      {/* Header Banner */}
      <header className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] text-[10px] font-bold uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b85d68]" /> Born from Motherhood
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#242220] leading-tight">
          Made for Her Little Moments
        </h1>
        <p className="text-sm sm:text-base text-[#6b6661] leading-relaxed">
          Modest, comfortable and beautiful clothing designed with love for little girls aged 0–9 years.
        </p>
      </header>

      {/* Narrative Section */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e6e1d7] shadow-xs space-y-8 text-[#242220] text-sm sm:text-base leading-relaxed">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#242220]">The Inspiration Behind Dualat</h2>
          <p className="text-[#6b6661]">
            Dualat began not in a corporate boardroom, but in the everyday reality of motherhood. As a mother searching for outfits for my own daughter, I constantly encountered clothing that felt either scratchy, overly restrictive, or lacking that timeless, modest grace that allows a child to move, explore, and simply be herself.
          </p>
          <p className="text-[#6b6661]">
            I wanted clothes that felt like a gentle hug: breathable cotton fabrics, comfortable relaxed silhouettes, subtle collars, delicate florals, and timeless checks that could go effortlessly from a playful afternoon at home to a family gathering or festive celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#f3efe9]">
          <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e6e1d7]/60 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b85d68]">01. Modest Elegance</span>
            <p className="text-xs text-[#6b6661] leading-relaxed">Thoughtful silhouettes, gentle neckline coverage, and flowy tiers that feel graceful and sweet.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e6e1d7]/60 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#719373]">02. Everyday Comfort</span>
            <p className="text-xs text-[#6b6661] leading-relaxed">Breathable cotton weaves, soft elasticated waists, and easy-moving cuts that keep active girls happy all day.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e6e1d7]/60 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#af8558]">03. Handpicked Quality</span>
            <p className="text-xs text-[#6b6661] leading-relaxed">Every piece is hand-inspected before dispatch. No synthetic shortcuts that irritate sensitive skin.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#f3efe9]">
          <h2 className="font-serif text-2xl font-bold text-[#242220]">From Kerala to Homes Across India</h2>
          <p className="text-[#6b6661]">
            While rooted proudly in Kerala, Dualat delivers to loving parents, grandparents, and aunts across India. Whether you are dressing your little girl for her first birthday in Bengaluru, a sunny festive morning in Kochi, or everyday adventures in Mumbai, we package each order with the same personal care we would give our own children.
          </p>
          <p className="text-[#6b6661]">
            Thank you for welcoming Dualat into your daughter's wardrobe and your family's most cherished little moments.
          </p>
        </div>

        <div className="pt-6 border-t border-[#f3efe9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif font-bold text-lg text-[#242220]">With love,</p>
            <p className="text-xs text-[#b85d68] font-bold uppercase tracking-widest mt-0.5">Asna & the Dualat Family</p>
          </div>
          <Link
            href="/girls"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#b85d68] hover:bg-[#9e4652] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            Explore the Collection <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
