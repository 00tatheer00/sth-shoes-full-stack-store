'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Legal Agreement
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Terms & Conditions</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light">
            Customer service agreement and store terms for Tatheer Chappalz.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-2xs text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900">1. Terms of Use</h2>
          <p>
            By accessing and placing an order on Tatheer Chappalz, you agree to be bound by these terms. All product descriptions, pricing, and availability are subject to verification by our Peshawar atelier.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">2. Natural Leather Variations</h2>
          <p>
            Because every pair of Tatheer Chappalz is crafted from authentic full-grain cowhide and calfskin, subtle variations in leather grain, shade, and organic wax sheen are inherent hallmarks of genuine handmade footwear rather than defects.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">3. Pricing & Cash on Delivery</h2>
          <p>
            All prices are listed in Pakistani Rupees (PKR). Cash on Delivery orders must be paid in full to the courier representative upon delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
