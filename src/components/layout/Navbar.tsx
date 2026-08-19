'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  User,
  Heart,
  ChevronDown,
  Menu,
  X,
  Package,
  LogOut,
  ShoppingBag,
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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-50 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-base shadow-xs">
              TC
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                TATHEER
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase -mt-0.5">
                CHAPPALZ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-slate-700">
            <Link
              href="/"
              className={`relative py-2 transition-colors hover:text-blue-600 ${
                pathname === '/' ? 'text-blue-600 font-bold' : 'text-slate-700'
              }`}
            >
              HOME
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </Link>

            <Link
              href="/shop"
              className={`relative py-2 transition-colors hover:text-blue-600 ${
                pathname === '/shop' ? 'text-blue-600 font-bold' : 'text-slate-700'
              }`}
            >
              SHOP
              {pathname === '/shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </Link>

            {/* Collections Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer uppercase font-semibold text-xs text-slate-700">
                <span>COLLECTIONS</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {collectionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white p-3 shadow-xl border border-slate-200 rounded-xl space-y-1 z-50">
                  {collections.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="block p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="text-xs font-bold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/craft"
              className={`relative py-2 transition-colors hover:text-blue-600 ${
                pathname === '/craft' ? 'text-blue-600 font-bold' : 'text-slate-700'
              }`}
            >
              OUR CRAFT
              {pathname === '/craft' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </Link>

            <Link
              href="/size-guide"
              className={`relative py-2 transition-colors hover:text-blue-600 ${
                pathname === '/size-guide' ? 'text-blue-600 font-bold' : 'text-slate-700'
              }`}
            >
              SIZE GUIDE
              {pathname === '/size-guide' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </Link>

            <Link
              href="/about"
              className={`relative py-2 transition-colors hover:text-blue-600 ${
                pathname === '/about' ? 'text-blue-600 font-bold' : 'text-slate-700'
              }`}
            >
              ABOUT US
              {pathname === '/about' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
              )}
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
              title="Search"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                title="Account"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white p-3 shadow-xl border border-slate-200 rounded-xl text-xs z-50">
                  {currentUser ? (
                    <div className="p-2 border-b border-slate-100">
                      <div className="font-bold text-slate-900">{currentUser.user_metadata?.full_name || 'Patron'}</div>
                      <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                    </div>
                  ) : (
                    <div className="p-2 border-b border-slate-100">
                      <Link
                        href="/auth/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-center py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg block font-semibold text-xs"
                      >
                        Sign In / Register
                      </Link>
                    </div>
                  )}

                  <div className="py-2 space-y-1">
                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                    >
                      <User className="w-4 h-4 text-slate-500" /> Account Dashboard
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                    >
                      <Package className="w-4 h-4 text-slate-500" /> Order History
                    </Link>
                  </div>

                  {currentUser && (
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logoutUser();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 text-left rounded-lg font-medium"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Heart Icon */}
            <Link
              href="/wishlist"
              className="p-2 text-slate-700 hover:text-rose-600 hover:bg-slate-50 rounded-lg transition-colors relative"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* CART Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3 sm:px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag ({totalCartItems})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 p-6 space-y-3 font-semibold text-sm text-slate-900">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">HOME</Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">SHOP</Link>
          <Link href="/craft" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">OUR CRAFT</Link>
          <Link href="/size-guide" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">SIZE GUIDE</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-100">ABOUT US</Link>
        </div>
      )}
    </header>
  );
};
