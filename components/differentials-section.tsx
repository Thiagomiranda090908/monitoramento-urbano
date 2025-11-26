import { Card } from "@/components/ui/card"

const differentials = [
  {
    icon: "✓",
    title: "Dados Anonimizados",
    description:
      "Privacidade em primeiro lugar. Zero identificação de indivíduos. Todos os dados são processados de forma anônima e segura, respeitando a LGPD e direitos fundamentais.",
  },
  {
    icon: "⚡",
    title: "Infraestrutura Existente",
    description:
      "Aproveitamos câmeras públicas e dados abertos já disponíveis. Não requer novos investimentos em hardware, apenas inteligência aplicada.",
  },
  {
    icon: "♥",
    title: "Foco em Inclusão",
    description:
      "Nossa missão é promover inclusão, não vigilância. A tecnologia serve para reduzir desigualdades e garantir mobilidade para todos.",
  },
]

export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            O Que Nos Torna <span className="text-primary">Diferentes</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Tecnologia com propósito, ética e foco em resultados reais para a sociedade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {differentials.map((differential, index) => {
            return (
              <Card key={index} className="p-8 bg-card border border-border/50 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto mb-6 text-3xl font-bold">
                  {differential.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{differential.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{differential.description}</p>
              </Card>
            )
          })}
        </div>

        <Card className="mt-16 p-8 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-balance">Guie o Município com Evidências Reais</h3>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Reduza desigualdade urbana e aumente segurança e mobilidade com decisões baseadas em dados concretos, não
              suposições.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
