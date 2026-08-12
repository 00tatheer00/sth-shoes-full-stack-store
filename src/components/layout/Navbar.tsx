'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Crown,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
  Package,
  LogOut,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen, setIsSearchOpen, currentUser, logoutUser } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const collections = [
    { name: 'Kaptan Double Sole', slug: 'kaptan-collection', desc: 'Handcrafted tire sole with royal buckle', image: '/images/kaptaan.png' },
    { name: 'Zalmi Velvet Suede', slug: 'zalmi-collection', desc: 'Lightweight suede comfort edition', image: '/images/zalmi.png' },
    { name: 'Norozi Heavy Buckle', slug: 'norozi-heritage', desc: 'Heavy brass buckle & double leather', image: '/images/norozi.png' },
    { name: 'Royal Calfskin', slug: 'premium-calfskin', desc: 'Full-grain cowhide luxury finish', image: '/images/hero.png' },
  ];

  return (
    <header className="sticky top-0 z-40 glass-dodger-header transition-all duration-300 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22">
          {/* 1. Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#00E5FF] lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* 2. Stunning Dodger Blue Crown Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E90FF] via-[#0B63F6] to-[#0B1120] border-2 border-[#00E5FF] shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-[#00E5FF]">
              <Crown className="w-6 h-6 text-[#FFB800] animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-serif font-extrabold tracking-[0.15em] text-white uppercase group-hover:text-[#00E5FF] transition-colors">
                  TATHEER
                </span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-[#1E90FF] to-[#0B63F6] text-white text-[9px] font-mono font-bold uppercase rounded-none shadow-md">
                  PESHAWAR
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#FFB800] uppercase font-bold">
                <span>CHAPPALZ</span>
                <span>•</span>
                <span className="font-serif text-[#00E5FF]">تطہیر چپل</span>
              </div>
            </div>
          </Link>

          {/* 3. Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-serif font-bold uppercase tracking-widest text-white">
            <Link
              href="/"
              className={`hover:text-[#00E5FF] transition-colors py-2 ${
                pathname === '/' ? 'text-[#00E5FF] border-b-2 border-[#00E5FF]' : ''
              }`}
            >
              Home
            </Link>

            <Link
              href="/shop"
              className={`hover:text-[#00E5FF] transition-colors py-2 ${
                pathname === '/shop' ? 'text-[#00E5FF] border-b-2 border-[#00E5FF]' : ''
              }`}
            >
              Shop Catalog
            </Link>

            {/* Mega Menu Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors cursor-pointer uppercase">
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#FFB800]" />
              </button>

              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] glass-dodger-dark p-6 shadow-2xl rounded-none grid grid-cols-2 gap-4 border-2 border-[#1E90FF] animate-in fade-in slide-in-from-top-2">
                  {collections.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="p-3 bg-[#0B1120] border border-[#1E90FF]/40 hover:border-[#00E5FF] flex gap-3.5 items-center group/item transition-all hover:shadow-lg"
                    >
                      <div className="relative w-16 h-16 bg-white border border-[#1E90FF] flex-shrink-0">
                        <Image src={c.image} alt={c.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-bold text-white group-hover/item:text-[#00E5FF] transition-colors">
                          {c.name}
                        </h4>
                        <p className="text-[10px] text-gray-300 font-sans line-clamp-1">{c.desc}</p>
                        <span className="text-[9px] font-mono text-[#FFB800] font-bold uppercase">Explore Category →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/craft"
              className={`hover:text-[#00E5FF] transition-colors py-2 ${
                pathname === '/craft' ? 'text-[#00E5FF] border-b-2 border-[#00E5FF]' : ''
              }`}
            >
              Our Craft
            </Link>

            <Link
              href="/size-guide"
              className={`hover:text-[#00E5FF] transition-colors py-2 ${
                pathname === '/size-guide' ? 'text-[#00E5FF] border-b-2 border-[#00E5FF]' : ''
              }`}
            >
              Size Guide
            </Link>
          </nav>

          {/* 4. Action Buttons (Search, Wishlist, User Menu, Cart Drawer) */}
          <div className="flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-white hover:text-[#00E5FF] hover:bg-[#1E90FF]/30 transition-all rounded-full border border-transparent hover:border-[#1E90FF]"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="p-2.5 text-white hover:text-[#FF3B30] hover:bg-[#1E90FF]/30 transition-all rounded-full relative border border-transparent hover:border-[#FF3B30]"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#FF3B30] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-md animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2.5 text-white hover:text-[#00E5FF] hover:bg-[#1E90FF]/30 transition-all rounded-full flex items-center gap-1 border border-transparent hover:border-[#1E90FF]"
                title="Account Menu"
              >
                <User className="w-5 h-5" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 glass-dodger-dark p-3 shadow-2xl border-2 border-[#1E90FF] text-xs font-serif z-50 text-white">
                  {currentUser ? (
                    <div className="p-3 border-b border-[#1E90FF]/40 space-y-1">
                      <div className="font-bold text-white">{currentUser.user_metadata?.full_name || 'Patron'}</div>
                      <div className="text-[10px] text-gray-300 font-mono truncate">{currentUser.email}</div>
                    </div>
                  ) : (
                    <div className="p-2 border-b border-[#1E90FF]/40">
                      <Link
                        href="/auth/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block w-full py-2.5 bg-gradient-to-r from-[#1E90FF] to-[#0B63F6] text-white text-center font-bold uppercase tracking-wider hover:from-[#0B63F6] hover:to-[#0B1120] shadow-md"
                      >
                        Sign In / Register
                      </Link>
                    </div>
                  )}

                  <div className="py-2 space-y-1">
                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:bg-[#1E90FF]/30"
                    >
                      <User className="w-4 h-4 text-[#FFB800]" /> Account Dashboard
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-white hover:bg-[#1E90FF]/30"
                    >
                      <Package className="w-4 h-4 text-[#FFB800]" /> Order History
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#00E5FF] font-bold hover:bg-[#1E90FF]/30"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#00E5FF]" /> SaaS Admin Portal
                    </Link>
                  </div>

                  {currentUser && (
                    <div className="pt-2 border-t border-[#1E90FF]/40">
                      <button
                        onClick={() => {
                          logoutUser();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-950/40 text-left font-sans"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Drawer Launcher */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-3 bg-gradient-to-r from-[#1E90FF] via-[#0B63F6] to-[#0B1120] text-white hover:from-[#00E5FF] hover:to-[#1E90FF] hover:text-[#0B1120] transition-all font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl border border-[#00E5FF]/60 rounded-none relative group glow-dodger"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFB800] group-hover:text-[#0B1120]" />
              <span className="hidden sm:inline">Cart</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FF3B30] text-white text-[10px] font-mono font-bold shadow-md animate-bounce">
                {totalCartItems}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1120] border-b border-[#1E90FF] p-6 space-y-4 font-serif text-sm text-white">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold border-b border-[#1E90FF]/30">Home</Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold border-b border-[#1E90FF]/30">Shop Catalog</Link>
          <Link href="/craft" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold border-b border-[#1E90FF]/30">Our Craftsmanship</Link>
          <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-[#00E5FF]">SaaS Admin Portal</Link>
        </div>
      )}
    </header>
  );
};
