'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/923009876543?text=Assalam%20o%20Alaikum!%20I%20am%20interested%20in%20Tatheer%20Chappalz."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 hover:bg-[#128C7E] transition-all duration-300 flex items-center gap-2 group border-2 border-white"
      aria-label="Chat on WhatsApp with Peshawar Concierge"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-xs font-semibold whitespace-nowrap pr-1 tracking-wide">
        Peshawar Concierge
      </span>
    </a>
  );
};
