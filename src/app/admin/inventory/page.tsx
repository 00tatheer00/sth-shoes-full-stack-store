'use client';

import React, { useState, useEffect } from 'react';
import { Boxes, AlertTriangle, Plus, Minus, Search, CheckCircle2, X } from 'lucide-react';
import { adminService } from '@/lib/services/adminService';
import { dataEngine } from '@/lib/services/dataEngine';
import { InventoryVariant } from '@/types';
import { useStore } from '@/context/StoreContext';

export default function AdminInventoryPage() {
  const { showToast } = useStore();
  const [variants, setVariants] = useState<InventoryVariant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStock, setFilterStock] = useState('all');
  const [selectedVariant, setSelectedVariant] = useState<InventoryVariant | null>(null);
  const [adjustQty, setAdjustQty] = useState<number>(5);
  const [reasonNote, setReasonNote] = useState('Namak Mandi Workshop Restock');

  const loadVariants = () => {
    const list = dataEngine.getAllInventoryVariants();
    setVariants(list);
  };

  useEffect(() => {
    loadVariants();
    const handleUpdate = () => loadVariants();
    window.addEventListener('tatheer_products_updated', handleUpdate);
    window.addEventListener('tatheer_orders_updated', handleUpdate);
    return () => {
      window.removeEventListener('tatheer_products_updated', handleUpdate);
      window.removeEventListener('tatheer_orders_updated', handleUpdate);
    };
  }, []);

  const filteredVariants = variants.filter((v) => {
    if (filterStock === 'low' && (v.stockCount > 5 || v.stockCount === 0)) return false;
    if (filterStock === 'out' && v.stockCount > 0) return false;
    if (filterStock === 'in' && v.stockCount === 0) return false;
    if (
      searchQuery &&
      !v.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !v.sku.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const lowStockCount = variants.filter((v) => v.stockCount > 0 && v.stockCount <= 5).length;
  const outOfStockCount = variants.filter((v) => v.stockCount === 0).length;

  const handleStockAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVariant) return;

    await adminService.adjustVariantStock(
      selectedVariant.productId,
      adjustQty,
      reasonNote,
      selectedVariant.size
    );

    showToast(`Stock updated for ${selectedVariant.sku} (${adjustQty > 0 ? '+' : ''}${adjustQty})`);
    setSelectedVariant(null);
    loadVariants();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Inventory & Stock Control ({variants.length} SKUs)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit footwear variant stock levels, restock alerts, and SKU availability.
          </p>
        </div>
      </div>

      {/* Stock Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Total SKUs Active</span>
            <Boxes className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{variants.length}</div>
        </div>

        <div className="p-5 bg-white border border-amber-200 rounded-xl space-y-2 shadow-2xs">
          <div className="flex justify-between items-center text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <span>Low Stock Variants (&le; 5)</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-700">{lowStockCount}</div>
        </div>

        <div className="p-5 bg-white border border-rose-200 rounded-xl space-y-2 shadow-2xs">
          <div className="flex justify-between items-center text-xs font-semibold text-rose-700 uppercase tracking-wider">
            <span>Out of Stock Variants</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-700">{outOfStockCount}</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKU or Footwear Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="all">All Inventory SKUs</option>
            <option value="in">In Stock Only</option>
            <option value="low">Low Stock (&le; 5)</option>
            <option value="out">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Footwear Title</th>
                <th className="p-3.5">Size (EU)</th>
                <th className="p-3.5">Color</th>
                <th className="p-3.5 text-center">Available Stock</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVariants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No variants match current filter.
                  </td>
                </tr>
              ) : (
                filteredVariants.map((v, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-semibold text-slate-900">{v.sku}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{v.productName}</td>
                    <td className="p-3.5 font-mono text-slate-600">EU {v.size}</td>
                    <td className="p-3.5 text-slate-600">{v.color}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-sm text-slate-900">
                      {v.stockCount}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          v.stockCount > 5
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : v.stockCount > 0
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {v.stockCount > 5 ? 'In Stock' : v.stockCount > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedVariant(v)}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Stock Adjustment Modal */}
      {selectedVariant && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Adjust SKU Stock
              </h3>
              <button
                onClick={() => setSelectedVariant(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              SKU: <strong className="font-mono text-slate-900">{selectedVariant.sku}</strong> ({selectedVariant.productName}, EU {selectedVariant.size})
            </p>
            <div className="text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700">
              Current Available Units: <strong className="text-slate-900 font-bold">{selectedVariant.stockCount}</strong>
            </div>

            <form onSubmit={handleStockAdjustment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Quantity Adjustment (+/-)</label>
                <input
                  type="number"
                  required
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Audit Reason Note</label>
                <input
                  type="text"
                  required
                  value={reasonNote}
                  onChange={(e) => setReasonNote(e.target.value)}
                  placeholder="e.g. Workshop restock batch"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedVariant(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  Save Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
