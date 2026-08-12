'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      <div className="bg-[#1F130E] text-[#FAF7F2] py-16 md:py-20 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Legal & Security
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-[#E2D7C7]/80 max-w-xl mx-auto font-sans font-light">
            How Tatheer Chappalz protects and respects your personal customer data.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="bg-white border border-[#E2D7C7] p-8 space-y-6 shadow-xs text-xs sm:text-sm text-[#1F130E]/80 leading-relaxed font-sans">
          <h2 className="text-xl font-serif font-bold text-[#1F130E]">1. Customer Data Privacy Statement</h2>
          <p>
            Tatheer Chappalz ("we", "our", "us") values your privacy. We collect personal information solely for the purpose of fulfilling your footwear orders, shipping packages to your address, and providing personalized customer support via WhatsApp and phone.
          </p>

          <h2 className="text-xl font-serif font-bold text-[#1F130E] pt-4 border-t border-[#E2D7C7]">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details: Name, mobile number, WhatsApp handle, email address.</li>
            <li>Shipping address: Delivery address line, city, province, and postal code.</li>
            <li>Order history: Items purchased, selected sizes, color choices, and delivery status.</li>
          </ul>

          <h2 className="text-xl font-serif font-bold text-[#1F130E] pt-4 border-t border-[#E2D7C7]">3. Data Security & Third-Party Protection</h2>
          <p>
            We do NOT sell, rent, or trade your personal information to third-party marketers. Your shipping information is shared strictly with authorized courier partners (TCS, Leopards Express) to execute delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
