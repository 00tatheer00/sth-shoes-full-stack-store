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
  Sparkles,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products & Catalog', href: '/admin/products', icon: Package },
    { name: 'Orders & Fulfillment', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Inventory & Stock', href: '/admin/inventory', icon: Boxes },
    { name: 'Customers CRM', href: '/admin/customers', icon: Users },
    { name: 'Coupons & Promos', href: '/admin/coupons', icon: Tag },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-200 border-r border-slate-800 min-h-screen flex flex-col justify-between flex-shrink-0 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group" onClick={onClose}>
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm font-bold text-base">
                TC
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wide">
                  Tatheer Admin
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Operations Portal
                </span>
              </div>
            </Link>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Role Badge & Store link */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">System Status</span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live
              </span>
            </div>
            <div className="font-semibold text-white">Super Admin</div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <span>View Live Store</span> <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </aside>
    </>
  );
};
