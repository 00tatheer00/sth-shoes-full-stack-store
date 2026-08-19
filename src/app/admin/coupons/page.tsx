'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, XCircle, Sparkles, Percent } from 'lucide-react';
import { dataEngine } from '@/lib/services/dataEngine';
import { Coupon } from '@/types';
import { useStore } from '@/context/StoreContext';

export default function AdminCouponsPage() {
  const { showToast } = useStore();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(15);
  const [newMinOrder, setNewMinOrder] = useState('0');
  const [newExpiry, setNewExpiry] = useState('2027-12-31');
  const [showAddForm, setShowAddForm] = useState(false);

  const loadCoupons = () => {
    const list = dataEngine.getCoupons();
    setCoupons(list);
  };

  useEffect(() => {
    loadCoupons();
    const handleUpdate = () => loadCoupons();
    window.addEventListener('tatheer_coupons_updated', handleUpdate);
    return () => window.removeEventListener('tatheer_coupons_updated', handleUpdate);
  }, []);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    dataEngine.createCoupon({
      code: newCode.trim().toUpperCase(),
      discount: Number(newDiscount),
      minOrder: Number(newMinOrder) || undefined,
      active: true,
      validUntil: newExpiry,
    });

    setShowAddForm(false);
    setNewCode('');
    setNewDiscount(15);
    setNewMinOrder('0');
    showToast(`Promo coupon ${newCode.toUpperCase()} created & active on storefront!`);
  };

  const toggleActive = (coupon: Coupon) => {
    dataEngine.updateCoupon(coupon.id, { active: !coupon.active });
    showToast(`Coupon ${coupon.code} is now ${!coupon.active ? 'Active' : 'Disabled'}`);
  };

  const handleDelete = (id: string, code: string) => {
    if (window.confirm(`Delete coupon "${code}"?`)) {
      dataEngine.deleteCoupon(id);
      showToast(`Coupon ${code} deleted`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
            Promotions & Discounts
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917]">
            Coupon Engine Management ({coupons.length})
          </h1>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-forest px-4 py-2.5 text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E5A93C]" /> Create New Coupon
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCoupon} className="p-6 bg-white border border-[#EAE3D5] rounded-lg space-y-4 shadow-md max-w-xl">
          <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2 flex items-center gap-2">
            <Percent className="w-4 h-4 text-[#0D3325]" /> Create Storefront Promo Code
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Coupon Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. EID2026 or SUMMER20"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono uppercase font-bold focus:outline-none focus:border-[#0D3325]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Discount % *</label>
              <input
                type="number"
                required
                min="1"
                max="90"
                placeholder="15"
                value={newDiscount}
                onChange={(e) => setNewDiscount(Number(e.target.value))}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono font-bold focus:outline-none focus:border-[#0D3325]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Min Order (PKR)</label>
              <input
                type="number"
                placeholder="0"
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Valid Expiry Date</label>
              <input
                type="date"
                required
                value={newExpiry}
                onChange={(e) => setNewExpiry(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-[#EAE3D5]">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-[#FAF6EF] border border-[#EAE3D5] text-xs font-serif rounded text-[#1C1917]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-forest px-6 py-2 text-xs uppercase font-bold"
            >
              Save & Activate
            </button>
          </div>
        </form>
      )}

      {/* Coupons Table */}
      <div className="bg-white border border-[#EAE3D5] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-[#FAF6EF] border-b border-[#EAE3D5] font-mono text-[11px] text-[#0D3325] uppercase font-bold">
                <th className="p-3.5">Promo Code</th>
                <th className="p-3.5">Discount</th>
                <th className="p-3.5">Min Order</th>
                <th className="p-3.5 text-center">Times Used</th>
                <th className="p-3.5">Valid Until</th>
                <th className="p-3.5 text-center">Active Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D5]">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#5A6578]">
                    No coupons created yet. Click "Create New Coupon" to add one.
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF6EF]/60 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#1C1917] text-sm">
                      <span className="px-2 py-1 bg-[#FAF6EF] border border-[#EAE3D5] rounded">
                        {c.code}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-green-700">{c.discount}% OFF</td>
                    <td className="p-3.5 font-mono text-[#5A6578]">
                      {c.minOrder ? `Rs. ${c.minOrder.toLocaleString()}` : 'No Min'}
                    </td>
                    <td className="p-3.5 text-center font-mono text-[#1C1917] font-bold">
                      {c.usageCount || 0} orders
                    </td>
                    <td className="p-3.5 font-mono text-[#5A6578]">{c.validUntil || 'Lifetime'}</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => toggleActive(c)}
                        className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded border cursor-pointer ${
                          c.active
                            ? 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {c.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDelete(c.id, c.code)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                        title="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
