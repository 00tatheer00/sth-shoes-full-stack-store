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

  const freeShippingThreshold = 5000;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] text-[#1C1917] flex flex-col shadow-2xl border-l border-[#E2D7C7]">
          {/* Drawer Header */}
          <div className="p-5 bg-[#1F130E] text-[#FAF7F2] flex items-center justify-between border-b border-[#3A2315]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C59B27]" />
              <h2 className="text-lg font-serif tracking-wide text-[#FAF7F2]">Your Cart ({cart.length})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#E2D7C7] hover:text-[#C59B27] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#EAE3D2] px-5 py-3 border-b border-[#E2D7C7]">
            <div className="flex justify-between items-center text-xs text-[#4A2E1D] font-medium mb-1.5">
              <span>
                {amountNeeded === 0
                  ? '🎉 You unlocked Free Express Shipping!'
                  : `Add ${formatPKR(amountNeeded)} more for FREE Express Shipping`}
              </span>
              <span>{Math.round(freeShippingPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#D5C9B7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B87546] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#EAE3D2] flex items-center justify-center text-[#B87546]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-[#1F130E]">Your cart is empty</h3>
                  <p className="text-xs text-[#4A2E1D]/70 max-w-xs mt-1">
                    Discover our handcrafted Peshawari Chappal collection created by master artisans.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider hover:bg-[#1F130E] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={item.id}
                    className="p-3 bg-white border border-[#E2D7C7] flex gap-4 transition-all hover:border-[#B87546]"
                  >
                    <div className="relative w-20 h-20 bg-[#FAF7F2] flex-shrink-0 border border-[#E2D7C7]">
                      <Image
                        src={item.product.featuredImage}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-serif font-medium text-[#1F130E] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#1C1917]/40 hover:text-red-700 transition-colors p-0.5"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#4A2E1D]/70 mt-1">
                          <span className="flex items-center gap-1">
                            Color:
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-gray-400"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span>Size: EU {item.selectedSize}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#FAF7F2]">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#E2D7C7] bg-[#FAF7F2]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#1F130E] hover:bg-[#EAE3D2]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#1F130E] hover:bg-[#EAE3D2]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-serif font-bold text-[#1F130E]">
                          {formatPKR(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer (Summary & Checkout) */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E2D7C7] space-y-4">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A2E1D]/50" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. PESHAWAR10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E2D7C7] text-xs focus:outline-none focus:border-[#B87546] font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-medium uppercase hover:bg-[#1F130E] transition-colors"
                >
                  Apply
                </button>
              </form>
              {couponMsg.text && (
                <p className={`text-[11px] font-mono ${couponMsg.success ? 'text-green-700' : 'text-red-600'}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs border-t border-[#FAF7F2] pt-3">
                <div className="flex justify-between text-[#4A2E1D]/80">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPKR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Discount ({couponCode})</span>
                    <span className="font-mono">-{formatPKR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#4A2E1D]/80">
                  <span>Nationwide Shipping</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? <span className="text-green-700 font-bold">FREE</span> : formatPKR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-[#1F130E] pt-2 border-t border-[#E2D7C7]">
                  <span>Total</span>
                  <span className="text-[#B87546] font-mono text-base">{formatPKR(total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 bg-[#4A2E1D] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-[#1F130E] transition-colors shadow-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#4A2E1D]/60 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Cash on Delivery & Bank Transfer Accepted</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
