'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPKR } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discount,
    applyCoupon,
    couponCode,
    total,
    clearCart,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success?: boolean; text?: string }>({});

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ success: res.success, text: res.message });
  };

  const freeShippingThreshold = 5000;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#0D3325] text-white py-12 md:py-16 border-b border-[#082419]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E5A93C] flex items-center justify-center gap-1.5 font-bold">
            <ShoppingBag className="w-4 h-4" /> Order Summary
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-white/80">
            Review your selected Peshawari footwear before express dispatch.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="max-w-lg mx-auto bg-white border border-[#EAE3D5] rounded-xl p-8 sm:p-12 text-center space-y-6 shadow-xs my-8 sm:my-12">
            <div className="w-20 h-20 rounded-full bg-[#EAF2ED] text-[#0D3325] flex items-center justify-center mx-auto border border-[#0D3325]/20">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Your Cart is Currently Empty</h2>
              <p className="text-xs text-[#5A6578] leading-relaxed font-sans">
                You have no items in your shopping bag. Explore our handcrafted Peshawari Chappal collection to select your pair.
              </p>
            </div>
            <Link
              href="/shop"
              className="btn-forest inline-flex items-center gap-2 px-8 py-3.5 text-xs shadow-md"
            >
              <span>Explore Collection</span> <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
            </Link>
          </div>
        ) : (
          /* Cart Active Items & Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping progress indicator */}
              <div className="bg-white border border-[#EAE3D5] rounded-xl p-4 sm:p-5 shadow-xs">
                <div className="flex justify-between items-center text-xs font-semibold text-[#0D3325] mb-2">
                  <span>
                    {amountNeeded === 0
                      ? '🎉 You unlocked Free Express Nationwide Delivery!'
                      : `Add ${formatPKR(amountNeeded)} more for FREE Nationwide Express Shipping`}
                  </span>
                  <span className="font-mono text-[#E5A93C] font-bold">{Math.round(freeShippingPercent)}%</span>
                </div>
                <div className="w-full h-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0D3325] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white border border-[#EAE3D5] rounded-xl divide-y divide-[#EAE3D5] shadow-xs overflow-hidden">
                <div className="p-4 bg-[#FAF6EF] flex justify-between items-center text-xs font-mono uppercase text-[#0D3325] font-bold">
                  <span>Product Details ({cart.length})</span>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:underline text-[11px] font-sans font-semibold cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => {
                  const itemPrice = item.product.salePrice ?? item.product.price;
                  return (
                    <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF6EF] border border-[#EAE3D5] rounded flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.featuredImage}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="flex-1 space-y-1 text-center sm:text-left w-full sm:w-auto">
                        <span className="text-[10px] font-mono uppercase text-[#0D3325] font-bold">
                          {item.product.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-serif font-bold text-[#1C1917]">
                          <Link href={`/product/${item.product.slug}`} className="hover:text-[#0D3325]">
                            {item.product.name}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-[#5A6578] pt-1">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span>Size: EU {item.selectedSize}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#FAF6EF]">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#EAE3D5] bg-[#FAF6EF] rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-xs text-[#1C1917] hover:bg-white rounded-l"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 font-mono text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-xs text-[#1C1917] hover:bg-white rounded-r"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[90px]">
                          <div className="text-sm font-bold text-[#1C1917]">
                            {formatPKR(itemPrice * item.quantity)}
                          </div>
                          <div className="text-[10px] text-[#8A94A6] font-mono">
                            ({formatPKR(itemPrice)} each)
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8A94A6] hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guarantees Box */}
              <div className="p-5 sm:p-6 bg-white border border-[#EAE3D5] rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5A6578]">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#0D3325] flex-shrink-0" />
                  <span>Cash on Delivery across Pakistan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#0D3325] flex-shrink-0" />
                  <span>Direct Express from Peshawar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-5 h-5 text-[#0D3325] flex-shrink-0" />
                  <span>7 Days Size Exchange Policy</span>
                </div>
              </div>
            </div>

            {/* Right Order Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-[#EAE3D5] rounded-xl p-6 space-y-6 shadow-xs sticky top-24">
                <h3 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-3">
                  Order Summary
                </h3>

                {/* Coupon Box */}
                <form onSubmit={handleCouponSubmit} className="space-y-2">
                  <label className="text-xs font-mono uppercase text-[#0D3325] font-bold block">
                    Promo / Heritage Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
                      <input
                        type="text"
                        placeholder="e.g. PESHAWAR10"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono uppercase focus:outline-none focus:border-[#0D3325]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-forest px-4 py-2 text-xs"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg.text && (
                    <p className={`text-[11px] font-mono ${couponMsg.success ? 'text-green-700 font-bold' : 'text-red-600'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </form>

                {/* Costs Breakdown */}
                <div className="space-y-2.5 text-xs pt-3 border-t border-[#EAE3D5]">
                  <div className="flex justify-between text-[#5A6578]">
                    <span>Items Subtotal</span>
                    <span className="font-mono font-semibold text-[#1C1917]">{formatPKR(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700 font-medium">
                      <span>Discount ({couponCode})</span>
                      <span className="font-mono">-{formatPKR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5A6578]">
                    <span>Nationwide Express Shipping</span>
                    <span className="font-mono font-semibold">
                      {shippingFee === 0 ? <span className="text-green-700 font-bold">FREE</span> : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-[#1C1917] pt-3 border-t border-[#EAE3D5]">
                    <span>Total Payable</span>
                    <span className="text-[#0D3325] font-mono text-xl font-extrabold">{formatPKR(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="btn-amber w-full py-4 text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span> <ArrowRight className="w-4 h-4 text-[#0D3325]" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
