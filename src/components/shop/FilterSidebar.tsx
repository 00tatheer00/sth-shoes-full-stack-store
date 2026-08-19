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
    <aside className="w-full space-y-6 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filters</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Categories
        </h4>
        <div className="space-y-1 pt-1">
          <button
            onClick={() => setFilters((f) => ({ ...f, category: 'all' }))}
            className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
              filters.category === 'all'
                ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <span>All Collections</span>
          </button>
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters((f) => ({ ...f, category: cat.slug }))}
              className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                filters.category === cat.slug
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] font-mono ${filters.category === cat.slug ? 'text-slate-300' : 'text-slate-400'}`}>
                ({cat.itemCount})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Size (EU)
          </h4>
          {filters.size && (
            <button
              onClick={() => setFilters((f) => ({ ...f, size: null }))}
              className="text-[11px] text-blue-600 font-medium cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() =>
                setFilters((f) => ({ ...f, size: f.size === s ? null : s }))
              }
              className={`py-2 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                filters.size === s
                  ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-2xs'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
              }`}
            >
              EU {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Color
          </h4>
          {filters.color && (
            <button
              onClick={() => setFilters((f) => ({ ...f, color: '' }))}
              className="text-[11px] text-blue-600 font-medium cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1 pt-1">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() =>
                setFilters((f) => ({ ...f, color: f.color === c.name ? '' : c.name }))
              }
              className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors border cursor-pointer ${
                filters.color === c.name
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-slate-300"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </div>
              {filters.color === c.name && <Check className="w-3.5 h-3.5 text-blue-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 border-b border-slate-100 pb-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Price Range (PKR)
        </h4>
        <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-800">
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
          className="w-full accent-slate-900 cursor-pointer"
        />
      </div>

      {/* In Stock Only */}
      <div className="pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-800">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))
            }
            className="w-4 h-4 rounded text-slate-900 accent-slate-900"
          />
          <span>In Stock Items Only</span>
        </label>
      </div>
    </aside>
  );
};
