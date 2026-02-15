"use client"

const marqueeText =
  "CRIAÇÃO DE LOJA  *  ESCALA  *  CRO  *  AUTOMAÇÃO N8N  *  RECUPERAÇÃO DE VENDAS  *  SHOPIFY  *  NUVEMSHOP  *  TRÁFEGO E FUNIL  *  "

export function MarqueeBand() {
  return (
    <div className="relative w-full overflow-hidden py-6 my-8" style={{ transform: "rotate(-2deg)" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple via-neon/10 to-purple opacity-20" />
      <div className="absolute inset-0 border-y border-neon/20" />

      <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-neon/80 font-bold text-sm md:text-base tracking-[0.2em] uppercase mx-0">
            {marqueeText}
          </span>
        ))}
      </div>
    </div>
  )
}
