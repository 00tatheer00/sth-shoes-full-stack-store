'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Printer, Truck, ShieldCheck, CheckCircle2, MapPin, User, Clock, AlertCircle } from 'lucide-react';
import { dataEngine } from '@/lib/services/dataEngine';
import { Order } from '@/types';
import { formatPKR } from '@/lib/utils';
import { PrintableInvoiceModal } from '@/components/admin/PrintableInvoiceModal';
import { useStore } from '@/context/StoreContext';

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { showToast } = useStore();

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<Order['status']>('Processing');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrder = () => {
    const found = dataEngine.getOrderById(id);
    if (found) {
      setOrder(found);
      setStatus(found.status);
      setTrackingNumber(found.trackingNumber || '');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadOrder();
    const handleUpdate = () => loadOrder();
    window.addEventListener('tatheer_orders_updated', handleUpdate);
    return () => window.removeEventListener('tatheer_orders_updated', handleUpdate);
  }, [id]);

  const handleStatusChange = (newStatus: Order['status']) => {
    setStatus(newStatus);
    dataEngine.updateOrderStatus(id, newStatus);
    showToast(`Order #${order?.orderNumber} status changed to "${newStatus}"`);
    loadOrder();
  };

  if (isLoading) {
    return <div className="p-12 text-center text-slate-500">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="p-12 text-center space-y-4">
        <div className="text-lg font-bold text-slate-900">Order Not Found</div>
        <p className="text-xs text-slate-500">No order exists with ID or number "{id}".</p>
        <Link href="/admin/orders" className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium inline-block">
          Return to Orders List
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Order #{order.orderNumber}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Placed on {order.date} • {order.paymentMethod}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowInvoiceModal(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" /> Print Packing Slip
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Order Items & Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Items */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Purchased Footwear Items ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="relative w-16 h-16 bg-white border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image || '/images/kaptaan.png'} alt={item.productName} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900">{item.productName}</h4>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Color: {item.color} • Size: EU {item.size ?? item.selectedSize} • Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-mono font-bold text-slate-900">
                    {formatPKR(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs font-sans space-y-2 text-right">
              <div className="flex justify-between text-slate-600"><span>Subtotal:</span> <span className="font-mono">{formatPKR(order.subtotal)}</span></div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promo Discount:</span> <span className="font-mono">-{formatPKR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee:</span>
                <span className="font-mono">{(order.shipping ?? order.shippingFee ?? 0) === 0 ? 'FREE' : formatPKR(order.shipping ?? order.shippingFee ?? 0)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-slate-900 font-mono text-base">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {order.timeline && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" /> Fulfillment Journey
              </h3>
              <div className="space-y-3">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        step.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      ✓
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.title}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Customer Info & Status Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Control */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Status & Logistics
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Fulfillment Status</label>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as any)}
                className={`w-full px-3 py-2 border rounded-lg text-xs font-semibold focus:outline-none ${
                  status === 'Dispatched'
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : status === 'Delivered'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : status === 'Cancelled'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Courier Tracking Code</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
              />
            </div>
          </div>

          {/* Customer Address Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 shadow-2xs text-xs text-slate-800">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-600" /> Customer Destination
            </h3>
            <div className="font-bold text-slate-900 text-sm">{order.shippingAddress.fullName}</div>
            <div className="text-slate-600">{order.shippingAddress.addressLine}</div>
            <div className="text-slate-600 font-semibold">{order.shippingAddress.city}, {order.shippingAddress.province}</div>
            <div className="font-mono text-slate-500 pt-1">Phone: {order.shippingAddress.phone}</div>
            <div className="text-slate-400 text-[11px]">Payment: {order.paymentMethod}</div>
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
