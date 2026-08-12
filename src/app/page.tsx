'use client';

import React from 'react';
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
} from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { JsonLd } from '@/components/seo/JsonLd';

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isNew || p.isBestSeller);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Schema.org Structured Data */}
      <JsonLd type="Organization" data={{}} />
      <JsonLd type="WebSite" data={{}} />

      {/* Top Announcement Ribbon */}
      <div className="bg-[#1F130E] text-[#FAF7F2] py-2 px-4 text-center text-xs font-mono border-b border-[#3A2315] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
        <span>Get 10% OFF on Peshawar Heritage Selection • Code: <strong className="text-[#C59B27]">PESHAWAR10</strong></span>
        <Link href="/shop" className="underline hover:text-[#C59B27] ml-2 hidden sm:inline">
          Shop Now!
        </Link>
      </div>

      {/* Split Luxury Hero Section (Porto Store Aesthetic) */}
      <section className="relative bg-[#EAE3D2] border-b border-[#E2D7C7] py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#B87546] font-bold block">
                New Brown & Maroon Collection
              </span>

              <div className="space-y-1">
                <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#1F130E] tracking-tight leading-tight">
                  Peshawar Heritage <br />
                  <span className="text-[#B87546] italic font-serif">Summer Sale 30% OFF</span>
                </h1>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <span className="text-xs font-mono uppercase text-[#4A2E1D]">STARTING AT</span>
                <span className="text-3xl font-serif font-bold text-[#1F130E]">Rs. 9,999</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href="/shop"
                  className="px-10 py-4 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors border border-[#3A2315] shadow-2xl flex items-center justify-center gap-2"
                >
                  GET YOURS! <ArrowRight className="w-4 h-4 text-[#C59B27]" />
                </Link>
                <Link
                  href="/craft"
                  className="px-10 py-4 bg-white text-[#1F130E] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#FAF7F2] transition-colors border border-[#E2D7C7] flex items-center justify-center gap-2"
                >
                  Explore Craftsmanship
                </Link>
              </div>
            </div>

            {/* Right Hero Image Stage */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="relative w-full max-w-lg aspect-4/3 sm:aspect-square">
                <Image
                  src="/images/hero.png"
                  alt="Authentic Peshawari Chappal"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Trust Badges Bar (Porto Feature Strip) */}
      <section className="bg-white border-b border-[#E2D7C7] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-3 border-r sm:border-r-0 lg:border-r border-[#E2D7C7]">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E2D7C7] flex items-center justify-center text-[#B87546]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#1F130E] uppercase">FREE SHIPPING & RETURN</h4>
                <p className="text-[11px] text-[#4A2E1D]/70">Free delivery on orders over Rs. 5,000</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 border-r sm:border-r-0 lg:border-r border-[#E2D7C7]">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E2D7C7] flex items-center justify-center text-[#B87546]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#1F130E] uppercase">MONEY BACK GUARANTEE</h4>
                <p className="text-[11px] text-[#4A2E1D]/70">100% size swap & authenticity guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 border-r sm:border-r-0 lg:border-r border-[#E2D7C7]">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E2D7C7] flex items-center justify-center text-[#B87546]">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#1F130E] uppercase">ONLINE SUPPORT 24/7</h4>
                <p className="text-[11px] text-[#4A2E1D]/70">Peshawar atelier WhatsApp concierge</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E2D7C7] flex items-center justify-center text-[#B87546]">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#1F130E] uppercase">SECURE PAYMENT</h4>
                <p className="text-[11px] text-[#4A2E1D]/70">Cash on Delivery & Cards supported</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-[#C59B27]">
            <span className="w-12 h-px bg-[#E2D7C7]"></span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F130E] tracking-tight">
              Featured Products
            </h2>
            <span className="w-12 h-px bg-[#E2D7C7]"></span>
          </div>
          <p className="text-xs text-[#4A2E1D]/70 font-mono">
            Amazing handcrafted footwear added recently in our Namak Mandi catalog
          </p>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} showCountdown={idx === 2} />
          ))}
        </div>
      </section>

      {/* Summer Collection Banner Grid (Porto Style Banners) */}
      <section className="py-8 bg-white border-y border-[#E2D7C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Big Banner */}
            <div className="lg:col-span-6 relative bg-[#EAE3D2] border border-[#E2D7C7] min-h-[350px] p-8 flex flex-col justify-between overflow-hidden group">
              <div className="relative z-10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
                  Heritage Craft
                </span>
                <h3 className="text-3xl font-serif font-bold text-[#1F130E]">
                  Royal Peshawari <br />
                  <span className="italic font-serif font-normal">Chappal Collection</span>
                </h3>
              </div>
              <div className="relative z-10">
                <Link
                  href="/shop"
                  className="inline-block px-6 py-3 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider hover:bg-[#4A2E1D]"
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
              <div className="bg-[#1F130E] text-[#FAF7F2] p-8 flex flex-col justify-between min-h-[165px] border border-[#3A2315]">
                <div>
                  <span className="text-[10px] font-mono text-[#C59B27] uppercase tracking-widest">Master Cut</span>
                  <h4 className="text-xl font-serif font-bold text-[#FAF7F2] mt-1">For Him</h4>
                </div>
                <Link href="/shop" className="text-xs font-serif text-[#C59B27] hover:underline flex items-center gap-1">
                  Shop Gentlemen Collection <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-[#FAF7F2] border border-[#E2D7C7] p-6 flex flex-col justify-between min-h-[165px]">
                <div className="relative w-full h-24">
                  <Image src="/images/kaptaan.png" alt="Kaptaan Chappal" fill className="object-contain" />
                </div>
                <div className="text-center pt-2">
                  <h5 className="text-xs font-serif font-bold text-[#1F130E]">Kaptaan Double Sole</h5>
                  <span className="text-[10px] font-mono text-[#B87546]">From Rs. 12,999</span>
                </div>
              </div>

              <div className="bg-[#FAF7F2] border border-[#E2D7C7] p-6 flex flex-col justify-between min-h-[165px]">
                <div className="relative w-full h-24">
                  <Image src="/images/norozi.png" alt="Norozi Chappal" fill className="object-contain" />
                </div>
                <div className="text-center pt-2">
                  <h5 className="text-xs font-serif font-bold text-[#1F130E]">Norozi Heavy Buckle</h5>
                  <span className="text-[10px] font-mono text-[#B87546]">From Rs. 14,999</span>
                </div>
              </div>

              <div className="bg-[#4A2E1D] text-[#FAF7F2] p-8 flex flex-col justify-between min-h-[165px] border border-[#27170B]">
                <div>
                  <span className="text-[10px] font-mono text-[#C59B27] uppercase tracking-widest">Custom Orders</span>
                  <h4 className="text-xl font-serif font-bold text-[#FAF7F2] mt-1">Special Edition</h4>
                </div>
                <Link href="/contact" className="text-xs font-serif text-[#C59B27] hover:underline flex items-center gap-1">
                  Custom Size Request <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Seller Products Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-4 text-[#C59B27]">
            <span className="w-12 h-px bg-[#E2D7C7]"></span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F130E] tracking-tight">
              Best Seller Products
            </h2>
            <span className="w-12 h-px bg-[#E2D7C7]"></span>
          </div>
          <p className="text-xs text-[#4A2E1D]/70 font-mono">
            Only the best seller articles chosen by patrons across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand & Craftsmanship Seals Bar */}
      <section className="py-10 bg-white border-t border-[#E2D7C7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border border-[#E2D7C7] bg-[#FAF7F2] space-y-1">
              <Award className="w-6 h-6 text-[#C59B27] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#1F130E] uppercase">PESHAWAR GUILD</h5>
              <p className="text-[10px] text-[#4A2E1D]/60 font-mono">Authentic Namak Mandi Atelier</p>
            </div>
            <div className="p-4 border border-[#E2D7C7] bg-[#FAF7F2] space-y-1">
              <Award className="w-6 h-6 text-[#C59B27] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#1F130E] uppercase">FULL GRAIN LEATHER</h5>
              <p className="text-[10px] text-[#4A2E1D]/60 font-mono">100% Genuine Calfskin & Cowhide</p>
            </div>
            <div className="p-4 border border-[#E2D7C7] bg-[#FAF7F2] space-y-1">
              <Award className="w-6 h-6 text-[#C59B27] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#1F130E] uppercase">HAND STITCHED</h5>
              <p className="text-[10px] text-[#4A2E1D]/60 font-mono">14+ Hours Per Pair</p>
            </div>
            <div className="p-4 border border-[#E2D7C7] bg-[#FAF7F2] space-y-1">
              <Award className="w-6 h-6 text-[#C59B27] mx-auto" />
              <h5 className="text-xs font-serif font-bold text-[#1F130E] uppercase">ROYAL SEAL</h5>
              <p className="text-[10px] text-[#4A2E1D]/60 font-mono">Patron Quality Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Bar */}
      <section className="bg-[#1F130E] text-[#FAF7F2] py-12 border-t border-[#3A2315]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27]">
              Peshawar Concierge Newsletter
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Sign Up For Exclusive Heritage Offers
            </h3>
            <p className="text-xs text-[#E2D7C7]/70 font-sans">
              Receive early access to limited edition drops, bespoke sizing events, and private sale codes.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              className="flex-1 px-4 py-3 bg-[#120B07] border border-[#3A2315] text-xs font-serif text-[#FAF7F2] focus:outline-none focus:border-[#C59B27]"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#C59B27] text-[#1F130E] text-xs font-serif font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
