import { Card } from "@/components/ui/card"

const features = [
  {
    icon: "🗺️",
    title: "Mapa Atualizado em Tempo Real",
    description:
      "Visualização interativa de áreas de risco e barreiras urbanas, atualizada continuamente com novos dados.",
  },
  {
    icon: "📊",
    title: "Prioridade Baseada em Dados",
    description:
      "Sistema inteligente define automaticamente quais intervenções devem ser priorizadas com base em impacto real.",
  },
  {
    icon: "🔔",
    title: "Alertas para Gestores Públicos",
    description: "Notificações instantâneas sobre novos pontos críticos e situações que requerem atenção imediata.",
  },
  {
    icon: "📋",
    title: "Relatórios Automatizados",
    description: "Geração rápida de relatórios detalhados para tomada de decisão e prestação de contas.",
  },
  {
    icon: "🛡️",
    title: "Privacidade Garantida",
    description: "Zero identificação de indivíduos. Todos os dados são anonimizados e processados com segurança.",
  },
  {
    icon: "🔄",
    title: "Monitoramento Contínuo",
    description: "Análise permanente usando IA com câmeras públicas e dados abertos para detecção proativa.",
  },
]

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Funcionalidades que <span className="text-primary">Transformam Dados</span> em Ação
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Ferramentas poderosas para gestores públicos tomarem decisões baseadas em evidências concretas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            return (
              <Card key={index} className="p-6 bg-card hover:bg-accent/5 transition-colors border border-border/50">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
