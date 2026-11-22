"use client"

import { CheckCircle2Icon, FileTextIcon, RotateCcwIcon, SearchIcon } from "lucide-react"
import { useState } from "react"

import { Code, Confidence, MockFrame, StatusBadge } from "@/components/product/ui"
import { Badge } from "@/components/ui/badge"
import { sampleRecords, securityLabel, type Status } from "@/lib/sample"
import { cn } from "@/lib/utils"

/* 1. Interactive Verifikasi & Pemilahan Arsip */

type TriageRow = {
  id: string
  doc: string
  kind: "Arsip" | "Non-arsip" | "Perlu review"
  why: string
  conf: number
  status: "arsip" | "non" | "review"
  decision: "pending" | "approved" | "quarantined"
}

const initialTriageRows: TriageRow[] = [
  { id: "r1", doc: "SK Direksi No. 14/2026 tentang SOTK.pdf", kind: "Arsip", why: "Keputusan resmi · bernilai guna", conf: 0.98, status: "arsip", decision: "pending" },
  { id: "r2", doc: "Kontrak Sewa Gedung 2026-2028.pdf", kind: "Arsip", why: "Perjanjian hukum · retensi 10 th", conf: 0.96, status: "arsip", decision: "pending" },
  { id: "r3", doc: "Notifikasi Pemeliharaan Sistem.eml", kind: "Non-arsip", why: "Pemberitahuan otomatis sistem", conf: 0.95, status: "non", decision: "pending" },
  { id: "r4", doc: "Draf Lampiran Rapat (Sementara).docx", kind: "Perlu review", why: "Belum final · cek status penetapan", conf: 0.74, status: "review", decision: "pending" },
  { id: "r5", doc: "Bukti Transfer Vendor Termin 2.pdf", kind: "Arsip", why: "Transaksi keuangan · wajib retensi", conf: 0.94, status: "arsip", decision: "pending" },
]

export function InteractiveTriageMock() {
  const [rows, setRows] = useState<TriageRow[]>(initialTriageRows)
  const decide = (id: string, decision: "approved" | "quarantined") =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, decision } : r)))
  const dirty = rows.some((r) => r.decision !== "pending")
  const approved = rows.filter((r) => r.decision === "approved").length
  const quarantined = rows.filter((r) => r.decision === "quarantined").length

  return (
    <MockFrame title="Verifikasi & Pemilahan Arsip · Antrean Pemilahan" interactive>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-mist/60 px-4 py-2.5 text-xs">
        <span className="inline-flex flex-wrap items-center gap-2 text-muted-foreground">
          <span className="inline-flex h-5 items-center rounded-[5px] bg-brand-wash px-1.5 text-[11px] font-semibold text-brand-ink">Pemilahan AI</span>
          <span>
            5 dokumen masuk · <strong className="text-navy">{approved} diteruskan</strong> · <strong className="text-navy">{quarantined} karantina</strong>
          </span>
        </span>
        {dirty && (
          <button type="button" onClick={() => setRows(initialTriageRows)} className="inline-flex items-center gap-1 font-semibold text-brand hover:underline">
            <RotateCcwIcon className="size-3" aria-hidden />
            Atur ulang
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-mist/70 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              <th scope="col" className="px-4 py-2.5">Dokumen</th>
              <th scope="col" className="px-4 py-2.5">Usulan</th>
              <th scope="col" className="px-4 py-2.5">Keyakinan</th>
              <th scope="col" className="px-4 py-2.5">Tindakan arsiparis</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-b-0 hover:bg-mist/40">
                <td className="px-4 py-2.5">
                  <span className="block font-medium text-navy">{r.doc}</span>
                  <span className="text-[11.5px] text-muted-foreground">{r.why}</span>
                </td>
                <td className="px-4 py-2.5">
                  <Badge variant={r.status === "arsip" ? "active" : r.status === "non" ? "inactive" : "review"}>{r.kind}</Badge>
                </td>
                <td className="px-4 py-2.5">
                  <Confidence value={r.conf} />
                </td>
                <td className="px-4 py-2.5">
                  {r.decision === "pending" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => decide(r.id, "approved")}
                        className="inline-flex h-7 items-center rounded-md bg-brand px-2.5 text-xs font-semibold text-white transition hover:bg-brand-ink"
                      >
                        Konfirmasi arsip
                      </button>
                      <button
                        type="button"
                        onClick={() => decide(r.id, "quarantined")}
                        className="inline-flex h-7 items-center rounded-md border border-border bg-white px-2.5 text-xs font-semibold text-navy transition hover:bg-mist"
                      >
                        Karantina
                      </button>
                    </span>
                  ) : r.decision === "approved" ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-ink">
                      <CheckCircle2Icon className="size-3.5" aria-hidden />
                      Terverifikasi · ke klasifikasi
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

      <p className="border-t border-border bg-mist/60 px-4 py-2.5 text-[12.5px] text-muted-foreground">
        Dokumen non-arsip dipisahkan ke area karantina sehingga repositori tetap bersih dan jadwal retensi lebih akurat.
      </p>
    </MockFrame>
  )
}

