"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useShop } from '@/context/ShopContext';
import { MOCK_PRODUCTS, Product } from '@/lib/mockData';
import { Search, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

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

  // Update suggestions when typing
  useEffect(() => {
    if (localSearch.trim().length >= 2) {
      const filtered = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(localSearch.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
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
    <header className="sticky top-0 z-40 w-full glass-panel shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-500 font-bold text-xl border border-primary-200 shadow-sm">
              🧸
            </span>
            <span className="font-nunito text-2xl font-bold tracking-tight text-charcoal">
              Dua<span className="text-secondary-500">Lat</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <button
              onClick={() => selectCategoryAndNavigate(null)}
              className={`hover:text-primary-600 transition-colors py-2 px-1 cursor-pointer ${
                selectedCategory === null ? 'text-primary-600 border-b-2 border-primary-400 font-semibold' : 'text-gray-500'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('boys')}
              className={`hover:text-primary-600 transition-colors py-2 px-1 cursor-pointer ${
                selectedCategory === 'boys' ? 'text-primary-600 border-b-2 border-primary-400 font-semibold' : 'text-gray-500'
              }`}
            >
              Baby Boys
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('girls')}
              className={`hover:text-primary-600 transition-colors py-2 px-1 cursor-pointer ${
                selectedCategory === 'girls' ? 'text-primary-600 border-b-2 border-primary-400 font-semibold' : 'text-gray-500'
              }`}
            >
              Baby Girls
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('unisex')}
              className={`hover:text-primary-600 transition-colors py-2 px-1 cursor-pointer ${
                selectedCategory === 'unisex' ? 'text-primary-600 border-b-2 border-primary-400 font-semibold' : 'text-gray-500'
              }`}
            >
              Unisex Basics
            </button>
          </nav>

          {/* Search Bar - Autocomplete */}
          <div ref={searchRef} className="hidden sm:relative sm:block max-w-xs md:max-w-md w-full">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search soft cotton, rompers..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onFocus={() => localSearch.trim().length >= 2 && setShowSuggestions(true)}
                className="w-full rounded-2xl border-none bg-cream-200 py-2 pl-4 pr-10 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-400 text-charcoal transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500">
                <Search size={18} />
              </button>
            </form>

            {/* Smart Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl z-50 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 flex items-center gap-1">
                  <Sparkles size={12} className="text-primary-400" /> Smart Suggestions
                </div>
                <ul>
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => handleSuggestionClick(p.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-cream-100 rounded-xl transition-colors cursor-pointer"
                      >
                        <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-charcoal truncate">{p.name}</p>
                          <p className="text-xs text-gray-400 truncate">{p.fabricTags[0]} • ${p.salePrice ?? p.basePrice}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Cart & Menu Controls */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Cart Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 text-gray-600 hover:text-primary-500 hover:bg-cream-100 rounded-2xl transition-all cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-gray-600 hover:text-primary-500 hover:bg-cream-100 rounded-2xl transition-all md:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-cream-200 bg-white/95 backdrop-blur px-4 py-4 space-y-4 animate-fade-in shadow-inner">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search soft cotton, rompers..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded-2xl border-none bg-cream-100 py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-400 text-charcoal"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </button>
          </form>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => selectCategoryAndNavigate(null)}
              className="w-full text-left py-2 px-3 hover:bg-cream-100 rounded-xl transition-colors font-medium text-charcoal cursor-pointer"
            >
              Shop All
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('boys')}
              className="w-full text-left py-2 px-3 hover:bg-cream-100 rounded-xl transition-colors font-medium text-charcoal cursor-pointer"
            >
              Baby Boys
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('girls')}
              className="w-full text-left py-2 px-3 hover:bg-cream-100 rounded-xl transition-colors font-medium text-charcoal cursor-pointer"
            >
              Baby Girls
            </button>
            <button
              onClick={() => selectCategoryAndNavigate('unisex')}
              className="w-full text-left py-2 px-3 hover:bg-cream-100 rounded-xl transition-colors font-medium text-charcoal cursor-pointer"
            >
              Unisex Basics
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
