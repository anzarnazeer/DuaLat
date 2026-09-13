import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, Heart, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e6e1d7] mt-auto text-[#242220]">
      {/* 4 Authentic Value Pillars Section */}
      <div className="border-b border-[#e6e1d7] bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#e6e1d7]/60 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda]">
                <Truck size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#242220]">Pan-India Delivery</h4>
                <p className="text-[11px] text-[#6b6661] mt-0.5 leading-relaxed">Doorstep courier delivery across pin codes in India within 4–7 business days.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#e6e1d7]/60 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#faf7f2] text-[#af8558] border border-[#e8d9c5]">
                <RotateCcw size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#242220]">Easy 7-Day Exchange</h4>
                <p className="text-[11px] text-[#6b6661] mt-0.5 leading-relaxed">Hassle-free size exchange within 7 days for unworn outfits with tags intact.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#e6e1d7]/60 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8faf8] text-[#719373] border border-[#dde6dd]">
                <Heart size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#242220]">Comfort-First Fabrics</h4>
                <p className="text-[11px] text-[#6b6661] mt-0.5 leading-relaxed">Breathable, skin-friendly cottons selected by a mother for active little girls.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-[#e6e1d7]/60 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda]">
                <MessageCircle size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#242220]">WhatsApp Support</h4>
                <p className="text-[11px] text-[#6b6661] mt-0.5 leading-relaxed">Have sizing questions? Message us directly on WhatsApp for personal advice.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#242220] uppercase">
                Dualat
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b85d68] mt-0.5">
                Little Girls' Boutique
              </p>
            </div>
            <p className="text-xs text-[#6b6661] leading-relaxed max-w-sm">
              Modest, comfortable and beautiful kidswear for little girls aged 0–9 years. Inspired by a mother's search for graceful, everyday elegance.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/dualat.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#f3efe9] hover:bg-[#b85d68] hover:text-white flex items-center justify-center text-[#242220] transition-colors"
                aria-label="Dualat on Instagram"
              >
                <InstagramIcon size={15} />
              </a>
              <a
                href="https://wa.me/918848722023?text=Hi%20Dualat%2C%20I%20have%20a%20query%20about%20your%20collection"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#f3efe9] hover:bg-[#719373] hover:text-white flex items-center justify-center text-[#242220] transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#8c8780]">Collections</span>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-[#6b6661]">
              <li><Link href="/girls" className="hover:text-[#b85d68] transition-colors">New Arrivals</Link></li>
              <li><Link href="/girls/dresses" className="hover:text-[#b85d68] transition-colors">Dresses & Frocks</Link></li>
              <li><Link href="/girls/two-piece-sets" className="hover:text-[#b85d68] transition-colors">Two-Piece Co-ords</Link></li>
              <li><Link href="/girls/everyday-wear" className="hover:text-[#b85d68] transition-colors">Everyday Wear</Link></li>
              <li><Link href="/girls/festive-wear" className="hover:text-[#b85d68] transition-colors">Occasion & Festive</Link></li>
              <li><Link href="/shop" className="hover:text-[#b85d68] transition-colors">Shop by Age (0–9Y)</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#8c8780]">Customer Care</span>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-[#6b6661]">
              <li><Link href="/track" className="hover:text-[#b85d68] transition-colors">Track Order</Link></li>
              <li><Link href="/size-guide" className="hover:text-[#b85d68] transition-colors">Size Guide (0–9 Years)</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#b85d68] transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns-exchange" className="hover:text-[#b85d68] transition-colors">Return & Exchange</Link></li>
              <li><Link href="/faq" className="hover:text-[#b85d68] transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-[#b85d68] transition-colors">Contact Us</Link></li>
              <li>
                <a
                  href="https://wa.me/918848722023?text=Hi%20Dualat%2C%20I%20have%20a%20query%20about%20your%20collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#719373] transition-colors inline-flex items-center gap-1 font-bold text-[#719373]"
                >
                  WhatsApp: +91 88487 22023
                </a>
              </li>
            </ul>
          </div>

          {/* Brand & Legal */}
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#8c8780]">About & Legal</span>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-[#6b6661]">
              <li><Link href="/about" className="hover:text-[#b85d68] transition-colors">Our Story</Link></li>
              <li><Link href="/journal" className="hover:text-[#b85d68] transition-colors">Parenting Journal</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#b85d68] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#b85d68] transition-colors">Terms of Service</Link></li>
              <li><Link href="/admin/login" className="hover:text-[#b85d68] transition-colors">Admin Login</Link></li>
            </ul>
          </div>

        </div>

        {/* Brand Heritage Blurb */}
        <div className="mt-12 pt-8 border-t border-[#e6e1d7] text-center max-w-3xl mx-auto space-y-2">
          <p className="text-[11px] text-[#6b6661] leading-relaxed">
            <strong className="text-[#242220]">DUALAT</strong> is an Indian boutique kidswear brand born from motherhood, proudly originating from Kerala, India. We design comfortable, modest and beautiful outfits for baby girls and young girls, delivering thoughtfully to families nationwide.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#e6e1d7]/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#8c8780] font-medium">
          <p>© {new Date().getFullYear()} DUALAT (dualat.in). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Secure UPI, Cards & NetBanking</span>
            <span>•</span>
            <span>Delivery Pan India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
