'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { MOCK_ORDERS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';

export default function AccountOrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>('ord-1001');

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Order History
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Your Purchases & Tracking
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="text-xs uppercase text-slate-500 font-semibold tracking-wider border-b border-slate-200 pb-2">
              All Orders ({MOCK_ORDERS.length})
            </div>

            {MOCK_ORDERS.map((order) => {
              const isExpanded = expandedOrder === order.id;
              return (
                <div
                  key={order.id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-5 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          Order #{order.orderNumber}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold rounded-full ${
                            order.status === 'Dispatched'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Placed on {order.date} • Tracking: {order.trackingNumber}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between sm:justify-end">
                      <div className="text-right">
                        <div className="text-sm font-bold font-mono text-slate-900">
                          {formatPKR(order.total)}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{order.paymentMethod}</div>
                      </div>
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content (Timeline & Items) */}
                  {isExpanded && (
                    <div className="p-6 space-y-6">
                      {/* Timeline Tracker */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Live Dispatch Timeline
                        </h4>
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                          {(order.timeline || [
                            { title: 'Order Placed & Verified', date: order.date, completed: true },
                            { title: 'Artisan Workshop Crafting', date: order.date, completed: true },
                            { title: 'Courier Express Dispatch', date: 'In Transit', completed: order.status === 'Dispatched' || order.status === 'Delivered' },
                            { title: 'Delivered to Doorstep', date: 'Pending', completed: order.status === 'Delivered' },
                          ]).map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0 ${
                                  step.completed
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-200 text-slate-400'
                                }`}
                              >
                                ✓
                              </div>
                              <div className="flex-1 flex justify-between items-center text-xs">
                                <span
                                  className={`${
                                    step.completed ? 'font-bold text-slate-900' : 'text-slate-400'
                                  }`}
                                >
                                  {step.title}
                                </span>
                                <span className="font-mono text-[11px] text-slate-400">
                                  {step.date}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Ordered Items
                        </h4>
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-2xs"
                          >
                            <div className="relative w-16 h-16 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                              <Image src={item.image} alt={item.productName} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-xs font-bold text-slate-900">
                                {item.productName}
                              </h5>
                              <p className="text-[11px] text-slate-500 font-mono">
                                Shade: {item.color} • Size: EU {item.size} • Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-xs font-bold font-mono text-slate-900">
                              {formatPKR(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Address */}
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                        <div className="font-bold text-slate-900 mb-1">
                          Delivery Destination:
                        </div>
                        <div>{order.shippingAddress.fullName}</div>
                        <div>{order.shippingAddress.addressLine}, {order.shippingAddress.city}</div>
                        <div className="text-slate-500 font-mono pt-0.5">Phone: {order.shippingAddress.phone}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
