'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPKR } from '@/lib/utils';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularTags = ['Kaptaan Double Sole', 'Zalmi Suede', 'Norozi Maroon', 'Royal Calfskin', 'Black Chappal'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 md:p-10 flex items-start justify-center font-sans">
      <div className="max-w-3xl w-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden mt-10">
        {/* Search Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center gap-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-blue-400" />
          <input
            type="text"
            placeholder="Search Kaptaan, Zalmi, Norozi, Calfskin..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-base sm:text-lg font-medium text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Popular Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-white hover:bg-slate-900 hover:text-white text-xs text-slate-700 border border-slate-200 rounded-full transition-colors font-medium shadow-2xs cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-slate-500">
              <p className="text-sm">Type a query above to search our handcrafted footwear collection.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-base font-bold text-slate-900">No products found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for 'Kaptaan', 'Zalmi', 'Norozi', or 'Tan'.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
                Found {filteredProducts.length} results
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex gap-3.5 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-600 transition-all group shadow-2xs"
                  >
                    <div className="relative w-16 h-16 bg-slate-50 rounded-lg border border-slate-200 flex-shrink-0 overflow-hidden">
                      <Image
                        src={product.featuredImage}
                        alt={product.name}
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">{product.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold font-mono text-slate-900">
                          {formatPKR(product.salePrice ?? product.price)}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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
