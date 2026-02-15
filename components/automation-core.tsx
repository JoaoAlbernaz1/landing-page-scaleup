"use client"

import { motion } from "framer-motion"


export function AutomationCore() {
  return (
    <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(192, 255, 0, 0.08) 0%, rgba(82, 0, 151, 0.05) 50%, transparent 70%)",
        }}
      />

      {/* Outermost ring - slowest */}
      <motion.div
        className="absolute w-[380px] h-[380px] md:w-[480px] md:h-[480px] rounded-full border border-neon/10"
        style={{ animation: "spin-slow 25s linear infinite" }}
      >
        {/* Dot indicators on outer ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neon/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-purple/30" />
      </motion.div>

      {/* Second ring */}
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full border border-purple/20"
        style={{ animation: "spin-slow-reverse 18s linear infinite" }}
      >
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neon/40" />
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple/40" />
      </motion.div>

      {/* Third ring - dashed */}
      <motion.div
        className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full"
        style={{
          border: "1px dashed rgba(192, 255, 0, 0.15)",
          animation: "spin-slow 12s linear infinite",
        }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full border-2 border-neon/20"
        style={{ animation: "spin-slow-reverse 8s linear infinite" }}
      />

      {/* Central core - pulsing neon */}
      <motion.div
        className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle, rgba(192, 255, 0, 0.2) 0%, rgba(82, 0, 151, 0.15) 60%, transparent 100%)",
          animation: "pulse-neon 3s ease-in-out infinite",
        }}
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 text-neon" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      </motion.div>

      {/* Shopify logo - floating top-right */}
      <motion.div
        className="absolute"
        style={{
          top: "8%",
          right: "12%",
          animation: "vibrate 3s ease-in-out infinite, float 4s ease-in-out infinite",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "backOut" }}
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#0a0a0a] border border-neon/20 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-neon/5">
          <svg className="w-7 h-7 md:w-8 md:h-8 text-[#96BF48]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.34 3.8c-.07-.06-.15-.06-.23-.04-.08.02-1.67.5-1.67.5s-1.1-1.1-1.22-1.23c-.13-.13-.38-.09-.47-.07 0 0-.27.08-.68.22-.4-1.16-1.11-2.22-2.36-2.22h-.1C8.15.42 7.6 0 6.96 0 4.47 0 3.24 3.12 2.85 4.7c-1.02.31-1.74.54-1.83.57-.57.18-.59.2-.66.73C.3 6.45-1 17.25-1 17.25L12.18 20l6.82-1.5S15.4 3.85 15.34 3.8z" />
          </svg>
        </div>
      </motion.div>

      {/* Nuvemshop logo - floating bottom-left */}
      <motion.div
        className="absolute"
        style={{
          bottom: "10%",
          left: "10%",
          animation: "vibrate 3.5s ease-in-out infinite 0.5s, float 5s ease-in-out infinite 1s",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.6, ease: "backOut" }}
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#0a0a0a] border border-purple/20 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-purple/5">
          <svg className="w-7 h-7 md:w-8 md:h-8 text-[#2B2FFC]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 12.5c0-1.58-.46-3.05-1.24-4.29C17.52 6.74 16.4 5.6 15 5c.04.35.06.7.06 1.06 0 3.31-2.69 6-6 6-.36 0-.71-.03-1.06-.09.4 1.4 1.54 2.52 3.01 3.26C12.25 15.97 13.72 16.5 15.3 16.5c2.32 0 4.2-1.79 4.2-4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        </div>
      </motion.div>

      {/* n8n badge - floating top-left */}
      <motion.div
        className="absolute"
        style={{
          top: "15%",
          left: "8%",
          animation: "vibrate 2.8s ease-in-out infinite 0.2s, float 3.5s ease-in-out infinite 0.5s",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "backOut" }}
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#0a0a0a] border border-[#FF6D5A]/20 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-[#FF6D5A]/5">
          <span className="text-[#FF6D5A] font-bold text-xs md:text-sm">n8n</span>
        </div>
      </motion.div>

      {/* Connecting energy particles */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-neon/60"
        animate={{
          x: [0, 80, 160, 80, 0],
          y: [0, -60, 0, 60, 0],
          opacity: [0.3, 0.8, 0.3, 0.8, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-purple/60"
        animate={{
          x: [0, -60, -120, -60, 0],
          y: [0, 40, 0, -40, 0],
          opacity: [0.3, 0.7, 0.3, 0.7, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}
