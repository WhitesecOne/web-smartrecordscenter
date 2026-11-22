import { CheckIcon, MailIcon, ShieldAlertIcon } from "lucide-react"
import type { Metadata } from "next"

import { JsonLd } from "@/components/json-ld"
import { PageHero, Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { pageGraph } from "@/lib/seo"
import { ogBase, site } from "@/lib/site"

import { CopyEmail } from "./copy-email"

export const metadata: Metadata = {
  title: "Minta Demo",
  description:
    "Minta demo Smart Records Center lewat email. Kami tunjukkan verifikasi dan pemilahan arsip, klasifikasi, repositori, pencarian, retensi dan penyusutan, jejak audit, serta pelaporan (dashboard) memakai skenario arsip organisasi Anda.",
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

const include = ["Nama, jabatan, dan nama organisasi Anda", "Sektor organisasi (pemerintah, BUMN, keuangan, korporasi)", "Kebutuhan arsip Anda secara umum, dan modul yang paling Anda butuhkan"]

// Opens the visitor's mail app with the subject and an outline already filled in.
const subject = "Permintaan demo Smart Records Center"
const body = "Halo tim Smart Records Center,\n\nNama:\nJabatan:\nOrganisasi:\nSektor:\n\nKebutuhan arsip kami:\n\nTerima kasih."
const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export default function KontakPage() {
  return (
    <>
      <JsonLd data={pageGraph("ContactPage", "/kontak", "Minta Demo", "Minta demo Smart Records Center atau hubungi kami langsung lewat email.")} />
      <PageHero
        crumbs={[{ label: "Kontak" }]}
        title="Minta demo Smart Records Center"
        lead="Kirim email singkat tentang kebutuhan arsip organisasi Anda. Kami siapkan demo yang mengikuti alur kerja Anda, bukan presentasi umum."
        actions={
          <div data-primary-cta className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<a href={mailto} />} nativeButton={false}>
              <MailIcon aria-hidden />
              Kirim email ke {site.email}
            </Button>
          </div>
        }
      />

      <Section className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-2xl font-bold tracking-[-0.02em]">Yang kita bahas dalam demo</h2>
              <ol className="mt-6 flex flex-col gap-3">
                {agenda.map((item, i) => (
                  <li key={item} className="flex gap-3.5 rounded-xl border border-border bg-white p-4 leading-relaxed shadow-card">
                    <span className="code flex size-7 shrink-0 items-center justify-center rounded-md bg-brand-wash text-xs font-semibold text-brand-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9375rem]">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-xl border border-border bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-xl font-bold tracking-[-0.02em]">Cara menghubungi kami</h2>
              <p className="mt-3 leading-relaxed">
                Tulis email ke{" "}
                <a href={`mailto:${site.email}`} className="font-semibold break-all text-brand underline">
                  {site.email}
                </a>
                . Tombol di atas membuka aplikasi email Anda dengan subjek dan kerangka isi yang sudah terisi. Bila tidak terbuka, salin alamatnya.
              </p>
              <p className="mt-5 text-sm font-semibold text-navy">Sebaiknya sebutkan:</p>
              <ul className="mt-2 flex flex-col gap-2 text-[0.9375rem]">
                {include.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <CopyEmail email={site.email} />
              </div>
            </div>

            <p className="flex gap-3 rounded-lg bg-mist p-4 text-[0.9375rem] leading-relaxed">
              <ShieldAlertIcon className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden />
              <span>
                <strong className="font-semibold text-navy">Jangan lampirkan dokumen rahasia di email pertama.</strong> Cukup jelaskan jenis arsip dan
                kebutuhannya secara umum.
              </span>
            </p>

            <div id="kontak-langsung" className="border-t border-border pt-8">
              <h2 className="text-xl font-bold tracking-[-0.02em]">Kontak langsung</h2>
              <dl className="mt-5 grid gap-4 text-[0.9375rem]">
                <div>
                  <dt className="text-sm text-muted-foreground">Alamat</dt>
                  <dd className="mt-0.5 font-medium text-navy">{site.address}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Email</dt>
                  <dd className="mt-0.5">
                    <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center font-medium text-brand underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Telepon</dt>
                  <dd className="mt-0.5">
                    <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="inline-flex min-h-11 items-center font-medium text-brand underline">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
