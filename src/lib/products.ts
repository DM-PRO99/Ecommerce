import dbConnect from '@/db/connect';
import Product from '@/models/Product';

export interface ProductSummary {
  _id: string;
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
    .lean();

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


