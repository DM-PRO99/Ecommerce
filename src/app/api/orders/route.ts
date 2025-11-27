import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import dbConnect from '@/db/connect';
import Order from '@/models/Order';

export const runtime = 'nodejs';

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
  shippingInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentInfo?: {
    cardName: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
  };
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export async function POST(request: Request) {
  try {
    console.log('=== NEW ORDER REQUEST ===');
    const body = (await request.json()) as CreateOrderPayload;
    console.log('Order payload:', JSON.stringify(body, null, 2));

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      console.error('No items provided');
      return NextResponse.json({ message: 'No items provided' }, { status: 400 });
    }

    await dbConnect();
    console.log('Database connected for order creation');

    // Generate order number
    const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    const order = await Order.create({
      orderNumber,
      userEmail: body.userEmail,
      items: body.items,
      shippingInfo: body.shippingInfo,
      paymentInfo: {
        ...body.paymentInfo,
        cardNumber: '****-****-****-' + body.paymentInfo?.cardNumber?.slice(-4),
        cardCvc: '***'
      },
      subtotal: body.subtotal,
      shipping: body.shipping,
      tax: body.tax,
      total: body.total,
      status: 'pending',
    });

    console.log('Order created successfully:', orderNumber);

    // Send confirmation email
    if (body.shippingInfo?.email) {
      try {
        await sendOrderConfirmationEmail(orderNumber, body);
        console.log('Order confirmation email sent');
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }
    }

    return NextResponse.json({ 
      order: {
        ...order.toObject(),
        orderNumber
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      message: 'Error creating order',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function sendOrderConfirmationEmail(orderNumber: string, orderData: CreateOrderPayload) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const itemsHtml = orderData.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <div style="font-weight: 600; color: #1f2937;">${item.name}</div>
        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Ref: ${item.reference}</div>
      </td>
      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">$${item.price.toFixed(2)}</td>
      <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb; font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: `"${process.env.APP_NAME || 'Ecommerce Dashboard'}" <${process.env.SMTP_USER}>`,
    to: orderData.shippingInfo!.email,
    subject: `Confirmación de tu pedido ${orderNumber} 🎉`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Pedido</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }
          .logo svg {
            width: 30px;
            height: 30px;
            color: white;
          }
          h1 {
            color: #1f2937;
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
          }
          .order-number {
            background: #e0e7ff;
            color: #6366f1;
            padding: 8px 16px;
            border-radius: 10px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 20px;
          }
          .section {
            margin: 30px 0;
          }
          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e5e7eb;
          }
          .address-info {
            background: #f9fafb;
            padding: 20px;
            border-radius: 10px;
            margin: 15px 0;
          }
          .address-info p {
            margin: 5px 0;
            color: #4b5563;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .items-table th {
            background: #f3f4f6;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
          }
          .totals {
            background: #f9fafb;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            color: #4b5563;
          }
          .total-row.final {
            font-weight: 700;
            font-size: 18px;
            color: #1f2937;
            padding-top: 8px;
            border-top: 2px solid #e5e7eb;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1>¡Pedido Confirmado! 🎉</h1>
            <div class="order-number">Número de pedido: ${orderNumber}</div>
            <p style="color: #6b7280; margin-top: 10px;">Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>
          </div>

          <div class="section">
            <div class="section-title">📍 Información de Envío</div>
            <div class="address-info">
              <p><strong>${orderData.shippingInfo!.firstName} ${orderData.shippingInfo!.lastName}</strong></p>
              <p>${orderData.shippingInfo!.address}</p>
              <p>${orderData.shippingInfo!.city}, ${orderData.shippingInfo!.state} ${orderData.shippingInfo!.zipCode}</p>
              <p>${orderData.shippingInfo!.country}</p>
              <p>📧 ${orderData.shippingInfo!.email}</p>
              <p>📱 ${orderData.shippingInfo!.phone}</p>
            </div>
          </div>

          <div class="section">
            <div class="section-title">📦 Detalles del Pedido</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th style="text-align: center;">Cantidad</th>
                  <th style="text-align: right;">Precio</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">💰 Resumen del Pago</div>
            <div class="totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>$${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Envío:</span>
                <span>$${orderData.shipping.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>IVA (21%):</span>
                <span>$${orderData.tax.toFixed(2)}</span>
              </div>
              <div class="total-row final">
                <span>Total:</span>
                <span>$${orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.</p>
            <p>© 2024 ${process.env.APP_NAME || 'Ecommerce Dashboard'}. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
