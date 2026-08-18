'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Boxes,
  Users,
  Tag,
  FolderTree,
  Settings,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products & CRUD', href: '/admin/products', icon: Package },
    { name: 'Orders & Fulfillment', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Inventory Management', href: '/admin/inventory', icon: Boxes },
    { name: 'Patron Customers', href: '/admin/customers', icon: Users },
    { name: 'Coupons Engine', href: '/admin/coupons', icon: Tag },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Storefront Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-[#082419] text-white border-r border-[#0D3325] min-h-screen flex flex-col justify-between flex-shrink-0 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-[#0D3325] flex items-center justify-between">
            <Link href="/admin" className="block" onClick={onClose}>
              <span className="text-base font-serif font-bold tracking-[0.12em] text-white uppercase block">
                TATHEER ADMIN
              </span>
              <span className="text-[9px] font-mono text-[#E5A93C] tracking-widest uppercase flex items-center gap-1 mt-0.5 font-bold">
                <ShieldCheck className="w-3 h-3 text-[#E5A93C]" /> SaaS Operations
              </span>
            </Link>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 text-white/70 hover:text-white lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="p-3.5 space-y-1">
            <div className="text-[10px] font-mono uppercase text-[#E5A93C] tracking-widest px-3 py-1 mb-1 font-bold">
              Management Portal
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-serif transition-colors ${
                    isActive
                      ? 'bg-[#0D3325] text-white font-bold border-l-4 border-[#E5A93C]'
                      : 'text-white/75 hover:bg-[#0D3325]/50 hover:text-[#E5A93C]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E5A93C]' : 'text-white/60'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Role Badge & Store link */}
        <div className="p-4 border-t border-[#0D3325] space-y-3">
          <div className="p-3 bg-[#0D3325] rounded border border-[#0D3325]/60 text-xs space-y-1">
            <div className="text-[10px] font-mono text-[#E5A93C] uppercase font-bold">Active Role</div>
            <div className="font-serif font-bold text-white">Super Administrator</div>
            <div className="text-[10px] font-mono text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span>All Systems Operational</span>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full py-2 bg-[#0D3325] text-[#E5A93C] hover:bg-[#082419] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 rounded border border-[#E5A93C]/30 transition-colors"
          >
            Storefront <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>
    </>
  );
};
