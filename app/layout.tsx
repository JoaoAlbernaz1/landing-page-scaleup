import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import MetaPixel from "@/components/MetaPixel"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const defaultTitle = "ScaleUp.gg | Crie e escale sua loja"
const defaultDescription =
  "Criação e escala de e-commerce para Shopify e Nuvemshop. Funil, conversão, tracking e automações via n8n para começar do zero ou crescer com consistência."

export const metadata: Metadata = {
  metadataBase: new URL("https://scaleup.gg"),
  title: {
    default: defaultTitle,
    template: "%s | ScaleUp.gg",
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "https://scaleup.gg/",
    siteName: "ScaleUp.gg",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#020202",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-neon focus:text-[#020202] focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Pular para o conteúdo
        </a>
        {children}
        <Analytics />
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
      </body>
    </html>
  )
}
