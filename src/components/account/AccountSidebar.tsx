'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, User, MapPin, Heart, LogOut } from 'lucide-react';

export const AccountSidebar: React.FC = () => {
  const pathname = usePathname();

  const menu = [
    { name: 'Dashboard', href: '/account', icon: LayoutDashboard },
    { name: 'Order History & Tracking', href: '/account/orders', icon: Package },
    { name: 'Profile Details', href: '/account/profile', icon: User },
    { name: 'Saved Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Wishlist Items', href: '/wishlist', icon: Heart },
  ];

  return (
    <aside className="w-full bg-white border border-[#E2D7C7] p-6 shadow-xs space-y-6">
      {/* Customer Avatar & Welcome header */}
      <div className="flex items-center gap-3 border-b border-[#E2D7C7] pb-4">
        <div className="w-12 h-12 rounded-full bg-[#1F130E] text-[#C59B27] font-serif font-bold text-lg flex items-center justify-center border border-[#C59B27]">
          SK
        </div>
        <div>
          <h3 className="text-sm font-serif font-bold text-[#1F130E]">Shahzaib Khan</h3>
          <p className="text-[11px] text-[#4A2E1D]/70 font-mono">Islamabad, Pakistan</p>
        </div>
      </div>

      <nav className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs font-serif transition-colors ${
                isActive
                  ? 'bg-[#1F130E] text-[#C59B27] font-bold'
                  : 'text-[#1F130E] hover:bg-[#FAF7F2] hover:text-[#B87546]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#C59B27]' : 'text-[#4A2E1D]/60'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-[#E2D7C7]">
        <Link
          href="/auth/login"
          className="flex items-center gap-3 px-3 py-2 text-xs font-serif text-red-700 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Account</span>
        </Link>
      </div>
    </aside>
  );
};
