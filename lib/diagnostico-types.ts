export type FormType = "LOJA_ZERO" | "ESCALA"

export interface DiagnosticoPayload {
  formType: FormType
  nome: string
  marca: string
  whatsapp: string
  nicho: "eletrônicos" | "imobiliária" | "outro"
  nichoOutro?: string
  // Campos específicos para LOJA_ZERO
  vendeHoje?: "nao-vendo" | "whatsapp-direct" | "marketplace" | "loja-fisica"
  quantidadeProdutos?: "1-20" | "21-100" | "100-plus"
  maiorDificuldade?: string
  maiorDificuldadeOutra?: string
  objetivo30dias?: string
  // Campos específicos para ESCALA
  linkLoja?: string
  plataforma?: string
  rodaAnuncios?: string
  faturamentoMensal?: string
  ondePerdeVendas?: string
  ondePerdeVendasOutra?: string
  // Campos comuns
  utms: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_content?: string
    utm_term?: string
    fbclid?: string
    gclid?: string
  }
  timestamp: string
  consentimento: boolean
}
