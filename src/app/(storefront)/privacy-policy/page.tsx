import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dualat Kidswear',
  description: 'Understand how Dualat protects your personal information, order data, and privacy under Indian e-commerce regulations.',
  alternates: {
    canonical: 'https://www.dualat.in/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10 text-[#242220]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">Privacy Policy</span>
      </nav>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#242220]">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661]">
          Last updated: January 2026 • Dualat (dualat.in)
        </p>
      </header>

      {/* Content */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e6e1d7] shadow-xs space-y-6 text-xs sm:text-sm text-[#6b6661] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">1. Introduction</h2>
          <p>
            DUALAT (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the personal information you share with us on dualat.in. This Privacy Policy describes how we collect, use, and safeguard your data when you visit our website or make a purchase.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">2. Information We Collect</h2>
          <p>
            When you browse or place an order on our store, we collect details necessary to fulfill your order, including your full name, shipping address, contact phone number, and email address. We do not store credit/debit card details or UPI PINs on our servers; all payments are processed through RBI-compliant secure payment gateways.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">3. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To process and deliver your kidswear orders.</li>
            <li>To send order confirmations, shipment tracking updates via SMS or WhatsApp, and invoice receipts.</li>
            <li>To provide customer support and handle size exchange requests.</li>
            <li>To notify you of new collection arrivals if you opted into our newsletter.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">4. Data Sharing & Security</h2>
          <p>
            We never sell, rent, or trade your personal data to third parties. Your shipping information is shared strictly with our contracted courier partners (e.g., Delhivery, Blue Dart, DTDC) solely to deliver your orders to your doorstep.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#242220]">5. Contact Regarding Privacy</h2>
          <p>
            If you have questions or wish to update or delete your information, please contact our privacy officer at <a href="mailto:support@dualat.in" className="text-[#b85d68] underline font-bold">support@dualat.in</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
