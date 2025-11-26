'use client';

import Link from 'next/link';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Search, Menu, X, User, Settings } from 'lucide-react';
import { useState } from 'react';

import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCartStore, type CartState } from '@/store/cart';

interface LandingNavProps {
  session: Session | null;
}

export function LandingNav({ session }: LandingNavProps) {
  const { t } = useTranslation();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state: CartState) => state.totalItems);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-zinc-200/50 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:py-4">
          {/* Logo and brand */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="group flex items-center gap-2 transition-transform hover:scale-105">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-indigo-600 transition-colors">
                {t('dashboard.nav.brand')}
              </span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/products" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                Productos
              </Link>
              <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                Nosotros
              </Link>
              <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                Contacto
              </Link>
              {session && (
                <Link href="/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  Panel Admin
                </Link>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search button - desktop */}
            <Button variant="ghost" className="hidden h-9 w-9 p-0 lg:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Cart button */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/50 bg-white/50 text-zinc-700 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md"
            >
              <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-1.5 text-[10px] font-bold text-white shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop auth buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-sm font-medium">
                      <Settings className="h-4 w-4 mr-2" />
                      {t('dashboard.nav.goToDashboard')}
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-sm font-semibold shadow-lg shadow-indigo-500/25"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t('dashboard.nav.signOut')}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" className="text-sm font-medium">
                      {t('dashboard.nav.signIn')}
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="primary" className="text-sm font-semibold shadow-lg shadow-indigo-500/25">
                      {t('dashboard.nav.signUp')}
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="lg:hidden h-9 w-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden border-t border-zinc-200/50 bg-white/95 backdrop-blur-xl transition-all duration-300 ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-4 space-y-4">
            <div className="flex flex-col gap-3">
              <Link href="/products" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors py-2">
                Productos
              </Link>
              <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors py-2">
                Nosotros
              </Link>
              <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors py-2">
                Contacto
              </Link>
            </div>
            
            <div className="flex flex-col gap-2 pt-4 border-t border-zinc-200/50">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start text-sm font-medium">
                      <Settings className="h-4 w-4 mr-2" />
                      {t('dashboard.nav.goToDashboard')}
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-sm font-semibold"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t('dashboard.nav.signOut')}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full justify-start text-sm font-medium">
                      {t('dashboard.nav.signIn')}
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="primary" className="w-full text-sm font-semibold">
                      {t('dashboard.nav.signUp')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}


