import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const PIXEL_ID = "924799370104674"
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

  if (!ACCESS_TOKEN) {
    console.error("Token de acesso do Meta (META_ACCESS_TOKEN) não configurado.")
    return NextResponse.json({ error: "Meta Access Token not configured" }, { status: 500 })
  }

  try {
    const body = await req.json()
    const { event_name, event_id, user_data } = body

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id,
          user_data: {
            client_ip_address: req.ip ?? "0.0.0.0",
            client_user_agent: req.headers.get("user-agent") ?? "",
            ...user_data,
          },
        },
      ],
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error("Erro ao enviar evento para a CAPI do Meta:", result)
      return NextResponse.json(result, { status: response.status })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Erro interno na API Route:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

