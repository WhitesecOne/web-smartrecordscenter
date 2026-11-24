import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { experienceDisclaimer, experienceOrgs } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

/**
 * Selected professional experience logo grid (from Smart_Records_Center_Selected_Experience.pptx).
 * Laid out 4-over-4 on desktop so all eight organizations balance cleanly without an orphan gap.
 */
export function ExperienceGrid({ className, showDisclaimer = true }: { className?: string; showDisclaimer?: boolean }) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap justify-center gap-4">
        {experienceOrgs.map((org) => (
          <li
            key={org.id}
            className="flex w-[calc(50%-0.5rem)] flex-col items-center justify-between rounded-xl border border-border bg-white px-4 py-6 text-center shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-product sm:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)] lg:px-5"
          >
            <div className="flex h-16 w-full items-center justify-center">
              {org.logo.darkBacking ? (
                <span className="inline-flex items-center justify-center rounded-md bg-navy px-3.5 py-2">
                  <Image
                    src={org.logo.src}
                    alt={org.logo.alt}
                    width={org.logo.width}
                    height={org.logo.height}
                    className="max-h-10 w-auto max-w-[128px] object-contain"
                  />
                </span>
              ) : (
                <Image
                  src={org.logo.src}
                  alt={org.logo.alt}
                  width={org.logo.width}
                  height={org.logo.height}
                  className={cn("w-auto max-w-[148px] object-contain", org.id === "anri" ? "max-h-14" : org.id === "adb" || org.id === "bp" ? "max-h-12" : "max-h-11")}
                />
              )}
            </div>
            <div className="mt-4">
              <p className="text-[13.5px] leading-snug font-semibold text-navy">{org.name}</p>
              <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{org.sector}</p>
            </div>
          </li>
        ))}
      </ul>
      {showDisclaimer && <p className="mt-6 max-w-[82ch] text-[13px] leading-relaxed text-muted-foreground">{experienceDisclaimer}</p>}
    </div>
  )
}

/** Compact enterprise trust strip directly under the homepage hero. */
export function ExperienceStrip() {
  return (
    <div className="border-y border-border bg-mist/70">
      <div className="container-page py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="shrink-0">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Pengalaman profesional terpilih tim &amp; penasihat</p>
            <Link href="/portofolio" className="link-action mt-1 text-sm">
              Lihat detail portofolio <ArrowRightIcon className="size-3.5" aria-hidden />
            </Link>
          </div>
          <ul aria-label="Organisasi pengalaman terpilih" className="flex flex-wrap items-center gap-3 sm:gap-4 lg:justify-end">
            {experienceOrgs.map((org) => (
              <li
                key={org.id}
                title={`${org.name} · ${org.sector}`}
                className="flex h-11 items-center justify-center rounded-lg border border-border bg-white px-3 shadow-[0_1px_2px_rgb(8_27_54/0.04)]"
              >
                {org.logo.darkBacking ? (
                  <span className="inline-flex items-center justify-center rounded bg-navy px-2 py-1">
                    <Image
                      src={org.logo.src}
                      alt={org.logo.alt}
                      width={org.logo.width}
                      height={org.logo.height}
                      className="max-h-5 w-auto max-w-[84px] object-contain"
                    />
                  </span>
                ) : (
                  <Image
                    src={org.logo.src}
                    alt={org.logo.alt}
                    width={org.logo.width}
                    height={org.logo.height}
                    className="max-h-6 w-auto max-w-[92px] object-contain"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
