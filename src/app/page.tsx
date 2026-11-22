import { ArrowRightIcon, CheckIcon } from "lucide-react"
import * as motion from "motion/react-client"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { ExperienceGrid, ExperienceStrip } from "@/components/experience-grid"
import { JsonLd } from "@/components/json-ld"
import { LifecycleTimeline } from "@/components/lifecycle"
import { ExtractionMock } from "@/components/product/extraction"
import { HeroDashboardApp } from "@/components/product/hero-dashboard-app"
import { ProductMock } from "@/components/product/mocks"
import { RegisterVerifier } from "@/components/product/register"
import { Reveal } from "@/components/reveal"
import { CtaBand, Section, SectionHeading } from "@/components/section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { faq } from "@/lib/faq"
import { modules } from "@/lib/modules"
import { homeGraph } from "@/lib/seo"
import { ogBase, references, sectors, site } from "@/lib/site"

const title = "Smart Records Center: Platform Tata Kelola Arsip Digital"
const description =
  "Platform tata kelola arsip digital: verifikasi dan pemilahan arsip, klasifikasi arsip, repositori multi-organisasi, pencarian teks lengkap, retensi dan penyusutan, jejak audit, serta pelaporan (dashboard) kepatuhan."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { ...ogBase, url: "/", title, description: site.description },
}

const ease = [0.16, 1, 0.3, 1] as const

const challenges = [
  {
    problem: "Dokumen arsip dan non-arsip tercampur di folder bersama dan email.",
    answer: "Pemilahan otomatis memisahkan dokumen bernilai guna dari non-arsip sejak pintu masuk, lalu menyimpannya ke repositori terstruktur per organisasi.",
    module: "verifikasi-pemilahan-arsip",
  },
  {
    problem: "Arsip yang diminta pimpinan atau auditor sulit ditemukan.",
    answer: "Pencarian teks lengkap, OCR pindaian, dan filter metadata menemukan arsip dalam hitungan detik, selalu disaring hak akses pengguna.",
    module: "pencarian-temu-kembali",
  },
  {
    problem: "Retensi dan penyusutan dihitung manual dan sering terlambat.",
    answer: "Mesin aturan menghitung tanggal pindah inaktif dan jatuh tempo dari JRA, lalu menyusun batch usulan penyusutan dengan persetujuan berjenjang.",
    module: "retensi-penyusutan",
  },
  {
    problem: "Kepatuhan sulit dibuktikan saat pemeriksaan internal atau regulator.",
    answer: "Jejak audit berantai hash yang tidak dapat diubah, ditambah dasbor kepatuhan yang setiap angkanya dapat ditelusuri hingga ke arsipnya.",
    module: "jejak-audit",
  },
]

const controls = [
  "Log audit append-only berantai hash SHA-256",
  "Ruang data dan kunci enkripsi terpisah per organisasi",
  "Akses berlapis menurut peran, unit kerja, dan tingkat keamanan",
  "Enkripsi TLS 1.3 saat transit dan enkripsi per berkas di KMS/HSM",
  "Media write-once untuk arsip bernilai guna permanen",
  "Legal hold otomatis dan pemisahan tugas pengusul serta penyetuju",
]

