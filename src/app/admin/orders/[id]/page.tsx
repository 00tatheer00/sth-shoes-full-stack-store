'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Printer, Truck, ShieldCheck, CheckCircle2, MapPin, User } from 'lucide-react';
import { MOCK_ORDERS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';
import { PrintableInvoiceModal } from '@/components/admin/PrintableInvoiceModal';

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const order = MOCK_ORDERS.find((o) => o.id === id) || MOCK_ORDERS[0];
  const [status, setStatus] = useState(order.status);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 bg-white border border-[#E2D7C7] hover:bg-[#FAF7F2] text-[#1F130E]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
              Fulfillment Operations
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1F130E]">
              Order #{order.orderNumber}
            </h1>
          </div>
        </div>
        <button
          onClick={() => setShowInvoiceModal(true)}
          className="px-4 py-2.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider flex items-center gap-2 hover:bg-[#4A2E1D]"
        >
          <Printer className="w-4 h-4 text-[#C59B27]" /> Print Packing Slip
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Order Items & Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Items */}
          <div className="bg-white border border-[#E2D7C7] p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-2">
              Purchased Footwear Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-[#FAF7F2] border border-[#E2D7C7]">
                  <div className="relative w-16 h-16 bg-white border border-[#E2D7C7]">
                    <Image src={item.image} alt={item.productName} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-serif font-bold text-[#1F130E]">{item.productName}</h4>
                    <div className="text-xs text-[#4A2E1D]/70 font-mono">
                      Shade: {item.color} • Size: EU {item.size} • Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-serif font-bold text-[#1F130E]">
                    {formatPKR(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E2D7C7] text-xs font-mono space-y-1.5 text-right">
              <div className="flex justify-between"><span>Subtotal:</span> <span>{formatPKR(order.subtotal)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-green-700"><span>Discount:</span> <span>-{formatPKR(order.discount)}</span></div>}
              <div className="flex justify-between"><span>Shipping:</span> <span>{formatPKR(order.shipping)}</span></div>
              <div className="flex justify-between text-sm font-serif font-bold text-[#1F130E] pt-2 border-t border-[#E2D7C7]">
                <span>Total Paid / Payable:</span>
                <span className="text-[#B87546] font-mono text-base">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Info & Status Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Control */}
          <div className="bg-white border border-[#E2D7C7] p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-2">
              Order Status & Logistics
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Fulfillment Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif font-bold"
              >
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">TCS Courier Tracking Code</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono"
              />
            </div>
          </div>

          {/* Customer Address Card */}
          <div className="bg-white border border-[#E2D7C7] p-6 space-y-3 shadow-xs text-xs text-[#4A2E1D]">
            <h3 className="text-base font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-2">
              Patron Destination
            </h3>
            <div className="font-bold text-[#1F130E]">{order.shippingAddress.fullName}</div>
            <div>{order.shippingAddress.addressLine}</div>
            <div>{order.shippingAddress.city}, {order.shippingAddress.province}</div>
            <div className="font-mono text-[#4A2E1D]/60 pt-1">Phone: {order.shippingAddress.phone}</div>
          </div>
        </div>
      </div>

      <PrintableInvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        order={order}
      />
    </div>
  );
}
