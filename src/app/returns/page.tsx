'use client';

import React, { useState } from 'react';
import { RotateCcw, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ReturnsPage() {
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      <div className="bg-[#1F130E] text-[#FAF7F2] py-16 md:py-20 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] flex items-center justify-center gap-1.5">
            <RotateCcw className="w-4 h-4" /> Patron Satisfaction
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Returns & Exchange Policy</h1>
          <p className="text-xs sm:text-sm text-[#E2D7C7]/80 max-w-xl mx-auto font-sans font-light">
            Enjoy our 14-day hassle-free doorstep size exchange guarantee.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="bg-white border border-[#E2D7C7] p-8 space-y-6 shadow-xs">
          <h2 className="text-xl font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-3">
            14-Day Doorstep Size Replacement
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#1F130E]/80 leading-relaxed font-sans">
            <p>
              At Tatheer Chappalz, your absolute comfort and satisfaction are paramount. If your new footwear does not fit perfectly or if you require a different leather shade, we gladly offer a 14-day size replacement guarantee.
            </p>

            <h3 className="text-base font-serif font-bold text-[#1F130E] pt-2">Exchange Eligibility Criteria:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                <span>The item must be unworn on hard outdoor surfaces and in pristine original condition.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                <span>Original cotton dust bag and product tag must be included.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                <span>Request must be submitted within 14 days of delivery receipt.</span>
              </li>
            </ul>

            <h3 className="text-base font-serif font-bold text-[#1F130E] pt-4 border-t border-[#E2D7C7]">
              Submit Online Exchange Request
            </h3>

            {requestSubmitted ? (
              <div className="p-6 bg-[#FAF7F2] border border-[#C59B27] text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-[#C59B27] mx-auto" />
                <div className="font-serif font-bold text-base text-[#1F130E]">Exchange Request Logged</div>
                <p className="text-xs text-[#4A2E1D]">
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
                    className="p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono focus:outline-none focus:border-[#B87546]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number"
                    className="p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
                  />
                </div>
                <select className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]">
                  <option>Reason: Require Smaller Size</option>
                  <option>Reason: Require Larger Size</option>
                  <option>Reason: Swap Leather Color Shade</option>
                  <option>Reason: Defective Item</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider hover:bg-[#1F130E]"
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
