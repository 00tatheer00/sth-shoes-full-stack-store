'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Star,
  Quote,
  CheckCircle2,
} from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, CRAFT_STEPS, MOCK_REVIEWS } from '@/data/mockData';

export default function HomePage() {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');

  const featuredProducts =
    selectedCategoryTab === 'all'
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.categorySlug === selectedCategoryTab);

  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="space-y-20 md:space-y-32 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] bg-[#1F130E] text-[#FAF7F2] overflow-hidden flex items-center border-b border-[#3A2315]">
        {/* Decorative Background Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3A2315] border border-[#C59B27]/40 text-[#C59B27] text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Peshawar Atelier Edition 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#FAF7F2] leading-[1.08] tracking-tight">
                Authentic Heritage. <br />
                <span className="text-[#C59B27] italic font-normal">Handmade in Peshawar.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#E2D7C7]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
                Step into centuries of royal Pashtun craftsmanship. Built from full-grain cowhide, vegetable-tanned leathers, and high-grip recycled tire soles for the modern gentleman who walks with quiet authority.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-[#C59B27] text-[#1F130E] font-serif font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-3 border border-[#C59B27]"
                >
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/craft"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#FAF7F2] font-serif font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#3A2315] transition-colors border border-[#E2D7C7]/40 flex items-center justify-center gap-2"
                >
                  Our Craft
                </Link>
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#3A2315] max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#C59B27]">100%</div>
                  <div className="text-[11px] font-mono text-[#E2D7C7]/70 uppercase">Genuine Leather</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#C59B27]">14+ Hrs</div>
                  <div className="text-[11px] font-mono text-[#E2D7C7]/70 uppercase">Artisan Handwork</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#C59B27]">200+</div>
                  <div className="text-[11px] font-mono text-[#E2D7C7]/70 uppercase">Cities Delivered</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/5 w-full bg-[#3A2315] border-2 border-[#C59B27]/30 shadow-2xl p-3">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/hero.png"
                    alt="Tatheer Chappalz Handcrafted Peshawari Footwear"
                    fill
                    priority
                    className="object-cover img-zoom"
                  />
                </div>
                {/* Floating Craft Badge */}
                <div className="absolute -bottom-6 -left-6 bg-[#1F130E] border border-[#C59B27] p-4 text-[#FAF7F2] shadow-2xl hidden sm:block">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-[#C59B27]" />
                    <div>
                      <div className="text-xs font-serif font-bold">Kaptan Royal Edition</div>
                      <div className="text-[10px] font-mono text-[#C59B27]">Namak Mandi Master Guild</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E2D7C7]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B87546] font-bold">
              Curated Footwear
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1F130E] mt-1">
              Featured Collection
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setSelectedCategoryTab('all')}
              className={`px-4 py-2 text-xs font-serif uppercase tracking-wider transition-colors border ${
                selectedCategoryTab === 'all'
                  ? 'bg-[#1F130E] text-[#C59B27] border-[#1F130E] font-bold'
                  : 'bg-white text-[#1F130E] border-[#E2D7C7] hover:border-[#B87546]'
              }`}
            >
              All Models
            </button>
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryTab(cat.slug)}
                className={`px-4 py-2 text-xs font-serif uppercase tracking-wider transition-colors border ${
                  selectedCategoryTab === cat.slug
                    ? 'bg-[#1F130E] text-[#C59B27] border-[#1F130E] font-bold'
                    : 'bg-white text-[#1F130E] border-[#E2D7C7] hover:border-[#B87546]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#4A2E1D] text-[#FAF7F2] font-serif text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1F130E] transition-colors"
          >
            Explore Complete Shop Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. HERITAGE STORY (EDITORIAL ASYMMETRIC LAYOUT) */}
      <section className="bg-[#EAE3D2] py-20 border-y border-[#E2D7C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 w-full bg-[#1F130E] border border-[#E2D7C7] shadow-2xl overflow-hidden">
                <Image
                  src="/images/craft.png"
                  alt="Master Artisan Cobbler in Peshawar"
                  fill
                  className="object-cover img-zoom"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#1F130E] text-[#FAF7F2] p-6 hidden md:flex flex-col justify-between border border-[#C59B27]">
                <Quote className="w-8 h-8 text-[#C59B27]" />
                <p className="text-xs font-serif italic text-[#E2D7C7]">
                  "Each stitch holds the dignity of Peshawar."
                </p>
                <span className="text-[10px] font-mono text-[#C59B27] uppercase">Ustad Ghulam Ali</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B87546] font-bold">
                Peshawar Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1F130E] leading-tight">
                The Art of Peshawari Craftsmanship
              </h2>
              <p className="text-sm text-[#1F130E]/80 leading-relaxed font-sans">
                In the historic lanes of Namak Mandi in Peshawar, footwear crafting is not merely manufacturing—it is an inherited art passed down through family guilds for over a century.
              </p>
              <p className="text-sm text-[#1F130E]/80 leading-relaxed font-sans">
                At Tatheer Chappalz, every pair is handcrafted individually. From hand-beveling recycled aircraft tire soles to waxing heavy linen awl threads, we uphold absolute fidelity to authentic Pashtun shoe-making standards.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#4A2E1D] hover:text-[#B87546] border-b-2 border-[#4A2E1D] pb-1 transition-colors"
                >
                  Read Our Heritage Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CRAFTSMANSHIP (5-STEP BREAKDOWN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B87546] font-bold">
            Uncompromising Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1F130E]">
            5 Stages of Handmade Perfection
          </h2>
          <p className="text-xs sm:text-sm text-[#4A2E1D]/70 font-sans">
            How our master artisans transform raw full-grain hides into iconic Peshawari footwear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {CRAFT_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="p-6 bg-white border border-[#E2D7C7] hover:border-[#B87546] transition-all flex flex-col justify-between group shadow-xs hover:shadow-xl"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[#C59B27] bg-[#1F130E] px-2.5 py-1 inline-block mb-4">
                  0{step.stepNumber}
                </span>
                <h3 className="text-sm font-serif font-bold text-[#1F130E] mb-2 group-hover:text-[#B87546] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-[#4A2E1D]/75 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#FAF7F2] text-[11px] font-mono text-[#B87546]">
                {step.subtitle}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COLLECTIONS GRID */}
      <section className="bg-[#1F130E] text-[#FAF7F2] py-20 border-y border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C59B27]">
              Explore Categories
            </span>
            <h2 className="text-3xl font-serif font-bold">Curated Heritage Collections</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_CATEGORIES.slice(0, 3).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative aspect-4/5 bg-[#3A2315] border border-[#3A2315] overflow-hidden flex flex-col justify-end p-6 hover:border-[#C59B27] transition-all duration-500"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F130E] via-[#1F130E]/40 to-transparent z-10" />

                <div className="relative z-20 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C59B27]">
                    {cat.itemCount} Handcrafted Styles
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#FAF7F2] group-hover:text-[#C59B27] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#E2D7C7]/80 line-clamp-2">{cat.description}</p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#C59B27] group-hover:translate-x-1 transition-transform">
                    <span>Explore Collection</span> <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#E2D7C7]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B87546] font-bold">
              Customer Favorites
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1F130E]">
              Best Selling Footwear
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-[#4A2E1D] hover:text-[#B87546]"
          >
            View All Best Sellers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="bg-[#FAF7F2] border-y border-[#E2D7C7] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="p-6 bg-white border border-[#E2D7C7] space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#B87546]" />
              <h4 className="text-sm font-serif font-bold text-[#1F130E]">Authentic Craftsmanship</h4>
              <p className="text-xs text-[#4A2E1D]/70">Made in Namak Mandi, Peshawar by experienced cobblers.</p>
            </div>
            <div className="p-6 bg-white border border-[#E2D7C7] space-y-3">
              <Award className="w-8 h-8 text-[#B87546]" />
              <h4 className="text-sm font-serif font-bold text-[#1F130E]">Premium Leather</h4>
              <p className="text-xs text-[#4A2E1D]/70">Vegetable-tanned full-grain cowhide and calfskin.</p>
            </div>
            <div className="p-6 bg-white border border-[#E2D7C7] space-y-3">
              <Sparkles className="w-8 h-8 text-[#B87546]" />
              <h4 className="text-sm font-serif font-bold text-[#1F130E]">Handmade Quality</h4>
              <p className="text-xs text-[#4A2E1D]/70">14+ hours of hand cutting, awl stitching & polishing.</p>
            </div>
            <div className="p-6 bg-white border border-[#E2D7C7] space-y-3">
              <Truck className="w-8 h-8 text-[#B87546]" />
              <h4 className="text-sm font-serif font-bold text-[#1F130E]">Nationwide Delivery</h4>
              <p className="text-xs text-[#4A2E1D]/70">Fast Cash on Delivery across 200+ cities in Pakistan.</p>
            </div>
            <div className="p-6 bg-white border border-[#E2D7C7] space-y-3">
              <RotateCcw className="w-8 h-8 text-[#B87546]" />
              <h4 className="text-sm font-serif font-bold text-[#1F130E]">Easy Exchange</h4>
              <p className="text-xs text-[#4A2E1D]/70">14-day hassle-free size replacement support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS (REAL CUSTOMER REVIEWS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#B87546] font-bold">
            Verified Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1F130E]">
            What Our Patrons Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 bg-white border border-[#E2D7C7] space-y-4 relative shadow-xs"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1 text-[#C59B27]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[#4A2E1D]/50">{rev.date}</span>
              </div>
              <h3 className="text-base font-serif font-bold text-[#1F130E]">"{rev.title}"</h3>
              <p className="text-xs text-[#4A2E1D]/80 leading-relaxed font-sans italic">
                "{rev.comment}"
              </p>
              <div className="pt-4 border-t border-[#FAF7F2] flex items-center justify-between">
                <div>
                  <div className="text-xs font-serif font-bold text-[#1F130E]">{rev.author}</div>
                  <div className="text-[10px] text-[#4A2E1D]/60">{rev.location}</div>
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-green-700 bg-green-50 px-2.5 py-1 border border-green-200">
                    <CheckCircle2 className="w-3 h-3" /> Verified Patron
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL BRAND CTA */}
      <section className="bg-[#1F130E] text-[#FAF7F2] py-24 text-center border-t border-[#3A2315] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27]">
            Timeless Footwear Legacy
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#FAF7F2]">
            Step Into Peshawar.
          </h2>
          <p className="text-sm sm:text-base text-[#E2D7C7]/80 max-w-xl mx-auto font-sans font-light">
            Elevate your footwear wardrobe with handcrafted Peshawari Chappal built from genuine full-grain leather.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#C59B27] text-[#1F130E] font-serif font-bold text-xs uppercase tracking-[0.25em] hover:bg-white transition-colors shadow-2xl"
            >
              Shop Full Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
