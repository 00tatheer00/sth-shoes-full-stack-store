'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar, FilterState } from '@/components/shop/FilterSidebar';
import { MobileFilterDrawer } from '@/components/shop/MobileFilterDrawer';
import { MOCK_PRODUCTS } from '@/data/mockData';

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    size: null,
    color: '',
    minPrice: 8000,
    maxPrice: 20000,
    inStockOnly: false,
    search: '',
  });

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const resetFilters = () => {
    setFilters({
      category: 'all',
      size: null,
      color: '',
      minPrice: 8000,
      maxPrice: 20000,
      inStockOnly: false,
      search: '',
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Category
      if (filters.category !== 'all' && product.categorySlug !== filters.category) {
        return false;
      }
      // Search
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.category.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      // Size
      if (filters.size) {
        const hasSize = product.sizes.some(
          (s) => s.size === filters.size && (!filters.inStockOnly || s.inStock)
        );
        if (!hasSize) return false;
      }
      // Color
      if (filters.color) {
        const hasColor = product.colors.some(
          (c) => c.name.toLowerCase() === filters.color.toLowerCase()
        );
        if (!hasColor) return false;
      }
      // Price
      const effectivePrice = product.salePrice ?? product.price;
      if (effectivePrice < filters.minPrice || effectivePrice > filters.maxPrice) {
        return false;
      }
      // Stock
      if (filters.inStockOnly) {
        const anyInStock = product.sizes.some((s) => s.inStock);
        if (!anyInStock) return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [filters, sortBy]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#1F130E] text-[#FAF7F2] py-12 md:py-16 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> All Footwear Catalog
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#FAF7F2]">
            Shop Peshawari Chappals
          </h1>
          <p className="text-xs sm:text-sm text-[#E2D7C7]/80 max-w-xl mx-auto font-sans font-light">
            Handcrafted in Namak Mandi, Peshawar from full-grain leathers & durable tire soles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Utility Bar */}
        <div className="bg-white border border-[#E2D7C7] p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
            <input
              type="text"
              placeholder="Search catalog by name or keyword..."
              value={filters.search}
              onChange={(e) => {
                setFilters((f) => ({ ...f, search: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden px-4 py-2 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider flex items-center gap-2 border border-[#3A2315]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C59B27]" />
              Filters ({filteredProducts.length})
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs font-serif text-[#1F130E]">
              <ArrowUpDown className="w-4 h-4 text-[#B87546] hidden sm:inline" />
              <span className="hidden sm:inline font-mono uppercase text-[11px] text-[#4A2E1D]/70">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF7F2] border border-[#E2D7C7] px-3 py-2 text-xs font-serif focus:outline-none focus:border-[#B87546]"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 bg-white border border-[#E2D7C7] p-6 self-start shadow-xs">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between text-xs text-[#4A2E1D]/70 font-mono uppercase tracking-wider border-b border-[#E2D7C7] pb-2">
              <span>Showing {paginatedProducts.length} of {filteredProducts.length} Products</span>
              {filteredProducts.length < MOCK_PRODUCTS.length && (
                <button onClick={resetFilters} className="text-[#B87546] hover:underline">
                  Clear All Filters
                </button>
              )}
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="p-12 text-center bg-white border border-[#E2D7C7] space-y-4">
                <h3 className="text-lg font-serif text-[#1F130E]">No products match your filters</h3>
                <p className="text-xs text-[#4A2E1D]/70">
                  Try clearing your search query or selecting a different size or color.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider hover:bg-[#1F130E] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 pt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 bg-white border border-[#E2D7C7] text-xs font-serif text-[#1F130E] disabled:opacity-40 hover:border-[#B87546]"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 text-xs font-mono font-bold border transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[#1F130E] text-[#C59B27] border-[#1F130E]'
                          : 'bg-white text-[#1F130E] border-[#E2D7C7] hover:border-[#B87546]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 bg-white border border-[#E2D7C7] text-xs font-serif text-[#1F130E] disabled:opacity-40 hover:border-[#B87546]"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileFilterDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        resultCount={filteredProducts.length}
      />
    </div>
  );
}
