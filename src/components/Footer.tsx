import React from 'react';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-cream-300 mt-auto">
      {/* Reassurance Badges Section */}
      <div className="border-b border-cream-300 bg-[#f5f5f6]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            
            <div className="flex items-center gap-4 p-4 rounded bg-white border border-cream-300 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#fff1f4] text-primary-500 border border-primary-200">
                <RefreshCw size={18} />
              </div>
              <div>
                <h4 className="font-assistant text-xs font-black text-charcoal uppercase tracking-wider">Free 30-Day Returns</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Spill it, wash it, return it. Simple prepaid labels.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded bg-white border border-cream-300 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-secondary-50 text-secondary-600 border border-secondary-200">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-assistant text-xs font-black text-charcoal uppercase tracking-wider">Secure Checkout</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">SSL encrypted security. Mocked express payments.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded bg-white border border-cream-300 shadow-xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-accent-50 text-accent-500 border border-accent-200">
                <HeartHandshake size={18} />
              </div>
              <div>
                <h4 className="font-assistant text-xs font-black text-charcoal uppercase tracking-wider">24/7 Support</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Parent helpline. Instant chat, email, or calls.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          
          <div>
            <span className="font-assistant text-[10px] font-extrabold tracking-widest text-[#282c3f] uppercase">Online Shopping</span>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-gray-500">
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">All Clothing</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Baby Boys</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Baby Girls</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Unisex Basics</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-assistant text-[10px] font-extrabold tracking-widest text-[#282c3f] uppercase">Useful Links</span>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-gray-500">
              <li><Link href="/track" className="hover:text-primary-500 transition-colors">Track Order</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Size Guide Calculator</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Fabric Safety Standards</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Parent Blog</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-assistant text-[10px] font-extrabold tracking-widest text-[#282c3f] uppercase">Policies & Safety</span>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-gray-500">
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Organic Certification</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Hypoallergenic Details</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Safety Checklists</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-assistant text-[10px] font-extrabold tracking-widest text-[#282c3f] uppercase">Experience App</span>
            <p className="mt-4 text-xs font-semibold text-gray-500 leading-relaxed">
              Scan this code or download from Play Store / App Store for mobile shopping.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="text-xl">🍏</span>
              <span className="text-xl">🤖</span>
            </div>
          </div>

        </div>

        {/* Localized SEO Blurb */}
        <div className="mt-12 pt-8 border-t border-cream-300 text-center max-w-4xl mx-auto">
          <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
            <strong className="text-gray-500">DuaLat Kids Wear</strong> is Kerala's premium destination for organic, hypoallergenic baby and toddler clothing. Based proudly in Kerala, we specialize in high-quality fashion for children aged 6 months to 5 years. From breathable summer rompers to cozy winter wear, our collections are designed with love by a mother, for mothers. Shop the best kids wear in Kerala online today.
          </p>
        </div>

        {/* Brand Copyright */}
        <div className="mt-8 border-t border-cream-300 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            &copy; {new Date().getFullYear()} DuaLat Inc. Made with love for happy kids.
          </p>
          <div className="flex space-x-6 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <Link href="/shop" className="hover:text-primary-500">Privacy Policy</Link>
            <Link href="/shop" className="hover:text-primary-500">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

