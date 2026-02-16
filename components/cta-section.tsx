"use client"

import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="py-32 px-6 bg-background" style={{ backgroundColor: "#020202" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border p-12 md:p-16 text-center"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(82, 0, 151, 0.15) 0%, rgba(192, 255, 0, 0.03) 50%, #0a0a0a 100%)",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-neon/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-purple/10 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-foreground mb-6 leading-[1.1] text-balance">
              Pronto para <span className="text-neon">criar</span> ou <span className="text-neon">escalar</span> sua loja?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Se você ainda não tem e-commerce, a gente monta e lança. Se você já vende, a gente melhora conversão, estrutura o funil e automatiza a operação para crescer com consistência.
            </p>
            <a
              href="/diagnostico"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neon text-[#020202] font-bold rounded-xl hover:brightness-110 transition-all text-base"
            >
              Agendar consultoria
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
