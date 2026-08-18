'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Eye, Printer } from 'lucide-react';
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
      !o.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
            Fulfillment Operations
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917]">
            Order Management ({filteredOrders.length})
          </h1>
        </div>
      </div>

      {/* Search & Status Filter */}
      <div className="bg-white border border-[#EAE3D5] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
          <input
            type="text"
            placeholder="Search order #, customer or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FAF6EF] border border-[#EAE3D5] rounded px-3 py-2 text-xs font-serif focus:outline-none focus:border-[#0D3325]"
          >
            <option value="all">All Order Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#EAE3D5] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-[#FAF6EF] border-b border-[#EAE3D5] font-mono text-[11px] text-[#0D3325] uppercase font-bold">
                <th className="p-3.5">Order Code</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Patron / Shipping Address</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Total Amount</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D5]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#5A6578]">
                    No orders found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF6EF]/60 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#1C1917]">{ord.orderNumber}</td>
                    <td className="p-3.5 font-mono text-[#5A6578]">{ord.date}</td>
                    <td className="p-3.5 font-sans">
                      <div className="font-bold text-[#1C1917]">{ord.shippingAddress.fullName}</div>
                      <div className="text-[11px] text-[#5A6578]">
                        {ord.shippingAddress.addressLine}, {ord.shippingAddress.city}
                      </div>
                      <div className="text-[10px] font-mono text-[#8A94A6]">Phone: {ord.shippingAddress.phone}</div>
                    </td>
                    <td className="p-3.5 font-mono text-xs">
                      <span className="font-bold text-[#1C1917]">{ord.paymentMethod}</span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        className={`px-2.5 py-1 text-[10px] font-mono font-bold border rounded focus:outline-none ${
                          ord.status === 'Dispatched'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : ord.status === 'Delivered'
                            ? 'bg-green-50 text-green-800 border-green-200'
                            : ord.status === 'Cancelled'
                            ? 'bg-red-50 text-red-800 border-red-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-[#1C1917]">
                      {formatPKR(ord.total)}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setSelectedInvoice(ord)}
                          className="p-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded hover:bg-[#0D3325] hover:text-white transition-colors cursor-pointer"
                          title="Print Invoice / Packing Slip"
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
