import { getLatestProducts } from '@/lib/products';
import { LandingNav } from '@/components/dashboard/LandingNav';
import { ProductCard } from '@/components/store/ProductCard';
import { ProductsClient } from '@/components/products/ProductsClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  const products = await getLatestProducts(50); // Get more products for the products page

  return (
    <ProductsClient session={session} products={products} />
  );
}

// Force redeploy to clear Vercel cache
