'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { MOCK_CATEGORIES } from '@/data/mockData';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsHover, setCollectionsHover] = useState(false);

  const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'Collections', href: '/shop', hasDropdown: true },
    { name: 'Our Story', href: '/about' },
    { name: 'Our Craft', href: '/craft' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E2D7C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1F130E] hover:text-[#B87546] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#1F130E] hover:text-[#B87546] transition-colors ml-1"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo Header */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link href="/" className="inline-block group">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-[0.18em] text-[#1F130E] group-hover:text-[#B87546] transition-colors uppercase">
                  Tatheer Chappalz
                </span>
                <span className="text-[9px] font-mono tracking-[0.35em] text-[#B87546] uppercase flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 inline" /> Peshawar • Handcrafted Heritage
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setCollectionsHover(true)}
                    onMouseLeave={() => setCollectionsHover(false)}
                  >
                    <Link
                      href={link.href}
                      className={`text-xs uppercase tracking-widest font-semibold py-6 inline-flex items-center gap-1 transition-colors ${
                        isActive ? 'text-[#B87546]' : 'text-[#1F130E] hover:text-[#B87546]'
                      }`}
                    >
                      {link.name} <ChevronDown className="w-3.5 h-3.5" />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {collectionsHover && (
                      <div className="absolute top-full left-0 w-80 bg-[#1F130E] text-[#FAF7F2] border border-[#3A2315] shadow-2xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                        <div className="text-[10px] font-mono text-[#C59B27] uppercase tracking-widest px-3 py-1 border-b border-[#3A2315] flex items-center justify-between">
                          <span>Handmade Collections</span>
                          <Sparkles className="w-3 h-3 text-[#C59B27]" />
                        </div>
                        {MOCK_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="block px-3 py-2 text-xs font-serif hover:bg-[#3A2315] hover:text-[#C59B27] transition-colors"
                          >
                            <div className="font-semibold">{cat.name}</div>
                            <div className="text-[10px] text-[#E2D7C7]/60 font-sans line-clamp-1">
                              {cat.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-semibold py-6 transition-colors relative ${
                    isActive ? 'text-[#B87546]' : 'text-[#1F130E] hover:text-[#B87546]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-4 left-0 right-0 h-0.5 bg-[#B87546]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Utilities */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs font-medium text-[#1F130E] hover:text-[#B87546] transition-colors p-2"
              aria-label="Search site"
            >
              <Search className="w-4 h-4" />
              <span className="uppercase tracking-wider text-[11px]">Search</span>
            </button>

            {/* Account Icon Link */}
            <Link
              href="/account"
              className="p-2 text-[#1F130E] hover:text-[#B87546] transition-colors relative group"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 text-[#1F130E] hover:text-[#B87546] transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B87546] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 bg-[#1F130E] text-[#FAF7F2] hover:bg-[#4A2E1D] transition-colors flex items-center gap-2 border border-[#3A2315]"
              aria-label="Open cart drawer"
            >
              <ShoppingBag className="w-4 h-4 text-[#C59B27]" />
              <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">
                Cart
              </span>
              <span className="w-5 h-5 rounded-full bg-[#C59B27] text-[#1F130E] text-xs font-bold font-mono flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1F130E] text-[#FAF7F2] border-t border-[#3A2315] animate-in slide-in-from-top duration-300">
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#C59B27] uppercase tracking-widest">
                Main Navigation
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-serif py-2 border-b border-[#3A2315]/50 text-[#FAF7F2] hover:text-[#C59B27]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-mono text-[#C59B27] uppercase tracking-widest">
                Categories
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {MOCK_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 bg-[#3A2315]/40 text-xs font-medium text-[#E2D7C7] hover:text-[#C59B27]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#3A2315] flex justify-between items-center text-xs text-[#E2D7C7]/70">
              <Link href="/account" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
              <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>Help & FAQ</Link>
              <a href="https://wa.me/923009876543" target="_blank" className="text-[#C59B27]">WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
