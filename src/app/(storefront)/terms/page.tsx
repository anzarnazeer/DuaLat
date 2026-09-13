import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Dualat Kidswear',
  description: 'Terms and conditions governing orders, payments, cancellations, and user interactions on dualat.in.',
  alternates: {
    canonical: 'https://www.dualat.in/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10 text-[#242220]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">Terms of Service</span>
      </nav>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#242220]">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661]">
          Last updated: January 2026 • Dualat (dualat.in)
        </p>
      </header>

      {/* Content */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e6e1d7] shadow-xs space-y-6 text-xs sm:text-sm text-[#6b6661] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">1. Agreement to Terms</h2>
          <p>
            By accessing or using dualat.in (&quot;Website&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">2. Product Information & Pricing</h2>
          <p>
            We take reasonable care to display accurate images, descriptions, fabric details, and prices for all Dualat products. Prices are quoted in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">3. Order Acceptance & Fulfillment</h2>
          <p>
            Placing an order constitutes an offer to purchase. Dualat reserves the right to accept, limit, or decline orders if items are out of stock, if billing/shipping details cannot be verified, or in the case of inadvertent technical pricing errors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">4. Intellectual Property</h2>
          <p>
            All content on dualat.in, including the DUALAT name, logos, product designs, product photographs, styling guides, and text, is the property of Dualat and protected by applicable copyright and trademark laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">5. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India, with jurisdiction in Kerala courts.
          </p>
        </section>
      </div>
    </div>
  );
}
