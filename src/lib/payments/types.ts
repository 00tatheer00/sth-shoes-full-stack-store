export type PaymentMethodType = 'cod' | 'jazzcash' | 'easypaisa' | 'stripe';

export interface PaymentRequest {
  orderNumber: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  redirectUrl?: string;
  message: string;
}

export interface PaymentVerificationResult {
  verified: boolean;
  orderNumber: string;
  transactionId: string;
  status: 'completed' | 'failed' | 'refunded';
  amount: number;
}

export interface IPaymentProvider {
  name: PaymentMethodType;
  processPayment(request: PaymentRequest): Promise<PaymentResult>;
  verifyPayment(payload: any): Promise<PaymentVerificationResult>;
}
