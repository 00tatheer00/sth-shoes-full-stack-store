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
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5">
            <Ruler className="w-4 h-4" /> Perfect Fit Guarantee
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Peshawari Chappal Size Guide</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Find your exact size conversion across EU, UK, US, and Centimeters.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Fit Notice Alert */}
        <div className="p-6 bg-white border-l-4 border-blue-600 border border-slate-200 rounded-xl shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <span>Peshawari Chappal Fitting Note</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Genuine full-grain leather upper straps naturally expand 2-3mm to conform perfectly to your foot arch after 2 to 3 days of wear. If you have broad feet or fall between sizes, we recommend ordering your standard dress shoe size.
          </p>
        </div>

        {/* Size Conversion Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-700">
            Size Conversion Chart (Peshawari Standard)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase">
                  <th className="p-3.5 border-r border-slate-800">EU Size</th>
                  <th className="p-3.5 border-r border-slate-800">UK Size</th>
                  <th className="p-3.5 border-r border-slate-800">US Size</th>
                  <th className="p-3.5 border-r border-slate-800">Foot Length (cm)</th>
                  <th className="p-3.5">Recommended Fitting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sizeMap.map((row) => (
                  <tr key={row.eu} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900 border-r border-slate-100">
                      EU {row.eu}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 border-r border-slate-100">
                      UK {row.uk}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 border-r border-slate-100">
                      US {row.us}
                    </td>
                    <td className="p-3.5 font-mono text-slate-900 font-bold border-r border-slate-100">
                      {row.cm} cm
                    </td>
                    <td className="p-3.5 text-slate-600">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Foot at Home */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-2xs">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            How to Measure Your Foot at Home
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-mono font-bold text-blue-600 text-sm">Step 01</span>
              <h4 className="font-bold text-slate-900">Trace Your Foot</h4>
              <p>Place a blank piece of paper flat on the floor against a straight wall. Stand firm and trace your foot outline with a pencil.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-mono font-bold text-blue-600 text-sm">Step 02</span>
              <h4 className="font-bold text-slate-900">Measure Heel to Toe</h4>
              <p>Use a ruler or tape to measure the longest distance from your back heel to the tip of your longest toe in centimeters.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-mono font-bold text-blue-600 text-sm">Step 03</span>
              <h4 className="font-bold text-slate-900">Match Conversion</h4>
              <p>Compare your measurement in centimeters with the conversion chart above to find your exact Peshawari Chappal size.</p>
            </div>
          </div>
        </div>

        {/* Size Replacement Guarantee */}
        <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold">7-Day Free Home Size Exchange</div>
              <div className="text-xs text-slate-300">Still unsure about fit? Our courier team will swap size at your doorstep.</div>
            </div>
          </div>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex-shrink-0"
          >
            Shop Footwear <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
