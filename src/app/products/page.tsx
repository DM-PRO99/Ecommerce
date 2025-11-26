import { getLatestProducts } from '@/lib/products';
import { LandingNav } from '@/components/dashboard/LandingNav';
import { ProductCard } from '@/components/store/ProductCard';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  const products = await getLatestProducts(50); // Get more products for the products page

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative">
        <LandingNav session={session} />
        
        {/* Header */}
        <div className="relative px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-zinc-900 mb-4">
                Nuestra Colección
              </h1>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                Descubre nuestra selección curada de relojes y tecnología premium. 
                Diseñados para quienes buscan estilo y funcionalidad.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25">
                Todos
              </button>
              <button className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-zinc-200/50 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition-all">
                Relojes
              </button>
              <button className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-zinc-200/50 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition-all">
                Tecnología
              </button>
              <button className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-zinc-200/50 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition-all">
                Accesorios
              </button>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full mb-4">
                  <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  No hay productos disponibles
                </h3>
                <p className="text-zinc-600 mb-6">
                  Pronto tendremos nuevos productos para ti
                </p>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all">
                  Notificarme cuando lleguen
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Load More */}
            {products.length > 0 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-white/80 backdrop-blur-sm border border-zinc-200/50 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition-all">
                  Cargar más productos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
