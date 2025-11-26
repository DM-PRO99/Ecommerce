'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { LandingNav } from '@/components/dashboard/LandingNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { 
  CreditCard, 
  Truck, 
  Shield, 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building,
  CheckCircle
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'España',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const hasItems = items.length > 0;
  const shipping = hasItems ? 9.99 : 0;
  const tax = subtotal * 0.21; // 21% IVA
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create order payload
      const orderPayload = {
        userEmail: formData.email,
        items: items.map(item => ({
          productId: item._id,
          name: item.name,
          reference: item.reference,
          quantity: item.cartQuantity,
          price: item.price
        })),
        shippingInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentInfo: {
          cardName: formData.cardName,
          cardNumber: formData.cardNumber,
          cardExpiry: formData.cardExpiry,
          cardCvc: formData.cardCvc
        },
        subtotal,
        shipping,
        tax,
        total
      };

      console.log('Submitting order:', orderPayload);

      // Create order in database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Error processing order');
      }

      const orderData = await response.json();
      console.log('Order created:', orderData);

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrderComplete(true);
      clearCart();
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasItems && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
        <LandingNav session={null} />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full mb-4">
            <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-zinc-600 mb-6">Agrega productos para continuar con tu compra</p>
          <Button 
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
          >
            Ver productos
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
        <LandingNav session={null} />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">¡Pedido Confirmado!</h1>
          <p className="text-lg text-zinc-600 mb-6">
            Tu pedido ha sido procesado exitosamente. Te enviaremos un email con los detalles.
          </p>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6 mb-6 max-w-md mx-auto">
            <h3 className="font-semibold text-zinc-900 mb-2">Número de pedido</h3>
            <p className="text-2xl font-bold text-indigo-600">#ORD-2024-{Math.floor(Math.random() * 10000)}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
            >
              Seguir comprando
            </Button>
            <Button 
              variant="ghost"
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-zinc-200/50 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition-all"
            >
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative">
        <LandingNav session={null} />
        
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">Checkout</h1>
            <p className="text-zinc-600">Completa tus datos para finalizar la compra</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6">
                <div className="flex items-center mb-6">
                  <Truck className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-lg font-semibold text-zinc-900">Información de Envío</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Juan"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Apellidos
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Pérez"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="+34 600 000 000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Calle Principal, 123"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Madrid"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Provincia
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Madrid"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="28001"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Information */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6">
                <div className="flex items-center mb-6">
                  <CreditCard className="h-5 w-5 text-indigo-600 mr-2" />
                  <h2 className="text-lg font-semibold text-zinc-900">Información de Pago</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Fecha de vencimiento
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="MM/AA"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-xl bg-white/50 backdrop-blur-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl shadow-zinc-900/5 p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">Resumen del Pedido</h2>
                
                {/* Items */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-zinc-900">{item.name}</p>
                        <p className="text-xs text-zinc-500">{item.cartQuantity} x ${item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-sm font-semibold text-zinc-900">
                        ${(item.price * item.cartQuantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-200/50 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Subtotal</span>
                    <span className="font-medium text-zinc-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">Envío</span>
                    <span className="font-medium text-zinc-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600">IVA (21%)</span>
                    <span className="font-medium text-zinc-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-zinc-900 pt-2 border-t border-zinc-200/50">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center mt-4 text-xs text-zinc-500">
                  <Shield className="h-4 w-4 mr-1" />
                  Pago seguro con encriptación SSL
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full mt-6 py-3 text-base font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Confirmar Pedido
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
