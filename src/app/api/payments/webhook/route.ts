import { NextResponse } from 'next/server';
import { PaymentFactory } from '@/lib/payments/paymentFactory';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const providerName = body.provider || 'cod';
    const provider = PaymentFactory.getProvider(providerName);

    const verification = await provider.verifyPayment(body);

    if (verification.verified) {
      // In production, update order status to Confirmed in Supabase DB
      return NextResponse.json({ success: true, verification });
    } else {
      return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
