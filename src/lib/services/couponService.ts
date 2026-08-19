import { supabase } from '@/lib/supabase/client';
import { dataEngine } from './dataEngine';

export interface CouponValidationResult {
  valid: boolean;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10% or 1000 for Rs 1000
  discountAmount: number;
  message: string;
}

export const couponService = {
  async validateCoupon(
    code: string,
    subtotal: number,
    userId?: string
  ): Promise<CouponValidationResult> {
    const cleanCode = (code || '').trim().toUpperCase();

    if (!cleanCode) {
      return {
        valid: false,
        code: '',
        discountType: 'percentage',
        discountValue: 0,
        discountAmount: 0,
        message: 'Please enter a coupon code.',
      };
    }

    // 1. Check in persistent dataEngine
    const match = dataEngine.getCouponByCode(cleanCode);
    if (match) {
      if (!match.active) {
        return {
          valid: false,
          code: cleanCode,
          discountType: 'percentage',
          discountValue: 0,
          discountAmount: 0,
          message: `Coupon ${cleanCode} is currently disabled.`,
        };
      }

      if (match.minOrder && subtotal < match.minOrder) {
        return {
          valid: false,
          code: cleanCode,
          discountType: 'percentage',
          discountValue: match.discount,
          discountAmount: 0,
          message: `Coupon ${cleanCode} requires a minimum order of Rs. ${match.minOrder.toLocaleString()}.`,
        };
      }

      if (match.validUntil && new Date(match.validUntil) < new Date()) {
        return {
          valid: false,
          code: cleanCode,
          discountType: 'percentage',
          discountValue: 0,
          discountAmount: 0,
          message: `Coupon ${cleanCode} has expired.`,
        };
      }

      const discountAmount = Math.round((subtotal * match.discount) / 100);
      return {
        valid: true,
        code: cleanCode,
        discountType: 'percentage',
        discountValue: match.discount,
        discountAmount,
        message: `${match.discount}% Promo Discount applied!`,
      };
    }

    return {
      valid: false,
      code: cleanCode,
      discountType: 'percentage',
      discountValue: 0,
      discountAmount: 0,
      message: 'Invalid coupon code. Try PESHAWAR10 or TATHEER15',
    };
  },
};
