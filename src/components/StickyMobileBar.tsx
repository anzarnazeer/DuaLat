"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Home, ShoppingBag, Grid, CreditCard } from 'lucide-react';

export default function StickyMobileBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-35 bg-white/80 backdrop-blur-md border-t border-cream-200 py-2 pb-safe-bottom shadow-lg px-6 flex justify-between items-center text-gray-500">
      
      <button 
        onClick={() => router.push('/')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          pathname === '/' ? 'text-primary-500 font-bold' : 'hover:text-primary-400'
        }`}
      >
        <Home size={20} />
        <span className="text-[10px]">Home</span>
      </button>

      <button 
        onClick={() => router.push('/shop')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          pathname === '/shop' ? 'text-primary-500 font-bold' : 'hover:text-primary-400'
        }`}
      >
        <Grid size={20} />
        <span className="text-[10px]">Shop</span>
      </button>

      <button 
        onClick={() => setCartOpen(true)}
        className="flex flex-col items-center gap-1 relative cursor-pointer hover:text-primary-400"
      >
        <ShoppingBag size={20} />
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[8px] font-bold text-white">
            {cartCount}
          </span>
        )}
        <span className="text-[10px]">Cart</span>
      </button>

      <button 
        onClick={() => router.push('/checkout')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
          pathname === '/checkout' ? 'text-primary-500 font-bold' : 'hover:text-primary-400'
        }`}
      >
        <CreditCard size={20} />
        <span className="text-[10px]">Checkout</span>
      </button>

    </div>
  );
}
