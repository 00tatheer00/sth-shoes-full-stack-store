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
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Interactive Hero Model Switcher
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroModels = [
    {
      id: 'm1',
      title: 'Kaptan Double Sole Dark Chocolate',
      category: 'Kaptan Collection',
      tagline: 'Handcrafted Double Tire Rubber Sole with Royal Buckle',
      price: 12999,
      originalPrice: 15500,
      image: '/images/hero.png',
      slug: 'kaptan-double-sole-dark-chocolate',
    },
    {
      id: 'm2',
      title: 'Zalmi Velvet-Suede Camel',
      category: 'Zalmi Collection',
      tagline: 'Lightweight Velvet Suede Comfort Signature Edition',
      price: 13999,
      originalPrice: 16000,
      image: '/images/zalmi.png',
      slug: 'zalmi-velvet-suede-camel',
    },
    {
      id: 'm3',
      title: 'Norozi Heavy Buckle Maroon',
      category: 'Norozi Heritage',
      tagline: 'Traditional Heavy Brass Buckle & Double Leather Sole',
      price: 14999,
      originalPrice: 18000,
      image: '/images/norozi.png',
      slug: 'norozi-heavy-buckle-maroon',
    },
    {
      id: 'm4',
      title: 'Royal Calfskin Atelier Tan',
      category: 'Premium Calfskin',
      tagline: 'Supple Full-Grain Cowhide with Ergonomic Cushioning',
      price: 16999,
      originalPrice: 20000,
      image: '/images/kaptaan.png',
      slug: 'royal-calfskin-atelier-tan',
    },
  ];

  const currentHero = heroModels[activeHeroIndex];

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    triggerGoldenCelebration();
    showToast(`🎉 Coupon code "${code}" copied to clipboard! Saved 10%`);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isNew || p.isBestSeller);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="bg-[#FFFDF9] min-h-screen text-[#0F0C0B]">
      {/* Schema.org Structured Data */}
      <JsonLd type="Organization" data={{}} />
      <JsonLd type="WebSite" data={{}} />

      {/* Dynamic Saturated Split Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FAF3E6] via-[#FFFDF9] to-[#F3EBDD] border-b border-[#F0E2CD] py-12 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0F0C0B] text-[#FFB800] border border-[#FFB800]/50 shadow-md">
                <Flame className="w-4 h-4 text-[#FF3B30] animate-bounce" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">
                  Exclusive Peshawar Collection 2026
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#FFB800] font-bold block">
                  {currentHero.category}
                </span>
                <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#0F0C0B] tracking-tight leading-tight">
                  {currentHero.title}
                </h1>
                <p className="text-sm font-sans text-[#3A2012]/80 italic max-w-xl">
                  "{currentHero.tagline}"
                </p>
              </div>

              {/* Price & 3D Savings Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                <span className="text-4xl font-serif font-bold text-[#0F0C0B]">
                  {formatPKR(currentHero.price)}
                </span>
                <span className="text-base text-gray-400 line-through font-mono">
                  {formatPKR(currentHero.originalPrice)}
                </span>
                <span className="badge-sale-3d px-3 py-1 text-xs font-mono font-bold uppercase">
                  SAVE {formatPKR(currentHero.originalPrice - currentHero.price)}
                </span>
              </div>

              {/* Interactive Model Switcher */}
              <div className="pt-3">
                <span className="text-xs font-mono uppercase text-[#0F0C0B] font-bold block mb-2">
                  Click to Preview Model:
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
                          ? 'bg-[#0F0C0B] text-[#FFB800] border-[#FFB800] shadow-xl font-bold scale-105 glow-gold'
                          : 'bg-white text-[#0F0C0B] border-[#F0E2CD] hover:border-[#FFB800]'
                      }`}
                    >
                      {m.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href={`/product/${currentHero.slug}`}
                  className="px-10 py-4 bg-gradient-to-r from-[#0F0C0B] to-[#3A2012] text-[#FFFDF9] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:from-[#FF3B30] hover:to-[#E63946] transition-all border border-[#FFB800]/40 shadow-2xl flex items-center justify-center gap-2 glow-gold"
                >
                  Order This Model <ArrowRight className="w-4 h-4 text-[#FFB800]" />
                </Link>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="px-8 py-4 bg-white text-[#0F0C0B] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#FAF3E6] transition-colors border border-[#F0E2CD] flex items-center justify-center gap-2 shadow-sm"
                >
                  <Ruler className="w-4 h-4 text-[#FFB800]" /> Size Finder Tool
                </button>
              </div>
            </div>

            {/* Right Interactive 3D Stage */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square bg-white border-4 border-[#FFB800] shadow-2xl p-6 rounded-none group glow-gold">
                <Image
                  src={currentHero.image}
                  alt={currentHero.title}
                  fill
                  priority
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 badge-3d px-3 py-1 text-[10px] font-mono uppercase font-bold">
                  Handcrafted in Peshawar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Feature Strip */}
      <section className="bg-white border-b border-[#F0E2CD] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-[#F0E2CD]">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E6] border border-[#FFB800] flex items-center justify-center text-[#FFB800] shadow-sm">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F0C0B] uppercase">FREE EXPRESS COD</h4>
                <p className="text-[11px] text-[#3A2012]/70 font-sans">Nationwide delivery over Rs. 5,000</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-[#F0E2CD]">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E6] border border-[#FFB800] flex items-center justify-center text-[#FFB800] shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F0C0B] uppercase">100% LEATHER PROMISE</h4>
                <p className="text-[11px] text-[#3A2012]/70 font-sans">Full-grain calfskin & cowhide</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-[#F0E2CD]">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E6] border border-[#FFB800] flex items-center justify-center text-[#FFB800] shadow-sm">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F0C0B] uppercase">ATELIER CONCIERGE</h4>
                <p className="text-[11px] text-[#3A2012]/70 font-sans">Peshawar WhatsApp sizing help</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E6] border border-[#FFB800] flex items-center justify-center text-[#FFB800] shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F0C0B] uppercase">FLEXIBLE PAYMENTS</h4>
                <p className="text-[11px] text-[#3A2012]/70 font-sans">COD, JazzCash, Easypaisa & Cards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-[#FFB800]">
            <span className="w-20 h-0.5 bg-[#FFB800]"></span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F0C0B] tracking-tight">
              Featured Peshawari Footwear
            </h2>
            <span className="w-20 h-0.5 bg-[#FFB800]"></span>
          </div>
          <p className="text-xs text-[#3A2012]/70 font-mono">
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
          <div className="flex items-center justify-center gap-4 text-[#FFB800]">
            <span className="w-20 h-0.5 bg-[#FFB800]"></span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F0C0B] tracking-tight">
              Best Seller Products
            </h2>
            <span className="w-20 h-0.5 bg-[#FFB800]"></span>
          </div>
          <p className="text-xs text-[#3A2012]/70 font-mono">
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
