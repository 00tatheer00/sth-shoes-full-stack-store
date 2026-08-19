'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, ShieldCheck, Heart, MapPin, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Editorial Header */}
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-blue-400 text-xs rounded-full uppercase tracking-wider mx-auto">
            <span>Peshawar Footwear Atelier</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Our Heritage & Craft
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Preserving century-old Pashtun cobbling traditions in the heart of Namak Mandi, Peshawar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold block">
              THE LEGEND OF PESHAWAR
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Born in Namak Mandi Bazaar
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              For generations, the cobbler guilds of Peshawar have crafted the iconic Peshawari Chappal—a footwear design that combines dignity, physical strength, and climate resilience. Characterized by its curved toe box, adjustable heel strap, and resilient rubber tire sole, it remains an indispensable symbol of Pakistani heritage.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tatheer Chappalz was established with a singular vision: to honor traditional cobbling methods while bringing uncompromised luxury standards to leather selection, finish, and customer experience.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 w-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
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
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-2xs">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold block">
              OUR GUIDING PRINCIPLES
            </span>
            <h3 className="text-2xl font-bold text-slate-900">The Tatheer Standard</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <Award className="w-7 h-7 text-blue-600" />
              <h4 className="text-base font-bold text-slate-900">Artisanal Honor</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We employ master cobblers in Peshawar, paying fair ethical wages and preserving ancient hand-stitching techniques that machine mass-production cannot replicate.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <ShieldCheck className="w-7 h-7 text-emerald-600" />
              <h4 className="text-base font-bold text-slate-900">Uncompromised Hides</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Only full-grain cowhide and imported calfskins pass our inspection. Tanned with natural vegetable oils for a rich patina that deepens with age.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <Heart className="w-7 h-7 text-rose-600" />
              <h4 className="text-base font-bold text-slate-900">Patron Loyalty</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every pair comes backed by our 7-day exchange guarantee and dedicated WhatsApp concierge support.
              </p>
            </div>
          </div>
        </div>

        {/* Flagship Atelier Section */}
        <div className="bg-slate-900 text-white p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs text-blue-400 uppercase font-semibold">
              <MapPin className="w-4 h-4" /> Peshawar Atelier & Workshop
            </div>
            <h3 className="text-2xl font-bold">Visit Our Namak Mandi Workshop</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Witness master artisans cut, shape, and hand-stitch raw leather into heirloom Peshawari Chappals. Open Monday to Saturday.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors flex-shrink-0"
          >
            <span>CONTACT CONCIERGE</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
