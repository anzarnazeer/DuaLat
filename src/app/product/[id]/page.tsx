import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for child-friendly SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === resolvedParams.id);
  
  if (!product) {
    return {
      title: 'Product Not Found | SproutWear',
    };
  }

  return {
    title: `${product.name} | SproutWear Organic Kids' Wear`,
    description: `${product.description} Safety details: ${product.fabricTags.join(', ')}.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-2">
      <ProductDetailClient product={product} />
    </div>
  );
}
