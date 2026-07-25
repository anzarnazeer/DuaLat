/**
 * src/app/product/[id]/page.tsx
 *
 * CONCEPT: This is a React Server Component (RSC).
 * It has NO "use client" directive, which means it runs ONLY on the server.
 * This lets us query the database directly — no fetch() needed, no API roundtrip.
 *
 * WHY THIS IS POWERFUL:
 * - The DB query happens on the server before any HTML is sent to the browser
 * - The user gets a fully-rendered page (great for SEO and performance)
 * - Database credentials are never exposed to the browser
 */

import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

// CONCEPT: generateMetadata is also a Server-only function.
// It lets Next.js set <title> and <meta> tags dynamically per product.
// This is critical for SEO — search engines see the real product name.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  // Direct DB query — runs on the server, never exposed to the client
  const product = await prisma.product.findUnique({
    where: { id },
    select: { name: true, description: true, fabricTags: true }, // Only fetch what we need
  });

  if (!product) {
    return { title: 'Product Not Found | SproutWear' };
  }

  return {
    title: `${product.name} | SproutWear Organic Kids' Wear`,
    description: `${product.description} Safety details: ${product.fabricTags.join(', ')}.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  // CONCEPT: prisma.product.findUnique() generates SQL like:
  // SELECT * FROM products WHERE id = ? LIMIT 1
  // The `include` adds JOINs for related tables.
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      sizes: { orderBy: { size: 'asc' } },
      reviews: { orderBy: { createdAt: 'desc' } },
    },
  });

  // If no product found, Next.js shows the closest not-found.tsx page
  if (!product) {
    notFound();
  }

  // CONCEPT: We pass the DB result to a Client Component for interactivity.
  // Server Components handle data fetching; Client Components handle user interactions
  // (like selecting sizes, adding to cart, submitting reviews).
  //
  // We cast to `any` here to bridge between the Prisma type and the mockData type.
  // In a future refactor, we'd unify these types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <div className="py-2">
      <ProductDetailClient product={product as any} />
    </div>
  );
}
