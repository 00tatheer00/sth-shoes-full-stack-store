'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-[#E2D7C7] p-8 md:p-12 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center mx-auto border border-green-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] font-bold">
              Peshawar Atelier Confirmed
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#1F130E]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[#4A2E1D]/80 max-w-md mx-auto">
              Your order <strong className="font-mono text-[#1F130E]">#{orderNumber}</strong> has been logged in our Peshawar master cobbler workshop.
            </p>
          </div>

          <div className="p-6 bg-[#FAF7F2] border border-[#E2D7C7] text-left space-y-4 text-xs text-[#4A2E1D]">
            <div className="flex justify-between items-center border-b border-[#E2D7C7] pb-3">
              <span className="font-mono uppercase font-bold text-[#1F130E]">Order Details</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">
                Processing
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B87546]" />
                <span>Estimated Express Delivery: <strong>2–3 Business Days</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B87546]" />
                <span>Payment Method: <strong>Cash on Delivery (COD)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B87546]" />
                <span>WhatsApp Concierge: <strong>+92 300 9876543</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/account/orders"
              className="px-8 py-3.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors"
            >
              Track Order Status
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-white text-[#1F130E] border border-[#E2D7C7] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#FAF7F2] transition-colors"
            >
              Continue Shopping <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
