import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { MessageCircle, Mail, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us & WhatsApp Help | Dualat Kidswear',
  description: 'Connect with Dualat for order support, size recommendations, and WhatsApp assistance. Modest & comfortable kidswear for little girls.',
  alternates: {
    canonical: 'https://www.dualat.in/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8c8780] font-medium flex items-center gap-1.5 uppercase tracking-wider">
        <Link href="/" className="hover:text-[#242220]">Home</Link>
        <span>/</span>
        <span className="text-[#242220] font-bold">Contact Us</span>
      </nav>

      {/* Header */}
      <header className="space-y-3 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] text-[10px] font-bold uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b85d68]" /> We Are Here to Help
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#242220]">
          Get in Touch with Dualat
        </h1>
        <p className="text-xs sm:text-sm text-[#6b6661] leading-relaxed">
          Need sizing advice, outfit recommendations, or order updates? Connect directly with our team.
        </p>
      </header>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* WhatsApp Assistance Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6e1d7] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#f8faf8] text-[#719373] border border-[#dde6dd] flex items-center justify-center">
            <MessageCircle size={24} />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#242220]">WhatsApp Assistance</h2>
          <p className="text-xs text-[#6b6661] leading-relaxed">
            The quickest way to reach us. Chat with us on <strong className="text-[#242220]">+91 88487 22023</strong> for instant sizing help, outfit photos, or tracking assistance.
          </p>
          <a
            href="https://wa.me/918848722023?text=Hello%20Dualat%2C%20I%20would%20like%20assistance%20with%20my%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#719373] hover:bg-[#58765a] text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Chat on WhatsApp (+91 88487 22023)
          </a>
        </div>

        {/* Email Support Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e6e1d7] space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] flex items-center justify-center">
            <Mail size={24} />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#242220]">Email Support</h2>
          <p className="text-xs text-[#6b6661] leading-relaxed">
            For general inquiries, order changes, or formal feedback. We respond within 24 business hours.
          </p>
          <a
            href="mailto:support@dualat.in"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#242220] hover:bg-[#b85d68] text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            support@dualat.in
          </a>
        </div>

      </div>

      {/* Operational Details */}
      <div className="bg-[#faf8f5] p-6 sm:p-8 rounded-2xl border border-[#e6e1d7] space-y-4 text-xs text-[#6b6661] leading-relaxed">
        <h3 className="font-serif text-base font-bold text-[#242220]">Customer Care Hours & Origin</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-[#b85d68] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#242220]">Support Hours</p>
              <p>Monday – Saturday: 9:30 AM – 6:30 PM IST</p>
              <p className="text-[11px] text-[#8c8780]">Closed on Sundays and public holidays</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-[#b85d68] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#242220]">Brand Origin</p>
              <p>Dualat Kidswear, Kerala, India</p>
              <p className="text-[11px] text-[#8c8780]">Pan-India courier delivery to all serviceable pin codes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
