import Image from "next/image"

import { experienceDisclaimer, experienceOrgs } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

/**
 * Selected professional experience logo grid (from Smart_Records_Center_Selected_Experience.pptx).
 * Laid out 4-over-3 on desktop so all seven organizations balance cleanly without an orphan gap.
 */
export function ExperienceGrid({ className, showDisclaimer = true }: { className?: string; showDisclaimer?: boolean }) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap justify-center gap-4">
        {experienceOrgs.map((org) => (
          <li
            key={org.id}
            className="flex w-[calc(50%-0.5rem)] flex-col items-center justify-between rounded-xl border border-border bg-white px-4 py-6 text-center sm:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)] lg:px-5"
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
                  className={cn("max-h-12 w-auto max-w-[148px] object-contain", org.id === "adb" || org.id === "bp" ? "max-h-12" : "max-h-11")}
                />
              )}
            </div>
            <div className="mt-4">
              <p className="text-[13.5px] leading-snug font-semibold text-navy">{org.name}</p>
              <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">{org.sector}</p>
            </div>
          </li>
        ))}
      </ul>
      {showDisclaimer && <p className="mt-6 max-w-[78ch] text-[13px] leading-relaxed text-muted-foreground">{experienceDisclaimer}</p>}
    </div>
  )
}
