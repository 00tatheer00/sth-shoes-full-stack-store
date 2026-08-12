'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Package, Truck, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { MOCK_ORDERS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';

export default function AccountOrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>('ord-1001');

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      <div className="bg-[#1F130E] text-[#FAF7F2] py-12 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C59B27]">
            Order History
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FAF7F2]">
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
            <div className="text-xs font-mono uppercase text-[#4A2E1D] font-bold border-b border-[#E2D7C7] pb-2">
              All Orders ({MOCK_ORDERS.length})
            </div>

            {MOCK_ORDERS.map((order) => {
              const isExpanded = expandedOrder === order.id;
              return (
                <div
                  key={order.id}
                  className="bg-white border border-[#E2D7C7] shadow-xs overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-5 bg-[#FAF7F2] border-b border-[#E2D7C7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-base text-[#1F130E]">
                          Order #{order.orderNumber}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold ${
                            order.status === 'Dispatched'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#4A2E1D]/70 font-mono mt-0.5">
                        Placed on {order.date} • Tracking: {order.trackingNumber}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between sm:justify-end">
                      <div className="text-right">
                        <div className="text-sm font-serif font-bold text-[#1F130E]">
                          {formatPKR(order.total)}
                        </div>
                        <div className="text-[10px] text-[#4A2E1D]/60 font-mono">{order.paymentMethod}</div>
                      </div>
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="p-1.5 text-[#1F130E] hover:text-[#B87546]"
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
                        <h4 className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">
                          Live Dispatch Timeline
                        </h4>
                        <div className="p-4 bg-[#FAF7F2] border border-[#E2D7C7] space-y-3">
                          {order.timeline.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0 ${
                                  step.completed
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-400'
                                }`}
                              >
                                ✓
                              </div>
                              <div className="flex-1 flex justify-between items-center text-xs">
                                <span
                                  className={`font-serif ${
                                    step.completed ? 'font-bold text-[#1F130E]' : 'text-[#4A2E1D]/60'
                                  }`}
                                >
                                  {step.title}
                                </span>
                                <span className="font-mono text-[11px] text-[#4A2E1D]/60">
                                  {step.date}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">
                          Ordered Items
                        </h4>
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white border border-[#E2D7C7] flex items-center gap-4"
                          >
                            <div className="relative w-16 h-16 bg-[#FAF7F2] border border-[#E2D7C7]">
                              <Image src={item.image} alt={item.productName} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-sm font-serif font-bold text-[#1F130E]">
                                {item.productName}
                              </h5>
                              <p className="text-xs text-[#4A2E1D]/70 font-mono">
                                Shade: {item.color} • Size: EU {item.size} • Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-sm font-serif font-bold text-[#1F130E]">
                              {formatPKR(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Address */}
                      <div className="p-4 bg-[#FAF7F2] border border-[#E2D7C7] text-xs text-[#4A2E1D]">
                        <div className="font-mono uppercase font-bold text-[#1F130E] mb-1">
                          Delivery Destination:
                        </div>
                        <div>{order.shippingAddress.fullName}</div>
                        <div>{order.shippingAddress.addressLine}, {order.shippingAddress.city}</div>
                        <div>Phone: {order.shippingAddress.phone}</div>
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
