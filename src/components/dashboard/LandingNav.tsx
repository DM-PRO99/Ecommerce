'use client';

import Link from 'next/link';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react';
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
  const totalItems = useCartStore((state: CartState) => state.totalItems);

  return (
    <>
      <nav className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold tracking-tight text-indigo-600">
              {t('dashboard.nav.brand')}
            </span>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-md"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-medium text-white">
                  {totalItems}
                </span>
              )}
            </button>
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="hidden text-xs md:inline-flex">
                    {t('dashboard.nav.goToDashboard')}
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-xs"
                >
                  {t('dashboard.nav.signOut')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-xs">
                    {t('dashboard.nav.signIn')}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" className="text-xs">
                    {t('dashboard.nav.signUp')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}


