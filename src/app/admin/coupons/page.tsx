'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AdminCouponsPage() {
  const { showToast } = useStore();
  const [coupons, setCoupons] = useState([
    { id: 'coup-1', code: 'PESHAWAR10', discount: 10, active: true, usageCount: 42, validUntil: '2027-12-31' },
    { id: 'coup-2', code: 'TATHEER15', discount: 15, active: true, usageCount: 18, validUntil: '2027-12-31' },
  ]);

  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(20);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    setCoupons((prev) => [
      ...prev,
      {
        id: `coup-${Date.now()}`,
        code: newCode.trim().toUpperCase(),
        discount: Number(newDiscount),
        active: true,
        usageCount: 0,
        validUntil: '2027-12-31',
      },
    ]);
    setShowAddForm(false);
    setNewCode('');
    showToast(`Promo coupon ${newCode} created successfully`);
  };

  const toggleActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D7C7] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
            Promotions & Discounts
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1F130E]">
            Coupon Engine Management
          </h1>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#4A2E1D]"
        >
          <Plus className="w-4 h-4 text-[#C59B27]" /> Create New Coupon
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCoupon} className="p-6 bg-white border border-[#E2D7C7] space-y-4 shadow-md max-w-lg">
          <h3 className="text-sm font-serif font-bold text-[#1F130E]">Create Discount Promo Code</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Coupon Code (e.g. EID2026)"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono uppercase"
            />
            <input
              type="number"
              required
              placeholder="Discount % (e.g. 20)"
              value={newDiscount}
              onChange={(e) => setNewDiscount(Number(e.target.value))}
              className="p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-200 text-xs font-serif text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase"
            >
              Save Coupon
            </button>
          </div>
        </form>
      )}

      {/* Coupons Table */}
      <div className="bg-white border border-[#E2D7C7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E2D7C7] font-mono text-[11px] text-[#4A2E1D] uppercase">
                <th className="p-3.5">Promo Code</th>
                <th className="p-3.5">Discount %</th>
                <th className="p-3.5 text-center">Times Used</th>
                <th className="p-3.5">Valid Expiry Date</th>
                <th className="p-3.5 text-center">Active Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D7C7]">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#1F130E]">{c.code}</td>
                  <td className="p-3.5 font-mono font-bold text-green-700">{c.discount}% OFF</td>
                  <td className="p-3.5 text-center font-mono text-[#4A2E1D]">{c.usageCount} orders</td>
                  <td className="p-3.5 font-mono text-[#4A2E1D]">{c.validUntil}</td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => toggleActive(c.id)}
                      className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase border ${
                        c.active
                          ? 'bg-green-50 text-green-800 border-green-200'
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}
                    >
                      {c.active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setCoupons((prev) => prev.filter((item) => item.id !== c.id))}
                      className="p-1.5 text-red-700 hover:bg-red-50"
                      title="Delete coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
