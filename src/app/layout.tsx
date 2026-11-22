import type { Metadata, Viewport } from "next"
import { Red_Hat_Display, Red_Hat_Mono, Red_Hat_Text } from "next/font/google"

import { CookieConsent } from "@/components/cookie-consent"
import { JsonLd } from "@/components/json-ld"
import { MotionProvider } from "@/components/motion-provider"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StickyCta } from "@/components/sticky-cta"
import { siteGraph } from "@/lib/seo"
import { site } from "@/lib/site"

import "./globals.css"

const display = Red_Hat_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" })
const text = Red_Hat_Text({ subsets: ["latin"], variable: "--font-text", display: "swap" })
const mono = Red_Hat_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  category: "Enterprise Software",
  authors: [{ name: site.entity, url: site.url }],
  creator: site.entity,
  publisher: site.entity,
  keywords: [
    "Smart Records Center",
    "tata kelola arsip digital",
    "aplikasi kearsipan digital Indonesia",
    "sistem manajemen arsip elektronik",
    "records management Indonesia",
    "information governance",
    "verifikasi dan pemilahan arsip",
    "klasifikasi arsip",
    "repositori arsip multi-tenant",
    "jadwal retensi arsip JRA",
    "penyusutan arsip digital",
    "jejak audit SHA-256",
    "dasbor kepatuhan kearsipan",
    "UU 43/2009 Kearsipan",
    "UU 27/2022 Pelindungan Data Pribadi",
    "ISO 15489",
    "ISO 23081",
    "Dublin Core ISO 15836",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    languages: { "id-ID": "/" },
    types: {
      "text/markdown": [
        { url: "/llms.txt", title: "Smart Records Center LLM Summary" },
        { url: "/llms-full.txt", title: "Smart Records Center LLM Full Documentation" },
      ],
    },
  },
  openGraph: {
    siteName: site.name,
    locale: "id_ID",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
}

export const viewport: Viewport = { themeColor: "#ffffff" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <JsonLd data={siteGraph()} />
        <MotionProvider>
          <SiteHeader />
          <main id="konten" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <StickyCta />
        </MotionProvider>
        <CookieConsent />
      </body>
    </html>
  )
}
