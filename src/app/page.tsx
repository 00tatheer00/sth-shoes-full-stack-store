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
  Heart,
  Star,
  Zap,
} from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { SizeFinderModal } from '@/components/shop/SizeFinderModal';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import { JsonLd } from '@/components/seo/JsonLd';

export default function HomePage() {
  const { showToast, addToCart } = useStore();
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Interactive Hero Product Switcher State
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroModels = [
    {
      id: 'm1',
      title: 'Kaptan Double Sole Dark Chocolate',
      category: 'Kaptan Collection',
      tagline: 'Handcrafted Double Rubber Sole with Royal Buckle',
      price: 12999,
      originalPrice: 15500,
      image: '/images/hero.png',
      colorName: 'Dark Chocolate',
      colorHex: '#27170B',
      slug: 'kaptan-double-sole-dark-chocolate',
    },
    {
      id: 'm2',
      title: 'Zalmi Velvet-Suede Camel',
      category: 'Zalmi Collection',
      tagline: 'Lightweight Suede Comfort Signature Edition',
      price: 13999,
      originalPrice: 16000,
      image: '/images/zalmi.png',
      colorName: 'Camel Beige',
      colorHex: '#C59B27',
      slug: 'zalmi-velvet-suede-camel',
    },
    {
      id: 'm3',
      title: 'Norozi Heavy Buckle Maroon',
      category: 'Norozi Heritage',
      tagline: 'Traditional Heavy Brass Buckle & Double Leather Tire Sole',
      price: 14999,
      originalPrice: 18000,
      image: '/images/norozi.png',
      colorName: 'Peshawar Maroon',
      colorHex: '#5C1D24',
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
      colorName: 'Atelier Tan',
      colorHex: '#B87546',
      slug: 'royal-calfskin-atelier-tan',
    },
  ];

  const currentHero = heroModels[activeHeroIndex];

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    showToast(`🎉 Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isNew || p.isBestSeller);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#120A07]">
      {/* Schema.org Structured Data */}
      <JsonLd type="Organization" data={{}} />
      <JsonLd type="WebSite" data={{}} />

      {/* Top Interactive Click-to-Copy Coupon Ribbon */}
      <div className="bg-[#120A07] text-[#FAF6F0] py-2.5 px-4 text-center text-xs font-mono border-b border-[#D4AF37]/30 flex flex-wrap items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#F3C649] animate-pulse" />
        <span>Get 10% OFF on Peshawar Heritage Selection • Code:</span>
        <button
          onClick={() => handleCopyCoupon('PESHAWAR10')}
          className="px-2 py-0.5 bg-[#D4AF37] text-[#120A07] font-bold uppercase tracking-wider hover:bg-[#F3C649] transition-all flex items-center gap-1 cursor-pointer shadow-sm"
          title="Click to copy promo code"
        >
          {copiedCoupon ? <CheckCircle2 className="w-3.5 h-3.5 text-green-800" /> : <Copy className="w-3 h-3" />}
          <span>PESHAWAR10</span>
        </button>
        <span className="text-[#D4AF37]/80 text-[11px] hidden sm:inline">(Click code to copy)</span>
      </div>

      {/* Dynamic Interactive Split Hero Section */}
      <section className="relative bg-[#F3EBDD] border-b border-[#E6D8C3] py-12 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Interactive Details & Selector */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#D4AF37] shadow-sm">
                <Zap className="w-3.5 h-3.5 text-[#C84B31]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86D3B] font-bold">
                  Interactive Model Switcher
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                  {currentHero.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#120A07] tracking-tight leading-tight">
                  {currentHero.title}
                </h1>
                <p className="text-sm font-sans text-[#3A2012]/80 italic max-w-xl">
                  "{currentHero.tagline}"
                </p>
              </div>

              {/* Price & Savings Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                <span className="text-3xl font-serif font-bold text-[#120A07]">
                  {formatPKR(currentHero.price)}
                </span>
                <span className="text-sm text-gray-500 line-through font-mono">
                  {formatPKR(currentHero.originalPrice)}
                </span>
                <span className="px-2.5 py-1 bg-[#C84B31] text-white text-xs font-mono font-bold uppercase shadow-sm">
                  SAVE {formatPKR(currentHero.originalPrice - currentHero.price)}
                </span>
              </div>

              {/* Interactive Model Switcher Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase text-[#3A2012] font-bold block mb-2">
                  Select Article Model to Preview:
                </span>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {heroModels.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveHeroIndex(idx)}
                      className={`px-3 py-2 text-xs font-serif transition-all border ${
                        activeHeroIndex === idx
                          ? 'bg-[#120A07] text-[#F3C649] border-[#D4AF37] shadow-md font-bold scale-105'
                          : 'bg-white text-[#120A07] border-[#E6D8C3] hover:border-[#D4AF37]'
                      }`}
                    >
                      {m.category.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                <Link
                  href={`/product/${currentHero.slug}`}
                  className="px-8 py-4 bg-[#120A07] text-[#FAF6F0] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#C84B31] transition-colors border border-[#D4AF37]/30 shadow-2xl flex items-center justify-center gap-2"
                >
                  Order This Article <ArrowRight className="w-4 h-4 text-[#F3C649]" />
                </Link>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="px-6 py-4 bg-white text-[#120A07] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#FAF6F0] transition-colors border border-[#E6D8C3] flex items-center justify-center gap-2 shadow-xs"
                >
                  <Ruler className="w-4 h-4 text-[#D4AF37]" /> Size Finder Wizard
                </button>
              </div>
            </div>

            {/* Right Interactive Floating Shoe Stage */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square bg-white border-2 border-[#D4AF37]/40 shadow-2xl p-6 rounded-none group">
                <Image
                  src={currentHero.image}
                  alt={currentHero.title}
                  fill
                  priority
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#120A07] text-[#F3C649] text-[10px] font-mono uppercase font-bold border border-[#D4AF37] shadow-lg">
                  Handcrafted in Peshawar
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Interactive Trust Feature Strip */}
      <section className="bg-white border-b border-[#E6D8C3] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-3 border-r sm:border-r-0 lg:border-r border-[#E6D8C3]">
              <div className="w-11 h-11 rounded-full bg-[#FAF6F0] border border-[#D4AF37] flex items-center justify-center text-[#C86D3B] shadow-xs">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#120A07] uppercase">FREE NATIONWIDE COD</h4>
                <p className="text-[11px] text-[#3A2012]/70 font-sans">Free express delivery over Rs. 5,000</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 border-r sm:border-r-0 lg:border-r border-[#E6D8C3]">
              <div className="w-11 h-11 rounded-full bg-[#FAF6F0] border border-[#D4AF37] flex items-center justify-center text-[#C86D3B] shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#120A07] uppercase">AUTHENTICITY GUARANTEE</h4>
                <p className="text-[11px] text-[#3A2012]/70 font-sans">100% genuine full-grain leather</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 border-r sm:border-r-0 lg:border-r border-[#E6D8C3]">
              <div className="w-11 h-11 rounded-full bg-[#FAF6F0] border border-[#D4AF37] flex items-center justify-center text-[#C86D3B] shadow-xs">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#120A07] uppercase">ATELIER CONCIERGE 24/7</h4>
                <p className="text-[11px] text-[#3A2012]/70 font-sans">Peshawar WhatsApp sizing help</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3">
              <div className="w-11 h-11 rounded-full bg-[#FAF6F0] border border-[#D4AF37] flex items-center justify-center text-[#C86D3B] shadow-xs">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#120A07] uppercase">FLEXIBLE PAYMENTS</h4>
                <p className="text-[11px] text-[#3A2012]/70 font-sans">Cash on Delivery & Mobile Wallets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Catalog Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-[#D4AF37]">
            <span className="w-16 h-px bg-[#D4AF37]"></span>
            <h2 className="text-3xl font-serif font-bold text-[#120A07] tracking-tight">
              Featured Peshawari Footwear
            </h2>
            <span className="w-16 h-px bg-[#D4AF37]"></span>
          </div>
          <p className="text-xs text-[#3A2012]/70 font-mono">
            Handcrafted with precision in Namak Mandi • Hover color swatches to live preview shades
          </p>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} showCountdown={idx === 1} />
          ))}
        </div>
      </section>

      {/* Collection Banner Grid */}
      <section className="py-10 bg-white border-y border-[#E6D8C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Banner Card */}
            <div className="lg:col-span-6 relative bg-[#F3EBDD] border border-[#E6D8C3] min-h-[360px] p-8 flex flex-col justify-between overflow-hidden group shadow-xs">
              <div className="relative z-10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C86D3B] font-bold">
                  Heritage Craftsmanship
                </span>
                <h3 className="text-3xl font-serif font-bold text-[#120A07]">
                  Royal Peshawari <br />
                  <span className="italic font-serif font-normal">Chappal Collection</span>
                </h3>
              </div>
              <div className="relative z-10">
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3.5 bg-[#120A07] text-[#FAF6F0] text-xs font-serif uppercase tracking-widest font-bold hover:bg-[#C84B31] transition-colors border border-[#D4AF37]/30 shadow-lg"
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
              <div className="bg-[#120A07] text-[#FAF6F0] p-6 flex flex-col justify-between min-h-[170px] border border-[#D4AF37]/30 shadow-md">
                <div>
                  <span className="text-[10px] font-mono text-[#F3C649] uppercase tracking-widest">Peshawar Guild</span>
                  <h4 className="text-xl font-serif font-bold text-[#FAF6F0] mt-1">Gentlemen Edition</h4>
                </div>
                <Link href="/shop" className="text-xs font-serif text-[#F3C649] hover:underline flex items-center gap-1 font-bold">
                  Shop Gentlemen <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-[#FAF6F0] border border-[#E6D8C3] p-6 flex flex-col justify-between min-h-[170px] shadow-xs hover:border-[#D4AF37] transition-all">
                <div className="relative w-full h-24">
                  <Image src="/images/kaptaan.png" alt="Kaptaan Chappal" fill className="object-contain" />
                </div>
                <div className="text-center pt-1">
                  <h5 className="text-xs font-serif font-bold text-[#120A07]">Kaptaan Double Sole</h5>
                  <span className="text-[11px] font-mono font-bold text-[#C86D3B]">From Rs. 12,999</span>
                </div>
              </div>

              <div className="bg-[#FAF6F0] border border-[#E6D8C3] p-6 flex flex-col justify-between min-h-[170px] shadow-xs hover:border-[#D4AF37] transition-all">
                <div className="relative w-full h-24">
                  <Image src="/images/norozi.png" alt="Norozi Chappal" fill className="object-contain" />
                </div>
                <div className="text-center pt-1">
                  <h5 className="text-xs font-serif font-bold text-[#120A07]">Norozi Heavy Buckle</h5>
                  <span className="text-[11px] font-mono font-bold text-[#C86D3B]">From Rs. 14,999</span>
                </div>
              </div>

              <div className="bg-[#3A2012] text-[#FAF6F0] p-6 flex flex-col justify-between min-h-[170px] border border-[#D4AF37]/30 shadow-md">
                <div>
                  <span className="text-[10px] font-mono text-[#F3C649] uppercase tracking-widest">Bespoke Fit</span>
                  <h4 className="text-xl font-serif font-bold text-[#FAF6F0] mt-1">Custom Sizing</h4>
                </div>
                <button
                  onClick={() => setSizeModalOpen(true)}
                  className="text-xs font-serif text-[#F3C649] hover:underline flex items-center gap-1 font-bold text-left"
                >
                  Size Finder Tool <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Seller Products Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-[#D4AF37]">
            <span className="w-16 h-px bg-[#D4AF37]"></span>
            <h2 className="text-3xl font-serif font-bold text-[#120A07] tracking-tight">
              Best Seller Products
            </h2>
            <span className="w-16 h-px bg-[#D4AF37]"></span>
          </div>
          <p className="text-xs text-[#3A2012]/70 font-mono">
            Only the highest rated articles chosen by patrons across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Seals Bar */}
      <section className="py-12 bg-white border-t border-[#E6D8C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 border border-[#E6D8C3] bg-[#FAF6F0] space-y-1 shadow-2xs hover:border-[#D4AF37] transition-all">
              <Award className="w-7 h-7 text-[#D4AF37] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#120A07] uppercase">PESHAWAR GUILD</h5>
              <p className="text-[10px] text-[#3A2012]/70 font-mono">Authentic Namak Mandi Atelier</p>
            </div>
            <div className="p-5 border border-[#E6D8C3] bg-[#FAF6F0] space-y-1 shadow-2xs hover:border-[#D4AF37] transition-all">
              <Award className="w-7 h-7 text-[#D4AF37] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#120A07] uppercase">FULL GRAIN LEATHER</h5>
              <p className="text-[10px] text-[#3A2012]/70 font-mono">100% Genuine Calfskin & Cowhide</p>
            </div>
            <div className="p-5 border border-[#E6D8C3] bg-[#FAF6F0] space-y-1 shadow-2xs hover:border-[#D4AF37] transition-all">
              <Award className="w-7 h-7 text-[#D4AF37] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#120A07] uppercase">HAND STITCHED</h5>
              <p className="text-[10px] text-[#3A2012]/70 font-mono">14+ Hours Per Pair</p>
            </div>
            <div className="p-5 border border-[#E6D8C3] bg-[#FAF6F0] space-y-1 shadow-2xs hover:border-[#D4AF37] transition-all">
              <Award className="w-7 h-7 text-[#D4AF37] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#120A07] uppercase">ROYAL SEAL</h5>
              <p className="text-[10px] text-[#3A2012]/70 font-mono">Patron Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Size Finder Wizard Modal */}
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
