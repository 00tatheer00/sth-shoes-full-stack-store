'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, MapPin, Heart, Clock, Truck, ArrowRight } from 'lucide-react';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { MOCK_ORDERS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';

export default function AccountDashboardPage() {
  const recentOrder = MOCK_ORDERS[0];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#1F130E] text-[#FAF7F2] py-12 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C59B27]">
              Customer Portal
            </span>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#FAF7F2]">
              Welcome Back, Shahzaib Khan
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#E2D7C7]/80 bg-[#3A2315] px-4 py-2 border border-[#C59B27]/40">
            <span>Patron Status: <strong className="text-[#C59B27]">Royal Collector</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <AccountSidebar />
          </div>

          {/* Main Dashboard Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-[#E2D7C7] flex items-center gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#B87546]">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#1F130E]">2</div>
                  <div className="text-[11px] font-mono text-[#4A2E1D]/70 uppercase">Total Orders</div>
                </div>
              </div>
              <div className="p-5 bg-white border border-[#E2D7C7] flex items-center gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#B87546]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#1F130E]">1</div>
                  <div className="text-[11px] font-mono text-[#4A2E1D]/70 uppercase">Active Shipment</div>
                </div>
              </div>
              <div className="p-5 bg-white border border-[#E2D7C7] flex items-center gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#B87546]">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#1F130E]">3</div>
                  <div className="text-[11px] font-mono text-[#4A2E1D]/70 uppercase">Saved Favorites</div>
                </div>
              </div>
            </div>

            {/* Active Order Status Tracker Widget */}
            <div className="bg-white border border-[#E2D7C7] p-6 space-y-4 shadow-xs">
              <div className="flex justify-between items-center border-b border-[#E2D7C7] pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#B87546] font-bold">
                    Active Order Status
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#1F130E]">
                    Order #{recentOrder.orderNumber} ({recentOrder.status})
                  </h3>
                </div>
                <Link
                  href="/account/orders"
                  className="text-xs font-serif text-[#B87546] hover:underline flex items-center gap-1"
                >
                  View Full Tracking Timeline <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Progress Steps */}
              <div className="py-4">
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                  {(recentOrder.timeline || [
                    { title: 'Confirmed', date: recentOrder.date, completed: true },
                    { title: 'Crafting', date: recentOrder.date, completed: true },
                    { title: 'Dispatched', date: 'In Transit', completed: recentOrder.status === 'Dispatched' || recentOrder.status === 'Delivered' },
                    { title: 'Delivered', date: 'Pending', completed: recentOrder.status === 'Delivered' },
                  ]).slice(0, 4).map((step, idx) => (
                    <div key={idx} className="space-y-2">
                      <div
                        className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold ${
                          step.completed
                            ? 'bg-[#1F130E] text-[#C59B27]'
                            : 'bg-[#EAE3D2] text-[#4A2E1D]/50'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="font-bold text-[#1F130E] line-clamp-1">{step.title}</div>
                      <div className="text-[10px] text-[#4A2E1D]/60">{step.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order item preview */}
              <div className="p-3 bg-[#FAF7F2] border border-[#E2D7C7] flex items-center gap-4">
                <div className="relative w-14 h-14 bg-white border border-[#E2D7C7]">
                  <Image
                    src={recentOrder.items[0].image}
                    alt={recentOrder.items[0].productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-serif font-bold text-[#1F130E]">
                    {recentOrder.items[0].productName}
                  </div>
                  <div className="text-[11px] text-[#4A2E1D]/70 font-mono">
                    Size: EU {recentOrder.items[0].size} • {recentOrder.items[0].color}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-[#1F130E]">
                    {formatPKR(recentOrder.total)}
                  </div>
                  <div className="text-[10px] font-mono text-green-700">{recentOrder.paymentMethod}</div>
                </div>
              </div>
            </div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/account/profile"
                className="p-5 bg-white border border-[#E2D7C7] hover:border-[#B87546] transition-colors space-y-1 block shadow-xs"
              >
                <h4 className="text-sm font-serif font-bold text-[#1F130E]">Edit Profile & Security</h4>
                <p className="text-xs text-[#4A2E1D]/70">
                  Update your contact details, email preference & password.
                </p>
              </Link>
              <Link
                href="/account/addresses"
                className="p-5 bg-white border border-[#E2D7C7] hover:border-[#B87546] transition-colors space-y-1 block shadow-xs"
              >
                <h4 className="text-sm font-serif font-bold text-[#1F130E]">Manage Shipping Addresses</h4>
                <p className="text-xs text-[#4A2E1D]/70">
                  Save default home or office delivery addresses for fast COD.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
