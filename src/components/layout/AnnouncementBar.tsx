'use client';

import React from 'react';
import { Phone, Truck, ShieldCheck, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#1F130E] text-[#FAF7F2] text-xs font-medium py-2 px-4 border-b border-[#3A2315] tracking-wider uppercase">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
        <div className="flex items-center gap-2 text-[#C59B27]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Authentic Handcrafted Peshawari Chappal • Direct from Peshawar</span>
        </div>
        <div className="flex items-center gap-6 text-[#E2D7C7]/80 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 hover:text-[#C59B27] transition-colors cursor-pointer">
            <Truck className="w-3.5 h-3.5 text-[#C59B27]" /> Free Express Shipping Over Rs. 5,000
          </span>
          <span className="hidden sm:flex items-center gap-1.5 hover:text-[#C59B27] transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" /> 100% Genuine Leather Guarantee
          </span>
          <a
            href="https://wa.me/923009876543"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#C59B27] hover:underline"
          >
            <Phone className="w-3.5 h-3.5" /> WhatsApp: +92 300 9876543
          </a>
        </div>
      </div>
    </div>
  );
};
