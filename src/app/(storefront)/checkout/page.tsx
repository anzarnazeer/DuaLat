"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { UserAddress } from '@/lib/mockData';
import { Check, CreditCard, Truck, User, ArrowLeft, ArrowRight, ShieldCheck, ShoppingCart, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();

  // Stepper state: 1 = Shipping, 2 = Delivery, 3 = Payment
  const [step, setStep] = useState(1);
  
  // Shipping Speed option
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Address State
  const [address, setAddress] = useState<UserAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });


  // Calculate pricing
  const freeShippingThreshold = 50;
  const subtotal = cartTotal;
  const isFreeShippingEligible = subtotal >= freeShippingThreshold;
  
  const shippingCost = isFreeShippingEligible 
    ? (shippingMethod === 'express' ? 5.00 : 0) 
    : (shippingMethod === 'express' ? 9.99 : 4.99);

  const estimatedTax = subtotal * 0.08; // 8% tax
  const totalCost = subtotal + shippingCost + estimatedTax;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };


  // Basic step navigation
  const nextStep = () => {
    if (step === 1) {
      if (!address.fullName || !address.email || !address.addressLine1 || !address.city || !address.zipCode) {
        alert("Please fill out all required shipping fields.");
        return;
      }
      if (!address.email.includes('@')) {
        alert("Please enter a valid email address.");
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // CONCEPT: fetch() sends an HTTP POST request to our /api/checkout Route Handler.
      // We send the cart items and shipping address as JSON in the request body.
      // The server validates stock, computes the real price, and creates the order in Neon DB.
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Shipping address fields
          fullName: address.fullName,
          email: address.email,
          phone: address.phone,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country,
          // Cart items — map from CartItem to what the API expects
          items: cart.map((item) => ({
            productId: item.product.id,
            selectedSize: item.selectedSize,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Server returned an error (e.g. out of stock = 409, validation error = 400)
        alert(data.error || 'Order failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Order was successful!
      setIsSubmitting(false);
      setIsOrdered(true);
      setOrderNumber(data.orderId); // Real order ID from the database
      
      const message = `Hello DuaLat!\n\nI have placed an order.\n*Order ID:* ${data.orderId}\n*Name:* ${address.fullName}\n*Total Amount:* ₹${totalCost.toFixed(2)}\n\nI can track my order here: ${window.location.origin}/track?id=${data.orderId}\n\nPlease let me know the payment details.`;
      window.location.href = `https://wa.me/918848422023?text=${encodeURIComponent(message)}`;
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Network error. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };


  const handleCompleteFlow = () => {
    clearCart();
    router.push('/');
  };

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <span className="text-6xl">🛒</span>
        <h2 className="font-nunito text-xl font-bold text-charcoal">Your Checkout is empty</h2>
        <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
          It looks like you don't have any items in your cart. Add some beautiful kids' wear before checking out.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Checkout Progress Stepper */}
      {!isOrdered && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl border border-cream-200 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                step > 1 
                  ? 'bg-secondary-500 text-white' 
                  : step === 1 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-cream-200 text-gray-400'
              }`}>
                {step > 1 ? <Check size={14} /> : '1'}
              </span>
              <span className={`text-xs font-bold hidden sm:inline ${step === 1 ? 'text-charcoal' : 'text-gray-400'}`}>Shipping</span>
            </div>
            
            <div className="flex-1 border-t-2 border-dashed border-cream-200 mx-4" />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                step > 2 
                  ? 'bg-secondary-500 text-white' 
                  : step === 2 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-cream-200 text-gray-400'
              }`}>
                {step > 2 ? <Check size={14} /> : '2'}
              </span>
              <span className={`text-xs font-bold hidden sm:inline ${step === 2 ? 'text-charcoal' : 'text-gray-400'}`}>Delivery</span>
            </div>

            <div className="flex-1 border-t-2 border-dashed border-cream-200 mx-4" />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                step === 3 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-cream-200 text-gray-400'
              }`}>
                3
              </span>
              <span className={`text-xs font-bold hidden sm:inline ${step === 3 ? 'text-charcoal' : 'text-gray-400'}`}>Payment</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Order Placed Celebration */}
      {isOrdered ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-cream-200 shadow-xl text-center space-y-6"
        >
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-500 border border-green-200">
            <MessageCircle size={40} className="animate-bounce" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-nunito text-3xl font-black text-charcoal">Redirecting to WhatsApp...</h1>
            <p className="text-sm text-gray-500 font-medium">Please complete your payment directly with us to confirm your order.</p>
          </div>

          <div className="pt-4 border-t border-cream-100 flex flex-col gap-3">
            <p className="text-xs text-gray-400">If you are not redirected automatically within 3 seconds, please click the button below.</p>
            <a 
              href={`https://wa.me/918848422023?text=${encodeURIComponent(`Hello DuaLat!\n\nI have placed an order.\n*Order ID:* ${orderNumber}\n*Name:* ${address.fullName}\n*Total Amount:* ₹${totalCost.toFixed(2)}\n\nI can track my order here: ${window.location.origin}/track?id=${orderNumber}\n\nPlease let me know the payment details.`)}`}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-4 rounded-2xl shadow-md transition-all w-full"
            >
              <MessageCircle size={20} /> Complete Payment on WhatsApp
            </a>
            <button
              onClick={handleCompleteFlow}
              className="inline-flex items-center justify-center gap-2 border border-cream-200 hover:bg-cream-50 text-charcoal font-bold px-6 py-4 rounded-2xl transition-all w-full"
            >
              Return to Home
            </button>
          </div>
        </motion.div>
      ) : (
        /* Standard Checkout Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Step Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-sm">
              
              {/* Step 1: Shipping Address */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="font-nunito text-lg font-bold text-charcoal flex items-center gap-2 border-b border-cream-100 pb-3">
                    <User size={20} className="text-primary-500" /> Shipping Details (Guest Checkout)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={address.fullName}
                        onChange={handleAddressChange}
                        placeholder="John Doe"
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={address.email}
                        onChange={handleAddressChange}
                        placeholder="parent@example.com"
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={address.phone}
                        onChange={handleAddressChange}
                        placeholder="(555) 123-4567"
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Street Address *</label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={address.addressLine1}
                        onChange={handleAddressChange}
                        placeholder="123 Cozy Lane"
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Apt, Suite, Unit (Optional)</label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={address.addressLine2}
                        onChange={handleAddressChange}
                        placeholder="Apt 4B"
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        placeholder="San Francisco"
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">State / Region *</label>
                      <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        placeholder="CA"
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Zip Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleAddressChange}
                        placeholder="94107"
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-colors cursor-pointer"
                    >
                      Continue to Delivery <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Method */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-nunito text-lg font-bold text-charcoal flex items-center gap-2 border-b border-cream-100 pb-3">
                    <Truck size={20} className="text-secondary-500" /> Delivery Method
                  </h2>

                  <div className="space-y-3">
                    {/* Option 1: Standard */}
                    <label className={`flex justify-between items-center p-4 rounded-2xl border transition-all cursor-pointer ${
                      shippingMethod === 'standard' 
                        ? 'bg-secondary-50 border-secondary-400 text-secondary-900 shadow-xs' 
                        : 'bg-white border-cream-200 hover:bg-cream-50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="accent-secondary-500 h-4 w-4"
                        />
                        <div>
                          <p className="text-sm font-bold text-charcoal">Standard Shipping</p>
                          <p className="text-xs text-gray-400">Arrives in 5-7 business days</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-charcoal">
                        {isFreeShippingEligible ? 'FREE' : '₹4.99'}
                      </span>
                    </label>

                    {/* Option 2: Express */}
                    <label className={`flex justify-between items-center p-4 rounded-2xl border transition-all cursor-pointer ${
                      shippingMethod === 'express' 
                        ? 'bg-secondary-50 border-secondary-400 text-secondary-900 shadow-xs' 
                        : 'bg-white border-cream-200 hover:bg-cream-50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-secondary-500 h-4 w-4"
                        />
                        <div>
                          <p className="text-sm font-bold text-charcoal">Express Shipping</p>
                          <p className="text-xs text-gray-400">Arrives in 2-3 business days</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-charcoal">
                        {isFreeShippingEligible ? '₹5.00' : '₹9.99'}
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-cream-100">
                    <button
                      onClick={prevStep}
                      className="inline-flex items-center gap-2 border border-cream-200 hover:bg-cream-50 text-charcoal font-bold px-6 py-3 rounded-2xl cursor-pointer"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-colors cursor-pointer"
                    >
                      Continue to Payment <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <h2 className="font-nunito text-lg font-bold text-charcoal flex items-center gap-2 border-b border-cream-100 pb-3">
                    <MessageCircle size={20} className="text-[#25D366]" /> Payment Method
                  </h2>

                  <div className="p-5 bg-green-50 rounded-2xl border border-green-200 text-sm text-green-800 leading-relaxed flex flex-col items-center gap-3 text-center">
                    <div className="w-14 h-14 bg-white text-[#25D366] rounded-full flex items-center justify-center shadow-sm">
                      <MessageCircle size={28} />
                    </div>
                    <div>
                      <p className="font-bold text-base mb-1">Pay via WhatsApp</p>
                      <p className="text-green-700/80">Once you place your order, you will be securely redirected to our WhatsApp to complete your payment directly.</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-cream-100">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 border border-cream-200 hover:bg-cream-50 text-charcoal font-bold px-6 py-3 rounded-2xl cursor-pointer disabled:opacity-50"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3 rounded-2xl shadow-md min-w-44 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Processing...
                        </span>
                      ) : (
                        `Place Order • ₹${totalCost.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </form>
              )}


            </div>
          </div>

          {/* Right Column: Order Items Summary & trust */}
          <div className="space-y-6">
            {/* Items Summary card */}
            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-4">
              <h3 className="font-nunito text-base font-bold text-charcoal flex items-center gap-2 pb-3 border-b border-cream-100">
                <ShoppingCart size={18} className="text-gray-400" /> Order Summary
              </h3>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                {cart.map((item) => {
                  const price = item.product.salePrice ?? item.product.basePrice;
                  return (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3 text-xs">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="h-12 w-12 rounded-lg object-cover border border-cream-200 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-charcoal truncate">{item.product.name}</p>
                        <p className="text-gray-400 mt-0.5">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-charcoal shrink-0">₹{(price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-cream-100 pt-4 space-y-2 text-xs font-semibold text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
                  <span className={shippingCost === 0 ? 'text-secondary-600 font-bold' : 'text-charcoal font-bold'}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-charcoal font-bold">₹{estimatedTax.toFixed(2)}</span>
                </div>
                <div className="border-t border-cream-100 pt-3 flex justify-between items-center text-sm">
                  <span className="text-charcoal font-black">Grand Total</span>
                  <span className="text-lg font-black text-primary-600">₹{totalCost.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* Parent reassurance block */}
            <div className="bg-cream-50 p-5 rounded-3xl border border-cream-200/50 space-y-3">
              <h4 className="font-nunito text-xs font-bold text-charcoal uppercase tracking-wider">Parent Guarantees</h4>
              <ul className="space-y-2 text-[10px] text-gray-400 leading-relaxed font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-secondary-500">✓</span>
                  <span><strong>Spill & Play Guarantee:</strong> Return any item within 30 days even if worn or stained.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary-500">✓</span>
                  <span><strong>Free Exchanges:</strong> Did baby hit a growth spurt? Swap sizing instantly for free.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
