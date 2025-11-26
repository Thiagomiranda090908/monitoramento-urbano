import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative px-4 py-20 md:py-32 lg:py-40">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium border border-accent/30">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeWidth="2"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              />
            </svg>
            IA + Dados Abertos
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance max-w-4xl">
            Mapa Inteligente de <span className="text-primary">Acessibilidade</span> da Cidade
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            Sistema que identifica automaticamente barreiras urbanas que dificultam a mobilidade de idosos, pessoas com
            deficiência e comunidades vulneráveis.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base">
              Explorar o Mapa
              <span>→</span>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base bg-transparent">
              Ver Demonstração
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Usado por gestores públicos para promover inclusão urbana baseada em evidências
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
