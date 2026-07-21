import React from 'react';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-cream-200 mt-auto">
      {/* Reassurance Badges Section */}
      <div className="border-b border-cream-200 bg-cream-100/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 shadow-sm border border-cream-200/40">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-500 border border-primary-200">
                <RefreshCw size={24} className="animate-spin-slow" />
              </div>
              <div>
                <h4 className="font-nunito text-base font-bold text-charcoal">Free 30-Day Returns</h4>
                <p className="text-xs text-gray-500 mt-0.5">Spill it, wash it, return it. Simple prepaid labels.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 shadow-sm border border-cream-200/40">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-100 text-secondary-500 border border-secondary-200">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-nunito text-base font-bold text-charcoal">Secure Checkout</h4>
                <p className="text-xs text-gray-500 mt-0.5">SSL encrypted security. Mocked express payments.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 shadow-sm border border-cream-200/40">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-100 text-accent-500 border border-accent-200">
                <HeartHandshake size={24} />
              </div>
              <div>
                <h4 className="font-nunito text-base font-bold text-charcoal">24/7 Support</h4>
                <p className="text-xs text-gray-500 mt-0.5">Parent helpline. Instant chat, email, or calls.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          
          <div>
            <span className="font-nunito text-sm font-bold tracking-wider text-charcoal uppercase">Shop</span>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">All Clothing</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Baby Boys</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Baby Girls</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Unisex Basics</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-nunito text-sm font-bold tracking-wider text-charcoal uppercase">Resources</span>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Size Guide Calculator</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Fabric Safety Standards</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Parent Blog</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-nunito text-sm font-bold tracking-wider text-charcoal uppercase">Reassurance</span>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Organic Certification</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Hypoallergenic Details</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Safety Checklists</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-nunito text-sm font-bold tracking-wider text-charcoal uppercase">Our Brand</span>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Our Story</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Sustainable Promise</Link></li>
              <li><Link href="/shop" className="hover:text-primary-500 transition-colors">Partnerships</Link></li>
            </ul>
          </div>

        </div>

        {/* Brand Copyright */}
        <div className="mt-12 border-t border-cream-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SproutWear Inc. Made with love for happy toddlers.
          </p>
          <div className="flex space-x-6 text-xs text-gray-400">
            <Link href="/shop" className="hover:text-primary-500">Privacy Policy</Link>
            <Link href="/shop" className="hover:text-primary-500">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
