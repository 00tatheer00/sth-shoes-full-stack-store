import { supabase } from '@/lib/supabase/client';

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

    // Default hardcoded fallback for PESHAWAR10 & TATHEER15
    if (cleanCode === 'PESHAWAR10') {
      const discountAmount = Math.round((subtotal * 10) / 100);
      return {
        valid: true,
        code: 'PESHAWAR10',
        discountType: 'percentage',
        discountValue: 10,
        discountAmount,
        message: '10% Heritage Discount applied successfully!',
      };
    } else if (cleanCode === 'TATHEER15') {
      if (subtotal < 8000) {
        return {
          valid: false,
          code: 'TATHEER15',
          discountType: 'percentage',
          discountValue: 15,
          discountAmount: 0,
          message: 'Coupon TATHEER15 requires a minimum order of Rs. 8,000.',
        };
      }
      const discountAmount = Math.round((subtotal * 15) / 100);
      return {
        valid: true,
        code: 'TATHEER15',
        discountType: 'percentage',
        discountValue: 15,
        discountAmount,
        message: '15% Royal Patron Discount applied!',
      };
    }

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { data, error } = await supabase
          .from('coupons')
          .select('*')
          .eq('code', cleanCode)
          .eq('active', true)
          .single();

        if (error || !data) {
          return {
            valid: false,
            code: cleanCode,
            discountType: 'percentage',
            discountValue: 0,
            discountAmount: 0,
            message: 'Invalid or expired promo code.',
          };
        }

        // Expiry check
        if (data.valid_until && new Date(data.valid_until) < new Date()) {
          return {
            valid: false,
            code: cleanCode,
            discountType: 'percentage',
            discountValue: 0,
            discountAmount: 0,
            message: 'This promo code has expired.',
          };
        }

        const discountAmount = Math.round((subtotal * data.discount_percent) / 100);
        return {
          valid: true,
          code: cleanCode,
          discountType: 'percentage',
          discountValue: data.discount_percent,
          discountAmount,
          message: `${data.discount_percent}% discount applied!`,
        };
      }
    } catch (e) {
      console.error('Coupon validation error:', e);
    }

    return {
      valid: false,
      code: cleanCode,
      discountType: 'percentage',
      discountValue: 0,
      discountAmount: 0,
      message: 'Invalid coupon code. Try PESHAWAR10',
    };
  },
};
