'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Copy, CheckCircle2, PhoneCall, Flame } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { triggerConfetti } from '@/lib/confetti';

export const AnnouncementBar: React.FC = () => {
  const { showToast } = useStore();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    triggerConfetti();
    showToast(`🎉 Promo code "${code}" copied to clipboard! Saved 10%`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-r from-[#0F0C0B] via-[#24150E] to-[#0F0C0B] text-[#FFFDF9] py-2.5 px-4 border-b border-[#FFB800]/40 text-xs font-mono relative z-40 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Helpline */}
        <div className="hidden lg:flex items-center gap-2 text-[#FFB800] font-bold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Atelier Concierge: +92 300 9876543</span>
        </div>

        {/* Center Animated Announcement Ticker */}
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Flame className="w-4 h-4 text-[#FF3B30] animate-bounce" />
          <span className="font-bold tracking-wide">
            ROYAL HERITAGE SALE • GET 10% OFF WITH CODE:
          </span>
          <button
            onClick={() => handleCopyCode('PESHAWAR10')}
            className="px-2.5 py-0.5 bg-gradient-to-r from-[#FFB800] to-[#FFC700] text-[#0F0C0B] font-bold uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-1 cursor-pointer shadow-md rounded-xs border border-white/50"
            title="Click to copy promo code"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-900" /> : <Copy className="w-3 h-3" />}
            <span>PESHAWAR10</span>
          </button>
        </div>

        {/* Right Currency & Fast COD Badge */}
        <div className="hidden md:flex items-center gap-3">
          <span className="px-2 py-0.5 bg-[#FF3B30] text-white text-[10px] font-bold uppercase tracking-widest rounded-xs shadow-xs">
            Free Express COD
          </span>
          <span className="text-[#FFB800] font-bold">PKR Rs.</span>
        </div>
      </div>
    </div>
  );
};
