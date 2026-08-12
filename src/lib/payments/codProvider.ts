import { IPaymentProvider, PaymentRequest, PaymentResult, PaymentVerificationResult } from './types';

export class CashOnDeliveryProvider implements IPaymentProvider {
  name: 'cod' = 'cod';

  async processPayment(request: PaymentRequest): Promise<PaymentResult> {
    // Cash on Delivery is automatically approved as a pending COD order
    return {
      success: true,
      transactionId: `COD-${request.orderNumber}-${Date.now()}`,
      status: 'pending',
      message: 'Cash on Delivery order successfully placed. Payment will be collected upon delivery.',
    };
  }

  async verifyPayment(payload: any): Promise<PaymentVerificationResult> {
    return {
      verified: true,
      orderNumber: payload.orderNumber,
      transactionId: payload.transactionId || `COD-VERIFIED-${Date.now()}`,
      status: 'completed',
      amount: payload.amount,
    };
  }
}
