'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles, User, ShieldCheck } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-[#E2D7C7] px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
          <input
            type="text"
            placeholder="Quick search orders, SKUs, patrons..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#1F130E] text-[#C59B27] text-xs font-mono border border-[#C59B27]/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Peshawar Atelier Live</span>
        </div>

        <button className="p-2 text-[#1F130E] hover:text-[#B87546] relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-[#E2D7C7]">
          <div className="w-8 h-8 rounded-full bg-[#1F130E] text-[#C59B27] font-serif font-bold text-xs flex items-center justify-center border border-[#C59B27]">
            SA
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-serif font-bold text-[#1F130E]">Super Admin</div>
            <div className="text-[10px] text-[#4A2E1D]/70 font-mono">admin@tatheerchappalz.com</div>
          </div>
        </div>
      </div>
    </header>
  );
};
