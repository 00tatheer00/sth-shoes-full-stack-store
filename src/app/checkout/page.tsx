'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Tag,
  ArrowRight,
  MapPin,
  User,
  CreditCard,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPKR } from '@/lib/utils';
import { shippingService } from '@/lib/services/shippingService';
import { couponService } from '@/lib/services/couponService';
import { orderService } from '@/lib/services/orderService';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart, currentUser, showToast } = useStore();

  const [fullName, setFullName] = useState(currentUser?.user_metadata?.full_name || 'Shahzaib Khan');
  const [email, setEmail] = useState(currentUser?.email || 'shahzaib@example.com');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [addressLine, setAddressLine] = useState('House 42, Street 8, Sector F-7/3');
  const [city, setCity] = useState('Islamabad');
  const [province, setProvince] = useState('ICT');
  const [postalCode, setPostalCode] = useState('44000');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [inputCoupon, setInputCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ success?: boolean; text?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dynamic Shipping Calculation based on City and Subtotal
  const shippingInfo = shippingService.calculateShipping(subtotal, city);
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingInfo.shippingFee);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    const res = await couponService.validateCoupon(inputCoupon, subtotal, currentUser?.id);
    if (res.valid) {
      setAppliedCoupon({ code: res.code, discountAmount: res.discountAmount });
      setCouponMsg({ success: true, text: res.message });
      showToast(`Coupon ${res.code} applied!`);
    } else {
      setCouponMsg({ success: false, text: res.message });
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setErrorMsg('Your cart is empty.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await orderService.createOrder({
        userId: currentUser?.id,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        addressLine,
        city,
        province,
        postalCode,
        landmark,
        paymentMethod,
        couponCode: appliedCoupon?.code,
        cartItems: cart,
      });

      if (res.success) {
        clearCart();
        showToast('🎉 Order placed successfully!');
        router.push(`/checkout/success/${res.orderNumber}`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to place order. Please check details.');
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF6EF] min-h-screen py-20">
        <div className="max-w-md mx-auto bg-white border border-[#EAE3D5] rounded-xl p-10 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FAF6EF] border border-[#EAE3D5] flex items-center justify-center text-[#0D3325] mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Your Bag is Empty</h2>
          <p className="text-xs text-[#5A6578]">Add items to your cart before proceeding to checkout.</p>
          <Link
            href="/shop"
            className="btn-forest px-8 py-3 text-xs inline-flex"
          >
            <span>Explore Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6EF] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0D3325] text-white py-12 border-b border-[#082419]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E5A93C] flex items-center justify-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4" /> Fast Express Checkout
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold">Complete Your Order</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Details */}
            <div className="bg-white border border-[#EAE3D5] rounded-xl p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-[#0D3325]" /> 1. Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Shahzaib Khan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Phone Number (COD SMS) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="shahzaib@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
                />
              </div>
            </div>

            {/* Delivery Destination Address */}
            <div className="bg-white border border-[#EAE3D5] rounded-xl p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0D3325]" /> 2. Delivery Destination
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Street Address & House No. *</label>
                <input
                  type="text"
                  required
                  placeholder="House 42, Street 8, Sector F-7/3"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Islamabad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Province *</label>
                  <input
                    type="text"
                    required
                    placeholder="ICT / Punjab / KP"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Postal Code</label>
                  <input
                    type="text"
                    placeholder="44000"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono focus:outline-none focus:border-[#0D3325]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Landmark / Delivery Instructions</label>
                <input
                  type="text"
                  placeholder="Near Safa Gold Mall / Call before delivery"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-serif focus:outline-none focus:border-[#0D3325]"
                />
              </div>

              <div className="p-3 bg-[#FAF6EF] border border-[#EAE3D5] rounded flex items-center justify-between text-xs text-[#0D3325]">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#0D3325]" /> Courier Timeline:
                </span>
                <span className="font-mono font-bold text-[#1C1917]">{shippingInfo.estimatedDays}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white border border-[#EAE3D5] rounded-xl p-6 space-y-4 shadow-xs">
              <h2 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0D3325]" /> 3. Payment Method
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'cod'
                      ? 'bg-[#FAF6EF] border-[#0D3325]'
                      : 'bg-white border-[#EAE3D5]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-[#0D3325]"
                  />
                  <div>
                    <div className="text-xs font-serif font-bold text-[#1C1917]">
                      Cash on Delivery (COD) • Recommended
                    </div>
                    <div className="text-[11px] text-[#5A6578] font-sans mt-0.5">
                      Pay cash at your doorstep upon parcel inspection across Pakistan.
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'jazzcash'
                      ? 'bg-[#FAF6EF] border-[#0D3325]'
                      : 'bg-white border-[#EAE3D5]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'jazzcash'}
                    onChange={() => setPaymentMethod('jazzcash')}
                    className="mt-1 accent-[#0D3325]"
                  />
                  <div>
                    <div className="text-xs font-serif font-bold text-[#1C1917]">JazzCash Mobile Wallet</div>
                    <div className="text-[11px] text-[#5A6578] font-sans mt-0.5">
                      Pay via JazzCash mobile account or debit card.
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'easypaisa'
                      ? 'bg-[#FAF6EF] border-[#0D3325]'
                      : 'bg-white border-[#EAE3D5]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'easypaisa'}
                    onChange={() => setPaymentMethod('easypaisa')}
                    className="mt-1 accent-[#0D3325]"
                  />
                  <div>
                    <div className="text-xs font-serif font-bold text-[#1C1917]">Easypaisa Mobile Wallet</div>
                    <div className="text-[11px] text-[#5A6578] font-sans mt-0.5">
                      Direct OTP verification on Easypaisa app.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Order Summary & Place Order CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#EAE3D5] rounded-xl p-6 space-y-6 shadow-xs sticky top-24">
              <h2 className="text-base font-serif font-bold text-[#1C1917] border-b border-[#EAE3D5] pb-3">
                Order Summary ({cart.length})
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const itemPrice = item.product.salePrice ?? item.product.price;
                  return (
                    <div key={item.id} className="flex gap-3 p-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded">
                      <div className="relative w-14 h-14 bg-white border border-[#EAE3D5] rounded flex-shrink-0 overflow-hidden">
                        <Image src={item.product.featuredImage} alt={item.product.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-serif font-bold text-[#1C1917] line-clamp-1">{item.product.name}</h4>
                        <div className="text-[10px] text-[#5A6578] font-mono">
                          EU {item.selectedSize} • {item.selectedColor.name} • x{item.quantity}
                        </div>
                        <div className="text-xs font-bold text-[#1C1917] mt-0.5">
                          {formatPKR(itemPrice * item.quantity)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Box */}
              <div className="space-y-2 pt-2 border-t border-[#EAE3D5]">
                <label className="text-xs font-mono uppercase text-[#0D3325] font-bold">Apply Coupon Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
                    <input
                      type="text"
                      placeholder="e.g. PESHAWAR10"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF6EF] border border-[#EAE3D5] rounded text-xs font-mono uppercase"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
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
              </div>

              {/* Cost Summary */}
              <div className="space-y-2 text-xs pt-3 border-t border-[#EAE3D5]">
                <div className="flex justify-between text-[#5A6578]">
                  <span>Items Subtotal</span>
                  <span className="font-mono font-semibold text-[#1C1917]">{formatPKR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Discount Applied</span>
                    <span className="font-mono">-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5A6578]">
                  <span>Nationwide Express Delivery</span>
                  <span className="font-mono">
                    {shippingInfo.shippingFee === 0 ? (
                      <span className="text-green-700 font-bold">FREE</span>
                    ) : (
                      formatPKR(shippingInfo.shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#1C1917] pt-3 border-t border-[#EAE3D5]">
                  <span>Total Payable</span>
                  <span className="text-[#0D3325] font-mono text-xl font-extrabold">{formatPKR(grandTotal)}</span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                  {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-amber w-full py-4 text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'} <ArrowRight className="w-4 h-4 text-[#0D3325]" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
