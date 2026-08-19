'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FolderTree, Plus, Trash2, ExternalLink, Package, X } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Categories & Collections ({categories.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organize footwear collections, navigation taxonomy, and catalog tags.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddCategory} className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm max-w-xl">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-blue-600" /> Create Footwear Category
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Category Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Executive Calfskin"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
              }}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">URL Slug *</label>
            <input
              type="text"
              required
              placeholder="executive-calfskin"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Cover Image</label>
            <select
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-800"
            >
              <option value="/images/kaptaan.png">/images/kaptaan.png</option>
              <option value="/images/zalmi.png">/images/zalmi.png</option>
              <option value="/images/norozi.png">/images/norozi.png</option>
              <option value="/images/hero.png">/images/hero.png</option>
              <option value="/images/craft.png">/images/craft.png</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Description</label>
            <textarea
              rows={3}
              placeholder="Heritage description of this collection..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat) => (
          <div key={cat.id} className="p-5 bg-white border border-slate-200 rounded-xl flex gap-4 items-center shadow-2xs hover:border-slate-300 transition-colors">
            <div className="relative w-20 h-20 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={cat.image || '/images/hero.png'} alt={cat.name} fill className="object-contain p-1" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  /{cat.slug}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
                  <Package className="w-3 h-3 text-slate-500" /> {cat.itemCount || 0} Products
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{cat.description}</p>
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/category/${cat.slug}`}
                  target="_blank"
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View on Store</span> <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 ml-auto cursor-pointer"
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
