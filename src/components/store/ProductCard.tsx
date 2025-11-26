"use client";

import { useCartStore } from "@/store/cart";
import type { ProductSummary } from "@/lib/products";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Card className="group relative flex h-full flex-col border-zinc-200/30 bg-gradient-to-br from-white to-zinc-50/30 shadow-lg shadow-zinc-900/5 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/10 hover:-translate-y-1">
      {/* Badge for new/featured */}
      <div className="absolute left-4 top-4 z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/90 px-3 py-1.5 backdrop-blur-sm shadow-lg">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-zinc-700">Nuevo</span>
        </div>
      </div>

      {/* Quick actions overlay */}
      <div className="absolute right-4 top-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-transform"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-transform"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Product image */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        
        {/* Stock indicator */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/90 px-2.5 py-1 backdrop-blur-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-zinc-700">
              Stock: {product.quantity}
            </span>
          </div>
        </div>
      </div>

      {/* Product info */}
      <CardHeader className="pb-2 pt-4">
        <div className="space-y-2">
          <CardTitle className="line-clamp-2 text-base font-bold tracking-tight text-zinc-900 leading-tight group-hover:text-indigo-600 transition-colors">
            {product.name}
          </CardTitle>
          <CardDescription className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">
            Ref. {product.reference}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="mt-auto pb-4">
        <div className="flex items-center justify-between gap-3">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-lg font-bold text-zinc-900">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-3 w-3 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-zinc-500 ml-1">(4.8)</span>
            </div>
          </div>

          {/* Add to cart button */}
          <Button
            variant="primary"
            className="group/btn relative overflow-hidden px-5 py-2.5 text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105"
            onClick={() => addItem(product)}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Añadir
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 transition-opacity group-hover/btn:opacity-100" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
