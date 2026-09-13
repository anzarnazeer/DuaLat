"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useShop } from '@/context/ShopContext';
import type { Product } from '@/lib/mockData';
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useCart();
  const { setCategoryFilter, setSearchQuery } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced API search
  useEffect(() => {
    if (localSearch.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`/api/products`, { cache: 'no-store' })
        .then((res) => res.json())
        .then((products: Product[]) => {
          if (!Array.isArray(products)) return;
          const query = localSearch.toLowerCase();
          const filtered = products
            .filter(
              (p) =>
                p.name?.toLowerCase().includes(query) ||
                p.description?.toLowerCase().includes(query)
            )
            .slice(0, 5);
          setSuggestions(filtered);
          setShowSuggestions(filtered.length > 0);
        })
        .catch(console.error);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setShowSuggestions(false);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
      router.push(`/shop?q=${encodeURIComponent(localSearch.trim())}`);
    }
  };

  const handleSuggestionClick = (id: string) => {
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
    setIsMobileMenuOpen(false);
    setLocalSearch('');
    router.push(`/product/${id}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e6e1d7] transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 sm:h-20 items-center justify-between gap-3 sm:gap-6">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#242220] hover:text-[#b85d68] lg:hidden cursor-pointer rounded-lg -ml-1 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Boutique Brand Logo */}
          <Link href="/" className="flex items-center shrink-0 group select-none py-2">
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-2xl sm:text-3xl font-extrabold text-[#242220] group-hover:text-[#b85d68] transition-colors leading-none uppercase">
                Dualat
              </span>
              <span className="text-[9px] font-sans font-semibold tracking-[0.25em] text-[#b85d68] uppercase mt-1 leading-none">
                Little Girls
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-[12px] font-bold tracking-widest uppercase h-full text-[#242220]">
            <Link
              href="/girls"
              className={`py-6 border-b-2 transition-colors hover:text-[#b85d68] ${
                pathname === '/girls' ? 'text-[#b85d68] border-[#b85d68]' : 'border-transparent'
              }`}
            >
              New Arrivals
            </Link>
            <Link
              href="/girls"
              className="py-6 border-b-2 border-transparent transition-colors hover:text-[#b85d68]"
            >
              Girls
            </Link>
            <Link
              href="/girls/dresses"
              className={`py-6 border-b-2 transition-colors hover:text-[#b85d68] ${
                pathname.includes('/dresses') ? 'text-[#b85d68] border-[#b85d68]' : 'border-transparent'
              }`}
            >
              Dresses
            </Link>
            <Link
              href="/shop"
              className={`py-6 border-b-2 transition-colors hover:text-[#b85d68] ${
                pathname === '/shop' ? 'text-[#b85d68] border-[#b85d68]' : 'border-transparent'
              }`}
            >
              Shop by Age
            </Link>
            <Link
              href="/journal"
              className={`py-6 border-b-2 transition-colors hover:text-[#b85d68] ${
                pathname.startsWith('/journal') ? 'text-[#b85d68] border-[#b85d68]' : 'border-transparent'
              }`}
            >
              Journal
            </Link>
            <Link
              href="/about"
              className={`py-6 border-b-2 transition-colors hover:text-[#b85d68] ${
                pathname === '/about' ? 'text-[#b85d68] border-[#b85d68]' : 'border-transparent'
              }`}
            >
              About Dualat
            </Link>
          </nav>

          {/* Desktop Search Bar */}
          <div ref={searchRef} className="hidden md:block relative max-w-xs lg:max-w-sm w-full">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b6661] pointer-events-none">
                <Search size={15} />
              </div>
              <input
                type="text"
                placeholder="Search cotton dresses, frocks, prints..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onFocus={() => localSearch.trim().length >= 2 && setShowSuggestions(true)}
                className="w-full rounded-full bg-[#f3efe9] py-2 pl-10 pr-4 text-xs border border-transparent focus:border-[#e6e1d7] focus:bg-white focus:outline-none placeholder-[#8c8780] text-[#242220] transition-all"
              />
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-[#e6e1d7] bg-white p-3 shadow-xl z-50 max-h-80 overflow-y-auto">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8c8780]">
                  Suggestions
                </div>
                <ul className="divide-y divide-[#f3efe9] mt-1">
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => handleSuggestionClick(p.id)}
                        className="w-full flex items-center gap-3 p-2 text-left hover:bg-[#faf8f5] rounded-xl transition-colors cursor-pointer"
                      >
                        <img
                          src={p.images[0] || '/placeholder.png'}
                          alt={p.name}
                          className="h-11 w-11 rounded-lg object-cover shrink-0 border border-[#e6e1d7]"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#242220] truncate">{p.name}</p>
                          <p className="text-[11px] font-semibold text-[#b85d68] mt-0.5">
                            ₹{p.salePrice ?? p.basePrice}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Action Icons (Desktop & Mobile) */}
          <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-1.5 text-[#242220] hover:text-[#b85d68] md:hidden cursor-pointer"
              aria-label="Open search"
            >
              <Search size={19} />
            </button>

            {/* Account / Admin Link */}
            <Link
              href="/admin/login"
              className="hidden sm:flex flex-col items-center text-[#242220] hover:text-[#b85d68] transition-colors p-1"
              title="Admin Login & Account"
            >
              <User size={19} className="stroke-[1.8]" />
              <span className="text-[9px] font-bold tracking-wider uppercase mt-1">Account</span>
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/shop"
              className="flex flex-col items-center text-[#242220] hover:text-[#b85d68] transition-colors p-1"
              title="View Wishlist"
            >
              <Heart size={19} className="stroke-[1.8]" />
              <span className="text-[9px] font-bold tracking-wider uppercase mt-1 hidden sm:inline">Wishlist</span>
            </Link>

            {/* Bag Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex flex-col items-center text-[#242220] hover:text-[#b85d68] transition-colors p-1 cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag size={19} className="stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#b85d68] text-[9px] font-bold text-white shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-bold tracking-wider uppercase mt-1 hidden sm:inline">Bag</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Input */}
        {isMobileSearchOpen && (
          <div className="md:hidden py-3 border-t border-[#e6e1d7] animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search cotton dresses, sets..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                autoFocus
                className="w-full rounded-full bg-[#f3efe9] py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:bg-white border border-transparent focus:border-[#e6e1d7] text-[#242220]"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b85d68] p-1"
                aria-label="Submit search"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[72px] inset-x-0 bottom-0 bg-[#242220]/40 backdrop-blur-xs z-50">
          <div className="bg-white max-w-sm w-full h-full p-6 space-y-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e6e1d7] pb-4">
              <div>
                <p className="font-serif text-lg font-bold text-[#242220]">DUALAT</p>
                <p className="text-[10px] text-[#b85d68] font-semibold uppercase tracking-widest">Modest & Beautiful Kidswear</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#242220] hover:text-[#b85d68]"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col space-y-3 text-xs font-bold uppercase tracking-widest text-[#242220]">
              <Link
                href="/girls"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-[#f3efe9] hover:text-[#b85d68]"
              >
                <span>New Arrivals</span>
                <ChevronRight size={14} className="text-[#8c8780]" />
              </Link>
              <Link
                href="/girls"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-[#f3efe9] hover:text-[#b85d68]"
              >
                <span>Girls Collection</span>
                <ChevronRight size={14} className="text-[#8c8780]" />
              </Link>
              <Link
                href="/girls/dresses"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-[#f3efe9] hover:text-[#b85d68]"
              >
                <span>Dresses & Frocks</span>
                <ChevronRight size={14} className="text-[#8c8780]" />
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-[#f3efe9] hover:text-[#b85d68]"
              >
                <span>Shop by Age (0–9Y)</span>
                <ChevronRight size={14} className="text-[#8c8780]" />
              </Link>
              <Link
                href="/journal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-[#f3efe9] hover:text-[#b85d68]"
              >
                <span>Parenting Journal</span>
                <ChevronRight size={14} className="text-[#8c8780]" />
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 border-b border-[#f3efe9] hover:text-[#b85d68]"
              >
                <span>Our Story</span>
                <ChevronRight size={14} className="text-[#8c8780]" />
              </Link>
            </nav>

            <div className="pt-4 border-t border-[#e6e1d7] space-y-3">
              <Link
                href="/track"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-semibold text-[#6b6661] hover:text-[#b85d68]"
              >
                Track Your Order
              </Link>
              <Link
                href="/size-guide"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-semibold text-[#6b6661] hover:text-[#b85d68]"
              >
                Age & Size Guide
              </Link>
              <a
                href="https://wa.me/918848722023?text=Hi%20Dualat%2C%20I%20need%20assistance"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-semibold text-[#719373] hover:text-[#58765a]"
              >
                WhatsApp (+91 88487 22023)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
