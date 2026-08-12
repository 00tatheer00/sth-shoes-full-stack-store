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
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders & Fulfillment', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Inventory & Audits', href: '/admin/inventory', icon: Boxes },
    { name: 'Patron CRM', href: '/admin/customers', icon: Users },
    { name: 'Coupons Engine', href: '/admin/coupons', icon: Tag },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Storefront Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#120B07] text-[#FAF7F2] border-r border-[#27170B] min-h-screen flex flex-col justify-between flex-shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#27170B]">
          <Link href="/admin" className="block">
            <span className="text-lg font-serif font-bold tracking-[0.15em] text-[#FAF7F2] uppercase block">
              TATHEER ADMIN
            </span>
            <span className="text-[9px] font-mono text-[#C59B27] tracking-widest uppercase flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-[#C59B27]" /> Atelier SaaS Control
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-[#C59B27] tracking-widest px-3 py-1 mb-1">
            Management Portal
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-none text-xs font-serif transition-colors ${
                  isActive
                    ? 'bg-[#4A2E1D] text-[#FAF7F2] font-bold border-l-4 border-[#C59B27]'
                    : 'text-[#E2D7C7]/80 hover:bg-[#27170B] hover:text-[#C59B27]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C59B27]' : 'text-[#E2D7C7]/60'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Role Badge & Store link */}
      <div className="p-4 border-t border-[#27170B] space-y-3">
        <div className="p-3 bg-[#1F130E] border border-[#3A2315] text-xs space-y-1">
          <div className="text-[10px] font-mono text-[#C59B27] uppercase">Logged Admin</div>
          <div className="font-serif font-bold text-[#FAF7F2]">Ustad Master Cobbler</div>
          <div className="text-[10px] font-mono text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>SUPER_ADMIN Active</span>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="w-full py-2 bg-[#27170B] text-[#C59B27] hover:bg-[#4A2E1D] text-xs font-serif font-medium uppercase tracking-wider flex items-center justify-center gap-2 border border-[#3A2315] transition-colors"
        >
          View Storefront <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
};
