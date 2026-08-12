'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-24 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-white border border-[#E2D7C7] flex items-center justify-center mx-auto text-[#B87546] shadow-md">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] font-bold">
            Page Not Found • 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F130E]">
            Step Back into Peshawar
          </h1>
          <p className="text-xs sm:text-sm text-[#4A2E1D]/80 max-w-md mx-auto leading-relaxed">
            The page or footwear item you are looking for has moved or does not exist in our catalog archives.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4 text-[#C59B27]" /> Explore Full Catalog
          </Link>
          <Link
            href="/"
            className="px-8 py-3.5 bg-white text-[#1F130E] border border-[#E2D7C7] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#4A2E1D]" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
