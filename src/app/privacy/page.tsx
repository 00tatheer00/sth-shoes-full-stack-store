'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Legal & Security
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light">
            How Tatheer Chappalz protects and respects your personal customer data.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-2xs text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900">1. Customer Data Privacy Statement</h2>
          <p>
            Tatheer Chappalz ("we", "our", "us") values your privacy. We collect personal information solely for the purpose of fulfilling your footwear orders, shipping packages to your address, and providing personalized customer support via WhatsApp and phone.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details: Name, mobile number, WhatsApp handle, email address.</li>
            <li>Shipping address: Delivery address line, city, province, and postal code.</li>
            <li>Order history: Items purchased, selected sizes, color choices, and delivery status.</li>
          </ul>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">3. Data Security & Third-Party Protection</h2>
          <p>
            We do NOT sell, rent, or trade your personal information to third-party marketers. Your shipping information is shared strictly with authorized courier partners (TCS, Leopards Express) to execute delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
