import { CheckIcon, MailIcon, ShieldAlertIcon } from "lucide-react"
import type { Metadata } from "next"

import { JsonLd } from "@/components/json-ld"
import { PageHero, Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { pageGraph } from "@/lib/seo"
import { ogBase, site } from "@/lib/site"

import { CopyEmail } from "./copy-email"
import { DemoRequestForm } from "./demo-form"

export const metadata: Metadata = {
  title: "Minta Demo",
  description:
    "Minta demo Smart Records Center. Kami tunjukkan verifikasi dan pemilahan arsip, klasifikasi, repositori, pencarian, retensi dan penyusutan, jejak audit, serta pelaporan (dashboard) memakai skenario arsip organisasi Anda.",
  alternates: { canonical: "/kontak" },
  openGraph: { ...ogBase, url: "/kontak", title: "Minta demo Smart Records Center" },
}

const agenda = [
  "Alur satu seri arsip Anda: dipilah dari non-arsip, diverifikasi kelengkapan metadatanya, diklasifikasikan, dan diberi jadwal retensi sesuai JRA.",
  "Pencarian teks lengkap dan metadata, serta usulan AI beserta skor dan sumbernya.",
  "Jejak audit berantai hash dan cara auditor memverifikasinya secara mandiri.",
  "Dasbor kepatuhan dan contoh laporan untuk pimpinan dan regulator.",
  "Opsi penerapan dan integrasi dengan sistem yang sudah Anda pakai.",
]

const subject = "Permintaan demo Smart Records Center"
const body = "Halo tim Smart Records Center,\n\nNama:\nJabatan:\nOrganisasi:\nSektor:\n\nKebutuhan arsip kami:\n\nTerima kasih."
const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export default function KontakPage() {
  return (
    <>
      <JsonLd data={pageGraph("ContactPage", "/kontak", "Minta Demo", "Minta demo Smart Records Center atau hubungi kami langsung.")} />
      <PageHero
        crumbs={[{ label: "Kontak" }]}
        title="Minta demo Smart Records Center"
        lead="Isi formulir singkat atau kirim email langsung tentang kebutuhan arsip organisasi Anda. Kami siapkan sesi demo yang mengikuti alur kerja Anda, bukan presentasi umum."
        actions={
          <div data-primary-cta className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<a href={mailto} />} nativeButton={false} className="gap-2">
              <MailIcon aria-hidden />
              Kirim email langsung ke {site.email}
            </Button>
          </div>
        }
      />

      <Section className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="flex flex-col gap-8">
            <DemoRequestForm />
            <p className="flex gap-3 rounded-xl border border-border bg-mist p-4 text-[0.9375rem] leading-relaxed">
              <ShieldAlertIcon className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden />
              <span>
                <strong className="font-semibold text-navy">Jangan lampirkan dokumen rahasia di komunikasi pertama.</strong> Cukup jelaskan jenis arsip dan
                kebutuhannya secara umum.
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-navy">Yang dibahas dalam demo</h2>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {agenda.map((item) => (
                  <li key={item} className="flex gap-3 py-4 text-[0.9375rem] leading-relaxed">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="kontak-langsung" className="rounded-xl border border-border bg-mist/60 p-6">
              <h2 className="font-heading text-xl font-bold tracking-[-0.02em] text-navy">Kontak langsung</h2>
              <dl className="mt-5 grid gap-4 text-[0.9375rem]">
                <div>
                  <dt className="text-sm text-muted-foreground">Alamat kantor</dt>
                  <dd className="mt-0.5 font-medium text-navy">{site.address}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Email</dt>
                  <dd className="mt-0.5">
                    <a href={`mailto:${site.email}`} className="inline-flex min-h-9 items-center font-semibold text-brand underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Telepon</dt>
                  <dd className="mt-0.5">
                    <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="inline-flex min-h-9 items-center font-semibold text-brand underline">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-5 border-t border-border pt-5">
                <CopyEmail email={site.email} />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
