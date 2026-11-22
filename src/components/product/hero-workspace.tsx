"use client"

import {
  ArchiveIcon,
  CalendarClockIcon,
  CheckCircle2Icon,
  FileCheck2Icon,
  RotateCcwIcon,
  ScrollTextIcon,
  ShieldCheckIcon,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Code, Confidence, MockFrame, StatusBadge } from "@/components/product/ui"
import { Badge } from "@/components/ui/badge"
import { sampleClasses, sampleRecords, type Status } from "@/lib/sample"
import { cn } from "@/lib/utils"

type ViewKey = "triage" | "records" | "retention" | "audit"

const views: { key: ViewKey; label: string; icon: typeof FileCheck2Icon }[] = [
  { key: "triage", label: "Pemilahan AI", icon: FileCheck2Icon },
  { key: "records", label: "Repositori", icon: ArchiveIcon },
  { key: "retention", label: "Retensi & JRA", icon: CalendarClockIcon },
  { key: "audit", label: "Jejak Audit", icon: ScrollTextIcon },
]

type TriageItem = {
  id: string
  doc: string
  why: string
  proposal: "Arsip" | "Non-arsip" | "Perlu review"
  conf: number
  state: "pending" | "confirmed" | "quarantined"
}

const initialTriage: TriageItem[] = [
  { id: "t1", doc: "SK Direksi No. 14/2026 tentang SOTK.pdf", why: "Keputusan resmi · bernilai guna", proposal: "Arsip", conf: 0.98, state: "pending" },
  { id: "t2", doc: "Kontrak Sewa Gedung 2026-2028.pdf", why: "Perjanjian hukum · retensi 10 th", proposal: "Arsip", conf: 0.96, state: "pending" },
  { id: "t3", doc: "Notifikasi Pemeliharaan Sistem.eml", why: "Pemberitahuan otomatis sistem", proposal: "Non-arsip", conf: 0.95, state: "pending" },
  { id: "t4", doc: "Draf Lampiran Rapat (Sementara).docx", why: "Belum final · cek penetapan", proposal: "Perlu review", conf: 0.74, state: "pending" },
]

const statusFilters: { key: "all" | Status; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "active", label: "Aktif" },
  { key: "inactive", label: "Inaktif" },
  { key: "permanent", label: "Permanen" },
  { key: "pending", label: "Menunggu" },
]

const auditPreview = [
  { seq: 48382, act: "pemilahan.konfirmasi", target: "KEU-2026-000123", actor: "arsiparis#12", hash: "4c92a1…8e10" },
  { seq: 48383, act: "klasifikasi.tetapkan", target: "KEU-2026-000123", actor: "arsiparis#12", hash: "8a10f4…c219" },
  { seq: 48384, act: "hold.dipasang", target: "PGD-2014-000033", actor: "hukum#03", hash: "a7bf02…91d4" },
  { seq: 48385, act: "bukti.ekspor", target: "PKT-2026-0011", actor: "auditor#02", hash: "1e0192…3f7a" },
]

