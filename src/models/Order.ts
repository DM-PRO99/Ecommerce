import { Schema, model, models, Document, Model } from 'mongoose';

interface OrderItem {
  productId: string;
  name: string;
  reference: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  userEmail?: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    reference: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    userEmail: { type: String },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

const Order: Model<IOrder> = models.Order || model<IOrder>('Order', orderSchema);

export default Order;
