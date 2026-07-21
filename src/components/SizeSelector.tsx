"use client";

import React from 'react';
import { SizeStock } from '@/lib/mockData';

interface SizeSelectorProps {
  sizes: SizeStock[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) {
  // Find currently selected size stock information
  const selectedStockInfo = sizes.find(s => s.size === selectedSize);
  const isLowStock = selectedStockInfo && selectedStockInfo.stockCount > 0 && selectedStockInfo.stockCount <= 3;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-charcoal">Select Age / Size:</span>
        {selectedStockInfo && (
          <span className="text-gray-400 font-semibold">
            Fits: {selectedStockInfo.weightRange} | {selectedStockInfo.heightRange}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
        {sizes.map((item) => {
          const hasStock = item.stockCount > 0;
          const isSelected = item.size === selectedSize;
          
          return (
            <button
              key={item.size}
              type="button"
              disabled={!hasStock}
              onClick={() => onSelectSize(item.size)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary-500 text-white border-primary-500 shadow-sm scale-[1.02]'
                  : hasStock
                  ? 'bg-white text-charcoal border-cream-200 hover:bg-cream-100 hover:border-primary-300'
                  : 'bg-gray-50 text-gray-300 border-gray-100 line-through cursor-not-allowed'
              }`}
            >
              <span>{item.size}</span>
              {hasStock && (
                <span className={`text-[8px] mt-0.5 font-medium ${
                  isSelected ? 'text-primary-100' : 'text-gray-400'
                }`}>
                  {item.stockCount <= 3 ? `${item.stockCount} left` : 'In stock'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Low Stock Warning */}
      {isLowStock && (
        <div className="text-[11px] font-bold text-accent-600 bg-accent-50/70 border border-accent-100 rounded-xl px-3 py-2 animate-pulse-slow">
          🔥 Hurry! Only {selectedStockInfo.stockCount} left in size {selectedSize}.
        </div>
      )}
    </div>
  );
}
