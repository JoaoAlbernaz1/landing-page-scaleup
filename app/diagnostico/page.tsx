"use client"

import { useState } from "react"
import { DiagnosticoTabs } from "@/components/DiagnosticoTabs"
import { DiagnosticoLojaZeroForm } from "@/components/forms/DiagnosticoLojaZeroForm"
import { DiagnosticoEscalaForm } from "@/components/forms/DiagnosticoEscalaForm"
import { useUtm } from "@/hooks/use-utm"
import { Navbar } from "@/components/navbar"

type TabType = "LOJA_ZERO" | "ESCALA"

export default function DiagnosticoPage() {
  const utms = useUtm()
  const [activeTab, setActiveTab] = useState<TabType>("LOJA_ZERO")

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#020202] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Diagnóstico <span className="text-[#C0FF00]">ScaleUp.gg</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Responda em 2 minutos e receba um plano objetivo para criar ou escalar sua loja.
            </p>
          </div>

          <div className="bg-[#15171B] border border-[#15171B] rounded-lg p-6 sm:p-8">
            <DiagnosticoTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === "LOJA_ZERO" ? (
              <DiagnosticoLojaZeroForm utms={utms} />
            ) : (
              <DiagnosticoEscalaForm utms={utms} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
