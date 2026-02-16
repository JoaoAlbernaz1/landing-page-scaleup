"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"

export default function ObrigadoPage() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para o formulário, já que o sucesso é mostrado inline
    router.push("/diagnostico")
  }, [router])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#020202] pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecionando...</p>
        </div>
      </div>
    </>
  )
}
