export const WHATSAPP_NUMBER = "5561974022641"

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Quero criar ou escalar minha loja com a consultoria gratuita de 15 minutos da ScaleUp.gg."

export function getWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_LINK = getWhatsAppLink()
