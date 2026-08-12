'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Eye, Clock, Check, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatPKR, calculateDiscountPercentage } from '@/lib/utils';

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
    <div className="group bg-white border border-[#E6D8C3] hover:border-[#D4AF37] card-hover-effect flex flex-col justify-between overflow-hidden relative rounded-none">
      {/* Product Image Stage */}
      <div className="relative aspect-square bg-[#FAF6F0] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[currentImageIndex] || product.featuredImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 bg-[#C84B31] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[#120A07] text-[#F3C649] text-[10px] font-mono font-bold uppercase tracking-widest border border-[#D4AF37]/50 shadow-md">
              NEW ARRIVAL
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="px-2.5 py-1 bg-[#D4AF37] text-[#120A07] text-[10px] font-mono font-bold uppercase tracking-widest shadow-md">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-20 shadow-md ${
            isSaved
              ? 'bg-[#7A1C24] text-white scale-110'
              : 'bg-white/90 text-[#120A07] hover:bg-[#120A07] hover:text-[#D4AF37]'
          }`}
          aria-label="Save to Wishlist"
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Optional Limited-Time Deal Countdown Bar */}
        {showCountdown && (
          <div className="absolute bottom-0 inset-x-0 bg-[#120A07]/90 text-[#FAF6F0] py-1.5 px-2 text-[10px] font-mono text-center flex items-center justify-center gap-1.5 z-10 border-t border-[#D4AF37]/40">
            <Clock className="w-3.5 h-3.5 text-[#F3C649] animate-pulse" />
            <span>DEAL ENDS IN: <strong>02D 14H 30M</strong></span>
          </div>
        )}

        {/* Quick Action Hover Bar */}
        {!showCountdown && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex gap-2 z-20">
            <button
              onClick={handleQuickAdd}
              className="flex-1 py-2.5 bg-[#120A07] text-[#FAF6F0] hover:bg-[#C84B31] text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl transition-colors border border-[#D4AF37]/30"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="p-2.5 bg-white text-[#120A07] hover:bg-[#FAF6F0] shadow-xl flex items-center justify-center transition-colors border border-[#E6D8C3]"
              title="Quick View Details"
            >
              <Eye className="w-4 h-4 text-[#3A2012]" />
            </Link>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white border-t border-[#E6D8C3]/60 space-y-3">
        <div>
          {/* Category Subtitle */}
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#C86D3B] font-bold mb-1 flex justify-between items-center">
            <span>{product.category}</span>
            <span className="text-[9px] font-mono text-[#3A2012]/50">EU 39-46</span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#C86D3B] transition-colors">
            <h3 className="text-base font-serif font-bold text-[#120A07] line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#D4AF37]">
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
            <span className="text-[11px] font-mono font-bold text-[#120A07]">{product.rating}</span>
            <span className="text-[11px] font-mono text-[#3A2012]/50">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & Interactive Color Swatches */}
        <div className="pt-2 border-t border-[#FAF6F0] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-serif font-bold text-[#120A07]">
              {formatPKR(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-gray-400 line-through font-mono">
                {formatPKR(product.price)}
              </span>
            )}
          </div>

          {/* Dynamic Interactive Color Swatches */}
          <div className="flex items-center space-x-1">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onMouseEnter={() => handleColorHover(idx)}
                onClick={() => handleColorHover(idx)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'border-[#D4AF37] scale-125 ring-2 ring-[#D4AF37]/40 shadow-xs'
                    : 'border-gray-300 opacity-80 hover:opacity-100'
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
