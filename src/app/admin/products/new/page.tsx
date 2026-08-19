'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, AlertCircle } from 'lucide-react';
import { productService } from '@/lib/services/productService';
import { dataEngine } from '@/lib/services/dataEngine';
import { useStore } from '@/context/StoreContext';

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useStore();
  const [categoriesList] = useState(dataEngine.getCategories());

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(categoriesList[0]?.name || 'Kaptan Collection');
  const [categorySlug, setCategorySlug] = useState(categoriesList[0]?.slug || 'kaptan-collection');
  const [price, setPrice] = useState('14500');
  const [salePrice, setSalePrice] = useState('12999');
  const [shortDescription, setShortDescription] = useState('Handcrafted in Peshawar using genuine full-grain leather.');
  const [description, setDescription] = useState('Master cobblers in Peshawar spend over 14 hours hand-cutting, shaping, and stitching each pair.');
  const [soleType, setSoleType] = useState('Double Tire Rubber Sole');
  const [leatherType, setLeatherType] = useState('Full-Grain Cowhide');
  const [featuredImage, setFeaturedImage] = useState('/images/kaptaan.png');
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Variant Rows State
  const [variants, setVariants] = useState([
    { size: 40, colorName: 'Dark Chocolate', colorHex: '#27170B', inStock: true },
    { size: 41, colorName: 'Dark Chocolate', colorHex: '#27170B', inStock: true },
    { size: 42, colorName: 'Dark Chocolate', colorHex: '#27170B', inStock: true },
    { size: 43, colorName: 'Dark Chocolate', colorHex: '#27170B', inStock: true },
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
        inStock: true,
      },
    ]);
  };

  const handleRemoveVariantRow = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Product name is required');
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    try {
      await productService.createProduct({
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        category,
        categorySlug,
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : undefined,
        rating: 5.0,
        reviewsCount: 1,
        isNew,
        isBestSeller,
        featuredImage,
        images: [featuredImage, '/images/hero.png'],
        colors: [
          { name: 'Dark Chocolate', hex: '#27170B' },
          { name: 'Camel Tan', hex: '#C18C5D' },
          { name: 'Onyx Black', hex: '#121212' },
        ],
        sizes: variants.map((v) => ({ size: v.size, inStock: v.inStock })),
        shortDescription,
        description,
        materials: ['100% Genuine Full-Grain Leather', 'Recycled Tire Rubber Sole'],
        craftingDetails: ['Handcrafted in Namak Mandi, Peshawar'],
        soleType,
        leatherType,
      });

      showToast(`Product "${name}" created successfully!`);
      router.push('/admin/products');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error creating product.');
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Create New Footwear
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Add a handcrafted masterwork to the live storefront catalog.
            </p>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Details Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              General Information
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Kaptan Signature Double Sole Chappal"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">URL Slug (Auto-generated)</label>
              <input
                type="text"
                required
                placeholder="kaptan-signature-double-sole"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Base Price (PKR) *</label>
                <input
                  type="number"
                  required
                  placeholder="14500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Discount Sale Price (PKR)</label>
                <input
                  type="number"
                  placeholder="12999"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Short Summary</label>
              <textarea
                rows={2}
                placeholder="Brief summary for shop cards..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Full Heritage Description</label>
              <textarea
                rows={4}
                placeholder="Detailed craft story and specifications..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Variants Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Shoe Size Variants</h3>
                <p className="text-xs text-slate-500">Configure size availability</p>
              </div>
              <button
                type="button"
                onClick={handleAddVariantRow}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Size
              </button>
            </div>

            <div className="space-y-2">
              {variants.map((v, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="w-24">
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Size (EU)</label>
                    <input
                      type="number"
                      value={v.size}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVariants((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, size: val } : item))
                        );
                      }}
                      className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono font-bold"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Color</label>
                    <input
                      type="text"
                      value={v.colorName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVariants((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, colorName: val } : item))
                        );
                      }}
                      className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>

                  <div className="pt-3">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={v.inStock}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setVariants((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, inStock: val } : item))
                          );
                        }}
                        className="w-4 h-4 accent-slate-900 rounded"
                      />
                      <span>In Stock</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveVariantRow(idx)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg mt-3 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Settings Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Catalog Options
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  const selected = categoriesList.find((c) => c.name === e.target.value);
                  setCategory(e.target.value);
                  if (selected) setCategorySlug(selected.slug);
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {categoriesList.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Image Asset</label>
              <select
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="/images/kaptaan.png">/images/kaptaan.png (Kaptaan)</option>
                <option value="/images/zalmi.png">/images/zalmi.png (Zalmi)</option>
                <option value="/images/norozi.png">/images/norozi.png (Norozi)</option>
                <option value="/images/hero.png">/images/hero.png (Royal Calfskin)</option>
                <option value="/images/craft.png">/images/craft.png (Namak Mandi)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Sole Type</label>
                <input
                  type="text"
                  value={soleType}
                  onChange={(e) => setSoleType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Leather Type</label>
                <input
                  type="text"
                  value={leatherType}
                  onChange={(e) => setLeatherType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="w-4 h-4 accent-slate-900 rounded"
                />
                <span>Featured New Arrival</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="w-4 h-4 accent-slate-900 rounded"
                />
                <span>Best Seller Badge</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Publishing...' : 'Save & Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
