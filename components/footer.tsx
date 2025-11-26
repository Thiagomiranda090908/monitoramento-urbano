export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="6" r="2" strokeWidth="2" />
                  <path strokeWidth="2" d="M12 10v6m-3 3h6m-9-9h12" />
                </svg>
              </div>
              <span className="text-lg font-semibold">Mapa de Acessibilidade</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Tecnologia e dados abertos a serviço da inclusão urbana. Identificando barreiras e promovendo mobilidade
              para todos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#funcionalidades"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#mapa" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Mapa Interativo
                </a>
              </li>
              <li>
                <a
                  href="#diferenciais"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Diferenciais
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground">© 2025 Mapa de Acessibilidade. Todos os direitos reservados.</p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xl">
              ✉<span className="sr-only">Email</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xl">
              ⚙<span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xl">
              in
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
