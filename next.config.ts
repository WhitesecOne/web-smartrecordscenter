import type { NextConfig } from "next"

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Points agents at the machine-readable site description from every response.
  { key: "Link", value: '</llms.txt>; rel="alternate"; type="text/markdown", </llms-full.txt>; rel="alternate"; type="text/markdown"' },
]

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
  // URLs from the earlier five-module structure, kept alive for anyone who saved or shared them.
  async redirects() {
    return [
      { source: "/solusi", destination: "/industri", permanent: true },
      { source: "/modul/tata-kelola-informasi", destination: "/modul/retensi-penyusutan", permanent: true },
      { source: "/modul/ai-otomasi", destination: "/modul", permanent: true },
      { source: "/modul/preservasi-digital", destination: "/modul/repositori-arsip", permanent: true },
      { source: "/modul/audit-bukti", destination: "/modul/jejak-audit", permanent: true },
    ]
  },
}

export default nextConfig
