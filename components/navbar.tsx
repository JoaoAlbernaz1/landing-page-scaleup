"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#automacao", label: "Automação" },
  { href: "#integracoes", label: "Integrações" },
  { href: "#resultados", label: "Resultados" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#020202]/80 backdrop-blur-md"
      aria-label="Navegação principal"
    >
      <div className="w-full flex justify-center px-6 py-4">
        <div className="w-full max-w-5xl flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2" aria-label="Voltar ao início">
            <div className="w-7 h-7 rounded-md bg-neon flex items-center justify-center" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#020202]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="text-foreground font-bold text-lg tracking-tight">
              ScaleUp<span className="text-neon">.gg</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="/diagnostico"
              className="text-sm font-semibold bg-neon text-[#020202] px-5 py-2 rounded-lg hover:brightness-110 transition-all"
            >
              Agendar consultoria
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="menu-mobile" className="md:hidden bg-[#020202] border-t border-[#1a1a1a] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/diagnostico"
            className="text-sm font-semibold bg-neon text-[#020202] px-5 py-2.5 rounded-lg hover:brightness-110 transition-all text-center mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Agendar consultoria
          </a>
        </div>
      )}
    </nav>
  )
}
