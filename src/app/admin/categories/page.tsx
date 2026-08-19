'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FolderTree, Plus, Trash2, ExternalLink, Package } from 'lucide-react';
import { dataEngine } from '@/lib/services/dataEngine';
import { Category } from '@/types';
import { useStore } from '@/context/StoreContext';

export default function AdminCategoriesPage() {
  const { showToast } = useStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('/images/kaptaan.png');

  const loadCategories = () => {
    const list = dataEngine.getCategories();
    setCategories(list);
  };

  useEffect(() => {
    loadCategories();
    const handleUpdate = () => loadCategories();
    window.addEventListener('tatheer_categories_updated', handleUpdate);
    window.addEventListener('tatheer_products_updated', handleUpdate);
    return () => {
      window.removeEventListener('tatheer_categories_updated', handleUpdate);
      window.removeEventListener('tatheer_products_updated', handleUpdate);
    };
  }, []);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    dataEngine.createCategory({
      name: name.trim(),
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description: desc,
      image,
    });

    setShowForm(false);
    setName('');
    setSlug('');
    setDesc('');
    showToast(`Category "${name}" created and synced with live catalog`);
  };

  const handleDelete = (id: string, catName: string) => {
    if (window.confirm(`Delete category "${catName}"?`)) {
      dataEngine.deleteCategory(id);
      showToast(`Category "${catName}" removed`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D5] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0D3325] font-bold">
            Taxonomy & Navigation
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917]">
            Category Management ({categories.length})
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-forest px-4 py-2.5 text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E5A93C]" /> Add New Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddCategory} className="p-6 bg-white border border-[#EAE3D5] rounded-lg space-y-4 shadow-md max-w-xl">
          <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-2 flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#0D3325]" /> Create Collection Category
          </h3>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Category Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Executive Calfskin"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
              }}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">URL Slug *</label>
            <input
              type="text"
              required
              placeholder="executive-calfskin"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Banner Image</label>
            <select
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono"
            >
              <option value="/images/kaptaan.png">/images/kaptaan.png</option>
              <option value="/images/zalmi.png">/images/zalmi.png</option>
              <option value="/images/norozi.png">/images/norozi.png</option>
              <option value="/images/hero.png">/images/hero.png</option>
              <option value="/images/craft.png">/images/craft.png</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Description</label>
            <textarea
              rows={3}
              placeholder="Heritage description of this collection..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-[#EAE3D5]">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-[#FAF6EF] border border-[#EAE3D5] text-xs font-serif rounded text-[#1C1917]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-forest px-6 py-2 text-xs uppercase font-bold"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="p-5 bg-white border border-[#EAE3D5] rounded-lg flex gap-4 items-center shadow-xs">
            <div className="relative w-20 h-20 bg-[#FAF6EF] border border-[#EAE3D5] rounded overflow-hidden flex-shrink-0">
              <Image src={cat.image || '/images/hero.png'} alt={cat.name} fill className="object-contain p-1" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#0D3325] uppercase font-bold">
                  Slug: /{cat.slug}
                </span>
                <span className="px-2 py-0.5 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-[10px] font-mono font-bold text-[#1C1917] flex items-center gap-1">
                  <Package className="w-3 h-3 text-[#0D3325]" /> {cat.itemCount || 0} Products
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-[#1C1917]">{cat.name}</h3>
              <p className="text-xs text-[#5A6578] line-clamp-2">{cat.description}</p>
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/category/${cat.slug}`}
                  target="_blank"
                  className="text-xs text-[#0D3325] font-semibold hover:underline flex items-center gap-1"
                >
                  View Category Page <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 ml-auto cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
