import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="6" r="2" strokeWidth="2" />
              <path strokeWidth="2" d="M12 10v6m-3 3h6m-9-9h12" />
            </svg>
          </div>
          <span className="text-lg font-semibold">Mapa de Acessibilidade</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#funcionalidades"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Funcionalidades
          </a>
          <a href="#mapa" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Mapa
          </a>
          <a
            href="#diferenciais"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Diferenciais
          </a>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Acessar Plataforma
          </Button>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden">
          <span className="text-xl">☰</span>
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  )
}
