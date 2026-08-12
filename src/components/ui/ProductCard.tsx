'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Eye, Clock, Check } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatPKR, calculateDiscountPercentage } from '@/lib/utils';
import { triggerConfetti } from '@/lib/confetti';

interface ProductCardProps {
  product: Product;
  showCountdown?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showCountdown }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const isSaved = isInWishlist(product.id);
  const discountPercent = calculateDiscountPercentage(product.price, product.salePrice);
  const [added, setAdded] = useState(false);

  // Dynamic Color Swatch Preview State
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const availableSize = product.sizes.find((s) => s.inStock)?.size ?? product.sizes[0].size;
    addToCart(product, selectedColor, availableSize, 1);
    setAdded(true);
    triggerConfetti();
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleColorHover = (colorIdx: number) => {
    setSelectedColor(product.colors[colorIdx]);
    if (product.images[colorIdx]) {
      setCurrentImageIndex(colorIdx);
    }
  };

  return (
    <div className="group bg-white border border-slate-200 hover:border-[#0F172A] minimal-card flex flex-col justify-between overflow-hidden relative rounded-none shadow-2xs">
      {/* Product Image Stage */}
      <div className="relative aspect-square bg-[#F8FAFC] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[currentImageIndex] || product.featuredImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="badge-sale-minimal">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="badge-minimal">
              NEW ARRIVAL
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="badge-gold-minimal">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-20 shadow-xs ${
            isSaved
              ? 'bg-[#E11D48] text-white scale-105'
              : 'bg-white/90 text-[#0F172A] hover:bg-[#0F172A] hover:text-white'
          }`}
          aria-label="Save to Wishlist"
          title="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Action Hover Bar */}
        {!showCountdown && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex gap-2 z-20">
            <button
              onClick={handleQuickAdd}
              className="flex-1 py-2.5 bg-[#0F172A] text-white hover:bg-[#C5A059] text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="p-2.5 bg-white text-[#0F172A] hover:bg-slate-100 shadow-md flex items-center justify-center transition-colors border border-slate-200"
              title="Quick View Details"
            >
              <Eye className="w-3.5 h-3.5 text-[#0F172A]" />
            </Link>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white border-t border-slate-100 space-y-3">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-1 flex justify-between items-center">
            <span>{product.category}</span>
            <span className="text-[9px] font-mono text-slate-400">EU 39-46</span>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#C5A059] transition-colors">
            <h3 className="text-sm font-serif font-bold text-[#0F172A] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#C5A059]">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono font-bold text-[#0F172A]">{product.rating}</span>
            <span className="text-[11px] font-mono text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & Interactive Color Swatches */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-serif font-bold text-[#0F172A]">
              {formatPKR(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                {formatPKR(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onMouseEnter={() => handleColorHover(idx)}
                onClick={() => handleColorHover(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'border-[#0F172A] scale-125 ring-2 ring-slate-300'
                    : 'border-slate-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={`${color.name} - Hover to preview`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
