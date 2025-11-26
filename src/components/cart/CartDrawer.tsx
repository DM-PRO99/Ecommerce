"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight, X, ShoppingCart } from "lucide-react";

import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet } from "@/components/ui/sheet";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal, removeItem, clearCart } = useCartStore();
  const router = useRouter();

  const hasItems = useMemo(() => items.length > 0, [items]);

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100">
              <ShoppingCart className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-zinc-900">Carrito</h2>
              <p className="text-xs text-zinc-500">Revisa y finaliza tu pedido</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasItems && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Vaciar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {!hasItems && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-full mb-4">
                <ShoppingCart className="h-6 w-6 text-zinc-400" />
              </div>
              <p className="text-sm text-zinc-500 mb-4">Tu carrito está vacío.</p>
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    onClose();
                    router.push('/products');
                  }}
                  className="w-full px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Descubrir productos
                </Button>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="w-full text-sm"
                >
                  Seguir navegando
                </Button>
              </div>
            </div>
          )}

          {items.map((item) => (
            <Card key={item._id} className="border-zinc-200/80 bg-white/90">
              <CardHeader className="items-start gap-2">
                <CardTitle className="text-sm font-semibold tracking-tight">
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3 pt-0">
                <div className="flex flex-col text-xs text-zinc-500">
                  <span>Ref: {item.reference}</span>
                  <span>
                    {item.cartQuantity} x ${item.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-900">
                    ${(item.price * item.cartQuantity).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item._id)}
                    className="rounded-full border border-zinc-200 p-1 text-zinc-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {hasItems && (
          <footer className="border-t border-zinc-200 bg-white/80 px-6 py-4 backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-zinc-500">Subtotal</span>
              <span className="font-semibold text-zinc-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Envío</span>
                <span>${subtotal > 0 ? '9.99' : '0.00'}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>IVA (21%)</span>
                <span>${(subtotal * 0.21).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-zinc-900 mb-4 pt-2 border-t border-zinc-200">
              <span>Total</span>
              <span>${(subtotal + (subtotal > 0 ? 9.99 : 0) + (subtotal * 0.21)).toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <Button 
                className="w-full" 
                onClick={handleCheckout}
              >
                <span className="flex items-center justify-center">
                  Proceder al checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  onClose();
                  router.push('/products');
                }}
                className="w-full border border-zinc-200/50 bg-white/50 backdrop-blur-sm hover:bg-zinc-50"
              >
                <span className="flex items-center justify-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Seguir comprando
                </span>
              </Button>
            </div>
          </footer>
        )}
      </div>
    </Sheet>
  );
}
