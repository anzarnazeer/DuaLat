"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { AGE_GROUPS } from '@/lib/mockData';
import type { Product } from '@/lib/mockData';
import ProductCard from '@/components/ProductCard';
import { Filter, RotateCcw, X, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function ShopPage() {
  const {
    selectedAge,
    setAgeFilter,
    selectedCategory,
    setCategoryFilter,
    selectedCollection,
    setCollectionFilter,
    searchQuery,
    setSearchQuery,
    clearAllFilters,
  } = useShop();

  // Local filter states
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const materials = ['Organic Cotton', 'Muslin', 'Cotton Knit', 'Fleece', 'Textured Cotton', 'Comfort Fit', 'Breathable'];

  // CONCEPT: Fetch all products from the backend API when the page loads.
  // The empty dependency array [] means this runs once on mount, like componentDidMount.
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamically compute the highest price across products, defaulting to at least 2000
  const highestPrice = useMemo(() => {
    if (!allProducts.length) return 2000;
    const max = Math.max(...allProducts.map((p) => p.salePrice ?? p.basePrice));
    return Math.max(2000, Math.ceil(max / 100) * 100);
  }, [allProducts]);

  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: Product[]) => {
        if (Array.isArray(data)) {
          setAllProducts(data);
          if (data.length > 0) {
            const max = Math.max(...data.map((p) => p.salePrice ?? p.basePrice));
            const ceiling = Math.max(2000, Math.ceil(max / 100) * 100);
            setMaxPrice(ceiling);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load products:', err);
        setIsLoading(false);
      });
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // 1. Category Filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // 2. Collection Filter
      if (selectedCollection && product.collection !== selectedCollection) {
        return false;
      }

      // 3. Age/Size Filter
      if (selectedAge) {
        const hasSize = product.sizes?.some(
          (s) => s.size === selectedAge && s.stockCount > 0
        );
        if (!hasSize) return false;
      }

      // 4. Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(query);
        const matchesDesc = product.description?.toLowerCase().includes(query);
        const matchesTags = product.fabricTags?.some(t => t && t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // 5. Price Filter
      const price = product.salePrice ?? product.basePrice;
      if (price > maxPrice) {
        return false;
      }

      // 6. Material Filter
      if (selectedMaterial) {
        const tagMatch = product.fabricTags?.some(t => 
          t && t.toLowerCase().includes(selectedMaterial.toLowerCase())
        );
        if (!tagMatch) return false;
      }

      return true;
    });
  }, [allProducts, selectedCategory, selectedCollection, selectedAge, searchQuery, maxPrice, selectedMaterial]);

  // Sort products
  const sortedAndFilteredProducts = useMemo(() => {
    const result = [...filteredProducts];
    if (sortBy === 'price-asc') {
      result.sort((a, b) => (a.salePrice ?? a.basePrice) - (b.salePrice ?? b.basePrice));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => (b.salePrice ?? b.basePrice) - (a.salePrice ?? a.basePrice));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [filteredProducts, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedAge) count++;
    if (selectedCategory) count++;
    if (selectedCollection) count++;
    if (searchQuery) count++;
    if (maxPrice < highestPrice) count++;
    if (selectedMaterial) count++;
    return count;
  }, [selectedAge, selectedCategory, selectedCollection, searchQuery, maxPrice, highestPrice, selectedMaterial]);

  const resetAllLocalFilters = () => {
    clearAllFilters();
    setMaxPrice(highestPrice);
    setSelectedMaterial(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Breadcrumbs and Page Meta */}
      <div className="text-xs text-[#9496a2] font-semibold flex items-center gap-1.5 uppercase tracking-wider">
        <span className="hover:text-charcoal cursor-pointer" onClick={() => window.location.href = '/'}>Home</span>
        <span>/</span>
        <span className="text-[#282c3f] font-extrabold">Kids Wear</span>
      </div>

      {/* Top Banner and Search Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border border-cream-300 rounded shadow-xs">
        <div>
          <h1 className="font-assistant text-xl sm:text-2xl font-black text-charcoal uppercase tracking-wider">
            Kids Wear Collection
          </h1>
          <p className="text-[10px] text-gray-400 mt-0.5 font-bold uppercase tracking-wider">
            {isLoading ? 'Loading products...' : `Showing ${sortedAndFilteredProducts.length} of ${allProducts.length} fashion items`}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            placeholder="Search items, fabrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded bg-cream-200 py-2.5 pl-9 pr-4 text-xs focus:outline-none focus:bg-white border border-transparent focus:border-cream-300 placeholder-[#9496a2] text-charcoal font-medium transition-all"
          />
        </div>
      </div>

      {/* Filter and Sort bar */}
      <div className="flex justify-between items-center bg-white p-4 border border-cream-300 rounded shadow-xs lg:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#282c3f]"
        >
          <SlidersHorizontal size={14} className="text-primary-500" /> Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary-500 text-white px-1.5 py-0.5 rounded-full text-[9px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Mobile Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none bg-white border border-cream-300 rounded pl-3 pr-8 py-1.5 text-xs font-bold text-charcoal focus:outline-none"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
          </select>
          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 pr-4 border-r border-cream-300 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-cream-300">
            <h2 className="font-assistant text-xs font-extrabold tracking-widest text-[#282c3f] uppercase">
              Filters
            </h2>
            {activeFilterCount > 0 && (
              <button
                onClick={resetAllLocalFilters}
                className="text-[10px] font-extrabold uppercase tracking-widest text-primary-500 hover:text-primary-600 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw size={10} /> Clear All
              </button>
            )}
          </div>

          {/* Gender / Category Filter */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">Gender</h3>
            <div className="space-y-2">
              {[
                { label: 'Boys Wear', value: 'boys', comingSoon: true },
                { label: 'Girls Wear', value: 'girls', comingSoon: false },
                { label: 'Unisex Basics', value: 'unisex', comingSoon: true }
              ].map((item) => (
                <label key={item.value} className={`flex items-center gap-2.5 text-xs font-semibold ${item.comingSoon ? 'text-gray-400 cursor-not-allowed' : 'text-[#282c3f] cursor-pointer group'}`}>
                  <input
                    type="radio"
                    name="category-gender"
                    checked={selectedCategory === item.value}
                    onChange={() => { if (!item.comingSoon) setCategoryFilter(selectedCategory === item.value ? null : (item.value as any)) }}
                    disabled={item.comingSoon}
                    className={`accent-primary-500 h-3.5 w-3.5 border-cream-300 ${item.comingSoon ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  />
                  <span className={`${!item.comingSoon && 'group-hover:text-primary-500 transition-colors'}`}>{item.label}</span>
                  {item.comingSoon && <span className="text-[8px] bg-cream-200 text-gray-500 px-1 py-0.5 rounded-sm ml-auto">Coming Soon</span>}
                </label>
              ))}
            </div>
          </div>

          {/* Age / Sizes Grid (Checkbox style) */}
          <div className="space-y-3 pt-5 border-t border-cream-300">
            <h3 className="text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">Sizes By Age</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {AGE_GROUPS.map((age) => (
                <button
                  key={age.value}
                  onClick={() => setAgeFilter(selectedAge === age.value ? null : age.value)}
                  className={`text-[9px] font-bold py-1.5 rounded text-center transition-all cursor-pointer border ${
                    selectedAge === age.value
                      ? 'bg-primary-500 text-white border-primary-500 shadow-xs'
                      : 'bg-white text-charcoal border-cream-300 hover:bg-cream-200 hover:border-charcoal'
                  }`}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pt-5 border-t border-cream-300">
            <div className="flex justify-between items-center text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">
              <span>Max Price</span>
              <span className="text-primary-500 bg-primary-50 px-2 py-0.5 rounded border border-primary-100 font-extrabold">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max={highestPrice}
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-[8px] text-gray-400 font-bold px-1 uppercase tracking-wide">
              <span>₹100</span>
              <span>₹{highestPrice}</span>
            </div>
          </div>

          {/* Fabric Checkboxes */}
          <div className="space-y-3 pt-5 border-t border-cream-300">
            <h3 className="text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">Fabric Safety</h3>
            <div className="space-y-2">
              {materials.map((mat) => (
                <label key={mat} className="flex items-center gap-2.5 text-xs text-[#282c3f] font-semibold cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedMaterial === mat}
                    onChange={() => setSelectedMaterial(selectedMaterial === mat ? null : mat)}
                    className="accent-primary-500 h-3.5 w-3.5 border-cream-300 rounded cursor-pointer"
                  />
                  <span className="group-hover:text-primary-500 transition-colors">🌿 {mat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Collections Checkboxes */}
          <div className="space-y-3 pt-5 border-t border-cream-300">
            <h3 className="text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">Collections</h3>
            <div className="space-y-2">
              {[
                { label: 'Soft Loungewear', value: 'loungewear' },
                { label: 'Playground Proof', value: 'playground' },
                { label: 'Organic Basics', value: 'basics' }
              ].map((item) => (
                <label key={item.value} className="flex items-center gap-2.5 text-xs text-[#282c3f] font-semibold cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCollection === item.value}
                    onChange={() => setCollectionFilter(selectedCollection === item.value ? null : (item.value as any))}
                    className="accent-primary-500 h-3.5 w-3.5 border-cream-300 rounded cursor-pointer"
                  />
                  <span className="group-hover:text-primary-500 transition-colors">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Listing Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Desktop Sort Header */}
          <div className="hidden lg:flex justify-between items-center border-b border-[#e6e1d7] pb-3">
            <div className="text-[11px] font-bold text-[#8c8780] uppercase tracking-widest">
              Available sizes shown on card
            </div>
            
            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-[#e6e1d7] rounded-full pl-4 pr-10 py-2 text-xs font-bold text-[#242220] focus:outline-none focus:border-[#b85d68] cursor-pointer"
              >
                <option value="recommended">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c8780] pointer-events-none" />
            </div>
          </div>

          {/* Active Filter Removable Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span className="text-[10px] font-bold text-[#8c8780] uppercase tracking-wider">Active Filters:</span>
              {selectedCategory && (
                <button
                  onClick={() => setCategoryFilter(null)}
                  className="inline-flex items-center gap-1 bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-[#faeeec] transition-colors"
                >
                  Category: {selectedCategory} <X size={11} />
                </button>
              )}
              {selectedAge && (
                <button
                  onClick={() => setAgeFilter(null)}
                  className="inline-flex items-center gap-1 bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-[#faeeec] transition-colors"
                >
                  Age: {selectedAge} <X size={11} />
                </button>
              )}
              {selectedCollection && (
                <button
                  onClick={() => setCollectionFilter(null)}
                  className="inline-flex items-center gap-1 bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-[#faeeec] transition-colors"
                >
                  Collection: {selectedCollection} <X size={11} />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center gap-1 bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-[#faeeec] transition-colors"
                >
                  Search: &quot;{searchQuery}&quot; <X size={11} />
                </button>
              )}
              {maxPrice < highestPrice && (
                <button
                  onClick={() => setMaxPrice(highestPrice)}
                  className="inline-flex items-center gap-1 bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-[#faeeec] transition-colors"
                >
                  Max: ₹{maxPrice} <X size={11} />
                </button>
              )}
              {selectedMaterial && (
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="inline-flex items-center gap-1 bg-[#fdf8f7] text-[#b85d68] border border-[#f4dcda] px-2.5 py-1 rounded-full text-[11px] font-semibold hover:bg-[#faeeec] transition-colors"
                >
                  Fabric: {selectedMaterial} <X size={11} />
                </button>
              )}
              <button
                onClick={resetAllLocalFilters}
                className="text-xs font-bold text-[#8c8780] hover:text-[#b85d68] underline ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {sortedAndFilteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-[#e6e1d7] rounded-2xl">
              <span className="text-4xl mb-3">🌿</span>
              <h3 className="font-serif text-base font-bold text-[#242220]">No matching outfits found</h3>
              <p className="text-xs text-[#6b6661] mt-1 max-w-xs px-6 leading-relaxed">
                Try widening your price range, clearing size filters, or searching for broader terms.
              </p>
              <button
                onClick={resetAllLocalFilters}
                className="mt-5 bg-[#242220] hover:bg-[#b85d68] text-white text-xs font-bold px-6 py-2.5 rounded-full tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {sortedAndFilteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Collapsible Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden animate-fade-in">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Body */}
          <div className="relative z-50 w-full max-w-sm bg-white p-6 shadow-2xl flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between border-b border-cream-300 pb-3 mb-6">
              <h2 className="font-assistant text-sm font-black text-charcoal uppercase tracking-wider">
                Filter Catalog
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 hover:bg-cream-200 rounded text-charcoal cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 flex-1 pb-20">
              {/* Category */}
              <div className="space-y-3">
                  <h3 className="text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">Gender</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Boys Wear', value: 'boys', comingSoon: true },
                      { label: 'Girls Wear', value: 'girls', comingSoon: false },
                      { label: 'Unisex Basics', value: 'unisex', comingSoon: true }
                    ].map((item) => (
                      <label key={item.value} className={`flex items-center gap-2.5 text-xs font-semibold ${item.comingSoon ? 'text-gray-400 cursor-not-allowed' : 'text-[#282c3f] cursor-pointer group'}`}>
                        <input
                          type="radio"
                          name="mobile-category-gender"
                          checked={selectedCategory === item.value}
                          onChange={() => { if (!item.comingSoon) setCategoryFilter(selectedCategory === item.value ? null : (item.value as any)) }}
                          disabled={item.comingSoon}
                          className={`accent-primary-500 h-4 w-4 border-cream-300 ${item.comingSoon ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        />
                        <span className={`${!item.comingSoon && 'group-hover:text-primary-500 transition-colors'}`}>{item.label}</span>
                        {item.comingSoon && <span className="text-[8px] bg-cream-200 text-gray-500 px-1 py-0.5 rounded-sm ml-auto">Coming Soon</span>}
                      </label>
                    ))}
                  </div>
                </div>

              {/* Sizes */}
              <div className="space-y-3 border-t border-cream-300 pt-5">
                <h3 className="text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">Sizes By Age</h3>
                <div className="grid grid-cols-3 gap-1.5">
                  {AGE_GROUPS.map((age) => (
                    <button
                      key={age.value}
                      onClick={() => setAgeFilter(selectedAge === age.value ? null : age.value)}
                      className={`text-[9px] font-bold py-1.5 rounded text-center transition-all cursor-pointer border ${
                        selectedAge === age.value
                          ? 'bg-primary-500 text-white border-primary-500 shadow-xs'
                          : 'bg-white text-charcoal border-cream-300'
                      }`}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-3 border-t border-cream-300 pt-5">
                <div className="flex justify-between items-center text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">
                  <span>Max Price</span>
                  <span className="text-primary-500 bg-primary-50 px-2 py-0.5 rounded font-extrabold">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max={highestPrice}
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-[8px] text-gray-400 font-bold px-1 uppercase tracking-wide">
                  <span>₹100</span>
                  <span>₹{highestPrice}</span>
                </div>
              </div>

              {/* Fabric */}
              <div className="space-y-3 border-t border-cream-300 pt-5">
                <h3 className="text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">Fabric Safety</h3>
                <div className="space-y-2">
                  {materials.map((mat) => (
                    <label key={mat} className="flex items-center gap-2.5 text-xs text-[#282c3f] font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMaterial === mat}
                        onChange={() => setSelectedMaterial(selectedMaterial === mat ? null : mat)}
                        className="accent-primary-500 h-3.5 w-3.5 border-cream-300 rounded cursor-pointer"
                      />
                      <span>🌿 {mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Collections */}
              <div className="space-y-3 border-t border-cream-300 pt-5">
                <h3 className="text-[10px] font-extrabold text-[#282c3f] uppercase tracking-wider">Collections</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Soft Loungewear', value: 'loungewear' },
                    { label: 'Playground Proof', value: 'playground' },
                    { label: 'Organic Basics', value: 'basics' }
                  ].map((item) => (
                    <label key={item.value} className="flex items-center gap-2.5 text-xs text-[#282c3f] font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCollection === item.value}
                        onChange={() => setCollectionFilter(selectedCollection === item.value ? null : (item.value as any))}
                        className="accent-primary-500 h-3.5 w-3.5 border-cream-300 rounded cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Actions Drawer Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-cream-300 flex gap-4">
              <button
                onClick={() => {
                  resetAllLocalFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 py-3 text-center border border-cream-300 rounded text-xs font-bold text-gray-500 cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 text-center bg-[#282c3f] hover:bg-primary-500 text-white rounded text-xs font-bold shadow-md cursor-pointer transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

