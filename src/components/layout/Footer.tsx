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
    <footer className="bg-[#0F172A] text-white border-t border-slate-800 pt-16 pb-8">
      {/* Brand Value Guarantees Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-5 bg-slate-900/80 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-[#C5A059] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-white">100% Genuine Leather</h4>
              <p className="text-xs text-slate-400 mt-0.5">Handpicked full-grain cowhide & imported calfskin</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-slate-900/80 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-[#C5A059] flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-white">Nationwide COD Express</h4>
              <p className="text-xs text-slate-400 mt-0.5">Free shipping across Pakistan on orders over Rs. 5,000</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 bg-slate-900/80 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-[#C5A059] flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-white">Hassle-Free Exchange</h4>
              <p className="text-xs text-slate-400 mt-0.5">14 days size replacement & home collection support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
        {/* Brand Story Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-bold tracking-[0.18em] text-white uppercase">
              Tatheer Chappalz
            </span>
            <span className="text-[10px] font-mono text-[#C5A059] tracking-widest uppercase font-semibold">
              Authentic Peshawari Footwear Atelier
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans">
            Handcrafting heirloom-quality Peshawari Chappals in Namak Mandi, Peshawar. Rooted in century-old cobbling traditions, perfected for the modern gentleman.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] mt-0.5 flex-shrink-0" />
              <span>Namak Mandi Bazaar, Opposite Jahangirpura, Peshawar, KP, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
              <span>+92 300 9876543 / +92 91 5271890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
              <span>concierge@tatheerchappalz.com</span>
            </div>
          </div>
        </div>

        {/* Collections Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold border-b border-slate-800 pb-2">
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {MOCK_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link href={`/category/${cat.slug}`} className="hover:text-white transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop" className="hover:text-white transition-colors font-bold text-white">
                View All Footwear →
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold border-b border-slate-800 pb-2">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/size-guide" className="hover:text-white transition-colors">
                Size & Fit Guide
              </Link>
            </li>
            <li>
              <Link href="/craft" className="hover:text-white transition-colors">
                The Art of Peshawari Craft
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white transition-colors">
                Shipping & Express COD
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="/account/orders" className="hover:text-white transition-colors">
                Track Shipment
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Concierge
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#C5A059] font-bold border-b border-slate-800 pb-2">
            Peshawar Gazette
          </h4>
          <p className="text-xs text-slate-400">
            Subscribe for private preview access to limited-edition drops and artisan stories.
          </p>
          {subscribed ? (
            <div className="p-3 bg-slate-900 text-[#C5A059] text-xs font-medium border border-[#C5A059] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
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
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#C5A059] text-[#0F172A] text-xs font-serif font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
          <div className="pt-2 text-[11px] text-slate-500">
            Accepting COD nationwide across 200+ cities in Pakistan.
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          © 2026 Tatheer Chappalz. All Rights Reserved. Crafted with pride in Peshawar, Pakistan.
        </div>
        <div className="flex items-center space-x-6 text-[11px]">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms & Conditions
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            Peshawar Flagship
          </Link>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#C5A059] bg-slate-900 px-3 py-1 border border-slate-800">
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
