"use client"

import { motion } from "framer-motion"

const platforms = [
  { name: "Shopify", color: "#96BF48" },
  { name: "Nuvemshop", color: "#2B2FFC" },
  { name: "n8n", color: "#FF6D5A" },
  { name: "WhatsApp", color: "#25D366" },
  { name: "Meta Ads", color: "#0081FB" },
  { name: "Google Ads", color: "#FBBC04" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Mercado Pago", color: "#00B1EA" },
]

export function LogoCloud() {
  return (
    <div id="integracoes" className="relative z-20 pb-24 pt-8 bg-background" style={{ backgroundColor: "#020202" }}>
      <div className="w-full flex justify-center px-6">
        <div className="w-full max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg text-foreground mb-2 font-medium"
          >
            Integrado com as melhores plataformas.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-16"
          >
            Ecossistema completo para criar e escalar sua loja.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 items-center justify-items-center">
              {platforms.map((platform) => (
                <div key={platform.name} className="flex items-center gap-2 group">
                  <div
                    className="w-3 h-3 rounded-full transition-shadow duration-300 group-hover:shadow-lg"
                    style={{
                      backgroundColor: platform.color,
                      boxShadow: `0 0 0 0 ${platform.color}00`,
                    }}
                  />
                  <span className="text-muted-foreground font-medium text-base group-hover:text-foreground transition-colors">
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
