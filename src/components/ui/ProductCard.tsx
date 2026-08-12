'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatPKR, calculateDiscountPercentage } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const isSaved = isInWishlist(product.id);
  const discountPercent = calculateDiscountPercentage(product.price, product.salePrice);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to first available size and color
    const availableSize = product.sizes.find((s) => s.inStock)?.size ?? product.sizes[0].size;
    addToCart(product, product.colors[0], availableSize, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group bg-white border border-[#E2D7C7] hover:border-[#B87546] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl">
      {/* Product Image Container */}
      <div className="relative aspect-square bg-[#FAF7F2] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.featuredImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover img-zoom group-hover:scale-105 transition-transform duration-700"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-0.5 bg-[#1F130E] text-[#C59B27] text-[10px] font-mono uppercase tracking-widest font-bold">
              New Arrival
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 bg-[#5C1D24] text-[#FAF7F2] text-[10px] font-mono uppercase tracking-widest font-bold">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
            isSaved
              ? 'bg-[#5C1D24] text-white shadow-md'
              : 'bg-white/85 text-[#1F130E] hover:bg-[#1F130E] hover:text-[#C59B27]'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Action Overlay Button Bar */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 bg-[#1F130E] text-[#FAF7F2] hover:bg-[#4A2E1D] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C59B27]" />
            Quick Add
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="p-2.5 bg-white text-[#1F130E] hover:bg-[#FAF7F2] shadow-lg flex items-center justify-center transition-colors border border-[#E2D7C7]"
            title="View Details"
          >
            <Eye className="w-4 h-4 text-[#4A2E1D]" />
          </Link>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white border-t border-[#E2D7C7]/50">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#4A2E1D]/70 mb-1">
            <span className="font-mono uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 text-[#C59B27] font-medium">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
              <span className="text-[#4A2E1D]/50">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#B87546] transition-colors">
            <h3 className="text-sm font-serif font-semibold text-[#1F130E] line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-[#FAF7F2] flex items-center justify-between">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-serif font-bold text-[#1F130E]">
              {formatPKR(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-[#1C1917]/40 line-through font-mono">
                {formatPKR(product.price)}
              </span>
            )}
          </div>

          {/* Color Swatches preview */}
          <div className="flex items-center space-x-1">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-3 h-3 rounded-full border border-gray-300 shadow-2xs"
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
