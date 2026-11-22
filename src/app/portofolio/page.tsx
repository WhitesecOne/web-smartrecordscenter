import { ArrowRightIcon, CheckIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { ExperienceGrid } from "@/components/experience-grid"
import { JsonLd } from "@/components/json-ld"
import { Reveal } from "@/components/reveal"
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/section"
import { approachPillars, experienceDetails, experienceDisclaimer } from "@/lib/portfolio"
import { pageGraph } from "@/lib/seo"
import { ogBase } from "@/lib/site"

const title = "Portofolio & Pengalaman Profesional"
const description =
  "Pengalaman profesional tim dan penasihat Smart Records Center dalam manajemen rekod, pengendalian dokumen, tata kelola kearsipan, dan information governance di berbagai organisasi dan sektor teregulasi."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portofolio" },
  openGraph: { ...ogBase, url: "/portofolio", title, description },
}

const lifecycleFocus = [
  "Penciptaan, verifikasi pemilahan, dan klasifikasi informasi sejak pintu masuk",
  "Penggunaan, pengendalian dokumen, dan hak akses berbasis peran",
  "Retensi, penilaian (appraisal), dan penyusutan dengan persetujuan berjenjang",
  "Preservasi informasi digital jangka panjang yang siap diaudit",
]

const commitmentPoints = [
  "Terstruktur dan mudah ditemukan saat dibutuhkan pimpinan maupun pemeriksa",
  "Aman dan terlindungi sesuai klasifikasi kerahasiaan serta regulasi data pribadi",
  "Dapat dipercaya dan dipertanggungjawabkan melalui jejak audit yang utuh",
  "Siap mendukung keputusan bisnis, mitigasi risiko, dan kepatuhan regulasi",
]

export default function PortofolioPage() {
  return (
    <>
      <JsonLd data={pageGraph("WebPage", "/portofolio", title, description)} />
      <PageHero
        crumbs={[{ label: "Portofolio" }]}
        title="Pengalaman, tata kelola, dan teknologi untuk informasi yang tepercaya"
        lead="Smart Records Center dibangun dari pengalaman praktis dalam mengelola dokumen, rekod, arsip, pengendalian dokumen, pusat arsip (records center), serta tata kelola informasi di berbagai organisasi dan industri dengan tuntutan keamanan, kepatuhan, dan akuntabilitas tinggi."
        photo={{ src: "/images/glass-dusk.webp", alt: "Fasad gedung perkantoran berdinding kaca saat senja" }}
      />

      {/* Selected professional experience: logo grid + structured scope matrix */}
      <Section id="pengalaman">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-12">
          <SectionHeading
            title="Pengalaman profesional terpilih"
            lead="Pengalaman profesional tim dan penasihat Smart Records Center mencakup proyek dan pekerjaan terkait manajemen rekod, pengendalian dokumen, tata kelola kearsipan, pusat arsip, serta arsip digital di berbagai sektor."
          />
          <div className="rounded-xl border border-border bg-mist/70 p-5 text-[0.9375rem] leading-relaxed text-body">
            Kami menggabungkan keahlian profesional, standar internasional, kepatuhan regulasi, dan teknologi digital untuk membantu organisasi mengubah dokumen dan rekod
            menjadi aset informasi bernilai jangka panjang.
          </div>
        </div>

        <Reveal className="mt-12">
          <ExperienceGrid showDisclaimer={false} />
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-xl border border-border bg-white shadow-card">
          <div aria-hidden className="hidden grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,5fr)] gap-6 border-b border-border bg-mist px-5 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase lg:grid">
            <span>Organisasi</span>
            <span>Sektor</span>
            <span>Ruang lingkup pengalaman</span>
          </div>
          <ul className="divide-y divide-border">
            {experienceDetails.map((item) => (
              <li key={item.organization} className="grid gap-2 px-5 py-5 transition-colors hover:bg-mist/40 lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,5fr)] lg:gap-6">
                <p className="font-heading text-base font-bold text-navy">{item.organization}</p>
                <p className="text-[0.9rem] font-semibold text-brand-ink">
                  <span className="font-semibold text-navy lg:sr-only">Sektor: </span>
                  {item.sector}
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-body">
                  <span className="font-semibold text-navy lg:sr-only">Ruang lingkup: </span>
                  {item.scope}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-5 max-w-[82ch] text-[13px] leading-relaxed text-muted-foreground">{experienceDisclaimer}</p>
      </Section>

      {/* From experience to transformation + 4 Approach Bento Cards */}
      <Section tone="mist" id="pendekatan">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              title="Dari pengalaman menuju transformasi"
              lead="Pengalaman di lapangan menjadi fondasi Smart Records Center dalam merancang solusi yang memperhatikan keamanan, tata kelola, manusia, proses, kepatuhan, retensi, penyusutan, preservasi, dan nilai bisnis."
            />
            <blockquote className="mt-8 rounded-xl border border-navy/15 bg-navy p-6 font-heading text-lg leading-snug font-bold text-white shadow-card">
              &ldquo;Digitalisasi dokumen tanpa tata kelola yang baik hanya akan memindahkan masalah dari lemari arsip ke server.&rdquo;
            </blockquote>
            <ul className="mt-6 flex flex-col gap-3">
              {lifecycleFocus.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="h2">Pendekatan kami</h3>
            <p className="lead mt-4 text-body">
              Empat prinsip kerja yang menyatukan kebijakan kearsipan, kepatuhan regulasi, dan teknologi dalam satu jalur pengelolaan informasi menyeluruh.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {approachPillars.map((pillar, i) => (
                <div key={pillar.title} className="rounded-xl border border-border bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between gap-2">
                    <span className="code text-xs font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rounded-md bg-brand-wash px-2 py-0.5 text-[11.5px] font-semibold text-brand-ink">{pillar.subtitle}</span>
                  </div>
                  <h4 className="mt-3 font-heading text-lg font-bold text-navy">{pillar.title}</h4>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-body">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Our commitment */}
      <Section id="komitmen">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading
              title="Komitmen kami"
              lead="Smart Records Center hadir untuk membantu organisasi membangun lingkungan informasi tepercaya (trusted information environment) yang siap mendukung kebutuhan bisnis maupun regulasi."
            />
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href="/modul" className="link-action">
                Pelajari ketujuh modul <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
              <Link href="/tentang-kami" className="link-action">
                Tentang kami <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-white shadow-card">
              {commitmentPoints.map((point) => (
                <li key={point} className="flex gap-3 px-5 py-4 text-[0.9375rem] leading-relaxed">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-brand/20 bg-brand-wash/70 p-5">
                <p className="font-heading text-base font-bold text-navy">Dari dokumen menuju informasi tepercaya</p>
                <p className="mt-1 text-xs font-medium text-brand-ink">From Documents to Trusted Information</p>
              </div>
              <div className="rounded-xl border border-brand/20 bg-brand-wash/70 p-5">
                <p className="font-heading text-base font-bold text-navy">Dari manajemen rekod menuju tata kelola informasi</p>
                <p className="mt-1 text-xs font-medium text-brand-ink">From Records Management to Information Governance</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        photo={{ src: "/images/office-curve.webp", alt: "Gedung perkantoran berdinding kaca melengkung" }}
        title="Diskusikan kebutuhan tata kelola arsip organisasi Anda"
        lead="Tim kami siap membahas pemetaan kebutuhan kearsipan, skema klasifikasi, jadwal retensi, hingga demonstrasi langsung ketujuh modul Smart Records Center."
      />
    </>
  )
}
