'use client';

import React from 'react';
import { X, Printer } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white max-w-2xl w-full border border-slate-200 rounded-2xl shadow-2xl p-8 space-y-6 relative text-slate-900 my-8">
        {/* Close & Print Buttons Header (Hidden when printing) */}
        <div className="flex justify-between items-center print:hidden border-b border-slate-100 pb-4">
          <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
            Order #{order.orderNumber || order.order_number} Packing Slip
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print Packing Slip
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE AREA */}
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide text-slate-900 uppercase">
                TATHEER CHAPPALZ
              </h1>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Authentic Peshawari Footwear Atelier
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Namak Mandi Bazaar, Opposite Jahangirpura, Peshawar, Pakistan
              </p>
            </div>
            <div className="text-right text-xs">
              <div className="font-bold text-sm text-slate-900">PACKING SLIP / INVOICE</div>
              <div className="text-blue-600 font-mono font-bold">#{order.orderNumber || order.order_number}</div>
              <div className="text-slate-500">{order.date || 'August 19, 2026'}</div>
            </div>
          </div>

          {/* Customer & Shipping info */}
          <div className="grid grid-cols-2 gap-6 text-xs border-b border-slate-200 pb-4">
            <div>
              <div className="font-bold text-slate-900 uppercase text-[11px] mb-1">Billed & Shipped To:</div>
              <div className="font-bold text-sm text-slate-900">{order.shippingAddress?.fullName || 'Shahzaib Khan'}</div>
              <div className="text-slate-600">{order.shippingAddress?.addressLine || 'House 42, Street 8, Sector F-7/3'}</div>
              <div className="text-slate-600 font-medium">{order.shippingAddress?.city || 'Islamabad'}, Pakistan</div>
              <div className="font-mono text-slate-500 pt-0.5">Phone: {order.shippingAddress?.phone || '+92 300 1234567'}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-900 uppercase text-[11px] mb-1">Dispatch Details:</div>
              <div className="text-slate-700">Payment: <strong>{order.paymentMethod || 'Cash on Delivery'}</strong></div>
              <div className="text-slate-700">Status: <strong>{order.status || 'Processing'}</strong></div>
              <div className="font-mono text-slate-500">Tracking: {order.trackingNumber || 'TCS-948102-PK'}</div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-900 text-slate-700 font-bold uppercase text-[11px]">
                <th className="py-2">Item Description</th>
                <th className="py-2 text-center">Size</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Unit Price</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(order.items || []).map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="py-2.5 font-semibold text-slate-900">{item.productName} ({item.color})</td>
                  <td className="py-2.5 text-center font-mono">EU {item.size ?? item.selectedSize}</td>
                  <td className="py-2.5 text-center font-mono font-bold">{item.quantity}</td>
                  <td className="py-2.5 text-right font-mono">{formatPKR(item.price)}</td>
                  <td className="py-2.5 text-right font-mono font-bold">{formatPKR(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end pt-4 border-t-2 border-slate-900">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">{formatPKR(order.subtotal || order.total)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount:</span>
                  <span className="font-mono">-{formatPKR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping:</span>
                <span className="font-mono">{order.shipping === 0 ? 'FREE' : formatPKR(order.shipping || 0)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="font-mono text-base">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 text-center text-[11px] text-slate-500">
            Thank you for supporting authentic Peshawar craftsmanship • Tatheer Chappalz Concierge
          </div>
        </div>
      </div>
    </div>
  );
};
