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
  ChevronDown,
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
    <header className="sticky top-0 z-40 minimal-header transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0F172A] hover:text-[#C5A059] lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Sleek Minimal Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif font-extrabold tracking-[0.18em] text-[#0F172A] uppercase group-hover:text-[#C5A059] transition-colors">
                  TATHEER
                </span>
                <span className="px-2 py-0.5 bg-[#0F172A] text-white text-[9px] font-mono font-bold uppercase tracking-widest">
                  PESHAWAR
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#C5A059] uppercase font-medium">
                <span>HANDMADE FOOTWEAR</span>
                <span>•</span>
                <span className="font-serif text-[#0F172A]">تطہیر چپل</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-serif font-bold uppercase tracking-[0.15em] text-[#0F172A]">
            <Link
              href="/"
              className={`hover:text-[#C5A059] transition-colors py-2 ${
                pathname === '/' ? 'text-[#0F172A] border-b-2 border-[#0F172A]' : ''
              }`}
            >
              Home
            </Link>

            <Link
              href="/shop"
              className={`hover:text-[#C5A059] transition-colors py-2 ${
                pathname === '/shop' ? 'text-[#0F172A] border-b-2 border-[#0F172A]' : ''
              }`}
            >
              Shop Catalog
            </Link>

            {/* Collections Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C5A059] transition-colors cursor-pointer uppercase">
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>

              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[650px] bg-white p-6 shadow-xl border border-slate-200 grid grid-cols-2 gap-4 animate-in fade-in">
                  {collections.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="p-3 bg-[#F8FAFC] border border-slate-200 hover:border-[#0F172A] flex gap-3.5 items-center group/item transition-all"
                    >
                      <div className="relative w-14 h-14 bg-white border border-slate-200 flex-shrink-0">
                        <Image src={c.image} alt={c.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-bold text-[#0F172A] group-hover/item:text-[#C5A059] transition-colors">
                          {c.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-sans line-clamp-1">{c.desc}</p>
                        <span className="text-[9px] font-mono text-[#C5A059] font-semibold uppercase">Explore Category →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/craft"
              className={`hover:text-[#C5A059] transition-colors py-2 ${
                pathname === '/craft' ? 'text-[#0F172A] border-b-2 border-[#0F172A]' : ''
              }`}
            >
              Our Craftsmanship
            </Link>

            <Link
              href="/size-guide"
              className={`hover:text-[#C5A059] transition-colors py-2 ${
                pathname === '/size-guide' ? 'text-[#0F172A] border-b-2 border-[#0F172A]' : ''
              }`}
            >
              Size Guide
            </Link>
          </nav>

          {/* Action Bar */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-[#0F172A] hover:text-[#C5A059] hover:bg-slate-100 transition-all rounded-full"
              title="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/wishlist"
              className="p-2.5 text-[#0F172A] hover:text-[#E11D48] hover:bg-slate-100 transition-all rounded-full relative"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E11D48] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2.5 text-[#0F172A] hover:text-[#C5A059] hover:bg-slate-100 transition-all rounded-full flex items-center gap-1"
                title="Account Menu"
              >
                <User className="w-4 h-4" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white p-3 shadow-xl border border-slate-200 text-xs font-serif z-50">
                  {currentUser ? (
                    <div className="p-2.5 border-b border-slate-100 space-y-1">
                      <div className="font-bold text-[#0F172A]">{currentUser.user_metadata?.full_name || 'Patron'}</div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">{currentUser.email}</div>
                    </div>
                  ) : (
                    <div className="p-2 border-b border-slate-100">
                      <Link
                        href="/auth/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block w-full py-2 bg-[#0F172A] text-white text-center font-bold uppercase tracking-wider hover:bg-[#C5A059] transition-colors"
                      >
                        Sign In / Register
                      </Link>
                    </div>
                  )}

                  <div className="py-2 space-y-1">
                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#0F172A] hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-[#C5A059]" /> Account Dashboard
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#0F172A] hover:bg-slate-50"
                    >
                      <Package className="w-4 h-4 text-[#C5A059]" /> Order History
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#0F172A] font-bold hover:bg-slate-50"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#0F172A]" /> SaaS Admin Portal
                    </Link>
                  </div>

                  {currentUser && (
                    <div className="pt-2 border-t border-slate-100">
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
              className="px-4 py-2.5 bg-[#0F172A] text-white hover:bg-[#C5A059] transition-colors font-serif font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A059] group-hover:text-white" />
              <span className="hidden sm:inline">Bag</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white text-[#0F172A] text-[10px] font-mono font-bold">
                {totalCartItems}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-6 space-y-4 font-serif text-sm text-[#0F172A]">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold border-b border-slate-100">Home</Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold border-b border-slate-100">Shop Catalog</Link>
          <Link href="/craft" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold border-b border-slate-100">Our Craftsmanship</Link>
          <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-[#C5A059]">SaaS Admin Portal</Link>
        </div>
      )}
    </header>
  );
};
