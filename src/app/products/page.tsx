import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { getLatestProducts } from '@/lib/products';
import { ProductsClient } from '@/components/products/ProductsClient';

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  const products = await getLatestProducts(16);

  return <ProductsClient session={session} products={products} />;
}
