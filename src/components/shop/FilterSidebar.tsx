'use client';

import React from 'react';
import { RotateCcw, Filter, Check } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/data/mockData';

export interface FilterState {
  category: string;
  size: number | null;
  color: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  search: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  resetFilters,
}) => {
  const sizes = [39, 40, 41, 42, 43, 44, 45, 46];

  const colors = [
    { name: 'Dark Chocolate', hex: '#27170B' },
    { name: 'Camel Tan', hex: '#C18C5D' },
    { name: 'Heritage Black', hex: '#121212' },
    { name: 'Heritage Maroon', hex: '#58181A' },
    { name: 'Atelier Tan', hex: '#B87333' },
  ];

  return (
    <aside className="w-full space-y-6 text-[#1F130E]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-3">
        <div className="flex items-center gap-2 text-sm font-serif font-bold uppercase tracking-wider">
          <Filter className="w-4 h-4 text-[#B87546]" />
          <span>Refine Selection</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-[#B87546] hover:underline flex items-center gap-1 font-mono"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2 border-b border-[#E2D7C7] pb-5">
        <h4 className="text-xs font-mono uppercase tracking-widest text-[#4A2E1D] font-bold">
          Categories
        </h4>
        <div className="space-y-1.5 pt-1">
          <button
            onClick={() => setFilters((f) => ({ ...f, category: 'all' }))}
            className={`w-full text-left px-2.5 py-1.5 text-xs font-serif flex items-center justify-between transition-colors ${
              filters.category === 'all'
                ? 'bg-[#1F130E] text-[#C59B27] font-semibold'
                : 'hover:bg-[#EAE3D2] text-[#1F130E]'
            }`}
          >
            <span>All Collections</span>
          </button>
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters((f) => ({ ...f, category: cat.slug }))}
              className={`w-full text-left px-2.5 py-1.5 text-xs font-serif flex items-center justify-between transition-colors ${
                filters.category === cat.slug
                  ? 'bg-[#1F130E] text-[#C59B27] font-semibold'
                  : 'hover:bg-[#EAE3D2] text-[#1F130E]'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] font-mono text-[#4A2E1D]/60">({cat.itemCount})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2 border-b border-[#E2D7C7] pb-5">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#4A2E1D] font-bold">
            Size (EU)
          </h4>
          {filters.size && (
            <button
              onClick={() => setFilters((f) => ({ ...f, size: null }))}
              className="text-[10px] text-[#B87546]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2 pt-1">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() =>
                setFilters((f) => ({ ...f, size: f.size === s ? null : s }))
              }
              className={`py-2 text-xs font-mono border transition-all ${
                filters.size === s
                  ? 'bg-[#4A2E1D] text-[#FAF7F2] border-[#1F130E] font-bold'
                  : 'bg-white text-[#1F130E] border-[#E2D7C7] hover:border-[#B87546]'
              }`}
            >
              EU {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-2 border-b border-[#E2D7C7] pb-5">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#4A2E1D] font-bold">
            Leather Shade
          </h4>
          {filters.color && (
            <button
              onClick={() => setFilters((f) => ({ ...f, color: '' }))}
              className="text-[10px] text-[#B87546]"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1.5 pt-1">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() =>
                setFilters((f) => ({ ...f, color: f.color === c.name ? '' : c.name }))
              }
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-serif transition-colors border ${
                filters.color === c.name
                  ? 'bg-[#1F130E] text-[#FAF7F2] border-[#1F130E]'
                  : 'bg-white text-[#1F130E] border-[#E2D7C7] hover:border-[#B87546]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-gray-400"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </div>
              {filters.color === c.name && <Check className="w-3.5 h-3.5 text-[#C59B27]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 border-b border-[#E2D7C7] pb-5">
        <h4 className="text-xs font-mono uppercase tracking-widest text-[#4A2E1D] font-bold">
          Price Range (PKR)
        </h4>
        <div className="flex items-center justify-between text-xs font-mono text-[#1F130E]">
          <span>Rs. {filters.minPrice.toLocaleString()}</span>
          <span>Rs. {filters.maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={8000}
          max={20000}
          step={500}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-[#4A2E1D]"
        />
      </div>

      {/* In Stock Only */}
      <div className="pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-serif text-[#1F130E]">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))
            }
            className="w-4 h-4 accent-[#4A2E1D]"
          />
          <span>In Stock Items Only</span>
        </label>
      </div>
    </aside>
  );
};
