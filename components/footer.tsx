"use client"

const footerLinks: Record<string, Array<{ label: string; href: string }>> = {
  Serviços: [
    { label: "Setup de loja", href: "#servicos" },
    { label: "Automação via n8n", href: "#automacao" },
    { label: "Integrações", href: "#integracoes" },
    { label: "Resultados", href: "#resultados" },
  ],
  Processo: [
    { label: "Como funciona", href: "#processo" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Perguntas frequentes", href: "#faq" },
    { label: "Consultoria", href: "/diagnostico" },
  ],
  Empresa: [
    { label: "Contato", href: "/diagnostico" },
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border py-16 px-6 bg-background" style={{ backgroundColor: "#020202" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-neon flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#020202]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="text-foreground font-bold text-lg tracking-tight">
                ScaleUp<span className="text-neon">.gg</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
              Engenharia de e-commerce e automação inteligente para quem quer criar ou escalar lojas de verdade.
            </p>

            <a
              href="/diagnostico"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-neon/10 text-neon px-4 py-2 rounded-lg border border-neon/20 hover:bg-neon/20 transition-colors"
            >
              Agendar consultoria
            </a>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-foreground font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-neon transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">&copy; {new Date().getFullYear()} ScaleUp.gg. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="/privacidade" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
              Política de Privacidade
            </a>
            <a href="/termos" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
