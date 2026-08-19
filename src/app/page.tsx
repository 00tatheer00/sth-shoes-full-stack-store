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
import { JsonLd } from '@/components/seo/JsonLd';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

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

  const collectionsData = [
    {
      title: 'Classic Collection',
      itemsCount: '12 ITEMS',
      bgClass: 'bg-slate-900',
      image: '/images/craft.png',
      slug: 'traditional-leather',
    },
    {
      title: 'Premium Leather',
      itemsCount: '10 ITEMS',
      bgClass: 'bg-slate-800',
      image: '/images/hero.png',
      slug: 'premium-calfskin',
    },
    {
      title: 'Traditional Collection',
      itemsCount: '09 ITEMS',
      bgClass: 'bg-blue-950',
      image: '/images/norozi.png',
      slug: 'traditional-leather',
    },
    {
      title: 'Kaptaan Collection',
      itemsCount: '08 ITEMS',
      bgClass: 'bg-slate-900',
      image: '/images/kaptaan.png',
      slug: 'kaptan-collection',
    },
    {
      title: 'New Arrivals',
      itemsCount: '15 ITEMS',
      bgClass: 'bg-indigo-950',
      image: '/images/zalmi.png',
      slug: 'zalmi-collection',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      {/* Schema.org Structured Data */}
      <JsonLd type="Organization" data={{}} />
      <JsonLd type="WebSite" data={{}} />

      {/* HERO SECTION */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Narrative */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px] font-bold tracking-wider text-blue-700 uppercase">
                  AUTHENTIC • HANDCRAFTED • TIMELESS
                </span>
              </div>

              {/* Display Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                The Heritage of <br />
                <span className="text-blue-600">Peshawar</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm text-slate-600 max-w-lg leading-relaxed font-sans">
                Experience authentic handmade Peshawari Chappal, crafted by master cobblers using full-grain calfskin leather and centuries-old Pashtun tradition.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/shop"
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
                >
                  <span>SHOP COLLECTION</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/craft"
                  className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
                >
                  <span>OUR CRAFT</span>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-3.5 pt-4">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                    SK
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    TM
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    BA
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                    HF
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-slate-900">4.9/5</span>
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">From 2,500+ Verified Customers</p>
                </div>
              </div>
            </div>

            {/* Right Column: Shoe Stage */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-4">
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                {/* Clean Stage Backdrop */}
                <div className="absolute inset-4 rounded-full bg-slate-100/80 blur-xl" />

                {/* Hero Peshawari Chappal */}
                <div className="relative w-full h-full z-10">
                  <Image
                    src="/images/hero.png"
                    alt="Authentic Peshawari Chappal Handmade in Peshawar"
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 460px"
                    className="object-contain p-4 drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating Badge 1 */}
                <div className="hero-floating-badge hidden sm:flex absolute top-2 right-2 p-2.5 pr-4 items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900 leading-tight">Premium Leather</div>
                    <div className="text-[10px] text-slate-500 leading-tight">100% full-grain cowhide</div>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="hero-floating-badge hidden sm:flex absolute bottom-28 -left-2 p-2.5 pr-4 items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900 leading-tight">Hand Stitched</div>
                    <div className="text-[10px] text-slate-500 leading-tight">Master cobbler precision</div>
                  </div>
                </div>

                {/* Floating Badge 3 */}
                <div className="hero-floating-badge hidden sm:flex absolute -bottom-2 right-4 p-2.5 pr-4 items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900 leading-tight">Durable Sole</div>
                    <div className="text-[10px] text-slate-500 leading-tight">Double tire rubber grip</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING 5-FEATURE TRUST BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 mb-16">
        <div className="floating-trust-bar p-5 sm:p-6 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 md:divide-x divide-slate-100">
          <div className="flex items-center gap-3 md:px-4">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">FREE DELIVERY</h4>
              <p className="text-[11px] text-slate-500">On orders above Rs. 5,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-4">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">GENUINE LEATHER</h4>
              <p className="text-[11px] text-slate-500">100% Premium Quality</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-4">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">SECURE COD</h4>
              <p className="text-[11px] text-slate-500">Cash on Delivery & Wallets</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-4">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">HANDCRAFTED</h4>
              <p className="text-[11px] text-slate-500">By Skilled Artisans</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:px-4 col-span-2 md:col-span-1">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">EASY EXCHANGE</h4>
              <p className="text-[11px] text-slate-500">7 Days Return Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* COLLECTIONS FOR EVERY STYLE */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
              EXPLORE OUR COLLECTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Collections For Every Style
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 uppercase tracking-wider"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {collectionsData.map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug}`}
              className="category-card bg-white border border-slate-200 hover:border-slate-400 text-slate-900 p-4 min-h-[220px] flex flex-col justify-between group shadow-2xs transition-all hover:-translate-y-1 rounded-2xl"
            >
              <div className="relative w-full h-28 my-auto bg-slate-50 border border-slate-100 rounded-xl p-2 flex items-center justify-center overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-xs"
                />
              </div>

              <div className="relative z-10 text-left pt-3">
                <h3 className="text-xs sm:text-sm font-bold leading-snug text-slate-900">{cat.title}</h3>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mt-0.5 font-semibold">
                  {cat.itemsCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HANDPICKED BESTSELLERS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
              POPULAR PESHAWARI CHAPPAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Handpicked Bestsellers
            </h2>
          </div>

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
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-slate-900 text-white shadow-xs ring-2 ring-slate-900/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 uppercase tracking-wider self-start lg:self-center"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </section>

      {/* CRAFTSMANSHIP BANNER */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 lg:p-12">
            <div className="lg:col-span-4 relative aspect-4/3 w-full rounded-xl overflow-hidden border border-slate-800 shadow-md">
              <Image
                src="/images/craft.png"
                alt="Master Artisan Crafting Peshawari Chappal"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block">
                OUR CRAFTSMANSHIP
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Made With Passion, <br />
                Perfected By Tradition
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-md">
                Every pair is a masterwork, handcrafted with dedication and precision to deliver unmatched comfort and timeless style.
              </p>
              <div className="pt-2">
                <Link
                  href="/craft"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-colors"
                >
                  <span>DISCOVER OUR CRAFT</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-slate-800/80 border border-slate-700/60 rounded-xl flex flex-col items-center justify-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold text-white">100+</div>
                <div className="text-[11px] text-slate-400">Skilled Artisans</div>
              </div>

              <div className="p-4 bg-slate-800/80 border border-slate-700/60 rounded-xl flex flex-col items-center justify-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold text-white">25+</div>
                <div className="text-[11px] text-slate-400">Years of Heritage</div>
              </div>

              <div className="p-4 bg-slate-800/80 border border-slate-700/60 rounded-xl flex flex-col items-center justify-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold text-white">10K+</div>
                <div className="text-[11px] text-slate-400">Happy Patrons</div>
              </div>

              <div className="p-4 bg-slate-800/80 border border-slate-700/60 rounded-xl flex flex-col items-center justify-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xl font-bold text-white">100%</div>
                <div className="text-[11px] text-slate-400">Handcrafted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY TRUST ICONS STRIP */}
      <section className="bg-white border-y border-slate-200 py-8 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 md:divide-x divide-slate-100">
            <div className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">100% Genuine Leather</h5>
                <p className="text-[11px] text-slate-500">Premium quality guaranteed</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Secure Payments</h5>
                <p className="text-[11px] text-slate-500">COD & online payment</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Nationwide Delivery</h5>
                <p className="text-[11px] text-slate-500">Fast TCS courier shipping</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">7 Days Exchange</h5>
                <p className="text-[11px] text-slate-500">Hassle-free return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Customer Support</h5>
                <p className="text-[11px] text-slate-500">Daily WhatsApp concierge</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
