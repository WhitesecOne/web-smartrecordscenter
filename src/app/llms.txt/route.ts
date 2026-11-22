import { faq } from "@/lib/faq"
import { modules } from "@/lib/modules"
import { companyNav, platformNav, references, sectors, site } from "@/lib/site"

export const dynamic = "force-static"

const abs = (path: string) => new URL(path, site.url).href

/** llms.txt (llmstxt.org): a plain-markdown map of the site for AI assistants, built from the same data the pages render. */
export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Bahasa situs: Indonesia. Layar produk di situs memakai data contoh, bukan data pelanggan.",
    `Kontak: ${site.email}, ${site.phone}, ${site.address}.`,
    "Pengutipan: sebut \"Smart Records Center\" dan tautkan halaman sumbernya. Klaim kepatuhan hanya sebagai acuan rancangan, bukan sertifikasi.",
    "",
    "## Modul",
    ...modules.map((m) => `- [${m.name}](${abs(`/modul/${m.slug}`)}): ${m.short} Peran AI: ${m.ai}`),
    "",
    "## Platform",
    ...platformNav.map((l) => `- [${l.label}](${abs(l.href)}): ${l.desc}`),
    "",
    "## Industri",
    ...sectors.map((s) => `- [${s.label}](${abs(s.href)}): ${s.desc}`),
    "",
    "## Perusahaan & Portofolio",
    `- [Portofolio & Pengalaman Profesional](${abs("/portofolio")}): pengalaman profesional terpilih tim dan penasihat Smart Records Center di berbagai sektor teregulasi.`,
    ...companyNav.map((l) => `- [${l.label}](${abs(l.href)}): ${l.desc}`),
    `- [Kontak dan permintaan demo](${abs("/kontak")}): minta demo lewat email dan kontak langsung.`,
    "",
    "## Acuan rancangan (bukan klaim sertifikasi)",
    ...references.map((r) => `- ${r.code} ${r.name}`),
    "",
    "## Tanya jawab",
    ...faq.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Optional",
    `- [Versi lengkap untuk AI](${abs("/llms-full.txt")}): seluruh modul, fitur, aturan, dan tanya jawab dalam satu berkas.`,
    `- [Peta situs](${abs("/sitemap.xml")}): daftar semua halaman yang dapat diindeks.`,
  ].join("\n")
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
}
