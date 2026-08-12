'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ShieldCheck, Heart, ArrowRight, Sparkles, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Editorial Header */}
      <div className="bg-[#1F130E] text-[#FAF7F2] py-16 md:py-24 border-b border-[#3A2315] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3A2315] border border-[#C59B27]/40 text-[#C59B27] text-xs font-mono uppercase tracking-widest mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peshawar Footwear Atelier</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#FAF7F2]">
            Our Heritage & Craft
          </h1>
          <p className="text-xs sm:text-base text-[#E2D7C7]/80 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            Preserving century-old Pashtun cobbling traditions in the heart of Namak Mandi, Peshawar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Story Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B87546] font-bold">
              The Legend of Peshawar
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F130E]">
              Born in Namak Mandi Bazaar
            </h2>
            <p className="text-sm text-[#1F130E]/80 leading-relaxed font-sans">
              For generations, the cobbler guilds of Peshawar have crafted the iconic Peshawari Chappal—a footwear design that combines dignity, physical strength, and climate resilience. Characterized by its curved toe box, adjustable heel strap, and resilient rubber tire sole, it remains an indispensable symbol of Pakistani heritage.
            </p>
            <p className="text-sm text-[#1F130E]/80 leading-relaxed font-sans">
              Tatheer Chappalz was established with a singular vision: to honor traditional cobbling methods while bringing uncompromised luxury standards to leather selection, finish, and customer experience.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 w-full bg-[#1F130E] border border-[#E2D7C7] shadow-2xl overflow-hidden">
              <Image
                src="/images/craft.png"
                alt="Master Artisan Crafting Peshawari Chappal"
                fill
                className="object-cover img-zoom"
              />
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="bg-white border border-[#E2D7C7] p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B87546]">
              Our Guiding Principles
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#1F130E]">The Tatheer Standard</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#FAF7F2] border border-[#E2D7C7] space-y-3">
              <Award className="w-8 h-8 text-[#C59B27]" />
              <h4 className="text-base font-serif font-bold text-[#1F130E]">Artisanal Honor</h4>
              <p className="text-xs text-[#4A2E1D]/80 leading-relaxed">
                We employ master cobblers in Peshawar, paying fair ethical wages and preserving ancient hand-stitching techniques that machine mass-production cannot replicate.
              </p>
            </div>
            <div className="p-6 bg-[#FAF7F2] border border-[#E2D7C7] space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#C59B27]" />
              <h4 className="text-base font-serif font-bold text-[#1F130E]">Uncompromised Hides</h4>
              <p className="text-xs text-[#4A2E1D]/80 leading-relaxed">
                Only full-grain cowhide and imported calfskins pass our inspection. Tanned with natural vegetable oils for a rich patina that deepens with age.
              </p>
            </div>
            <div className="p-6 bg-[#FAF7F2] border border-[#E2D7C7] space-y-3">
              <Heart className="w-8 h-8 text-[#C59B27]" />
              <h4 className="text-base font-serif font-bold text-[#1F130E]">Patron Loyalty</h4>
              <p className="text-xs text-[#4A2E1D]/80 leading-relaxed">
                Every pair comes backed by our 14-day replacement guarantee and dedicated WhatsApp concierge support.
              </p>
            </div>
          </div>
        </div>

        {/* Flagship Atelier Section */}
        <div className="bg-[#1F130E] text-[#FAF7F2] p-10 border border-[#3A2315] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C59B27] uppercase">
              <MapPin className="w-4 h-4" /> Peshawar Atelier & Workshop
            </div>
            <h3 className="text-2xl font-serif font-bold">Visit Our Namak Mandi Workshop</h3>
            <p className="text-xs text-[#E2D7C7]/80 leading-relaxed font-sans">
              Witness master artisans cut, shape, and hand-stitch raw leather into heirloom Peshawari Chappals. Open Saturday to Thursday.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#C59B27] text-[#1F130E] font-serif font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors flex-shrink-0"
          >
            Contact Atelier Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
