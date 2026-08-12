'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Crown,
} from 'lucide-react';
import { MOCK_CATEGORIES } from '@/data/mockData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#0B1120] text-white border-t-2 border-[#1E90FF]/40 pt-16 pb-8 shadow-2xl">
      {/* Brand Value Guarantees Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-[#1E90FF]/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-5 bg-[#0F172A]/80 border border-[#1E90FF]/30 shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#1E90FF]/20 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-white">100% Genuine Leather</h4>
              <p className="text-xs text-slate-300 mt-0.5">Handpicked full-grain cowhide & imported calfskin</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-[#0F172A]/80 border border-[#1E90FF]/30 shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#1E90FF]/20 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-white">Nationwide COD Express</h4>
              <p className="text-xs text-slate-300 mt-0.5">Free shipping across Pakistan on orders over Rs. 5,000</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-[#0F172A]/80 border border-[#1E90FF]/30 shadow-md">
            <div className="w-12 h-12 rounded-full bg-[#1E90FF]/20 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF] flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-white">Hassle-Free Exchange</h4>
              <p className="text-xs text-slate-300 mt-0.5">14 days size replacement & home collection support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E90FF]/30">
        {/* Brand Story Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1E90FF] border border-[#00E5FF] flex items-center justify-center text-[#FFB800] shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-[0.18em] text-white uppercase">
                Tatheer Chappalz
              </span>
              <span className="text-[10px] font-mono text-[#00E5FF] tracking-widest uppercase font-bold">
                Authentic Peshawari Footwear Atelier
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-sans">
            Handcrafting heirloom-quality Peshawari Chappals in Namak Mandi, Peshawar. Rooted in century-old cobbling traditions, perfected for the modern gentleman who demands authority and timeless elegance.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FFB800] mt-0.5 flex-shrink-0" />
              <span>Namak Mandi Bazaar, Opposite Jahangirpura, Peshawar, KP, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FFB800] flex-shrink-0" />
              <span>+92 300 9876543 / +92 91 5271890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FFB800] flex-shrink-0" />
              <span>concierge@tatheerchappalz.com</span>
            </div>
          </div>
        </div>

        {/* Collections Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFB800] font-bold border-b border-[#1E90FF]/40 pb-2">
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {MOCK_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link href={`/category/${cat.slug}`} className="hover:text-[#00E5FF] transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop" className="hover:text-[#00E5FF] transition-colors font-bold text-white">
                View All Footwear →
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFB800] font-bold border-b border-[#1E90FF]/40 pb-2">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link href="/size-guide" className="hover:text-[#00E5FF] transition-colors">
                Size & Fit Guide
              </Link>
            </li>
            <li>
              <Link href="/craft" className="hover:text-[#00E5FF] transition-colors">
                The Art of Peshawari Craft
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-[#00E5FF] transition-colors">
                Shipping & Express COD
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-[#00E5FF] transition-colors">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#00E5FF] transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="/account/orders" className="hover:text-[#00E5FF] transition-colors">
                Track Shipment
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#00E5FF] transition-colors">
                Contact Concierge
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFB800] font-bold border-b border-[#1E90FF]/40 pb-2">
            Peshawar Gazette
          </h4>
          <p className="text-xs text-slate-300">
            Subscribe for private preview access to limited-edition calfskin drops and artisan stories.
          </p>
          {subscribed ? (
            <div className="p-3 bg-[#1E90FF]/20 text-[#00E5FF] text-xs font-bold border border-[#00E5FF] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFB800]" />
              <span>Thank you for joining the Tatheer Circle!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0F172A] border border-[#1E90FF] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00E5FF]"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#1E90FF] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#00E5FF] hover:text-[#0B1120] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
          <div className="pt-2 text-[11px] text-slate-400">
            Accepting COD nationwide across 200+ cities in Pakistan.
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          © 2026 Tatheer Chappalz. All Rights Reserved. Crafted with pride in Peshawar, Pakistan.
        </div>
        <div className="flex items-center space-x-6 text-[11px]">
          <Link href="/privacy" className="hover:text-[#00E5FF] transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-[#00E5FF] transition-colors">
            Terms & Conditions
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-[#00E5FF] transition-colors">
            Peshawar Flagship
          </Link>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#FFB800] bg-[#0F172A] px-3 py-1 border border-[#1E90FF]/40 shadow-xs">
          <span>Cash on Delivery</span>
          <span>|</span>
          <span>JazzCash</span>
          <span>|</span>
          <span>Easypaisa</span>
          <span>|</span>
          <span>Cards</span>
        </div>
      </div>
    </footer>
  );
};
