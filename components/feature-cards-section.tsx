"use client"

import { motion } from "framer-motion"
import { ChevronRight, ArrowRight, Zap, ShoppingCart, BarChart3 } from "lucide-react"

const featureCards = [
  {
    title: "Loja do zero ao lançamento",
    description: "Estrutura completa para começar a vender: plataforma, tema, catálogo, pagamentos e logística prontos.",
    icon: ShoppingCart,
    gradient: "from-neon/20 to-transparent",
  },
  {
    title: "Performance para escalar",
    description: "Para lojas já ativas: auditoria, CRO, funil, tráfego e ajustes finos para crescer com previsibilidade.",
    icon: BarChart3,
    gradient: "from-purple/20 to-transparent",
  },
  {
    title: "Automação e operação",
    description: "n8n para recuperação de carrinho, pós-compra, atendimento e rotinas que reduzem custo e aumentam margem.",
    icon: Zap,
    gradient: "from-neon/10 via-purple/10 to-transparent",
  },
]

export function FeatureCardsSection() {
  return (
    <section id="servicos" className="relative z-20 py-32 bg-background" style={{ backgroundColor: "#020202" }}>
      <div className="w-full flex justify-center px-6">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-foreground max-w-md font-bold leading-[1.1] text-balance"
            >
              Do <span className="text-neon">zero</span> à <span className="text-neon">escala</span> do seu e-commerce
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-md"
            >
              <p className="text-muted-foreground leading-relaxed">
                Se você ainda não tem loja, a gente cria e coloca no ar. Se você já tem, a gente arruma o que trava o crescimento e implementa automações para vender mais sem virar refém da operação.{" "}
                <a
                  href="/diagnostico"
                  className="text-neon inline-flex items-center gap-1 hover:underline"
                >
                  Agendar consultoria <ChevronRight className="w-4 h-4" />
                </a>
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-card border border-border hover:border-neon/30 transition-all group overflow-hidden relative flex flex-col justify-between p-8"
                style={{
                  borderRadius: "24px",
                  minHeight: "360px",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-6 group-hover:bg-neon/20 transition-colors">
                    <card.icon className="w-6 h-6 text-neon" />
                  </div>
                  <h3 className="text-foreground font-semibold text-xl leading-tight mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-end">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-neon/40 group-hover:text-neon transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
