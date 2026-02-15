"use client"

import { motion } from "framer-motion"
import { ChevronRight, Package, CreditCard, Truck, BarChart3, Headphones, Target } from "lucide-react"

const results = [
  { metric: "7–14 dias", label: "Loja no ar", description: "Quando o projeto começa do zero (base pronta e publicada)" },
  { metric: "+CRO", label: "Mais conversão", description: "Ajustes de funil, checkout e páginas (varia por negócio)" },
  { metric: "24/7", label: "Operação ativa", description: "Automação e atendimento para vender o tempo todo" },
  { metric: "Automação", label: "Menos retrabalho", description: "Rotinas e fluxos via n8n para escalar sem caos" },
]

const services = [
  { icon: Package, name: "Setup completo de loja", desc: "Shopify ou Nuvemshop do zero ao lançamento" },
  { icon: CreditCard, name: "Integração de pagamentos", desc: "Pix, Mercado Pago, Stripe e mais" },
  { icon: Truck, name: "Logística automatizada", desc: "Rastreio, notificações e gestão de envios" },
  { icon: BarChart3, name: "Analytics e tracking", desc: "Métricas-chave e eventos para decisões melhores" },
  { icon: Headphones, name: "Suporte ao cliente", desc: "Atendimento e respostas automatizadas" },
  { icon: Target, name: "Tráfego e conversão", desc: "Otimização de funil e campanhas de retargeting" },
]

export function WorkflowsSection() {
  return (
    <section id="resultados" className="relative py-32 bg-background" style={{ backgroundColor: "#020202" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <div className="lg:max-w-xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-purple" style={{ backgroundColor: "#520097" }} />
              <span className="text-sm text-muted-foreground">O que você ganha</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.1] text-balance">
              Estrutura para <span className="text-neon">começar</span> e base para <span className="text-neon">escalar</span>
            </h2>
          </div>

          <p className="text-muted-foreground lg:max-w-sm lg:pt-12 leading-relaxed">
            Seja construindo sua loja do zero ou otimizando uma operação que já vende, a combinação de engenharia, automação e dados deixa o crescimento mais previsível.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-card border border-border rounded-2xl hover:border-neon/20 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-neon mb-2">{result.metric}</div>
              <div className="text-foreground text-sm font-medium mb-1">{result.label}</div>
              <div className="text-muted-foreground text-xs">{result.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Tudo que sua loja precisa</h3>
          <p className="text-muted-foreground mb-12 max-w-lg">
            Da configuração inicial à escala avançada, cobrimos cada parte do e-commerce: estrutura, funil, automação e dados.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:border-neon/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-neon/5 border border-neon/10 flex items-center justify-center flex-shrink-0 group-hover:bg-neon/10 transition-colors">
                <service.icon className="w-5 h-5 text-neon" />
              </div>
              <div>
                <h4 className="text-foreground text-sm font-medium mb-1">{service.name}</h4>
                <p className="text-muted-foreground text-xs">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
