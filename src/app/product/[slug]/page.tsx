'use client';

import React, { useState } from 'react';
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
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Ruler,
  MessageSquare,
  Send,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/ui/ProductCard';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '@/data/mockData';
import { formatPKR, calculateDiscountPercentage } from '@/lib/utils';
import { ReviewSchema } from '@/lib/validations';

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen, showToast } = useStore();
  const isSaved = isInWishlist(product.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number>(
    product.sizes.find((s) => s.inStock)?.size ?? product.sizes[0].size
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'craft' | 'shipping'>('desc');
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState(MOCK_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewMsg, setReviewMsg] = useState<string | null>(null);

  const discountPercent = calculateDiscountPercentage(product.price, product.salePrice);
  const effectivePrice = product.salePrice ?? product.price;

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug
  ).concat(MOCK_PRODUCTS.filter((p) => p.id !== product.id)).slice(0, 3);

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
      showToast('Review submitted and pending admin approval');
    } catch (err: any) {
      setReviewMsg('Please fill all review fields properly.');
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#EAE3D2] border-b border-[#E2D7C7] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-[#4A2E1D]/70 font-serif">
          <Link href="/" className="hover:text-[#B87546]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#4A2E1D]/40" />
          <Link href="/shop" className="hover:text-[#B87546]">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#4A2E1D]/40" />
          <Link href={`/category/${product.categorySlug}`} className="hover:text-[#B87546]">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#4A2E1D]/40" />
          <span className="text-[#1F130E] font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Product Photography Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 sm:aspect-square bg-white border border-[#E2D7C7] overflow-hidden group shadow-xs">
              <Image
                src={product.images[selectedImageIndex] || product.featuredImage}
                alt={product.name}
                fill
                priority
                className="object-cover img-zoom"
              />
              <button
                onClick={() => setZoomModalOpen(true)}
                className="absolute top-4 right-4 p-2.5 bg-white/90 text-[#1F130E] hover:bg-[#1F130E] hover:text-[#C59B27] transition-all shadow-md"
                title="Zoom image preview"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 bg-white border-2 flex-shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#4A2E1D] shadow-md'
                      : 'border-[#E2D7C7] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Purchase Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B87546] font-bold">
                  {product.category}
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs border transition-colors ${
                    isSaved
                      ? 'bg-[#5C1D24] text-white border-[#5C1D24]'
                      : 'bg-white text-[#1F130E] border-[#E2D7C7] hover:border-[#B87546]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F130E] mt-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex text-[#C59B27]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'opacity-40'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-[#1F130E]">{product.rating}</span>
                <span className="text-[#4A2E1D]/60 font-mono">({reviewsList.length} verified reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white border border-[#E2D7C7] flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-serif font-bold text-[#1F130E]">
                    {formatPKR(effectivePrice)}
                  </span>
                  {product.salePrice && (
                    <span className="text-sm text-[#1C1917]/40 line-through font-mono">
                      {formatPKR(product.price)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#4A2E1D]/70">
                  Includes all taxes • Free express nationwide delivery
                </p>
              </div>
              {discountPercent > 0 && (
                <span className="px-3 py-1 bg-[#5C1D24] text-white text-xs font-mono font-bold uppercase">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Color Swatch Picker */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-mono uppercase font-bold text-[#4A2E1D]">
                  Selected Leather Shade: <span className="text-[#1F130E] font-serif">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`p-1 border-2 transition-all flex items-center gap-2 ${
                      selectedColor.name === color.name
                        ? 'border-[#4A2E1D] bg-white shadow-xs'
                        : 'border-[#E2D7C7] bg-[#FAF7F2] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-serif px-1 text-[#1F130E] hidden sm:inline">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Swatch Picker */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono uppercase font-bold text-[#4A2E1D]">
                  Select Shoe Size (EU):
                </span>
                <Link
                  href="/size-guide"
                  className="text-[#B87546] hover:underline flex items-center gap-1 font-serif"
                >
                  <Ruler className="w-3.5 h-3.5" /> Size Guide
                </Link>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className={`py-2.5 text-xs font-mono transition-all border relative ${
                      !s.inStock
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                        : selectedSize === s.size
                        ? 'bg-[#4A2E1D] text-[#FAF7F2] border-[#1F130E] font-bold shadow-xs'
                        : 'bg-white text-[#1F130E] border-[#E2D7C7] hover:border-[#B87546]'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-mono uppercase font-bold text-[#4A2E1D]">Quantity:</span>
              <div className="flex items-center border border-[#E2D7C7] bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-[#1F130E] hover:bg-[#FAF7F2]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-mono font-bold text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-[#1F130E] hover:bg-[#FAF7F2]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors flex items-center justify-center gap-2 shadow-lg border border-[#3A2315]"
              >
                <ShoppingBag className="w-4 h-4 text-[#C59B27]" /> Add to Shopping Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#C59B27] text-[#1F130E] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-2 border border-[#C59B27]"
              >
                Buy Now (Instant Checkout)
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E2D7C7] text-[11px] text-[#4A2E1D]/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
                <span>100% Genuine Leather</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
                <span>Free Express COD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
                <span>14 Days Size Swap</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 bg-white border border-[#E2D7C7] p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E2D7C7] pb-6 gap-4">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#1F130E]">Patron Reviews</h3>
              <p className="text-xs text-[#4A2E1D]/70 font-mono mt-1">
                Based on {reviewsList.length} verified customer experiences
              </p>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-6 py-2.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider hover:bg-[#1F130E]"
            >
              <MessageSquare className="w-4 h-4 inline mr-1 text-[#C59B27]" /> Write a Review
            </button>
          </div>

          {showReviewForm && (
            <form onSubmit={handleAddReview} className="p-6 bg-[#FAF7F2] border border-[#E2D7C7] space-y-4">
              <h4 className="text-sm font-serif font-bold text-[#1F130E]">Submit Verified Patron Review</h4>
              {reviewMsg && <p className="text-xs text-red-600 font-mono">{reviewMsg}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="p-3 bg-white border border-[#E2D7C7] text-xs font-serif"
                />
                <input
                  type="text"
                  required
                  placeholder="Review Headline (e.g. Magnificent Craftsmanship)"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="p-3 bg-white border border-[#E2D7C7] text-xs font-serif"
                />
              </div>
              <textarea
                rows={4}
                required
                placeholder="Share details of leather quality, fit & delivery..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full p-3 bg-white border border-[#E2D7C7] text-xs font-serif"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider"
              >
                Submit Review <Send className="w-3.5 h-3.5 inline ml-1 text-[#C59B27]" />
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#FAF7F2] border border-[#E2D7C7] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex text-[#C59B27]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#4A2E1D]/50">{rev.date}</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-[#1F130E]">"{rev.title}"</h4>
                <p className="text-xs text-[#4A2E1D]/80 leading-relaxed italic">"{rev.comment}"</p>
                <div className="flex justify-between items-center pt-2 border-t border-[#E2D7C7]">
                  <span className="text-xs font-serif font-bold text-[#1F130E]">
                    {rev.author} <span className="text-[10px] text-[#4A2E1D]/60 font-sans">({rev.location})</span>
                  </span>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-green-700 bg-green-50 px-2 py-0.5 border border-green-200">
                      <CheckCircle2 className="w-3 h-3" /> Verified Patron
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
