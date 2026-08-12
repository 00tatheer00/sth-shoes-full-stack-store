'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  AlertTriangle,
  ArrowRight,
  Eye,
  Plus,
} from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { AnalyticsCharts } from '@/components/admin/AnalyticsCharts';
import { adminService, AdminMetrics } from '@/lib/services/adminService';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';
import { PrintableInvoiceModal } from '@/components/admin/PrintableInvoiceModal';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      const data = await adminService.getDashboardMetrics();
      setMetrics(data);
    }
    loadMetrics();
  }, []);

  if (!metrics) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-[#EAE3D2] w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-28 bg-white border border-[#E2D7C7]"></div>
          <div className="h-28 bg-white border border-[#E2D7C7]"></div>
          <div className="h-28 bg-white border border-[#E2D7C7]"></div>
          <div className="h-28 bg-white border border-[#E2D7C7]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2D7C7] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
            Executive Summary
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1F130E]">
            Atelier SaaS Operations Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#4A2E1D]"
          >
            <Plus className="w-4 h-4 text-[#C59B27]" /> Add New Footwear
          </Link>
        </div>
      </div>

      {/* 9 Key Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={formatPKR(metrics.totalRevenue)}
          change="+18.4%"
          isPositive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Today's Revenue"
          value={formatPKR(metrics.todayRevenue)}
          subtitle="4 new orders today"
          icon={DollarSign}
        />
        <StatCard
          title="Monthly Revenue"
          value={formatPKR(metrics.monthlyRevenue)}
          change="+12.1%"
          isPositive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value={metrics.totalOrders}
          change="+8%"
          isPositive={true}
          icon={ShoppingBag}
        />
        <StatCard
          title="Pending Fulfillment"
          value={metrics.pendingOrders}
          subtitle="Needs cobbler dispatch"
          icon={Clock}
        />
        <StatCard
          title="Delivered Orders"
          value={metrics.deliveredOrders}
          isPositive={true}
          icon={CheckCircle2}
        />
        <StatCard
          title="Cancelled Orders"
          value={metrics.cancelledOrders}
          isPositive={false}
          icon={XCircle}
        />
        <StatCard
          title="Total Patrons"
          value={metrics.totalCustomers}
          change="+5 new"
          isPositive={true}
          icon={Users}
        />
      </div>

      {/* Analytics Charts */}
      <AnalyticsCharts
        revenueData={metrics.revenueChart}
        cityData={metrics.cityOrders}
        topProducts={metrics.topProducts}
      />

      {/* Recent Orders Table & Low Stock Alert Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white border border-[#E2D7C7] p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#E2D7C7] pb-3">
            <div>
              <h3 className="text-base font-serif font-bold text-[#1F130E]">Recent Patron Orders</h3>
              <p className="text-xs text-[#4A2E1D]/70 font-mono">Latest dispatch requests</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-serif text-[#B87546] hover:underline flex items-center gap-1"
            >
              View All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-serif border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E2D7C7] font-mono text-[11px] text-[#4A2E1D] uppercase">
                  <th className="p-3">Order Code</th>
                  <th className="p-3">Patron</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D7C7]">
                {MOCK_ORDERS.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-3 font-mono font-bold text-[#1F130E]">{ord.orderNumber}</td>
                    <td className="p-3 font-sans">
                      <div className="font-bold">{ord.shippingAddress.fullName}</div>
                      <div className="text-[10px] text-[#4A2E1D]/60 font-mono">{ord.shippingAddress.city}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                          ord.status === 'Dispatched'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-[#1F130E]">
                      {formatPKR(ord.total)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedInvoiceOrder(ord)}
                        className="p-1.5 bg-[#FAF7F2] border border-[#E2D7C7] hover:bg-[#1F130E] hover:text-[#C59B27] transition-colors"
                        title="Print Invoice"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert List */}
        <div className="lg:col-span-4 bg-white border border-[#E2D7C7] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h3 className="text-base font-serif font-bold text-[#1F130E]">Low Stock Warning</h3>
            </div>
            <Link href="/admin/inventory" className="text-xs text-[#B87546] hover:underline font-mono">
              Restock All
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-red-50 border border-red-200 space-y-1">
              <div className="font-serif font-bold text-[#1F130E]">Kaptan Double Sole Dark Chocolate</div>
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-red-700 font-bold">Variant EU 45: 0 in Stock</span>
                <Link href="/admin/inventory" className="text-[#4A2E1D] underline">
                  Restock
                </Link>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 space-y-1">
              <div className="font-serif font-bold text-[#1F130E]">Norozi Heavy Buckle Maroon</div>
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-amber-800 font-bold">Variant EU 44: 2 in Stock</span>
                <Link href="/admin/inventory" className="text-[#4A2E1D] underline">
                  Restock
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Invoice Modal */}
      <PrintableInvoiceModal
        isOpen={!!selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
        order={selectedInvoiceOrder}
      />
    </div>
  );
}
