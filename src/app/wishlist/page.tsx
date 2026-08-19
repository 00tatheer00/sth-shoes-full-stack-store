'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ui/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center justify-center gap-1.5">
            <Heart className="w-4 h-4 fill-current" /> Saved Favorites
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Your Wishlist</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Keep track of your favorite Peshawari Chappal styles for future purchase.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {wishlist.length === 0 ? (
          <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-6 shadow-2xs my-12">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <Heart className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Your Wishlist is Empty</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Browse our collections and tap the heart icon on any Peshawari Chappal to save it here.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              Explore Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs uppercase text-slate-500 font-semibold tracking-wider">
              <span>Saved Items ({wishlist.length})</span>
              <Link href="/shop" className="text-blue-600 hover:underline font-semibold">
                Continue Shopping
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
