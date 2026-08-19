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
import { dataEngine } from '@/lib/services/dataEngine';
import { formatPKR } from '@/lib/utils';
import { PrintableInvoiceModal } from '@/components/admin/PrintableInvoiceModal';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any | null>(null);

  const loadData = async () => {
    const data = await adminService.getDashboardMetrics();
    setMetrics(data);
    setOrders(dataEngine.getOrders().slice(0, 5));
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('tatheer_orders_updated', handleUpdate);
    window.addEventListener('tatheer_products_updated', handleUpdate);
    return () => {
      window.removeEventListener('tatheer_orders_updated', handleUpdate);
      window.removeEventListener('tatheer_products_updated', handleUpdate);
    };
  }, []);

  if (!metrics) {
    return (
      <div className="space-y-6 animate-pulse p-6">
        <div className="h-8 bg-[#EAE3D5] w-64 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-28 bg-white border border-[#EAE3D5] rounded"></div>
          <div className="h-28 bg-white border border-[#EAE3D5] rounded"></div>
          <div className="h-28 bg-white border border-[#EAE3D5] rounded"></div>
          <div className="h-28 bg-white border border-[#EAE3D5] rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
            Executive Summary
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917]">
            Atelier SaaS Operations Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="btn-forest px-4 py-2.5 text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#E5A93C]" /> Add New Footwear
          </Link>
        </div>
      </div>

      {/* Key Metric Stat Cards */}
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
          subtitle="Live calculated today"
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
        <div className="lg:col-span-8 bg-white border border-[#EAE3D5] rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#EAE3D5] pb-3">
            <div>
              <h3 className="text-base font-serif font-bold text-[#1C1917]">Recent Patron Orders</h3>
              <p className="text-xs text-[#5A6578] font-mono">Latest dispatch requests</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-serif text-[#0D3325] font-bold hover:underline flex items-center gap-1"
            >
              View All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-serif border-collapse">
              <thead>
                <tr className="bg-[#FAF6EF] border-b border-[#EAE3D5] font-mono text-[11px] text-[#0D3325] uppercase font-bold">
                  <th className="p-3">Order Code</th>
                  <th className="p-3">Patron</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D5]">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF6EF]/60 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#1C1917]">{ord.orderNumber}</td>
                    <td className="p-3 font-sans">
                      <div className="font-bold text-[#1C1917]">{ord.shippingAddress.fullName}</div>
                      <div className="text-[10px] text-[#5A6578] font-mono">{ord.shippingAddress.city}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded ${
                          ord.status === 'Dispatched'
                            ? 'bg-blue-100 text-blue-800'
                            : ord.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : ord.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-[#1C1917]">
                      {formatPKR(ord.total)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedInvoiceOrder(ord)}
                        className="p-1.5 bg-[#FAF6EF] border border-[#EAE3D5] rounded hover:bg-[#0D3325] hover:text-white transition-colors cursor-pointer"
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
        <div className="lg:col-span-4 bg-white border border-[#EAE3D5] rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAE3D5] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h3 className="text-base font-serif font-bold text-[#1C1917]">Low Stock Warning</h3>
            </div>
            <Link href="/admin/inventory" className="text-xs text-[#0D3325] font-bold hover:underline font-mono">
              Restock All
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {dataEngine
              .getAllInventoryVariants()
              .filter((v) => v.stockCount <= 4)
              .slice(0, 4)
              .map((v, i) => (
                <div
                  key={i}
                  className={`p-3 rounded space-y-1 border ${
                    v.stockCount === 0
                      ? 'bg-red-50 border-red-200 text-red-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="font-serif font-bold text-[#1C1917]">{v.productName}</div>
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className={v.stockCount === 0 ? 'text-red-700 font-bold' : 'text-amber-800 font-bold'}>
                      EU {v.size} ({v.color}): {v.stockCount} in Stock
                    </span>
                    <Link href="/admin/inventory" className="text-[#0D3325] underline font-bold">
                      Restock
                    </Link>
                  </div>
                </div>
              ))}
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
