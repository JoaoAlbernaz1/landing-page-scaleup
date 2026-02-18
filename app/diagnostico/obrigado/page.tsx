import { Navbar } from "@/components/navbar"

export default function ObrigadoPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#020202] pt-24 flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Obrigado!</h1>
          <p className="text-muted-foreground text-lg">
            Recebemos seu diagnóstico e em breve entraremos em contato pelo WhatsApp informado.
          </p>
        </div>
      </div>
    </>
  )
}
