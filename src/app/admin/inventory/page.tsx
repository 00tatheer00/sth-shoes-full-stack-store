'use client';

import React, { useState, useEffect } from 'react';
import { Boxes, AlertTriangle, Plus, Minus, Search, CheckCircle2 } from 'lucide-react';
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
  const [reasonNote, setReasonNote] = useState('Peshawar Workshop Restock');

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
            Warehouse Audit
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917]">
            Inventory & Stock Control ({variants.length} SKUs)
          </h1>
        </div>
      </div>

      {/* Stock Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-white border border-[#EAE3D5] rounded-lg space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs font-mono uppercase text-[#0D3325] font-bold">
            <span>Total SKUs Active</span>
            <Boxes className="w-4 h-4 text-[#0D3325]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#1C1917]">{variants.length}</div>
        </div>

        <div className="p-5 bg-amber-50 border border-amber-200 rounded-lg space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs font-mono uppercase text-amber-800 font-bold">
            <span>Low Stock Variants (&le; 5)</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-amber-900">{lowStockCount}</div>
        </div>

        <div className="p-5 bg-red-50 border border-red-200 rounded-lg space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs font-mono uppercase text-red-800 font-bold">
            <span>Out of Stock Variants</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-red-900">{outOfStockCount}</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#EAE3D5] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
          <input
            type="text"
            placeholder="Search SKU or Footwear Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="bg-[#FAF6EF] border border-[#EAE3D5] rounded px-3 py-2 text-xs font-serif focus:outline-none focus:border-[#0D3325]"
          >
            <option value="all">All Inventory SKUs</option>
            <option value="in">In Stock Only</option>
            <option value="low">Low Stock (&le; 5)</option>
            <option value="out">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-[#EAE3D5] rounded-lg shadow-xs overflow-hidden">
        <div className="p-4 bg-[#FAF6EF] border-b border-[#EAE3D5] text-xs font-mono uppercase font-bold text-[#0D3325]">
          Variant Level Inventory Table ({filteredVariants.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#EAE3D5] font-mono text-[11px] text-[#0D3325] uppercase font-bold">
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Footwear Title</th>
                <th className="p-3.5">Size (EU)</th>
                <th className="p-3.5">Shade</th>
                <th className="p-3.5 text-center">Stock Units</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D5]">
              {filteredVariants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#5A6578]">
                    No variants match current filter.
                  </td>
                </tr>
              ) : (
                filteredVariants.map((v, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF6EF]/60 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-[#1C1917]">{v.sku}</td>
                    <td className="p-3.5 font-bold text-[#1C1917]">{v.productName}</td>
                    <td className="p-3.5 font-mono text-[#5A6578]">EU {v.size}</td>
                    <td className="p-3.5 text-[#5A6578]">{v.color}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-sm text-[#1C1917]">
                      {v.stockCount}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${
                          v.stockCount > 5
                            ? 'bg-green-50 text-green-800 border-green-200'
                            : v.stockCount > 0
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                        }`}
                      >
                        {v.stockCount > 5 ? 'In Stock' : v.stockCount > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedVariant(v)}
                        className="px-3 py-1.5 bg-[#FAF6EF] border border-[#EAE3D5] rounded hover:bg-[#0D3325] hover:text-white text-xs font-mono font-bold transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full border border-[#EAE3D5] rounded-xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2">
              Controlled Stock Adjustment
            </h3>
            <p className="text-xs text-[#5A6578]">
              SKU: <strong className="font-mono text-[#1C1917]">{selectedVariant.sku}</strong> ({selectedVariant.productName}, EU {selectedVariant.size})
            </p>
            <div className="text-xs font-mono bg-[#FAF6EF] p-2.5 rounded border border-[#EAE3D5]">
              Current Available Units: <strong>{selectedVariant.stockCount}</strong>
            </div>

            <form onSubmit={handleStockAdjustment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Quantity Adjustment (+/-)</label>
                <input
                  type="number"
                  required
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Number(e.target.value))}
                  className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono font-bold focus:outline-none focus:border-[#0D3325]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Audit Reason Note</label>
                <input
                  type="text"
                  required
                  value={reasonNote}
                  onChange={(e) => setReasonNote(e.target.value)}
                  placeholder="e.g. Namak Mandi workshop restock batch"
                  className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#EAE3D5]">
                <button
                  type="button"
                  onClick={() => setSelectedVariant(null)}
                  className="px-4 py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif text-[#1C1917]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-forest px-6 py-2 text-xs uppercase font-bold"
                >
                  Log & Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
