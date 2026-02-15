"use client"

import { motion } from "framer-motion"
import { ChevronRight, Repeat, Mail, MessageSquare, ShoppingCart, TrendingUp } from "lucide-react"
import { WHATSAPP_LINK } from "@/lib/links"

const automations = [
  {
    icon: ShoppingCart,
    name: "Recuperação de carrinho",
    description: "Sequência automática via WhatsApp e e-mail para carrinhos abandonados",
    status: "Ativo",
    metric: "até +32% conversão",
  },
  {
    icon: Mail,
    name: "E-mail pós-compra",
    description: "Upsell e cross-sell automatizados após confirmação do pedido",
    status: "Ativo",
    metric: "até +18% ticket médio",
  },
  {
    icon: MessageSquare,
    name: "Atendimento no WhatsApp",
    description: "Atendimento e vendas 24h com respostas automatizadas via n8n",
    status: "Ativo",
    metric: "mais velocidade",
  },
  {
    icon: TrendingUp,
    name: "Remarketing dinâmico",
    description: "Segmentação automática com base no comportamento do cliente",
    status: "Ativo",
    metric: "mais ROAS",
  },
]

export function AISection() {
  return (
    <section id="automacao" className="relative z-20 py-32 bg-background" style={{ backgroundColor: "#020202" }}>
      <div className="w-full flex justify-center px-6">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-neon" />
            <span className="text-muted-foreground text-sm">Automação inteligente</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-foreground max-w-3xl mb-8 font-bold leading-[1.1]"
          >
            Automações que vendem e deixam tudo <span className="text-neon">no controle</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-lg mb-8"
          >
            <span className="text-foreground font-medium">Powered by n8n.</span> Serve para quem está começando (base pronta de pós-compra e recuperação) e para quem já vende (segmentação, remarketing e suporte), para crescer sem virar refém da operação.
          </motion.p>

          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neon/10 text-neon rounded-lg border border-neon/20 hover:bg-neon/20 transition-colors text-sm font-medium mb-16"
          >
            Falar no WhatsApp
            <ChevronRight className="w-4 h-4" />
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center">
                  <Repeat className="w-4 h-4 text-neon" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold text-sm">Fluxo de automação ScaleUp</h3>
                  <p className="text-muted-foreground text-xs">4 automações ativas | n8n</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  <span className="text-neon text-xs font-medium">Online</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {automations.map((automation, index) => (
                  <motion.div
                    key={automation.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="bg-background border border-border rounded-xl p-5 hover:border-neon/20 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-neon/5 border border-neon/10 flex items-center justify-center flex-shrink-0 group-hover:bg-neon/10 transition-colors">
                        <automation.icon className="w-5 h-5 text-neon" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-foreground text-sm font-medium">{automation.name}</h4>
                          <span className="text-[10px] bg-neon/10 text-neon px-1.5 py-0.5 rounded font-medium">{automation.status}</span>
                        </div>
                        <p className="text-muted-foreground text-xs mb-2">{automation.description}</p>
                        <span className="text-neon text-xs font-semibold">{automation.metric}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-t border-border pt-12 md:pr-12 pb-16 md:border-r">
                <h3 className="text-foreground font-semibold text-xl mb-3">Recuperação automática de vendas</h3>
                <p className="text-muted-foreground text-base mb-6">
                  Carrinhos abandonados, boletos não pagos e clientes inativos reativados com sequências inteligentes via WhatsApp e e-mail.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 rounded-full bg-neon" />
                    <span className="text-foreground text-sm">Carrinho abandonado — WhatsApp em 30 min</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 rounded-full bg-neon/60" />
                    <span className="text-muted-foreground text-sm">Boleto vencido — lembrete automático</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 rounded-full bg-neon/30" />
                    <span className="text-muted-foreground text-sm">Cliente inativo — reengajamento em 30 dias</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-12 md:pl-12 pb-16">
                <h3 className="text-foreground font-semibold text-xl mb-3">Integração total com n8n</h3>
                <p className="text-muted-foreground text-base mb-6">
                  Conecte sua loja a mais de 400 ferramentas. Tudo orquestrado em fluxos visuais, sem código.
                </p>
                <div className="bg-card rounded-xl border border-border p-5 font-mono text-sm">
                  <p className="text-muted-foreground mb-2">{"// Fluxo ScaleUp.gg"}</p>
                  <p>
                    <span className="text-neon">trigger</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-purple">{'"carrinho_abandonado"'}</span>
                  </p>
                  <p>
                    <span className="text-neon">delay</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-foreground">{'"30min"'}</span>
                  </p>
                  <p>
                    <span className="text-neon">action</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-purple">{'"whatsapp_msg"'}</span>
                  </p>
                  <p>
                    <span className="text-neon">fallback</span>
                    <span className="text-muted-foreground">: </span>
                    <span className="text-foreground">{'"email_sequence"'}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
