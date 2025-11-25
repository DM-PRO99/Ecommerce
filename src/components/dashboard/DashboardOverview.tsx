'use client';

import type { Session } from 'next-auth';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import type { ProductSummary } from '@/lib/products';

interface DashboardOverviewProps {
  session: Session | null;
  products: ProductSummary[];
}

export function DashboardOverview({ session, products }: DashboardOverviewProps) {
  const { t } = useTranslation();
  const userName = session?.user?.name || t('dashboard.userInfo.missingName');
  const userEmail = session?.user?.email || t('dashboard.userInfo.missingEmail');

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <p className="mt-1 text-sm text-gray-600">{t('dashboard.subtitle')}</p>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">{t('dashboard.userInfo.title')}</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{t('dashboard.userInfo.subtitle')}</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('dashboard.userInfo.name')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userName}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{t('dashboard.userInfo.email')}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userEmail}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{t('dashboard.recentProducts.title')}</h3>
              <p className="text-sm text-gray-500">{t('dashboard.recentProducts.subtitle')}</p>
            </div>
            <Link
              href="/dashboard/products"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('dashboard.recentProducts.viewAll')}
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
              <p className="text-base font-medium text-gray-900">{t('dashboard.recentProducts.emptyTitle')}</p>
              <p className="mt-2 text-sm text-gray-500">
                {t('dashboard.recentProducts.emptyDescription')}
              </p>
              <Link
                href="/dashboard/products/new"
                className="mt-4 inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {t('dashboard.recentProducts.emptyCta')}
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow"
                >
                  <div className="relative h-40 w-full bg-gray-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">
                        {t('dashboard.recentProducts.reference')}: {product.reference}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <dl>
                        <dt className="text-xs uppercase text-gray-500">{t('dashboard.recentProducts.price')}</dt>
                        <dd className="text-base font-semibold text-gray-900">
                          ${product.price.toFixed(2)}
                        </dd>
                      </dl>
                      <dl className="text-right">
                        <dt className="text-xs uppercase text-gray-500">{t('dashboard.recentProducts.stock')}</dt>
                        <dd className="text-base font-semibold text-gray-900">{product.quantity}</dd>
                      </dl>
                    </div>
                    <Link
                      href={`/dashboard/products/${product._id}`}
                      className="mt-auto inline-flex items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      {t('dashboard.recentProducts.viewDetails')}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

