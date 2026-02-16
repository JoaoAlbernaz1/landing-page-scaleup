"use client"

export function WhatsAppButton() {
  return (
    <a
      href="/diagnostico"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#C0FF00] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      style={{ animation: "whatsapp-pulse 2s ease-in-out infinite" }}
      aria-label="Agendar consultoria"
    >
      <svg
        className="w-7 h-7 text-[#020202]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </a>
  )
}