const reasons = [
  {
    title: "Alur kearsipan Indonesia sejak awal",
    text: "Verifikasi pemilahan, klasifikasi arsip, JRA, penyusutan, dan berita acara menjadi inti sistem, bukan kolom tambahan di aplikasi dokumen umum.",
  },
  {
    title: "Metadata standar yang dapat dipertukarkan",
    text: "Skema mengikuti Dublin Core yang diperluas dan prinsip ISO 23081, sehingga arsip tetap terbaca oleh sistem maupun pemeriksa lain.",
  },
  {
    title: "AI dengan kendali arsiparis",
    text: "Setiap usulan AI menampilkan sumber dan skor keyakinannya, lalu menunggu konfirmasi arsiparis sebelum berlaku.",
  },
  {
    title: "Bukti audit yang dapat diverifikasi mandiri",
    text: "Auditor memeriksa keutuhan jejak audit dan paket bukti secara mandiri dengan SHA-256, tanpa bergantung pada pernyataan vendor.",
  },
]

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />

      {/* Editorial Architectural Hero + Full-Width 1280px Interactive Dashboard Showcase */}
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden
          className="bg-grid-light pointer-events-none absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
        />
        <div aria-hidden className="hero-glow-light pointer-events-none absolute inset-0 -z-10" />

        <div className="container-page pt-12 pb-16 lg:pt-16 lg:pb-20">
          {/* Editorial top header: huge display H1 left, clear promise + CTA right above the fold */}
          <motion.div
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-14"
          >
            <div>
              <h1 className="display text-[clamp(2.45rem,4.6vw,3.9rem)] text-navy">
                Tata kelola arsip digital yang tertib, patuh, dan siap diaudit.
              </h1>
            </div>

            <div>
              <p className="lead text-body">
                Smart Records Center memilah, mengklasifikasikan, menyimpan, mencari, meretensi, dan menyusutkan arsip digital organisasi Anda dalam satu platform. Setiap
                tindakan tercatat di jejak audit yang tidak dapat diubah, dan setiap usulan AI ditinjau arsiparis sebelum berlaku.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row" data-primary-cta>
                <Button size="lg" render={<Link href="/kontak" />} nativeButton={false} className="gap-2">
                  Minta Demo
                  <ArrowRightIcon className="size-4" aria-hidden />
                </Button>
                <Button size="lg" variant="outline" render={<Link href="#modul" />} nativeButton={false}>
                  Lihat Tujuh Modul
                </Button>
              </div>
              <p className="mt-5 text-[12.5px] leading-relaxed text-muted-foreground">
                Acuan rancangan:{" "}
                {references.map((r, i) => (
                  <span key={r.code}>
                    <span className="font-semibold text-navy">{r.code}</span>
                    {i < references.length - 1 ? ", " : ". "}
                  </span>
                ))}
                Bukan klaim sertifikasi.
              </p>
            </div>
          </motion.div>

          {/* Full-width 1280px interactive enterprise records dashboard */}
          <motion.div initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.85, ease, delay: 0.1 }} className="mt-10 lg:mt-12">
            <HeroDashboardApp />
          </motion.div>
        </div>
      </section>

      {/* Immediate Enterprise Credibility Strip: Selected Experience */}
      <ExperienceStrip />

      {/* Clean 7-Module Architectural Directory Strip */}
      <nav aria-label="Tujuh modul" className="border-b border-border bg-white">
        <div className="container-page">
          <ul className="grid grid-cols-2 divide-y divide-border sm:grid-cols-4 lg:grid-cols-7 lg:divide-x lg:divide-y-0">
            {modules.map((m) => (
              <li key={m.slug}>
                <Link href={`/modul/${m.slug}`} className="group flex h-full flex-col gap-2.5 px-3.5 py-4 transition-colors hover:bg-mist/70 lg:px-4 lg:py-5">
                  <m.icon className="size-5 text-brand" aria-hidden />
                  <span className="text-[13.5px] leading-snug font-semibold text-navy group-hover:text-brand">{m.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Governance Challenges -> Solutions: Hairline Editorial Grid (zero card-slop) */}
      <Section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Arsip terus bertambah. Aturannya tidak boleh tertinggal."
            lead="Organisasi teregulasi wajib memilah, menyimpan, menemukan kembali, menyusutkan, dan membuktikan pengelolaan arsipnya secara konsisten."
          />
          <Link href="/mengapa-kami" className="link-action shrink-0">
            Bandingkan dengan cara manual <ArrowRightIcon className="size-4" aria-hidden />
          </Link>
        </div>

        <ol className="mt-12 grid border-y border-border md:grid-cols-2">
          {challenges.map((c, i) => {
            const m = modules.find((x) => x.slug === c.module)!
            return (
              <li
                key={c.problem}
                className={
                  "flex flex-col justify-between py-8 md:py-9 " +
                  (i >= 2 ? "border-t border-border " : i === 1 ? "border-t border-border md:border-t-0 " : "") +
                  (i % 2 === 1 ? "md:border-l md:border-border md:pl-10" : "md:pr-10")
                }
              >
                <div>
                  <h3 className="font-heading text-xl leading-snug font-bold text-navy">{c.problem}</h3>
                  <p className="mt-3 flex gap-2.5 text-[0.9375rem] leading-relaxed text-body">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                    {c.answer}
                  </p>
                </div>
                <div className="mt-5 pl-6.5">
                  <Link href={`/modul/${m.slug}`} className="link-action text-sm">
                    Modul {m.name} <ArrowRightIcon className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </li>
            )
          })}
        </ol>
      </Section>

      {/* Signature Interactive 7-Module Explorer */}
      <Section tone="mist" id="modul" className="scroll-mt-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Tujuh modul untuk seluruh tata kelola arsip digital"
            lead="Setiap modul memiliki layar kerjanya sendiri dan dapat diterapkan bertahap. Semuanya bekerja di atas arsip, aturan, dan jejak audit yang sama."
          />
          <Link href="/modul" className="link-action shrink-0">
            Bandingkan semua modul <ArrowRightIcon className="size-4" aria-hidden />
          </Link>
        </div>

        <Tabs defaultValue={modules[0].slug} orientation="vertical" className="mt-12 flex-col gap-8 lg:flex-row lg:gap-10">
          <TabsList variant="line" className="w-full shrink-0 items-stretch gap-1 lg:w-[22.5rem]">
            {modules.map((m) => (
              <TabsTrigger
                key={m.slug}
                value={m.slug}
                className="group/tab h-auto items-start gap-3.5 rounded-lg border border-transparent px-3.5 py-3 text-left whitespace-normal text-body transition-all after:hidden hover:bg-white/75 data-active:border-border data-active:bg-white data-active:shadow-[0_1px_2px_rgb(8_27_54/0.06)]"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white text-navy ring-1 ring-border transition-colors group-data-active/tab:bg-brand group-data-active/tab:text-white group-data-active/tab:ring-brand [&_svg]:size-[1.125rem]!">
                  <m.icon aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[0.95rem] font-bold text-navy">{m.name}</span>
                  <span className="text-[13px] leading-snug font-normal text-muted-foreground">{m.short}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((m) => (
            <TabsContent key={m.slug} value={m.slug} className="min-w-0 animate-in text-base duration-400 fade-in-0 slide-in-from-bottom-2">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:gap-10">
                <div>
                  <h3 className="h3 text-2xl">{m.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{m.lead}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="rounded-lg border border-brand/20 bg-brand-wash/75 px-4 py-3 text-[0.9375rem] leading-relaxed text-navy">
                    <span className="font-semibold text-brand-ink">Peran AI: </span>
                    {m.ai}
                  </p>
                  <Link href={`/modul/${m.slug}`} className="link-action">
                    Pelajari modul {m.name} <ArrowRightIcon className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
              <div className="mt-8">
                <ProductMock k={m.heroMock} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      {/* Interactive Record Lifecycle Explorer */}
      <Section id="siklus">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Satu arsip, dari diterima sampai nasib akhirnya"
            lead="Status arsip tidak diubah tangan. Tanggal pindah dan jatuh tempo dihitung otomatis dari penutupan berkas dan aturan retensi pada kode klasifikasinya."
          />
          <Link href="/platform/cara-kerja" className="link-action shrink-0">
            Lihat cara kerja lengkap <ArrowRightIcon className="size-4" aria-hidden />
          </Link>
        </div>
        <LifecycleTimeline className="mt-10" />
      </Section>

      {/* AI Under Human Control + Structured Governance Ledger */}
      <Section tone="mist" id="ai">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading
              title="AI di setiap modul. Keputusan tetap di tangan arsiparis."
              lead="Model membaca dokumen, memilah, mengusulkan, dan menandai. Setiap usulan menampilkan sumber dan skor keyakinannya, lalu menunggu konfirmasi sebelum berlaku."
            />
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {[
                "Usulan AI tidak berlaku otomatis sebelum dikonfirmasi arsiparis berwenang.",
                "Keyakinan di bawah 0,90 otomatis ditandai wajib review prioritas.",
                "Model, versi, skor keyakinan, sumber teks, dan peninjau tercatat permanen di jejak audit.",
              ].map((t) => (
                <li key={t} className="flex gap-3 py-4 text-[0.9375rem] leading-relaxed">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <ExtractionMock />
          </Reveal>
        </div>

        <div className="mt-16 overflow-hidden rounded-xl border border-border bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
            <h3 className="font-heading text-lg font-bold text-navy">Peran AI di ketujuh modul</h3>
            <Link href="/modul#perbandingan" className="link-action text-sm">
              Bandingkan semua modul <ArrowRightIcon className="size-3.5" aria-hidden />
            </Link>
          </div>
          <dl>
            {modules.map((m) => (
              <div key={m.slug} className="grid gap-1.5 border-b border-border px-5 py-4 last:border-b-0 md:grid-cols-[17.5rem_minmax(0,1fr)] md:gap-6">
                <dt>
                  <Link href={`/modul/${m.slug}`} className="inline-flex items-center gap-2.5 font-semibold text-navy hover:text-brand hover:underline">
                    <m.icon className="size-4 shrink-0 text-brand" aria-hidden />
                    {m.name}
                  </Link>
                </dt>
                <dd className="text-[0.9375rem] leading-relaxed">{m.ai}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Deep Navy Security & Live SHA-256 Audit Chain Verifier */}
      <section id="keamanan" className="relative isolate overflow-hidden bg-navy py-20 text-white lg:py-28">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-20 opacity-80" />
        <div aria-hidden className="hero-glow-dark pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
            <SectionHeading
              inverse
              title="Jejak audit yang dapat Anda periksa sendiri"
              lead="Setiap entri log menyimpan hash entri sebelumnya. Ubah satu baris di bawah ini, dan lihat rantai SHA-256 putus tepat di baris tersebut."
            />
            <div>
              <ul className="grid gap-3 text-[0.9375rem] text-white/85 sm:grid-cols-2">
                {controls.map((c) => (
                  <li key={c} className="flex gap-3">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-brand-soft" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/platform/keamanan" className="inline-flex items-center gap-1.5 font-semibold text-brand-soft hover:text-white hover:underline">
                  Keamanan &amp; kepatuhan <ArrowRightIcon className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          <Reveal className="mt-12">
            <RegisterVerifier />
            <p className="mt-3 text-[13px] text-white/70">Verifikasi ini berjalan langsung di browser Anda memakai SHA-256 sungguhan atas log contoh.</p>
          </Reveal>
        </div>
      </section>

      {/* Regulated Sectors */}
      <Section id="industri">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Untuk organisasi dengan kewajiban kearsipan"
            lead="Kebutuhan tiap sektor berbeda. Aturan dasarnya sama: arsip harus tertata, patuh, dan dapat dibuktikan."
          />
          <Link href="/industri" className="link-action shrink-0">
            Semua industri <ArrowRightIcon className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <li key={s.id}>
              <Link
                href={s.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-product"
              >
                <span className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-heading text-lg font-bold text-navy group-hover:text-brand">{s.label}</span>
                  <span className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-body">{s.desc}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Lihat solusi <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Selected Professional Experience Full Showcase */}
      <Section tone="mist" id="pengalaman">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Pengalaman profesional di berbagai sektor teregulasi"
            lead="Smart Records Center dibangun dari pengalaman praktis tim dan penasihat kami dalam pengelolaan rekod, pengendalian dokumen, dan tata kelola informasi di berbagai organisasi."
          />
          <Link href="/portofolio" className="link-action shrink-0">
            Lihat portofolio lengkap <ArrowRightIcon className="size-4" aria-hidden />
          </Link>
        </div>
        <Reveal className="mt-12">
          <ExperienceGrid />
        </Reveal>
      </Section>

      {/* Why Smart Records Center: Editorial 2px Navy Rules (zero card slop) */}
      <Section id="mengapa">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading title="Dibangun untuk cara kerja kearsipan di Indonesia" />
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {references.map((r) => (
                <li key={r.code} className="flex items-baseline gap-4 py-3.5">
                  <span className="code w-28 shrink-0 text-sm font-semibold text-navy">{r.code}</span>
                  <span className="text-[0.9375rem] text-body">{r.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] text-muted-foreground">Acuan rancangan sistem, bukan klaim sertifikasi.</p>
          </div>

          <div>
            <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {reasons.map((r) => (
                <div key={r.title} className="border-t-2 border-navy pt-5">
                  <h3 className="text-lg font-bold">{r.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
            <Link href="/mengapa-kami" className="link-action mt-10">
              Selengkapnya: Mengapa Kami <ArrowRightIcon className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      {/* Executive Scannable Accordion FAQ */}
      <Section tone="mist" id="tanya-jawab">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              title="Pertanyaan yang sering diajukan"
              lead="Jawaban singkat untuk pertanyaan yang biasanya muncul dari arsiparis, auditor, dan tim TI sebelum sesi demo."
            />
            <Link href="/kontak" className="link-action mt-7">
              Tanyakan hal lain kepada tim kami <ArrowRightIcon className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="border-y border-border">
            <Accordion defaultValue={[faq[0].q]}>
              {faq.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-b border-border last:border-b-0">
                  <AccordionTrigger className="py-5 text-left font-heading text-[1.0625rem] leading-snug font-bold text-navy hover:text-brand hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[0.9375rem] leading-relaxed text-body">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
