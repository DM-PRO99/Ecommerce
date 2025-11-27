import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth-options';
import { LandingNav } from '@/components/dashboard/LandingNav';
import { getLatestProducts } from '@/lib/products';
import { Hero } from '@/components/store/Hero';
import { ProductCard } from '@/components/store/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const products = await getLatestProducts(8);

  return (
    <div className="min-h-screen bg-zinc-50">
      <LandingNav session={session} />
      <main>
        <Hero />
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Selección destacada
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Relojes y tecnología curados para un estilo moderno y funcional.
              </p>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="border-zinc-300 text-zinc-700 hover:bg-zinc-50">
                Ver todos los productos →
              </Button>
            </Link>
          </div>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-zinc-500 mb-4">
                Aún no hay productos publicados. Crea tus primeros relojes o gadgets desde el
                panel de administración.
              </p>
              {session && (
                <Link href="/dashboard">
                  <Button variant="primary">Ir al Dashboard</Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/products">
                  <Button variant="primary" className="px-8 py-3">
                    Explorar tienda completa
                  </Button>
                </Link>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
