import { IPaymentProvider, PaymentMethodType } from './types';
import { CashOnDeliveryProvider } from './codProvider';
import { JazzCashProvider } from './jazzcashProvider';
import { EasypaisaProvider } from './easypaisaProvider';
import { StripeProvider } from './stripeProvider';

export class PaymentFactory {
  static getProvider(method: PaymentMethodType | string): IPaymentProvider {
    const cleanMethod = (method || 'cod').toLowerCase();

    switch (cleanMethod) {
      case 'cod':
      case 'cash on delivery':
      case 'cash_on_delivery':
        return new CashOnDeliveryProvider();
      case 'jazzcash':
        return new JazzCashProvider();
      case 'easypaisa':
        return new EasypaisaProvider();
      case 'stripe':
        return new StripeProvider();
      default:
        return new CashOnDeliveryProvider();
    }
  }
}
