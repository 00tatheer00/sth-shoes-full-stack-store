'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ui/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#1F130E] text-[#FAF7F2] py-12 md:py-16 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] flex items-center justify-center gap-1.5">
            <Heart className="w-4 h-4 fill-current" /> Saved Favorites
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Your Wishlist</h1>
          <p className="text-xs sm:text-sm text-[#E2D7C7]/80">
            Keep track of your favorite Peshawari Chappal styles for future purchase.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {wishlist.length === 0 ? (
          <div className="max-w-lg mx-auto bg-white border border-[#E2D7C7] p-12 text-center space-y-6 shadow-xs my-12">
            <div className="w-20 h-20 rounded-full bg-[#EAE3D2] text-[#5C1D24] flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-[#1F130E]">Your Wishlist is Empty</h2>
              <p className="text-xs text-[#4A2E1D]/70 leading-relaxed font-sans">
                Browse our collections and tap the heart icon on any Peshawari Chappal to save it here.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#1F130E] transition-colors shadow-md"
            >
              Explore Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-3 text-xs font-mono uppercase text-[#4A2E1D]">
              <span>Saved Items ({wishlist.length})</span>
              <Link href="/shop" className="text-[#B87546] hover:underline">
                Continue Shopping
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
