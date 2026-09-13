"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const price = product.salePrice ?? product.basePrice;
  const isSale = !!product.salePrice && product.salePrice < product.basePrice;
  const discountPercent = isSale 
    ? Math.round(((product.basePrice - product.salePrice!) / product.basePrice) * 100) 
    : 0;

  const handleMouseEnter = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const displayImage = product.images?.[currentImageIndex] || product.images?.[0] || '/placeholder.png';

  const inStockSizes = (product.sizes || []).filter(s => s.stockCount > 0);

  return (
    <div 
      className="group relative flex flex-col bg-white border border-[#e6e1d7] hover:border-[#b85d68] hover:shadow-md transition-all duration-300 h-full rounded-2xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Product Image & Quick Add Panel */}
      <div className="relative aspect-[3/4] w-full bg-[#faf8f5] overflow-hidden">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={displayImage}
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
          className="absolute right-2.5 top-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-[#8c8780] hover:text-[#b85d68] transition-colors shadow-xs cursor-pointer z-10"
          title="Wishlist Product"
          aria-label={`Wishlist ${product.name}`}
        >
          <Heart size={14} fill={isWishlisted ? "#b85d68" : "none"} className={isWishlisted ? "text-[#b85d68]" : "text-[#8c8780]"} />
        </button>

        {/* Sale Pill if genuine discount */}
        {isSale && (
          <div className="absolute left-2.5 top-2.5 bg-[#b85d68] text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-xs">
            Save {discountPercent}%
          </div>
        )}

        {/* Quick Add Size Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-xs p-3 border-t border-[#e6e1d7] transition-all duration-300 translate-y-full group-hover:translate-y-0 hidden sm:block">
          <p className="text-[9px] text-[#6b6661] font-bold tracking-widest uppercase text-center mb-1.5">Quick Add Size</p>
          <div className="flex flex-wrap justify-center gap-1">
            {(product.sizes || []).map((sizeStock) => {
              const hasStock = sizeStock.stockCount > 0;
              return (
                <button
                  key={sizeStock.size}
                  disabled={!hasStock}
                  onClick={() => addToCart(product, sizeStock.size)}
                  className={`text-[9px] font-bold px-2 py-1 rounded-md border transition-all cursor-pointer ${
                    hasStock
                      ? 'border-[#e6e1d7] bg-white text-[#242220] hover:bg-[#b85d68] hover:text-white hover:border-[#b85d68]'
                      : 'border-transparent bg-[#f3efe9] text-[#8c8780] cursor-not-allowed line-through'
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
              const defaultSize = inStockSizes[0]?.size || product.sizes?.[0]?.size || '1Y';
              addToCart(product, defaultSize);
            }}
            aria-label={`Quick add ${product.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#242220] text-white shadow-md active:bg-[#b85d68] transition-colors cursor-pointer"
          >
            <ShoppingBag size={13} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4 justify-between space-y-2">
        <div>
          {/* Subtitle / Category */}
          <div className="text-[9px] font-bold text-[#b85d68] tracking-widest uppercase mb-1">
            {product.category}
          </div>

          {/* Product Title (Normal Link) */}
          <h3 className="font-serif text-xs sm:text-sm font-bold text-[#242220] leading-snug line-clamp-2">
            <Link href={`/product/${product.id}`} className="hover:text-[#b85d68] transition-colors">
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Available Sizes List */}
        <div className="flex flex-wrap items-center gap-1 text-[9px] text-[#8c8780] font-semibold">
          <span>Sizes:</span>
          {inStockSizes.slice(0, 4).map((s) => (
            <span key={s.size} className="bg-[#f3efe9] text-[#242220] px-1.5 py-0.5 rounded text-[8px] font-bold">
              {s.size}
            </span>
          ))}
          {inStockSizes.length > 4 && (
            <span className="text-[8px] text-[#8c8780]">+{inStockSizes.length - 4}</span>
          )}
        </div>

        {/* Pricing */}
        <div className="pt-1 flex items-baseline gap-2 border-t border-[#f3efe9]">
          <span className="font-serif text-sm sm:text-base font-extrabold text-[#242220]">
            ₹{price}
          </span>
          {isSale && (
            <span className="text-xs text-[#8c8780] line-through font-medium">
              ₹{product.basePrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
