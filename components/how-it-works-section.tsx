"use client"

import { motion } from "framer-motion"
import { MessageSquare, Search, Cog, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Diagnóstico e objetivo",
    description:
      "Entendemos seu cenário: do zero (sem loja) ou já vendendo. Definimos o que precisa acontecer para o e-commerce crescer de verdade.",
  },
  {
    number: "02",
    icon: Search,
    title: "Plano de loja ou de escala",
    description: "Escolhemos plataforma, estrutura e integrações. Se a loja já existe, auditamos funil, tracking e gargalos de conversão.",
  },
  {
    number: "03",
    icon: Cog,
    title: "Implementação",
    description:
      "Montamos ou ajustamos sua Shopify/Nuvemshop, configuramos pagamentos, logística e tracking, e ativamos automações via n8n com tudo testado.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Otimização contínua",
    description: "Acompanhamos indicadores, melhoramos o que trava e escalamos o que funciona. Crescimento com rotina, não com sorte.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="processo" className="relative py-32 px-6" style={{ backgroundColor: "#020202" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(82, 0, 151, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#520097" }} />
              <span className="text-[#888] text-sm">Processo</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-[#f5f5f5] leading-[1.1] text-balance"
            >
              Como funciona
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#888] lg:max-w-sm leading-relaxed"
          >
            Um processo simples para colocar sua loja no ar e, quando fizer sentido, escalar com performance e automação.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative group"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)] h-px bg-[#1a1a1a]">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C0FF00]/20 to-transparent" />
                </div>
              )}

              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#C0FF00]/20 transition-colors h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#C0FF00]/5 border border-[#C0FF00]/10 flex items-center justify-center group-hover:bg-[#C0FF00]/10 transition-colors">
                    <step.icon className="w-5 h-5 text-[#C0FF00]" />
                  </div>
                  <span className="text-[#C0FF00]/40 font-mono text-2xl font-bold">{step.number}</span>
                </div>

                <h3 className="text-[#f5f5f5] font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
