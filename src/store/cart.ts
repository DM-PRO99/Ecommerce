"use client";

import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import type { ProductSummary } from "@/lib/products";

export interface CartItem extends ProductSummary {
  cartQuantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: ProductSummary) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setQuantity: (productId: string, quantity: number) => void;
  totalItems: number;
  subtotal: number;
}

const cartStoreCreator: StateCreator<CartState> = (set, get) => ({
  items: [],
  addItem: (product: ProductSummary) => {
    const current = get().items;
    const existing = current.find((item: CartItem) => item._id === product._id);

    if (existing) {
      set({
        items: current.map((item: CartItem) =>
          item._id === product._id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item,
        ),
      });
    } else {
      set({
        items: [...current, { ...product, cartQuantity: 1 }],
      });
    }
  },
  removeItem: (productId: string) => {
    set({ items: get().items.filter((item: CartItem) => item._id !== productId) });
  },
  clearCart: () => set({ items: [] }),
  setQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((item: CartItem) => item._id !== productId) });
      return;
    }
    set({
      items: get().items.map((item: CartItem) =>
        item._id === productId ? { ...item, cartQuantity: quantity } : item,
      ),
    });
  },
  get totalItems() {
    return get().items.reduce(
      (sum: number, item: CartItem) => sum + item.cartQuantity,
      0,
    );
  },
  get subtotal() {
    return get().items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.cartQuantity,
      0,
    );
  },
});

export const useCartStore = create<CartState>()(
  persist(
    cartStoreCreator,
    {
      name: "ecommerce-cart",
      partialize: (state: CartState) => ({ items: state.items }),
    }
  ),
);
