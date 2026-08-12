import { IPaymentProvider, PaymentRequest, PaymentResult, PaymentVerificationResult } from './types';

export class StripeProvider implements IPaymentProvider {
  name: 'stripe' = 'stripe';

  async processPayment(request: PaymentRequest): Promise<PaymentResult> {
    return {
      success: true,
      transactionId: `ST-${request.orderNumber}-${Date.now()}`,
      status: 'pending',
      redirectUrl: `/checkout/stripe-checkout?orderNumber=${request.orderNumber}`,
      message: 'Stripe payment session created.',
    };
  }

  async verifyPayment(payload: any): Promise<PaymentVerificationResult> {
    const isPaid = payload?.payment_status === 'paid';
    return {
      verified: isPaid,
      orderNumber: payload.metadata?.orderNumber || payload.orderNumber,
      transactionId: payload.id || `ST-${Date.now()}`,
      status: isPaid ? 'completed' : 'failed',
      amount: Number(payload.amount_total || 0) / 100,
    };
  }
}
