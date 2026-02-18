"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUtm, type UtmParams } from "@/hooks/use-utm"
import type { DiagnosticoPayload } from "@/lib/diagnostico-types"
import { Loader2, CheckCircle2 } from "lucide-react"

const normalizeWhatsApp = (value: string): string => {
  const cleaned = value.replace(/\D/g, "")
  if (cleaned.startsWith("55")) {
    return cleaned
  }
  if (cleaned.length >= 10) {
    return `55${cleaned}`
  }
  return cleaned
}

const whatsappRegex = /^55[1-9]{2}9?[0-9]{8,9}$/

const escalaSchema = z
  .object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    marca: z.string().min(2, "Marca deve ter pelo menos 2 caracteres"),
    whatsapp: z
      .string()
      .min(10, "WhatsApp inválido")
      .transform(normalizeWhatsApp)
      .refine((val) => whatsappRegex.test(val), {
        message: "WhatsApp deve ter DDD e número válido",
      }),
    nicho: z.enum(["eletrônicos", "imobiliária", "outro"], {
      required_error: "Selecione um nicho",
    }),
    nichoOutro: z.string().optional(),
    linkLoja: z.string().url("URL inválida").min(1, "Link da loja é obrigatório"),
    plataforma: z.string().min(1, "Selecione a plataforma"),
    rodaAnuncios: z.string().min(1, "Selecione uma opção"),
    faturamentoMensal: z.string().min(1, "Selecione uma faixa"),
    ondePerdeVendas: z.string().min(1, "Selecione onde perde vendas"),
    ondePerdeVendasOutra: z.string().optional(),
    consentimento: z.boolean().refine((val) => val === true, {
      message: "Você precisa autorizar o contato",
    }),
  })
  .refine(
    (data) => {
      if (data.nicho === "outro" && !data.nichoOutro) {
        return false
      }
      return true
    },
    {
      message: "Informe o nicho",
      path: ["nichoOutro"],
    }
  )
  .refine(
    (data) => {
      if (data.ondePerdeVendas === "outro" && !data.ondePerdeVendasOutra) {
        return false
      }
      return true
    },
    {
      message: "Descreva onde perde vendas",
      path: ["ondePerdeVendasOutra"],
    }
  )

type FormData = z.infer<typeof escalaSchema>

interface DiagnosticoEscalaFormProps {
  utms: UtmParams
}

