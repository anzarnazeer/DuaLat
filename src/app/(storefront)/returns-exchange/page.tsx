import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { RotateCcw, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return & Exchange Policy | Dualat Kidswear',
  description: 'Understand Dualat 7-day size exchange and return policy. Simple, mother-friendly steps for hassle-free shopping.',
  alternates: {
    canonical: 'https://www.dualat.in/returns-exchange',
  },
};

export default function ReturnsExchangePage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10 text-[#242220]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">Return & Exchange</span>
      </nav>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#242220]">
          Return & Exchange Policy
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661]">
          Honest, transparent guidance for a peaceful shopping experience for your little one.
        </p>
      </header>

      {/* Policy Summary Card */}
      <div className="bg-[#fdf8f7] border border-[#f4dcda] p-6 rounded-2xl space-y-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-[#b85d68] font-bold uppercase tracking-wider text-xs">
          <RotateCcw size={16} /> 7-Day Size Exchange Guarantee
        </div>
        <p className="text-[#6b6661] leading-relaxed">
          We understand that little girls grow fast and choosing sizes online can sometimes be tricky. If an outfit does not fit your child properly, we happily offer a <strong>size exchange within 7 days</strong> of delivery for unworn, unwashed garments with original tags intact.
        </p>
      </div>

      {/* Steps to Exchange */}
      <div className="space-y-6">
        <h2 className="font-serif text-xl font-bold text-[#242220]">How to Request a Size Exchange</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#e6e1d7] shadow-xs space-y-2">
            <span className="text-xs font-extrabold text-[#b85d68] uppercase tracking-widest">Step 1</span>
            <h3 className="font-bold text-sm text-[#242220]">Contact via WhatsApp</h3>
            <p className="text-xs text-[#6b6661] leading-relaxed">
              Message us on WhatsApp with your Order ID, product name, and the replacement size needed.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e6e1d7] shadow-xs space-y-2">
            <span className="text-xs font-extrabold text-[#b85d68] uppercase tracking-widest">Step 2</span>
            <h3 className="font-bold text-sm text-[#242220]">Verification</h3>
            <p className="text-xs text-[#6b6661] leading-relaxed">
              Our support team verifies stock availability and shares pickup or return courier instructions.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e6e1d7] shadow-xs space-y-2">
            <span className="text-xs font-extrabold text-[#b85d68] uppercase tracking-widest">Step 3</span>
            <h3 className="font-bold text-sm text-[#242220]">Replacement Dispatched</h3>
            <p className="text-xs text-[#6b6661] leading-relaxed">
              Once the returned piece is inspected, your fresh size outfit is dispatched immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e6e1d7] shadow-xs space-y-6 text-xs sm:text-sm text-[#6b6661] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-[#242220]">Eligibility Conditions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>The item must be in its original, unworn, unwashed, and undamaged condition.</li>
            <li>All original brand tags, labels, and packaging must remain attached.</li>
            <li>Requests must be raised within 7 calendar days from the date of recorded delivery.</li>
            <li>Items purchased during clearance sales or customized orders are non-returnable unless defective.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-[#f3efe9]">
          <h2 className="font-serif text-lg font-bold text-[#242220]">Defective or Incorrect Item</h2>
          <p>
            In the rare event that you receive a damaged garment or an incorrect size/product, please notify us within 48 hours of delivery with photos of the issue. We will arrange a free replacement or issue a full refund to your original payment method.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-[#f3efe9]">
          <h2 className="font-serif text-lg font-bold text-[#242220]">Questions?</h2>
          <p>
            Reach out directly to us on WhatsApp or email <a href="mailto:support@dualat.in" className="text-[#b85d68] underline font-bold">support@dualat.in</a>. We are always here to assist mothers and families.
          </p>
        </section>
      </div>
    </div>
  );
}
