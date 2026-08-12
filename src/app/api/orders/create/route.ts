import { NextResponse } from 'next/server';
import { orderService } from '@/lib/services/orderService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await orderService.createOrder(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server-side order creation failed.' },
      { status: 400 }
    );
  }
}
