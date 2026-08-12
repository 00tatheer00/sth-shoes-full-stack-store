'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { useStore } from '@/context/StoreContext';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { showToast } = useStore();

  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];

  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [price, setPrice] = useState(product.price.toString());
  const [salePrice, setSalePrice] = useState(product.salePrice ? product.salePrice.toString() : '');
  const [shortDescription, setShortDescription] = useState(product.shortDescription);
  const [description, setDescription] = useState(product.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Updated ${name} successfully`);
    router.push('/admin/products');
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-white border border-[#E2D7C7] hover:bg-[#FAF7F2] text-[#1F130E]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
              Product Editor
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1F130E]">Edit {product.name}</h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#E2D7C7] p-8 space-y-6 max-w-4xl shadow-xs">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Product Title</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Base Price (PKR)</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Discount Price (PKR)</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
          />
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif uppercase tracking-widest font-bold hover:bg-[#4A2E1D]"
        >
          <Save className="w-4 h-4 text-[#C59B27] inline mr-2" /> Save Changes
        </button>
      </form>
    </div>
  );
}
