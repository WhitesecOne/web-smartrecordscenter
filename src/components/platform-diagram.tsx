import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { modules, type Module } from "@/lib/modules"
import { cn } from "@/lib/utils"

const bySlug = (s: Module["slug"]) => modules.find((m) => m.slug === s)!

// Three layers in the order a record meets them: 1-2-3, 4-5, 6-7.
const layers: { step: string; name: string; desc: string; slugs: Module["slug"][] }[] = [
  { step: "Lapisan 01", name: "Diterima dan ditata", desc: "Dokumen dipilah, diklasifikasikan, dan disimpan di repositori.", slugs: ["verifikasi-pemilahan-arsip", "klasifikasi-arsip", "repositori-arsip"] },
  { step: "Lapisan 02", name: "Dipakai dan dijaga", desc: "Arsip ditemukan kembali dan dikelola sesuai retensinya.", slugs: ["pencarian-temu-kembali", "retensi-penyusutan"] },
  { step: "Lapisan 03", name: "Dibuktikan", desc: "Setiap aksi tercatat dan dilaporkan di dasbor kepatuhan.", slugs: ["jejak-audit", "pelaporan"] },
]

function Node({ m }: { m: Module }) {
  const num = String(modules.indexOf(m) + 1).padStart(2, "0")
  return (
    <Link
      href={`/modul/${m.slug}`}
      className="group flex items-start gap-3.5 rounded-xl border border-border bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-product"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-brand/15 bg-brand-wash text-brand transition-colors group-hover:bg-brand group-hover:text-white">
        <m.icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="code text-[11px] font-semibold text-muted-foreground">Modul {num}</span>
          <ArrowRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
        </span>
        <span className="mt-0.5 block font-heading text-[0.95rem] font-bold text-navy group-hover:text-brand">{m.name}</span>
        <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">{m.short}</span>
      </span>
    </Link>
  )
}

/** The seven modules as three precision layers over one shared base of data, rules and audit log. */
export function PlatformDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-6xl rounded-2xl border border-border bg-mist/60 p-4 sm:p-6", className)}>
      <ol className="flex flex-col gap-3.5">
        {layers.map((l) => (
          <li key={l.name} className="grid gap-3 rounded-xl border border-border bg-white/75 p-3.5 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-center lg:gap-5 lg:p-4">
            <div className="px-1">
              <p className="code text-[11px] font-semibold text-brand-ink uppercase">{l.step}</p>
              <p className="mt-1 font-heading font-bold text-navy">{l.name}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{l.desc}</p>
            </div>
            <div className={cn("grid gap-3 sm:grid-cols-2", l.slugs.length === 3 && "lg:grid-cols-3")}>
              {l.slugs.map((s) => (
                <Node key={s} m={bySlug(s)} />
              ))}
            </div>
          </li>
        ))}
      </ol>
      <div className="relative isolate mt-3.5 grid gap-5 overflow-hidden rounded-xl bg-navy p-5 text-white sm:grid-cols-2 lg:p-6">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-10 opacity-70" />
        <p>
          <span className="block font-heading font-bold">Satu sumber data terpadu</span>
          <span className="mt-1 block text-[0.9rem] leading-relaxed text-white/80">
            Arsip, metadata standar, jadwal retensi, dan hak akses yang sama dipakai oleh ketujuh modul tanpa duplikasi.
          </span>
        </p>
        <p className="sm:border-l sm:border-white/15 sm:pl-6">
          <span className="block font-heading font-bold">AI dengan kendali arsiparis</span>
          <span className="mt-1 block text-[0.9rem] leading-relaxed text-white/80">
            Setiap modul memakai AI untuk mengusulkan dan mempercepat verifikasi. Keputusan dan peninjaunya tercatat permanen di jejak audit.
          </span>
        </p>
      </div>
    </div>
  )
}
