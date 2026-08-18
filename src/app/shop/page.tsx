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
  }, [filters, sortBy]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#0D3325] text-white py-14 md:py-20 border-b border-[#082419] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C] block">
            ALL FOOTWEAR CATALOG
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Shop Peshawari Chappals
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto font-light">
            Handcrafted in Namak Mandi, Peshawar from full-grain leathers & durable tire soles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Utility Bar */}
        <div className="bg-white border border-[#EAE3D5] rounded-lg p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
            <input
              type="text"
              placeholder="Search catalog by name or keyword..."
              value={filters.search}
              onChange={(e) => {
                setFilters((f) => ({ ...f, search: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs focus:outline-none focus:border-[#0D3325]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden btn-forest text-[10px] py-2 px-3 flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#E5A93C]" />
              Filters ({filteredProducts.length})
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs text-[#1C1917]">
              <ArrowUpDown className="w-4 h-4 text-[#0D3325] hidden sm:inline" />
              <span className="hidden sm:inline font-mono uppercase text-[10px] text-[#5A6578] font-bold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF6EF] border border-[#EAE3D5] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0D3325]"
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
          <div className="hidden lg:block lg:col-span-1 bg-white border border-[#EAE3D5] rounded-lg p-6 self-start shadow-xs">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between text-xs text-[#5A6578] font-mono uppercase tracking-wider border-b border-[#EAE3D5] pb-2.5">
              <span>Showing {paginatedProducts.length} of {filteredProducts.length} Products</span>
              {filteredProducts.length < MOCK_PRODUCTS.length && (
                <button onClick={resetFilters} className="text-[#0D3325] hover:underline font-bold">
                  Clear All Filters
                </button>
              )}
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="p-14 text-center bg-white border border-[#EAE3D5] rounded-lg space-y-4 shadow-xs">
                <h3 className="text-lg font-serif font-bold text-[#1C1917]">No products match your filters</h3>
                <p className="text-xs text-[#5A6578]">
                  Try clearing your search query or selecting a different size or color.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-forest py-2.5 px-6 text-xs"
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
                  className="px-4 py-2 bg-white border border-[#EAE3D5] rounded text-xs font-bold text-[#1C1917] disabled:opacity-40 hover:border-[#0D3325]"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 text-xs font-mono font-bold rounded transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[#0D3325] text-white'
                          : 'bg-white text-[#1C1917] border border-[#EAE3D5] hover:border-[#0D3325]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 bg-white border border-[#EAE3D5] rounded text-xs font-bold text-[#1C1917] disabled:opacity-40 hover:border-[#0D3325]"
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