export function DiagnosticoEscalaForm({ utms }: DiagnosticoEscalaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(escalaSchema),
    defaultValues: {
      nome: "",
      marca: "",
      whatsapp: "",
      nicho: undefined,
      nichoOutro: "",
      linkLoja: "",
      plataforma: "",
      rodaAnuncios: "",
      faturamentoMensal: "",
      ondePerdeVendas: "",
      ondePerdeVendasOutra: "",
      consentimento: false,
    },
  })

  const nicho = watch("nicho")
  const ondePerdeVendas = watch("ondePerdeVendas")

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

      if (!webhookUrl) {
        throw new Error(
          "Webhook URL não configurada. Configure NEXT_PUBLIC_N8N_WEBHOOK_URL nas variáveis de ambiente da Vercel."
        )
      }

      const payload: DiagnosticoPayload = {
        formType: "ESCALA",
        nome: data.nome,
        marca: data.marca,
        whatsapp: data.whatsapp,
        nicho: data.nicho,
        nichoOutro: data.nicho === "outro" ? data.nichoOutro : undefined,
        linkLoja: data.linkLoja,
        plataforma: data.plataforma,
        rodaAnuncios: data.rodaAnuncios,
        faturamentoMensal: data.faturamentoMensal,
        ondePerdeVendas: data.ondePerdeVendas,
        ondePerdeVendasOutra:
          data.ondePerdeVendas === "outro" ? data.ondePerdeVendasOutra : undefined,
        utms: {
          utm_source: utms.utm_source,
          utm_medium: utms.utm_medium,
          utm_campaign: utms.utm_campaign,
          utm_content: utms.utm_content,
          utm_term: utms.utm_term,
          fbclid: utms.fbclid,
          gclid: utms.gclid,
        },
        timestamp: new Date().toISOString(),
        consentimento: data.consentimento,
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário")
      }

      // Dispara evento para Pixel (client-side) e CAPI (server-side)
      try {
        const eventId = uuidv4()

        if (typeof window !== "undefined" && (window as any).fbq) {
          ;(window as any).fbq("track", "CompleteRegistration", {}, { eventID: eventId })
        }

        await fetch("/api/fb-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_name: "CompleteRegistration",
            event_id: eventId,
            user_data: {
              ph: [data.whatsapp],
            },
          }),
        })
      } catch (trackingError) {
        console.error("Erro ao enviar evento para Meta Pixel/CAPI:", trackingError)
      }

      // Redireciona para página de obrigado
      if (typeof window !== "undefined") {
        window.location.href = "/diagnostico/obrigado"
      } else {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setSubmitError(
        error instanceof Error ? error.message : "Erro ao enviar formulário. Tente novamente."
      )
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-[#C0FF00]/20 p-4">
            <CheckCircle2 className="h-12 w-12 text-[#C0FF00]" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Recebido! Vou analisar e retornar.
        </h2>
        <p className="text-muted-foreground">
          Em breve entraremos em contato no WhatsApp informado.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Copy */}
      <div className="space-y-3 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          Sua loja já existe. Vamos escalar.
        </h3>
        <p className="text-muted-foreground">
          Se você já tem e-commerce, eu identifico onde você está perdendo vendas (conversão,
          checkout, tracking e automações) e te devolvo um plano objetivo para crescer.
        </p>
      </div>

      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="nome" className="text-foreground">
          Nome completo <span className="text-[#C0FF00]">*</span>
        </Label>
        <Input
          id="nome"
          {...register("nome")}
          placeholder="Seu nome completo"
          className="bg-[#15171B] border-[#15171B] focus-visible:border-[#C0FF00] focus-visible:ring-[#C0FF00]/20"
          aria-invalid={errors.nome ? "true" : "false"}
          disabled={isSubmitting}
        />
        {errors.nome && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.nome.message}
          </p>
        )}
      </div>

      {/* Marca */}
      <div className="space-y-2">
        <Label htmlFor="marca" className="text-foreground">
          Nome da marca/negócio <span className="text-[#C0FF00]">*</span>
        </Label>
        <Input
          id="marca"
          {...register("marca")}
          placeholder="Nome da sua marca"
          className="bg-[#15171B] border-[#15171B] focus-visible:border-[#C0FF00] focus-visible:ring-[#C0FF00]/20"
          aria-invalid={errors.marca ? "true" : "false"}
          disabled={isSubmitting}
        />
        {errors.marca && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.marca.message}
          </p>
        )}
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <Label htmlFor="whatsapp" className="text-foreground">
          WhatsApp (com DDD) <span className="text-[#C0FF00]">*</span>
        </Label>
        <Input
          id="whatsapp"
          type="tel"
          {...register("whatsapp")}
          placeholder="11987654321 ou +5511987654321"
          className="bg-[#15171B] border-[#15171B] focus-visible:border-[#C0FF00] focus-visible:ring-[#C0FF00]/20"
          aria-invalid={errors.whatsapp ? "true" : "false"}
          disabled={isSubmitting}
        />
        {errors.whatsapp && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.whatsapp.message}
          </p>
        )}
      </div>

      {/* Nicho */}
      <div className="space-y-2">
        <Label htmlFor="nicho" className="text-foreground">
          Nicho <span className="text-[#C0FF00]">*</span>
        </Label>
        <Select
          value={nicho}
          onValueChange={(value) => {
            setValue("nicho", value as any, { shouldValidate: true })
            if (value !== "outro") {
              setValue("nichoOutro", "")
            }
          }}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="nicho"
            className="bg-[#15171B] border-[#15171B] focus:border-[#C0FF00] focus:ring-[#C0FF00]/20 w-full"
            aria-invalid={errors.nicho ? "true" : "false"}
          >
            <SelectValue placeholder="Selecione o nicho" />
          </SelectTrigger>
          <SelectContent className="bg-[#15171B] border-[#15171B]">
            <SelectItem value="eletrônicos">Eletrônicos</SelectItem>
            <SelectItem value="imobiliária">Imobiliária</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.nicho && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.nicho.message}
          </p>
        )}
      </div>

      {/* Nicho Outro */}
      {nicho === "outro" && (
        <div className="space-y-2">
          <Label htmlFor="nichoOutro" className="text-foreground">
            Qual? <span className="text-[#C0FF00]">*</span>
          </Label>
          <Input
            id="nichoOutro"
            {...register("nichoOutro")}
            placeholder="Descreva seu nicho"
            className="bg-[#15171B] border-[#15171B] focus-visible:border-[#C0FF00] focus-visible:ring-[#C0FF00]/20"
            aria-invalid={errors.nichoOutro ? "true" : "false"}
            disabled={isSubmitting}
          />
          {errors.nichoOutro && (
            <p className="text-sm text-destructive" role="alert" aria-live="polite">
              {errors.nichoOutro.message}
            </p>
          )}
        </div>
      )}

      {/* Link da Loja */}
      <div className="space-y-2">
        <Label htmlFor="linkLoja" className="text-foreground">
          Link da loja/site <span className="text-[#C0FF00]">*</span>
        </Label>
        <Input
          id="linkLoja"
          type="url"
          {...register("linkLoja")}
          placeholder="https://sualoja.com.br"
          className="bg-[#15171B] border-[#15171B] focus-visible:border-[#C0FF00] focus-visible:ring-[#C0FF00]/20"
          aria-invalid={errors.linkLoja ? "true" : "false"}
          disabled={isSubmitting}
        />
        {errors.linkLoja && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.linkLoja.message}
          </p>
        )}
      </div>

      {/* Plataforma */}
      <div className="space-y-2">
        <Label htmlFor="plataforma" className="text-foreground">
          Plataforma <span className="text-[#C0FF00]">*</span>
        </Label>
        <Select
          value={watch("plataforma")}
          onValueChange={(value) => setValue("plataforma", value, { shouldValidate: true })}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="plataforma"
            className="bg-[#15171B] border-[#15171B] focus:border-[#C0FF00] focus:ring-[#C0FF00]/20 w-full"
            aria-invalid={errors.plataforma ? "true" : "false"}
          >
            <SelectValue placeholder="Selecione a plataforma" />
          </SelectTrigger>
          <SelectContent className="bg-[#15171B] border-[#15171B]">
            <SelectItem value="nuvemshop">Nuvemshop</SelectItem>
            <SelectItem value="shopify">Shopify</SelectItem>
            <SelectItem value="woocommerce">WooCommerce</SelectItem>
            <SelectItem value="outra">Outra</SelectItem>
            <SelectItem value="nao-sei">Não sei</SelectItem>
          </SelectContent>
        </Select>
        {errors.plataforma && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.plataforma.message}
          </p>
        )}
      </div>

      {/* Você roda anúncios hoje? */}
      <div className="space-y-2">
        <Label htmlFor="rodaAnuncios" className="text-foreground">
          Você roda anúncios hoje? <span className="text-[#C0FF00]">*</span>
        </Label>
        <Select
          value={watch("rodaAnuncios")}
          onValueChange={(value) => setValue("rodaAnuncios", value, { shouldValidate: true })}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="rodaAnuncios"
            className="bg-[#15171B] border-[#15171B] focus:border-[#C0FF00] focus:ring-[#C0FF00]/20 w-full"
            aria-invalid={errors.rodaAnuncios ? "true" : "false"}
          >
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent className="bg-[#15171B] border-[#15171B]">
            <SelectItem value="meta">Meta</SelectItem>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="ambos">Ambos</SelectItem>
            <SelectItem value="nao">Não</SelectItem>
          </SelectContent>
        </Select>
        {errors.rodaAnuncios && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.rodaAnuncios.message}
          </p>
        )}
      </div>

      {/* Faturamento mensal */}
      <div className="space-y-2">
        <Label htmlFor="faturamentoMensal" className="text-foreground">
          Faturamento mensal aproximado <span className="text-[#C0FF00]">*</span>
        </Label>
        <Select
          value={watch("faturamentoMensal")}
          onValueChange={(value) =>
            setValue("faturamentoMensal", value, { shouldValidate: true })
          }
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="faturamentoMensal"
            className="bg-[#15171B] border-[#15171B] focus:border-[#C0FF00] focus:ring-[#C0FF00]/20 w-full"
            aria-invalid={errors.faturamentoMensal ? "true" : "false"}
          >
            <SelectValue placeholder="Selecione uma faixa" />
          </SelectTrigger>
          <SelectContent className="bg-[#15171B] border-[#15171B]">
            <SelectItem value="nao-vendo">Ainda não vendo</SelectItem>
            <SelectItem value="ate-10k">Até 10k</SelectItem>
            <SelectItem value="10k-50k">10k–50k</SelectItem>
            <SelectItem value="50k-200k">50k–200k</SelectItem>
            <SelectItem value="200k-plus">200k+</SelectItem>
          </SelectContent>
        </Select>
        {errors.faturamentoMensal && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.faturamentoMensal.message}
          </p>
        )}
      </div>

      {/* Onde perde mais vendas */}
      <div className="space-y-2">
        <Label htmlFor="ondePerdeVendas" className="text-foreground">
          Onde perde mais vendas <span className="text-[#C0FF00]">*</span>
        </Label>
        <Select
          value={ondePerdeVendas}
          onValueChange={(value) => {
            setValue("ondePerdeVendas", value, { shouldValidate: true })
            if (value !== "outro") {
              setValue("ondePerdeVendasOutra", "")
            }
          }}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="ondePerdeVendas"
            className="bg-[#15171B] border-[#15171B] focus:border-[#C0FF00] focus:ring-[#C0FF00]/20 w-full"
            aria-invalid={errors.ondePerdeVendas ? "true" : "false"}
          >
            <SelectValue placeholder="Selecione onde perde vendas" />
          </SelectTrigger>
          <SelectContent className="bg-[#15171B] border-[#15171B]">
            <SelectItem value="pagina-produto">Página de produto</SelectItem>
            <SelectItem value="checkout">Checkout</SelectItem>
            <SelectItem value="falta-automacao">Falta automação</SelectItem>
            <SelectItem value="tracking-pixel">Tracking/pixel</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.ondePerdeVendas && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.ondePerdeVendas.message}
          </p>
        )}
      </div>

      {/* Onde perde vendas Outra */}
      {ondePerdeVendas === "outro" && (
        <div className="space-y-2">
          <Label htmlFor="ondePerdeVendasOutra" className="text-foreground">
            Qual? <span className="text-[#C0FF00]">*</span>
          </Label>
          <Input
            id="ondePerdeVendasOutra"
            {...register("ondePerdeVendasOutra")}
            placeholder="Descreva onde perde vendas"
            className="bg-[#15171B] border-[#15171B] focus-visible:border-[#C0FF00] focus-visible:ring-[#C0FF00]/20"
            aria-invalid={errors.ondePerdeVendasOutra ? "true" : "false"}
            disabled={isSubmitting}
          />
          {errors.ondePerdeVendasOutra && (
            <p className="text-sm text-destructive" role="alert" aria-live="polite">
              {errors.ondePerdeVendasOutra.message}
            </p>
          )}
        </div>
      )}

      {/* Consentimento */}
      <div className="flex items-start gap-3 p-4 rounded-lg border border-[#15171B] bg-[#15171B]">
        <Checkbox
          id="consentimento"
          checked={watch("consentimento")}
          onCheckedChange={(checked) =>
            setValue("consentimento", checked === true, { shouldValidate: true })
          }
          className="mt-0.5"
          aria-invalid={errors.consentimento ? "true" : "false"}
          disabled={isSubmitting}
        />
        <Label
          htmlFor="consentimento"
          className="text-sm text-foreground cursor-pointer leading-relaxed"
        >
          Autorizo receber contato da ScaleUp.gg (WhatsApp/ligação) com base nas informações
          acima. <span className="text-[#C0FF00]">*</span>
        </Label>
      </div>
      {errors.consentimento && (
        <p className="text-sm text-destructive" role="alert" aria-live="polite">
          {errors.consentimento.message}
        </p>
      )}

      {/* Erro de submit */}
      {submitError && (
        <div
          className="p-4 rounded-lg border border-destructive bg-destructive/10 text-destructive"
          role="alert"
          aria-live="polite"
        >
          {submitError}
        </div>
      )}

      {/* Botão Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#C0FF00] text-[#020202] hover:bg-[#C0FF00]/90 font-semibold h-12 text-base"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Quero escalar minha loja"
        )}
      </Button>
    </form>
  )
}
