'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit2, Trash2, Eye, ExternalLink } from 'lucide-react';
import { productService } from '@/lib/services/productService';
import { Product } from '@/types';
import { formatPKR } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

export default function AdminProductsPage() {
  const { showToast } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const loadProducts = async () => {
    const list = await productService.getProducts();
    setProducts(list);
  };

  useEffect(() => {
    loadProducts();
    const handleUpdate = () => loadProducts();
    window.addEventListener('tatheer_products_updated', handleUpdate);
    return () => window.removeEventListener('tatheer_products_updated', handleUpdate);
  }, []);

  const filteredProducts = products.filter((p) => {
    if (filterCategory !== 'all' && p.categorySlug !== filterCategory) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the store?`)) {
      setIsDeleting(id);
      await productService.deleteProduct(id);
      showToast(`Product "${name}" deleted from store`);
      setIsDeleting(null);
      loadProducts();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Products & Catalog ({filteredProducts.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your Peshawari footwear collection, pricing, and active variants.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by footwear title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="all">All Categories</option>
            <option value="kaptan-collection">Kaptan Collection</option>
            <option value="zalmi-collection">Zalmi Collection</option>
            <option value="traditional-leather">Traditional Leather</option>
            <option value="premium-calfskin">Premium Calfskin</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Image</th>
                <th className="p-3.5">Product Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Base Price</th>
                <th className="p-3.5">Sale Price</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Sizes</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    No products found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="relative w-12 h-12 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                        <Image src={p.featuredImage} alt={p.name} fill className="object-contain p-1" />
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">/{p.slug}</div>
                    </td>
                    <td className="p-3.5 text-slate-600">{p.category}</td>
                    <td className="p-3.5 font-mono font-semibold text-slate-900">{formatPKR(p.price)}</td>
                    <td className="p-3.5 font-mono text-emerald-600 font-semibold">
                      {p.salePrice ? formatPKR(p.salePrice) : '-'}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active
                      </span>
                    </td>
                    <td className="p-3.5 text-center font-mono text-slate-600">
                      {p.sizes?.length || 8} Sizes
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-900 hover:text-white transition-colors text-slate-600"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-900 hover:text-white transition-colors text-slate-600"
                          title="View on Storefront"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          disabled={isDeleting === p.id}
                          className="p-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
