"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Star, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const price = product.salePrice ?? product.basePrice;
  const isSale = !!product.salePrice;
  const discountPercent = isSale 
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100) 
    : 0;

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
      className="group relative flex flex-col bg-white border border-cream-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 h-full rounded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image & Quick Add Panel */}
      <div className="relative aspect-[3/4] w-full bg-[#f5f5f6] overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Button Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute right-2.5 top-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-primary-500 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer z-10"
          title="Wishlist Product"
        >
          <Heart size={14} fill={isWishlisted ? "#ff3f6c" : "none"} className={isWishlisted ? "text-primary-500" : "text-gray-400"} />
        </button>

        {/* Rating overlay badge */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-extrabold text-[#282c3f] border border-cream-300 flex items-center gap-1 shadow-xs">
          <span>{product.rating}</span>
          <Star size={9} fill="#ff3f6c" className="text-primary-500" />
          <span className="text-gray-300">|</span>
          <span className="text-[#696e79]">{product.reviews.length}</span>
        </div>

        {/* Quick Add Size Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-white/95 p-3 border-t border-cream-300 transition-all duration-300 translate-y-full group-hover:translate-y-0 hidden sm:block">
          <p className="text-[9px] text-[#696e79] font-extrabold tracking-widest uppercase text-center mb-2">Select Sizing</p>
          <div className="flex flex-wrap justify-center gap-1">
            {product.sizes.map((sizeStock) => {
              const hasStock = sizeStock.stockCount > 0;
              return (
                <button
                  key={sizeStock.size}
                  disabled={!hasStock}
                  onClick={() => addToCart(product, sizeStock.size)}
                  className={`text-[9px] font-bold px-2.5 py-1.5 rounded border transition-all cursor-pointer ${
                    hasStock
                      ? 'border-cream-300 bg-white text-[#282c3f] hover:bg-primary-500 hover:text-white hover:border-primary-500'
                      : 'border-transparent bg-cream-200 text-gray-300 cursor-not-allowed line-through'
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
        <div className="absolute right-2.5 bottom-2.5 sm:hidden">
          <button
            onClick={() => {
              // Default to first in-stock size
              const defaultSize = product.sizes.find(s => s.stockCount > 0)?.size || product.sizes[0].size;
              addToCart(product, defaultSize);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-md hover:bg-primary-600 transition-colors cursor-pointer"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-3.5">
        
        {/* Brand name */}
        <div className="text-[11px] font-extrabold text-charcoal tracking-widest uppercase mb-0.5">
          SproutWear
        </div>

        {/* Product Title */}
        <h3 className="text-xs text-[#696e79] font-medium truncate mb-1">
          <Link href={`/product/${product.id}`} className="hover:text-charcoal transition-colors">
            {product.name}
          </Link>
        </h3>

        {/* Safety & Fabric Tags */}
        <div className="flex flex-wrap gap-1 mt-1 mb-2">
          {product.fabricTags.slice(0, 1).map((tag) => (
            <span 
              key={tag} 
              className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-cream-200 text-[#696e79] border border-cream-300 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price details */}
        <div className="mt-auto pt-2 border-t border-cream-200 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[13px] font-extrabold text-[#282c3f]">
              ${price.toFixed(2)}
            </span>
            {isSale && (
              <>
                <span className="text-[10px] text-gray-400 line-through">
                  ${product.basePrice.toFixed(2)}
                </span>
                <span className="text-[10px] font-bold text-accent-400">
                  ({discountPercent}% OFF)
                </span>
              </>
            )}
          </div>
          
          <Link 
            href={`/product/${product.id}`}
            className="hidden sm:inline text-[10px] font-extrabold text-primary-500 tracking-wider uppercase hover:text-primary-600"
          >
            Buy
          </Link>
        </div>

      </div>
    </div>
  );
}

