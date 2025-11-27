import { NextResponse } from 'next/server';

import dbConnect from '@/db/connect';
import Order from '@/models/Order';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await dbConnect();

    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const orders = await Order.find({
      createdAt: { $gte: yesterday, $lte: now },
    }).lean();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    const productMap = new Map<string, { name: string; reference: string; quantity: number; revenue: number }>();

    for (const order of orders) {
      for (const item of order.items) {
        const key = item.productId;
        const existing = productMap.get(key) || {
          name: item.name,
          reference: item.reference,
          quantity: 0,
          revenue: 0,
        };
        existing.quantity += item.quantity;
        existing.revenue += item.quantity * item.price;
        productMap.set(key, existing);
      }
    }

    const topProducts = Array.from(productMap.entries())
      .map(([productId, value]) => ({ productId, ...value }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    const report = {
      from: yesterday.toISOString(),
      to: now.toISOString(),
      totalOrders,
      totalRevenue,
      topProducts,
    };

    // Aquí podrías llamar a un email service para enviar el reporte
    // await sendDailyReportEmail(report)

    return NextResponse.json(report);
  } catch (error) {
    console.error('Error generating daily report:', error);
    return NextResponse.json({ message: 'Error generating report' }, { status: 500 });
  }
}
