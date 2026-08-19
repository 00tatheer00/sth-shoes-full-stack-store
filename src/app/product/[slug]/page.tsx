'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Ruler,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ui/ProductCard';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '@/data/mockData';
import { formatPKR, calculateDiscountPercentage } from '@/lib/utils';
import { ReviewSchema } from '@/lib/validations';
import { dataEngine } from '@/lib/services/dataEngine';

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { products: storeProducts, addToCart, toggleWishlist, isInWishlist, setIsCartOpen, showToast } = useStore();

  const [product, setProduct] = useState<any>(() => {
    const list = storeProducts && storeProducts.length > 0 ? storeProducts : dataEngine.getProducts();
    return list.find((p) => p.slug === slug) || list[0];
  });

  useEffect(() => {
    const list = storeProducts && storeProducts.length > 0 ? storeProducts : dataEngine.getProducts();
    const found = list.find((p) => p.slug === slug);
    if (found) setProduct(found);
  }, [slug, storeProducts]);

  const isSaved = isInWishlist(product.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Dark Chocolate', hex: '#27170B' });
  const [selectedSize, setSelectedSize] = useState<number>(
    product.sizes?.find((s: any) => s.inStock)?.size ?? product.sizes?.[0]?.size ?? 42
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'craft' | 'shipping'>('desc');

  // Reviews state
  const [reviewsList, setReviewsList] = useState(MOCK_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const discountPercent = calculateDiscountPercentage(product.price, product.salePrice);
  const effectivePrice = product.salePrice ?? product.price;

  const relatedProducts = (storeProducts.length > 0 ? storeProducts : MOCK_PRODUCTS)
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsCartOpen(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      ReviewSchema.parse({
        product_id: product.id,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
        author_name: reviewAuthor,
        location: 'Islamabad, Pakistan',
      });

      const newRev = {
        id: `rev-${Date.now()}`,
        author: reviewAuthor,
        location: 'Islamabad, Pakistan',
        rating: reviewRating,
        date: 'Today',
        title: reviewTitle,
        comment: reviewComment,
        verified: true,
      };

      setReviewsList((prev) => [newRev, ...prev]);
      setShowReviewForm(false);
      setReviewTitle('');
      setReviewComment('');
      showToast('Review submitted successfully!');
    } catch (err: any) {
      showToast(err.message || 'Please fill review correctly.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-blue-600">Shop</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Product Images Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage */}
            <div className="relative aspect-square sm:aspect-4/3 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 flex items-center justify-center overflow-hidden shadow-2xs">
              <Image
                src={product.images?.[selectedImageIndex] || product.featuredImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-4"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                  isSaved ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              {/* Discount Badge */}
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-rose-600 text-white text-xs font-bold rounded-md">
                  -{discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 bg-white border-2 rounded-xl flex-shrink-0 overflow-hidden cursor-pointer ${
                      selectedImageIndex === idx ? 'border-slate-900 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`View ${idx}`} fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Purchase Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-slate-900">{product.rating}</span>
                <span className="text-slate-500">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-2xs">
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-slate-900 font-mono">
                    {formatPKR(effectivePrice)}
                  </span>
                  {product.salePrice && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      {formatPKR(product.price)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Includes nationwide express delivery & premium packaging
                </p>
              </div>
              {discountPercent > 0 && (
                <span className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase rounded-lg">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Color Swatch Picker */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 uppercase text-[11px]">
                  Color: <span className="text-slate-900 font-bold">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex gap-2.5">
                {product.colors?.map((color: any) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`p-2 border rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-slate-900 bg-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-medium px-1 text-slate-800 hidden sm:inline">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Swatch Picker */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 uppercase text-[11px]">
                  Select Size (EU):
                </span>
                <Link
                  href="/size-guide"
                  className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </Link>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {product.sizes?.map((s: any) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-2 text-xs font-mono transition-all border rounded-lg font-bold cursor-pointer ${
                      !s.inStock
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                        : selectedSize === s.size
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-semibold uppercase text-slate-700 text-[11px]">Quantity:</span>
              <div className="flex items-center border border-slate-200 bg-white rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-700 hover:bg-slate-50 rounded-l-lg cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-mono font-bold text-xs text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-slate-700 hover:bg-slate-50 rounded-r-lg cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Express Buy Now (Checkout)</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Leather</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Free Express COD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>7 Days Swap</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Story & Craft Section */}
        <div className="mt-14 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-3 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'desc' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
              }`}
            >
              Story & Details
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'materials' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
              }`}
            >
              Materials & Sole
            </button>
            <button
              onClick={() => setActiveTab('craft')}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'craft' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
              }`}
            >
              Artisan Craftsmanship
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {activeTab === 'desc' && <p>{product.description || product.shortDescription}</p>}
            {activeTab === 'materials' && (
              <div className="space-y-2">
                <p><strong>Upper Leather:</strong> {product.leatherType || '100% Full-Grain Cowhide Leather'}</p>
                <p><strong>Sole:</strong> {product.soleType || 'Recycled Tyre Rubber Double Sole for Extreme Durability'}</p>
                <p><strong>Insole:</strong> Ergonomic Cushioned Leather Sockliner for All-Day Walking Comfort</p>
              </div>
            )}
            {activeTab === 'craft' && (
              <p>
                Crafted in Namak Mandi, Peshawar. Master cobblers hand-cut, skive, shape, and stitch each pair over 14 hours of intensive artisanal labor.
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
