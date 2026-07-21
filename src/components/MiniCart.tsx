"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { MOCK_PRODUCTS } from '@/lib/mockData';
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

  // Find upsell items not already in the cart
  const cartIds = cart.map(item => item.product.id);
  const upsells = MOCK_PRODUCTS.filter(p => !cartIds.includes(p.id)).slice(0, 2);

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
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream-100 shadow-2xl flex flex-col h-full border-l border-cream-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-cream-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary-500" />
                <h3 className="font-nunito text-lg font-bold text-charcoal">Your Shopping Cart</h3>
                <span className="text-xs bg-primary-100 text-primary-600 px-2.5 py-0.5 rounded-full font-bold">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-cream-100 rounded-xl text-gray-400 hover:text-charcoal transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Tracker */}
            <div className="bg-primary-50 p-4 border-b border-cream-200">
              <p className="text-xs text-gray-600 text-center font-semibold mb-2">
                {isFreeShipping 
                  ? "🎉 You've unlocked Free Shipping!" 
                  : `Spend $${(freeShippingThreshold - cartTotal).toFixed(2)} more for Free Shipping`
                }
              </p>
              <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-secondary-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Scrollable Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="text-5xl mb-4">🧺</span>
                  <h4 className="font-nunito text-base font-bold text-charcoal">Your cart is empty</h4>
                  <p className="text-xs text-gray-400 max-w-xs mt-1">Explore our organic cotton wear and find the perfect outfit for your little bundle of joy.</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      window.location.href = '/shop';
                    }}
                    className="mt-6 inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-2xl shadow-sm transition-all cursor-pointer"
                  >
                    Start Shopping <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const price = item.product.salePrice ?? item.product.basePrice;
                    return (
                      <div 
                        key={`${item.product.id}-${item.selectedSize}`} 
                        className="flex gap-4 p-3 bg-white rounded-2xl border border-cream-200/50 shadow-xs"
                      >
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="h-20 w-20 rounded-xl object-cover border border-cream-200 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-nunito text-sm font-bold text-charcoal truncate">{item.product.name}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">Size: <span className="font-semibold text-charcoal bg-cream-100 px-1.5 py-0.5 rounded">{item.selectedSize}</span></p>
                          <div className="flex justify-between items-center mt-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-1 bg-cream-100 rounded-xl p-1 shrink-0">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                                className="p-1 hover:bg-white rounded-lg text-gray-500 cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-charcoal">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                                className="p-1 hover:bg-white rounded-lg text-gray-500 cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            {/* Price */}
                            <div className="text-right shrink-0">
                              <span className="text-sm font-bold text-charcoal">${(price * item.quantity).toFixed(2)}</span>
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
                <div className="pt-6 border-t border-cream-200">
                  <h4 className="font-nunito text-xs font-bold text-charcoal tracking-wide uppercase mb-3">Frequently Bought Together</h4>
                  <div className="space-y-3">
                    {upsells.map(product => {
                      const price = product.salePrice ?? product.basePrice;
                      // Default first available size with stock
                      const defaultSize = product.sizes.find(s => s.stockCount > 0)?.size || product.sizes[0].size;
                      return (
                        <div 
                          key={product.id} 
                          className="flex items-center justify-between p-3 bg-cream-50 rounded-xl border border-cream-200/50"
                        >
                          <div className="flex items-center gap-3">
                            <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded-lg object-cover shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-charcoal">{product.name}</p>
                              <p className="text-xs text-primary-600 font-semibold">${price.toFixed(2)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(product, defaultSize)}
                            className="bg-white hover:bg-primary-50 text-primary-600 border border-primary-200 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                          >
                            + Add
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
              <div className="p-6 bg-white border-t border-cream-200 space-y-4 shadow-[0_-8px_20px_rgba(45,42,41,0.02)]">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-semibold">Subtotal</span>
                  <span className="font-bold text-charcoal text-base">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-semibold">Estimated Shipping</span>
                  <span className="text-secondary-600 font-bold">
                    {isFreeShipping ? 'FREE' : '$4.99'}
                  </span>
                </div>
                <div className="border-t border-cream-100 pt-3 flex justify-between items-center">
                  <span className="text-charcoal font-bold">Total</span>
                  <span className="text-xl font-black text-primary-600">
                    ${(isFreeShipping ? cartTotal : cartTotal + 4.99).toFixed(2)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all group cursor-pointer"
                >
                  Proceed to Checkout 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-xs font-bold text-gray-400 hover:text-primary-500 transition-colors py-1 cursor-pointer"
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
