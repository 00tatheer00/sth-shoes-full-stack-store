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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
            Customer Relations
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917]">
            Patron CRM Directory ({filteredCustomers.length})
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-[#EAE3D5] rounded-lg p-4 flex items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
          <input
            type="text"
            placeholder="Search patron name, city, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#EAE3D5] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-[#FAF6EF] border-b border-[#EAE3D5] font-mono text-[11px] text-[#0D3325] uppercase font-bold">
                <th className="p-3.5">Patron Name</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">City</th>
                <th className="p-3.5 text-center">Orders</th>
                <th className="p-3.5 text-right">Lifetime Spend</th>
                <th className="p-3.5 text-center">VIP Badge Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D5]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#5A6578]">
                    No customers found matching search query.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF6EF]/60 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-[#1C1917]">{c.name}</div>
                      {c.lastOrderDate && (
                        <div className="text-[10px] text-[#5A6578] font-mono">Last: {c.lastOrderDate}</div>
                      )}
                    </td>
                    <td className="p-3.5 font-sans">
                      <div className="flex items-center gap-1 text-[11px] text-[#1C1917]">
                        <Mail className="w-3 h-3 text-[#0D3325]" /> {c.email}
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[10px] text-[#5A6578] mt-0.5">
                        <Phone className="w-3 h-3 text-[#0D3325]" /> {c.phone}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-[#1C1917] font-semibold">{c.city}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-[#1C1917]">
                      {c.ordersCount}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-[#1C1917]">
                      {formatPKR(c.totalSpent)}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded border ${
                          c.role === 'Royal Patron'
                            ? 'bg-[#0D3325] text-[#E5A93C] border-[#0D3325]'
                            : c.role === 'Verified Patron'
                            ? 'bg-amber-50 text-amber-900 border-amber-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
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
