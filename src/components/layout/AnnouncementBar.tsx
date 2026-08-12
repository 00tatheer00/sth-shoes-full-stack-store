'use client';

import React, { useState } from 'react';
import { Copy, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { triggerGoldenCelebration } from '@/lib/confetti';

export const AnnouncementBar: React.FC = () => {
  const { showToast } = useStore();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    triggerGoldenCelebration();
    showToast(`🎉 Code "${code}" copied! Saved 10% on your order.`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#0F172A] text-slate-200 py-2 px-4 border-b border-slate-800 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden lg:flex items-center gap-2 text-[#C5A059] font-medium">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Atelier Concierge: +92 300 9876543</span>
        </div>

        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="tracking-wide">
            COMPLIMENTARY EXPRESS COD • USE CODE:
          </span>
          <button
            onClick={() => handleCopyCode('PESHAWAR10')}
            className="px-2.5 py-0.5 bg-[#C5A059] text-[#0F172A] font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-1 cursor-pointer"
            title="Click to copy promo code"
          >
            {copied ? <CheckCircle2 className="w-3 h-3 text-green-950" /> : <Copy className="w-3 h-3" />}
            <span>PESHAWAR10</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-[#C5A059] font-semibold">PKR Rs.</span>
        </div>
      </div>
    </div>
  );
};
