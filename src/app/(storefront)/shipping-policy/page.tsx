import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Dualat Kidswear',
  description: 'Learn about Dualat pan-India delivery timelines, order dispatch process, shipping rates, and courier tracking.',
  alternates: {
    canonical: 'https://www.dualat.in/shipping-policy',
  },
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10 text-[#242220]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">Shipping Policy</span>
      </nav>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#242220]">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661]">
          Last updated: January 2026 • Transparent door delivery across India
        </p>
      </header>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#e6e1d7] shadow-xs space-y-1">
          <Clock size={18} className="text-[#b85d68]" />
          <p className="text-xs font-bold uppercase tracking-wider text-[#242220] pt-1">Dispatch Time</p>
          <p className="text-xs text-[#6b6661]">Dispatched within 24–48 business hours.</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#e6e1d7] shadow-xs space-y-1">
          <Truck size={18} className="text-[#719373]" />
          <p className="text-xs font-bold uppercase tracking-wider text-[#242220] pt-1">Delivery Window</p>
          <p className="text-xs text-[#6b6661]">4–7 business days pan India.</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#e6e1d7] shadow-xs space-y-1">
          <ShieldCheck size={18} className="text-[#af8558]" />
          <p className="text-xs font-bold uppercase tracking-wider text-[#242220] pt-1">Tracking Included</p>
          <p className="text-xs text-[#6b6661]">Live tracking link sent via SMS and email.</p>
        </div>
      </div>

      {/* Detailed Content */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e6e1d7] shadow-xs space-y-8 text-xs sm:text-sm leading-relaxed text-[#6b6661]">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#242220]">1. Pan-India Delivery Coverage</h2>
          <p>
            Dualat delivers across India through trusted courier partners (including Delhivery, Blue Dart, Xpressbees, and DTDC). We service metro cities, tier-2, tier-3 cities, and rural postal codes serviceable by standard courier networks.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#242220]">2. Order Processing & Dispatch</h2>
          <p>
            Every order is hand-inspected for fabric quality, stitching, and finishing before packaging. Orders placed before 1:00 PM IST on working days are typically processed and packed within 24 to 48 hours. Orders placed on Sundays or public holidays are dispatched on the next working day.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#242220]">3. Estimated Delivery Timelines</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Kerala & South India:</strong> 2 to 4 business days</li>
            <li><strong>Major Metro Cities (Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, Kolkata):</strong> 3 to 5 business days</li>
            <li><strong>Rest of India:</strong> 4 to 7 business days</li>
            <li><strong>Remote / Northeast / Jammu & Kashmir:</strong> 6 to 9 business days</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#242220]">4. Shipping Charges</h2>
          <p>
            Standard shipping rates apply at checkout based on package weight and destination. We transparently display shipping fees during checkout before you make payment, without any hidden surprise costs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#242220]">5. Order Tracking</h2>
          <p>
            Once your order is dispatched, you will receive a confirmation message via email and SMS with a direct tracking link and AWB number. You can also visit our <Link href="/track" className="text-[#b85d68] font-bold underline">Order Tracking Page</Link> at any time to monitor your shipment status.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#242220]">6. Damaged or Tampered Parcels</h2>
          <p>
            If the outer courier bag appears visibly tampered with or damaged upon delivery, please do not accept the package or record an unboxing video and immediately notify us via WhatsApp or at <a href="mailto:support@dualat.in" className="text-[#b85d68] underline">support@dualat.in</a> with photos.
          </p>
        </section>
      </div>
    </div>
  );
}
