import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { HelpCircle, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Dualat Kidswear',
  description: 'Find answers to common questions about Dualat clothing sizes, cotton fabrics, wash care, pan-India delivery, and exchanges.',
  alternates: {
    canonical: 'https://www.dualat.in/faq',
  },
};

const FAQS = [
  {
    q: 'What age groups does Dualat cater to?',
    a: 'Dualat focuses primarily on baby girls and young girls from approximately 0 months to 9 years (Newborn, 0–3M, 3–6M, 6–12M, 1Y, 2Y, 3Y, 4Y, 5Y, and selected styles up to 7–9Y).'
  },
  {
    q: 'What fabrics do you use for your dresses and sets?',
    a: 'We prioritize breathable, skin-friendly cottons, lightweight cotton blends, textured cotton slub, and soft poplins that allow air circulation in warm Indian weather while feeling gentle against delicate skin.'
  },
  {
    q: 'How do I choose the correct size for my daughter?',
    a: 'Please refer to our Size Guide for chest, waist, and length measurements. If your child is between sizes or tall for her age, we always recommend ordering one size up for room to grow.'
  },
  {
    q: 'How long does delivery take across India?',
    a: 'Orders are typically packed and dispatched within 24–48 hours. Delivery takes 2–4 business days within South India, 3–5 business days to metro cities, and 4–7 business days to the rest of India.'
  },
  {
    q: 'Can I exchange an outfit if the size does not fit?',
    a: 'Yes, we provide a 7-day size exchange guarantee for unworn items with tags intact. Simply reach out via WhatsApp with your order ID, and we will guide you through the replacement process.'
  },
  {
    q: 'How should I wash Dualat cotton dresses?',
    a: 'We recommend gentle hand wash or delicate machine wash in cold water using a mild baby-safe detergent. Wash with similar colors, do not bleach, dry in shade to preserve colors, and use low heat when ironing.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept secure online payments via UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, Mastercard, RuPay), and NetBanking.'
  },
  {
    q: 'Do you offer international shipping outside India?',
    a: 'Currently, Dualat operates across India. For special international delivery requests, please contact our team directly on WhatsApp.'
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10 text-[#242220]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">FAQ</span>
      </nav>

      {/* Header */}
      <header className="space-y-3 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] text-[10px] font-bold uppercase tracking-widest">
          <HelpCircle size={12} /> Clear Answers
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#242220]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661]">
          Everything you need to know about our collections, sizing, care, and deliveries.
        </p>
      </header>

      {/* FAQ Accordion List */}
      <div className="bg-white rounded-2xl border border-[#e6e1d7] shadow-xs divide-y divide-[#f3efe9] p-6 sm:p-8 space-y-2">
        {FAQS.map((faq, i) => (
          <div key={i} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
            <h2 className="font-serif text-base font-bold text-[#242220]">
              {faq.q}
            </h2>
            <p className="text-xs sm:text-sm text-[#6b6661] leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-[#faf8f5] p-6 sm:p-8 rounded-2xl border border-[#e6e1d7] text-center space-y-3">
        <h3 className="font-serif text-lg font-bold text-[#242220]">Have a question not listed here?</h3>
        <p className="text-xs text-[#6b6661] max-w-md mx-auto">
          We are just a quick message away. Chat with us directly on WhatsApp for personal assistance.
        </p>
        <a
          href="https://wa.me/918848722023?text=Hi%20Dualat%2C%20I%20have%20a%20question"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#b85d68] hover:bg-[#9e4652] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
        >
          <MessageCircle size={14} /> Ask us on WhatsApp (+91 88487 22023)
        </a>
      </div>
    </div>
  );
}
