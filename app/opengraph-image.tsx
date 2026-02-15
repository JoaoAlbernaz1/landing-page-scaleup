import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020202",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 35% 45%, rgba(82, 0, 151, 0.35) 0%, rgba(192, 255, 0, 0.12) 45%, rgba(2, 2, 2, 1) 75%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 48,
            left: 64,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#C0FF00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#020202",
              fontSize: 26,
              fontWeight: 900,
            }}
          >
            ⚡
          </div>
          <div style={{ color: "#f5f5f5", fontSize: 28, fontWeight: 800 }}>
            ScaleUp<span style={{ color: "#C0FF00" }}>.gg</span>
          </div>
        </div>

        <div
          style={{
            width: 980,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            padding: "0 64px",
          }}
        >
          <div style={{ color: "#f5f5f5", fontSize: 72, fontWeight: 900, lineHeight: 1.04 }}>
            Crie sua loja e <span style={{ color: "#C0FF00" }}>escale</span> com performance.
          </div>
          <div style={{ color: "#c9c9c9", fontSize: 28, lineHeight: 1.4, maxWidth: 880 }}>
            Shopify e Nuvemshop com funil, conversão, tracking e automações via n8n para começar do zero ou crescer com consistência.
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <div
              style={{
                color: "#020202",
                background: "#C0FF00",
                padding: "10px 14px",
                borderRadius: 999,
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Diagnóstico gratuito de 15 min
            </div>
            <div
              style={{
                color: "#f5f5f5",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "10px 14px",
                borderRadius: 999,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Automação n8n
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
