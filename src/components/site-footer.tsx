import Link from "next/link"

import { OpenCookieSettings } from "@/components/cookie-consent"
import { Logo } from "@/components/logo"
import { modules } from "@/lib/modules"
import { companyNav, legalNav, platformNav, references, sectors, site } from "@/lib/site"

const linkCls = "inline-flex min-h-8 items-center text-[0.9rem] text-white/75 transition-colors hover:text-white hover:underline"

export function SiteFooter() {
  const cols = [
    { title: "Modul", links: modules.map((m) => ({ href: `/modul/${m.slug}`, label: m.name })) },
    { title: "Platform", links: platformNav },
    { title: "Industri", links: sectors },
    { title: "Perusahaan", links: [{ href: "/portofolio", label: "Portofolio" }, ...companyNav, { href: "/kontak", label: "Kontak" }] },
  ]
  return (
    <footer className="relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:py-20">
        <div className="flex flex-col gap-6">
          <Logo inverse />
          <p className="max-w-sm text-[0.9rem] leading-relaxed text-white/75">{site.description}</p>
          <dl className="grid gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[13.5px]">
            {[
              ["Alamat", site.address, undefined],
              ["Email", site.email, `mailto:${site.email}`],
              ["Telepon", site.phone, `tel:${site.phone.replace(/[^\d+]/g, "")}`],
            ].map(([k, v, href]) => (
              <div key={k} className="grid grid-cols-[4.75rem_1fr] gap-2">
                <dt className="text-white/55">{k}</dt>
                <dd className="leading-relaxed text-white/90">
                  {href ? (
                    <a href={href} className="hover:text-white hover:underline">
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="mb-3.5 text-xs font-semibold tracking-wider text-brand-soft uppercase">{c.title}</p>
              <ul className="flex flex-col gap-0.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Regulatory & standards reference bar */}
      <div className="border-t border-white/10 bg-white/[0.02]">
        <div className="container-page flex flex-col gap-3 py-5 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-2">
            {references.map((r) => (
              <li key={r.code} className="inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-white/[0.04] px-2.5 py-1 text-xs">
                <span className="font-semibold text-white">{r.code}</span>
                <span className="hidden text-white/60 sm:inline">{r.name}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/60">Referensi rancangan, bukan klaim sertifikasi.</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-[13.5px] text-white/65 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.entity}. Hak cipta dilindungi.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <OpenCookieSettings className={linkCls} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