/* 2. Interactive Klasifikasi Arsip Tree */

const bcsTree = [
  { code: "KU", name: "Keuangan", depth: 0, active: "-", inactive: "-", final: "Kategori induk", security: "Terbatas", count: 486 },
  { code: "KU.01", name: "Pelaporan keuangan", depth: 1, active: "2 tahun", inactive: "8 tahun", final: "Permanen", security: "Terbatas", count: 164 },
  { code: "KU.01.02", name: "Laporan keuangan tahunan", depth: 2, active: "2 tahun", inactive: "8 tahun", final: "Permanen", security: "Terbatas", count: 128 },
  { code: "KU.02", name: "Pembayaran", depth: 1, active: "2 tahun", inactive: "5 tahun", final: "Musnah", security: "Terbatas", count: 322 },
  { code: "KU.02.01", name: "Bukti pembayaran", depth: 2, active: "2 tahun", inactive: "5 tahun", final: "Musnah", security: "Terbatas", count: 294 },
  { code: "HK", name: "Hukum", depth: 0, active: "-", inactive: "-", final: "Kategori induk", security: "Terbatas", count: 192 },
  { code: "HK.02.01", name: "Kontrak dan perjanjian", depth: 2, active: "5 tahun", inactive: "5 tahun", final: "Dinilai kembali", security: "Terbatas", count: 96 },
]

