'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Menu, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="relative w-48 sm:w-72 md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search dashboard..."
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Store Live</span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
        >
          <span>Open Store</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center shadow-xs">
            SA
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-800">Super Admin</div>
            <div className="text-[11px] text-slate-500 font-mono">admin@tatheer.pk</div>
          </div>
        </div>
      </div>
    </header>
  );
};
