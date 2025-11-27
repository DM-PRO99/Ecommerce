import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros | Ecommerce Dashboard',
  description: 'Conoce más sobre nuestra empresa y nuestros productos',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">Nosotros</h1>
          <p className="text-lg text-zinc-600">
            Somos una empresa dedicada a ofrecer los mejores productos de tecnología y relojes de alta calidad.
          </p>
        </div>
        
        <div className="mt-12 space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Nuestra Misión</h2>
            <p className="text-zinc-600">
              Proporcionar productos excepcionales que mejoren la vida de nuestros clientes, combinando innovación, calidad y estilo.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Nuestra Visión</h2>
            <p className="text-zinc-600">
              Convertirnos en el líder del mercado de ecommerce, reconocidos por nuestra excelencia en servicio y calidad de productos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
