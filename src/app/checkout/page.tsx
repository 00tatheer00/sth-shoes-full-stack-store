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
      <div className="bg-slate-50 min-h-screen py-20 font-sans">
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Your Bag is Empty</h2>
          <p className="text-xs text-slate-500">Add items to your cart before proceeding to checkout.</p>
          <Link
            href="/shop"
            className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2"
          >
            <span>Explore Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Secure Checkout
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Complete Your Order</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" /> 1. Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Shahzaib Khan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Phone Number (For COD Delivery) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email Address (Order Updates) *</label>
                <input
                  type="email"
                  required
                  placeholder="shahzaib@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Delivery Destination Address */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" /> 2. Delivery Address
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Street Address & House No. *</label>
                <input
                  type="text"
                  required
                  placeholder="House 42, Street 8, Sector F-7/3"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Islamabad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Province *</label>
                  <input
                    type="text"
                    required
                    placeholder="ICT / Punjab / KP"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Postal Code</label>
                  <input
                    type="text"
                    placeholder="44000"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Landmark / Delivery Instructions</label>
                <input
                  type="text"
                  placeholder="Near Safa Gold Mall / Call before delivery"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-700">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" /> Estimated Courier Delivery:
                </span>
                <span className="font-semibold text-slate-900">{shippingInfo.estimatedDays}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" /> 3. Payment Method
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === 'cod'
                      ? 'bg-slate-50 border-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-slate-900"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Cash on Delivery (COD) • Recommended
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Pay cash at your doorstep upon parcel inspection across Pakistan.
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === 'jazzcash'
                      ? 'bg-slate-50 border-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'jazzcash'}
                    onChange={() => setPaymentMethod('jazzcash')}
                    className="mt-1 accent-slate-900"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">JazzCash Mobile Wallet</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Pay via JazzCash mobile account or debit card.
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === 'easypaisa'
                      ? 'bg-slate-50 border-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'easypaisa'}
                    onChange={() => setPaymentMethod('easypaisa')}
                    className="mt-1 accent-slate-900"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Easypaisa Mobile Wallet</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Direct OTP verification on Easypaisa app.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Order Summary & Place Order CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-6 shadow-2xs sticky top-24">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Order Summary ({cart.length})
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const itemPrice = item.product.salePrice ?? item.product.price;
                  return (
                    <div key={item.id} className="flex gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="relative w-14 h-14 bg-white border border-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                        <Image src={item.product.featuredImage} alt={item.product.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                        <div className="text-[11px] text-slate-500 font-mono">
                          EU {item.selectedSize} • {item.selectedColor.name} • x{item.quantity}
                        </div>
                        <div className="text-xs font-bold font-mono text-slate-900 mt-0.5">
                          {formatPKR(itemPrice * item.quantity)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Box */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-700">Apply Coupon Code</label>
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
                    type="button"
                    onClick={handleApplyCoupon}
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
              </div>

              {/* Cost Summary */}
              <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span className="font-mono font-semibold text-slate-900">{formatPKR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Applied</span>
                    <span className="font-mono">-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Nationwide Express Delivery</span>
                  <span className="font-mono font-semibold">
                    {shippingInfo.shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatPKR(shippingInfo.shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-slate-900 font-mono text-xl font-extrabold">{formatPKR(grandTotal)}</span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
