'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Eye, Clock, Check } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatPKR, calculateDiscountPercentage } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  showCountdown?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showCountdown }) => {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore();
  const isSaved = isInWishlist(product.id);
  const discountPercent = calculateDiscountPercentage(product.price, product.salePrice);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const availableSize = product.sizes.find((s) => s.inStock)?.size ?? product.sizes[0].size;
    addToCart(product, product.colors[0], availableSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group bg-white border border-[#E2D7C7] hover:border-[#B87546] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-2xl relative">
      {/* Product Image Stage */}
      <div className="relative aspect-4/3 sm:aspect-square bg-[#FAF7F2] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.featuredImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 bg-[#5C1D24] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[#1F130E] text-[#C59B27] text-[10px] font-mono font-bold uppercase tracking-widest border border-[#C59B27]/40 shadow-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="px-2.5 py-1 bg-[#C59B27] text-[#1F130E] text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm">
              HOT DEAL
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-20 shadow-md ${
            isSaved
              ? 'bg-[#5C1D24] text-white scale-110'
              : 'bg-white/90 text-[#1F130E] hover:bg-[#1F130E] hover:text-[#C59B27]'
          }`}
          aria-label="Save to Wishlist"
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Optional Limited-Time Deal Countdown Bar */}
        {showCountdown && (
          <div className="absolute bottom-0 inset-x-0 bg-[#1F130E]/90 text-[#FAF7F2] py-1 px-2 text-[10px] font-mono text-center flex items-center justify-center gap-1 z-10 border-t border-[#C59B27]/40">
            <Clock className="w-3 h-3 text-[#C59B27]" />
            <span>OFFER ENDS IN: <strong>02D 14H 30M</strong></span>
          </div>
        )}

        {/* Quick Action Hover Bar */}
        {!showCountdown && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex gap-2 z-20">
            <button
              onClick={handleQuickAdd}
              className="flex-1 py-2.5 bg-[#1F130E] text-[#FAF7F2] hover:bg-[#4A2E1D] text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl transition-colors border border-[#3A2315]"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="p-2.5 bg-white text-[#1F130E] hover:bg-[#FAF7F2] shadow-xl flex items-center justify-center transition-colors border border-[#E2D7C7]"
              title="Quick View Details"
            >
              <Eye className="w-4 h-4 text-[#4A2E1D]" />
            </Link>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white border-t border-[#E2D7C7]/60 space-y-3">
        <div>
          {/* Category Subtitle */}
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#B87546] font-bold mb-1">
            {product.category}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#B87546] transition-colors">
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#1F130E] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#C59B27]">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-[#4A2E1D]/60">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & Colors */}
        <div className="pt-2 border-t border-[#FAF7F2] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-serif font-bold text-[#1F130E]">
              {formatPKR(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-[#1C1917]/40 line-through font-mono">
                {formatPKR(product.price)}
              </span>
            )}
          </div>

          {/* Color Swatch Dots */}
          <div className="flex items-center space-x-1">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-2xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
