'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  User,
  Heart,
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
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const collections = [
    { name: 'Classic Collection', slug: 'traditional-leather', desc: 'Everyday traditional heritage craft' },
    { name: 'Premium Leather', slug: 'premium-calfskin', desc: 'Imported full-grain calfskin luxury' },
    { name: 'Traditional Collection', slug: 'traditional-leather', desc: 'Authentic 100-year Pashtun patterns' },
    { name: 'Kaptaan Collection', slug: 'kaptan-collection', desc: 'Double tire sole with royal buckle' },
    { name: 'Zalmi Velvet Suede', slug: 'zalmi-collection', desc: 'Contemporary lightweight suede' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAE3D5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1917] hover:text-[#0D3325] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo (Matching Reference: Mandala Icon + Tatheer Chappalz) */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Geometric Mandala / Brass Emblem Icon */}
            <div className="w-10 h-10 rounded-full bg-[#FAF6EF] border border-[#E5A93C] flex items-center justify-center p-1.5 shadow-xs">
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#B87A44]" fill="currentColor">
                <path d="M12 2L14.2 6.4L19 7.1L15.5 10.5L16.3 15.3L12 13L7.7 15.3L8.5 10.5L5 7.1L9.8 6.4L12 2Z" />
                <circle cx="12" cy="12" r="3" fill="#0D3325" />
              </svg>
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-[0.08em] text-[#1C1917]">
                TATHEER
              </span>
              <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#5A6578] uppercase -mt-0.5">
                CHAPPALZ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[12px] font-bold uppercase tracking-[0.08em] text-[#1C1917]">
            <Link
              href="/"
              className={`relative py-2 transition-colors hover:text-[#0D3325] ${
                pathname === '/' ? 'text-[#0D3325]' : 'text-[#1C1917]'
              }`}
            >
              HOME
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E5A93C] rounded-full" />
              )}
            </Link>

            <Link
              href="/shop"
              className={`relative py-2 transition-colors hover:text-[#0D3325] ${
                pathname === '/shop' ? 'text-[#0D3325]' : 'text-[#1C1917]'
              }`}
            >
              SHOP
              {pathname === '/shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E5A93C] rounded-full" />
              )}
            </Link>

            {/* Collections Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#0D3325] transition-colors cursor-pointer uppercase font-bold text-[12px]">
                <span>COLLECTIONS</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5A6578]" />
              </button>

              {collectionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white p-3 shadow-xl border border-[#EAE3D5] rounded-md space-y-1">
                  {collections.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="block p-2.5 rounded hover:bg-[#FAF6EF] transition-colors"
                    >
                      <div className="text-xs font-serif font-bold text-[#1C1917]">{c.name}</div>
                      <div className="text-[10px] text-[#5A6578]">{c.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/craft"
              className={`relative py-2 transition-colors hover:text-[#0D3325] ${
                pathname === '/craft' ? 'text-[#0D3325]' : 'text-[#1C1917]'
              }`}
            >
              OUR CRAFT
              {pathname === '/craft' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E5A93C] rounded-full" />
              )}
            </Link>

            <Link
              href="/size-guide"
              className={`relative py-2 transition-colors hover:text-[#0D3325] ${
                pathname === '/size-guide' ? 'text-[#0D3325]' : 'text-[#1C1917]'
              }`}
            >
              SIZE GUIDE
              {pathname === '/size-guide' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E5A93C] rounded-full" />
              )}
            </Link>

            <Link
              href="/about"
              className={`relative py-2 transition-colors hover:text-[#0D3325] ${
                pathname === '/about' ? 'text-[#0D3325]' : 'text-[#1C1917]'
              }`}
            >
              ABOUT US
              {pathname === '/about' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E5A93C] rounded-full" />
              )}
            </Link>
          </nav>

          {/* Right Action Icons (Matching Reference: Search, User, Wishlist, Amber Cart Button) */}
          <div className="flex items-center space-x-3">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#1C1917] hover:text-[#0D3325] transition-colors"
              title="Search"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2 text-[#1C1917] hover:text-[#0D3325] transition-colors"
                title="Account"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white p-3 shadow-xl border border-[#EAE3D5] rounded-md text-xs z-50">
                  {currentUser ? (
                    <div className="p-2 border-b border-[#FAF6EF]">
                      <div className="font-bold text-[#1C1917]">{currentUser.user_metadata?.full_name || 'Patron'}</div>
                      <div className="text-[10px] text-[#5A6578] truncate">{currentUser.email}</div>
                    </div>
                  ) : (
                    <div className="p-2 border-b border-[#FAF6EF]">
                      <Link
                        href="/auth/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="btn-forest w-full text-center py-2 text-[10px]"
                      >
                        Sign In / Register
                      </Link>
                    </div>
                  )}

                  <div className="py-2 space-y-1">
                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#1C1917] hover:bg-[#FAF6EF] rounded"
                    >
                      <User className="w-4 h-4 text-[#0D3325]" /> Account Dashboard
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#1C1917] hover:bg-[#FAF6EF] rounded"
                    >
                      <Package className="w-4 h-4 text-[#0D3325]" /> Order History
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[#1C1917] font-semibold hover:bg-[#FAF6EF] rounded"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#0D3325]" /> SaaS Admin Portal
                    </Link>
                  </div>

                  {currentUser && (
                    <div className="pt-2 border-t border-[#FAF6EF]">
                      <button
                        onClick={() => {
                          logoutUser();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 text-left rounded"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Heart Icon with Count Badge */}
            <Link
              href="/wishlist"
              className="p-2 text-[#1C1917] hover:text-red-600 transition-colors relative"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0D3325] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            </Link>

            {/* CART (0) Button in Warm Amber Gold */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 bg-[#E5A93C] hover:bg-[#D49A30] text-[#1C1917] font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>CART ({totalCartItems})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#EAE3D5] p-6 space-y-3 font-semibold text-sm text-[#1C1917]">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-[#FAF6EF]">HOME</Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-[#FAF6EF]">SHOP</Link>
          <Link href="/craft" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-[#FAF6EF]">OUR CRAFT</Link>
          <Link href="/size-guide" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-[#FAF6EF]">SIZE GUIDE</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-[#FAF6EF]">ABOUT US</Link>
          <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#0D3325] font-bold">SAAS ADMIN PORTAL</Link>
        </div>
      )}
    </header>
  );
};
