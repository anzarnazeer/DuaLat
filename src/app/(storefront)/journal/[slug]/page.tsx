import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { JOURNAL_ARTICLES } from '@/lib/journalData';
import { Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found | Dualat' };

  return {
    title: `${article.title} | Dualat Journal`,
    description: article.excerpt,
    alternates: {
      canonical: `https://www.dualat.in/journal/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
      type: 'article',
    },
  };
}

export default async function JournalArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.coverImage,
    "datePublished": "2026-01-15T09:00:00+05:30",
    "author": {
      "@type": "Person",
      "name": "Asna - Founder, Dualat"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dualat",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.dualat.in/icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.dualat.in/journal/${article.slug}`
    }
  };

  return (
    <article className="max-w-3xl mx-auto py-8 sm:py-12 space-y-8 text-[#242220]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <Link href="/journal" className="hover:text-[#242220]">Journal</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold truncate max-w-[200px]">{article.title}</span>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#8c8780]">
          <span className="text-[#b85d68] bg-[#fdf8f7] px-2.5 py-0.5 rounded-full border border-[#f4dcda]">{article.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
          <span>•</span>
          <span>{article.publishDate}</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#242220] leading-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-[#6b6661] italic leading-relaxed border-l-2 border-[#b85d68] pl-4">
          {article.excerpt}
        </p>
      </header>

      {/* Featured Cover Image */}
      <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-[#e6e1d7] bg-[#faf8f5]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Article Body */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e6e1d7] shadow-xs space-y-5 text-sm sm:text-base leading-relaxed text-[#4a4642]">
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}

        {/* Natural Collection Internal Link Card */}
        <div className="mt-8 p-6 rounded-xl bg-[#faf8f5] border border-[#e6e1d7] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#b85d68]">Recommended Dualat Outfits</p>
            <p className="text-sm font-bold text-[#242220]">Shop styles crafted for comfort & graceful movement</p>
          </div>
          <Link
            href={article.relatedCollection.href}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#b85d68] hover:bg-[#9e4652] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs shrink-0"
          >
            {article.relatedCollection.label} <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Author & Footer Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#e6e1d7]">
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#242220] hover:text-[#b85d68] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} /> Back to all articles
        </Link>
        <Link
          href="/girls"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b85d68] hover:underline uppercase tracking-wider"
        >
          Explore All Girls' Outfits &rarr;
        </Link>
      </div>
    </article>
  );
}
