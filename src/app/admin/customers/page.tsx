'use client';

import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, Eye } from 'lucide-react';
import { formatPKR } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    {
      id: 'cust-1',
      name: 'Shahid Khan',
      email: 'shahid.khan@example.com',
      phone: '+92 301 8877665',
      city: 'Peshawar',
      ordersCount: 4,
      totalSpent: 56996,
      role: 'Patron Collector',
    },
    {
      id: 'cust-2',
      name: 'Tariq Mehmood',
      email: 'tariq@example.com',
      phone: '+92 300 1234567',
      city: 'Lahore',
      ordersCount: 2,
      totalSpent: 28498,
      role: 'Verified Patron',
    },
    {
      id: 'cust-3',
      name: 'Bilal Ahmed',
      email: 'bilal.ahmed@example.com',
      phone: '+92 321 9988776',
      city: 'Islamabad',
      ordersCount: 3,
      totalSpent: 42997,
      role: 'Verified Patron',
    },
    {
      id: 'cust-4',
      name: 'Hamza Farooq',
      email: 'hamza@example.com',
      phone: '+92 333 4455667',
      city: 'Karachi',
      ordersCount: 1,
      totalSpent: 13999,
      role: 'Patron',
    },
  ];

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D7C7] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
            Customer Relations
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1F130E]">
            Patron CRM Directory ({filteredCustomers.length})
          </h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-[#E2D7C7] p-4 flex items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
          <input
            type="text"
            placeholder="Search patron name, city, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#E2D7C7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E2D7C7] font-mono text-[11px] text-[#4A2E1D] uppercase">
                <th className="p-3.5">Patron Name</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">City</th>
                <th className="p-3.5 text-center">Orders</th>
                <th className="p-3.5 text-right">Lifetime Spend</th>
                <th className="p-3.5 text-center">Badge Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D7C7]">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="p-3.5 font-bold text-[#1F130E]">{c.name}</td>
                  <td className="p-3.5 font-sans">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Mail className="w-3 h-3 text-[#4A2E1D]/60" /> {c.email}
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-[#4A2E1D]/60 mt-0.5">
                      <Phone className="w-3 h-3 text-[#4A2E1D]/60" /> {c.phone}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-[#4A2E1D]">{c.city}</td>
                  <td className="p-3.5 text-center font-mono font-bold text-[#1F130E]">
                    {c.ordersCount}
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-[#1F130E]">
                    {formatPKR(c.totalSpent)}
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2.5 py-1 bg-[#1F130E] text-[#C59B27] text-[10px] font-mono font-bold uppercase">
                      {c.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
