'use client';

import React from 'react';
import Link from 'next/link';
import { Ruler, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SizeGuidePage() {
  const sizeMap = [
    { eu: 39, uk: 6, us: 7, cm: 24.5, fit: 'Small / Narrow Feet' },
    { eu: 40, uk: 7, us: 8, cm: 25.4, fit: 'Standard Medium Fit' },
    { eu: 41, uk: 8, us: 9, cm: 26.2, fit: 'Standard Medium Fit' },
    { eu: 42, uk: 9, us: 10, cm: 27.0, fit: 'Standard Medium Fit' },
    { eu: 43, uk: 10, us: 11, cm: 27.8, fit: 'Broad Foot Choice' },
    { eu: 44, uk: 11, us: 12, cm: 28.6, fit: 'Broad Foot Choice' },
    { eu: 45, uk: 12, us: 13, cm: 29.4, fit: 'Extra Broad Fit' },
    { eu: 46, uk: 13, us: 14, cm: 30.2, fit: 'Extra Broad Fit' },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1F130E] text-[#FAF7F2] py-16 md:py-20 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] flex items-center justify-center gap-1.5">
            <Ruler className="w-4 h-4" /> Perfect Fit Guarantee
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Peshawari Chappal Size Guide</h1>
          <p className="text-xs sm:text-sm text-[#E2D7C7]/80 max-w-xl mx-auto font-sans font-light">
            Find your exact size conversion across EU, UK, US, and Centimeters.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Fit Notice Alert */}
        <div className="p-6 bg-white border-l-4 border-[#B87546] border border-[#E2D7C7] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#1F130E]">
            <ShieldAlert className="w-5 h-5 text-[#B87546]" />
            <span>Important Peshawari Chappal Fitting Note</span>
          </div>
          <p className="text-xs text-[#4A2E1D]/80 leading-relaxed font-sans">
            Genuine full-grain leather upper vamps naturally expand 2-3mm to conform perfectly to your foot arch after 2 to 3 days of wear. If you have broad feet or fall between sizes, we recommend ordering your standard dress shoe size.
          </p>
        </div>

        {/* Size Conversion Table */}
        <div className="bg-white border border-[#E2D7C7] overflow-hidden shadow-xs">
          <div className="p-4 bg-[#FAF7F2] border-b border-[#E2D7C7] text-xs font-mono uppercase font-bold text-[#1F130E]">
            Size Conversion Chart (Peshawari Standard)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-serif border-collapse">
              <thead>
                <tr className="bg-[#1F130E] text-[#FAF7F2] font-mono text-[11px] uppercase">
                  <th className="p-3.5 border-r border-[#3A2315]">EU Size</th>
                  <th className="p-3.5 border-r border-[#3A2315]">UK Size</th>
                  <th className="p-3.5 border-r border-[#3A2315]">US Size</th>
                  <th className="p-3.5 border-r border-[#3A2315]">Foot Length (cm)</th>
                  <th className="p-3.5">Recommended Fitting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D7C7]">
                {sizeMap.map((row) => (
                  <tr key={row.eu} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#1F130E] border-r border-[#E2D7C7]">
                      EU {row.eu}
                    </td>
                    <td className="p-3.5 font-mono text-[#4A2E1D] border-r border-[#E2D7C7]">
                      UK {row.uk}
                    </td>
                    <td className="p-3.5 font-mono text-[#4A2E1D] border-r border-[#E2D7C7]">
                      US {row.us}
                    </td>
                    <td className="p-3.5 font-mono text-[#1F130E] font-bold border-r border-[#E2D7C7]">
                      {row.cm} cm
                    </td>
                    <td className="p-3.5 text-[#4A2E1D]/80 font-sans">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Foot at Home */}
        <div className="bg-white border border-[#E2D7C7] p-8 space-y-6 shadow-xs">
          <h3 className="text-xl font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-3">
            How to Measure Your Foot at Home
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4A2E1D]/80">
            <div className="p-4 bg-[#FAF7F2] border border-[#E2D7C7] space-y-2">
              <span className="font-mono font-bold text-[#B87546] text-sm">Step 01</span>
              <h4 className="font-serif font-bold text-[#1F130E]">Trace Your Foot</h4>
              <p>Place a blank piece of paper flat on the floor against a straight wall. Stand firm and trace your foot outline with a sharp pencil.</p>
            </div>
            <div className="p-4 bg-[#FAF7F2] border border-[#E2D7C7] space-y-2">
              <span className="font-mono font-bold text-[#B87546] text-sm">Step 02</span>
              <h4 className="font-serif font-bold text-[#1F130E]">Measure Heel to Toe</h4>
              <p>Use a ruler or tape to measure the longest distance from your back heel to the tip of your longest toe in centimeters.</p>
            </div>
            <div className="p-4 bg-[#FAF7F2] border border-[#E2D7C7] space-y-2">
              <span className="font-mono font-bold text-[#B87546] text-sm">Step 03</span>
              <h4 className="font-serif font-bold text-[#1F130E]">Match Conversion</h4>
              <p>Compare your measurement in centimeters with the conversion chart above to find your exact Peshawari Chappal size.</p>
            </div>
          </div>
        </div>

        {/* Size Replacement Guarantee */}
        <div className="p-6 bg-[#1F130E] text-[#FAF7F2] border border-[#3A2315] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#C59B27] flex-shrink-0" />
            <div>
              <div className="text-sm font-serif font-bold">14-Day Free Home Size Exchange</div>
              <div className="text-xs text-[#E2D7C7]/70 font-sans">Still unsure about fit? Our team will swap size at your doorstep.</div>
            </div>
          </div>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-[#C59B27] text-[#1F130E] text-xs font-serif font-bold uppercase tracking-wider hover:bg-white transition-colors"
          >
            Shop Footwear <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
