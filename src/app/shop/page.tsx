'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar, FilterState } from '@/components/shop/FilterSidebar';
import { MobileFilterDrawer } from '@/components/shop/MobileFilterDrawer';
import { useStore } from '@/context/StoreContext';
import { MOCK_PRODUCTS } from '@/data/mockData';

export default function ShopPage() {
  const { products: storeProducts } = useStore();
  const allAvailableProducts = storeProducts && storeProducts.length > 0 ? storeProducts : MOCK_PRODUCTS;

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
    return allAvailableProducts.filter((product) => {
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
  }, [allAvailableProducts, filters, sortBy]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-14 md:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block">
            FOOTWEAR CATALOG
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Shop Peshawari Chappals
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Handcrafted in Namak Mandi, Peshawar from full-grain leathers & durable tire soles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Utility Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search catalog by name or keyword..."
              value={filters.search}
              onChange={(e) => {
                setFilters((f) => ({ ...f, search: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
              Filters ({filteredProducts.length})
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:inline" />
              <span className="hidden sm:inline font-semibold text-slate-500 uppercase text-[11px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
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
          <div className="hidden lg:block lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 self-start shadow-2xs">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-2.5">
              <span>Showing {paginatedProducts.length} of {filteredProducts.length} Products</span>
              {filteredProducts.length < allAvailableProducts.length && (
                <button onClick={resetFilters} className="text-blue-600 hover:underline font-semibold cursor-pointer">
                  Clear All Filters
                </button>
              )}
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="p-14 text-center bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
                <h3 className="text-base font-bold text-slate-900">No products match your filters</h3>
                <p className="text-xs text-slate-500">
                  Try clearing your search query or selecting a different size or color.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
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
