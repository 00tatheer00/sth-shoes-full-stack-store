'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/data/mockData';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;

  const category = MOCK_CATEGORIES.find((c) => c.slug === categorySlug) || {
    name: 'Peshawari Collection',
    slug: categorySlug,
    description: 'Explore authentic handcrafted Peshawari Chappal models.',
    image: '/images/hero.png',
    itemCount: 0,
  };

  const categoryProducts = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug || categorySlug === 'all'
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Category Hero Banner */}
      <div className="relative bg-[#1F130E] text-[#FAF7F2] py-16 md:py-24 border-b border-[#3A2315] overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover opacity-20"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C59B27] hover:underline uppercase tracking-wider mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Shop
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3A2315] border border-[#C59B27]/40 text-[#C59B27] text-xs font-mono uppercase tracking-widest mx-auto block w-max">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peshawar Atelier Collection</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#FAF7F2]">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#E2D7C7]/80 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
        <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-3 text-xs font-mono uppercase text-[#4A2E1D]">
          <span>Showing {categoryProducts.length} Artisanal Models</span>
          <Link href="/shop" className="text-[#B87546] hover:underline">
            View Other Collections
          </Link>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E2D7C7] space-y-4">
            <h3 className="text-lg font-serif text-[#1F130E]">
              No styles currently available in this category
            </h3>
            <p className="text-xs text-[#4A2E1D]/70">
              Browse our full catalog for active Peshawari Chappal stock.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider hover:bg-[#1F130E]"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
