'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatPKR, calculateDiscountPercentage } from '@/lib/utils';
import { triggerConfetti } from '@/lib/confetti';

interface ProductCardProps {
  product: Product;
  showCountdown?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const isSaved = isInWishlist(product.id);
  const discountPercent = calculateDiscountPercentage(product.price, product.salePrice);

  // Dynamic Color Swatch Preview State
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const availableSize = product.sizes.find((s) => s.inStock)?.size ?? product.sizes[0].size;
    addToCart(product, selectedColor, availableSize, 1);
    triggerConfetti();
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
    <div className="product-card-ref flex flex-col justify-between overflow-hidden relative group bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-slate-300 transition-all font-sans">
      {/* Product Image Stage */}
      <div className="relative aspect-square bg-slate-50 p-4 flex items-center justify-center overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={product.images[currentImageIndex] || product.featuredImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-bold rounded-md shadow-xs">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-md shadow-xs">
              BEST SELLER
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md shadow-xs">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center transition-colors z-20 shadow-xs cursor-pointer ${
            isSaved ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Color Swatch Dots */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 z-10 bg-white/90 backdrop-blur-xs p-1 rounded-full border border-slate-200">
          {product.colors.map((color, idx) => (
            <button
              key={color.name}
              onMouseEnter={() => handleColorHover(idx)}
              onClick={() => handleColorHover(idx)}
              className={`w-2.5 h-2.5 rounded-full border transition-all ${
                selectedColor.name === color.name
                  ? 'border-slate-900 scale-125'
                  : 'border-transparent opacity-80'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white space-y-2">
        <div>
          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-blue-600 transition-colors">
            <h3 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating with Count */}
          <div className="flex items-center gap-1 mt-1 text-xs">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-slate-900 text-[11px]">{product.rating}</span>
            <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Cart Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-sm font-bold text-slate-900">
              {formatPKR(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatPKR(product.price)}
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
