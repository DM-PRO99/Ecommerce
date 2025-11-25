import { NextResponse } from 'next/server';

import dbConnect from '@/db/connect';
import Order from '@/models/Order';

interface OrderItemPayload {
  productId: string;
  name: string;
  reference: string;
  quantity: number;
  price: number;
}

interface CreateOrderPayload {
  userEmail?: string;
  items: OrderItemPayload[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderPayload;

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ message: 'No items provided' }, { status: 400 });
    }

    await dbConnect();

    const total = body.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      userEmail: body.userEmail,
      items: body.items,
      total,
      status: 'pending',
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
  }
}
