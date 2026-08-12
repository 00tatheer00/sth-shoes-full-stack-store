'use client';

import React from 'react';
import { X, Printer, ShieldCheck, MapPin } from 'lucide-react';
import { formatPKR } from '@/lib/utils';

interface PrintableInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export const PrintableInvoiceModal: React.FC<PrintableInvoiceModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full border border-[#E2D7C7] shadow-2xl p-8 space-y-6 relative text-[#1F130E] my-8">
        {/* Close & Print Buttons Header (Hidden when printing) */}
        <div className="flex justify-between items-center print:hidden border-b border-[#E2D7C7] pb-4">
          <span className="text-xs font-mono uppercase font-bold text-[#B87546]">
            Order #{order.orderNumber || order.order_number} Invoice
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#4A2E1D]"
            >
              <Printer className="w-4 h-4 text-[#C59B27]" /> Print Invoice / Slip
            </button>
            <button onClick={onClose} className="p-2 text-[#4A2E1D] hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE AREA */}
        <div className="space-y-6 font-serif">
          {/* Header Banner */}
          <div className="flex justify-between items-start border-b-2 border-[#1F130E] pb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-widest text-[#1F130E] uppercase">
                TATHEER CHAPPALZ
              </h1>
              <p className="text-[10px] font-mono text-[#B87546] uppercase tracking-wider">
                Authentic Peshawari Footwear Atelier
              </p>
              <p className="text-xs text-[#4A2E1D]/70 font-sans mt-1">
                Namak Mandi Bazaar, Opposite Jahangirpura, Peshawar, Pakistan
              </p>
            </div>
            <div className="text-right font-mono text-xs">
              <div className="font-bold text-sm text-[#1F130E]">INVOICE</div>
              <div className="text-[#B87546] font-bold">#{order.orderNumber || order.order_number}</div>
              <div className="text-[11px] text-[#4A2E1D]/70">{order.date || 'August 12, 2026'}</div>
            </div>
          </div>

          {/* Customer & Shipping info */}
          <div className="grid grid-cols-2 gap-6 text-xs border-b border-[#E2D7C7] pb-4 font-sans">
            <div>
              <div className="font-bold font-serif text-[#1F130E] uppercase text-[11px] mb-1">Billed & Shipped To:</div>
              <div className="font-bold">{order.shippingAddress?.fullName || 'Shahzaib Khan'}</div>
              <div>{order.shippingAddress?.addressLine || 'House 42, Street 8, Sector F-7/3'}</div>
              <div>{order.shippingAddress?.city || 'Islamabad'}, Pakistan</div>
              <div className="font-mono text-[#4A2E1D]/70">Phone: {order.shippingAddress?.phone || '+92 300 1234567'}</div>
            </div>
            <div className="text-right">
              <div className="font-bold font-serif text-[#1F130E] uppercase text-[11px] mb-1">Dispatch Details:</div>
              <div>Payment: <strong>{order.paymentMethod || 'Cash on Delivery'}</strong></div>
              <div>Status: <strong>{order.status || 'Processing'}</strong></div>
              <div className="font-mono text-[#4A2E1D]/70">Tracking: {order.trackingNumber || 'TCS-948102-PK'}</div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1F130E] font-mono text-[11px] uppercase">
                <th className="py-2">Item Description</th>
                <th className="py-2 text-center">Size</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D7C7] font-sans">
              {(order.items || []).map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="py-2.5 font-serif font-bold text-[#1F130E]">{item.productName} ({item.color})</td>
                  <td className="py-2.5 text-center font-mono">EU {item.size}</td>
                  <td className="py-2.5 text-center font-mono">{item.quantity}</td>
                  <td className="py-2.5 text-right font-mono">{formatPKR(item.price)}</td>
                  <td className="py-2.5 text-right font-mono font-bold">{formatPKR(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end pt-4 border-t-2 border-[#1F130E]">
            <div className="w-64 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPKR(order.subtotal || order.total)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount:</span>
                  <span>-{formatPKR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{order.shipping === 0 ? 'FREE' : formatPKR(order.shipping || 0)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1F130E] pt-2 border-t border-[#E2D7C7]">
                <span>Total Amount:</span>
                <span className="text-[#B87546]">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E2D7C7] text-center text-[10px] font-mono text-[#4A2E1D]/60 uppercase">
            Thank you for supporting authentic Peshawar craftsmanship • Tatheer Chappalz Concierge
          </div>
        </div>
      </div>
    </div>
  );
};
