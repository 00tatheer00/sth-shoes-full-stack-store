'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, User, MapPin, Heart, LogOut } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const AccountSidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, logoutUser } = useStore();

  const menu = [
    { name: 'Dashboard', href: '/account', icon: LayoutDashboard },
    { name: 'Order History & Tracking', href: '/account/orders', icon: Package },
    { name: 'Profile Details', href: '/account/profile', icon: User },
    { name: 'Saved Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Wishlist Items', href: '/wishlist', icon: Heart },
  ];

  return (
    <aside className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 font-sans">
      {/* Customer Avatar & Welcome header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-bold text-base flex items-center justify-center shadow-xs">
          {currentUser?.user_metadata?.full_name ? currentUser.user_metadata.full_name.substring(0, 2).toUpperCase() : 'SK'}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">{currentUser?.user_metadata?.full_name || 'Shahzaib Khan'}</h3>
          <p className="text-xs text-slate-500 font-mono">{currentUser?.email || 'shahzaib@example.com'}</p>
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
              className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => logoutUser()}
          className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
