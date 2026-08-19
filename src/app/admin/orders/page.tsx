'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Eye, Printer, ExternalLink } from 'lucide-react';
import { orderService } from '@/lib/services/orderService';
import { Order } from '@/types';
import { formatPKR } from '@/lib/utils';
import { PrintableInvoiceModal } from '@/components/admin/PrintableInvoiceModal';
import { useStore } from '@/context/StoreContext';

export default function AdminOrdersPage() {
  const { showToast } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const loadOrders = async () => {
    const list = await orderService.getOrders();
    setOrders(list);
  };

  useEffect(() => {
    loadOrders();
    const handleUpdate = () => loadOrders();
    window.addEventListener('tatheer_orders_updated', handleUpdate);
    return () => window.removeEventListener('tatheer_orders_updated', handleUpdate);
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (
      searchQuery &&
      !o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !o.shippingAddress.city.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleUpdateStatus = async (orderId: string, newStatus: any) => {
    await orderService.updateOrderStatus(orderId, newStatus);
    showToast(`Order status updated to "${newStatus}"`);
    loadOrders();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Orders & Fulfillment ({filteredOrders.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time checkout requests, courier tracking, and update status.
          </p>
        </div>
      </div>

      {/* Search & Status Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search order #, customer or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="all">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Order #</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Customer / Destination</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Amount</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No orders found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-semibold text-slate-900">
                      <Link href={`/admin/orders/${ord.id}`} className="hover:text-blue-600 hover:underline">
                        {ord.orderNumber}
                      </Link>
                    </td>
                    <td className="p-3.5 font-mono text-slate-500">{ord.date}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{ord.shippingAddress.fullName}</div>
                      <div className="text-[11px] text-slate-500">
                        {ord.shippingAddress.addressLine}, {ord.shippingAddress.city}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">Phone: {ord.shippingAddress.phone}</div>
                    </td>
                    <td className="p-3.5 text-xs text-slate-700 font-medium">
                      {ord.paymentMethod}
                    </td>
                    <td className="p-3.5">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-full border focus:outline-none cursor-pointer ${
                          ord.status === 'Dispatched'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : ord.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : ord.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                      {formatPKR(ord.total)}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link
                          href={`/admin/orders/${ord.id}`}
                          className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-900 hover:text-white transition-colors text-slate-600"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setSelectedInvoice(ord)}
                          className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-900 hover:text-white transition-colors text-slate-600 cursor-pointer"
                          title="Print Packing Slip"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PrintableInvoiceModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        order={selectedInvoice}
      />
    </div>
  );
}
