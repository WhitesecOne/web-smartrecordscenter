import { faq } from "@/lib/faq"
import { modules } from "@/lib/modules"
import { companyNav, platformNav, references, sectors, site } from "@/lib/site"

export const dynamic = "force-static"

const abs = (path: string) => new URL(path, site.url).href

/** llms-full.txt: the whole product description in one markdown file, built from the data the pages render so it cannot drift. */
export function GET() {
  const body = [
    `# ${site.name}: dokumentasi lengkap`,
    "",
    `> ${site.description}`,
    "",
    "Bahasa situs: Indonesia. Layar produk di situs memakai data contoh, bukan data pelanggan. Ringkasan singkat ada di " + abs("/llms.txt") + ".",
    "",
    "## Kontak",
    `- Email: ${site.email}`,
    `- Telepon: ${site.phone}`,
    `- Alamat: ${site.address}`,
    `- Minta demo: ${abs("/kontak")}`,
    "",
    "## Halaman utama",
    ...[...platformNav, ...companyNav].map((l) => `- [${l.label}](${abs(l.href)}): ${l.desc}`),
    "",
    "## Industri",
    ...sectors.map((s) => `- [${s.label}](${abs(s.href)}): ${s.desc}`),
    "",
    "# Tujuh modul",
    ...modules.flatMap((m, i) => [
      "",
      `## ${i + 1}. ${m.name}`,
      `Halaman: ${abs(`/modul/${m.slug}`)}`,
      "",
      m.title + ".",
      "",
      m.lead,
      "",
      `Peran AI: ${m.ai}`,
      "",
      "### Fitur",
      ...m.features.flatMap((f) => [
        `#### ${f.name}${f.ai ? " (dibantu AI, ditinjau manusia)" : ""}`,
        f.desc,
        ...f.points.map((p) => `- ${p}`),
        "",
      ]),
      "### Aturan dan bukti",
      ...m.rules.map((r) => `- ${r.part}: ${r.does}. Aturan: ${r.rule}. Bukti: ${r.evidence}.`),
    ]),
    "",
    "# Acuan rancangan (bukan klaim sertifikasi)",
    ...references.map((r) => `- ${r.code} ${r.name}`),
    "",
    "# Tanya jawab",
    ...faq.flatMap((f) => ["", `## ${f.q}`, f.a]),
    "",
  ].join("\n")
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
}
