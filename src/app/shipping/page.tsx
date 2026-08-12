'use client';

import React from 'react';
import { Truck, Clock, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      <div className="bg-[#1F130E] text-[#FAF7F2] py-16 md:py-20 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] flex items-center justify-center gap-1.5">
            <Truck className="w-4 h-4" /> Nationwide Logistics
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Shipping & Delivery Policy</h1>
          <p className="text-xs sm:text-sm text-[#E2D7C7]/80 max-w-xl mx-auto font-sans font-light">
            Fast, insured Cash on Delivery dispatches direct from our Peshawar atelier.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="bg-white border border-[#E2D7C7] p-8 space-y-6 shadow-xs">
          <h2 className="text-xl font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-3">
            Nationwide Shipping Rates & Timelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#4A2E1D]">
            <div className="p-4 bg-[#FAF7F2] border border-[#E2D7C7] space-y-2">
              <div className="font-bold text-sm text-[#1F130E] font-serif">Orders Above Rs. 5,000</div>
              <div className="text-green-700 font-mono font-bold">FREE Express Delivery</div>
              <p className="text-[#4A2E1D]/80">Delivered within 2–3 business days across 200+ cities in Pakistan.</p>
            </div>
            <div className="p-4 bg-[#FAF7F2] border border-[#E2D7C7] space-y-2">
              <div className="font-bold text-sm text-[#1F130E] font-serif">Orders Below Rs. 5,000</div>
              <div className="font-mono font-bold text-[#1F130E]">Flat Rs. 300 Courier Fee</div>
              <p className="text-[#4A2E1D]/80">Delivered within 3–4 business days via TCS or Leopards Express.</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#1F130E]/80 leading-relaxed font-sans pt-4 border-t border-[#E2D7C7]">
            <h3 className="text-base font-serif font-bold text-[#1F130E]">Order Processing & Courier Dispatch</h3>
            <p>
              All orders received before 2:00 PM PKT (Monday to Saturday) are dispatched from our Peshawar workshop on the same business day. You will receive an SMS and email notification with your tracking number once handed over to the courier partner.
            </p>

            <h3 className="text-base font-serif font-bold text-[#1F130E] pt-2">Accepted Payment Methods</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                <span>Cash on Delivery (COD) - Pay upon parcel inspection at your doorstep.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                <span>Direct Bank Transfer (Meezan Bank / HBL / Bank Alfalah).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
