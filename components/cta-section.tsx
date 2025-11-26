import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Transforme <span className="text-primary">Acessibilidade</span> em Realidade
          </h2>
          <p className="text-xl text-muted-foreground mb-10 text-pretty leading-relaxed">
            Acompanhe o mapa. Veja onde agir primeiro. Use dados reais para criar uma cidade mais inclusiva e acessível
            para todos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8">
              Acessar o Mapa Agora
              <span>→</span>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base px-8 bg-transparent">
              <span>📅</span>
              Agendar Demonstração
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Junte-se a gestores públicos que já usam dados para promover inclusão urbana
          </p>
        </div>
      </div>
    </section>
  )
}
