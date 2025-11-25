import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Nueva colección 2025
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
            Relojes y tecnología
            <span className="block bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              para un estilo atemporal.
            </span>
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-500 md:text-base">
            Descubre piezas seleccionadas de relojería premium y dispositivos tecnológicos
            diseñados para acompañar tu día a día con precisión y elegancia.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" className="text-xs md:text-sm">
              Ver colección de relojes
            </Button>
            <Button variant="ghost" className="text-xs md:text-sm">
              Explorar tecnología
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <Card className="relative overflow-hidden border-zinc-200 bg-white/70">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                    Destacado
                  </p>
                  <h2 className="mt-1 text-sm font-semibold tracking-tight text-zinc-900">
                    ChronoTech Eclipse
                  </h2>
                  <p className="mt-1 text-xs text-zinc-500">
                    Reloj inteligente con cristal de zafiro y notificaciones en tiempo real.
                  </p>
                </div>
                <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
                  $549
                </span>
              </div>
              <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
                <img
                  src="https://res.cloudinary.com/demo/image/upload/v1699999999/smartwatch_sample.jpg"
                  alt="Reloj inteligente premium"
                  className="h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
