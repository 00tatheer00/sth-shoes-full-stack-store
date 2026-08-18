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
    <div className="product-card-ref flex flex-col justify-between overflow-hidden relative group">
      {/* Product Image Stage */}
      <div className="relative aspect-square bg-[#F8F5EE] p-4 flex items-center justify-center overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={product.images[currentImageIndex] || product.featuredImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Top Badges (Red Sale, Gold Best Seller, Green New Arrival) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-[#D92D20] text-white text-[9px] font-bold uppercase tracking-wider rounded-xs shadow-2xs">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-[#E5A93C] text-[#1C1917] text-[9px] font-extrabold uppercase tracking-wider rounded-xs shadow-2xs">
              BEST SELLER
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="px-2 py-0.5 bg-[#0D3325] text-white text-[9px] font-bold uppercase tracking-wider rounded-xs shadow-2xs">
              NEW ARRIVAL
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 border border-[#EAE3D5] flex items-center justify-center transition-colors z-20 shadow-xs ${
            isSaved ? 'text-[#D92D20]' : 'text-[#5A6578] hover:text-[#D92D20]'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* 3 Color Swatch Dots (Bottom Right of Image) */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 z-10 bg-white/80 backdrop-blur-xs p-1 rounded-full border border-[#EAE3D5]">
          {product.colors.map((color, idx) => (
            <button
              key={color.name}
              onMouseEnter={() => handleColorHover(idx)}
              onClick={() => handleColorHover(idx)}
              className={`w-2.5 h-2.5 rounded-full border transition-all ${
                selectedColor.name === color.name
                  ? 'border-[#0D3325] scale-125'
                  : 'border-transparent opacity-80'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3.5 flex flex-col justify-between flex-1 bg-white space-y-2">
        <div>
          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#0D3325] transition-colors">
            <h3 className="text-xs font-serif font-bold text-[#1C1917] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating with Count */}
          <div className="flex items-center gap-1 mt-1 text-[11px]">
            <div className="flex text-[#E5A93C]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-[#1C1917]">{product.rating}</span>
            <span className="text-[#8A94A6]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Circular Forest Green Cart Button */}
        <div className="pt-2 border-t border-[#FAF6EF] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-[#1C1917]">
              {formatPKR(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="text-[11px] text-[#8A94A6] line-through">
                {formatPKR(product.price)}
              </span>
            )}
          </div>

          {/* Circular Forest Green Cart Button */}
          <button
            onClick={handleQuickAdd}
            className="w-8 h-8 rounded-full bg-[#0D3325] hover:bg-[#082419] text-white flex items-center justify-center transition-all shadow-xs"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
