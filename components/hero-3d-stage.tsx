"use client"

import { motion } from "framer-motion"
import { Navbar } from "./navbar"
import { AutomationCore } from "./automation-core"
import { MarqueeBand } from "./marquee-band"
import { LogoCloud } from "./logo-cloud"
import { FeatureCardsSection } from "./feature-cards-section"
import { AISection } from "./ai-section"
import { HowItWorksSection } from "./how-it-works-section"
import { TestimonialsSection } from "./testimonials-section"
import { WorkflowsSection } from "./workflows-section"
import { FAQSection } from "./faq-section"
import { CTASection } from "./cta-section"
import { Footer } from "./footer"
import { WhatsAppButton } from "./whatsapp-button"
import { EnergyLine } from "./energy-line"
import { getWhatsAppLink } from "@/lib/links"

const heroWhatsApp = getWhatsAppLink("Olá! Quero criar ou escalar minha loja. Podemos conversar?")

export function Hero3DStage() {
  return (
    <>
      <section id="top" className="relative min-h-screen overflow-hidden bg-background" style={{ backgroundColor: "#020202" }}>
        <Navbar />

        {/* Background gradient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1200px",
            height: "800px",
            background:
              "radial-gradient(ellipse at center, rgba(82, 0, 151, 0.12) 0%, rgba(192, 255, 0, 0.04) 40%, transparent 70%)",
          }}
        />

        {/* Main content */}
        <div className="relative z-10 pt-28 flex flex-col items-center">
          {/* Hero text */}
          <div className="w-full flex justify-center px-6 mt-8 md:mt-16">
            <div className="w-full max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-neon/20 bg-neon/5"
              >
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                <span className="text-neon text-xs font-medium tracking-wide uppercase">Do zero à escala</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] text-balance"
              >
                Crie sua loja e <span className="text-neon">escale</span> com performance.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Se você ainda não tem e-commerce, a gente monta e lança sua Shopify ou Nuvemshop.
                <br className="hidden md:block" />
                Se você já vende, a gente ajusta funil, conversão, tracking e automações (n8n) para crescer com consistência.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a
                  href={heroWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-neon text-[#020202] font-bold rounded-lg hover:brightness-110 transition-all text-sm inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Falar no WhatsApp
                </a>

                <a
                  href="#processo"
                  className="px-8 py-3.5 rounded-lg border border-border text-foreground hover:border-neon/30 hover:bg-white/5 transition-all text-sm"
                >
                  Ver como funciona
                </a>

                <span className="text-muted-foreground text-sm">Diagnóstico gratuito de 15 min</span>
              </motion.div>
            </div>
          </div>

          {/* Automation Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 md:mt-16 flex justify-center"
          >
            <AutomationCore />
          </motion.div>

          <MarqueeBand />
          <EnergyLine />

          <LogoCloud />
          <FeatureCardsSection />
          <AISection />
          <HowItWorksSection />
          <TestimonialsSection />
          <WorkflowsSection />
          <FAQSection />
          <CTASection />
          <Footer />
        </div>
      </section>

      <WhatsAppButton />
    </>
  )
}
