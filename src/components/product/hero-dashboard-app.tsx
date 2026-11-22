"use client"

import {
  ArchiveIcon,
  ArrowUpRightIcon,
  CalendarClockIcon,
  CheckCircle2Icon,
  FileCheck2Icon,
  FolderTreeIcon,
  LayoutGridIcon,
  RotateCcwIcon,
  ScrollTextIcon,
  SearchIcon,
  ShieldCheckIcon,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { LogoMark } from "@/components/logo"
import { Code, Confidence, SampleTag, StatusBadge } from "@/components/product/ui"
import { Badge } from "@/components/ui/badge"
import { sampleClasses, sampleRecords, securityLabel, type Status } from "@/lib/sample"
import { cn } from "@/lib/utils"

type NavKey = "overview" | "triage" | "classification" | "repository" | "retention" | "audit"

type TriageDoc = {
  id: string
  doc: string
  unit: string
  why: string
  proposal: "Arsip" | "Non-arsip" | "Perlu review"
  conf: number
  state: "pending" | "approved" | "quarantined"
}

const initialTriage: TriageDoc[] = [
  { id: "t1", doc: "SK Direksi No. 14/2026 tentang SOTK.pdf", unit: "Sekretariat", why: "Keputusan resmi · bernilai guna", proposal: "Arsip", conf: 0.98, state: "pending" },
  { id: "t2", doc: "Kontrak Sewa Gedung 2026-2028.pdf", unit: "Hukum", why: "Perjanjian hukum · retensi 10 th", proposal: "Arsip", conf: 0.96, state: "pending" },
  { id: "t3", doc: "Notifikasi Pemeliharaan Server.eml", unit: "TI", why: "Pemberitahuan otomatis sistem", proposal: "Non-arsip", conf: 0.95, state: "pending" },
  { id: "t4", doc: "Draf Lampiran Rapat (Sementara).docx", unit: "Pengadaan", why: "Belum final · cek penetapan", proposal: "Perlu review", conf: 0.74, state: "pending" },
  { id: "t5", doc: "Bukti Transfer Vendor Termin 2.pdf", unit: "Keuangan", why: "Transaksi keuangan · wajib retensi", proposal: "Arsip", conf: 0.94, state: "pending" },
]

const monthlySeries = {
  "6m": [
    { month: "Mei", arsip: 410, nonArsip: 168, cleanPct: 96.8 },
    { month: "Jun", arsip: 465, nonArsip: 192, cleanPct: 97.4 },
    { month: "Jul", arsip: 438, nonArsip: 154, cleanPct: 97.9 },
    { month: "Agu", arsip: 512, nonArsip: 215, cleanPct: 98.1 },
    { month: "Sep", arsip: 548, nonArsip: 230, cleanPct: 98.3 },
    { month: "Okt", arsip: 586, nonArsip: 244, cleanPct: 98.4 },
  ],
  "3m": [
    { month: "Agu", arsip: 512, nonArsip: 215, cleanPct: 98.1 },
    { month: "Sep", arsip: 548, nonArsip: 230, cleanPct: 98.3 },
    { month: "Okt", arsip: 586, nonArsip: 244, cleanPct: 98.4 },
  ],
}

const bcsNodes = [
  { code: "KU", name: "Keuangan", depth: 0, active: "-", inactive: "-", final: "Kategori induk", security: "Terbatas", count: 486 },
  { code: "KU.01", name: "Pelaporan keuangan", depth: 1, active: "2 tahun", inactive: "8 tahun", final: "Permanen", security: "Terbatas", count: 164 },
  { code: "KU.01.02", name: "Laporan keuangan tahunan", depth: 2, active: "2 tahun", inactive: "8 tahun", final: "Permanen", security: "Terbatas", count: 128 },
  { code: "KU.02", name: "Pembayaran", depth: 1, active: "2 tahun", inactive: "5 tahun", final: "Musnah", security: "Terbatas", count: 322 },
  { code: "KU.02.01", name: "Bukti pembayaran vendor", depth: 2, active: "2 tahun", inactive: "5 tahun", final: "Musnah", security: "Terbatas", count: 294 },
  { code: "HK", name: "Hukum", depth: 0, active: "-", inactive: "-", final: "Kategori induk", security: "Terbatas", count: 192 },
  { code: "HK.02.01", name: "Kontrak dan perjanjian", depth: 2, active: "5 tahun", inactive: "5 tahun", final: "Dinilai kembali", security: "Terbatas", count: 96 },
  { code: "KP.01.01", name: "Berkas kepegawaian", depth: 2, active: "10 tahun", inactive: "10 tahun", final: "Permanen", security: "Rahasia", count: 412 },
]

const auditRows = [
  { seq: 48381, time: "2026-10-18 08:42", actor: "ai/pemilahan-v2", act: "pemilahan.usulan", target: "SK-2026-000014", hash: "2b81c4…7d09" },
  { seq: 48382, time: "2026-10-18 09:05", actor: "arsiparis#12", act: "pemilahan.konfirmasi", target: "KEU-2026-000123", hash: "4c92a1…8e10" },
  { seq: 48383, time: "2026-10-18 09:11", actor: "arsiparis#12", act: "klasifikasi.tetapkan", target: "KEU-2026-000123", hash: "8a10f4…c219" },
  { seq: 48384, time: "2026-10-18 10:19", actor: "hukum#03", act: "hold.dipasang", target: "PGD-2014-000033", hash: "a7bf02…91d4" },
  { seq: 48385, time: "2026-10-18 11:02", actor: "auditor#02", act: "bukti.ekspor", target: "PKT-2026-0011", hash: "1e0192…3f7a" },
]

const statusTabs: { key: "all" | Status; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "active", label: "Aktif" },
  { key: "inactive", label: "Inaktif" },
  { key: "permanent", label: "Permanen" },
  { key: "pending", label: "Menunggu" },
]

