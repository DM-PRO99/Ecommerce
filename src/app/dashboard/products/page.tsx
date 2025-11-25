'use client';

import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  reference: string;
  imageUrl: string;
  createdAt: string;
}

type SortBy = 'createdAt' | 'price';
type SortDir = 'desc' | 'asc';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let list = [...products];

    if (query) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.reference.toLowerCase().includes(query),
      );
    }

    if (onlyLowStock) {
      list = list.filter((p) => p.quantity <= 5);
    }

    list.sort((a, b) => {
      let compare = 0;
      if (sortBy === 'createdAt') {
        compare = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        compare = a.price - b.price;
      }
      return sortDir === 'asc' ? compare : -compare;
    });

    return list;
  }, [products, search, sortBy, sortDir, onlyLowStock]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">Productos</h1>
          <p className="mt-1 text-xs text-zinc-500">
            Gestión de inventario para tu catálogo de relojes y tecnología.
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Button variant="primary" className="h-9 px-4 text-xs">
            Añadir producto
          </Button>
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            placeholder="Buscar por nombre o referencia"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="w-full sm:max-w-xs"
          />
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <span className="hidden sm:inline">Ordenar por</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="h-9 rounded-lg border border-zinc-200 bg-white px-2 text-xs text-zinc-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              <option value="createdAt">Fecha</option>
              <option value="price">Precio</option>
            </select>
            <select
              value={sortDir}
              onChange={(e) => setSortDir(e.target.value as SortDir)}
              className="h-9 rounded-lg border border-zinc-200 bg-white px-2 text-xs text-zinc-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-600">
          <input
            type="checkbox"
            checked={onlyLowStock}
            onChange={(e) => setOnlyLowStock(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
          />
          Solo stock bajo (≤ 5)
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 shadow-sm backdrop-blur-md">
        <table className="min-w-full divide-y divide-zinc-200 text-xs">
          <thead className="bg-zinc-50/80">
            <tr className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              <th scope="col" className="py-3 pl-4 pr-3 text-left sm:pl-6">
                Producto
              </th>
              <th scope="col" className="px-3 py-3 text-left">
                Ref.
              </th>
              <th scope="col" className="px-3 py-3 text-left">
                Precio
              </th>
              <th scope="col" className="px-3 py-3 text-left">
                Stock
              </th>
              <th scope="col" className="px-3 py-3 text-left">
                Creado
              </th>
              <th scope="col" className="py-3 pl-3 pr-4 text-right sm:pr-6">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white/80">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-xs text-zinc-500">
                  No hay productos que coincidan con los filtros actuales.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-zinc-50/80">
                  <td className="whitespace-nowrap py-3 pl-4 pr-3 text-xs sm:pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                        <img
                          className="h-full w-full object-cover"
                          src={product.imageUrl}
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs text-zinc-500">
                    {product.reference}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs text-zinc-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs">
                    <span
                      className={
                        product.quantity <= 5
                          ? 'rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-600'
                          : 'rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600'
                      }
                    >
                      {product.quantity}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-[11px] text-zinc-500">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-3 pr-4 text-right text-[11px] font-medium sm:pr-6">
                    <button
                      type="button"
                      onClick={() => router.push(`/dashboard/products/${product._id}`)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Editar
                    </button>
                    <span className="mx-1 text-zinc-300">·</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
