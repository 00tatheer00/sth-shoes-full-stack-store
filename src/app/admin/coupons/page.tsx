'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, XCircle, Percent, X } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Coupons & Promotions ({coupons.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure storefront discount codes, thresholds, and expiry dates.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create New Coupon
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCoupon} className="p-6 bg-white border border-slate-200 rounded-2xl space-y-5 shadow-sm max-w-xl">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Percent className="w-4 h-4 text-blue-600" /> Create Store Promo Code
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Coupon Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. EID2026 or SUMMER20"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono uppercase font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Discount % *</label>
              <input
                type="number"
                required
                min="1"
                max="90"
                placeholder="15"
                value={newDiscount}
                onChange={(e) => setNewDiscount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Min Order (PKR)</label>
              <input
                type="number"
                placeholder="0"
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Valid Until</label>
              <input
                type="date"
                required
                value={newExpiry}
                onChange={(e) => setNewExpiry(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              Save & Activate
            </button>
          </div>
        </form>
      )}

      {/* Coupons Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Promo Code</th>
                <th className="p-3.5">Discount</th>
                <th className="p-3.5">Min Order</th>
                <th className="p-3.5 text-center">Times Used</th>
                <th className="p-3.5">Valid Until</th>
                <th className="p-3.5 text-center">Active Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No coupons created yet. Click "Create New Coupon" to add one.
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900 text-sm">
                      <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md">
                        {c.code}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-emerald-600">{c.discount}% OFF</td>
                    <td className="p-3.5 font-mono text-slate-600">
                      {c.minOrder ? `Rs. ${c.minOrder.toLocaleString()}` : 'No Min'}
                    </td>
                    <td className="p-3.5 text-center font-mono font-semibold text-slate-900">
                      {c.usageCount || 0} orders
                    </td>
                    <td className="p-3.5 font-mono text-slate-500">{c.validUntil || 'Lifetime'}</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => toggleActive(c)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border cursor-pointer ${
                          c.active
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {c.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDelete(c.id, c.code)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
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
