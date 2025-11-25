import dbConnect from '@/db/connect';
import Product from '@/models/Product';
import type { Document } from 'mongoose';

export interface ProductSummary {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  reference: string;
  imageUrl: string;
  createdAt: Date;
}

interface ProductDocument extends Document {
  name: string;
  price: number;
  quantity: number;
  reference: string;
  imageUrl: string;
  createdAt: Date;
}

export async function getLatestProducts(limit = 6): Promise<ProductSummary[]> {
  await dbConnect();

  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<ProductDocument[]>();

  return products.map((product) => ({
    _id: product._id.toString(),
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    reference: product.reference,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt,
  }));
}


