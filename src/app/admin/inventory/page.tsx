'use client';

import React, { useState } from 'react';
import { Boxes, AlertTriangle, Plus, Minus, History, CheckCircle2 } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { adminService } from '@/lib/services/adminService';
import { useStore } from '@/context/StoreContext';

export default function AdminInventoryPage() {
  const { showToast } = useStore();
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);
  const [adjustQty, setAdjustQty] = useState<number>(5);
  const [reasonNote, setReasonNote] = useState('Peshawar Workshop Restock');

  // Flatten product variants for table
  const allVariants = MOCK_PRODUCTS.flatMap((p) =>
    p.sizes.map((s) => ({
      productId: p.id,
      productName: p.name,
      category: p.category,
      size: s.size,
      color: p.colors[0].name,
      sku: `TC-${p.slug.slice(0, 3).toUpperCase()}-EU${s.size}`,
      stock: s.inStock ? (s.size === 42 ? 18 : 10) : 0,
    }))
  );

  const handleStockAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVariant) return;

    await adminService.adjustVariantStock(selectedVariant.sku, adjustQty, reasonNote);
    showToast(`Stock updated for ${selectedVariant.sku} (${adjustQty > 0 ? '+' : ''}${adjustQty})`);
    setSelectedVariant(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D7C7] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
            Warehouse Audit
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1F130E]">
            Inventory & Stock Control
          </h1>
        </div>
      </div>

      {/* Stock Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-white border border-[#E2D7C7] space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs font-mono uppercase text-[#4A2E1D]">
            <span>Total SKUs Active</span>
            <Boxes className="w-4 h-4 text-[#B87546]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#1F130E]">{allVariants.length}</div>
        </div>

        <div className="p-5 bg-amber-50 border border-amber-200 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs font-mono uppercase text-amber-800">
            <span>Low Stock Variants (&lt; 5)</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-amber-900">2</div>
        </div>

        <div className="p-5 bg-red-50 border border-red-200 space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs font-mono uppercase text-red-800">
            <span>Out of Stock Variants</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-red-900">1</div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-[#E2D7C7] shadow-xs overflow-hidden">
        <div className="p-4 bg-[#FAF7F2] border-b border-[#E2D7C7] text-xs font-mono uppercase font-bold text-[#1F130E]">
          Variant Level Inventory Table
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#E2D7C7] font-mono text-[11px] text-[#4A2E1D] uppercase">
                <th className="p-3">SKU</th>
                <th className="p-3">Footwear Title</th>
                <th className="p-3">Size (EU)</th>
                <th className="p-3">Shade</th>
                <th className="p-3 text-center">Stock Count</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D7C7]">
              {allVariants.map((v, idx) => (
                <tr key={idx} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="p-3 font-mono font-bold text-[#1F130E]">{v.sku}</td>
                  <td className="p-3 font-bold text-[#1F130E]">{v.productName}</td>
                  <td className="p-3 font-mono text-[#4A2E1D]">EU {v.size}</td>
                  <td className="p-3 text-[#4A2E1D]">{v.color}</td>
                  <td className="p-3 text-center font-mono font-bold text-sm text-[#1F130E]">{v.stock}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                        v.stock > 5
                          ? 'bg-green-100 text-green-800'
                          : v.stock > 0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {v.stock > 5 ? 'In Stock' : v.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedVariant(v)}
                      className="px-3 py-1.5 bg-[#FAF7F2] border border-[#E2D7C7] hover:bg-[#1F130E] hover:text-[#C59B27] text-xs font-mono font-bold transition-colors"
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Stock Adjustment Modal */}
      {selectedVariant && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full border border-[#E2D7C7] p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-2">
              Controlled Stock Adjustment
            </h3>
            <p className="text-xs text-[#4A2E1D]">
              SKU: <strong className="font-mono text-[#1F130E]">{selectedVariant.sku}</strong> ({selectedVariant.productName})
            </p>

            <form onSubmit={handleStockAdjustment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Quantity Adjustment (+/-)</label>
                <input
                  type="number"
                  required
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Number(e.target.value))}
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Mandatory Audit Reason Note</label>
                <input
                  type="text"
                  required
                  value={reasonNote}
                  onChange={(e) => setReasonNote(e.target.value)}
                  placeholder="e.g. Namak Mandi workshop restock batch"
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedVariant(null)}
                  className="px-4 py-2 bg-gray-200 text-xs font-serif text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-wider hover:bg-[#4A2E1D]"
                >
                  Log Transaction & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
