"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Vocês criam loja do zero?",
    a: "Sim. Montamos sua Shopify ou Nuvemshop do início ao lançamento, com estrutura, pagamentos, logística e tracking básico para você começar a vender do jeito certo.",
  },
  {
    q: "Em quanto tempo a loja fica pronta para vender?",
    a: "Depende do ponto de partida. Em setups do zero, normalmente entregamos a base pronta e publicada em 7 a 14 dias, considerando conteúdo e aprovações. Em lojas já operando, priorizamos os ajustes de maior impacto (funil, checkout, tracking e automação).",
  },
  {
    q: "Vocês trabalham com Shopify e Nuvemshop?",
    a: "Sim. Fazemos setup, migração, integrações e otimizações nas duas plataformas, sempre com foco em conversão, automação e dados.",
  },
  {
    q: "O que vocês fazem para escalar uma loja que já existe?",
    a: "A gente audita o funil (produto, carrinho, checkout), organiza tracking e eventos, ajusta páginas para conversão (CRO), melhora rotinas operacionais e implementa automações via n8n para recuperar receita e reduzir retrabalho.",
  },
  {
    q: "Como funciona a consultoria gratuita de 15 minutos?",
    a: "É uma conversa rápida para entender seu cenário (do zero ou já vendendo), identificar gargalos e te dizer quais ajustes trazem resultado mais rápido. Você sai com um plano claro de próximos passos.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="relative py-32 px-6" style={{ backgroundColor: "#020202" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-foreground leading-[1.1] text-balance"
          >
            Perguntas <span className="text-neon">frequentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          >
            Respostas objetivas para você entender como a ScaleUp.gg funciona, tanto para criar sua loja do zero quanto para escalar um e-commerce que já vende.
          </motion.p>
        </div>

        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-[#1a1a1a]">
                <AccordionTrigger className="text-foreground hover:no-underline">
                  <span className="text-base md:text-lg">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
