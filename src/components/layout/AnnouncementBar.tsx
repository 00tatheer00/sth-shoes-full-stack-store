'use client';

import React from 'react';
import { MapPin, Truck, RotateCcw, Phone } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { storeSettings } = useStore();

  const phone = storeSettings?.phone || '+92 300 9876543';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const threshold = storeSettings?.freeThreshold || 5000;
  const customAnnouncement = storeSettings?.announcement;

  return (
    <div className="bg-slate-900 text-slate-300 py-2 px-3 sm:px-4 border-b border-slate-800 text-[11px] font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-y-1.5 gap-x-4">
        {/* Item 1: Handcrafted / Custom Announcement */}
        <div className="flex items-center gap-1.5 text-slate-200">
          <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          <span>{customAnnouncement || 'Handcrafted in Peshawar, Pakistan'}</span>
        </div>

        {/* Item 2: Free Delivery */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-200">
          <Truck className="w-3.5 h-3.5 text-emerald-400" />
          <span><strong className="text-white font-semibold">Free Delivery</strong> on orders above Rs. {threshold.toLocaleString()}</span>
        </div>

        {/* Item 3: Easy Exchange */}
        <div className="hidden md:flex items-center gap-1.5 text-slate-200">
          <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
          <span><strong className="text-white font-semibold">7 Days</strong> Easy Exchange & Returns</span>
        </div>

        {/* Item 4: Phone Support */}
        <div className="flex items-center gap-1.5 text-slate-200">
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors font-semibold">
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
};
