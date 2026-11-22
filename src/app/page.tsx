import { ArrowRightIcon, CheckIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react"
import * as motion from "motion/react-client"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { ExperienceGrid, ExperienceStrip } from "@/components/experience-grid"
import { JsonLd } from "@/components/json-ld"
import { LifecycleTimeline } from "@/components/lifecycle"
import { ExtractionMock } from "@/components/product/extraction"
import { HeroWorkspace } from "@/components/product/hero-workspace"
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
    step: "01",
    problem: "Dokumen arsip dan non-arsip tercampur di folder bersama dan email.",
    answer: "Pemilahan otomatis memisahkan dokumen bernilai guna dari non-arsip sejak pintu masuk, lalu menyimpannya ke repositori terstruktur per organisasi.",
    module: "verifikasi-pemilahan-arsip",
  },
  {
    step: "02",
    problem: "Arsip yang diminta pimpinan atau auditor sulit ditemukan.",
    answer: "Pencarian teks lengkap, OCR pindaian, dan filter metadata menemukan arsip dalam hitungan detik, selalu disaring hak akses pengguna.",
    module: "pencarian-temu-kembali",
  },
  {
    step: "03",
    problem: "Retensi dan penyusutan dihitung manual dan sering terlambat.",
    answer: "Mesin aturan menghitung tanggal pindah inaktif dan jatuh tempo dari JRA, lalu menyusun batch usulan penyusutan dengan persetujuan berjenjang.",
    module: "retensi-penyusutan",
  },
  {
    step: "04",
    problem: "Kepatuhan sulit dibuktikan saat pemeriksaan internal atau regulator.",
    answer: "Jejak audit berantai hash yang tidak dapat diubah, ditambah dasbor kepatuhan yang setiap angkanya dapat ditelusuri hingga ke arsipnya.",
    module: "jejak-audit",
  },
]

const controls = [
  { title: "Log append-only berantai hash", desc: "Setiap entri mengait ke hash sebelumnya sehingga perubahan langsung terdeteksi." },
  { title: "Isolasi multi-organisasi", desc: "Ruang data, pengguna, aturan, dan kunci enkripsi terpisah sepenuhnya per organisasi." },
  { title: "Kontrol akses berlapis", desc: "Hak baca dan unduh ditentukan peran, unit kerja, serta tingkat kerahasiaan arsip." },
  { title: "Enkripsi transit & simpan", desc: "TLS 1.3 saat transit dan enkripsi berkas per arsip dengan kunci di KMS atau HSM." },
  { title: "Media write-once permanen", desc: "Arsip bernilai guna permanen dan checkpoint log disimpan di media tidak dapat diubah." },
  { title: "Legal hold & pemisahan tugas", desc: "Arsip dalam perkara otomatis dikecualikan; pengusul dan penyetuju penyusutan berbeda." },
]

