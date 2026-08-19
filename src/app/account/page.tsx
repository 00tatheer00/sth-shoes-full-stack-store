'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, MapPin, Heart, Truck, ArrowRight } from 'lucide-react';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { MOCK_ORDERS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

export default function AccountDashboardPage() {
  const { currentUser, wishlist } = useStore();
  const recentOrder = MOCK_ORDERS[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Customer Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome Back, {currentUser?.user_metadata?.full_name || 'Shahzaib Khan'}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-800 px-4 py-2 border border-slate-700 rounded-xl">
            <span>Patron Status: <strong className="text-blue-400 font-bold">Verified Collector</strong></span>
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
              <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{MOCK_ORDERS.length}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Orders</div>
                </div>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">1</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Shipment</div>
                </div>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{wishlist.length}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Saved Favorites</div>
                </div>
              </div>
            </div>

            {/* Active Order Status Tracker Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs uppercase text-blue-600 font-semibold tracking-wider">
                    Active Order Status
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    Order #{recentOrder.orderNumber} ({recentOrder.status})
                  </h3>
                </div>
                <Link
                  href="/account/orders"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  View Full Tracking <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Progress Steps */}
              <div className="py-4">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
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
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="font-bold text-slate-900 line-clamp-1">{step.title}</div>
                      <div className="text-[10px] text-slate-500">{step.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order item preview */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4">
                <div className="relative w-14 h-14 bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <Image
                    src={recentOrder.items[0].image}
                    alt={recentOrder.items[0].productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">
                    {recentOrder.items[0].productName}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Size: EU {recentOrder.items[0].size} • {recentOrder.items[0].color}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-900">
                    {formatPKR(recentOrder.total)}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 font-bold">{recentOrder.paymentMethod}</div>
                </div>
              </div>
            </div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/account/profile"
                className="p-5 bg-white border border-slate-200 hover:border-slate-400 rounded-2xl transition-colors space-y-1 block shadow-2xs"
              >
                <h4 className="text-sm font-bold text-slate-900">Edit Profile & Security</h4>
                <p className="text-xs text-slate-500">
                  Update your contact details, email preference & password.
                </p>
              </Link>
              <Link
                href="/account/addresses"
                className="p-5 bg-white border border-slate-200 hover:border-slate-400 rounded-2xl transition-colors space-y-1 block shadow-2xs"
              >
                <h4 className="text-sm font-bold text-slate-900">Manage Shipping Addresses</h4>
                <p className="text-xs text-slate-500">
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
