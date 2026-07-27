"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Package, Truck, CheckCircle2, Search, ArrowRight, Clock, AlertCircle } from 'lucide-react';

const STATUS_STEPS = [
  { id: 'PENDING', label: 'Order Placed', icon: Clock },
  { id: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle2 },
  { id: 'SHIPPED', label: 'Dispatched', icon: Truck },
  { id: 'DELIVERED', label: 'Delivered', icon: Package },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialId);
  const [searchInput, setSearchInput] = useState(initialId);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrder = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res = await fetch(`/api/orders/${id.trim()}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError("Order not found. Please check the ID and try again.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
        return;
      }
      const data = await res.json();
      setOrder(data);
      // Update URL without full reload
      if (id !== searchParams.get('id')) {
        router.push(`/track?id=${id.trim()}`);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch automatically if ID is in URL on load
  useEffect(() => {
    if (initialId && !order) {
      fetchOrder(initialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(searchInput);
  };

  const getStatusIndex = (status: string) => {
    if (status === 'CANCELLED') return -1;
    return STATUS_STEPS.findIndex(s => s.id === status);
  };

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header & Search */}
        <div className="text-center space-y-6">
          <h1 className="font-nunito text-3xl md:text-4xl font-black text-charcoal">Track Your Order</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">Enter your Order ID below to see the current status and delivery updates.</p>
          
          <form onSubmit={handleSearch} className="max-w-lg mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. cm0a1b2c3d4e5..."
                className="w-full bg-white border border-cream-200 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm font-medium"
              />
            </div>
            <button 
              type="submit"
              disabled={loading || !searchInput.trim()}
              className="bg-charcoal hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-colors disabled:opacity-50"
            >
              Track
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-primary-500">
            <div className="animate-spin h-8 w-8 border-4 border-current border-t-transparent rounded-full mb-4" />
            <p className="font-bold animate-pulse">Finding your order...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-100 rounded-3xl p-6 text-center space-y-2 text-red-600 max-w-lg mx-auto">
            <AlertCircle className="mx-auto" size={32} />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {/* Order Details */}
        {order && !loading && (
          <div className="bg-white rounded-3xl shadow-xl border border-cream-200 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-cream-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-cream-50/50">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                <p className="font-mono text-sm font-bold text-charcoal">{order.id}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order Date</p>
                <p className="text-sm font-bold text-charcoal">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-10">
              
              {/* Timeline */}
              {order.status === 'CANCELLED' ? (
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
                  <h3 className="font-bold text-lg mb-1">Order Cancelled</h3>
                  <p className="text-sm">This order has been cancelled. If you have any questions, please contact support.</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="overflow-x-auto pb-4">
                    <div className="min-w-[400px] flex justify-between relative">
                      {/* Progress Bar Background */}
                      <div className="absolute top-5 left-6 right-6 h-1 bg-cream-100 rounded-full" />
                      
                      {/* Active Progress Bar */}
                      <div 
                        className="absolute top-5 left-6 h-1 bg-primary-500 rounded-full transition-all duration-1000"
                        style={{ width: `calc(${Math.max(0, getStatusIndex(order.status)) / (STATUS_STEPS.length - 1) * 100}% - 24px)` }}
                      />

                      {STATUS_STEPS.map((step, idx) => {
                        const isActive = getStatusIndex(order.status) >= idx;
                        const isCurrent = getStatusIndex(order.status) === idx;
                        const Icon = step.icon;

                        return (
                          <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 w-24">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 border-2 ${
                              isActive 
                                ? 'bg-primary-500 border-primary-500 text-white shadow-md' 
                                : 'bg-white border-cream-200 text-gray-300'
                            }`}>
                              <Icon size={18} />
                            </div>
                            <div className="text-center">
                              <p className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-charcoal' : 'text-gray-400'}`}>
                                {step.label}
                              </p>
                              {isCurrent && (
                                <span className="inline-block mt-1 w-1.5 h-1.5 bg-primary-500 rounded-full animate-ping" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-cream-100">
                {/* Items */}
                <div className="space-y-4">
                  <h3 className="font-nunito font-bold text-charcoal">Items Ordered</h3>
                  <div className="space-y-4">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex gap-4 p-3 border border-cream-100 rounded-2xl">
                        <img 
                          src={item.product.images[0] || 'https://via.placeholder.com/150'} 
                          alt={item.product.name} 
                          className="w-16 h-20 object-cover rounded-xl bg-cream-50"
                        />
                        <div className="flex-1 flex flex-col justify-center">
                          <p className="text-sm font-bold text-charcoal line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm font-bold text-primary-600">₹{(item.priceAtTime * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-4">
                  <h3 className="font-nunito font-bold text-charcoal">Order Summary</h3>
                  <div className="bg-cream-50 rounded-2xl p-5 border border-cream-100 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Customer</span>
                      <span className="font-bold text-charcoal">{order.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Destination</span>
                      <span className="font-bold text-charcoal">{order.city}, {order.state}</span>
                    </div>
                    <div className="pt-3 border-t border-cream-200 flex justify-between items-center">
                      <span className="font-bold text-charcoal">Total Amount</span>
                      <span className="text-lg font-black text-primary-600">₹{order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50 flex items-center justify-center">Loading...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
