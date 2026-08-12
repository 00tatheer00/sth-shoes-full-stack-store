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
  Shield,
  Layers,
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
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Interactive Hero Model Switcher
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroModels = [
    {
      id: 'm1',
      title: 'Kaptan Double Sole Royal Sapphire',
      category: 'Kaptan Collection',
      tagline: 'Handcrafted Double Tire Rubber Sole with Royal Brass Buckle',
      price: 12999,
      originalPrice: 16500,
      image: '/images/hero.png',
      slug: 'kaptan-double-sole-dark-chocolate',
    },
    {
      id: 'm2',
      title: 'Zalmi Velvet-Suede Sapphire Blue',
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
      tagline: 'Traditional Heavy Brass Buckle & Double Leather Tire Sole',
      price: 14999,
      originalPrice: 18500,
      image: '/images/norozi.png',
      slug: 'norozi-heavy-buckle-maroon',
    },
    {
      id: 'm4',
      title: 'Royal Calfskin Atelier Sapphire',
      category: 'Premium Calfskin',
      tagline: 'Supple Full-Grain Cowhide with Ergonomic Cushioning',
      price: 16999,
      originalPrice: 21000,
      image: '/images/kaptaan.png',
      slug: 'royal-calfskin-atelier-tan',
    },
  ];

  const currentHero = heroModels[activeHeroIndex];

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    triggerGoldenCelebration();
    showToast(`🎉 Code "${code}" copied to clipboard! Saved 10% on your order.`);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isNew || p.isBestSeller);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A]">
      {/* Schema.org Structured Data */}
      <JsonLd type="Organization" data={{}} />
      <JsonLd type="WebSite" data={{}} />

      {/* MAGNIFICENT ROYAL SAPPHIRE BLUE HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#0A1128] via-[#0F172A] to-[#1E3A8A] text-white border-b-2 border-[#2563EB]/40 py-16 lg:py-24 overflow-hidden shadow-2xl">
        {/* Floating Ambient Glowing Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00F0FF]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0A1128] text-[#00F0FF] border border-[#00F0FF]/50 shadow-lg glow-[#00F0FF]">
                <Flame className="w-4 h-4 text-[#F59E0B] animate-bounce" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">
                  ROYAL SAPPHIRE COLLECTION 2026
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F59E0B] font-bold block">
                  {currentHero.category}
                </span>
                <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                  {currentHero.title}
                </h1>
                <p className="text-sm font-sans text-gray-300 italic max-w-xl">
                  "{currentHero.tagline}"
                </p>
              </div>

              {/* Price & Savings Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                <span className="text-4xl font-serif font-bold text-[#F59E0B]">
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
                <span className="text-xs font-mono uppercase text-[#00F0FF] font-bold block mb-2">
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
                          ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white border-[#00F0FF] shadow-xl font-bold scale-105 glow-blue'
                          : 'bg-[#0A1128]/80 text-gray-300 border-[#2563EB]/40 hover:border-[#00F0FF]'
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
                  className="px-10 py-4 bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#0A1128] text-white text-xs font-serif font-bold uppercase tracking-[0.2em] hover:from-[#00F0FF] hover:to-[#2563EB] hover:text-[#0A1128] transition-all border border-[#00F0FF] shadow-2xl flex items-center justify-center gap-2 glow-blue"
                >
                  Order This Article <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                </Link>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="px-8 py-4 bg-white/10 text-white text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-white/20 transition-colors border border-[#2563EB] flex items-center justify-center gap-2 shadow-lg backdrop-blur-md"
                >
                  <Ruler className="w-4 h-4 text-[#00F0FF]" /> Size Finder Tool
                </button>
              </div>
            </div>

            {/* Right Interactive 3D Showcase Stage */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-b from-white/10 to-white/5 border-4 border-[#00F0FF] shadow-2xl p-6 rounded-none group glow-[#00F0FF] backdrop-blur-md">
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
      <section className="bg-white border-b border-[#E2E8F0] py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#2563EB] flex items-center justify-center text-[#2563EB] shadow-xs">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F172A] uppercase">FREE EXPRESS COD</h4>
                <p className="text-[11px] text-slate-500 font-sans">Free nationwide delivery over Rs. 5,000</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#2563EB] flex items-center justify-center text-[#2563EB] shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F172A] uppercase">100% LEATHER PROMISE</h4>
                <p className="text-[11px] text-slate-500 font-sans">Full-grain calfskin & cowhide</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-[#E2E8F0]">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#2563EB] flex items-center justify-center text-[#2563EB] shadow-xs">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F172A] uppercase">ATELIER CONCIERGE</h4>
                <p className="text-[11px] text-slate-500 font-sans">Peshawar WhatsApp sizing help</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] border border-[#2563EB] flex items-center justify-center text-[#2563EB] shadow-xs">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F172A] uppercase">FLEXIBLE PAYMENTS</h4>
                <p className="text-[11px] text-slate-500 font-sans">COD, JazzCash, Easypaisa & Cards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Catalog Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-[#2563EB]">
            <span className="w-20 h-0.5 bg-[#2563EB]"></span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
              Featured Peshawari Footwear
            </h2>
            <span className="w-20 h-0.5 bg-[#2563EB]"></span>
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

      {/* Best Seller Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-[#2563EB]">
            <span className="w-20 h-0.5 bg-[#2563EB]"></span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
              Best Seller Products
            </h2>
            <span className="w-20 h-0.5 bg-[#2563EB]"></span>
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
