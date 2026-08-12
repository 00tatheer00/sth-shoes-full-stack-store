'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProductSchema, ProductVariantSchema } from '@/lib/validations';
import { useStore } from '@/context/StoreContext';

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('c1000000-0000-0000-0000-000000000001');
  const [price, setPrice] = useState('14500');
  const [salePrice, setSalePrice] = useState('12999');
  const [shortDescription, setShortDescription] = useState('Handcrafted in Peshawar using genuine full-grain leather.');
  const [description, setDescription] = useState('Master cobblers in Peshawar spend over 14 hours hand-cutting, shaping, and stitching each pair.');
  const [soleType, setSoleType] = useState('Double Tire Rubber Sole');
  const [leatherType, setLeatherType] = useState('Full-Grain Cowhide');
  const [featured, setFeatured] = useState(true);
  const [bestseller, setBestseller] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Variant Rows State
  const [variants, setVariants] = useState([
    { size: 40, colorName: 'Dark Chocolate', colorHex: '#27170B', sku: 'TC-KAP-DC-40', stock: 10 },
    { size: 41, colorName: 'Dark Chocolate', colorHex: '#27170B', sku: 'TC-KAP-DC-41', stock: 15 },
    { size: 42, colorName: 'Dark Chocolate', colorHex: '#27170B', sku: 'TC-KAP-DC-42', stock: 20 },
    { size: 43, colorName: 'Dark Chocolate', colorHex: '#27170B', sku: 'TC-KAP-DC-43', stock: 12 },
  ]);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleAddVariantRow = () => {
    const nextSize = 39 + variants.length;
    setVariants((prev) => [
      ...prev,
      {
        size: nextSize > 46 ? 42 : nextSize,
        colorName: 'Dark Chocolate',
        colorHex: '#27170B',
        sku: `TC-VAR-${Date.now().toString().slice(-4)}`,
        stock: 10,
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      ProductSchema.parse({
        name,
        slug,
        category_id: category,
        price: Number(price),
        discount_price: salePrice ? Number(salePrice) : null,
        short_description: shortDescription,
        description,
        sole_type: soleType,
        leather_type: leatherType,
        featured,
        bestseller,
        active: true,
      });

      showToast(`Product "${name}" created successfully`);
      router.push('/admin/products');
    } catch (err: any) {
      setErrorMsg(err.message || 'Validation error. Check form fields.');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
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
              Catalog Management
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1F130E]">Create New Product</h1>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Product Info Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#E2D7C7] p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-2">
              Basic Product Details
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Kaptan Double Sole Dark Chocolate"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif focus:outline-none focus:border-[#B87546]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">URL Slug *</label>
              <input
                type="text"
                required
                placeholder="kaptan-double-sole-dark-chocolate"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono focus:outline-none focus:border-[#B87546]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Base Price (PKR) *</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono focus:outline-none focus:border-[#B87546]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Discount Price (Optional)</label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono focus:outline-none focus:border-[#B87546]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Short Description *</label>
              <textarea
                rows={2}
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Full Story & Details *</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
              />
            </div>
          </div>

          {/* Variants Management */}
          <div className="bg-white border border-[#E2D7C7] p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#E2D7C7] pb-2">
              <h3 className="text-base font-serif font-bold text-[#1F130E]">Product Variants & Stock</h3>
              <button
                type="button"
                onClick={handleAddVariantRow}
                className="px-3 py-1.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Size Variant
              </button>
            </div>

            <div className="space-y-3">
              {variants.map((v, idx) => (
                <div key={idx} className="p-3 bg-[#FAF7F2] border border-[#E2D7C7] grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#4A2E1D]">Size (EU):</span>
                    <input
                      type="number"
                      value={v.size}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVariants((prev) => prev.map((item, i) => i === idx ? { ...item, size: val } : item));
                      }}
                      className="w-full p-1.5 bg-white border border-[#E2D7C7] font-mono text-center"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#4A2E1D]">Color Shade:</span>
                    <input
                      type="text"
                      value={v.colorName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVariants((prev) => prev.map((item, i) => i === idx ? { ...item, colorName: val } : item));
                      }}
                      className="w-full p-1.5 bg-white border border-[#E2D7C7]"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#4A2E1D]">SKU Code:</span>
                    <input
                      type="text"
                      value={v.sku}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVariants((prev) => prev.map((item, i) => i === idx ? { ...item, sku: val } : item));
                      }}
                      className="w-full p-1.5 bg-white border border-[#E2D7C7] font-mono"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#4A2E1D]">Stock Qty:</span>
                    <input
                      type="number"
                      value={v.stock}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVariants((prev) => prev.map((item, i) => i === idx ? { ...item, stock: val } : item));
                      }}
                      className="w-full p-1.5 bg-white border border-[#E2D7C7] font-mono font-bold"
                    />
                  </div>
                  <div className="text-right pt-3 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => setVariants((prev) => prev.filter((_, i) => i !== idx))}
                      className="p-1.5 text-red-700 hover:bg-red-50"
                      title="Remove variant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Settings Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E2D7C7] p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-2">
              Catalog Options
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
              >
                <option value="c1000000-0000-0000-0000-000000000001">Kaptan Collection</option>
                <option value="c2000000-0000-0000-0000-000000000002">Zalmi Collection</option>
                <option value="c3000000-0000-0000-0000-000000000003">Norozi Heritage</option>
                <option value="c4000000-0000-0000-0000-000000000004">Premium Calfskin</option>
              </select>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-serif text-[#1F130E]">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#4A2E1D]"
                />
                <span>Featured Hero Product</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-serif text-[#1F130E]">
                <input
                  type="checkbox"
                  checked={bestseller}
                  onChange={(e) => setBestseller(e.target.checked)}
                  className="w-4 h-4 accent-[#4A2E1D]"
                />
                <span>Best Seller Badge</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors flex items-center justify-center gap-2 shadow-xl"
          >
            <Save className="w-4 h-4 text-[#C59B27]" /> Save Product & Variants
          </button>
        </div>
      </form>
    </div>
  );
}
