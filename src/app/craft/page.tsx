'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CRAFT_STEPS } from '@/data/mockData';

export default function OurCraftPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1F130E] text-[#FAF7F2] py-16 md:py-24 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3A2315] border border-[#C59B27]/40 text-[#C59B27] text-xs font-mono uppercase tracking-widest mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cobbler Guild Traditions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">The Art of Our Craft</h1>
          <p className="text-xs sm:text-base text-[#E2D7C7]/80 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            Every Tatheer Chappal undergoes over 14 hours of meticulous manual creation by master artisans in Peshawar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Step-by-step Detailed Breakdown */}
        <div className="space-y-16">
          {CRAFT_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.stepNumber}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 bg-white border border-[#E2D7C7] shadow-xs ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 space-y-4 ${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="inline-block px-3 py-1 bg-[#1F130E] text-[#C59B27] text-xs font-mono font-bold">
                    Stage 0{step.stepNumber} • {step.subtitle}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F130E]">
                    {step.title}
                  </h2>
                  <p className="text-sm text-[#1F130E]/80 leading-relaxed font-sans">
                    {step.description}
                  </p>
                  <div className="p-4 bg-[#FAF7F2] border-l-4 border-[#B87546] text-xs text-[#4A2E1D]">
                    <div className="font-bold font-serif mb-1 text-[#1F130E]">Artisan Secret:</div>
                    {step.detail}
                  </div>
                </div>

                <div className={`lg:col-span-6 relative ${!isEven ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-4/3 w-full bg-[#1F130E] border border-[#E2D7C7] overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover img-zoom"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Footer */}
        <div className="text-center bg-[#1F130E] text-[#FAF7F2] p-12 border border-[#3A2315] space-y-4">
          <h3 className="text-3xl font-serif font-bold">Experience Royal Pashtun Craftsmanship</h3>
          <p className="text-xs text-[#E2D7C7]/80 max-w-xl mx-auto">
            Step into a pair of authentic Peshawari Chappals designed to mold to your feet over decades.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C59B27] text-[#1F130E] font-serif font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