/** Interactive command workspace on the home hero: switch views, triage documents, filter records live. */
export function HeroWorkspace({ className }: { className?: string }) {
  const [view, setView] = useState<ViewKey>("triage")
  const [triage, setTriage] = useState<TriageItem[]>(initialTriage)
  const [recordFilter, setRecordFilter] = useState<"all" | Status>("all")

  const act = (id: string, next: "confirmed" | "quarantined") =>
    setTriage((prev) => prev.map((item) => (item.id === id ? { ...item, state: next } : item)))

  const confirmedCount = triage.filter((t) => t.state === "confirmed").length
  const quarantinedCount = triage.filter((t) => t.state === "quarantined").length
  const pendingCount = triage.filter((t) => t.state === "pending").length
  const hasChanges = confirmedCount > 0 || quarantinedCount > 0

  const filteredRecords = recordFilter === "all" ? sampleRecords.slice(0, 5) : sampleRecords.filter((r) => r.status === recordFilter).slice(0, 5)

  return (
    <div className={cn("relative min-w-0", className)}>
      <MockFrame title="Smart Records Center · Ruang Kerja Tata Kelola" interactive>
        {/* Top workspace bar: tenant badge + live switchable views */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-mist/80 px-3.5 py-2">
          <div role="tablist" aria-label="Pratinjau ruang kerja" className="flex flex-wrap gap-1">
            {views.map(({ key, label, icon: Icon }) => {
              const on = view === key
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setView(key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all",
                    on ? "bg-white text-navy shadow-[0_1px_2px_rgb(8_27_54/0.08)] ring-1 ring-border" : "text-muted-foreground hover:text-navy",
                  )}
                >
                  <Icon className={cn("size-3.5", on ? "text-brand" : "text-muted-foreground")} aria-hidden />
                  {label}
                </button>
              )
            })}
          </div>
          <span className="code hidden text-[11px] text-muted-foreground sm:inline">tn-0001 · Organisasi Contoh</span>
        </div>

        {/* Summary KPI strip */}
        <div className="grid grid-cols-2 gap-px border-b border-border bg-border sm:grid-cols-4">
          {[
            { label: "Arsip aktif", value: "1.284", tone: "text-teal-ink" },
            { label: "Arsip inaktif", value: "3.906", tone: "text-navy" },
            { label: "Permanen", value: "412", tone: "text-navy" },
            { label: "Antrean verifikasi", value: String(pendingCount), tone: pendingCount > 0 ? "text-st-pending" : "text-teal-ink" },
          ].map((k) => (
            <div key={k.label} className="bg-white px-3.5 py-2.5">
              <p className="text-[11px] font-medium text-muted-foreground">{k.label}</p>
              <p className={cn("mt-0.5 text-base font-bold tabular-nums", k.tone)}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Interactive view body */}
        <div className="min-h-[18.75rem] bg-white">
          {view === "triage" && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2 text-xs">
                <span className="text-muted-foreground">
                  Klik aksi untuk mencoba pemilahan: <strong className="text-navy">{confirmedCount} arsip</strong> ·{" "}
                  <strong className="text-navy">{quarantinedCount} karantina</strong>
                </span>
                {hasChanges && (
                  <button
                    type="button"
                    onClick={() => setTriage(initialTriage)}
                    className="inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-ink hover:underline"
                  >
                    <RotateCcwIcon className="size-3" aria-hidden />
                    Atur ulang
                  </button>
                )}
              </div>
              <ul className="divide-y divide-border text-[13px]">
                {triage.map((item) => (
                  <li key={item.id} className="flex flex-col gap-2.5 px-4 py-3 transition-colors hover:bg-mist/40 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-navy">{item.doc}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11.5px] text-muted-foreground">
                        <Badge variant={item.proposal === "Arsip" ? "active" : item.proposal === "Non-arsip" ? "inactive" : "review"}>{item.proposal}</Badge>
                        <span>{item.why}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                      <Confidence value={item.conf} />
                      {item.state === "pending" ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => act(item.id, "confirmed")}
                            className="inline-flex h-7 items-center rounded-md bg-brand px-2.5 text-xs font-semibold text-white transition hover:bg-brand-ink"
                          >
                            Arsip
                          </button>
                          <button
                            type="button"
                            onClick={() => act(item.id, "quarantined")}
                            className="inline-flex h-7 items-center rounded-md border border-border bg-white px-2.5 text-xs font-semibold text-navy transition hover:bg-mist"
                          >
                            Karantina
                          </button>
                        </div>
                      ) : item.state === "confirmed" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-ink">
                          <CheckCircle2Icon className="size-3.5" aria-hidden />
                          Masuk klasifikasi
                        </span>
                      ) : (
                        <Badge variant="inactive">Dikarantina</Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {view === "records" && (
            <div>
              <div className="flex flex-wrap gap-1 border-b border-border px-4 py-2 text-xs font-semibold">
                {statusFilters.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setRecordFilter(f.key)}
                    className={cn(
                      "rounded-md px-2.5 py-1 transition",
                      recordFilter === f.key ? "bg-navy text-white" : "text-body hover:bg-mist hover:text-navy",
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <ul className="divide-y divide-border text-[13px]">
                {filteredRecords.map((r) => (
                  <li key={r.no} className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-mist/40">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-navy">{r.title}</p>
                      <p className="code mt-0.5 text-[11.5px] text-muted-foreground">
                        {r.no} · {r.code} · {r.unit}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {r.hold && <Badge variant="outline">Hold</Badge>}
                      <StatusBadge status={r.status} short />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {view === "retention" && (
            <ul className="divide-y divide-border text-[13px]">
              {sampleClasses.map((c) => (
                <li key={c.code} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-mist/40">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2">
                      <Code>{c.code}</Code>
                      <span className="font-medium text-navy">{c.series}</span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Aktif <strong className="text-navy">{c.active} th</strong> · Inaktif <strong className="text-navy">{c.inactive} th</strong>
                    </p>
                  </div>
                  <Badge variant={c.final === "Permanen" ? "permanent" : c.final === "Musnah" ? "disposed" : "inactive"}>{c.final}</Badge>
                </li>
              ))}
            </ul>
          )}

          {view === "audit" && (
            <div>
              <ul className="divide-y divide-border text-[12.5px]">
                {auditPreview.map((e) => (
                  <li key={e.seq} className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 hover:bg-mist/40">
                    <div className="flex items-center gap-2.5">
                      <span className="code text-xs text-muted-foreground">#{e.seq}</span>
                      <span className="font-semibold text-navy">{e.act}</span>
                      <Code>{e.target}</Code>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="code text-[11.5px] text-muted-foreground">{e.actor}</span>
                      <span className="code rounded bg-mist px-1.5 py-0.5 text-[11px] text-navy">{e.hash}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-3 border-t border-border bg-mist/60 px-4 py-2.5 text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-teal-ink">
                  <ShieldCheckIcon className="size-3.5" aria-hidden />
                  Rantai SHA-256 terverifikasi utuh · 48.385 entri
                </span>
                <Link href="#keamanan" className="font-semibold text-brand hover:underline">
                  Uji verifikasi →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer status bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-mist/70 px-4 py-2 text-[11.5px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 font-semibold text-teal-ink">
            <ShieldCheckIcon className="size-3.5" aria-hidden />
            Semua aksi tercatat otomatis di jejak audit
          </span>
          <span>Usulan AI menunggu konfirmasi arsiparis</span>
        </div>
      </MockFrame>
    </div>
  )
}
