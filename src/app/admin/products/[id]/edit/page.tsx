'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { productService } from '@/lib/services/productService';
import { dataEngine } from '@/lib/services/dataEngine';
import { useStore } from '@/context/StoreContext';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [soleType, setSoleType] = useState('Double Tire Rubber Sole');
  const [leatherType, setLeatherType] = useState('Full-Grain Cowhide');
  const [featuredImage, setFeaturedImage] = useState('/images/hero.png');
  const [isNew, setIsNew] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const p = dataEngine.getProductById(id);
    if (p) {
      setName(p.name);
      setSlug(p.slug);
      setCategory(p.category);
      setCategorySlug(p.categorySlug);
      setPrice(p.price.toString());
      setSalePrice(p.salePrice ? p.salePrice.toString() : '');
      setShortDescription(p.shortDescription || '');
      setDescription(p.description || '');
      setSoleType(p.soleType || 'Double Tire Rubber Sole');
      setLeatherType(p.leatherType || 'Full-Grain Cowhide');
      setFeaturedImage(p.featuredImage);
      setIsNew(!!p.isNew);
      setIsBestSeller(!!p.isBestSeller);
    }
    setIsLoading(false);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Product title is required');
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    try {
      await productService.updateProduct(id, {
        name,
        slug,
        category,
        categorySlug,
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : undefined,
        shortDescription,
        description,
        soleType,
        leatherType,
        featuredImage,
        isNew,
        isBestSeller,
      });

      showToast(`Product "${name}" updated successfully`);
      router.push('/admin/products');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update product');
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-[#5A6578]">Loading product data...</div>
    );
  }

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
              Catalog Editor
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1C1917]">Edit {name}</h1>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-[#EAE3D5] rounded-lg p-8 space-y-6 max-w-4xl shadow-xs">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Product Title *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
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
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Discount Sale Price (PKR)</label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Category</label>
            <select
              value={category}
              onChange={(e) => {
                const cats = dataEngine.getCategories();
                const match = cats.find((c) => c.name === e.target.value);
                setCategory(e.target.value);
                if (match) setCategorySlug(match.slug);
              }}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif"
            >
              {dataEngine.getCategories().map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Sole Type</label>
            <input
              type="text"
              value={soleType}
              onChange={(e) => setSoleType(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Leather Type</label>
            <input
              type="text"
              value={leatherType}
              onChange={(e) => setLeatherType(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Short Description</label>
          <textarea
            rows={2}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Full Story & Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif"
          />
        </div>

        <div className="flex items-center gap-6 pt-2 border-t border-[#FAF6EF]">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1917]">
            <input
              type="checkbox"
              checked={isNew}
              onChange={(e) => setIsNew(e.target.checked)}
              className="w-4 h-4 accent-[#0D3325]"
            />
            <span>New Arrival Badge</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1C1917]">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              className="w-4 h-4 accent-[#0D3325]"
            />
            <span>Best Seller Badge</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="btn-amber px-8 py-3.5 text-xs flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4 text-[#0D3325]" /> {isSaving ? 'Updating...' : 'Save & Publish Changes'}
        </button>
      </form>
    </div>
  );
}
