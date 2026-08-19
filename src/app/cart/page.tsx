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
    storeSettings,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success?: boolean; text?: string }>({});

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ success: res.success, text: res.message });
  };

  const freeShippingThreshold = storeSettings?.freeThreshold || 5000;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5">
            <ShoppingBag className="w-4 h-4" /> Order Summary
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Shopping Bag</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Review your selected Peshawari footwear before express dispatch.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xs my-8 sm:my-12">
            <div className="w-20 h-20 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto border border-slate-200">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Your Bag is Empty</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                You have no items in your shopping bag. Explore our handcrafted Peshawari Chappal catalog to select your pair.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Explore Catalog</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Cart Active Items & Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping progress indicator */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs">
                <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-2">
                  <span>
                    {amountNeeded === 0
                      ? '🎉 Free Express Nationwide Delivery Unlocked!'
                      : `Add ${formatPKR(amountNeeded)} more for FREE Express Shipping`}
                  </span>
                  <span className="font-mono text-blue-600 font-bold">{Math.round(freeShippingPercent)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                    style={{ width: `${freeShippingPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-2xs overflow-hidden">
                <div className="p-4 bg-slate-50 flex justify-between items-center text-xs uppercase text-slate-600 font-semibold tracking-wider">
                  <span>Product Details ({cart.length})</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:underline text-xs font-medium cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => {
                  const itemPrice = item.product.salePrice ?? item.product.price;
                  return (
                    <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 border border-slate-200 rounded-xl flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.featuredImage}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="flex-1 space-y-1 text-center sm:text-left w-full sm:w-auto">
                        <span className="text-xs uppercase text-blue-600 font-semibold">
                          {item.product.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          <Link href={`/product/${item.product.slug}`} className="hover:text-blue-600">
                            {item.product.name}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-slate-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span>Size: EU {item.selectedSize}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-slate-200 bg-slate-50 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-xs text-slate-700 hover:bg-white rounded-l-lg cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 font-mono text-xs font-bold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-xs text-slate-700 hover:bg-white rounded-r-lg cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[90px]">
                          <div className="text-sm font-bold font-mono text-slate-900">
                            {formatPKR(itemPrice * item.quantity)}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            ({formatPKR(itemPrice)} each)
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors cursor-pointer"
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
              <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Cash on Delivery across Pakistan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Direct Express from Peshawar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>7 Days Size Exchange Policy</span>
                </div>
              </div>
            </div>

            {/* Right Order Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-2xs sticky top-24">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Order Summary
                </h3>

                {/* Coupon Box */}
                <form onSubmit={handleCouponSubmit} className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Promo / Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. PESHAWAR10"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg.text && (
                    <p className={`text-[11px] font-mono ${couponMsg.success ? 'text-emerald-600 font-bold' : 'text-rose-600'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </form>

                {/* Costs Breakdown */}
                <div className="space-y-2.5 text-xs pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span className="font-mono font-semibold text-slate-900">{formatPKR(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({couponCode})</span>
                      <span className="font-mono">-{formatPKR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Nationwide Express Shipping</span>
                    <span className="font-mono font-semibold">
                      {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 pt-3 border-t border-slate-200">
                    <span>Total Payable</span>
                    <span className="text-slate-900 font-mono text-xl font-extrabold">{formatPKR(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Proceed to Checkout</span> <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
