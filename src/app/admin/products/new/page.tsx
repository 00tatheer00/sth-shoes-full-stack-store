'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, AlertCircle } from 'lucide-react';
import { productService } from '@/lib/services/productService';
import { useStore } from '@/context/StoreContext';

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Kaptan Collection');
  const [categorySlug, setCategorySlug] = useState('kaptan-collection');
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

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    if (val === 'Kaptan Collection') setCategorySlug('kaptan-collection');
    else if (val === 'Zalmi Collection') setCategorySlug('zalmi-collection');
    else if (val === 'Traditional Leather') setCategorySlug('traditional-leather');
    else setCategorySlug('premium-calfskin');
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
      <div className="flex items-center justify-between border-b border-[#EAE3D5] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-white border border-[#EAE3D5] rounded hover:bg-[#FAF6EF] text-[#1C1917]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
              Catalog Management
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1C1917]">Create New Product</h1>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Product Info Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#EAE3D5] rounded-lg p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2">
              Basic Product Details
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Kaptan Double Sole Dark Chocolate"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">URL Slug *</label>
              <input
                type="text"
                required
                placeholder="kaptan-double-sole-dark-chocolate"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Base Price (PKR) *</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Discount Price (Optional)</label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Short Description *</label>
              <textarea
                rows={2}
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Full Story & Details *</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif"
              />
            </div>
          </div>

          {/* Variants Management */}
          <div className="bg-white border border-[#EAE3D5] rounded-lg p-6 space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#EAE3D5] pb-2">
              <h3 className="text-base font-serif font-bold text-[#1C1917]">Product Variants & Stock</h3>
              <button
                type="button"
                onClick={handleAddVariantRow}
                className="btn-forest px-3 py-1.5 text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Size
              </button>
            </div>

            <div className="space-y-3">
              {variants.map((v, idx) => (
                <div key={idx} className="p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded grid grid-cols-1 sm:grid-cols-4 gap-3 items-center text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#0D3325] font-bold block">Size (EU):</span>
                    <input
                      type="number"
                      value={v.size}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setVariants((prev) => prev.map((item, i) => i === idx ? { ...item, size: val } : item));
                      }}
                      className="w-full p-1.5 bg-white border border-[#EAE3D5] rounded font-mono text-center font-bold"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#0D3325] font-bold block">Color Shade:</span>
                    <input
                      type="text"
                      value={v.colorName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVariants((prev) => prev.map((item, i) => i === idx ? { ...item, colorName: val } : item));
                      }}
                      className="w-full p-1.5 bg-white border border-[#EAE3D5] rounded"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#0D3325] font-bold block">Stock Status:</span>
                    <select
                      value={v.inStock ? 'true' : 'false'}
                      onChange={(e) => {
                        const inStock = e.target.value === 'true';
                        setVariants((prev) => prev.map((item, i) => i === idx ? { ...item, inStock } : item));
                      }}
                      className="w-full p-1.5 bg-white border border-[#EAE3D5] rounded font-semibold"
                    >
                      <option value="true">In Stock</option>
                      <option value="false">Out of Stock</option>
                    </select>
                  </div>
                  <div className="text-right pt-3 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => setVariants((prev) => prev.filter((_, i) => i !== idx))}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
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
          <div className="bg-white border border-[#EAE3D5] rounded-lg p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2">
              Catalog Options
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Category</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif"
              >
                <option value="Kaptan Collection">Kaptan Collection</option>
                <option value="Zalmi Collection">Zalmi Collection</option>
                <option value="Traditional Leather">Traditional Leather</option>
                <option value="Premium Calfskin">Premium Calfskin</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Product Image Asset</label>
              <select
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono"
              >
                <option value="/images/kaptaan.png">/images/kaptaan.png (Kaptaan)</option>
                <option value="/images/zalmi.png">/images/zalmi.png (Zalmi)</option>
                <option value="/images/norozi.png">/images/norozi.png (Norozi)</option>
                <option value="/images/hero.png">/images/hero.png (Royal Calfskin)</option>
                <option value="/images/craft.png">/images/craft.png (Namak Mandi)</option>
              </select>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#FAF6EF]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-serif text-[#1C1917]">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="w-4 h-4 accent-[#0D3325]"
                />
                <span>Featured New Arrival</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-serif text-[#1C1917]">
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="w-4 h-4 accent-[#0D3325]"
                />
                <span>Best Seller Badge</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="btn-amber w-full py-4 text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#0D3325]" /> {isSaving ? 'Publishing...' : 'Save & Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
