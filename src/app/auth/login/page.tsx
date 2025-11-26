'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Key } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [magicEmail, setMagicEmail] = useState('');
  const [magicSent, setMagicSent] = useState(false);
  const [loginType, setLoginType] = useState<'password' | 'magic' | 'google'>('google');
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
        // Enviar email de bienvenida después del login exitoso
        await fetch('/api/auth/welcome-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: identifier }),
        });
        
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Ocurrió un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    
    try {
      await signIn('google', {
        callbackUrl: '/dashboard',
      });
    } catch (error) {
      setError('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
      setGoogleLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMagicSent(false);
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
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
          <p className="text-zinc-600">Elige cómo quieres iniciar sesión</p>
        </div>

        {/* Login Options */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-zinc-200/50 shadow-2xl shadow-zinc-900/5 overflow-hidden">
          
          {/* Login Type Selector */}
          <div className="flex border-b border-zinc-200/50">
            <button
              onClick={() => setLoginType('google')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                loginType === 'google'
                  ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </div>
            </button>
            <button
              onClick={() => setLoginType('password')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                loginType === 'password'
                  ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Contraseña
              </div>
            </button>
            <button
              onClick={() => setLoginType('magic')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                loginType === 'magic'
                  ? 'text-indigo-600 bg-indigo-50/50 border-b-2 border-indigo-600'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Key className="h-4 w-4" />
                Magic Link
              </div>
            </button>
          </div>

          <div className="p-8">
            {/* Google Login */}
            {loginType === 'google' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50/50 mb-4">
                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    Acceso con Google
                  </h3>
                  <p className="text-sm text-zinc-600 mb-6">
                    Usa tu cuenta de Google para acceder de forma rápida y segura
                  </p>
                </div>

                <Button
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading}
                  className="w-full py-3 text-base font-semibold bg-white border-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {googleLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Conectando con Google...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continuar con Google
                    </span>
                  )}
                </Button>

                {error && (
                  <div className="rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200/50 p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            )}

            {/* Password Login Form */}
            {loginType === 'password' && (
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
            )}

            {/* Magic Link Form */}
            {loginType === 'magic' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50/50 mb-4">
                    <Mail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    Acceso sin contraseña
                  </h3>
                  <p className="text-sm text-zinc-600 mb-6">
                    Te enviaremos un enlace mágico a tu correo para que accedas de forma segura
                  </p>
                </div>

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
                      disabled={isLoading}
                      variant="ghost"
                      className="w-full py-3 text-base font-semibold border border-zinc-200/50 bg-white/50 backdrop-blur-sm hover:bg-zinc-50 transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando enlace...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Enviar enlace mágico
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="rounded-xl bg-green-50/80 backdrop-blur-sm border border-green-200/50 p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-green-600 font-medium mb-2">
                      ✅ Enlace mágico enviado!
                    </p>
                    <p className="text-xs text-green-500">
                      Revisa tu email y haz clic en el enlace para acceder
                    </p>
                  </div>
                )}

                {error && (
                  <div className="rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200/50 p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sign Up Link */}
          <div className="text-center py-4 border-t border-zinc-200/50 bg-zinc-50/30">
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
