'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  ChevronUp,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const Footer: React.FC = () => {
  const { storeSettings } = useStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t border-slate-900 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80 text-xs">
          {/* Column 1: Brand & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
                TC
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xl font-bold tracking-tight text-white">
                  TATHEER
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] text-slate-400 uppercase -mt-0.5">
                  CHAPPALZ
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Authentic Peshawari Chappal handcrafted with passion, tradition, and precision in Namak Mandi, Peshawar.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://wa.me/923009876543"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.185 1.564 5.939l-1.66 6.072 6.224-1.632c1.678.916 3.602 1.443 5.652 1.443 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: SHOP (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              SHOP
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Collections</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Exchange</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/account/orders" className="hover:text-white transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Column 4: ABOUT US (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              ABOUT US
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/craft" className="hover:text-white transition-colors">Our Craft</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Artisans</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/craft" className="hover:text-white transition-colors">Care Instructions</Link></li>
            </ul>
          </div>

          {/* Column 5: CONTACT US (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              CONTACT US
            </h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{storeSettings?.address || 'Namak Mandi, Peshawar, Khyber Pakhtunkhwa, Pakistan'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{storeSettings?.phone || '+92 300 9876543'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{storeSettings?.email || 'hello@tatheerchappalz.com'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-500">
          <div>
            © 2026 Tatheer Chappalz. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center space-x-3 sm:space-x-4 text-xs text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px] border border-slate-700">VISA</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px] border border-slate-700">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold text-[10px] border border-slate-700">easypaisa</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold text-[10px] border border-slate-700">JazzCash</span>
          </div>
        </div>
      </div>

      {/* Floating Scroll-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center shadow-lg transition-all"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};
