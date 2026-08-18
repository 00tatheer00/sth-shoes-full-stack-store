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

  const popularTags = ['Kaptaan Double Sole', 'Zalmi Suede', 'Norozi Maroon', 'Royal Calfskin', 'Black Chappal'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs p-4 sm:p-6 md:p-10 flex items-start justify-center">
      <div className="max-w-3xl w-full bg-white border border-[#EAE3D5] rounded-xl shadow-2xl overflow-hidden mt-10">
        {/* Search Header */}
        <div className="p-5 sm:p-6 bg-[#0D3325] text-white flex items-center gap-4 border-b border-[#082419]">
          <Search className="w-5 h-5 text-[#E5A93C]" />
          <input
            type="text"
            placeholder="Search Kaptaan, Zalmi, Norozi, Calfskin..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-base sm:text-lg font-serif text-white placeholder-white/60 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-white/80 hover:text-[#E5A93C] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="p-4 sm:p-5 bg-[#FAF6EF] border-b border-[#EAE3D5]">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#0D3325] mb-2 uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Popular Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-white hover:bg-[#0D3325] hover:text-white text-xs text-[#1C1917] border border-[#EAE3D5] rounded-full transition-colors font-medium shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-[#5A6578]">
              <p className="text-sm font-serif">Type a query above to search our handcrafted footwear collection.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-base font-serif text-[#1C1917]">No products found for "{query}"</p>
              <p className="text-xs text-[#5A6578] mt-1">
                Try searching for 'Kaptaan', 'Zalmi', 'Norozi', or 'Tan'.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase text-[#0D3325] tracking-wider font-bold">
                Found {filteredProducts.length} results
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex gap-3.5 p-3 bg-white border border-[#EAE3D5] rounded-md hover:border-[#0D3325] transition-all group shadow-2xs"
                  >
                    <div className="relative w-16 h-16 bg-[#FAF6EF] rounded border border-[#EAE3D5] flex-shrink-0 overflow-hidden">
                      <Image
                        src={product.featuredImage}
                        alt={product.name}
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-serif font-bold text-[#1C1917] group-hover:text-[#0D3325] transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-[#5A6578]">{product.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold text-[#1C1917]">
                          {formatPKR(product.salePrice ?? product.price)}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0D3325] opacity-0 group-hover:opacity-100 transition-opacity" />
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
