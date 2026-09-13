import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { JOURNAL_ARTICLES } from '@/lib/journalData';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Parenting & Kidswear Journal | Dualat',
  description: 'Helpful styling advice, fabric care guides, and sizing tips for parents dressing baby girls and little girls in India.',
  alternates: {
    canonical: 'https://www.dualat.in/journal',
  },
};

export default function JournalPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 space-y-10 text-[#242220]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">Journal</span>
      </nav>

      {/* Header */}
      <header className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] text-[10px] font-bold uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b85d68]" /> Thoughts & Guidance
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#242220]">
          The Dualat Parenting Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661] leading-relaxed">
          Helpful guidance on choosing sizes, caring for natural cotton fabrics, and dressing your daughter with modest elegance and comfort.
        </p>
      </header>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {JOURNAL_ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="group flex flex-col bg-white rounded-2xl border border-[#e6e1d7] overflow-hidden shadow-xs hover:shadow-md transition-shadow"
          >
            <Link href={`/journal/${article.slug}`} className="block aspect-[16/10] overflow-hidden bg-[#faf8f5]">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8c8780]">
                  <span className="text-[#b85d68]">{article.category}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
                </div>
                <h2 className="font-serif text-base font-bold text-[#242220] group-hover:text-[#b85d68] transition-colors leading-snug">
                  <Link href={`/journal/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                <p className="text-xs text-[#6b6661] line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f3efe9]">
                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#242220] group-hover:text-[#b85d68] uppercase tracking-wider transition-colors"
                >
                  Read Article <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
