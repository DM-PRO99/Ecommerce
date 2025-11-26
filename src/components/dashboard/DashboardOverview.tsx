'use client';

import type { Session } from 'next-auth';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart3,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

import type { ProductSummary } from '@/lib/products';

interface DashboardOverviewProps {
  session: Session | null;
  products: ProductSummary[];
}

export function DashboardOverview({ session, products }: DashboardOverviewProps) {
  const { t } = useTranslation();
  const userName = session?.user?.name || t('dashboard.userInfo.missingName');
  const userEmail = session?.user?.email || t('dashboard.userInfo.missingEmail');

  // Mock stats for demonstration
  const stats = {
    totalRevenue: 45678,
    totalOrders: 1234,
    totalCustomers: 567,
    totalProducts: products.length,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    customersGrowth: 15.2,
    productsGrowth: 5.7
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 mb-2">
                {t('dashboard.title')}, <span className="text-indigo-600">{userName.split(' ')[0]}</span>
              </h1>
              <p className="text-lg text-zinc-600">
                {t('dashboard.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard/products/new"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('dashboard.recentProducts.emptyCta')}
              </Link>
              <button className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-zinc-200/50 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition-all duration-300">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6 hover:shadow-2xl hover:shadow-zinc-900/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                {stats.revenueGrowth}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-zinc-900">${stats.totalRevenue.toLocaleString()}</h3>
            <p className="text-sm text-zinc-600 mt-1">Ingresos totales</p>
          </div>

          {/* Orders Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6 hover:shadow-2xl hover:shadow-zinc-900/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                {stats.ordersGrowth}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-zinc-900">{stats.totalOrders.toLocaleString()}</h3>
            <p className="text-sm text-zinc-600 mt-1">Pedidos totales</p>
          </div>

          {/* Customers Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6 hover:shadow-2xl hover:shadow-zinc-900/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                {stats.customersGrowth}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-zinc-900">{stats.totalCustomers.toLocaleString()}</h3>
            <p className="text-sm text-zinc-600 mt-1">Clientes totales</p>
          </div>

          {/* Products Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6 hover:shadow-2xl hover:shadow-zinc-900/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                {stats.productsGrowth}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-zinc-900">{stats.totalProducts}</h3>
            <p className="text-sm text-zinc-600 mt-1">Productos totales</p>
          </div>
        </div>

        {/* User Info & Recent Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-zinc-900">{t('dashboard.userInfo.title')}</h2>
                <Activity className="h-5 w-5 text-zinc-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">{userName}</p>
                    <p className="text-sm text-zinc-600">{userEmail}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-200/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600">Estado</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      Activo
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-3">
                    <span className="text-zinc-600">Rol</span>
                    <span className="text-zinc-900 font-medium">Administrador</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-3">
                    <span className="text-zinc-600">Miembro desde</span>
                    <span className="text-zinc-900 font-medium">Ene 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Products */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-zinc-900">{t('dashboard.recentProducts.title')}</h2>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-zinc-400" />
                  <Link 
                    href="/dashboard/products"
                    className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
                  >
                    {t('dashboard.recentProducts.viewAll')}
                  </Link>
                </div>
              </div>
              
              {products.length > 0 ? (
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product._id} className="flex items-center justify-between p-4 bg-zinc-50/50 rounded-xl hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-xl flex items-center justify-center">
                          <Package className="h-6 w-6 text-zinc-600" />
                        </div>
                        <div>
                          <p className="font-medium text-zinc-900">{product.name}</p>
                          <p className="text-sm text-zinc-600">{t('dashboard.recentProducts.reference')}: {product.reference}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-zinc-900">${product.price}</p>
                          <p className="text-sm text-zinc-600">{t('dashboard.recentProducts.stock')}: {product.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                  <p className="text-zinc-600 mb-4">{t('dashboard.recentProducts.emptyTitle')}</p>
                  <Link
                    href="/dashboard/products/new"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('dashboard.recentProducts.emptyCta')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

