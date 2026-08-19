'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CRAFT_STEPS } from '@/data/mockData';

export default function OurCraftPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-blue-400 text-xs rounded-full uppercase tracking-wider mx-auto">
            <span>Cobbler Guild Traditions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">The Art of Our Craft</h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Every Tatheer Chappal undergoes over 14 hours of meticulous manual creation by master artisans in Peshawar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Step-by-step Detailed Breakdown */}
        <div className="space-y-8">
          {CRAFT_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.stepNumber}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 bg-white border border-slate-200 rounded-2xl shadow-2xs ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 space-y-4 ${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                    Stage 0{step.stepNumber} • {step.subtitle}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="p-4 bg-slate-50 border-l-4 border-slate-900 rounded-lg text-xs text-slate-800">
                    <div className="font-bold mb-1 text-slate-900">Artisan Note:</div>
                    {step.detail}
                  </div>
                </div>

                <div className={`lg:col-span-6 relative ${!isEven ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-4/3 w-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Footer */}
        <div className="text-center bg-slate-900 text-white p-12 rounded-2xl space-y-4 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Experience Royal Pashtun Craftsmanship</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Step into a pair of authentic Peshawari Chappals designed to mold to your feet over decades.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>SHOP COLLECTION</span> <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
