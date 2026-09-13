import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    select: { name: true, description: true, images: true, fabricTags: true, basePrice: true, salePrice: true },
  });

  if (!product) {
    return { title: 'Product Not Found | Dualat' };
  }

  const cleanDescription = product.description.length > 155 
    ? product.description.slice(0, 152) + '...'
    : product.description;

  return {
    title: `${product.name} | Dualat Kidswear Online India`,
    description: `Shop the ${product.name} from Dualat. ${cleanDescription} Available in multiple sizes with delivery across India.`,
    alternates: {
      canonical: `https://www.dualat.in/product/${id}`,
    },
    openGraph: {
      title: `${product.name} | Dualat`,
      description: cleanDescription,
      url: `https://www.dualat.in/product/${id}`,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      sizes: { orderBy: { size: 'asc' } },
      reviews: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!product) {
    notFound();
  }

  // Fetch real related outfits from database
  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: id },
    },
    take: 4,
    include: {
      sizes: { orderBy: { size: 'asc' } },
      reviews: true,
    },
  });

  const currentPrice = product.salePrice || product.basePrice;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Dualat"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.dualat.in/product/${product.id}`,
      "priceCurrency": "INR",
      "price": currentPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.sizes.some(s => s.stockCount > 0) 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Dualat"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 7,
            "unitCode": "d"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "IN",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
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
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://www.dualat.in/product/${product.id}`
      }
    ]
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <div className="py-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient
        product={product as any}
        relatedProducts={relatedProducts as any}
      />
    </div>
  );
}
