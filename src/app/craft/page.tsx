'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CRAFT_STEPS } from '@/data/mockData';

export default function OurCraftPage() {
  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0D3325] text-white py-16 md:py-24 border-b border-[#082419]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#E5A93C] text-xs font-mono uppercase tracking-widest rounded-full mx-auto">
            <span>Cobbler Guild Traditions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">The Art of Our Craft</h1>
          <p className="text-xs sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Every Tatheer Chappal undergoes over 14 hours of meticulous manual creation by master artisans in Peshawar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        {/* Step-by-step Detailed Breakdown */}
        <div className="space-y-12">
          {CRAFT_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.stepNumber}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 bg-white border border-[#EAE3D5] rounded-xl shadow-xs ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 space-y-4 ${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="inline-block px-3 py-1 bg-[#EAF2ED] text-[#0D3325] text-xs font-mono font-bold rounded-full">
                    Stage 0{step.stepNumber} • {step.subtitle}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
                    {step.title}
                  </h2>
                  <p className="text-sm text-[#5A6578] leading-relaxed">
                    {step.description}
                  </p>
                  <div className="p-4 bg-[#FAF6EF] border-l-3 border-[#0D3325] rounded text-xs text-[#1C1917]">
                    <div className="font-bold font-serif mb-1 text-[#0D3325]">Artisan Secret:</div>
                    {step.detail}
                  </div>
                </div>

                <div className={`lg:col-span-6 relative ${!isEven ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-4/3 w-full bg-[#FAF6EF] border border-[#EAE3D5] rounded-lg overflow-hidden shadow-sm">
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
        <div className="text-center bg-[#0D3325] text-white p-12 rounded-xl space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold">Experience Royal Pashtun Craftsmanship</h3>
          <p className="text-xs text-white/70 max-w-xl mx-auto">
            Step into a pair of authentic Peshawari Chappals designed to mold to your feet over decades.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="btn-amber px-8 py-3.5 text-xs inline-flex"
            >
              <span>SHOP COLLECTION</span> <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
