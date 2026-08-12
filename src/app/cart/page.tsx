'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPKR } from '@/lib/utils';

export default function CartPage() {
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
    <div className="bg-[#FAF7F2] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#1F130E] text-[#FAF7F2] py-12 md:py-16 border-b border-[#3A2315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C59B27] flex items-center justify-center gap-1.5">
            <ShoppingBag className="w-4 h-4" /> Order Summary
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-[#E2D7C7]/80">
            Review your selected Peshawari footwear before express dispatch.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="max-w-lg mx-auto bg-white border border-[#E2D7C7] p-12 text-center space-y-6 shadow-xs my-12">
            <div className="w-20 h-20 rounded-full bg-[#EAE3D2] text-[#B87546] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-[#1F130E]">Your Cart is Currently Empty</h2>
              <p className="text-xs text-[#4A2E1D]/70 leading-relaxed font-sans">
                You have no items in your shopping bag. Explore our handcrafted Peshawari Chappal collection to select your pair.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#1F130E] transition-colors shadow-md"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Active Items & Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping progress indicator */}
              <div className="bg-[#EAE3D2] border border-[#E2D7C7] p-4">
                <div className="flex justify-between items-center text-xs font-serif font-semibold text-[#4A2E1D] mb-2">
                  <span>
                    {amountNeeded === 0
                      ? '🎉 You unlocked Free Express Nationwide Delivery!'
                      : `Add ${formatPKR(amountNeeded)} more for FREE Nationwide Express Shipping`}
                  </span>
                  <span className="font-mono">{Math.round(freeShippingPercent)}%</span>
                </div>
                <div className="w-full h-2 bg-[#D5C9B7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B87546] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List Table */}
              <div className="bg-white border border-[#E2D7C7] divide-y divide-[#E2D7C7] shadow-xs">
                <div className="p-4 bg-[#FAF7F2] flex justify-between items-center text-xs font-mono uppercase text-[#4A2E1D] font-bold">
                  <span>Product Details</span>
                  <button
                    onClick={clearCart}
                    className="text-red-700 hover:underline text-[11px] font-sans"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => {
                  const itemPrice = item.product.salePrice ?? item.product.price;
                  return (
                    <div key={item.id} className="p-5 flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative w-24 h-24 bg-[#FAF7F2] border border-[#E2D7C7] flex-shrink-0">
                        <Image
                          src={item.product.featuredImage}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-1 text-center sm:text-left">
                        <span className="text-[10px] font-mono uppercase text-[#B87546]">
                          {item.product.category}
                        </span>
                        <h3 className="text-base font-serif font-bold text-[#1F130E]">
                          <Link href={`/product/${item.product.slug}`}>{item.product.name}</Link>
                        </h3>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#4A2E1D]/70 pt-1">
                          <span className="flex items-center gap-1">
                            Shade:
                            <span
                              className="w-3 h-3 rounded-full border border-gray-400 inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span>Size: EU {item.selectedSize}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#E2D7C7] bg-[#FAF7F2]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-xs text-[#1F130E] hover:bg-[#EAE3D2]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 font-mono text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-xs text-[#1F130E] hover:bg-[#EAE3D2]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[90px]">
                          <div className="text-sm font-serif font-bold text-[#1F130E]">
                            {formatPKR(itemPrice * item.quantity)}
                          </div>
                          <div className="text-[10px] text-[#4A2E1D]/50 font-mono">
                            ({formatPKR(itemPrice)} each)
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#1C1917]/40 hover:text-red-700 p-1 transition-colors"
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
              <div className="p-6 bg-white border border-[#E2D7C7] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#4A2E1D]/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C59B27] flex-shrink-0" />
                  <span>Cash on Delivery or Bank Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#C59B27] flex-shrink-0" />
                  <span>Dispatched directly from Peshawar</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-[#C59B27] flex-shrink-0" />
                  <span>14 Days Size Exchange Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Order Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-[#E2D7C7] p-6 space-y-6 shadow-xs">
                <h3 className="text-lg font-serif font-bold text-[#1F130E] border-b border-[#E2D7C7] pb-3">
                  Order Summary
                </h3>

                {/* Coupon Box */}
                <form onSubmit={handleCouponSubmit} className="space-y-2">
                  <label className="text-xs font-mono uppercase text-[#4A2E1D] font-bold block">
                    Promo / Heritage Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
                      <input
                        type="text"
                        placeholder="e.g. PESHAWAR10"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E2D7C7] text-xs font-mono uppercase focus:outline-none focus:border-[#B87546]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-serif uppercase tracking-wider hover:bg-[#1F130E]"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg.text && (
                    <p className={`text-[11px] font-mono ${couponMsg.success ? 'text-green-700' : 'text-red-600'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                  <p className="text-[10px] text-[#4A2E1D]/60 italic">
                    Hint: Use code <span className="font-mono text-[#B87546] font-bold">PESHAWAR10</span> for 10% discount.
                  </p>
                </form>

                {/* Costs Breakdown */}
                <div className="space-y-3 text-xs pt-3 border-t border-[#E2D7C7]">
                  <div className="flex justify-between text-[#4A2E1D]/80">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold text-[#1F130E]">{formatPKR(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700 font-medium">
                      <span>Discount ({couponCode})</span>
                      <span className="font-mono">-{formatPKR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#4A2E1D]/80">
                    <span>Nationwide Express Shipping</span>
                    <span className="font-mono font-semibold">
                      {shippingFee === 0 ? <span className="text-green-700">FREE</span> : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-[#1F130E] pt-3 border-t border-[#E2D7C7]">
                    <span>Total Amount</span>
                    <span className="text-[#B87546] font-mono text-lg">{formatPKR(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => alert('Order Placed Successfully! (Demo Checkout)')}
                  className="w-full py-4 bg-[#1F130E] text-[#FAF7F2] text-xs font-serif font-bold uppercase tracking-[0.2em] hover:bg-[#4A2E1D] transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4 text-[#C59B27]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
