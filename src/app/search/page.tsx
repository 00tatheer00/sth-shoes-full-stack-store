'use client';

import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/data/mockData';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredProducts = query.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_PRODUCTS;

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      <div className="bg-[#1F130E] text-[#FAF7F2] py-16 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Live Catalog Search
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Search Tatheer Chappalz</h1>
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
              <input
                type="text"
                placeholder="Search Kaptan, Zalmi, Norozi, Suede, Calfskin..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full pl-12 pr-4 py-3 bg-[#FAF7F2] text-[#1F130E] text-sm font-serif border border-[#E2D7C7] focus:outline-none focus:border-[#C59B27]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-2 text-xs font-mono uppercase text-[#4A2E1D]">
          <span>
            {query.trim() ? `Found ${filteredProducts.length} results for "${query}"` : 'All Products Catalog'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
