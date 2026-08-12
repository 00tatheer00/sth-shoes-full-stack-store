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
} from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { SizeFinderModal } from '@/components/shop/SizeFinderModal';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import { JsonLd } from '@/components/seo/JsonLd';
import { triggerConfetti } from '@/lib/confetti';

export default function HomePage() {
  const { showToast } = useStore();
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  // Interactive Model Switcher
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroModels = [
    {
      id: 'm1',
      title: 'Kaptan Double Sole Dark Chocolate',
      category: 'Kaptan Collection',
      tagline: 'Handcrafted Double Tire Rubber Sole with Royal Brass Buckle',
      price: 12999,
      originalPrice: 15500,
      image: '/images/hero.png',
      slug: 'kaptan-double-sole-dark-chocolate',
    },
    {
      id: 'm2',
      title: 'Zalmi Velvet-Suede Camel Edition',
      category: 'Zalmi Collection',
      tagline: 'Lightweight Velvet Suede Comfort Signature Edition',
      price: 13999,
      originalPrice: 16000,
      image: '/images/zalmi.png',
      slug: 'zalmi-velvet-suede-camel',
    },
    {
      id: 'm3',
      title: 'Norozi Heavy Buckle Heritage Maroon',
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

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isNew || p.isBestSeller);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="bg-white min-h-screen text-[#0F172A]">
      {/* Schema.org Structured Data */}
      <JsonLd type="Organization" data={{}} />
      <JsonLd type="WebSite" data={{}} />

      {/* SLEEK MINIMALIST HERO SECTION */}
      <section className="relative bg-[#F8FAFC] border-b border-slate-200 py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-300 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#0F172A] font-semibold">
                  Handcrafted in Peshawar, Pakistan
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold block">
                  {currentHero.category}
                </span>
                <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#0F172A] tracking-tight leading-tight">
                  {currentHero.title}
                </h1>
                <p className="text-sm font-sans text-slate-600 italic max-w-xl">
                  "{currentHero.tagline}"
                </p>
              </div>

              {/* Price & Savings */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                <span className="text-3xl font-serif font-bold text-[#0F172A]">
                  {formatPKR(currentHero.price)}
                </span>
                <span className="text-sm text-slate-400 line-through font-mono">
                  {formatPKR(currentHero.originalPrice)}
                </span>
                <span className="badge-sale-minimal">
                  SAVE {formatPKR(currentHero.originalPrice - currentHero.price)}
                </span>
              </div>

              {/* Minimal Model Selector Pills */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block mb-2">
                  Select Article Model:
                </span>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {heroModels.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setActiveHeroIndex(idx);
                        triggerConfetti();
                      }}
                      className={`px-4 py-2 text-xs font-serif transition-all border ${
                        activeHeroIndex === idx
                          ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md font-bold'
                          : 'bg-white text-[#0F172A] border-slate-300 hover:border-[#0F172A]'
                      }`}
                    >
                      {m.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                <Link
                  href={`/product/${currentHero.slug}`}
                  className="px-8 py-4 bg-[#0F172A] text-white text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  Explore Article <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                </Link>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="px-6 py-4 bg-white text-[#0F172A] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-slate-100 transition-colors border border-slate-300 flex items-center justify-center gap-2"
                >
                  <Ruler className="w-4 h-4 text-[#C5A059]" /> Size Finder Tool
                </button>
              </div>
            </div>

            {/* Right Clean Product Showcase Stage */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square bg-white border border-slate-200 shadow-xl p-6 rounded-none group">
                <Image
                  src={currentHero.image}
                  alt={currentHero.title}
                  fill
                  priority
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 badge-minimal">
                  Handmade Peshawari
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sleek 4-Column Feature Strip */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-slate-300 flex items-center justify-center text-[#0F172A]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F172A] uppercase">FREE EXPRESS COD</h4>
                <p className="text-[11px] text-slate-500 font-sans">Free delivery over Rs. 5,000</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-slate-300 flex items-center justify-center text-[#0F172A]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F172A] uppercase">100% GENUINE LEATHER</h4>
                <p className="text-[11px] text-slate-500 font-sans">Full-grain calfskin & cowhide</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border-r sm:border-r-0 lg:border-r border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-slate-300 flex items-center justify-center text-[#0F172A]">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F172A] uppercase">ATELIER CONCIERGE</h4>
                <p className="text-[11px] text-slate-500 font-sans">Peshawar sizing guidance</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-slate-300 flex items-center justify-center text-[#0F172A]">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#0F172A] uppercase">FLEXIBLE PAYMENTS</h4>
                <p className="text-[11px] text-slate-500 font-sans">COD, Mobile Wallets & Cards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Catalog Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-slate-300">
            <span className="w-16 h-px bg-slate-300"></span>
            <h2 className="text-3xl font-serif font-bold text-[#0F172A] tracking-tight">
              Featured Peshawari Footwear
            </h2>
            <span className="w-16 h-px bg-slate-300"></span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Handcrafted with precision in Namak Mandi • Hover color swatches to live preview shades
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} showCountdown={idx === 1} />
          ))}
        </div>
      </section>

      {/* Collection Banner Grid */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main Banner */}
            <div className="lg:col-span-6 relative bg-[#0F172A] border border-slate-800 text-white min-h-[360px] p-8 flex flex-col justify-between overflow-hidden group shadow-md">
              <div className="relative z-10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-semibold">
                  Heritage Craftsmanship
                </span>
                <h3 className="text-3xl font-serif font-bold text-white">
                  Royal Peshawari <br />
                  <span className="italic font-serif font-normal text-slate-300">Chappal Collection</span>
                </h3>
              </div>
              <div className="relative z-10">
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3.5 bg-white text-[#0F172A] text-xs font-serif uppercase tracking-widest font-bold hover:bg-[#C5A059] hover:text-white transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
              <div className="absolute right-0 bottom-0 w-3/5 h-4/5">
                <Image
                  src="/images/zalmi.png"
                  alt="Crafted Chappal"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Stacked Category Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between min-h-[170px] shadow-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">Peshawar Guild</span>
                  <h4 className="text-xl font-serif font-bold text-[#0F172A] mt-1">Gentlemen Edition</h4>
                </div>
                <Link href="/shop" className="text-xs font-serif text-[#0F172A] hover:underline flex items-center gap-1 font-bold">
                  Shop Gentlemen <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-white border border-slate-200 p-6 flex flex-col justify-between min-h-[170px] shadow-xs hover:border-[#0F172A] transition-all">
                <div className="relative w-full h-24">
                  <Image src="/images/kaptaan.png" alt="Kaptaan Chappal" fill className="object-contain" />
                </div>
                <div className="text-center pt-1">
                  <h5 className="text-xs font-serif font-bold text-[#0F172A]">Kaptaan Double Sole</h5>
                  <span className="text-[11px] font-mono font-bold text-[#C5A059]">From Rs. 12,999</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 flex flex-col justify-between min-h-[170px] shadow-xs hover:border-[#0F172A] transition-all">
                <div className="relative w-full h-24">
                  <Image src="/images/norozi.png" alt="Norozi Chappal" fill className="object-contain" />
                </div>
                <div className="text-center pt-1">
                  <h5 className="text-xs font-serif font-bold text-[#0F172A]">Norozi Heavy Buckle</h5>
                  <span className="text-[11px] font-mono font-bold text-[#C5A059]">From Rs. 14,999</span>
                </div>
              </div>

              <div className="bg-[#0F172A] text-white p-6 flex flex-col justify-between min-h-[170px] shadow-md">
                <div>
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold">Bespoke Fit</span>
                  <h4 className="text-xl font-serif font-bold text-white mt-1">Custom Sizing</h4>
                </div>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="text-xs font-serif text-[#C5A059] hover:underline flex items-center gap-1 font-bold text-left"
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
          <div className="flex items-center justify-center gap-4 text-slate-300">
            <span className="w-16 h-px bg-slate-300"></span>
            <h2 className="text-3xl font-serif font-bold text-[#0F172A] tracking-tight">
              Best Seller Products
            </h2>
            <span className="w-16 h-px bg-slate-300"></span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
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
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 border border-slate-200 bg-[#F8FAFC] space-y-1 hover:border-[#0F172A] transition-all">
              <Award className="w-6 h-6 text-[#0F172A] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#0F172A] uppercase">PESHAWAR GUILD</h5>
              <p className="text-[10px] text-slate-500 font-mono">Authentic Namak Mandi Atelier</p>
            </div>
            <div className="p-5 border border-slate-200 bg-[#F8FAFC] space-y-1 hover:border-[#0F172A] transition-all">
              <Award className="w-6 h-6 text-[#0F172A] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#0F172A] uppercase">FULL GRAIN LEATHER</h5>
              <p className="text-[10px] text-slate-500 font-mono">100% Genuine Calfskin & Cowhide</p>
            </div>
            <div className="p-5 border border-slate-200 bg-[#F8FAFC] space-y-1 hover:border-[#0F172A] transition-all">
              <Award className="w-6 h-6 text-[#0F172A] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#0F172A] uppercase">HAND STITCHED</h5>
              <p className="text-[10px] text-slate-500 font-mono">14+ Hours Per Pair</p>
            </div>
            <div className="p-5 border border-slate-200 bg-[#F8FAFC] space-y-1 hover:border-[#0F172A] transition-all">
              <Award className="w-6 h-6 text-[#0F172A] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#0F172A] uppercase">ROYAL SEAL</h5>
              <p className="text-[10px] text-slate-500 font-mono">Patron Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Size Finder Wizard Modal */}
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
