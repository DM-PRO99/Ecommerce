import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="relative border-b border-zinc-200/50 bg-gradient-to-br from-slate-50 via-white to-zinc-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 right-0 h-96 w-96 bg-gradient-radial from-indigo-500/10 to-transparent blur-3xl" />
      
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 pb-20 pt-16 md:flex-row md:items-center md:gap-16 md:pt-20">
        <div className="flex-1 space-y-8 md:space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-900">
              Nueva colección 2025
            </p>
          </div>
          
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-6xl lg:text-7xl leading-[1.1]">
              Relojes y
              <span className="block bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                tecnología
              </span>
            </h1>
            <p className="text-xl font-medium text-zinc-600 md:text-2xl">
              para un estilo atemporal
            </p>
          </div>
          
          {/* Description */}
          <p className="max-w-xl text-lg leading-relaxed text-zinc-500 md:text-xl">
            Descubre piezas seleccionadas de relojería premium y dispositivos tecnológicos
            diseñados para acompañar tu día a día con precisión y elegancia.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              variant="primary" 
              className="group relative overflow-hidden px-8 py-4 text-sm font-semibold md:text-base shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02]"
            >
              <span className="relative z-10">Ver colección de relojes</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
            <Button 
              variant="ghost" 
              className="px-8 py-4 text-sm font-semibold md:text-base border border-zinc-200/50 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-md"
            >
              Explorar tecnología
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex items-center gap-8 pt-4 border-t border-zinc-200/50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-zinc-600">Envío gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-zinc-600">Garantía 2 años</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm text-zinc-600">Premium quality</span>
            </div>
          </div>
        </div>
        
        {/* Product showcase */}
        <div className="flex-1">
          <Card className="relative overflow-hidden border-zinc-200/30 bg-gradient-to-br from-white to-zinc-50/50 shadow-2xl shadow-zinc-900/5 backdrop-blur-xl transition-all duration-500 hover:shadow-3xl hover:shadow-zinc-900/10">
            <CardContent className="flex flex-col gap-6 p-8">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/50 bg-amber-50/50 px-3 py-1.5 backdrop-blur-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-900">
                      Destacado
                    </p>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
                    ChronoTech Eclipse
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Reloj inteligente con cristal de zafiro y notificaciones en tiempo real.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    $549
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-3 w-3 fill-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-inner">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Reloj inteligente premium"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 via-transparent to-transparent" />
              </div>
              
              {/* Quick actions */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" className="h-8 w-8 rounded-full p-0 hover:bg-zinc-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" className="h-8 w-8 rounded-full p-0 hover:bg-zinc-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                    </svg>
                  </Button>
                </div>
                <Button variant="primary" className="px-6 py-2 text-sm font-semibold shadow-lg shadow-indigo-500/25">
                  Añadir al carrito
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
