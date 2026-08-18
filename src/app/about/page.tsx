'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ShieldCheck, Heart, MapPin, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* Editorial Header */}
      <div className="bg-[#0D3325] text-white py-16 md:py-24 border-b border-[#082419] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#E5A93C] text-xs font-mono uppercase tracking-widest rounded-full mx-auto">
            <span>Peshawar Footwear Atelier</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            Our Heritage & Craft
          </h1>
          <p className="text-xs sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Preserving century-old Pashtun cobbling traditions in the heart of Namak Mandi, Peshawar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#0D3325] font-bold block">
              THE LEGEND OF PESHAWAR
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
              Born in Namak Mandi Bazaar
            </h2>
            <p className="text-sm text-[#5A6578] leading-relaxed">
              For generations, the cobbler guilds of Peshawar have crafted the iconic Peshawari Chappal—a footwear design that combines dignity, physical strength, and climate resilience. Characterized by its curved toe box, adjustable heel strap, and resilient rubber tire sole, it remains an indispensable symbol of Pakistani heritage.
            </p>
            <p className="text-sm text-[#5A6578] leading-relaxed">
              Tatheer Chappalz was established with a singular vision: to honor traditional cobbling methods while bringing uncompromised luxury standards to leather selection, finish, and customer experience.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 w-full bg-white border border-[#EAE3D5] rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/craft.png"
                alt="Master Artisan Crafting Peshawari Chappal"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="bg-white border border-[#EAE3D5] rounded-xl p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#0D3325] font-bold block">
              OUR GUIDING PRINCIPLES
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#1C1917]">The Tatheer Standard</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF6EF] border border-[#EAE3D5] rounded-lg space-y-3">
              <Award className="w-8 h-8 text-[#0D3325]" />
              <h4 className="text-base font-serif font-bold text-[#1C1917]">Artisanal Honor</h4>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                We employ master cobblers in Peshawar, paying fair ethical wages and preserving ancient hand-stitching techniques that machine mass-production cannot replicate.
              </p>
            </div>

            <div className="p-6 bg-[#FAF6EF] border border-[#EAE3D5] rounded-lg space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#0D3325]" />
              <h4 className="text-base font-serif font-bold text-[#1C1917]">Uncompromised Hides</h4>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Only full-grain cowhide and imported calfskins pass our inspection. Tanned with natural vegetable oils for a rich patina that deepens with age.
              </p>
            </div>

            <div className="p-6 bg-[#FAF6EF] border border-[#EAE3D5] rounded-lg space-y-3">
              <Heart className="w-8 h-8 text-[#0D3325]" />
              <h4 className="text-base font-serif font-bold text-[#1C1917]">Patron Loyalty</h4>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Every pair comes backed by our 14-day replacement guarantee and dedicated WhatsApp concierge support.
              </p>
            </div>
          </div>
        </div>

        {/* Flagship Atelier Section */}
        <div className="bg-[#0D3325] text-white p-10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C] uppercase font-bold">
              <MapPin className="w-4 h-4" /> Peshawar Atelier & Workshop
            </div>
            <h3 className="text-2xl font-serif font-bold">Visit Our Namak Mandi Workshop</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Witness master artisans cut, shape, and hand-stitch raw leather into heirloom Peshawari Chappals. Open Saturday to Thursday.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-amber px-8 py-3.5 text-xs flex-shrink-0"
          >
            <span>CONTACT CONCIERGE</span> <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
