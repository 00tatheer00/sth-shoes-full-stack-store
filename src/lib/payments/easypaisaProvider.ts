import { IPaymentProvider, PaymentRequest, PaymentResult, PaymentVerificationResult } from './types';

export class EasypaisaProvider implements IPaymentProvider {
  name: 'easypaisa' = 'easypaisa';

  async processPayment(request: PaymentRequest): Promise<PaymentResult> {
    const storeId = process.env.EASYPAISA_STORE_ID || 'MOCK_EASYPAISA_STORE';
    return {
      success: true,
      transactionId: `EP-${request.orderNumber}-${Date.now()}`,
      status: 'pending',
      redirectUrl: `https://easypay.easypaisa.com.pk/easypay/Index.jsf?storeId=${storeId}`,
      message: 'Easypaisa digital wallet session created.',
    };
  }

  async verifyPayment(payload: any): Promise<PaymentVerificationResult> {
    const isSuccess = payload?.auth_status === '0000';
    return {
      verified: isSuccess,
      orderNumber: payload.orderRefNumber || payload.orderNumber,
      transactionId: payload.transactionRefNumber || `EP-${Date.now()}`,
      status: isSuccess ? 'completed' : 'failed',
      amount: Number(payload.amount || 0),
    };
  }
}
