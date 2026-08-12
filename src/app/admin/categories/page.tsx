'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FolderTree, Plus, Edit2, Trash2 } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/data/mockData';
import { useStore } from '@/context/StoreContext';

export default function AdminCategoriesPage() {
  const { showToast } = useStore();
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [desc, setDesc] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setCategories((prev) => [
      ...prev,
      {
        id: `cat-${Date.now()}`,
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        description: desc,
        image: '/images/hero.png',
        itemCount: 0,
      },
    ]);
    setShowForm(false);
    setName('');
    setDesc('');
    showToast(`Category "${name}" created`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D7C7] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
            Taxonomy & Navigation
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1F130E]">
            Category Management ({categories.length})
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#4A2E1D]"
        >
          <Plus className="w-4 h-4 text-[#C59B27]" /> Add New Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddCategory} className="p-6 bg-white border border-[#E2D7C7] space-y-4 shadow-md max-w-lg">
          <h3 className="text-sm font-serif font-bold text-[#1F130E]">Create Collection Category</h3>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Category Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Executive Calfskin"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">URL Slug *</label>
            <input
              type="text"
              required
              placeholder="executive-calfskin"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold">Description</label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-3 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-serif"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 text-xs font-serif text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="p-5 bg-white border border-[#E2D7C7] flex gap-4 items-center shadow-xs">
            <div className="relative w-20 h-20 bg-[#FAF7F2] border border-[#E2D7C7] flex-shrink-0">
              <Image src={cat.image} alt={cat.name} fill className="object-cover" />
            </div>
            <div className="flex-1 space-y-1">
              <span className="text-[10px] font-mono text-[#B87546] uppercase font-bold">
                Slug: /{cat.slug}
              </span>
              <h3 className="text-base font-serif font-bold text-[#1F130E]">{cat.name}</h3>
              <p className="text-xs text-[#4A2E1D]/70 line-clamp-2">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
