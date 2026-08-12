'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Client Error Boundary:', error);
  }, [error]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-24 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6 bg-white border border-[#E2D7C7] p-8 shadow-xl">
        <div className="w-16 h-16 bg-red-50 text-red-700 flex items-center justify-center mx-auto border border-red-200">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B87546] font-bold">
            Unexpected Atelier Error
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#1F130E]">
            Something Went Wrong
          </h1>
          <p className="text-xs text-[#4A2E1D]/80">
            We encountered a temporary issue loading this page. Our atelier concierge has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#4A2E1D] transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#C59B27]" /> Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white text-[#1F130E] border border-[#E2D7C7] text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
