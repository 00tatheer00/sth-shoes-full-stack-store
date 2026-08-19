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
  TrendingUp,
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
      <div className="space-y-6 animate-pulse p-4">
        <div className="h-8 bg-slate-200 w-64 rounded-lg"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-28 bg-white border border-slate-200 rounded-xl"></div>
          <div className="h-28 bg-white border border-slate-200 rounded-xl"></div>
          <div className="h-28 bg-white border border-slate-200 rounded-xl"></div>
          <div className="h-28 bg-white border border-slate-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Operations Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time sales, order fulfillment, and inventory analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Product
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
          title="Today's Sales"
          value={formatPKR(metrics.todayRevenue)}
          subtitle="Live calculated today"
          icon={TrendingUp}
        />
        <StatCard
          title="Total Orders"
          value={metrics.totalOrders}
          change="+8%"
          isPositive={true}
          icon={ShoppingBag}
        />
        <StatCard
          title="Pending Orders"
          value={metrics.pendingOrders}
          subtitle="Awaiting dispatch"
          icon={Clock}
        />
        <StatCard
          title="Dispatched"
          value={metrics.dispatchedOrders}
          subtitle="In transit via courier"
          icon={ShoppingBag}
        />
        <StatCard
          title="Delivered"
          value={metrics.deliveredOrders}
          isPositive={true}
          icon={CheckCircle2}
        />
        <StatCard
          title="Cancelled"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Patron Orders</h3>
              <p className="text-xs text-slate-500">Latest checkout requests across Pakistan</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="p-3.5">Order #</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Amount</th>
                  <th className="p-3.5 text-center">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-semibold text-slate-900">{ord.orderNumber}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{ord.shippingAddress.fullName}</div>
                      <div className="text-[11px] text-slate-500">{ord.shippingAddress.city}</div>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                          ord.status === 'Dispatched'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : ord.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : ord.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                      {formatPKR(ord.total)}
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => setSelectedInvoiceOrder(ord)}
                        className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-900 hover:text-white transition-colors cursor-pointer text-slate-600"
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
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">Low Stock Notice</h3>
            </div>
            <Link href="/admin/inventory" className="text-xs text-blue-600 font-semibold hover:underline">
              Manage
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
                  className={`p-3 rounded-lg space-y-1 border ${
                    v.stockCount === 0
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="font-semibold text-slate-900">{v.productName}</div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className={v.stockCount === 0 ? 'text-rose-700 font-medium' : 'text-amber-800 font-medium'}>
                      EU {v.size} ({v.color}): {v.stockCount} left
                    </span>
                    <Link href="/admin/inventory" className="text-blue-600 font-semibold hover:underline">
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
