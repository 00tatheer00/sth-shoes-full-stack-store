'use client';

import React from 'react';
import { X, Filter } from 'lucide-react';
import { FilterSidebar, FilterState } from './FilterSidebar';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  resultCount: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  resetFilters,
  resultCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden font-sans">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-slate-50 rounded-t-2xl shadow-2xl overflow-y-auto flex flex-col border-t border-slate-200 animate-in slide-in-from-bottom duration-300">
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Filter Catalog ({resultCount})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          <FilterSidebar filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
        </div>

        {/* Sticky Apply Button */}
        <div className="sticky bottom-0 p-4 bg-white border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl text-center shadow-xs transition-colors cursor-pointer"
          >
            Show {resultCount} Products
          </button>
        </div>
      </div>
    </div>
  );
};
