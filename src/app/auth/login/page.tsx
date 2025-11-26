'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [magicEmail, setMagicEmail] = useState('');
  const [magicSent, setMagicSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: identifier,
        password,
      });

      if (result?.error) {
        setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMagicSent(false);

    try {
      const result = await signIn('email', {
        redirect: false,
        email: magicEmail,
      });

      if (result?.error) {
        setError('Error al enviar el enlace mágico. Por favor, verifica tu email.');
      } else {
        setMagicSent(true);
      }
    } catch (error) {
      setError('Error al enviar el enlace mágico. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-zinc-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 left-0 h-96 w-96 bg-gradient-radial from-indigo-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-gradient-radial from-purple-500/10 to-transparent blur-3xl" />
      
      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 shadow-xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Bienvenido de nuevo</h1>
          <p className="text-zinc-600">Inicia sesión para acceder a tu dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-zinc-200/50 shadow-2xl shadow-zinc-900/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Email o Nombre de Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-zinc-400 hover:text-zinc-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-zinc-400 hover:text-zinc-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200/50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-base font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Iniciar sesión
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-zinc-500">o continúa con</span>
            </div>
          </div>

          {/* Magic Link */}
          <div className="text-center">
            <p className="text-sm text-zinc-600 mb-4">
              ¿Prefieres sin contraseña? Envía un enlace mágico a tu email
            </p>
            {!magicSent ? (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    type="email"
                    value={magicEmail}
                    onChange={(e) => setMagicEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full py-3 text-base font-semibold border border-zinc-200/50 bg-white/50 backdrop-blur-sm hover:bg-zinc-50 transition-all"
                >
                  Enviar enlace mágico
                </Button>
              </form>
            ) : (
              <div className="rounded-xl bg-green-50/80 backdrop-blur-sm border border-green-200/50 p-4">
                <p className="text-sm text-green-600">
                  ✅ Enlace mágico enviado! Revisa tu email.
                </p>
              </div>
            )}
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-6 border-t border-zinc-200/50">
            <p className="text-sm text-zinc-600">
              ¿No tienes cuenta?{' '}
              <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
