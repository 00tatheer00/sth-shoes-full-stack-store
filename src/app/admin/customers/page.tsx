'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Phone, MapPin, Award, ShoppingBag } from 'lucide-react';
import { dataEngine } from '@/lib/services/dataEngine';
import { Customer } from '@/types';
import { formatPKR } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadCustomers = () => {
    const list = dataEngine.getCustomers();
    setCustomers(list);
  };

  useEffect(() => {
    loadCustomers();
    const handleUpdate = () => loadCustomers();
    window.addEventListener('tatheer_orders_updated', handleUpdate);
    return () => window.removeEventListener('tatheer_orders_updated', handleUpdate);
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Customer Directory ({filteredCustomers.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated patron orders, lifetime spending, and loyalty tiers.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patron name, city, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Customer Name</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">City</th>
                <th className="p-3.5 text-center">Orders</th>
                <th className="p-3.5 text-right">Lifetime Spend</th>
                <th className="p-3.5 text-center">Loyalty Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No customers found matching search query.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{c.name}</div>
                      {c.lastOrderDate && (
                        <div className="text-[11px] text-slate-500 font-mono">Last order: {c.lastOrderDate}</div>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-800">
                        <Mail className="w-3 h-3 text-slate-400" /> {c.email}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" /> {c.phone}
                      </div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">{c.city}</td>
                    <td className="p-3.5 text-center font-mono font-semibold text-slate-900">
                      {c.ordersCount}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                      {formatPKR(c.totalSpent)}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          c.role === 'Royal Patron'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : c.role === 'Verified Patron'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {c.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
