'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { useStore } from '@/context/StoreContext';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/data/mockData';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const { products: storeProducts } = useStore();

  const allProducts = storeProducts && storeProducts.length > 0 ? storeProducts : MOCK_PRODUCTS;

  const category = MOCK_CATEGORIES.find((c) => c.slug === categorySlug) || {
    name: 'Peshawari Collection',
    slug: categorySlug,
    description: 'Explore authentic handcrafted Peshawari Chappal models.',
    image: '/images/hero.png',
    itemCount: 0,
  };

  const categoryProducts = allProducts.filter(
    (p) => p.categorySlug === categorySlug || categorySlug === 'all'
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Category Hero Banner */}
      <div className="bg-slate-900 text-white py-16 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline uppercase tracking-wider font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Shop
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-xs rounded-full uppercase tracking-wider mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peshawar Atelier Collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs uppercase text-slate-500 font-semibold tracking-wider">
          <span>Showing {categoryProducts.length} Artisanal Models</span>
          <Link href="/shop" className="text-blue-600 hover:underline font-semibold">
            View Other Collections
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900">
              No styles currently available in this category
            </h3>
            <p className="text-xs text-slate-500">
              Browse our full catalog for active Peshawari Chappal stock.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
