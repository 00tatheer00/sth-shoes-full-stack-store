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
    return <div className="p-12 text-center text-[#5A6578]">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="p-12 text-center space-y-4">
        <div className="text-lg font-serif font-bold text-[#1C1917]">Order Not Found</div>
        <p className="text-xs text-[#5A6578]">No order exists with ID or number "{id}".</p>
        <Link href="/admin/orders" className="btn-forest px-4 py-2 text-xs inline-block">
          Return to Orders List
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#EAE3D5] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 bg-white border border-[#EAE3D5] rounded hover:bg-[#FAF6EF] text-[#1C1917]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
              Fulfillment Operations
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1C1917]">
              Order #{order.orderNumber}
            </h1>
          </div>
        </div>
        <button
          onClick={() => setShowInvoiceModal(true)}
          className="btn-forest px-4 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#E5A93C]" /> Print Packing Slip
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Order Items & Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Order Items */}
          <div className="bg-white border border-[#EAE3D5] rounded-lg p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2">
              Purchased Footwear Items ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3.5 bg-[#FAF6EF] border border-[#EAE3D5] rounded-lg">
                  <div className="relative w-16 h-16 bg-white border border-[#EAE3D5] rounded overflow-hidden flex-shrink-0">
                    <Image src={item.image || '/images/kaptaan.png'} alt={item.productName} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-serif font-bold text-[#1C1917]">{item.productName}</h4>
                    <div className="text-xs text-[#5A6578] font-mono mt-0.5">
                      Shade: {item.color} • Size: EU {item.size ?? item.selectedSize} • Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-serif font-bold text-[#1C1917]">
                    {formatPKR(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EAE3D5] text-xs font-mono space-y-1.5 text-right">
              <div className="flex justify-between"><span>Subtotal:</span> <span>{formatPKR(order.subtotal)}</span></div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-700 font-bold">
                  <span>Promo Discount:</span> <span>-{formatPKR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{(order.shipping ?? order.shippingFee ?? 0) === 0 ? 'FREE' : formatPKR(order.shipping ?? order.shippingFee ?? 0)}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-[#1C1917] pt-2 border-t border-[#EAE3D5]">
                <span>Total Amount:</span>
                <span className="text-[#0D3325] font-mono text-base">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {order.timeline && (
            <div className="bg-white border border-[#EAE3D5] rounded-lg p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0D3325]" /> Fulfillment Journey Timeline
              </h3>
              <div className="space-y-3">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                        step.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      ✓
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold ${step.completed ? 'text-[#1C1917]' : 'text-[#8A94A6]'}`}>
                        {step.title}
                      </div>
                      <div className="text-[10px] text-[#5A6578] font-mono">{step.date}</div>
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
          <div className="bg-white border border-[#EAE3D5] rounded-lg p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2">
              Order Status & Logistics
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Fulfillment Status</label>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as any)}
                className={`w-full p-3 border rounded text-xs font-serif font-bold focus:outline-none ${
                  status === 'Dispatched'
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : status === 'Delivered'
                    ? 'bg-green-50 text-green-800 border-green-200'
                    : status === 'Cancelled'
                    ? 'bg-red-50 text-red-800 border-red-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">TCS / Leopards Tracking Code</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono"
              />
            </div>
          </div>

          {/* Customer Address Card */}
          <div className="bg-white border border-[#EAE3D5] rounded-lg p-6 space-y-3 shadow-xs text-xs text-[#1C1917]">
            <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-[#0D3325]" /> Patron Destination
            </h3>
            <div className="font-bold text-[#1C1917] text-sm">{order.shippingAddress.fullName}</div>
            <div className="text-[#5A6578]">{order.shippingAddress.addressLine}</div>
            <div className="text-[#5A6578] font-semibold">{order.shippingAddress.city}, {order.shippingAddress.province}</div>
            <div className="font-mono text-[#5A6578] pt-1">Phone: {order.shippingAddress.phone}</div>
            <div className="font-mono text-[10px] text-[#8A94A6]">Payment: {order.paymentMethod}</div>
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
