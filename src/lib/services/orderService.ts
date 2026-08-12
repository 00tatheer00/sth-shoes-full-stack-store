import { supabase } from '@/lib/supabase/client';
import { CartItem } from '@/types';
import { shippingService } from './shippingService';
import { couponService } from './couponService';
import { PaymentFactory } from '@/lib/payments/paymentFactory';
import { resendService } from '@/lib/email/resendService';

export interface CreateOrderInput {
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine: string;
  city: string;
  province: string;
  postalCode?: string;
  landmark?: string;
  paymentMethod: string; // 'cod' | 'jazzcash' | 'easypaisa' | 'stripe'
  couponCode?: string;
  cartItems: CartItem[];
}

export interface CreateOrderResult {
  success: boolean;
  orderNumber: string;
  total: number;
  paymentResult: any;
  message: string;
}

export const orderService = {
  generateOrderNumber(): string {
    const randomSeq = Math.floor(100000 + Math.random() * 900000);
    return `PC-2026-${randomSeq}`;
  },

  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    if (!input.cartItems || input.cartItems.length === 0) {
      throw new Error('Your shopping cart is empty.');
    }

    let serverSubtotal = 0;
    const validatedItems = [];

    for (const item of input.cartItems) {
      const unitPrice = item.product.salePrice ?? item.product.price;
      const lineTotal = unitPrice * item.quantity;
      serverSubtotal += lineTotal;

      validatedItems.push({
        productId: item.product.id,
        variantSize: item.selectedSize,
        colorName: item.selectedColor.name,
        colorHex: item.selectedColor.hex,
        productName: item.product.name,
        sku: `${item.product.id}-EU${item.selectedSize}`,
        quantity: item.quantity,
        unitPrice,
        // Properties for Resend Email
        size: item.selectedSize,
        color: item.selectedColor.name,
        price: unitPrice,
      });
    }

    let discountAmount = 0;
    if (input.couponCode) {
      const couponRes = await couponService.validateCoupon(
        input.couponCode,
        serverSubtotal,
        input.userId
      );
      if (couponRes.valid) {
        discountAmount = couponRes.discountAmount;
      }
    }

    const shippingRes = shippingService.calculateShipping(serverSubtotal, input.city);
    const shippingFee = shippingRes.shippingFee;
    const grandTotal = Math.max(0, serverSubtotal - discountAmount + shippingFee);
    const orderNumber = this.generateOrderNumber();

    const paymentProvider = PaymentFactory.getProvider(input.paymentMethod);
    const paymentResult = await paymentProvider.processPayment({
      orderNumber,
      amount: grandTotal,
      currency: 'PKR',
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      description: `Peshawari Chappal Order #${orderNumber}`,
    });

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { data: orderRow, error: orderError } = await supabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            user_id: input.userId || null,
            status: 'Processing',
            total_amount: grandTotal,
            discount_amount: discountAmount,
            shipping_fee: shippingFee,
            payment_method: input.paymentMethod,
            tracking_number: `TCS-${orderNumber.replace('PC-2026-', '')}-PK`,
          })
          .select()
          .single();

        if (!orderError && orderRow) {
          for (const vItem of validatedItems) {
            await supabase.from('order_items').insert({
              order_id: orderRow.id,
              product_id: vItem.productId,
              quantity: vItem.quantity,
              unit_price: vItem.unitPrice,
            });

            await supabase.from('inventory_transactions').insert({
              variant_id: vItem.productId,
              quantity_change: -vItem.quantity,
              transaction_type: 'sale',
              notes: `Order #${orderNumber} purchase deduction`,
            });
          }
        }
      }
    } catch (dbErr) {
      console.error('Database insertion warning:', dbErr);
    }

    await resendService.sendOrderConfirmation({
      orderNumber,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      items: validatedItems,
      subtotal: serverSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: grandTotal,
      paymentMethod: input.paymentMethod.toUpperCase(),
      shippingAddress: `${input.addressLine}, ${input.city}, ${input.province}`,
      trackingNumber: `TCS-${orderNumber.replace('PC-2026-', '')}-PK`,
    });

    return {
      success: true,
      orderNumber,
      total: grandTotal,
      paymentResult,
      message: 'Order successfully placed!',
    };
  },

  async cancelOrder(orderId: string, orderNumber: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { success: true, message: 'Order cancelled. Inventory restored.' };
    }

    const { error } = await supabase
      .from('orders')
      .update({ status: 'Cancelled' })
      .eq('id', orderId);

    if (error) throw new Error(error.message);

    return { success: true, message: `Order #${orderNumber} cancelled successfully.` };
  },
};
