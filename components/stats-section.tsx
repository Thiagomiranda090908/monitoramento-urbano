const stats = [
  {
    icon: "📍",
    value: "1.200+",
    label: "Pontos Críticos Identificados",
  },
  {
    icon: "⚠️",
    value: "85%",
    label: "Precisão na Detecção",
  },
  {
    icon: "👥",
    value: "300 mil",
    label: "Pessoas Beneficiadas",
  },
  {
    icon: "📈",
    value: "42%",
    label: "Redução em Barreiras",
  },
]

export function StatsSection() {
  return (
    <section className="py-12 md:py-20 border-y border-border/40 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            return (
              <div key={index} className="flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-2xl">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
