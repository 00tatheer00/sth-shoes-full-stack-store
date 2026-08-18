'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles, Menu, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-[#EAE3D5] px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 text-[#0D3325] hover:bg-[#FAF6EF] rounded lg:hidden"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="relative w-48 sm:w-72 md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
          <input
            type="text"
            placeholder="Search orders, SKUs..."
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#EAF2ED] text-[#0D3325] text-[11px] font-mono font-bold rounded border border-[#0D3325]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D3325] animate-pulse"></span>
          <span>Atelier Live</span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="px-3 py-1.5 bg-[#FAF6EF] border border-[#EAE3D5] text-[#0D3325] text-xs font-semibold rounded hover:bg-[#0D3325] hover:text-white transition-colors"
        >
          View Store
        </Link>

        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-[#EAE3D5]">
          <div className="w-8 h-8 rounded-full bg-[#0D3325] text-white font-serif font-bold text-xs flex items-center justify-center border border-[#E5A93C]">
            SA
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-serif font-bold text-[#1C1917]">Super Admin</div>
            <div className="text-[10px] text-[#5A6578] font-mono">admin@tatheer.pk</div>
          </div>
        </div>
      </div>
    </header>
  );
};
