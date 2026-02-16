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
                  href="/diagnostico"
                  className="px-8 py-3.5 bg-neon text-[#020202] font-bold rounded-lg hover:brightness-110 transition-all text-sm inline-flex items-center gap-2"
                >
                  Agendar consultoria
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