export function InteractiveBcsMock() {
  const [selectedCode, setSelectedCode] = useState("KU.01.02")
  const selected = bcsTree.find((t) => t.code === selectedCode) ?? bcsTree[2]

  return (
    <MockFrame title="Klasifikasi Arsip · Skema Klasifikasi" interactive>
      <div className="grid text-[13px] sm:grid-cols-[minmax(0,1fr)_15rem]">
        <ul className="border-b border-border p-3 sm:border-r sm:border-b-0">
          {bcsTree.map((t) => {
            const on = t.code === selectedCode
            return (
              <li key={t.code}>
                <button
                  type="button"
                  onClick={() => setSelectedCode(t.code)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md py-1.5 pr-2 text-left transition-colors",
                    on ? "bg-brand-wash text-navy ring-1 ring-brand/25" : "hover:bg-mist/80",
                  )}
                  style={{ paddingLeft: `${0.5 + t.depth * 1.1}rem` }}
                >
                  <Code>{t.code}</Code>
                  <span className={cn("truncate", t.depth === 0 || on ? "font-semibold text-navy" : "text-body")}>{t.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 bg-mist/40 p-4 text-[12.5px] sm:grid-cols-1">
          <div>
            <dt className="text-muted-foreground">Kode terpilih</dt>
            <dd className="mt-0.5"><Code>{selected.code}</Code></dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Retensi aktif</dt>
            <dd className="font-semibold text-navy">{selected.active}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Retensi inaktif</dt>
            <dd className="font-semibold text-navy">{selected.inactive}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Nasib akhir</dt>
            <dd className="mt-0.5">
              <Badge variant={selected.final === "Permanen" ? "permanent" : selected.final === "Musnah" ? "disposed" : "inactive"}>
                {selected.final}
              </Badge>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Arsip terkait</dt>
            <dd className="font-semibold text-navy tabular-nums">{selected.count}</dd>
          </div>
        </dl>
      </div>
      <p className="border-t border-border bg-mist/60 px-4 py-2 text-[12px] text-muted-foreground">
        Pilih kode klasifikasi di sebelah kiri untuk memeriksa aturan retensi dan nasib akhirnya.
      </p>
    </MockFrame>
  )
}

/* 3. Interactive Repositori Arsip Filter */

const repoTabs: { key: "all" | Status; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "active", label: "Aktif" },
  { key: "inactive", label: "Inaktif" },
  { key: "permanent", label: "Permanen" },
  { key: "pending", label: "Menunggu penyusutan" },
]

export function InteractiveRecordsMock() {
  const [filter, setFilter] = useState<"all" | Status>("all")
  const rows = filter === "all" ? sampleRecords.slice(0, 7) : sampleRecords.filter((r) => r.status === filter)

  return (
    <MockFrame title="Repositori Arsip · Daftar Arsip" interactive>
      <div className="flex flex-wrap gap-1.5 border-b border-border bg-mist/50 px-4 py-2.5 text-xs font-semibold">
        {repoTabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key)}
            className={cn(
              "rounded-md px-2.5 py-1.5 transition",
              filter === t.key ? "bg-navy text-white" : "text-body hover:bg-white hover:text-navy",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-mist/70 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              <th scope="col" className="px-4 py-2">Nomor</th>
              <th scope="col" className="px-4 py-2">Judul</th>
              <th scope="col" className="px-4 py-2">Keamanan</th>
              <th scope="col" className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.no} className="border-b border-border last:border-b-0 hover:bg-mist/40">
                <td className="px-4 py-2.5"><Code>{r.no}</Code></td>
                <td className="px-4 py-2.5 font-medium text-navy">{r.title}</td>
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
    </MockFrame>
  )
}

/* 4. Interactive Pencarian & Temu Kembali */

const searchPresets = [
  {
    q: '"pemeliharaan gedung" kode:HK.02.*',
    meta: "2 hasil · teks lengkap · 1 hasil disembunyikan sesuai hak akses",
    hits: [
      { title: "Kontrak Pemeliharaan Gedung 2019-2021", no: "HKM-2021-000014 · halaman 2", pre: "… ruang lingkup ", mark: "pemeliharaan gedung", post: " kantor pusat meliputi sistem kelistrikan …" },
      { title: "Addendum Perpanjangan Kontrak Pemeliharaan", no: "HKM-2021-000015 · halaman 1", pre: "… jangka waktu ", mark: "pemeliharaan gedung", post: " diperpanjang sampai 31 Desember 2021 …" },
    ],
  },
  {
    q: '"laporan keuangan" status:aktif',
    meta: "2 hasil · teks lengkap & metadata · disaring hak akses",
    hits: [
      { title: "Laporan Keuangan Tahunan 2025", no: "KEU-2026-000123 · halaman 1", pre: "… ringkasan eksekutif ", mark: "laporan keuangan", post: " tahun buku 2025 yang telah diaudit …" },
      { title: "Catatan Atas Laporan Keuangan Semester II", no: "KEU-2026-000124 · halaman 4", pre: "… lampiran resmi ", mark: "laporan keuangan", post: " mencakup pos aset tetap dan kewajiban …" },
    ],
  },
  {
    q: '"kendaraan operasional" hold:aktif',
    meta: "1 hasil · arsip dalam legal hold · akses diaudit",
    hits: [
      { title: "Pengadaan Kendaraan Operasional 2014", no: "PGD-2014-000033 · halaman 3", pre: "… berita acara serah terima ", mark: "kendaraan operasional", post: " unit dinas wilayah Jakarta …" },
    ],
  },
]

export function InteractiveSearchMock() {
  const [presetIdx, setPresetIdx] = useState(0)
  const current = searchPresets[presetIdx]

  return (
    <MockFrame title="Pencarian & Temu Kembali · Hasil Pencarian" interactive>
      <div className="p-4 text-[13px]">
        <div className="flex h-10 items-center gap-2 rounded-md border border-brand bg-white px-3 text-navy ring-3 ring-brand/12">
          <SearchIcon className="size-4 shrink-0 text-brand" aria-hidden />
          <span className="truncate font-medium">{current.q}</span>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="text-[11.5px] text-muted-foreground">Coba kueri:</span>
          {["Pemeliharaan gedung", "Laporan keuangan", "Kendaraan (legal hold)"].map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setPresetIdx(i)}
              className={cn(
                "rounded-md border px-2 py-0.5 text-[11.5px] font-semibold transition",
                presetIdx === i ? "border-brand bg-brand-wash text-brand-ink" : "border-border bg-white text-body hover:bg-mist",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-2.5 text-xs text-muted-foreground">{current.meta}</p>
        <ul className="mt-3 flex flex-col gap-2">
          {current.hits.map((h) => (
            <li key={h.no} className="rounded-md border border-border p-3 transition hover:border-brand/30 hover:bg-mist/30">
              <p className="flex items-center gap-2 font-semibold text-navy">
                <FileTextIcon className="size-4 text-brand" aria-hidden />
                {h.title}
              </p>
              <p className="mt-1 text-body">
                {h.pre}
                <mark className="rounded-[3px] bg-brand-wash px-1 font-medium text-brand-ink">{h.mark}</mark>
                {h.post}
              </p>
              <p className="code mt-1 text-[11.5px] text-muted-foreground">{h.no}</p>
            </li>
          ))}
        </ul>
      </div>
    </MockFrame>
  )
}
