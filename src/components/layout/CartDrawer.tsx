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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white text-[#1C1917] flex flex-col shadow-2xl border-l border-[#EAE3D5]">
          {/* Drawer Header */}
          <div className="p-5 bg-[#0D3325] text-white flex items-center justify-between border-b border-[#082419]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E5A93C]" />
              <h2 className="text-base font-serif font-bold tracking-wide">Your Shopping Bag ({cart.length})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-white/80 hover:text-[#E5A93C] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF6EF] px-5 py-3 border-b border-[#EAE3D5]">
            <div className="flex justify-between items-center text-xs text-[#0D3325] font-semibold mb-1.5">
              <span>
                {amountNeeded === 0
                  ? '🎉 You unlocked Free Express Shipping!'
                  : `Add ${formatPKR(amountNeeded)} more for FREE Express Delivery`}
              </span>
              <span className="font-mono text-[#E5A93C]">{Math.round(freeShippingPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#EAE3D5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0D3325] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-[#FAF6EF]/50">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#FAF6EF] border border-[#EAE3D5] flex items-center justify-center text-[#0D3325]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#1C1917]">Your bag is empty</h3>
                  <p className="text-xs text-[#5A6578] max-w-xs mt-1">
                    Discover our authentic handcrafted Peshawari Chappal collection.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-forest py-2.5 px-6 text-xs"
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
                    className="p-3 bg-white border border-[#EAE3D5] rounded-md flex gap-3.5 shadow-2xs"
                  >
                    <div className="relative w-20 h-20 bg-[#FAF6EF] rounded flex-shrink-0 border border-[#EAE3D5] overflow-hidden">
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
                          <h4 className="text-xs font-serif font-bold text-[#1C1917] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#8A94A6] hover:text-red-600 transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2.5 text-[11px] text-[#5A6578] mt-0.5">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span>EU {item.selectedSize}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#FAF6EF]">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#EAE3D5] rounded bg-[#FAF6EF]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#1C1917] hover:bg-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#1C1917] hover:bg-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-[#1C1917]">
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
            <div className="p-5 bg-white border-t border-[#EAE3D5] space-y-3.5">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. PESHAWAR10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs focus:outline-none focus:border-[#0D3325] font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-forest px-4 py-2 text-[10px]"
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
              <div className="space-y-1.5 text-xs border-t border-[#FAF6EF] pt-3">
                <div className="flex justify-between text-[#5A6578]">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-[#1C1917]">{formatPKR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Discount ({couponCode})</span>
                    <span className="font-mono">-{formatPKR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5A6578]">
                  <span>Nationwide Express COD</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? <span className="text-green-700 font-bold">FREE</span> : formatPKR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1C1917] pt-2 border-t border-[#EAE3D5]">
                  <span>Total Amount</span>
                  <span className="text-[#0D3325] font-mono text-base font-extrabold">{formatPKR(total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-amber w-full py-3.5 text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Proceed to Checkout</span> <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#5A6578] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D3325]" />
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
