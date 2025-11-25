import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { getLatestProducts } from '@/lib/products';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  const products = await getLatestProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardOverview session={session} products={products} />
    </div>
  );
}
