'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit2, Trash2, Eye, Sparkles, Filter, CheckCircle2, XCircle } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { formatPKR } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredProducts = products.filter((p) => {
    if (filterCategory !== 'all' && p.categorySlug !== filterCategory) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBestSeller: !p.isBestSeller } : p))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D7C7] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
            Catalog Management
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1F130E]">
            Products & Variants ({filteredProducts.length})
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="px-5 py-3 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.15em] hover:bg-[#4A2E1D] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#C59B27]" /> Add New Footwear Product
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-[#E2D7C7] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
          <input
            type="text"
            placeholder="Filter by product title or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#FAF7F2] border border-[#E2D7C7] px-3 py-2 text-xs font-serif focus:outline-none focus:border-[#B87546]"
          >
            <option value="all">All Categories</option>
            <option value="kaptan-collection">Kaptan Collection</option>
            <option value="zalmi-collection">Zalmi Collection</option>
            <option value="norozi-heritage">Norozi Heritage</option>
            <option value="premium-calfskin">Premium Calfskin</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#E2D7C7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E2D7C7] font-mono text-[11px] text-[#4A2E1D] uppercase">
                <th className="p-3.5">Image</th>
                <th className="p-3.5">Product Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Sale Price</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Variants</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D7C7]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="p-3">
                    <div className="relative w-12 h-12 bg-[#FAF7F2] border border-[#E2D7C7]">
                      <Image src={p.featuredImage} alt={p.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-[#1F130E]">{p.name}</div>
                    <div className="text-[10px] text-[#4A2E1D]/60 font-mono">Slug: /{p.slug}</div>
                  </td>
                  <td className="p-3 font-mono text-[#4A2E1D]">{p.category}</td>
                  <td className="p-3 font-mono font-bold text-[#1F130E]">{formatPKR(p.price)}</td>
                  <td className="p-3 font-mono text-green-700 font-bold">
                    {p.salePrice ? formatPKR(p.salePrice) : '-'}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleActive(p.id)}
                      className="px-2.5 py-1 bg-green-50 text-green-800 text-[10px] font-mono font-bold border border-green-200"
                    >
                      Active
                    </button>
                  </td>
                  <td className="p-3 text-center font-mono text-[#4A2E1D]">
                    {p.sizes.length} Sizes (EU 39-46)
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="p-1.5 bg-[#FAF7F2] border border-[#E2D7C7] hover:bg-[#1F130E] hover:text-[#C59B27] transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="p-1.5 bg-[#FAF7F2] border border-[#E2D7C7] hover:bg-[#1F130E] hover:text-[#C59B27] transition-colors"
                        title="View on Storefront"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
