"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const price = product.salePrice ?? product.basePrice;
  const isSale = !!product.salePrice;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-3xl border border-cream-200/50 hover:border-primary-200 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image & Quick Add Panel */}
      <div className="relative aspect-square w-full bg-cream-100 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Sale badge */}
        {isSale && (
          <span className="absolute left-3 top-3 bg-accent-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm tracking-wider">
            Sale
          </span>
        )}

        {/* Quick Add Size Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-xs p-3 border-t border-cream-100 transition-all duration-300 translate-y-full group-hover:translate-y-0 hidden sm:block">
          <p className="text-[10px] text-gray-400 font-bold tracking-wide uppercase text-center mb-1.5">Quick Add Size</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {product.sizes.map((sizeStock) => {
              const hasStock = sizeStock.stockCount > 0;
              return (
                <button
                  key={sizeStock.size}
                  disabled={!hasStock}
                  onClick={() => addToCart(product, sizeStock.size)}
                  className={`text-[10px] font-bold px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    hasStock
                      ? 'border-cream-200 bg-white text-charcoal hover:bg-primary-100 hover:border-primary-300 hover:scale-105'
                      : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                  }`}
                  title={hasStock ? `Add size ${sizeStock.size}` : `${sizeStock.size} Out of stock`}
                >
                  {sizeStock.size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="absolute right-3 bottom-3 sm:hidden">
          <Link
            href={`/product/${product.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-md hover:bg-primary-600 transition-colors"
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        
        {/* Rating and Category */}
        <div className="flex items-center justify-between text-xs text-gray-400 font-semibold mb-1">
          <span className="capitalize">{product.category}</span>
          <span className="flex items-center gap-0.5 text-primary-500">
            <Star size={12} fill="currentColor" /> {product.rating}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-nunito text-base font-bold text-charcoal line-clamp-1 group-hover:text-primary-600 transition-colors">
          <Link href={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        {/* Safety & Fabric Tags (Show first two) */}
        <div className="flex flex-wrap gap-1 mt-2 mb-3">
          {product.fabricTags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className={`text-[9px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                tag.includes('Organic') 
                  ? 'bg-secondary-50 text-secondary-600 border-secondary-100' 
                  : tag.includes('Tagless') || tag.includes('Itch-Free')
                  ? 'bg-accent-50 text-accent-600 border-accent-100'
                  : 'bg-primary-50 text-primary-600 border-primary-100'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price & View Details */}
        <div className="mt-auto pt-3 border-t border-cream-200/50 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-charcoal">
              ${price.toFixed(2)}
            </span>
            {isSale && (
              <span className="text-xs text-gray-400 line-through">
                ${product.basePrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <span className="hidden sm:inline text-xs font-bold text-primary-500 group-hover:underline">
            View Details
          </span>
        </div>

      </div>
    </div>
  );
}
