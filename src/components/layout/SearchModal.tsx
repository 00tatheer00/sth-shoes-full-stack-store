'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularTags = ['Kaptan Double Sole', 'Zalmi Suede', 'Norozi Maroon', 'Royal Calfskin', 'Black Chappal'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md p-4 sm:p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-[#FAF7F2] border border-[#E2D7C7] shadow-2xl overflow-hidden mt-10">
        {/* Search Bar Input Header */}
        <div className="p-4 sm:p-6 bg-[#1F130E] text-[#FAF7F2] flex items-center gap-4 border-b border-[#3A2315]">
          <Search className="w-6 h-6 text-[#C59B27]" />
          <input
            type="text"
            placeholder="Search Kaptan, Zalmi, Norozi, Calfskin..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-lg font-serif text-[#FAF7F2] placeholder-[#E2D7C7]/50 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#E2D7C7] hover:text-[#C59B27] transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="p-4 sm:p-6 bg-[#EAE3D2] border-b border-[#E2D7C7]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4A2E1D] mb-2 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#B87546]" />
            <span>Popular Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-white hover:bg-[#4A2E1D] hover:text-[#FAF7F2] text-xs text-[#1F130E] border border-[#E2D7C7] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-[#4A2E1D]/60">
              <p className="text-sm font-serif">Type a query above to search our handcrafted footwear collection.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-base font-serif text-[#1F130E]">No products found for "{query}"</p>
              <p className="text-xs text-[#4A2E1D]/70 mt-1">
                Try searching for 'Kaptan', 'Zalmi', 'Norozi', or 'Tan'.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase text-[#4A2E1D]/70 tracking-wider">
                Found {filteredProducts.length} results
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex gap-3 p-3 bg-white border border-[#E2D7C7] hover:border-[#B87546] transition-all group"
                  >
                    <div className="relative w-16 h-16 bg-[#FAF7F2] border border-[#E2D7C7] flex-shrink-0">
                      <Image
                        src={product.featuredImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-serif font-semibold text-[#1F130E] group-hover:text-[#B87546] transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-[#4A2E1D]/60">{product.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-serif font-bold text-[#1F130E]">
                          {formatPKR(product.salePrice ?? product.price)}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B87546] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
