'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle2, Truck, ArrowRight, ShieldCheck, Phone, MapPin, Package } from 'lucide-react';
import { dataEngine } from '@/lib/services/dataEngine';
import { formatPKR } from '@/lib/utils';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    const ord = dataEngine.getOrderById(orderNumber);
    if (ord) setOrder(ord);
  }, [orderNumber]);

  return (
    <div className="bg-[#FAF6EF] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-[#EAE3D5] rounded-xl p-8 md:p-12 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#EAF2ED] text-[#0D3325] flex items-center justify-center mx-auto border border-[#0D3325]/20">
            <CheckCircle2 className="w-10 h-10 text-[#0D3325]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E5A93C] font-bold">
              Peshawar Atelier Confirmed
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[#5A6578] max-w-md mx-auto">
              Your order <strong className="font-mono text-[#0D3325]">#{orderNumber}</strong> has been logged in our Peshawar workshop.
            </p>
          </div>

          <div className="p-6 bg-[#FAF6EF] border border-[#EAE3D5] rounded-lg text-left space-y-4 text-xs text-[#1C1917]">
            <div className="flex justify-between items-center border-b border-[#EAE3D5] pb-3">
              <span className="font-mono uppercase font-bold text-[#0D3325]">Order Summary</span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded font-mono text-[10px] font-bold">
                {order?.status || 'Processing'}
              </span>
            </div>

            <div className="space-y-2.5">
              {order && (
                <div className="flex justify-between items-center text-sm font-bold border-b border-[#EAE3D5] pb-2">
                  <span>Total Valuation:</span>
                  <span className="font-mono text-[#0D3325]">{formatPKR(order.total)}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0D3325]" />
                <span>Estimated Express Delivery: <strong>2–3 Business Days</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0D3325]" />
                <span>Payment Method: <strong>{order?.paymentMethod || 'Cash on Delivery (COD)'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0D3325]" />
                <span>WhatsApp Helpline: <strong>+92 300 9876543</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              href="/admin/orders"
              className="btn-forest px-7 py-3.5 text-xs shadow-md"
            >
              <Package className="w-4 h-4 mr-1 text-[#E5A93C]" />
              <span>View in Admin Dashboard</span>
            </Link>
            <Link
              href="/shop"
              className="btn-outline-dark px-7 py-3.5 text-xs shadow-2xs"
            >
              <span>Continue Shopping</span> <ArrowRight className="w-4 h-4 inline ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
