export const WHATSAPP_NUMBER = "5561974022641"

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Quero criar ou escalar minha loja com a consultoria gratuita de 15 minutos da ScaleUp.gg."

export function getWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  // Usa a variável de ambiente se disponível, senão usa o padrão
  const number =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_WHATSAPP_NUMBER) ||
    WHATSAPP_NUMBER
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_LINK = getWhatsAppLink()