const units = ["Semua Unit", "Keuangan", "Hukum", "Pengadaan", "SDM", "Perencanaan"]

function Sparkline({ points, stroke }: { points: number[]; stroke: string }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = Math.max(max - min, 1)
  const coords = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 72
      const y = 20 - ((p - min) / range) * 16
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
  return (
    <svg viewBox="0 0 72 24" className="h-6 w-16 shrink-0" aria-hidden>
      <polyline fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={coords} />
    </svg>
  )
}

/**
 * Full-width (1280px) interactive enterprise records dashboard showcase on the home hero.
 * Features clickable sidebar views, interactive SVG chart with hover readout, live AI triage, and searchable/filterable repository table.
 */
export function HeroDashboardApp({ className }: { className?: string }) {
  const [nav, setNav] = useState<NavKey>("overview")
  const [query, setQuery] = useState("")
  const [unit, setUnit] = useState("Semua Unit")
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all")
  const [period, setPeriod] = useState<"6m" | "3m">("6m")
  const [hoveredMonth, setHoveredMonth] = useState<number>(5)
  const [triage, setTriage] = useState<TriageDoc[]>(initialTriage)
  const [selectedBcs, setSelectedBcs] = useState("KU.01.02")

  const pendingTriageCount = triage.filter((t) => t.state === "pending").length
  const confirmedCount = triage.filter((t) => t.state === "approved").length
  const quarantinedCount = triage.filter((t) => t.state === "quarantined").length
  const triageDirty = confirmedCount > 0 || quarantinedCount > 0

  const setDecision = (id: string, state: "approved" | "quarantined") =>
    setTriage((prev) => prev.map((t) => (t.id === id ? { ...t, state } : t)))

  const filteredRecords = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sampleRecords.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false
      if (unit !== "Semua Unit" && r.unit !== unit) return false
      if (q && !`${r.no} ${r.title} ${r.code} ${r.unit}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, unit, statusFilter])

  const chartData = monthlySeries[period]
  const activeIdx = Math.min(hoveredMonth, chartData.length - 1)
  const activePoint = chartData[activeIdx]
  const maxVal = 650

  const sidebarItems: { key: NavKey; label: string; icon: typeof LayoutGridIcon; count?: number }[] = [
    { key: "overview", label: "Ringkasan", icon: LayoutGridIcon },
    { key: "triage", label: "Pemilahan AI", icon: FileCheck2Icon, count: pendingTriageCount },
    { key: "classification", label: "Klasifikasi", icon: FolderTreeIcon },
    { key: "repository", label: "Repositori", icon: ArchiveIcon },
    { key: "retention", label: "Retensi & JRA", icon: CalendarClockIcon },
    { key: "audit", label: "Jejak Audit", icon: ScrollTextIcon },
  ]

  const activeBcs = bcsNodes.find((n) => n.code === selectedBcs) ?? bcsNodes[2]

  return (
    <figure className={cn("overflow-hidden rounded-xl border border-navy/15 bg-white text-body shadow-product ring-1 ring-navy/[0.04]", className)}>
      {/* Application top chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-navy px-4 py-2.5 text-white">
        <div className="flex items-center gap-2.5">
          <LogoMark className="size-5" inverse />
          <figcaption className="text-xs text-white/75">
            Smart Records Center <span aria-hidden className="mx-1 text-white/35">/</span>{" "}
            <span className="font-semibold text-white">{sidebarItems.find((i) => i.key === nav)?.label}</span>
          </figcaption>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <span className="code hidden text-[11.5px] text-white/70 md:inline">PT Nusantara Infrastruktur · tn-0001</span>
          <span className="hidden items-center gap-1.5 rounded-[5px] border border-brand-soft/30 bg-brand/30 px-2 py-0.5 text-[11px] font-semibold text-brand-soft sm:inline-flex">
            <span aria-hidden className="size-1.5 rounded-full bg-brand-soft" />
            Pratinjau Interaktif
          </span>
          <SampleTag className="border-white/15 bg-white/10 text-white/85" />
        </div>
      </div>

      {/* Main application shell: sidebar + workspace */}
      <div className="grid lg:grid-cols-[13.5rem_minmax(0,1fr)]">
        {/* Desktop left sidebar / mobile top tab bar */}
        <aside className="flex flex-col justify-between border-b border-border bg-mist/70 lg:border-r lg:border-b-0">
          <nav aria-label="Navigasi pratinjau aplikasi" className="flex gap-1 overflow-x-auto p-2.5 lg:flex-col lg:p-3">
            {sidebarItems.map(({ key, label, icon: Icon, count }) => {
              const on = nav === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setNav(key)}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex shrink-0 items-center justify-between gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold transition-all",
                    on
                      ? "bg-white text-navy shadow-[0_1px_2px_rgb(8_27_54/0.08)] ring-1 ring-border"
                      : "text-body hover:bg-white/60 hover:text-navy",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={cn("size-4", on ? "text-brand" : "text-muted-foreground")} aria-hidden />
                    {label}
                  </span>
                  {typeof count === "number" && count > 0 && (
                    <span className="code rounded bg-st-pending-wash px-1.5 py-0.5 text-[11px] font-semibold text-st-pending tabular-nums">{count}</span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Sidebar audit integrity card (desktop) */}
          <div className="hidden border-t border-border p-3 lg:block">
            <div className="rounded-lg border border-border bg-white p-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-teal-ink">
                <ShieldCheckIcon className="size-3.5" aria-hidden />
                Rantai Audit Utuh
              </p>
              <p className="code mt-1 text-[11px] text-muted-foreground">48.385 entri · SHA-256</p>
              <p className="mt-1.5 text-[11.5px] leading-snug text-muted-foreground">Pemeriksaan otomatis terjadwal · 0 perubahan tidak sah</p>
            </div>
          </div>
        </aside>

        {/* Right Workspace */}
        <div className="flex min-w-0 flex-col bg-white">
          {/* Workspace utility toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
            <label className="relative flex min-w-[14rem] flex-1 items-center">
              <SearchIcon className="pointer-events-none absolute left-3 size-4 text-muted-foreground" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  if (nav !== "overview" && nav !== "repository") setNav("repository")
                }}
                placeholder="Cari nomor arsip, judul, atau kode klasifikasi…"
                aria-label="Cari di data contoh arsip"
                className="h-9 w-full rounded-md border border-input bg-mist/40 pr-3 pl-9 text-[13px] text-navy placeholder:text-muted-foreground focus:border-brand focus:bg-white focus:outline-none"
              />
            </label>
            <div className="flex items-center gap-2">
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                aria-label="Saring menurut unit pengolah"
                className="h-9 rounded-md border border-input bg-white px-2.5 text-xs font-semibold text-navy focus:border-brand focus:outline-none"
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <span className="hidden rounded-md border border-border bg-mist/60 px-2.5 py-2 text-xs font-semibold text-navy sm:inline">
                arsiparis#12
              </span>
            </div>
          </div>

          {/* VIEW 1: Executive Overview Dashboard */}
          {nav === "overview" && (
            <div className="flex flex-col gap-5 p-4 sm:p-5">
              {/* 4 KPI cards with crisp SVG sparklines */}
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {[
                  { label: "Arsip aktif", value: "1.284", sub: "+4,2% bulan ini", stroke: "#0d7a77", pts: [1120, 1155, 1188, 1210, 1245, 1284] },
                  { label: "Arsip inaktif", value: "3.906", sub: "28 jatuh tempo <90 hr", stroke: "#64748b", pts: [3680, 3720, 3780, 3815, 3862, 3906] },
                  { label: "Arsip permanen", value: "412", sub: "100% media write-once", stroke: "#081b36", pts: [384, 390, 396, 401, 406, 412] },
                  { label: "Kepatuhan retensi", value: "98,4%", sub: "Target organisasi 98%", stroke: "#1d4ed8", pts: [96.8, 97.4, 97.9, 98.1, 98.3, 98.4] },
                ].map((kpi) => (
                  <div key={kpi.label} className="flex items-end justify-between gap-2 rounded-lg border border-border bg-white p-3.5">
                    <div className="min-w-0">
                      <p className="text-[11.5px] font-medium text-muted-foreground">{kpi.label}</p>
                      <p className="mt-1 font-heading text-xl font-bold text-navy tabular-nums">{kpi.value}</p>
                      <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{kpi.sub}</p>
                    </div>
                    <Sparkline points={kpi.pts} stroke={kpi.stroke} />
                  </div>
                ))}
              </div>

              {/* Middle Split: Interactive SVG Analytics Chart + Live AI Triage Panel */}
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                {/* Interactive Governance Volume & Triage Chart */}
                <div className="flex flex-col justify-between rounded-lg border border-border bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-navy">Volume Pemilahan Dokumen Masuk</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">Arsip terverifikasi vs dokumen non-arsip dikarantina</p>
                    </div>
                    <div className="flex rounded-md border border-border bg-mist/70 p-0.5 text-[11.5px] font-semibold">
                      {(["6m", "3m"] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setPeriod(p)
                            setHoveredMonth(p === "6m" ? 5 : 2)
                          }}
                          className={cn("rounded px-2 py-1 transition", period === p ? "bg-white text-navy shadow-xs" : "text-muted-foreground hover:text-navy")}
                        >
                          {p === "6m" ? "6 Bulan" : "Triwulan"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active month readout strip */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 rounded-md border border-border bg-mist/50 px-3 py-2 text-xs">
                    <span className="font-semibold text-navy">{activePoint.month} 2026</span>
                    <span className="inline-flex items-center gap-1.5 text-body">
                      <span aria-hidden className="size-2 rounded-[2px] bg-brand" />
                      Arsip: <strong className="text-navy tabular-nums">{activePoint.arsip}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-body">
                      <span aria-hidden className="size-2 rounded-[2px] bg-slate-300" />
                      Non-arsip: <strong className="text-navy tabular-nums">{activePoint.nonArsip}</strong>
                    </span>
                    <span className="ml-auto font-semibold text-teal-ink tabular-nums">Bersih {activePoint.cleanPct.toLocaleString("id-ID")}%</span>
                  </div>

                  {/* Crisp SVG interactive bar chart */}
                  <div className="mt-4">
                    <svg viewBox="0 0 420 148" className="h-36 w-full" role="img" aria-label="Grafik perbandingan arsip terverifikasi dan dokumen non-arsip per bulan">
                      {[0, 0.33, 0.66, 1].map((t) => {
                        const y = 12 + t * 108
                        return <line key={t} x1="0" x2="420" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      })}
                      {chartData.map((d, i) => {
                        const slot = 420 / chartData.length
                        const cx = slot * i + slot / 2
                        const arsipH = (d.arsip / maxVal) * 104
                        const nonH = (d.nonArsip / maxVal) * 104
                        const selected = i === activeIdx
                        return (
                          <g
                            key={d.month}
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredMonth(i)}
                            onClick={() => setHoveredMonth(i)}
                          >
                            {selected && <rect x={cx - 28} y={6} width={56} height={118} rx={6} fill="#eef4ff" />}
                            <rect
                              x={cx - 17}
                              y={120 - arsipH}
                              width={15}
                              height={arsipH}
                              rx={3}
                              fill={selected ? "#1d4ed8" : "#3b82f6"}
                            />
                            <rect
                              x={cx + 2}
                              y={120 - nonH}
                              width={15}
                              height={nonH}
                              rx={3}
                              fill={selected ? "#64748b" : "#cbd5e1"}
                            />
                            <text
                              x={cx}
                              y={138}
                              textAnchor="middle"
                              fontSize="11"
                              fontWeight={selected ? "700" : "500"}
                              fill={selected ? "#081b36" : "#55657d"}
                            >
                              {d.month}
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  </div>
                </div>

                {/* Right: Live AI Triage Queue inside Overview */}
                <div className="flex flex-col rounded-lg border border-border bg-white">
                  <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-navy">Antrean Pemilahan AI</p>
                      <p className="text-[11.5px] text-muted-foreground">Klik untuk verifikasi langsung</p>
                    </div>
                    {triageDirty ? (
                      <button type="button" onClick={() => setTriage(initialTriage)} className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline">
                        <RotateCcwIcon className="size-3" aria-hidden />
                        Reset
                      </button>
                    ) : (
                      <button type="button" onClick={() => setNav("triage")} className="text-xs font-semibold text-brand hover:underline">
                        Lihat semua
                      </button>
                    )}
                  </div>
                  <ul className="divide-y divide-border text-[12.5px]">
                    {triage.slice(0, 4).map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-2.5 px-4 py-2.5 hover:bg-mist/40">
                        <div className="min-w-0">
                          <p className="truncate font-medium text-navy">{item.doc}</p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <Badge variant={item.proposal === "Arsip" ? "active" : item.proposal === "Non-arsip" ? "inactive" : "review"}>{item.proposal}</Badge>
                            <span className="tabular-nums">{item.conf.toFixed(2).replace(".", ",")}</span>
                          </p>
                        </div>
                        <div className="shrink-0">
                          {item.state === "pending" ? (
                            <span className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setDecision(item.id, "approved")}
                                className="inline-flex h-6.5 items-center rounded bg-brand px-2 text-[11.5px] font-semibold text-white hover:bg-brand-ink"
                              >
                                Arsip
                              </button>
                              <button
                                type="button"
                                onClick={() => setDecision(item.id, "quarantined")}
                                className="inline-flex h-6.5 items-center rounded border border-border bg-white px-2 text-[11.5px] font-semibold text-navy hover:bg-mist"
                              >
                                Karantina
                              </button>
                            </span>
                          ) : item.state === "approved" ? (
                            <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-teal-ink">
                              <CheckCircle2Icon className="size-3.5" aria-hidden />
                              Terverifikasi
                            </span>
                          ) : (
                            <Badge variant="inactive">Karantina</Badge>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Full-Width Filterable Records Register */}
              <div className="overflow-hidden rounded-lg border border-border">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-mist/60 px-4 py-2.5">
                  <div className="flex flex-wrap gap-1 text-xs font-semibold">
                    {statusTabs.map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setStatusFilter(t.key)}
                        className={cn(
                          "rounded-md px-2.5 py-1 transition",
                          statusFilter === t.key ? "bg-navy text-white" : "text-body hover:bg-white hover:text-navy",
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">{filteredRecords.length} arsip ditampilkan</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[44rem] border-collapse text-left text-[12.5px]">
                    <thead>
                      <tr className="border-b border-border bg-mist/40 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                        <th scope="col" className="px-4 py-2">Nomor Arsip</th>
                        <th scope="col" className="px-4 py-2">Judul</th>
                        <th scope="col" className="px-4 py-2">Kode</th>
                        <th scope="col" className="px-4 py-2">Unit</th>
                        <th scope="col" className="px-4 py-2">Keamanan</th>
                        <th scope="col" className="px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.slice(0, 5).map((r) => (
                        <tr key={r.no} className="border-b border-border last:border-b-0 hover:bg-mist/40">
                          <td className="px-4 py-2.5"><Code>{r.no}</Code></td>
                          <td className="px-4 py-2.5 font-medium text-navy">{r.title}</td>
                          <td className="px-4 py-2.5"><Code>{r.code}</Code></td>
                          <td className="px-4 py-2.5 text-body">{r.unit}</td>
                          <td className="px-4 py-2.5 text-body">{securityLabel[r.security]}</td>
                          <td className="px-4 py-2.5">
                            <span className="inline-flex items-center gap-1.5">
                              <StatusBadge status={r.status} short />
                              {r.hold && <Badge variant="outline">Hold</Badge>}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredRecords.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                            Tidak ada arsip contoh yang cocok dengan filter saat ini.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Full AI Triage Workspace */}
          {nav === "triage" && (
            <div className="p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
                <div>
                  <p className="text-sm font-semibold text-navy">Antrean Verifikasi &amp; Pemilahan Dokumen Masuk</p>
                  <p className="text-xs text-muted-foreground">
                    AI memilah arsip dan non-arsip secara otomatis; keyakinan di bawah 0,90 wajib review arsiparis.
                  </p>
                </div>
                {triageDirty && (
                  <button type="button" onClick={() => setTriage(initialTriage)} className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline">
                    <RotateCcwIcon className="size-3.5" aria-hidden />
                    Atur ulang antrean
                  </button>
                )}
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[44rem] border-collapse text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-border bg-mist/70 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                      <th scope="col" className="px-4 py-2.5">Dokumen</th>
                      <th scope="col" className="px-4 py-2.5">Unit</th>
                      <th scope="col" className="px-4 py-2.5">Usulan AI</th>
                      <th scope="col" className="px-4 py-2.5">Keyakinan</th>
                      <th scope="col" className="px-4 py-2.5">Keputusan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {triage.map((item) => (
                      <tr key={item.id} className="border-b border-border last:border-b-0 hover:bg-mist/40">
                        <td className="px-4 py-3">
                          <span className="block font-medium text-navy">{item.doc}</span>
                          <span className="text-[11.5px] text-muted-foreground">{item.why}</span>
                        </td>
                        <td className="px-4 py-3 text-body">{item.unit}</td>
                        <td className="px-4 py-3">
                          <Badge variant={item.proposal === "Arsip" ? "active" : item.proposal === "Non-arsip" ? "inactive" : "review"}>{item.proposal}</Badge>
                        </td>
                        <td className="px-4 py-3"><Confidence value={item.conf} /></td>
                        <td className="px-4 py-3">
                          {item.state === "pending" ? (
                            <span className="inline-flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => setDecision(item.id, "approved")}
                                className="inline-flex h-7 items-center rounded-md bg-brand px-2.5 text-xs font-semibold text-white hover:bg-brand-ink"
                              >
                                Konfirmasi arsip
                              </button>
                              <button
                                type="button"
                                onClick={() => setDecision(item.id, "quarantined")}
                                className="inline-flex h-7 items-center rounded-md border border-border bg-white px-2.5 text-xs font-semibold text-navy hover:bg-mist"
                              >
                                Karantina
                              </button>
                            </span>
                          ) : item.state === "approved" ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-ink">
                              <CheckCircle2Icon className="size-3.5" aria-hidden />
                              Diteruskan ke klasifikasi
                            </span>
                          ) : (
                            <Badge variant="inactive">Dipisahkan ke karantina</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 3: Interactive Classification Tree */}
          {nav === "classification" && (
            <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="rounded-lg border border-border p-3">
                <p className="mb-2 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Taksonomi Klasifikasi Organisasi (v3)</p>
                <ul className="flex flex-col gap-0.5 text-[13px]">
                  {bcsNodes.map((n) => {
                    const on = n.code === selectedBcs
                    return (
                      <li key={n.code}>
                        <button
                          type="button"
                          onClick={() => setSelectedBcs(n.code)}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-md py-2 pr-3 text-left transition",
                            on ? "bg-brand-wash text-navy ring-1 ring-brand/25" : "hover:bg-mist/80",
                          )}
                          style={{ paddingLeft: `${0.6 + n.depth * 1.15}rem` }}
                        >
                          <Code>{n.code}</Code>
                          <span className={cn("truncate", n.depth === 0 || on ? "font-semibold text-navy" : "text-body")}>{n.name}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <dl className="flex flex-col gap-3 rounded-lg border border-border bg-mist/50 p-4 text-[13px]">
                <div>
                  <dt className="text-xs text-muted-foreground">Kode terpilih</dt>
                  <dd className="mt-0.5"><Code>{activeBcs.code}</Code></dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Seri arsip</dt>
                  <dd className="mt-0.5 font-semibold text-navy">{activeBcs.name}</dd>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-border pt-3">
                  <div>
                    <dt className="text-xs text-muted-foreground">Retensi aktif</dt>
                    <dd className="mt-0.5 font-semibold text-navy">{activeBcs.active}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Retensi inaktif</dt>
                    <dd className="mt-0.5 font-semibold text-navy">{activeBcs.inactive}</dd>
                  </div>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Nasib akhir</dt>
                  <dd className="mt-1">
                    <Badge variant={activeBcs.final === "Permanen" ? "permanent" : activeBcs.final === "Musnah" ? "disposed" : "inactive"}>{activeBcs.final}</Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Tingkat keamanan bawaan</dt>
                  <dd className="mt-0.5 font-semibold text-navy">{activeBcs.security}</dd>
                </div>
                <div className="border-t border-border pt-3">
                  <dt className="text-xs text-muted-foreground">Jumlah arsip terdaftar</dt>
                  <dd className="mt-0.5 font-heading text-lg font-bold text-navy tabular-nums">{activeBcs.count}</dd>
                </div>
              </dl>
            </div>
          )}

          {/* VIEW 4: Full Repository */}
          {nav === "repository" && (
            <div className="p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1 text-xs font-semibold">
                  {statusTabs.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setStatusFilter(t.key)}
                      className={cn(
                        "rounded-md px-2.5 py-1.5 transition",
                        statusFilter === t.key ? "bg-navy text-white" : "text-body hover:bg-mist hover:text-navy",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{filteredRecords.length} arsip</span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[44rem] border-collapse text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-border bg-mist/70 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                      <th scope="col" className="px-4 py-2.5">Nomor</th>
                      <th scope="col" className="px-4 py-2.5">Judul</th>
                      <th scope="col" className="px-4 py-2.5">Kode</th>
                      <th scope="col" className="px-4 py-2.5">Unit</th>
                      <th scope="col" className="px-4 py-2.5">Keamanan</th>
                      <th scope="col" className="px-4 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((r) => (
                      <tr key={r.no} className="border-b border-border last:border-b-0 hover:bg-mist/40">
                        <td className="px-4 py-2.5"><Code>{r.no}</Code></td>
                        <td className="px-4 py-2.5 font-medium text-navy">{r.title}</td>
                        <td className="px-4 py-2.5"><Code>{r.code}</Code></td>
                        <td className="px-4 py-2.5">{r.unit}</td>
                        <td className="px-4 py-2.5">{securityLabel[r.security]}</td>
                        <td className="px-4 py-2.5">
                          <span className="inline-flex items-center gap-1.5">
                            <StatusBadge status={r.status} />
                            {r.hold && <Badge variant="outline">Legal hold</Badge>}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 5: Retention & JRA */}
          {nav === "retention" && (
            <div className="p-4 sm:p-5">
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[42rem] border-collapse text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-border bg-mist/70 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                      <th scope="col" className="px-4 py-2.5">Kode</th>
                      <th scope="col" className="px-4 py-2.5">Seri Arsip</th>
                      <th scope="col" className="px-4 py-2.5">Aktif</th>
                      <th scope="col" className="px-4 py-2.5">Inaktif</th>
                      <th scope="col" className="px-4 py-2.5">Nasib Akhir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleClasses.map((c) => (
                      <tr key={c.code} className="border-b border-border last:border-b-0 hover:bg-mist/40">
                        <td className="px-4 py-3"><Code>{c.code}</Code></td>
                        <td className="px-4 py-3 font-medium text-navy">{c.series}</td>
                        <td className="px-4 py-3 tabular-nums">{c.active} tahun</td>
                        <td className="px-4 py-3 tabular-nums">{c.inactive} tahun</td>
                        <td className="px-4 py-3">
                          <Badge variant={c.final === "Permanen" ? "permanent" : c.final === "Musnah" ? "disposed" : "inactive"}>{c.final}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 6: Audit Trail */}
          {nav === "audit" && (
            <div className="p-4 sm:p-5">
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[44rem] border-collapse text-left text-[12.5px]">
                  <thead>
                    <tr className="border-b border-border bg-mist/70 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                      <th scope="col" className="px-4 py-2.5">Entri</th>
                      <th scope="col" className="px-4 py-2.5">Waktu (UTC)</th>
                      <th scope="col" className="px-4 py-2.5">Pelaku</th>
                      <th scope="col" className="px-4 py-2.5">Aksi</th>
                      <th scope="col" className="px-4 py-2.5">Objek</th>
                      <th scope="col" className="px-4 py-2.5">Hash SHA-256</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditRows.map((a) => (
                      <tr key={a.seq} className="border-b border-border last:border-b-0 hover:bg-mist/40">
                        <td className="code px-4 py-2.5 text-muted-foreground">#{a.seq}</td>
                        <td className="code px-4 py-2.5 whitespace-nowrap text-muted-foreground">{a.time}</td>
                        <td className="code px-4 py-2.5 text-navy">{a.actor}</td>
                        <td className="code px-4 py-2.5 font-semibold text-navy">{a.act}</td>
                        <td className="px-4 py-2.5"><Code>{a.target}</Code></td>
                        <td className="code px-4 py-2.5 text-teal-ink">{a.hash}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-teal-ink">
                  <ShieldCheckIcon className="size-4" aria-hidden />
                  Seluruh rantai terverifikasi utuh · append-only
                </span>
                <Link href="#keamanan" className="inline-flex items-center gap-1 font-semibold text-brand hover:underline">
                  Coba verifikasi SHA-256 langsung <ArrowUpRightIcon className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </figure>
  )
}