const reasons = [
  {
    num: "01",
    title: "Alur kearsipan Indonesia sejak awal",
    text: "Verifikasi pemilahan, klasifikasi arsip, JRA, penyusutan, dan berita acara menjadi inti sistem, bukan kolom tambahan di aplikasi dokumen umum.",
  },
  {
    num: "02",
    title: "Metadata standar yang dapat dipertukarkan",
    text: "Skema mengikuti Dublin Core yang diperluas dan prinsip ISO 23081, sehingga arsip tetap terbaca oleh sistem maupun pemeriksa lain.",
  },
  {
    num: "03",
    title: "AI dengan kendali arsiparis",
    text: "Setiap usulan AI menampilkan sumber dan skor keyakinannya, lalu menunggu konfirmasi arsiparis sebelum berlaku.",
  },
  {
    num: "04",
    title: "Bukti audit yang dapat diverifikasi mandiri",
    text: "Auditor memeriksa keutuhan jejak audit dan paket bukti secara mandiri dengan SHA-256, tanpa bergantung pada pernyataan vendor.",
  },
]

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />

      {/* Precision Daylight Architectural Hero (Stripe x Vanta x RecordPoint register) */}
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden
          className="bg-grid-light pointer-events-none absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]"
        />
        <div aria-hidden className="hero-glow-light pointer-events-none absolute inset-0 -z-10" />

        <div className="container-page grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:pt-16 lg:pb-20">
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.75, ease }}>
            <div className="inline-flex items-center gap-2 rounded-md border border-brand/20 bg-brand-wash px-3 py-1 text-xs font-semibold text-brand-ink">
              <span aria-hidden className="size-1.5 rounded-[2px] bg-brand" />
              Platform Tata Kelola Arsip Digital · 7 Modul Terpadu
            </div>

            <h1 className="display mt-6 text-[clamp(2.4rem,4.5vw,3.65rem)] text-navy">
              Tata kelola arsip digital yang tertib, patuh, dan siap diaudit.
            </h1>

            <p className="lead mt-5 max-w-[54ch] text-body">
              Smart Records Center memilah, mengklasifikasikan, menyimpan, mencari, meretensi, dan menyusutkan arsip digital organisasi Anda dalam satu platform. Setiap tindakan
              tercatat di jejak audit yang tidak dapat diubah, dan setiap usulan AI ditinjau arsiparis sebelum berlaku.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-primary-cta>
              <Button size="lg" render={<Link href="/kontak" />} nativeButton={false} className="gap-2">
                Minta Demo
                <ArrowRightIcon className="size-4" aria-hidden />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="#modul" />} nativeButton={false}>
                Jelajahi 7 Modul
              </Button>
            </div>

            <div className="mt-9 border-t border-border pt-5">
              <p className="text-[12.5px] font-medium text-muted-foreground">Dirancang mengacu pada regulasi &amp; standar kearsipan (referensi rancangan):</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {references.map((r) => (
                  <li key={r.code} className="code rounded-md border border-border bg-mist/90 px-2 py-0.5 text-[11.5px] font-medium text-navy">
                    {r.code}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.85, ease, delay: 0.08 }} className="min-w-0">
            <HeroWorkspace />
          </motion.div>
        </div>
      </section>

      {/* Immediate Enterprise Credibility Strip: Selected Experience */}
      <ExperienceStrip />

      {/* 7-Module Quick Architecture Index Bar */}
      <nav aria-label="Tujuh modul" className="border-b border-border bg-white">
        <div className="container-page py-5">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {modules.map((m, idx) => (
              <li key={m.slug}>
                <Link
                  href={`/modul/${m.slug}`}
                  className="group flex h-full flex-col justify-between gap-2.5 rounded-lg border border-border/80 bg-mist/40 p-3.5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white hover:shadow-card"
                >
                  <span className="flex items-center justify-between gap-2">
                    <m.icon className="size-4.5 text-brand" aria-hidden />
                    <span className="code text-[11px] font-semibold text-muted-foreground">{String(idx + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="text-[13px] leading-snug font-semibold text-navy group-hover:text-brand">{m.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Governance Challenges -> Solutions Bento Grid */}
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

        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {challenges.map((c) => {
            const m = modules.find((x) => x.slug === c.module)!
            return (
              <li
                key={c.problem}
                className="group flex flex-col justify-between rounded-xl border border-border bg-white p-6 shadow-card transition-all hover:border-brand/35 hover:shadow-product lg:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="code inline-flex h-6 items-center rounded-md border border-border bg-mist px-2 text-xs font-semibold text-navy">
                      Tantangan {c.step}
                    </span>
                    <m.icon className="size-5 text-brand" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-heading text-xl leading-snug font-bold text-navy">{c.problem}</h3>
                  <p className="mt-3 flex gap-2.5 text-[0.9375rem] leading-relaxed text-body">
                    <CheckIcon className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                    {c.answer}
                  </p>
                </div>
                <div className="mt-6 border-t border-border pt-4">
                  <Link href={`/modul/${m.slug}`} className="link-action text-sm">
                    Pelajari modul {m.name} <ArrowRightIcon className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </li>
            )
          })}
        </ol>
      </Section>

      {/* Signature Interactive 7-Module Explorer */}
      <Section tone="mist" id="modul" className="relative scroll-mt-24">
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
          <TabsList variant="line" className="w-full shrink-0 items-stretch gap-1.5 lg:w-[23rem]">
            {modules.map((m, idx) => (
              <TabsTrigger
                key={m.slug}
                value={m.slug}
                className="group/tab h-auto items-start gap-3.5 rounded-xl border border-transparent px-3.5 py-3 text-left whitespace-normal text-body transition-all after:hidden hover:bg-white/75 data-active:border-brand/30 data-active:bg-white data-active:shadow-card"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-navy ring-1 ring-border transition-colors group-data-active/tab:bg-brand group-data-active/tab:text-white group-data-active/tab:ring-brand [&_svg]:size-[1.125rem]!">
                  <m.icon aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[0.95rem] font-bold text-navy group-data-active/tab:text-brand">{m.name}</span>
                    <span className="code text-[11px] font-semibold text-muted-foreground">{String(idx + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="text-[13px] leading-snug font-normal text-muted-foreground">{m.short}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((m) => (
            <TabsContent key={m.slug} value={m.slug} className="min-w-0 animate-in text-base duration-400 fade-in-0 slide-in-from-bottom-2">
              <div className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-7">
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-8">
                  <div>
                    <h3 className="h3 text-2xl">{m.title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{m.lead}</p>
                  </div>
                  <div className="flex flex-col justify-between gap-4 rounded-xl border border-brand/20 bg-brand-wash/75 p-4">
                    <p className="text-[0.9rem] leading-relaxed text-navy">
                      <span className="mb-1 inline-flex items-center gap-1.5 font-semibold text-brand-ink">
                        <SparklesIcon className="size-3.5" aria-hidden />
                        Peran AI di modul ini
                      </span>
                      <span className="block">{m.ai}</span>
                    </p>
                    <Link href={`/modul/${m.slug}`} className="link-action text-sm">
                      Pelajari modul {m.name} <ArrowRightIcon className="size-4" aria-hidden />
                    </Link>
                  </div>
                </div>
                <div className="mt-7">
                  <ProductMock k={m.heroMock} />
                </div>
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

      {/* AI Under Human Control + 7-Module AI Bento Matrix */}
      <Section tone="mist" id="ai">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading
              title="AI di setiap modul. Keputusan tetap di tangan arsiparis."
              lead="Model membaca dokumen, memilah, mengusulkan, dan menandai. Setiap usulan menampilkan sumber dan skor keyakinannya, lalu menunggu konfirmasi sebelum berlaku."
            />
            <ul className="mt-8 grid gap-3">
              {[
                { head: "Konfirmasi manusia wajib", desc: "Usulan AI tidak berlaku otomatis sebelum ditinjau arsiparis berwenang." },
                { head: "Ambang batas keyakinan 0,90", desc: "Setiap skor di bawah 0,90 otomatis ditandai perlu review prioritas." },
                { head: "Tercatat utuh di jejak audit", desc: "Model, versi, skor keyakinan, sumber teks, dan peninjau tersimpan permanen." },
              ].map((item) => (
                <li key={item.head} className="flex gap-3 rounded-xl border border-border bg-white p-4 shadow-card">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  <div>
                    <p className="text-sm font-bold text-navy">{item.head}</p>
                    <p className="mt-0.5 text-[13.5px] leading-relaxed text-body">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <ExtractionMock />
          </Reveal>
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-heading text-xl font-bold text-navy">Peran AI di ketujuh modul</h3>
            <Link href="/modul#perbandingan" className="link-action text-sm">
              Lihat tabel perbandingan lengkap <ArrowRightIcon className="size-3.5" aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, idx) => (
              <li
                key={m.slug}
                className="flex flex-col justify-between rounded-xl border border-border bg-white p-5 shadow-card transition hover:border-brand/35"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex size-8 items-center justify-center rounded-md bg-brand-wash text-brand">
                      <m.icon className="size-4" aria-hidden />
                    </span>
                    <span className="code text-xs font-semibold text-muted-foreground">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <Link href={`/modul/${m.slug}`} className="mt-3 block font-heading text-base font-bold text-navy hover:text-brand hover:underline">
                    {m.name}
                  </Link>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-body">{m.ai}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Deep Navy Security & Live SHA-256 Audit Chain Verifier */}
      <section id="keamanan" className="relative isolate overflow-hidden bg-navy py-20 text-white lg:py-28">
        <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-20 opacity-80" />
        <div aria-hidden className="hero-glow-dark pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              inverse
              title="Jejak audit yang dapat Anda periksa sendiri"
              lead="Setiap entri log menyimpan hash entri sebelumnya. Ubah satu baris di bawah ini, dan lihat rantai SHA-256 putus tepat di baris tersebut."
            />
            <Link href="/platform/keamanan" className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-soft hover:text-white hover:underline">
              Keamanan &amp; kepatuhan <ArrowRightIcon className="size-4" aria-hidden />
            </Link>
          </div>

          <ul className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {controls.map((c) => (
              <li key={c.title} className="rounded-xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur-xs">
                <p className="flex items-center gap-2 font-heading text-[0.95rem] font-bold text-white">
                  <ShieldCheckIcon className="size-4 shrink-0 text-brand-soft" aria-hidden />
                  {c.title}
                </p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/75">{c.desc}</p>
              </li>
            ))}
          </ul>

          <Reveal className="mt-10">
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

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <li key={s.id}>
              <Link
                href={s.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-product"
              >
                <span className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy/55 to-transparent" />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-heading text-lg font-bold text-navy group-hover:text-brand">{s.label}</span>
                  <span className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-body">{s.desc}</span>
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

      {/* Why Smart Records Center + Standards Reference Card */}
      <Section id="mengapa">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading title="Dibangun untuk cara kerja kearsipan di Indonesia" />
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-mist/50">
              <p className="border-b border-border bg-white px-5 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Acuan regulasi &amp; standar internasional
              </p>
              <ul className="divide-y divide-border bg-white">
                {references.map((r) => (
                  <li key={r.code} className="flex items-baseline gap-4 px-5 py-3.5">
                    <span className="code w-28 shrink-0 text-sm font-semibold text-navy">{r.code}</span>
                    <span className="text-[0.9rem] text-body">{r.name}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-border px-5 py-2.5 text-[12.5px] text-muted-foreground">Acuan rancangan sistem, bukan klaim sertifikasi.</p>
            </div>
          </div>

          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {reasons.map((r) => (
                <div key={r.title} className="rounded-xl border border-border bg-white p-6 shadow-card">
                  <span className="code text-xs font-semibold text-brand">{r.num}</span>
                  <h3 className="mt-2 font-heading text-lg font-bold text-navy">{r.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-body">{r.text}</p>
                </div>
              ))}
            </div>
            <Link href="/mengapa-kami" className="link-action mt-8">
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
          <div className="overflow-hidden rounded-xl border border-border bg-white px-6 shadow-card">
            <Accordion defaultValue={[faq[0].q]}>
              {faq.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-b border-border last:border-b-0">
                  <AccordionTrigger className="py-5 text-left font-heading text-[1.05rem] leading-snug font-bold text-navy hover:text-brand hover:no-underline">
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
