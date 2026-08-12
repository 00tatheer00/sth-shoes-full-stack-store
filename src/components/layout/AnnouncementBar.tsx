'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, CheckCircle2, PhoneCall, Zap } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { triggerGoldenCelebration } from '@/lib/confetti';

export const AnnouncementBar: React.FC = () => {
  const { showToast } = useStore();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    triggerGoldenCelebration();
    showToast(`🎉 Code "${code}" copied to clipboard! Saved 10% on your order.`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-r from-[#0B1120] via-[#0B63F6] to-[#0B1120] text-white py-2.5 px-4 border-b border-[#1E90FF]/40 text-xs font-mono relative z-40 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Helpline */}
        <div className="hidden lg:flex items-center gap-2 text-[#00E5FF] font-bold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Atelier Concierge: +92 300 9876543</span>
        </div>

        {/* Center Ticker */}
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-[#FFB800] animate-bounce" />
          <span className="font-bold tracking-wide">
            DODGER BLUE HERITAGE SALE • GET 10% OFF CODE:
          </span>
          <button
            onClick={() => handleCopyCode('PESHAWAR10')}
            className="px-3 py-1 bg-gradient-to-r from-[#FFB800] to-[#FFD700] text-[#0B1120] font-serif font-extrabold uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-1 cursor-pointer shadow-md rounded-none border border-white/60"
            title="Click to copy promo code"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-900" /> : <Copy className="w-3 h-3" />}
            <span>PESHAWAR10</span>
          </button>
        </div>

        {/* Right Badge */}
        <div className="hidden md:flex items-center gap-3">
          <span className="px-2.5 py-0.5 bg-[#FF3B30] text-white text-[10px] font-bold uppercase tracking-widest rounded-none shadow-md">
            Free Express COD
          </span>
          <span className="text-[#00E5FF] font-bold">PKR Rs.</span>
        </div>
      </div>
    </div>
  );
};
