"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Marina Almeida",
    role: "Fundadora, Loja do Zero",
    quote:
      "Eu não tinha loja nenhuma. A ScaleUp montou tudo, explicou o básico e deixou a estrutura pronta para eu começar a vender com segurança. O melhor foi já sair com automações de pós-compra e carrinho.",
    stars: 5,
    metric: "Loja no ar",
  },
  {
    name: "Rafael Mendes",
    role: "CEO, Vitrine Digital",
    quote:
      "Já vendíamos, mas a operação era bagunçada e a conversão estava travada. Ajustaram funil, tracking e automações. A sensação é que agora a loja tem processo e cresce com menos improviso.",
    stars: 5,
    metric: "Mais conversão",
  },
  {
    name: "Camila Santos",
    role: "Fundadora, Bella Store",
    quote:
      "O time entende de e-commerce de verdade. As automações via n8n reduziram retrabalho e recuperam vendas que a gente deixava na mesa. Ficou tudo mais leve de tocar no dia a dia.",
    stars: 5,
    metric: "Menos retrabalho",
  },
]

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="relative py-32 px-6" style={{ backgroundColor: "#020202" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5"
          >
            <span className="w-2 h-2 rounded-full bg-neon" />
            <span className="text-neon text-xs font-medium tracking-wide uppercase">Depoimentos</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-foreground leading-[1.1] text-balance"
          >
            Quem cria e escala com a gente, <span className="text-neon">recomenda</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 flex flex-col justify-between hover:border-[#C0FF00]/20 transition-colors group"
            >
              <div>
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C0FF00] text-[#C0FF00]" />
                  ))}
                </div>

                <p className="text-[#888] text-sm leading-relaxed mb-6">{'"'}{t.quote}{'"'}</p>
              </div>

              <div>
                <div className="mb-4">
                  <span className="text-xs font-semibold text-[#020202] bg-[#C0FF00] px-3 py-1 rounded-full">{t.metric}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[#C0FF00] font-bold text-sm">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-[#f5f5f5] text-sm font-medium">{t.name}</p>
                    <p className="text-[#888] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
