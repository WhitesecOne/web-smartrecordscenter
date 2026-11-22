"use client"

import { CheckIcon } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

import { cn } from "@/lib/utils"

const stages = [
  {
    step: "01",
    year: "12 Mar 2026",
    name: "Diterima & Dipilah",
    desc: "Dokumen dipilah dari non-arsip, diverifikasi kelengkapannya, diklasifikasikan, lalu disimpan ke repositori organisasi.",
    modules: ["Verifikasi & Pemilahan Arsip", "Klasifikasi Arsip", "Repositori Arsip"],
    rule: "Dokumen non-arsip dipisahkan ke karantina; arsip final wajib memiliki kode klasifikasi dan metadata wajib.",
    evidence: "Keputusan pemilahan, hash SHA-256 berkas, usulan AI beserta skornya, dan peninjau.",
  },
  {
    step: "02",
    year: "2026 s.d. 2028",
    name: "Aktif",
    desc: "Dipakai unit pengolah dan ditemukan lewat pencarian. Masa aktif 2 tahun dihitung otomatis sejak berkas ditutup.",
    modules: ["Pencarian & Temu Kembali", "Jejak Audit"],
    rule: "Akses disaring peran, unit kerja, dan tingkat keamanan; tanggal pindah inaktif dihitung mesin aturan.",
    evidence: "Riwayat versi dokumen, tanggal penutupan berkas, dan log pencarian atas arsip rahasia.",
  },
  {
    step: "03",
    year: "2028 s.d. 2036",
    name: "Inaktif",
    desc: "Pindah ke unit kearsipan pada tanggal hitungan mesin aturan. Hanya baca, setiap peminjaman memakai izin berbatas waktu.",
    modules: ["Retensi & Penyusutan", "Jejak Audit"],
    rule: "Perubahan isi ditolak; daftar jatuh tempo penyusutan tersedia jauh hari sebelum batas retensi berakhir.",
    evidence: "Catatan perpindahan status, izin peminjaman berbatas waktu, dan hasil cek keutuhan berkala.",
  },
  {
    step: "04",
    year: "2036",
    name: "Permanen atau Musnah",
    desc: "Sesuai nasib akhir di JRA: diserahkan sebagai arsip permanen di media write-once, atau dimusnahkan lewat persetujuan berjenjang.",
    modules: ["Retensi & Penyusutan", "Pelaporan (Dashboard)"],
    rule: "Pengusul dan penyetuju batch harus berbeda; arsip vital dan legal hold tidak pernah dimusnahkan.",
    evidence: "Paket penyerahan permanen atau berita acara pemusnahan digital beserta hash setiap berkas.",
  },
]

/** Interactive 4-stage record lifecycle explorer: click any stage to inspect its rules and audit evidence. */
export function LifecycleTimeline({ className }: { className?: string }) {
  const [active, setActive] = useState(0)
  const current = stages[active]

  return (
    <div className={cn("relative", className)}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-mist/70 px-4 py-3 text-sm text-muted-foreground">
        <p>
          Contoh siklus: <span className="font-semibold text-navy">Laporan keuangan tahunan</span> · kode <span className="code text-navy">KU.01.02</span> · aktif 2 tahun,
          inaktif 8 tahun, nasib akhir permanen.
        </p>
        <span className="text-xs font-semibold text-brand">Pilih tahap untuk melihat aturan &amp; bukti</span>
      </div>

      {/* 4 interactive stage cards connected by an architectural track */}
      <div className="relative">
        <div aria-hidden className="absolute top-6 right-[12%] left-[12%] hidden h-0.5 bg-border md:block">
          <motion.span
            className="block h-full origin-left bg-brand"
            animate={{ scaleX: active / (stages.length - 1) }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <ol className="relative grid gap-4 md:grid-cols-4">
          {stages.map((s, i) => {
            const on = i === active
            const done = i < active
            return (
              <li key={s.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={cn(
                    "group flex h-full w-full flex-col rounded-xl border p-5 text-left transition-all",
                    on
                      ? "border-brand bg-white shadow-product ring-1 ring-brand/15"
                      : "border-border bg-white/80 hover:border-navy/30 hover:bg-white hover:shadow-card",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-md text-xs font-bold transition-colors",
                        on ? "bg-brand text-white" : done ? "bg-navy text-white" : "bg-mist text-navy ring-1 ring-border",
                      )}
                    >
                      {s.step}
                    </span>
                    <span className="code text-[11.5px] font-medium text-muted-foreground">{s.year}</span>
                  </div>
                  <h3 className={cn("mt-4 text-base font-bold transition-colors", on ? "text-brand" : "text-navy group-hover:text-brand")}>{s.name}</h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-body">{s.desc}</p>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Active stage governance detail panel */}
      <div className="mt-4 grid gap-4 rounded-xl border border-border bg-white p-5 shadow-card lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-6 lg:p-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Aturan yang ditegakkan</p>
          <p className="mt-2 flex gap-2.5 text-[0.9375rem] leading-relaxed text-navy">
            <CheckIcon className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
            {current.rule}
          </p>
        </div>
        <div className="border-t border-border pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Bukti yang tercatat</p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{current.evidence}</p>
        </div>
        <div className="border-t border-border pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Modul yang bekerja</p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {current.modules.map((m) => (
              <li key={m} className="rounded-md border border-brand/20 bg-brand-wash px-2.5 py-1 text-xs font-semibold text-brand-ink">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
