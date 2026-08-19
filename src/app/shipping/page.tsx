'use client';

import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5">
            <Truck className="w-4 h-4" /> Nationwide Logistics
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Shipping & Delivery Policy</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Fast, insured Cash on Delivery dispatches direct from our Peshawar atelier.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Nationwide Shipping Rates & Timelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-sm text-slate-900">Orders Above Rs. 5,000</div>
              <div className="text-emerald-600 font-mono font-bold">FREE Express Delivery</div>
              <p className="text-slate-500">Delivered within 2–3 business days across 200+ cities in Pakistan.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="font-bold text-sm text-slate-900">Orders Below Rs. 5,000</div>
              <div className="font-mono font-bold text-slate-900">Flat Rs. 300 Courier Fee</div>
              <p className="text-slate-500">Delivered within 3–4 business days via TCS or Leopards Express.</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Order Processing & Courier Dispatch</h3>
            <p>
              All orders received before 2:00 PM PKT (Monday to Saturday) are dispatched from our Peshawar workshop on the same business day. You will receive an SMS and email notification with your tracking number once handed over to the courier partner.
            </p>

            <h3 className="text-sm font-bold text-slate-900 pt-2">Accepted Payment Methods</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cash on Delivery (COD) - Pay upon parcel inspection at your doorstep.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct Mobile Wallets (Easypaisa / JazzCash).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
