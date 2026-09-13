"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Home, Grid, Heart, ShoppingBag, BookOpen } from 'lucide-react';

export default function StickyMobileBar() {
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useCart();

  // Hide sticky mobile bar on checkout page to avoid distractions
  if (pathname === '/checkout') return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-35 bg-white/95 backdrop-blur-md border-t border-[#e6e1d7] py-2 px-5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-lg flex justify-around items-center text-[#6b6661]">
      
      <Link 
        href="/"
        className={`flex flex-col items-center gap-1 transition-colors ${
          pathname === '/' ? 'text-[#b85d68] font-bold' : 'hover:text-[#242220]'
        }`}
      >
        <Home size={18} />
        <span className="text-[9px] uppercase tracking-wider font-semibold">Home</span>
      </Link>

      <Link 
        href="/girls"
        className={`flex flex-col items-center gap-1 transition-colors ${
          pathname.startsWith('/girls') || pathname === '/shop' ? 'text-[#b85d68] font-bold' : 'hover:text-[#242220]'
        }`}
      >
        <Grid size={18} />
        <span className="text-[9px] uppercase tracking-wider font-semibold">Shop</span>
      </Link>

      <Link 
        href="/journal"
        className={`flex flex-col items-center gap-1 transition-colors ${
          pathname.startsWith('/journal') ? 'text-[#b85d68] font-bold' : 'hover:text-[#242220]'
        }`}
      >
        <BookOpen size={18} />
        <span className="text-[9px] uppercase tracking-wider font-semibold">Journal</span>
      </Link>

      <button 
        onClick={() => setCartOpen(true)}
        className="flex flex-col items-center gap-1 relative cursor-pointer hover:text-[#242220]"
        aria-label="View shopping bag"
      >
        <div className="relative">
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#b85d68] text-[8px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[9px] uppercase tracking-wider font-semibold">Bag</span>
      </button>

    </div>
  );
}
