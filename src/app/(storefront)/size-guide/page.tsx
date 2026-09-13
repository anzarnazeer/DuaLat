import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Ruler, MessageCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Girls Size Guide (0–9 Years) | Dualat Kidswear',
  description: 'Find the perfect fit for your little girl. Dualat comprehensive age, chest, waist, and length measurement chart for baby girls and young girls in India.',
  alternates: {
    canonical: 'https://www.dualat.in/size-guide',
  },
};

const SIZE_CHART = [
  { age: '0–3 Months', size: '0–3M', chest: '16–17 in', waist: '16.5 in', length: '14 in', height: '21–24 in' },
  { age: '3–6 Months', size: '3–6M', chest: '17–18 in', waist: '17 in', length: '15 in', height: '24–26 in' },
  { age: '6–12 Months', size: '6–12M', chest: '18–19 in', waist: '18 in', length: '16.5 in', height: '26–28 in' },
  { age: '1–2 Years', size: '1Y / 2Y', chest: '19–20 in', waist: '19 in', length: '18 in', height: '28–32 in' },
  { age: '2–3 Years', size: '2Y / 3Y', chest: '20–21 in', waist: '20 in', length: '20 in', height: '32–36 in' },
  { age: '3–4 Years', size: '3Y / 4Y', chest: '21–22 in', waist: '20.5 in', length: '22 in', height: '36–39 in' },
  { age: '4–5 Years', size: '4Y / 5Y', chest: '22–23 in', waist: '21 in', length: '24 in', height: '39–43 in' },
  { age: '5–7 Years', size: '5–7Y', chest: '23–25 in', waist: '22 in', length: '26 in', height: '43–48 in' },
  { age: '7–9 Years', size: '7–9Y', chest: '25–27 in', waist: '23 in', length: '29 in', height: '48–53 in' },
];

export default function SizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10 text-[#242220]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">Size Guide</span>
      </nav>

      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] text-[10px] font-bold uppercase tracking-widest">
          <Ruler size={12} /> Fit with Confidence
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#242220]">
          Girls' Size & Measurement Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661] max-w-2xl leading-relaxed">
          Our silhouettes are designed with a comfortable, relaxed fit to give your daughter freedom of movement. Use this chart to match your child's age and body measurements.
        </p>
      </header>

      {/* Measurement Table */}
      <div className="bg-white rounded-2xl border border-[#e6e1d7] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#e6e1d7] bg-[#faf8f5] flex justify-between items-center">
          <h2 className="font-serif text-base font-bold text-[#242220]">Standard Dualat Measurement Table</h2>
          <span className="text-[10px] font-bold uppercase text-[#8c8780]">Measurements in Inches</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#f3efe9] text-[10px] font-bold uppercase tracking-wider text-[#6b6661]">
              <tr>
                <th className="p-3.5 sm:p-4">Age Range</th>
                <th className="p-3.5 sm:p-4">Size Label</th>
                <th className="p-3.5 sm:p-4">Chest</th>
                <th className="p-3.5 sm:p-4">Waist</th>
                <th className="p-3.5 sm:p-4">Dress Length</th>
                <th className="p-3.5 sm:p-4">Child Height</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e1d7]/60 text-[#242220]">
              {SIZE_CHART.map((row) => (
                <tr key={row.size} className="hover:bg-[#faf8f5] transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-[#b85d68]">{row.age}</td>
                  <td className="p-3.5 sm:p-4 font-semibold">{row.size}</td>
                  <td className="p-3.5 sm:p-4 text-[#6b6661]">{row.chest}</td>
                  <td className="p-3.5 sm:p-4 text-[#6b6661]">{row.waist}</td>
                  <td className="p-3.5 sm:p-4 text-[#6b6661]">{row.length}</td>
                  <td className="p-3.5 sm:p-4 text-[#6b6661]">{row.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mother's Sizing Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#e6e1d7] shadow-xs space-y-3">
          <h3 className="font-serif text-base font-bold text-[#242220]">Mother's Tip: Sizing Up for Growth</h3>
          <p className="text-xs text-[#6b6661] leading-relaxed">
            Little girls grow in rapid spurts! If your daughter is on the cusp between two sizes or is taller than average for her age, we always recommend choosing the <strong>larger size</strong>. Our relaxed cuts look lovely even with a slight oversize drape and will last longer in her rotation.
          </p>
        </div>

        <div className="bg-[#fdf8f7] p-6 rounded-2xl border border-[#f4dcda] space-y-3">
          <h3 className="font-serif text-base font-bold text-[#242220]">Still Unsure? Chat with Us</h3>
          <p className="text-xs text-[#6b6661] leading-relaxed">
            Tell us your daughter's current age and height on WhatsApp, and a mother on our team will gladly suggest the exact right size before you place your order.
          </p>
          <a
            href="https://wa.me/918848722023?text=Hi%20Dualat%2C%20can%20you%20help%20me%20choose%20the%20right%20size%20for%20my%20daughter%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b85d68] hover:underline uppercase tracking-wider"
          >
            <MessageCircle size={14} /> WhatsApp Sizing Help (+91 88487 22023) &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
