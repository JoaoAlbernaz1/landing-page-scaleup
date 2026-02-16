"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type TabType = "LOJA_ZERO" | "ESCALA"

interface DiagnosticoTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function DiagnosticoTabs({ activeTab, onTabChange }: DiagnosticoTabsProps) {
  return (
    <div className="flex gap-2 mb-6 border-b border-[#15171B]">
      <button
        type="button"
        onClick={() => onTabChange("LOJA_ZERO")}
        className={cn(
          "px-6 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px",
          activeTab === "LOJA_ZERO"
            ? "text-[#C0FF00] border-[#C0FF00]"
            : "text-muted-foreground border-transparent hover:text-foreground"
        )}
        aria-pressed={activeTab === "LOJA_ZERO"}
        aria-label="Não tenho loja"
      >
        Não tenho loja
      </button>
      <button
        type="button"
        onClick={() => onTabChange("ESCALA")}
        className={cn(
          "px-6 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px",
          activeTab === "ESCALA"
            ? "text-[#C0FF00] border-[#C0FF00]"
            : "text-muted-foreground border-transparent hover:text-foreground"
        )}
        aria-pressed={activeTab === "ESCALA"}
        aria-label="Já tenho loja (quero escalar)"
      >
        Já tenho loja (quero escalar)
      </button>
    </div>
  )
}
