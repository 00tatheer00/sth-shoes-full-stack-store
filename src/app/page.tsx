'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Truck,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Scissors,
  Layers,
  Award,
  Clock,
  HeartHandshake,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { JsonLd } from '@/components/seo/JsonLd';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter products for the 5-item bestsellers row
  const allBestsellers = [
    {
      id: 'prod-1',
      name: 'Kaptaan Double Sole Dark Chocolate',
      slug: 'kaptan-double-sole-dark-chocolate',
      category: 'Kaptan Collection',
      categorySlug: 'kaptan',
      price: 15299,
      salePrice: 12999,
      rating: 4.9,
      reviewsCount: 128,
      isBestSeller: true,
      isNew: false,
      featuredImage: '/images/kaptaan.png',
      images: ['/images/kaptaan.png', '/images/hero.png'],
      colors: [
        { name: 'Dark Brown', hex: '#27170B' },
        { name: 'Onyx Black', hex: '#121212' },
        { name: 'Camel Tan', hex: '#C18C5D' },
      ],
      sizes: [{ size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }],
      shortDescription: 'Double sole tire rubber with royal brass buckle.',
      description: 'Iconic Kaptaan double sole crafted in Peshawar.',
      materials: ['Full-Grain Leather', 'Tire Sole'],
      craftingDetails: ['Handcrafted in Namak Mandi'],
      soleType: 'Double Tire Rubber Sole',
      leatherType: 'Full-Grain Cowhide',
    },
    {
      id: 'prod-2',
      name: 'Zalmi Velcro Suede Camel',
      slug: 'zalmi-velvet-suede-camel',
      category: 'Zalmi Collection',
      categorySlug: 'premium',
      price: 16500,
      salePrice: 13999,
      rating: 4.8,
      reviewsCount: 96,
      isBestSeller: false,
      isNew: true,
      featuredImage: '/images/zalmi.png',
      images: ['/images/zalmi.png', '/images/hero.png'],
      colors: [
        { name: 'Camel Tan', hex: '#C18C5D' },
        { name: 'Chocolate', hex: '#27170B' },
        { name: 'Black', hex: '#121212' },
      ],
      sizes: [{ size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }],
      shortDescription: 'Refined suede texture with ergonomic comfort.',
      description: 'Zalmi suede luxury footwear.',
      materials: ['Suede Leather', 'Single Sole'],
      craftingDetails: ['Handcrafted in Namak Mandi'],
      soleType: 'Single Tire Sole',
      leatherType: 'Suede Leather',
    },
    {
      id: 'prod-3',
      name: 'Norozi Heavy Buckle Maroon',
      slug: 'norozi-heavy-buckle-maroon',
      category: 'Norozi Heritage',
      categorySlug: 'traditional',
      price: 17000,
      salePrice: 14999,
      rating: 4.8,
      reviewsCount: 76,
      isBestSeller: false,
      isNew: false,
      featuredImage: '/images/norozi.png',
      images: ['/images/norozi.png', '/images/craft.png'],
      colors: [
        { name: 'Heritage Maroon', hex: '#58181A' },
        { name: 'Dark Brown', hex: '#27170B' },
        { name: 'Black', hex: '#121212' },
      ],
      sizes: [{ size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }],
      shortDescription: 'Traditional broad strap with antique brass buckle.',
      description: 'Heirloom Norozi shape.',
      materials: ['Buff Leather', 'Heavy Sole'],
      craftingDetails: ['Hand-waxed linen stitching'],
      soleType: 'Heavy Tire Sole',
      leatherType: 'Buff Leather',
    },
    {
      id: 'prod-4',
      name: 'Royal Calfskin Atelier Tan',
      slug: 'royal-calfskin-atelier-tan',
      category: 'Premium Calfskin',
      categorySlug: 'premium',
      price: 19500,
      salePrice: 16999,
      rating: 4.9,
      reviewsCount: 102,
      isBestSeller: true,
      isNew: false,
      featuredImage: '/images/hero.png',
      images: ['/images/hero.png', '/images/kaptaan.png'],
      colors: [
        { name: 'Atelier Tan', hex: '#B87333' },
        { name: 'Dark Brown', hex: '#27170B' },
        { name: 'Black', hex: '#121212' },
      ],
      sizes: [{ size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }],
      shortDescription: 'Ultra-supple full-grain calfskin leather.',
      description: 'Luxury Italian calfskin.',
      materials: ['Full-Grain Calfskin'],
      craftingDetails: ['Artisan signature on sole'],
      soleType: 'Moulded Rubber Sole',
      leatherType: 'Calfskin',
    },
    {
      id: 'prod-5',
      name: 'Classic Namak Mandi Black',
      slug: 'classic-namak-mandi-black',
      category: 'Traditional Leather',
      categorySlug: 'new-arrivals',
      price: 11999,
      salePrice: 9999,
      rating: 4.7,
      reviewsCount: 51,
      isBestSeller: false,
      isNew: true,
      featuredImage: '/images/craft.png',
      images: ['/images/craft.png', '/images/kaptaan.png'],
      colors: [
        { name: 'Classic Black', hex: '#121212' },
        { name: 'Dark Brown', hex: '#27170B' },
        { name: 'Mustard', hex: '#C18C5D' },
      ],
      sizes: [{ size: 40, inStock: true }, { size: 41, inStock: true }, { size: 42, inStock: true }],
      shortDescription: 'Iconic daily wear traditional pattern.',
      description: '100-year traditional cobbling.',
      materials: ['Harness Leather'],
      craftingDetails: ['Hand hammered sole'],
      soleType: 'Standard Tire Sole',
      leatherType: 'Harness Leather',
    },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? allBestsellers
      : allBestsellers.filter((p) => p.categorySlug === activeCategory);

  // 5 Jewel-Toned Collections (Matching Reference Image)
  const collectionsData = [
    {
      title: 'Classic Collection',
      itemsCount: '12 ITEMS',
      bgClass: 'bg-[#0A3B2C]', // Forest Emerald
      image: '/images/craft.png',
      slug: 'traditional-leather',
    },
    {
      title: 'Premium Leather',
      itemsCount: '10 ITEMS',
      bgClass: 'bg-[#5C3619]', // Saddle Tobacco Brown
      image: '/images/hero.png',
      slug: 'premium-calfskin',
    },
    {
      title: 'Traditional Collection',
      itemsCount: '09 ITEMS',
      bgClass: 'bg-[#153B68]', // Royal Navy
      image: '/images/norozi.png',
      slug: 'traditional-leather',
    },
    {
      title: 'Kaptaan Collection',
      itemsCount: '08 ITEMS',
      bgClass: 'bg-[#4A1266]', // Imperial Plum Purple
      image: '/images/kaptaan.png',
      slug: 'kaptan-collection',
    },
    {
      title: 'New Arrivals',
      itemsCount: '15 ITEMS',
      bgClass: 'bg-[#8B1C28]', // Crimson Ruby Red
      image: '/images/zalmi.png',
      slug: 'zalmi-collection',
    },
  ];

  return (
    <div className="bg-[#FAF6EF] min-h-screen text-[#1C1917]">
      {/* Schema.org Structured Data */}
      <JsonLd type="Organization" data={{}} />
      <JsonLd type="WebSite" data={{}} />

      {/* ══════════════════════════════════════════════════════
          1. HERO SECTION (MATCHING REFERENCE IMAGE)
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#FAF6EF] pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        {/* Subtle Peshawar Historic Architecture Silhouette Backdrop */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-15 pointer-events-none bg-contain bg-no-repeat bg-right"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(13,51,37,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Narrative */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Green Pill Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF2ED] border border-[#D5E5DA] rounded-full">
                <span className="text-xs">🌿</span>
                <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#0D3325] uppercase">
                  AUTHENTIC • PREMIUM • TIMELESS
                </span>
              </div>

              {/* Display Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-serif font-bold text-[#1C1917] leading-[1.08] tracking-tight">
                The Legacy of <br />
                <span className="text-[#0D3325]">Peshawar</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#5A6578] max-w-lg leading-relaxed font-sans">
                Experience the finest handmade Peshawari Chappal, crafted by skilled artisans using premium leather and centuries-old tradition.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/shop"
                  className="btn-forest px-7 py-3.5 text-xs shadow-md"
                >
                  <span>SHOP COLLECTION</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/craft"
                  className="btn-outline-dark px-7 py-3.5 text-xs shadow-2xs"
                >
                  <span>OUR CRAFT</span>
                </Link>
              </div>

              {/* Social Proof Avatars & 4.9/5 Rating */}
              <div className="flex items-center justify-center lg:justify-start gap-3.5 pt-4">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#0D3325] text-white text-[10px] font-bold flex items-center justify-center">
                    SK
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#5C3619] text-white text-[10px] font-bold flex items-center justify-center">
                    TM
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#153B68] text-white text-[10px] font-bold flex items-center justify-center">
                    BA
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#E5A93C] text-[#1C1917] text-[10px] font-bold flex items-center justify-center">
                    HF
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-[#1C1917]">4.9/5</span>
                    <div className="flex text-[#E5A93C]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#5A6578]">From 2,500+ Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Right Column: Pedestal Shoe Stage with 3 Floating Feature Badges */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-4 lg:py-6">
              {/* Central Elevated Pedestal Display */}
              <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center">
                {/* Stone / Wooden Round Base Effect */}
                <div className="absolute bottom-6 w-3/4 h-20 sm:h-24 rounded-full bg-gradient-to-t from-[#D8CEBE] to-[#EDE5D8] shadow-lg blur-xs border border-[#C5BBAA]/40" />

                {/* Hero Peshawari Chappal */}
                <div className="relative w-full h-full z-10">
                  <Image
                    src="/images/hero.png"
                    alt="Authentic Peshawari Chappal Handmade in Peshawar"
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 460px"
                    className="object-contain p-2 sm:p-4 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge 1 (Top Right: Premium Leather) */}
                <div className="hero-floating-badge hidden sm:flex absolute top-1 sm:top-2 right-0 sm:right-2 p-2 sm:p-2.5 pr-4 items-center gap-2.5 z-20 scale-90 sm:scale-100 origin-top-right">
                  <div className="w-7 h-7 sm:w-8 h-8 rounded-full bg-[#0D3325] text-white flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5A93C]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#1C1917] leading-tight">Premium Leather</div>
                    <div className="text-[8px] sm:text-[9px] text-[#5A6578] leading-tight">Finest quality comfort</div>
                  </div>
                </div>

                {/* Floating Badge 2 (Mid Left: Hand Stitched) */}
                <div className="hero-floating-badge hidden sm:flex absolute bottom-24 sm:bottom-32 -left-2 sm:left-0 p-2 sm:p-2.5 pr-4 items-center gap-2.5 z-20 scale-90 sm:scale-100 origin-bottom-left">
                  <div className="w-7 h-7 sm:w-8 h-8 rounded-full bg-[#0D3325] text-white flex items-center justify-center flex-shrink-0">
                    <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5A93C]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#1C1917] leading-tight">Hand Stitched</div>
                    <div className="text-[8px] sm:text-[9px] text-[#5A6578] leading-tight">Master cobbler precision</div>
                  </div>
                </div>

                {/* Floating Badge 3 (Bottom Right: Durable Sole) */}
                <div className="hero-floating-badge hidden sm:flex absolute -bottom-2 sm:bottom-0 right-2 sm:right-4 p-2 sm:p-2.5 pr-4 items-center gap-2.5 z-20 scale-90 sm:scale-100 origin-bottom-right">
                  <div className="w-7 h-7 sm:w-8 h-8 rounded-full bg-[#0D3325] text-white flex items-center justify-center flex-shrink-0">
                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5A93C]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#1C1917] leading-tight">Durable Sole</div>
                    <div className="text-[8px] sm:text-[9px] text-[#5A6578] leading-tight">Double tire rubber grip</div>
                  </div>
                </div>

                {/* 360° VIEW Pill on Bottom Right */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-0 z-30">
                  <div className="px-2.5 py-1 rounded-full bg-white/90 border border-[#E5A93C] text-[#E5A93C] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                    <span>360°</span>
                    <span>VIEW</span>
                  </div>
                </div>
              </div>

              {/* Mobile Features Strip under shoe on small screens (<640px) */}
              <div className="flex sm:hidden flex-wrap items-center justify-center gap-2 mt-4 z-20">
                <span className="px-2.5 py-1 bg-white border border-[#EAE3D5] rounded-full text-[10px] font-semibold text-[#0D3325] shadow-xs">
                  ✓ 100% Genuine Leather
                </span>
                <span className="px-2.5 py-1 bg-white border border-[#EAE3D5] rounded-full text-[10px] font-semibold text-[#0D3325] shadow-xs">
                  ✓ Hand Stitched
                </span>
                <span className="px-2.5 py-1 bg-white border border-[#EAE3D5] rounded-full text-[10px] font-semibold text-[#0D3325] shadow-xs">
                  ✓ Double Tyre Sole
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. FLOATING 5-FEATURE TRUST BAR (MATCHING REFERENCE)
          ══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20 mb-16">
        <div className="floating-trust-bar p-5 sm:p-6 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 md:divide-x divide-[#EAE3D5]">
          {/* 1. Free Delivery */}
          <div className="flex items-center gap-3 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#EAF2ED] flex items-center justify-center text-[#0D3325] flex-shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wide">FREE DELIVERY</h4>
              <p className="text-[10px] text-[#5A6578]">On orders above Rs. 5,000</p>
            </div>
          </div>

          {/* 2. Genuine Leather */}
          <div className="flex items-center gap-3 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#EAF2ED] flex items-center justify-center text-[#0D3325] flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wide">GENUINE LEATHER</h4>
              <p className="text-[10px] text-[#5A6578]">100% Premium Leather</p>
            </div>
          </div>

          {/* 3. Secure Payments */}
          <div className="flex items-center gap-3 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#EAF2ED] flex items-center justify-center text-[#0D3325] flex-shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wide">SECURE PAYMENTS</h4>
              <p className="text-[10px] text-[#5A6578]">COD, Cards & Wallets</p>
            </div>
          </div>

          {/* 4. Handcrafted */}
          <div className="flex items-center gap-3 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#EAF2ED] flex items-center justify-center text-[#0D3325] flex-shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wide">HANDCRAFTED</h4>
              <p className="text-[10px] text-[#5A6578]">By Skilled Artisans</p>
            </div>
          </div>

          {/* 5. Easy Returns */}
          <div className="flex items-center gap-3 md:px-4 col-span-2 md:col-span-1">
            <div className="w-9 h-9 rounded-full bg-[#EAF2ED] flex items-center justify-center text-[#0D3325] flex-shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wide">EASY RETURNS</h4>
              <p className="text-[10px] text-[#5A6578]">7 Days Exchange Policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. COLLECTIONS FOR EVERY STYLE (5 JEWEL-TONED CARDS)
          ══════════════════════════════════════════════════════ */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0D3325] block mb-1">
              EXPLORE OUR COLLECTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
              Collections For Every Style
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#1C1917] hover:text-[#0D3325] flex items-center gap-1 uppercase tracking-wider"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5 Rich Jewel-Toned Rounded Collection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {collectionsData.map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug}`}
              className={`category-card ${cat.bgClass} text-white p-5 min-h-[220px] flex flex-col justify-between group shadow-sm`}
            >
              {/* Subtle background mandala / geometry overlay */}
              <div className="absolute inset-0 bg-radial from-white/10 to-transparent opacity-40 pointer-events-none" />

              {/* Chappal Artwork floating in center */}
              <div className="relative w-full h-28 my-auto">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                />
              </div>

              {/* Bottom Card Title & Item Count */}
              <div className="relative z-10 text-left pt-2">
                <h3 className="text-sm font-serif font-bold leading-snug">{cat.title}</h3>
                <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest block mt-0.5">
                  {cat.itemsCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. HANDPICKED BESTSELLERS (5 PRODUCT CARDS GRID)
          ══════════════════════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0D3325] block mb-1">
              POPULAR PESHAWARI CHAPPAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
              Handpicked Bestsellers
            </h2>
          </div>

          {/* Filter Pills: ALL, KAPTAAN, TRADITIONAL, PREMIUM, NEW ARRIVALS */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'ALL' },
              { id: 'kaptan', label: 'KAPTAAN' },
              { id: 'traditional', label: 'TRADITIONAL' },
              { id: 'premium', label: 'PREMIUM' },
              { id: 'new-arrivals', label: 'NEW ARRIVALS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#0D3325] text-white shadow-xs'
                    : 'bg-white text-[#1C1917] border border-[#EAE3D5] hover:border-[#0D3325]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-[#1C1917] hover:text-[#0D3325] flex items-center gap-1 uppercase tracking-wider self-start lg:self-center"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-Column Grid Matching Reference Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. CRAFTSMANSHIP BANNER (MATCHING REFERENCE IMAGE)
          ══════════════════════════════════════════════════════ */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A2A1E] text-white rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 lg:p-12">
            {/* Left: Artisan photo at workbench */}
            <div className="lg:col-span-4 relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 w-full rounded-lg overflow-hidden border border-white/10 shadow-md">
              <Image
                src="/images/craft.png"
                alt="Master Artisan Crafting Peshawari Chappal"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Center: Narrative & Amber CTA */}
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E5A93C] block">
                OUR CRAFTSMANSHIP
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                Made With Passion, <br />
                Perfected By Tradition
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans max-w-md">
                Every pair is a masterpiece, handcrafted with dedication and precision to deliver unmatched quality and timeless style.
              </p>
              <div className="pt-2">
                <Link
                  href="/craft"
                  className="btn-amber px-6 py-3 text-xs inline-flex"
                >
                  <span>DISCOVER OUR CRAFT</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Right: 4 Circular Stats in 2x2 Layout */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-4 text-center">
              {/* Stat 1 */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center space-y-1">
                <div className="w-9 h-9 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold font-serif text-white">100+</div>
                <div className="text-[10px] text-white/70 font-sans">Skilled Artisans</div>
              </div>

              {/* Stat 2 */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center space-y-1">
                <div className="w-9 h-9 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold font-serif text-white">25+</div>
                <div className="text-[10px] text-white/70 font-sans">Years of Tradition</div>
              </div>

              {/* Stat 3 */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center space-y-1">
                <div className="w-9 h-9 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold font-serif text-white">10K+</div>
                <div className="text-[10px] text-white/70 font-sans">Happy Customers</div>
              </div>

              {/* Stat 4 */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center space-y-1">
                <div className="w-9 h-9 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold font-serif text-white">100%</div>
                <div className="text-[10px] text-white/70 font-sans">Handcrafted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. SECONDARY TRUST ICONS STRIP (MATCHING REFERENCE)
          ══════════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-[#EAE3D5] py-8 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 md:divide-x divide-[#EAE3D5]">
            {/* 1. Genuine Leather */}
            <div className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EF] border border-[#E5A93C]/40 text-[#B87A44] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#1C1917]">100% Genuine Leather</h5>
                <p className="text-[10px] text-[#5A6578]">Premium quality guaranteed</p>
              </div>
            </div>

            {/* 2. Secure Payments */}
            <div className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EF] border border-[#E5A93C]/40 text-[#B87A44] flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#1C1917]">Secure Payments</h5>
                <p className="text-[10px] text-[#5A6578]">Multiple safe payment options</p>
              </div>
            </div>

            {/* 3. Nationwide Delivery */}
            <div className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EF] border border-[#E5A93C]/40 text-[#B87A44] flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#1C1917]">Nationwide Delivery</h5>
                <p className="text-[10px] text-[#5A6578]">Fast & reliable shipping</p>
              </div>
            </div>

            {/* 4. 7 Days Easy Exchange */}
            <div className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EF] border border-[#E5A93C]/40 text-[#B87A44] flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#1C1917]">7 Days Easy Exchange</h5>
                <p className="text-[10px] text-[#5A6578]">Hassle free returns</p>
              </div>
            </div>

            {/* 5. Customer Support */}
            <div className="flex items-center gap-3 px-3 col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-full bg-[#FAF6EF] border border-[#E5A93C]/40 text-[#B87A44] flex items-center justify-center flex-shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#1C1917]">Customer Support</h5>
                <p className="text-[10px] text-[#5A6578]">We are here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
