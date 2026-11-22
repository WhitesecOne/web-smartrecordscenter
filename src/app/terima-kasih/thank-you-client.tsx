"use client"

import { ArrowRightIcon, CheckCircle2Icon, MailIcon } from "lucide-react"
import Link from "next/link"
import { useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

type Draft = { name?: string; organization?: string; sector?: string; mailto?: string }

const subscribe = () => () => {}

function readDraftRaw(): string | null {
  try {
    return sessionStorage.getItem("src-demo-draft")
  } catch {
    return null
  }
}

export function ThankYouClient() {
  const raw = useSyncExternalStore(subscribe, readDraftRaw, () => null)
  let draft: Draft | null = null
  if (raw) {
    try {
      draft = JSON.parse(raw) as Draft
    } catch {
      draft = null
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="inline-flex size-12 items-center justify-center rounded-xl bg-teal-wash text-teal-ink">
        <CheckCircle2Icon className="size-6" aria-hidden />
      </div>
      <h1 className="display mt-6 text-[clamp(2rem,4vw,3rem)] text-navy">
        Terima kasih{draft?.name ? `, ${draft.name}` : ""}. Permintaan demo Anda telah disiapkan.
      </h1>
      <p className="lead mt-5 text-body">
        {draft?.organization
          ? `Draf email permintaan demo untuk ${draft.organization} (${draft.sector ?? "Organisasi"}) sudah diarahkan ke aplikasi email Anda.`
          : `Draf email permintaan demo Anda sudah diarahkan ke ${site.email}.`}{" "}
        Jika aplikasi email belum terbuka otomatis, gunakan tombol di bawah atau kirim langsung ke{" "}
        <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">
          {site.email}
        </a>
        .
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {draft?.mailto && (
          <Button size="lg" render={<a href={draft.mailto} />} nativeButton={false} className="gap-2">
            <MailIcon className="size-4" aria-hidden />
            Buka ulang draf email
          </Button>
        )}
        <Button size="lg" variant="outline" render={<Link href="/portofolio" />} nativeButton={false} className="gap-2">
          Lihat Portofolio
          <ArrowRightIcon className="size-4" aria-hidden />
        </Button>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-lg font-bold text-navy">Tahap selanjutnya</h2>
        <ol className="mt-4 grid gap-4 text-[0.9375rem] sm:grid-cols-3">
          <li className="border-t-2 border-navy pt-3">
            <p className="font-semibold text-navy">1. Konfirmasi jadwal</p>
            <p className="mt-1 text-body">Tim kami menanggapi email Anda dan menyepakati waktu sesi demo.</p>
          </li>
          <li className="border-t-2 border-navy pt-3">
            <p className="font-semibold text-navy">2. Penyesuaian skenario</p>
            <p className="mt-1 text-body">Kami siapkan contoh alur pemilahan, klasifikasi, dan JRA sesuai sektor Anda.</p>
          </li>
          <li className="border-t-2 border-navy pt-3">
            <p className="font-semibold text-navy">3. Demonstrasi langsung</p>
            <p className="mt-1 text-body">Sesi tanya jawab bersama tim arsiparis dan TI Anda.</p>
          </li>
        </ol>
      </div>
    </div>
  )
}
