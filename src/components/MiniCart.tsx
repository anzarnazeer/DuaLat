"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/mockData';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MiniCart() {
  const { 
    cart, 
    isCartOpen, 
    setCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    cartCount,
    addToCart
  } = useCart();

  // Fetch upsell items from the API when the cart opens
  const [upsells, setUpsells] = useState<Product[]>([]);
  useEffect(() => {
    if (!isCartOpen) return;
    const cartIds = cart.map((item) => item.product.id);
    fetch('/api/products')
      .then((res) => res.json())
      .then((products: Product[]) => {
        setUpsells(products.filter((p) => !cartIds.includes(p.id)).slice(0, 2));
      })
      .catch(console.error);
  }, [isCartOpen, cart]);

  const freeShippingThreshold = 50;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const shippingProgress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Cart Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-cream-300"
          >
            {/* Header */}
            <div className="p-5 border-b border-cream-300 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-primary-500" />
                <h3 className="font-assistant text-sm font-black uppercase tracking-wider text-charcoal">YOUR BAG</h3>
                <span className="text-[10px] bg-primary-500 text-white px-2 py-0.5 rounded font-black">
                  {cartCount} ITEMS
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-cream-200 rounded text-gray-400 hover:text-charcoal transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Shipping Tracker */}
            <div className="bg-primary-50 p-4 border-b border-cream-300">
              <p className="text-[10px] text-gray-600 text-center font-bold uppercase tracking-wider mb-2">
                {isFreeShipping 
                  ? "🎉 You've unlocked Free Shipping!" 
                  : `Spend ₹${(freeShippingThreshold - cartTotal).toFixed(2)} more for Free Shipping`
                }
              </p>
              <div className="w-full bg-cream-300 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-secondary-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Scrollable Contents */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="text-4xl mb-4">🧺</span>
                  <h4 className="font-assistant text-sm font-extrabold text-[#282c3f] uppercase tracking-wider">Your bag is empty</h4>
                  <p className="text-[11px] text-[#696e79] max-w-xs mt-1 leading-relaxed">Add some of our premium certified organic cotton wear to get started.</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      window.location.href = '/shop';
                    }}
                    className="mt-6 bg-[#282c3f] hover:bg-primary-500 text-white text-xs font-extrabold px-6 py-3 rounded tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
                  >
                    Start Shopping <ArrowRight size={14} className="inline ml-1" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {cart.map((item) => {
                    const price = item.product.salePrice ?? item.product.basePrice;
                    return (
                      <div 
                        key={`${item.product.id}-${item.selectedSize}`} 
                        className="flex gap-4 p-3 bg-white border border-cream-300 rounded"
                      >
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="h-20 w-16 rounded object-cover border border-cream-300 shrink-0" 
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-assistant text-xs font-extrabold text-[#282c3f] uppercase tracking-wide truncate">{item.product.name}</h4>
                            <p className="text-[10px] text-gray-400 mt-1">Size: <span className="font-bold text-[#282c3f] bg-cream-200 px-1.5 py-0.5 rounded">{item.selectedSize}</span></p>
                          </div>
                          
                          <div className="flex justify-between items-center mt-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-1 bg-cream-200 rounded p-0.5 shrink-0">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                                className="p-1 hover:bg-white rounded text-gray-500 cursor-pointer"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="w-5 text-center text-[10px] font-black text-charcoal">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                                className="p-1 hover:bg-white rounded text-gray-500 cursor-pointer"
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                            {/* Price */}
                            <div className="text-right shrink-0">
                              <span className="text-xs font-black text-[#282c3f]">₹{(price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Upsell Recommendations */}
              {upsells.length > 0 && cart.length > 0 && (
                <div className="pt-6 border-t border-cream-300">
                  <h4 className="font-assistant text-[10px] font-extrabold text-[#282c3f] tracking-widest uppercase mb-3.5">Frequently Bought Together</h4>
                  <div className="space-y-3">
                    {upsells.map(product => {
                      const price = product.salePrice ?? product.basePrice;
                      const defaultSize = product.sizes.find(s => s.stockCount > 0)?.size || product.sizes[0].size;
                      return (
                        <div 
                          key={product.id} 
                          className="flex items-center justify-between p-3 bg-cream-200 border border-cream-300 rounded"
                        >
                          <div className="flex items-center gap-3">
                            <img src={product.images[0]} alt={product.name} className="h-12 w-9 rounded object-cover shrink-0" />
                            <div>
                              <p className="text-[11px] font-bold text-charcoal truncate max-w-44">{product.name}</p>
                              <p className="text-[10px] text-primary-500 font-extrabold">₹{price.toFixed(2)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(product, defaultSize)}
                            className="bg-white hover:bg-primary-500 hover:text-white text-primary-500 border border-primary-500 text-[10px] font-extrabold px-3 py-1.5 rounded transition-colors cursor-pointer"
                          >
                            + ADD
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary & Checkout Action */}
            {cart.length > 0 && (
              <div className="p-5 bg-white border-t border-cream-300 space-y-4 shadow-[0_-6px_16px_rgba(0,0,0,0.03)]">
                <div className="space-y-2 text-xs font-semibold text-gray-500">
                  <div className="flex justify-between items-center">
                    <span>Bag Total</span>
                    <span className="font-bold text-charcoal">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping Fee</span>
                    <span className="text-secondary-600 font-bold">
                      {isFreeShipping ? 'FREE' : '₹4.99'}
                    </span>
                  </div>
                  <div className="border-t border-cream-300 pt-3 flex justify-between items-center">
                    <span className="text-charcoal font-black text-xs uppercase tracking-wider">Order Total</span>
                    <span className="text-lg font-black text-primary-500">
                      ₹{(isFreeShipping ? cartTotal : cartTotal + 4.99).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#ff3f6c] hover:bg-[#e0224f] text-white font-extrabold text-xs py-3.5 px-6 rounded shadow uppercase tracking-widest transition-all group cursor-pointer text-center"
                >
                  Place Order 
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-[10px] font-extrabold text-gray-400 hover:text-primary-500 uppercase tracking-widest transition-colors py-1 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

