'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, Printer, Filter, CheckCircle2, Clock, Truck, XCircle } from 'lucide-react';
import { MOCK_ORDERS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';
import { PrintableInvoiceModal } from '@/components/admin/PrintableInvoiceModal';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

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

  const handleUpdateStatus = (orderId: string, newStatus: any) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D7C7] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
            Fulfillment Operations
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1F130E]">
            Order Management ({filteredOrders.length})
          </h1>
        </div>
      </div>

      {/* Search & Status Filter */}
      <div className="bg-white border border-[#E2D7C7] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
          <input
            type="text"
            placeholder="Search order #, customer or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FAF7F2] border border-[#E2D7C7] px-3 py-2 text-xs font-serif focus:outline-none focus:border-[#B87546]"
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
      <div className="bg-white border border-[#E2D7C7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E2D7C7] font-mono text-[11px] text-[#4A2E1D] uppercase">
                <th className="p-3.5">Order Code</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Patron / Shipping Address</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Total Amount</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D7C7]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#1F130E]">{ord.orderNumber}</td>
                  <td className="p-3.5 font-mono text-[#4A2E1D]">{ord.date}</td>
                  <td className="p-3.5 font-sans">
                    <div className="font-bold text-[#1F130E]">{ord.shippingAddress.fullName}</div>
                    <div className="text-[11px] text-[#4A2E1D]/70">{ord.shippingAddress.addressLine}, {ord.shippingAddress.city}</div>
                    <div className="text-[10px] font-mono text-[#4A2E1D]/50">Phone: {ord.shippingAddress.phone}</div>
                  </td>
                  <td className="p-3.5 font-mono text-xs">
                    <span className="font-bold text-[#1F130E]">{ord.paymentMethod}</span>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                      className={`px-2.5 py-1 text-[10px] font-mono font-bold border focus:outline-none ${
                        ord.status === 'Dispatched'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : ord.status === 'Delivered'
                          ? 'bg-green-50 text-green-800 border-green-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-[#1F130E]">
                    {formatPKR(ord.total)}
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/orders/${ord.id}`}
                        className="p-1.5 bg-[#FAF7F2] border border-[#E2D7C7] hover:bg-[#1F130E] hover:text-[#C59B27] transition-colors"
                        title="View Full Order Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setSelectedInvoice(ord)}
                        className="p-1.5 bg-[#FAF7F2] border border-[#E2D7C7] hover:bg-[#1F130E] hover:text-[#C59B27] transition-colors"
                        title="Print Invoice / Packing Slip"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
