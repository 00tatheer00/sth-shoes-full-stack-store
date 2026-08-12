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
  ExternalLink,
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
    <header className="sticky top-0 z-40 glass-header transition-all duration-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0F0C0B] hover:text-[#FFB800] lg:hidden"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* 2. Ultra-Beautiful 3D Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0F0C0B] via-[#3A2012] to-[#0F0C0B] border-2 border-[#FFB800] shadow-md flex items-center justify-center group-hover:scale-108 transition-transform duration-300 glow-gold">
              <Crown className="w-6 h-6 text-[#FFB800] animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-serif font-extrabold tracking-[0.15em] text-[#0F0C0B] uppercase group-hover:text-[#FFB800] transition-colors">
                  TATHEER
                </span>
                <span className="px-1.5 py-0.5 bg-[#FF3B30] text-white text-[9px] font-mono font-bold uppercase rounded-xs">
                  PESHAWAR
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#D49B00] uppercase font-bold">
                <span>CHAPPALZ</span>
                <span>•</span>
                <span className="font-serif text-[#C84B31]">تطہیر چپل</span>
              </div>
            </div>
          </Link>

          {/* 3. Desktop Navigation Menu with Mega Menu */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-serif font-bold uppercase tracking-widest text-[#0F0C0B]">
            <Link
              href="/"
              className={`hover:text-[#FFB800] transition-colors py-2 ${
                pathname === '/' ? 'text-[#FFB800] border-b-2 border-[#FFB800]' : ''
              }`}
            >
              Home
            </Link>

            <Link
              href="/shop"
              className={`hover:text-[#FFB800] transition-colors py-2 ${
                pathname === '/shop' ? 'text-[#FFB800] border-b-2 border-[#FFB800]' : ''
              }`}
            >
              Shop Catalog
            </Link>

            {/* Mega Menu Dropdown Trigger */}
            <div
              className="relative py-2"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#FFB800] transition-colors cursor-pointer uppercase">
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#FFB800]" />
              </button>

              {/* Mega Menu Overlay */}
              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] glass-card-3d p-6 shadow-2xl rounded-none grid grid-cols-2 gap-4 border-2 border-[#FFB800] animate-in fade-in slide-in-from-top-2">
                  {collections.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="p-3 bg-[#FAF3E6] border border-[#F0E2CD] hover:border-[#FFB800] flex gap-3 items-center group/item transition-all hover:shadow-md"
                    >
                      <div className="relative w-14 h-14 bg-white border border-[#F0E2CD] flex-shrink-0">
                        <Image src={c.image} alt={c.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-bold text-[#0F0C0B] group-hover/item:text-[#FF3B30] transition-colors">
                          {c.name}
                        </h4>
                        <p className="text-[10px] text-[#3A2012]/70 font-sans line-clamp-1">{c.desc}</p>
                        <span className="text-[9px] font-mono text-[#FFB800] font-bold uppercase">Explore Category →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/craft"
              className={`hover:text-[#FFB800] transition-colors py-2 ${
                pathname === '/craft' ? 'text-[#FFB800] border-b-2 border-[#FFB800]' : ''
              }`}
            >
              Our Craft
            </Link>

            <Link
              href="/size-guide"
              className={`hover:text-[#FFB800] transition-colors py-2 ${
                pathname === '/size-guide' ? 'text-[#FFB800] border-b-2 border-[#FFB800]' : ''
              }`}
            >
              Size Guide
            </Link>
          </nav>

          {/* 4. Action Bar (Search, Wishlist, User Menu, Cart Drawer) */}
          <div className="flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-[#0F0C0B] hover:text-[#FFB800] hover:bg-[#FAF3E6] transition-all rounded-full border border-transparent hover:border-[#FFB800]"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2.5 text-[#0F0C0B] hover:text-[#FF3B30] hover:bg-[#FAF3E6] transition-all rounded-full relative border border-transparent hover:border-[#FF3B30]"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#FF3B30] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-md animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2.5 text-[#0F0C0B] hover:text-[#FFB800] hover:bg-[#FAF3E6] transition-all rounded-full flex items-center gap-1 border border-transparent hover:border-[#FFB800]"
                title="Account Menu"
              >
                <User className="w-5 h-5" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 glass-card-3d p-2 shadow-2xl border-2 border-[#FFB800] text-xs font-serif z-50">
                  {currentUser ? (
                    <div className="p-3 border-b border-[#F0E2CD] space-y-1">
                      <div className="font-bold text-[#0F0C0B]">{currentUser.user_metadata?.full_name || 'Patron'}</div>
                      <div className="text-[10px] text-[#3A2012]/70 font-mono truncate">{currentUser.email}</div>
                    </div>
                  ) : (
                    <div className="p-2 border-b border-[#F0E2CD]">
                      <Link
                        href="/auth/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block w-full py-2 bg-[#0F0C0B] text-[#FFB800] text-center font-bold uppercase tracking-wider hover:bg-[#3A2012]"
                      >
                        Sign In / Register
                      </Link>
                    </div>
                  )}

                  <div className="py-1">
                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#0F0C0B] hover:bg-[#FAF3E6]"
                    >
                      <User className="w-4 h-4 text-[#FFB800]" /> Account Dashboard
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#0F0C0B] hover:bg-[#FAF3E6]"
                    >
                      <Package className="w-4 h-4 text-[#FFB800]" /> Order History
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#FF3B30] font-bold hover:bg-[#FAF3E6]"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#FF3B30]" /> SaaS Admin Portal
                    </Link>
                  </div>

                  {currentUser && (
                    <div className="pt-1 border-t border-[#F0E2CD]">
                      <button
                        onClick={() => {
                          logoutUser();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 text-left font-sans"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 bg-[#0F0C0B] text-[#FFFDF9] hover:bg-[#FF3B30] transition-all font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl border border-[#FFB800]/40 rounded-none relative group"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFB800] group-hover:text-white" />
              <span className="hidden sm:inline">Cart</span>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FF3B30] to-[#E63946] text-white text-[10px] font-mono font-bold shadow-md animate-bounce">
                {totalCartItems}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#FFB800] p-6 space-y-4 font-serif text-sm">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-[#0F0C0B] border-b border-[#F0E2CD]"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-[#0F0C0B] border-b border-[#F0E2CD]"
          >
            Shop Catalog
          </Link>
          <Link
            href="/craft"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-[#0F0C0B] border-b border-[#F0E2CD]"
          >
            Our Craftsmanship
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-[#FF3B30]"
          >
            SaaS Admin Control
          </Link>
        </div>
      )}
    </header>
  );
};
