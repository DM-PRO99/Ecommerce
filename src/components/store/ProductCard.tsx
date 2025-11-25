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
    <Card className="group flex h-full flex-col border-zinc-200/80 bg-white/80">
      <div className="relative overflow-hidden rounded-2xl px-4 pt-4">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="line-clamp-1 text-sm font-semibold tracking-tight text-zinc-900">
          {product.name}
        </CardTitle>
        <CardDescription className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">
          Ref. {product.reference}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex items-center justify-between gap-3 pt-1">
        <span className="text-sm font-semibold text-zinc-900">
          ${product.price.toFixed(2)}
        </span>
        <Button
          variant="primary"
          className="h-9 px-3 text-xs"
          onClick={() => addItem(product)}
        >
          Añadir al carrito
        </Button>
      </CardContent>
    </Card>
  );
}
