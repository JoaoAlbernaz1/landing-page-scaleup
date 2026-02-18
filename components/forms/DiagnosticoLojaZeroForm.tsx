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

const lojaZeroSchema = z
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
    vendeHoje: z.enum(["nao-vendo", "whatsapp-direct", "marketplace", "loja-fisica"], {
      required_error: "Selecione uma opção",
    }),
    quantidadeProdutos: z.enum(["1-20", "21-100", "100-plus"], {
      required_error: "Selecione uma opção",
    }),
    maiorDificuldade: z.string().min(1, "Selecione uma dificuldade"),
    maiorDificuldadeOutra: z.string().optional(),
    objetivo30dias: z.string().min(1, "Selecione um objetivo"),
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
      if (data.maiorDificuldade === "outro" && !data.maiorDificuldadeOutra) {
        return false
      }
      return true
    },
    {
      message: "Descreva a dificuldade",
      path: ["maiorDificuldadeOutra"],
    }
  )

type FormData = z.infer<typeof lojaZeroSchema>

interface DiagnosticoLojaZeroFormProps {
  utms: UtmParams
}

export function DiagnosticoLojaZeroForm({ utms }: DiagnosticoLojaZeroFormProps) {
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
    resolver: zodResolver(lojaZeroSchema),
    defaultValues: {
      nome: "",
      marca: "",
      whatsapp: "",
      nicho: undefined,
      nichoOutro: "",
      vendeHoje: undefined,
      quantidadeProdutos: undefined,
      maiorDificuldade: "",
      maiorDificuldadeOutra: "",
      objetivo30dias: "",
      consentimento: false,
    },
  })

  const nicho = watch("nicho")
  const maiorDificuldade = watch("maiorDificuldade")

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
        formType: "LOJA_ZERO",
        nome: data.nome,
        marca: data.marca,
        whatsapp: data.whatsapp,
        nicho: data.nicho,
        nichoOutro: data.nicho === "outro" ? data.nichoOutro : undefined,
        vendeHoje: data.vendeHoje,
        quantidadeProdutos: data.quantidadeProdutos,
        maiorDificuldade: data.maiorDificuldade,
        maiorDificuldadeOutra:
          data.maiorDificuldade === "outro" ? data.maiorDificuldadeOutra : undefined,
        objetivo30dias: data.objetivo30dias,
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
          Crie sua loja online pronta para vender
        </h3>
        <p className="text-muted-foreground">
          Se você ainda vende pelo WhatsApp/Direct ou está começando, eu te devolvo um plano claro
          para lançar sua loja do jeito certo (checkout, Pix/cartão, frete e estrutura mínima pra
          anúncios).
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

      {/* Você vende hoje? */}
      <div className="space-y-2">
        <Label htmlFor="vendeHoje" className="text-foreground">
          Você vende hoje? <span className="text-[#C0FF00]">*</span>
        </Label>
        <Select
          value={watch("vendeHoje")}
          onValueChange={(value) => setValue("vendeHoje", value as any, { shouldValidate: true })}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="vendeHoje"
            className="bg-[#15171B] border-[#15171B] focus:border-[#C0FF00] focus:ring-[#C0FF00]/20 w-full"
            aria-invalid={errors.vendeHoje ? "true" : "false"}
          >
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent className="bg-[#15171B] border-[#15171B]">
            <SelectItem value="nao-vendo">Ainda não vendo</SelectItem>
            <SelectItem value="whatsapp-direct">WhatsApp/Direct</SelectItem>
            <SelectItem value="marketplace">Marketplace</SelectItem>
            <SelectItem value="loja-fisica">Loja física</SelectItem>
          </SelectContent>
        </Select>
        {errors.vendeHoje && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.vendeHoje.message}
          </p>
        )}
      </div>

      {/* Quantos produtos */}
      <div className="space-y-2">
        <Label htmlFor="quantidadeProdutos" className="text-foreground">
          Quantos produtos pretende vender no começo? <span className="text-[#C0FF00]">*</span>
        </Label>
        <Select
          value={watch("quantidadeProdutos")}
          onValueChange={(value) =>
            setValue("quantidadeProdutos", value as any, { shouldValidate: true })
          }
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="quantidadeProdutos"
            className="bg-[#15171B] border-[#15171B] focus:border-[#C0FF00] focus:ring-[#C0FF00]/20 w-full"
            aria-invalid={errors.quantidadeProdutos ? "true" : "false"}
          >
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent className="bg-[#15171B] border-[#15171B]">
            <SelectItem value="1-20">1–20</SelectItem>
            <SelectItem value="21-100">21–100</SelectItem>
            <SelectItem value="100-plus">100+</SelectItem>
          </SelectContent>
        </Select>
        {errors.quantidadeProdutos && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.quantidadeProdutos.message}
          </p>
        )}
      </div>

      {/* Maior dificuldade */}
      <div className="space-y-2">
        <Label htmlFor="maiorDificuldade" className="text-foreground">
          Maior dificuldade hoje <span className="text-[#C0FF00]">*</span>
        </Label>
        <Select
          value={maiorDificuldade}
          onValueChange={(value) => {
            setValue("maiorDificuldade", value, { shouldValidate: true })
            if (value !== "outro") {
              setValue("maiorDificuldadeOutra", "")
            }
          }}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="maiorDificuldade"
            className="bg-[#15171B] border-[#15171B] focus:border-[#C0FF00] focus:ring-[#C0FF00]/20 w-full"
            aria-invalid={errors.maiorDificuldade ? "true" : "false"}
          >
            <SelectValue placeholder="Selecione uma dificuldade" />
          </SelectTrigger>
          <SelectContent className="bg-[#15171B] border-[#15171B]">
            <SelectItem value="nao-sei-comecar">Não sei por onde começar</SelectItem>
            <SelectItem value="medo-investir">Tenho medo de investir errado</SelectItem>
            <SelectItem value="falta-tempo">Falta tempo</SelectItem>
            <SelectItem value="quero-pronto">Quero algo pronto e rápido</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.maiorDificuldade && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.maiorDificuldade.message}
          </p>
        )}
      </div>

      {/* Maior dificuldade Outra */}
      {maiorDificuldade === "outro" && (
        <div className="space-y-2">
          <Label htmlFor="maiorDificuldadeOutra" className="text-foreground">
            Qual? <span className="text-[#C0FF00]">*</span>
          </Label>
          <Input
            id="maiorDificuldadeOutra"
            {...register("maiorDificuldadeOutra")}
            placeholder="Descreva a dificuldade"
            className="bg-[#15171B] border-[#15171B] focus-visible:border-[#C0FF00] focus-visible:ring-[#C0FF00]/20"
            aria-invalid={errors.maiorDificuldadeOutra ? "true" : "false"}
            disabled={isSubmitting}
          />
          {errors.maiorDificuldadeOutra && (
            <p className="text-sm text-destructive" role="alert" aria-live="polite">
              {errors.maiorDificuldadeOutra.message}
            </p>
          )}
        </div>
      )}

      {/* Objetivo 30 dias */}
      <div className="space-y-2">
        <Label htmlFor="objetivo30dias" className="text-foreground">
          Objetivo 30 dias <span className="text-[#C0FF00]">*</span>
        </Label>
        <Select
          value={watch("objetivo30dias")}
          onValueChange={(value) => setValue("objetivo30dias", value, { shouldValidate: true })}
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="objetivo30dias"
            className="bg-[#15171B] border-[#15171B] focus:border-[#C0FF00] focus:ring-[#C0FF00]/20 w-full"
            aria-invalid={errors.objetivo30dias ? "true" : "false"}
          >
            <SelectValue placeholder="Selecione um objetivo" />
          </SelectTrigger>
          <SelectContent className="bg-[#15171B] border-[#15171B]">
            <SelectItem value="criar-loja-vender">Criar loja e começar a vender</SelectItem>
            <SelectItem value="criar-loja-anunciar">Criar loja e já anunciar</SelectItem>
            <SelectItem value="organizar-primeiro">Organizar tudo primeiro</SelectItem>
          </SelectContent>
        </Select>
        {errors.objetivo30dias && (
          <p className="text-sm text-destructive" role="alert" aria-live="polite">
            {errors.objetivo30dias.message}
          </p>
        )}
      </div>

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
          "Quero minha loja"
        )}
      </Button>
    </form>
  )
}
