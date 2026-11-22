import type { MetadataRoute } from "next"

import { modules } from "@/lib/modules"
import { site } from "@/lib/site"

// Canonical 200 pages only: no thank-you page, no 404.
const paths = [
  "/",
  "/platform",
  "/platform/cara-kerja",
  "/platform/arsitektur",
  "/platform/keamanan",
  "/modul",
  ...modules.map((m) => `/modul/${m.slug}`),
  "/industri",
  "/portofolio",
  "/mengapa-kami",
  "/tentang-kami",
  "/kontak",
  "/kebijakan-privasi",
  "/syarat-ketentuan",
]

// Date of the last content revision; bump it when page copy changes.
const lastModified = new Date("2026-11-22")

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: new URL(p, site.url).href, lastModified }))
}
