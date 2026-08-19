'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle2, Truck, ArrowRight, ShieldCheck, Phone, Package } from 'lucide-react';
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
    <div className="bg-slate-50 min-h-screen py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-2xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-9 h-9 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Order Confirmed
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your order <strong className="font-mono text-slate-900">#{orderNumber}</strong> has been received and queued for dispatch.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-4 text-xs text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="font-bold text-slate-900 uppercase text-[11px]">Order Summary</span>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-mono text-[11px] font-bold">
                {order?.status || 'Processing'}
              </span>
            </div>

            <div className="space-y-2.5">
              {order && (
                <div className="flex justify-between items-center text-sm font-bold border-b border-slate-200 pb-2">
                  <span>Total Payable:</span>
                  <span className="font-mono text-slate-900 text-base">{formatPKR(order.total)}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-600">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Estimated Express Delivery: <strong>2–3 Business Days (TCS Express)</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Payment Method: <strong>{order?.paymentMethod || 'Cash on Delivery (COD)'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>WhatsApp Helpline: <strong>+92 300 9876543</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              href="/admin/orders"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Package className="w-4 h-4 text-blue-400" />
              <span>View in Admin Dashboard</span>
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Continue Shopping</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
