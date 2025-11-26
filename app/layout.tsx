import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mapa Inteligente de Acessibilidade da Cidade",
  description:
    "Sistema que identifica automaticamente barreiras urbanas para promover mobilidade e inclusão com base em dados e IA",
  generator: "v0.app",
  keywords: ["acessibilidade", "mobilidade urbana", "inclusão", "IA", "gestão pública", "dados urbanos"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${geist.className} font-sans antialiased`}>{children}</body>
    </html>
  )
}
