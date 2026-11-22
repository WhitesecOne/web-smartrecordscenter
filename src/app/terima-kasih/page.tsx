import type { Metadata } from "next"

import { Breadcrumb } from "@/components/section"

import { ThankYouClient } from "./thank-you-client"

export const metadata: Metadata = {
  title: "Terima Kasih",
  description: "Konfirmasi permintaan demo Smart Records Center dan langkah selanjutnya.",
  robots: { index: false, follow: false },
}

export default function TerimaKasihPage() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-white py-16 lg:py-24">
      <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]" />
      <div className="container-page">
        <Breadcrumb items={[{ href: "/kontak", label: "Kontak" }, { label: "Terima Kasih" }]} />
        <div className="mt-8">
          <ThankYouClient />
        </div>
      </div>
    </section>
  )
}
