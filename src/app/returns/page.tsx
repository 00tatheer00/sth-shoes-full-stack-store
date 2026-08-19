'use client';

import React, { useState } from 'react';
import { RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ReturnsPage() {
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5">
            <RotateCcw className="w-4 h-4" /> Patron Satisfaction
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Returns & Exchange Policy</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Enjoy our 7-day hassle-free doorstep size exchange guarantee.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            7-Day Doorstep Size Replacement
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              At Tatheer Chappalz, your absolute comfort and satisfaction are paramount. If your new footwear does not fit perfectly or if you require a different leather shade, we offer a 7-day size replacement guarantee.
            </p>

            <h3 className="text-sm font-bold text-slate-900 pt-2">Exchange Eligibility Criteria:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>The item must be unworn on hard outdoor surfaces and in original condition.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Original packaging and tags must be included.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Request must be submitted within 7 days of delivery receipt.</span>
              </li>
            </ul>

            <h3 className="text-sm font-bold text-slate-900 pt-4 border-t border-slate-100">
              Submit Online Exchange Request
            </h3>

            {requestSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-base text-slate-900">Exchange Request Received</div>
                <p className="text-xs text-slate-600">
                  Our logistics team will contact you via WhatsApp within 2 hours to arrange doorstep collection.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setRequestSubmitted(true); }} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Order Number (e.g. TC-94821)"
                    className="p-3 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number"
                    className="p-3 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <select className="w-full p-3 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900">
                  <option>Reason: Require Smaller Size</option>
                  <option>Reason: Require Larger Size</option>
                  <option>Reason: Swap Leather Color Shade</option>
                  <option>Reason: Defective Item</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Submit Exchange Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
