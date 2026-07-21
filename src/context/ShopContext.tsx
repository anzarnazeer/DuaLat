"use client";

import React, { createContext, useContext, useState } from 'react';

interface ShopContextType {
  selectedAge: string | null;
  selectedCategory: 'boys' | 'girls' | 'unisex' | null;
  selectedCollection: 'loungewear' | 'playground' | 'basics' | null;
  searchQuery: string;
  setAgeFilter: (age: string | null) => void;
  setCategoryFilter: (category: 'boys' | 'girls' | 'unisex' | null) => void;
  setCollectionFilter: (collection: 'loungewear' | 'playground' | 'basics' | null) => void;
  setSearchQuery: (query: string) => void;
  clearAllFilters: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'boys' | 'girls' | 'unisex' | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<'loungewear' | 'playground' | 'basics' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const setAgeFilter = (age: string | null) => {
    setSelectedAge(age);
  };

  const setCategoryFilter = (category: 'boys' | 'girls' | 'unisex' | null) => {
    setSelectedCategory(category);
  };

  const setCollectionFilter = (collection: 'loungewear' | 'playground' | 'basics' | null) => {
    setSelectedCollection(collection);
  };

  const clearAllFilters = () => {
    setSelectedAge(null);
    setSelectedCategory(null);
    setSelectedCollection(null);
    setSearchQuery('');
  };

  return (
    <ShopContext.Provider
      value={{
        selectedAge,
        selectedCategory,
        selectedCollection,
        searchQuery,
        setAgeFilter,
        setCategoryFilter,
        setCollectionFilter,
        setSearchQuery,
        clearAllFilters
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
