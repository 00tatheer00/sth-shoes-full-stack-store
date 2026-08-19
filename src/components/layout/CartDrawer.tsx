'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPKR } from '@/lib/utils';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    total,
    shippingFee,
    discount,
    applyCoupon,
    couponCode,
    storeSettings,
  } = useStore();

  const [inputCoupon, setInputCoupon] = React.useState('');
  const [couponMsg, setCouponMsg] = React.useState<{ success?: boolean; text?: string }>({});

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ success: res.success, text: res.message });
  };

  const freeShippingThreshold = storeSettings?.freeThreshold || 5000;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white text-slate-900 flex flex-col shadow-2xl border-l border-slate-200">
          {/* Drawer Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold tracking-tight">Your Shopping Bag ({cart.length})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
            <div className="flex justify-between items-center text-xs text-slate-700 font-medium mb-1.5">
              <span>
                {amountNeeded === 0
                  ? '🎉 Free Express Delivery Unlocked!'
                  : `Add ${formatPKR(amountNeeded)} more for FREE Delivery`}
              </span>
              <span className="font-mono text-blue-600 font-bold">{Math.round(freeShippingPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/50">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Your bag is empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mt-1">
                    Discover our authentic handcrafted Peshawari Chappal collection.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white border border-slate-200 rounded-xl flex gap-3.5 shadow-2xs"
                  >
                    <div className="relative w-20 h-20 bg-slate-50 rounded-lg flex-shrink-0 border border-slate-200 overflow-hidden">
                      <Image
                        src={item.product.featuredImage}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-slate-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span>EU {item.selectedSize}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-slate-700 hover:bg-white rounded-l-lg cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-slate-700 hover:bg-white rounded-r-lg cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-900">
                          {formatPKR(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-slate-200 space-y-3.5">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. PESHAWAR10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {couponMsg.text && (
                <p className={`text-[11px] font-mono ${couponMsg.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-slate-900">{formatPKR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({couponCode})</span>
                    <span className="font-mono">-{formatPKR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Nationwide Express COD</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatPKR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-slate-900 font-mono text-base font-extrabold">{formatPKR(total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Proceed to Checkout</span> <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cash on Delivery, JazzCash & Easypaisa Accepted</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
