"use client"

import { WHATSAPP_LINK } from "@/lib/links"

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
    { label: "Consultoria", href: WHATSAPP_LINK },
  ],
  Empresa: [
    { label: "Contato", href: WHATSAPP_LINK },
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
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-neon/10 text-neon px-4 py-2 rounded-lg border border-neon/20 hover:bg-neon/20 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp
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
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
