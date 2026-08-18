'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit2, Trash2, Eye, Sparkles } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
            Catalog Management
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917]">
            Products & Variants ({filteredProducts.length})
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-forest px-5 py-3 text-xs flex items-center gap-2 shadow-xs"
        >
          <Plus className="w-4 h-4 text-[#E5A93C]" /> Add New Footwear Product
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-[#EAE3D5] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
          <input
            type="text"
            placeholder="Filter by product title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#FAF6EF] border border-[#EAE3D5] rounded px-3 py-2 text-xs font-serif focus:outline-none focus:border-[#0D3325]"
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
      <div className="bg-white border border-[#EAE3D5] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-serif border-collapse">
            <thead>
              <tr className="bg-[#FAF6EF] border-b border-[#EAE3D5] font-mono text-[11px] text-[#0D3325] uppercase font-bold">
                <th className="p-3.5">Image</th>
                <th className="p-3.5">Product Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Sale Price</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Sizes</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D5]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#5A6578]">
                    No products found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF6EF]/60 transition-colors">
                    <td className="p-3">
                      <div className="relative w-12 h-12 bg-[#FAF6EF] rounded border border-[#EAE3D5] overflow-hidden">
                        <Image src={p.featuredImage} alt={p.name} fill className="object-contain p-1" />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-[#1C1917]">{p.name}</div>
                      <div className="text-[10px] text-[#5A6578] font-mono">Slug: /{p.slug}</div>
                    </td>
                    <td className="p-3 font-mono text-[#5A6578]">{p.category}</td>
                    <td className="p-3 font-mono font-bold text-[#1C1917]">{formatPKR(p.price)}</td>
                    <td className="p-3 font-mono text-green-700 font-bold">
                      {p.salePrice ? formatPKR(p.salePrice) : '-'}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2.5 py-1 bg-green-50 text-green-800 text-[10px] font-mono font-bold border border-green-200 rounded">
                        Active
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono text-[#5A6578]">
                      {p.sizes?.length || 8} Sizes
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded hover:bg-[#0D3325] hover:text-white transition-colors"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          className="p-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded hover:bg-[#0D3325] hover:text-white transition-colors"
                          title="View on Storefront"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          disabled={isDeleting === p.id}
                          className="p-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
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
