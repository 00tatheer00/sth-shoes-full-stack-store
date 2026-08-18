import { supabase } from '@/lib/supabase/client';
import { CartItem, Order, OrderItem } from '@/types';
import { shippingService } from './shippingService';
import { couponService } from './couponService';
import { PaymentFactory } from '@/lib/payments/paymentFactory';
import { resendService } from '@/lib/email/resendService';
import { dataEngine } from './dataEngine';

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
    const validatedItems: OrderItem[] = [];

    for (const item of input.cartItems) {
      const unitPrice = item.product.salePrice ?? item.product.price;
      const lineTotal = unitPrice * item.quantity;
      serverSubtotal += lineTotal;

      validatedItems.push({
        productId: item.product.id,
        productName: item.product.name,
        image: item.product.featuredImage,
        color: item.selectedColor.name,
        size: item.selectedSize,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        quantity: item.quantity,
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

    // Save to persistent dataEngine
    dataEngine.createOrder({
      orderNumber,
      userId: input.userId,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      items: validatedItems,
      shippingAddress: {
        id: `addr-${Date.now()}`,
        title: 'Delivery Address',
        fullName: input.customerName,
        phone: input.customerPhone,
        addressLine: input.addressLine,
        city: input.city,
        province: input.province,
        postalCode: input.postalCode || '44000',
        isDefault: true,
      },
      paymentMethod: (input.paymentMethod === 'cod' ? 'Cash on Delivery' : input.paymentMethod.toUpperCase()) as any,
      paymentStatus: input.paymentMethod === 'cod' ? 'Unpaid' : 'Paid',
      subtotal: serverSubtotal,
      shippingFee,
      discount: discountAmount,
      total: grandTotal,
      trackingNumber: `TCS-${orderNumber.replace('PC-2026-', '')}-PK`,
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
              product_id: vItem.productId || vItem.productName,
              quantity: vItem.quantity,
              unit_price: vItem.price,
            });
          }
        }
      }
    } catch (dbErr) {
      console.error('Supabase sync notice:', dbErr);
    }

    try {
      await resendService.sendOrderConfirmation({
        orderNumber,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        items: validatedItems.map((i) => ({
          productName: i.productName,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal: serverSubtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: grandTotal,
        paymentMethod: input.paymentMethod.toUpperCase(),
        shippingAddress: `${input.addressLine}, ${input.city}, ${input.province}`,
        trackingNumber: `TCS-${orderNumber.replace('PC-2026-', '')}-PK`,
      });
    } catch {}

    return {
      success: true,
      orderNumber,
      total: grandTotal,
      paymentResult,
      message: 'Order successfully placed!',
    };
  },

  async getOrders(): Promise<Order[]> {
    return dataEngine.getOrders();
  },

  async getOrderById(id: string): Promise<Order | null> {
    return dataEngine.getOrderById(id);
  },

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    return dataEngine.updateOrderStatus(orderId, status);
  },

  async cancelOrder(orderId: string, orderNumber: string) {
    dataEngine.updateOrderStatus(orderId, 'Cancelled');
    return { success: true, message: `Order #${orderNumber} cancelled successfully.` };
  },
};
