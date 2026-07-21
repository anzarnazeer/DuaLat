"use client";

import React, { useState, useMemo } from 'react';
import { useShop } from '@/context/ShopContext';
import { MOCK_PRODUCTS, AGE_GROUPS } from '@/lib/mockData';
import ProductCard from '@/components/ProductCard';
import { Filter, RotateCcw, X, Search, SlidersHorizontal } from 'lucide-react';

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
  const [maxPrice, setMaxPrice] = useState<number>(60);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available unique materials gathered from tags
  const materials = ['Organic Cotton', 'Muslin', 'Cotton Knit', 'Fleece'];

  // Filter products based on search, age/size, category, collection, price, material
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
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
        const hasSize = product.sizes.some(
          (s) => s.size === selectedAge && s.stockCount > 0
        );
        if (!hasSize) return false;
      }

      // 4. Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTags = product.fabricTags.some(t => t.toLowerCase().includes(query));
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
        const tagMatch = product.fabricTags.some(t => 
          t.toLowerCase().includes(selectedMaterial.toLowerCase())
        );
        if (!tagMatch) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedCollection, selectedAge, searchQuery, maxPrice, selectedMaterial]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedAge) count++;
    if (selectedCategory) count++;
    if (selectedCollection) count++;
    if (searchQuery) count++;
    if (maxPrice < 60) count++;
    if (selectedMaterial) count++;
    return count;
  }, [selectedAge, selectedCategory, selectedCollection, searchQuery, maxPrice, selectedMaterial]);

  const resetAllLocalFilters = () => {
    clearAllFilters();
    setMaxPrice(60);
    setSelectedMaterial(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-cream-200 shadow-sm">
        <div>
          <h1 className="font-nunito text-2xl sm:text-3xl font-black text-charcoal flex items-center gap-2">
            🌱 Kids' Wear Collection
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-semibold">
            Showing {filteredProducts.length} of {MOCK_PRODUCTS.length} cozy products
          </p>
        </div>

        {/* Local Search input */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border-none bg-cream-100 py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder-gray-400 text-charcoal"
          />
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-cream-200 h-fit sticky top-24 shadow-sm">
          <div className="flex items-center justify-between border-b border-cream-100 pb-3">
            <h2 className="font-nunito text-base font-bold text-charcoal flex items-center gap-2">
              <Filter size={18} className="text-primary-500" /> Filters
              {activeFilterCount > 0 && (
                <span className="text-[10px] bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full font-bold">
                  {activeFilterCount}
                </span>
              )}
            </h2>
            {activeFilterCount > 0 && (
              <button
                onClick={resetAllLocalFilters}
                className="text-xs font-bold text-gray-400 hover:text-primary-500 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw size={12} /> Clear
              </button>
            )}
          </div>

          {/* Age/Size Filter (Primary) */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">Sizes (By Age)</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {AGE_GROUPS.map((age) => (
                <button
                  key={age.value}
                  onClick={() => setAgeFilter(selectedAge === age.value ? null : age.value)}
                  className={`text-[10px] font-bold py-2 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedAge === age.value
                      ? 'bg-primary-500 text-white border-primary-500 shadow-sm scale-102'
                      : 'bg-cream-50 text-charcoal border-cream-200/50 hover:bg-cream-100 hover:border-primary-300'
                  }`}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2 border-t border-cream-100 pt-4">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">Category</h3>
            <div className="space-y-1.5">
              {['boys', 'girls', 'unisex'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(selectedCategory === cat ? null : (cat as any))}
                  className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl border capitalize transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-secondary-500 text-white border-secondary-500 shadow-xs'
                      : 'bg-cream-50 text-charcoal border-cream-200/50 hover:bg-cream-100 hover:border-secondary-300'
                  }`}
                >
                  Baby {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 border-t border-cream-100 pt-4">
            <div className="flex justify-between items-center text-xs font-bold text-charcoal">
              <span className="uppercase tracking-wider">Max Price</span>
              <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded-lg border border-primary-100 font-extrabold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              step="2"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-bold px-1">
              <span>$20</span>
              <span>$60</span>
            </div>
          </div>

          {/* Material Transparency Filter */}
          <div className="space-y-2 border-t border-cream-100 pt-4">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">Fabric Safety</h3>
            <div className="space-y-1.5">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(selectedMaterial === mat ? null : mat)}
                  className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                    selectedMaterial === mat
                      ? 'bg-accent-500 text-white border-accent-500 shadow-xs'
                      : 'bg-cream-50 text-charcoal border-cream-200/50 hover:bg-cream-100 hover:border-accent-300'
                  }`}
                >
                  🌿 {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Collection Filter */}
          <div className="space-y-2 border-t border-cream-100 pt-4">
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">Collections</h3>
            <div className="space-y-1.5">
              {['loungewear', 'playground', 'basics'].map((col) => (
                <button
                  key={col}
                  onClick={() => setCollectionFilter(selectedCollection === col ? null : (col as any))}
                  className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl border capitalize transition-all cursor-pointer ${
                    selectedCollection === col
                      ? 'bg-primary-500 text-white border-primary-500 shadow-xs'
                      : 'bg-cream-50 text-charcoal border-cream-200/50 hover:bg-cream-100 hover:border-primary-300'
                  }`}
                >
                  {col === 'basics' ? 'Organic Basics' : col === 'playground' ? 'Playground Proof' : 'Soft Loungewear'}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-cream-200 rounded-3xl shadow-sm">
              <span className="text-6xl mb-4 animate-bounce">🔍</span>
              <h3 className="font-nunito text-lg font-bold text-charcoal">No products match your criteria</h3>
              <p className="text-sm text-gray-400 mt-1 max-w-sm px-6 leading-relaxed">
                Try widening your price range, removing age constraints, or searching for other safety keywords.
              </p>
              <button
                onClick={resetAllLocalFilters}
                className="mt-6 inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Floating Filter Button for Mobile Screen */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30 lg:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-charcoal text-white font-bold py-3 px-6 rounded-full shadow-xl hover:scale-105 transition-transform cursor-pointer"
        >
          <SlidersHorizontal size={18} className="text-primary-400" /> Filter & Sort
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Collapsible Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel */}
          <div className="relative z-50 w-full max-w-sm bg-white p-6 shadow-2xl flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between border-b border-cream-100 pb-3 mb-6">
              <h2 className="font-nunito text-lg font-bold text-charcoal flex items-center gap-2">
                Filter Wearables
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-cream-100 rounded-xl text-gray-400 hover:text-charcoal cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 flex-1 pb-20">
              {/* Age / Sizes */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">Sizes (By Age)</h3>
                <div className="grid grid-cols-3 gap-1.5">
                  {AGE_GROUPS.map((age) => (
                    <button
                      key={age.value}
                      onClick={() => setAgeFilter(selectedAge === age.value ? null : age.value)}
                      className={`text-[10px] font-bold py-2 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedAge === age.value
                          ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                          : 'bg-cream-50 text-charcoal border-cream-200/50 hover:bg-cream-100'
                      }`}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2 border-t border-cream-100 pt-4">
                <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">Category</h3>
                <div className="space-y-1.5">
                  {['boys', 'girls', 'unisex'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(selectedCategory === cat ? null : (cat as any))}
                      className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl border capitalize transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-secondary-500 text-white border-secondary-500'
                          : 'bg-cream-50 text-charcoal border-cream-200/50 hover:bg-cream-100'
                      }`}
                    >
                      Baby {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 border-t border-cream-100 pt-4">
                <div className="flex justify-between items-center text-xs font-bold text-charcoal">
                  <span className="uppercase tracking-wider">Max Price</span>
                  <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded-lg font-extrabold">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="2"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
              </div>

              {/* Material */}
              <div className="space-y-2 border-t border-cream-100 pt-4">
                <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">Fabric Safety</h3>
                <div className="space-y-1.5">
                  {materials.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(selectedMaterial === mat ? null : mat)}
                      className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                        selectedMaterial === mat
                          ? 'bg-accent-500 text-white border-accent-500'
                          : 'bg-cream-50 text-charcoal border-cream-200/50 hover:bg-cream-100'
                      }`}
                    >
                      🌿 {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collections */}
              <div className="space-y-2 border-t border-cream-100 pt-4">
                <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">Collections</h3>
                <div className="space-y-1.5">
                  {['loungewear', 'playground', 'basics'].map((col) => (
                    <button
                      key={col}
                      onClick={() => setCollectionFilter(selectedCollection === col ? null : (col as any))}
                      className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl border capitalize transition-all cursor-pointer ${
                        selectedCollection === col
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-cream-50 text-charcoal border-cream-200/50 hover:bg-cream-100'
                      }`}
                    >
                      {col === 'basics' ? 'Organic Basics' : col === 'playground' ? 'Playground Proof' : 'Soft Loungewear'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Actions Drawer Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-cream-100 flex gap-4">
              <button
                onClick={() => {
                  resetAllLocalFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 py-3 text-center border border-cream-200 rounded-2xl text-xs font-bold text-gray-500 cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 text-center bg-primary-500 hover:bg-primary-600 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer"
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
