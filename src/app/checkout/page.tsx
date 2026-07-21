"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { UserAddress, PaymentDetails } from '@/lib/mockData';
import { Check, CreditCard, Truck, User, ArrowLeft, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
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

  // Payment State
  const [payment, setPayment] = useState<PaymentDetails>({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
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

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
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

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment.cardholderName || !payment.cardNumber || !payment.expiryDate || !payment.cvv) {
      alert("Please fill out all payment details.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate payment authorization
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOrdered(true);
      setOrderNumber(`SW-${Math.floor(100000 + Math.random() * 900000)}`);
      // Cart gets cleared upon successful completion
    }, 2000);
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
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary-100 text-secondary-500 border border-secondary-200">
            <Check size={40} className="animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-nunito text-3xl font-black text-charcoal">Order Placed Successfully!</h1>
            <p className="text-sm text-gray-500 font-medium">Thank you for shopping with SproutWear. Your order details are below.</p>
          </div>

          <div className="p-4 bg-cream-100/50 rounded-2xl border border-cream-200 text-left space-y-2 text-xs">
            <p className="text-gray-400 font-bold">ORDER DETAILS</p>
            <div className="flex justify-between font-bold text-charcoal">
              <span>Order Number:</span>
              <span className="text-primary-600">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-semibold text-charcoal">
                {shippingMethod === 'express' ? '2-3 Business Days' : '5-7 Business Days'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Deliver to:</span>
              <span className="font-semibold text-charcoal">{address.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span>Confirmation Email:</span>
              <span className="font-semibold text-charcoal">{address.email}</span>
            </div>
          </div>

          <div className="text-center p-3 bg-secondary-50 border border-secondary-200/50 rounded-2xl flex items-center justify-center gap-2">
            <span className="text-lg">🎁</span>
            <p className="text-[11px] font-bold text-secondary-700 leading-normal">
              A gift-wrapped package notification has been sent! You can track your shipment on the parent dashboard.
            </p>
          </div>

          <button
            onClick={handleCompleteFlow}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all cursor-pointer"
          >
            Clear Cart & Go Home
          </button>
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
                        {isFreeShippingEligible ? 'FREE' : '$4.99'}
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
                        {isFreeShippingEligible ? '$5.00' : '$9.99'}
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
                    <CreditCard size={20} className="text-accent-500" /> Payment Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardholderName"
                        value={payment.cardholderName}
                        onChange={handlePaymentChange}
                        placeholder="John Doe"
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={payment.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="4111 2222 3333 4444"
                        maxLength={19}
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={payment.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={payment.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        maxLength={3}
                        required
                        className="w-full rounded-xl border border-cream-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 bg-cream-100 rounded-2xl border border-cream-200 text-xs text-gray-400 leading-normal flex items-start gap-2">
                    <ShieldCheck size={16} className="text-secondary-500 shrink-0 mt-0.5" />
                    <p>
                      <strong>Mock Payment Mode:</strong> This page is integrated into a secure mock merchant portal. No actual card charging will occur.
                    </p>
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
                      className="inline-flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md min-w-44 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Authorizing...
                        </span>
                      ) : (
                        `Authorize Payment • $${totalCost.toFixed(2)}`
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
                      <span className="font-bold text-charcoal shrink-0">${(price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-cream-100 pt-4 space-y-2 text-xs font-semibold text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
                  <span className={shippingCost === 0 ? 'text-secondary-600 font-bold' : 'text-charcoal font-bold'}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-charcoal font-bold">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="border-t border-cream-100 pt-3 flex justify-between items-center text-sm">
                  <span className="text-charcoal font-black">Grand Total</span>
                  <span className="text-lg font-black text-primary-600">${totalCost.toFixed(2)}</span>
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
