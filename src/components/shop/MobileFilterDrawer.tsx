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
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-[#FAF7F2] rounded-t-2xl shadow-2xl overflow-y-auto flex flex-col border-t border-[#E2D7C7] animate-in slide-in-from-bottom duration-300">
        {/* Drawer Drag handle & Header */}
        <div className="sticky top-0 z-10 bg-[#1F130E] text-[#FAF7F2] p-4 flex items-center justify-between border-b border-[#3A2315]">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#C59B27]" />
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider">
              Filter Products ({resultCount})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#E2D7C7] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          <FilterSidebar filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
        </div>

        {/* Sticky Apply Button */}
        <div className="sticky bottom-0 p-4 bg-[#EAE3D2] border-t border-[#E2D7C7]">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider text-center hover:bg-[#1F130E] transition-colors"
          >
            Show {resultCount} Products
          </button>
        </div>
      </div>
    </div>
  );
};
