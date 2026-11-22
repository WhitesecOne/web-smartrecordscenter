"use client"

import { AlertCircleIcon, ArrowRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { site } from "@/lib/site"

const demoSchema = z.object({
  name: z.string().trim().min(2, "Mohon isi nama lengkap Anda (minimal 2 karakter)."),
  role: z.string().trim().min(2, "Mohon isi jabatan atau unit kerja Anda."),
  organization: z.string().trim().min(2, "Mohon isi nama instansi atau perusahaan Anda."),
  email: z.string().trim().email("Format alamat email tidak valid."),
  sector: z.enum(["Instansi Pemerintah", "BUMN & BUMD", "Perbankan & Keuangan", "Energi & Infrastruktur", "Korporasi & Lainnya"], {
    message: "Mohon pilih sektor organisasi Anda.",
  }),
  notes: z.string().trim().min(10, "Jelaskan kebutuhan arsip Anda secara singkat (minimal 10 karakter)."),
})

type FormData = z.infer<typeof demoSchema>
type FieldErrors = Partial<Record<keyof FormData, string>>

const sectors = [
  "Instansi Pemerintah",
  "BUMN & BUMD",
  "Perbankan & Keuangan",
  "Energi & Infrastruktur",
  "Korporasi & Lainnya",
] as const

export function DemoRequestForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [values, setValues] = useState({
    name: "",
    role: "",
    organization: "",
    email: "",
    sector: "",
    notes: "",
  })

  function update(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (formError) setFormError(null)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const parsed = demoSchema.safeParse(values)
    if (!parsed.success) {
      const next: FieldErrors = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormData | undefined
        if (key && !next[key]) next[key] = issue.message
      }
      setErrors(next)
      setFormError("Mohon periksa kembali kolom yang ditandai sebelum melanjutkan.")
      return
    }

    setSubmitting(true)
    setErrors({})
    setFormError(null)

    const d = parsed.data
    const subject = `Permintaan Demo Smart Records Center: ${d.organization}`
    const body = [
      "Halo tim Smart Records Center,",
      "",
      `Nama: ${d.name}`,
      `Jabatan / Unit: ${d.role}`,
      `Organisasi: ${d.organization}`,
      `Email: ${d.email}`,
      `Sektor: ${d.sector}`,
      "",
      "Kebutuhan arsip kami:",
      d.notes,
      "",
      "Terima kasih.",
    ].join("\n")

    try {
      sessionStorage.setItem(
        "src-demo-draft",
        JSON.stringify({
          name: d.name,
          organization: d.organization,
          sector: d.sector,
          mailto: `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        }),
      )
    } catch {}

    await new Promise((r) => setTimeout(r, 350))
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    router.push("/terima-kasih")
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
      <h2 className="font-heading text-xl font-bold text-navy">Formulir permintaan demo</h2>
      <p className="mt-1.5 text-[0.9375rem] text-body">
        Lengkapi ringkasan kebutuhan Anda. Sistem akan menyiapkan draf email resmi ke <span className="font-semibold text-navy">{site.email}</span>.
      </p>

      {formError && (
        <div role="alert" className="mt-5 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
          <AlertCircleIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{formError}</span>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="demo-name">Nama lengkap</Label>
          <Input
            id="demo-name"
            name="name"
            autoComplete="name"
            placeholder="Budi Santoso"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "demo-name-err" : undefined}
          />
          {errors.name && <p id="demo-name-err" className="text-xs font-medium text-destructive">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="demo-role">Jabatan / Unit kerja</Label>
          <Input
            id="demo-role"
            name="role"
            autoComplete="organization-title"
            placeholder="Kepala Unit Kearsipan"
            value={values.role}
            onChange={(e) => update("role", e.target.value)}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? "demo-role-err" : undefined}
          />
          {errors.role && <p id="demo-role-err" className="text-xs font-medium text-destructive">{errors.role}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="demo-org">Organisasi / Perusahaan</Label>
          <Input
            id="demo-org"
            name="organization"
            autoComplete="organization"
            placeholder="Nama instansi atau perusahaan"
            value={values.organization}
            onChange={(e) => update("organization", e.target.value)}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? "demo-org-err" : undefined}
          />
          {errors.organization && <p id="demo-org-err" className="text-xs font-medium text-destructive">{errors.organization}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="demo-email">Email kantor</Label>
          <Input
            id="demo-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@organisasi.go.id"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "demo-email-err" : undefined}
          />
          {errors.email && <p id="demo-email-err" className="text-xs font-medium text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <Label htmlFor="demo-sector">Sektor organisasi</Label>
        <select
          id="demo-sector"
          name="sector"
          value={values.sector}
          onChange={(e) => update("sector", e.target.value)}
          aria-invalid={Boolean(errors.sector)}
          aria-describedby={errors.sector ? "demo-sector-err" : undefined}
          className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm text-navy focus:border-brand focus:outline-none aria-invalid:border-destructive"
        >
          <option value="">Pilih sektor organisasi…</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.sector && <p id="demo-sector-err" className="text-xs font-medium text-destructive">{errors.sector}</p>}
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <Label htmlFor="demo-notes">Ringkasan kebutuhan arsip</Label>
        <Textarea
          id="demo-notes"
          name="notes"
          rows={4}
          placeholder="Contoh: penataan arsip kontrak dan keuangan, penerapan JRA, serta pemilahan dokumen arsip dan non-arsip."
          value={values.notes}
          onChange={(e) => update("notes", e.target.value)}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "demo-notes-err" : undefined}
        />
        {errors.notes && <p id="demo-notes-err" className="text-xs font-medium text-destructive">{errors.notes}</p>}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">Data diproses sesuai Kebijakan Privasi UU 27/2022.</p>
        <Button type="submit" size="lg" disabled={submitting} className="gap-2">
          {submitting && <Spinner data-icon="inline-start" />}
          {submitting ? "Menyiapkan permintaan…" : "Lanjutkan permintaan demo"}
          {!submitting && <ArrowRightIcon className="size-4" aria-hidden />}
        </Button>
      </div>
    </form>
  )
}
