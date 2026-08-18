'use client';

import React from 'react';
import { MapPin, Truck, RotateCcw, Phone } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#0D3325] text-white/90 py-2 px-4 border-b border-[#082419] text-[11px] font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        {/* Item 1: Handcrafted */}
        <div className="flex items-center gap-1.5 text-white/95">
          <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Handcrafted in <strong className="text-white font-semibold">Peshawar, Pakistan</strong></span>
        </div>

        {/* Item 2: Free Delivery */}
        <div className="hidden sm:flex items-center gap-1.5 text-white/95">
          <Truck className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span><strong className="text-white font-semibold">Free Delivery</strong> on orders above Rs. 5,000</span>
        </div>

        {/* Item 3: Easy Exchange */}
        <div className="hidden md:flex items-center gap-1.5 text-white/95">
          <RotateCcw className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span><strong className="text-white font-semibold">7 Days</strong> Easy Exchange & Returns</span>
        </div>

        {/* Item 4: Phone Support */}
        <div className="flex items-center gap-1.5 text-white/95">
          <Phone className="w-3.5 h-3.5 text-[#E5A93C]" />
          <a href="tel:+923009876543" className="hover:text-[#E5A93C] transition-colors font-semibold">
            +92 300 9876543
          </a>
        </div>
      </div>
    </div>
  );
};
