'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  Ruler,
  CheckCircle2,
  Copy,
  Flame,
  Zap,
  Star,
} from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { SizeFinderModal } from '@/components/shop/SizeFinderModal';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import { JsonLd } from '@/components/seo/JsonLd';
import { triggerConfetti, triggerGoldenCelebration } from '@/lib/confetti';

export default function HomePage() {
  const { showToast } = useStore();
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  // Interactive Hero Model Switcher
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroModels = [
    {
      id: 'm1',
      title: 'Kaptan Double Sole Dodger Blue Royal',
      category: 'Kaptan Collection',
      tagline: 'Handcrafted Double Tire Rubber Sole with Royal Brass Buckle',
      price: 12999,
      originalPrice: 16500,
      image: '/images/hero.png',
      slug: 'kaptan-double-sole-dark-chocolate',
    },
    {
      id: 'm2',
      title: 'Zalmi Velvet-Suede Dodger Edition',
      category: 'Zalmi Collection',
      tagline: 'Lightweight Suede Comfort Signature Edition',
      price: 13999,
      originalPrice: 17000,
      image: '/images/zalmi.png',
      slug: 'zalmi-velvet-suede-camel',
    },
    {
      id: 'm3',
      title: 'Norozi Heavy Buckle Heritage Maroon',
      category: 'Norozi Heritage',
      tagline: 'Traditional Heavy Brass Buckle & Double Leather Sole',
      price: 14999,
      originalPrice: 18500,
      image: '/images/norozi.png',
      slug: 'norozi-heavy-buckle-maroon',
    },
    {
      id: 'm4',
      title: 'Royal Calfskin Atelier Dodger',
      category: 'Premium Calfskin',
      tagline: 'Supple Full-Grain Cowhide with Ergonomic Cushioning',
      price: 16999,
      originalPrice: 21000,
      image: '/images/kaptaan.png',
      slug: 'royal-calfskin-atelier-tan',
    },
  ];

  const currentHero = heroModels[activeHeroIndex];

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isNew || p.isBestSeller);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="bg-[#F4F8FF] min-h-screen text-[#0B1120]">
      {/* Schema.org Structured Data */}
      <JsonLd type="Organization" data={{}} />
      <JsonLd type="WebSite" data={{}} />

      {/* MAGNIFICENT DODGER BLUE HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#0B63F6] text-white border-b-2 border-[#1E90FF]/40 py-16 lg:py-24 overflow-hidden shadow-2xl">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#1E90FF]/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00E5FF]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0B1120] text-[#00E5FF] border border-[#00E5FF]/50 shadow-lg glow-cyan-dodger">
                <Flame className="w-4 h-4 text-[#FFB800] animate-bounce" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">
                  DODGER BLUE ROYAL COLLECTION 2026
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#FFB800] font-bold block">
                  {currentHero.category}
                </span>
                <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                  {currentHero.title}
                </h1>
                <p className="text-sm font-sans text-slate-300 italic max-w-xl">
                  "{currentHero.tagline}"
                </p>
              </div>

              {/* Price & Savings Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                <span className="text-4xl font-serif font-bold text-[#FFB800]">
                  {formatPKR(currentHero.price)}
                </span>
                <span className="text-base text-gray-400 line-through font-mono">
                  {formatPKR(currentHero.originalPrice)}
                </span>
                <span className="badge-sale-3d px-3.5 py-1 text-xs font-mono font-bold uppercase shadow-md">
                  SAVE {formatPKR(currentHero.originalPrice - currentHero.price)}
                </span>
              </div>

              {/* Interactive Model Switcher */}
              <div className="pt-2">
                <span className="text-xs font-mono uppercase text-[#00E5FF] font-bold block mb-2">
                  Click to Switch Model Preview:
                </span>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {heroModels.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setActiveHeroIndex(idx);
                        triggerConfetti();
                      }}
                      className={`px-4 py-2.5 text-xs font-serif transition-all border ${
                        activeHeroIndex === idx
                          ? 'bg-gradient-to-r from-[#1E90FF] to-[#0B63F6] text-white border-[#00E5FF] shadow-xl font-bold scale-105 glow-dodger'
                          : 'bg-[#0B1120]/80 text-gray-300 border-[#1E90FF]/40 hover:border-[#00E5FF]'
                      }`}
                    >
                      {m.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href={`/product/${currentHero.slug}`}
                  className="px-10 py-4 bg-gradient-to-r from-[#1E90FF] via-[#0B63F6] to-[#0B1120] text-white text-xs font-serif font-bold uppercase tracking-[0.2em] hover:from-[#00E5FF] hover:to-[#1E90FF] hover:text-[#0B1120] transition-all border border-[#00E5FF] shadow-2xl flex items-center justify-center gap-2 glow-dodger"
                >
                  Order This Model <ArrowRight className="w-4 h-4 text-[#FFB800]" />
                </Link>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="px-8 py-4 bg-white/10 text-white text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-white/20 transition-colors border border-[#1E90FF] flex items-center justify-center gap-2 shadow-lg backdrop-blur-md"
                >
                  <Ruler className="w-4 h-4 text-[#00E5FF]" /> Size Finder Tool
                </button>
              </div>
            </div>

            {/* Right Interactive 3D Showcase Stage */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-b from-white/10 to-white/5 border-4 border-[#00E5FF] shadow-2xl p-6 rounded-none group glow-cyan-dodger backdrop-blur-md">
                <Image
                  src={currentHero.image}
                  alt={currentHero.title}
                  fill
                  priority
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 badge-gold-3d px-3.5 py-1 text-[10px] font-mono uppercase font-bold">
                  Handcrafted in Namak Mandi, Peshawar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Feature Strip */}
      <section className="bg-white border-b border-[#DBEAFE] py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-[#DBEAFE]">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#1E90FF] flex items-center justify-center text-[#1E90FF] shadow-xs">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0B1120] uppercase">FREE EXPRESS COD</h4>
                <p className="text-[11px] text-slate-500 font-sans">Free nationwide delivery over Rs. 5,000</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-[#DBEAFE]">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#1E90FF] flex items-center justify-center text-[#1E90FF] shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0B1120] uppercase">100% LEATHER PROMISE</h4>
                <p className="text-[11px] text-slate-500 font-sans">Full-grain calfskin & cowhide</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-[#DBEAFE]">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#1E90FF] flex items-center justify-center text-[#1E90FF] shadow-xs">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0B1120] uppercase">ATELIER CONCIERGE</h4>
                <p className="text-[11px] text-slate-500 font-sans">Peshawar WhatsApp sizing help</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#1E90FF] flex items-center justify-center text-[#1E90FF] shadow-xs">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0B1120] uppercase">FLEXIBLE PAYMENTS</h4>
                <p className="text-[11px] text-slate-500 font-sans">COD, JazzCash, Easypaisa & Cards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Catalog Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-[#1E90FF]">
            <span className="w-20 h-0.5 bg-[#1E90FF]"></span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1120] tracking-tight">
              Featured Peshawari Footwear
            </h2>
            <span className="w-20 h-0.5 bg-[#1E90FF]"></span>
          </div>
          <p className="text-xs text-slate-600 font-mono">
            Handcrafted with precision in Namak Mandi • Hover color swatches to live preview shades
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} showCountdown={idx === 1} />
          ))}
        </div>
      </section>

      {/* Dodger Blue Collection Banner Grid */}
      <section className="py-12 bg-white border-y border-[#DBEAFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Big Banner */}
            <div className="lg:col-span-6 relative bg-gradient-to-br from-[#0B1120] to-[#0B63F6] border-2 border-[#1E90FF] text-white min-h-[360px] p-8 flex flex-col justify-between overflow-hidden group shadow-xl">
              <div className="relative z-10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00E5FF] font-bold">
                  Heritage Craftsmanship
                </span>
                <h3 className="text-3xl font-serif font-bold text-white">
                  Royal Peshawari <br />
                  <span className="italic font-serif font-normal text-[#FFB800]">Chappal Collection</span>
                </h3>
              </div>
              <div className="relative z-10">
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3.5 bg-[#1E90FF] text-white text-xs font-serif uppercase tracking-widest font-bold hover:bg-[#00E5FF] hover:text-[#0B1120] transition-all border border-[#00E5FF]/40 shadow-lg"
                >
                  Explore Collection
                </Link>
              </div>
              <div className="absolute right-0 bottom-0 w-3/5 h-4/5">
                <Image
                  src="/images/zalmi.png"
                  alt="Crafted Chappal"
                  fill
                  className="object-contain group-hover:scale-108 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Stacked Category Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#0B1120] text-white p-6 flex flex-col justify-between min-h-[170px] border-2 border-[#1E90FF] shadow-md">
                <div>
                  <span className="text-[10px] font-mono text-[#FFB800] uppercase tracking-widest">Peshawar Guild</span>
                  <h4 className="text-xl font-serif font-bold text-white mt-1">Gentlemen Edition</h4>
                </div>
                <Link href="/shop" className="text-xs font-serif text-[#00E5FF] hover:underline flex items-center gap-1 font-bold">
                  Shop Gentlemen <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-[#F4F8FF] border-2 border-[#DBEAFE] p-6 flex flex-col justify-between min-h-[170px] shadow-xs hover:border-[#1E90FF] transition-all">
                <div className="relative w-full h-24">
                  <Image src="/images/kaptaan.png" alt="Kaptaan Chappal" fill className="object-contain" />
                </div>
                <div className="text-center pt-1">
                  <h5 className="text-xs font-serif font-bold text-[#0B1120]">Kaptaan Double Sole</h5>
                  <span className="text-[11px] font-mono font-bold text-[#1E90FF]">From Rs. 12,999</span>
                </div>
              </div>

              <div className="bg-[#F4F8FF] border-2 border-[#DBEAFE] p-6 flex flex-col justify-between min-h-[170px] shadow-xs hover:border-[#1E90FF] transition-all">
                <div className="relative w-full h-24">
                  <Image src="/images/norozi.png" alt="Norozi Chappal" fill className="object-contain" />
                </div>
                <div className="text-center pt-1">
                  <h5 className="text-xs font-serif font-bold text-[#0B1120]">Norozi Heavy Buckle</h5>
                  <span className="text-[11px] font-mono font-bold text-[#1E90FF]">From Rs. 14,999</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0B63F6] to-[#0B1120] text-white p-6 flex flex-col justify-between min-h-[170px] border-2 border-[#1E90FF] shadow-md">
                <div>
                  <span className="text-[10px] font-mono text-[#FFB800] uppercase tracking-widest">Bespoke Fit</span>
                  <h4 className="text-xl font-serif font-bold text-white mt-1">Custom Sizing</h4>
                </div>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="text-xs font-serif text-[#00E5FF] hover:underline flex items-center gap-1 font-bold text-left"
                >
                  Size Finder Tool <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Seller Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-[#1E90FF]">
            <span className="w-20 h-0.5 bg-[#1E90FF]"></span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1120] tracking-tight">
              Best Seller Products
            </h2>
            <span className="w-20 h-0.5 bg-[#1E90FF]"></span>
          </div>
          <p className="text-xs text-slate-600 font-mono">
            Highest rated articles chosen by patrons across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Seals Bar */}
      <section className="py-12 bg-white border-t border-[#DBEAFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 border border-[#DBEAFE] bg-[#F4F8FF] space-y-1 shadow-2xs hover:border-[#1E90FF] transition-all">
              <Award className="w-7 h-7 text-[#1E90FF] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#0B1120] uppercase">PESHAWAR GUILD</h5>
              <p className="text-[10px] text-slate-500 font-mono">Authentic Namak Mandi Atelier</p>
            </div>
            <div className="p-5 border border-[#DBEAFE] bg-[#F4F8FF] space-y-1 shadow-2xs hover:border-[#1E90FF] transition-all">
              <Award className="w-7 h-7 text-[#1E90FF] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#0B1120] uppercase">FULL GRAIN LEATHER</h5>
              <p className="text-[10px] text-slate-500 font-mono">100% Genuine Calfskin & Cowhide</p>
            </div>
            <div className="p-5 border border-[#DBEAFE] bg-[#F4F8FF] space-y-1 shadow-2xs hover:border-[#1E90FF] transition-all">
              <Award className="w-7 h-7 text-[#1E90FF] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#0B1120] uppercase">HAND STITCHED</h5>
              <p className="text-[10px] text-slate-500 font-mono">14+ Hours Per Pair</p>
            </div>
            <div className="p-5 border border-[#DBEAFE] bg-[#F4F8FF] space-y-1 shadow-2xs hover:border-[#1E90FF] transition-all">
              <Award className="w-7 h-7 text-[#1E90FF] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#0B1120] uppercase">ROYAL SEAL</h5>
              <p className="text-[10px] text-slate-500 font-mono">Patron Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Size Finder Modal */}
      <SizeFinderModal
        isOpen={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
        onSelectSize={(size) => {
          showToast(`Selected size EU ${size} for filtering`);
        }}
      />
    </div>
  );
}
