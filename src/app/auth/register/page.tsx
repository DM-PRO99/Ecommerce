'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Débil', color: 'text-red-500', bgColor: 'bg-red-100' };
      case 2:
        return { text: 'Regular', color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
      case 3:
        return { text: 'Buena', color: 'text-blue-500', bgColor: 'bg-blue-100' };
      case 4:
      case 5:
        return { text: 'Excelente', color: 'text-green-500', bgColor: 'bg-green-100' };
      default:
        return { text: 'Débil', color: 'text-red-500', bgColor: 'bg-red-100' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Error en el registro');
      }

      // Redirect to login page after successful registration
      router.push('/auth/login?registered=true');
    } catch (error: any) {
      setError(error.message || 'Error en el registro. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthInfo = getPasswordStrengthText(passwordStrength);

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
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Crea tu cuenta</h1>
          <p className="text-zinc-600">Únete a nosotros y gestiona tu negocio</p>
        </div>

        {/* Register Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-zinc-200/50 shadow-2xl shadow-zinc-900/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Juan Pérez"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-zinc-600">Fortaleza de la contraseña</span>
                    <span className={`text-xs font-medium ${strengthInfo.color}`}>{strengthInfo.text}</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.bgColor}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-zinc-400 hover:text-zinc-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-zinc-400 hover:text-zinc-600 transition-colors" />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <div className="mt-2 flex items-center text-xs text-red-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Las contraseñas no coinciden
                </div>
              )}
              {confirmPassword && password === confirmPassword && (
                <div className="mt-2 flex items-center text-xs text-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Las contraseñas coinciden
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200/50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-base font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando cuenta...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Crear cuenta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </button>
          </form>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-600">
              Al crear una cuenta, aceptas nuestros{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                Términos de Servicio
              </a>{' '}
              y{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                Política de Privacidad
              </a>
            </p>
          </div>

          {/* Sign In Link */}
          <div className="text-center pt-6 border-t border-zinc-200/50">
            <p className="text-sm text-zinc-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
