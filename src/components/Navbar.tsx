"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useShop } from '@/context/ShopContext';
import type { Product } from '@/lib/mockData';
import { Search, ShoppingBag, Menu, X, ChevronDown, Sparkles, User, Heart, Package } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const { cartCount, setCartOpen } = useCart();
  const { 
    selectedCategory, 
    setCategoryFilter, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const [localSearch, setLocalSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // CONCEPT: Debounced API search — we don't want to call the API on every
  // keystroke (that would be too many requests). We wait 300ms after the user
  // stops typing before making the request. This is called "debouncing".
  useEffect(() => {
    if (localSearch.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Set a timer — if the user types again within 300ms, this gets cancelled
    const timer = setTimeout(() => {
      fetch(`/api/products`)
        .then((res) => res.json())
        .then((products: Product[]) => {
          const query = localSearch.toLowerCase();
          const filtered = products
            .filter(
              (p) =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            )
            .slice(0, 5);
          setSuggestions(filtered);
          setShowSuggestions(filtered.length > 0);
        })
        .catch(console.error);
    }, 300);

    // Cleanup: cancel the timer if the component re-renders before 300ms
    return () => clearTimeout(timer);
  }, [localSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setShowSuggestions(false);
      router.push('/shop');
    }
  };

  const handleSuggestionClick = (productId: string) => {
    setShowSuggestions(false);
    setLocalSearch('');
    router.push(`/product/${productId}`);
  };

  const selectCategoryAndNavigate = (cat: 'boys' | 'girls' | 'unisex' | null) => {
    setCategoryFilter(cat);
    setIsMobileMenuOpen(false);
    router.push('/shop');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-cream-300 shadow-[0_4px_12px_rgba(0,0,0,0.04)] h-20 flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group select-none">
            {/* Pure Typographic Motherhood Capsule - No Icon/Image */}
            <span className="font-assistant text-2xl font-black tracking-tight text-[#282c3f] flex items-center leading-none bg-[#fff1f4] px-4 py-2 border border-primary-100 rounded-full shadow-xs transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary-200">
              dua<span className="text-primary-500 font-black">lat</span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#ff3f6c] ml-2.5 bg-white px-2 py-1 rounded-full border border-primary-200 self-center hidden sm:inline-block">
                Organic Kids
              </span>
            </span>
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-[12px] font-extrabold tracking-widest uppercase items-center h-full">
            <button
              onClick={() => selectCategoryAndNavigate(null)}
              className={`h-20 flex items-center px-1 transition-colors hover:text-primary-500 border-b-4 cursor-pointer ${
                selectedCategory === null 
                  ? 'text-primary-500 border-primary-500 font-extrabold' 
                  : 'text-charcoal border-transparent'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('boys')}
              className={`h-20 flex items-center px-1 transition-colors hover:text-primary-500 border-b-4 cursor-pointer ${
                selectedCategory === 'boys' 
                  ? 'text-primary-500 border-primary-500 font-extrabold' 
                  : 'text-charcoal border-transparent'
              }`}
            >
              Boys
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('girls')}
              className={`h-20 flex items-center px-1 transition-colors hover:text-primary-500 border-b-4 cursor-pointer ${
                selectedCategory === 'girls' 
                  ? 'text-primary-500 border-primary-500 font-extrabold' 
                  : 'text-charcoal border-transparent'
              }`}
            >
              Girls
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('unisex')}
              className={`h-20 flex items-center px-1 transition-colors hover:text-primary-500 border-b-4 cursor-pointer ${
                selectedCategory === 'unisex' 
                  ? 'text-primary-500 border-primary-500 font-extrabold' 
                  : 'text-charcoal border-transparent'
              }`}
            >
              Unisex
            </button>
          </nav>

          {/* Search Bar - Autocomplete */}
          <div ref={searchRef} className="hidden md:relative md:block max-w-xs lg:max-w-md w-full">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search for soft cotton, rompers, sets..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onFocus={() => localSearch.trim().length >= 2 && setShowSuggestions(true)}
                className="w-full rounded bg-cream-200 py-2 pl-10 pr-4 text-xs border border-transparent focus:border-cream-300 focus:bg-white focus:outline-none placeholder-[#9496a2] text-charcoal font-medium transition-all"
              />
            </form>

            {/* Smart Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 rounded-lg border border-cream-300 bg-white p-2 shadow-2xl z-50 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Sparkles size={11} className="text-primary-500" /> Smart Suggestions
                </div>
                <ul>
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => handleSuggestionClick(p.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-cream-200 rounded transition-colors cursor-pointer"
                      >
                        <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded object-cover shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-charcoal truncate">{p.name}</p>
                          <p className="text-[10px] text-gray-400 truncate">{p.fabricTags[0]} • ${p.salePrice ?? p.basePrice}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* User Action Badges */}
          <div className="flex items-center space-x-6 shrink-0 h-full">
            {/* Profile */}
            <div className="relative group flex flex-col items-center justify-center h-20 cursor-pointer text-charcoal hover:text-primary-500 transition-colors">
              <User size={18} className="stroke-[1.8]" />
              <span className="text-[10px] font-bold mt-1 tracking-wide">Profile</span>
              
              {/* Profile Dropdown */}
              <div className="absolute right-[-10px] top-20 w-64 bg-white border border-cream-300 shadow-2xl rounded-b py-5 px-6 hidden group-hover:block z-50 text-charcoal animate-fade-in">
                <h4 className="text-xs font-extrabold text-charcoal mb-0.5">Welcome</h4>
                <p className="text-[10px] text-gray-400 mb-4">To access account and manage orders</p>
                <button 
                  onClick={() => router.push('/shop')}
                  className="w-full border border-primary-500 text-primary-500 font-extrabold text-[11px] py-2.5 rounded hover:bg-primary-50 transition-colors uppercase tracking-wider mb-4 cursor-pointer"
                >
                  Login / Signup
                </button>
                <div className="border-t border-cream-300 pt-3 space-y-2 text-xs font-semibold text-[#3e4152]">
                  <Link href="/track" className="block hover:font-bold hover:text-primary-500 transition-colors">Track Order</Link>
                  <Link href="/shop" className="block hover:font-bold hover:text-primary-500 transition-colors">Wishlist</Link>
                  <Link href="/shop" className="block hover:font-bold hover:text-primary-500 transition-colors">Gift Cards</Link>
                  <Link href="/shop" className="block hover:font-bold hover:text-primary-500 transition-colors">Contact Us</Link>
                </div>
              </div>
            </div>

            {/* Track Order */}
            <Link 
              href="/track" 
              className="hidden sm:flex flex-col items-center justify-center h-20 cursor-pointer text-charcoal hover:text-primary-500 transition-colors"
            >
              <Package size={18} className="stroke-[1.8]" />
              <span className="text-[10px] font-bold mt-1 tracking-wide">Track</span>
            </Link>

            {/* Wishlist */}
            <Link 
              href="/shop" 
              className="hidden sm:flex flex-col items-center justify-center h-20 cursor-pointer text-charcoal hover:text-primary-500 transition-colors"
            >
              <Heart size={18} className="stroke-[1.8]" />
              <span className="text-[10px] font-bold mt-1 tracking-wide">Wishlist</span>
            </Link>

            {/* Bag (Cart Drawer) */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex flex-col items-center justify-center h-20 cursor-pointer text-charcoal hover:text-primary-500 transition-colors bg-transparent border-none p-0"
              aria-label="Open Cart"
            >
              <ShoppingBag size={18} className="stroke-[1.8]" />
              <span className="text-[10px] font-bold mt-1 tracking-wide">Bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-[-5px] flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary-500 text-[8px] font-black text-white shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-charcoal hover:text-primary-500 md:hidden cursor-pointer bg-cream-200 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 border-t border-cream-300 bg-white px-4 py-4 space-y-4 animate-fade-in shadow-xl z-50">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search items..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded bg-cream-200 py-2.5 pl-4 pr-10 text-xs focus:outline-none placeholder-gray-400 text-charcoal"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </button>
          </form>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => selectCategoryAndNavigate(null)}
              className="w-full text-left py-2.5 px-3 hover:bg-cream-200 rounded font-bold text-xs uppercase tracking-wider text-charcoal cursor-pointer"
            >
              Shop All
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('boys')}
              className="w-full text-left py-2.5 px-3 hover:bg-cream-200 rounded font-bold text-xs uppercase tracking-wider text-charcoal cursor-pointer"
            >
              Boys Wear
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('girls')}
              className="w-full text-left py-2.5 px-3 hover:bg-cream-200 rounded font-bold text-xs uppercase tracking-wider text-charcoal cursor-pointer"
            >
              Girls Wear
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('unisex')}
              className="w-full text-left py-2.5 px-3 hover:bg-cream-200 rounded font-bold text-xs uppercase tracking-wider text-charcoal cursor-pointer"
            >
              Unisex Wear
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

