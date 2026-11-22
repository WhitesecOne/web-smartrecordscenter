"use client"

import { ArrowRightIcon, CheckIcon, MenuIcon, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { Logo } from "@/components/logo"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { companyNav, platformNav, sectors } from "@/lib/site"
import { cn } from "@/lib/utils"

/** Slim module entry; the icon arrives already rendered so the client bundle never carries module copy. */
export type NavModule = { href: string; name: string; short: string; icon: React.ReactNode }

const trigger = cn(
  navigationMenuTriggerStyle(),
  "relative h-[4.5rem] rounded-none bg-transparent px-3 text-[0.9375rem] font-semibold text-navy hover:bg-transparent hover:text-brand focus:bg-transparent data-popup-open:bg-transparent data-popup-open:text-brand data-open:bg-transparent",
  "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand after:opacity-0 after:transition-opacity data-[active=true]:text-brand data-[active=true]:after:opacity-100",
)

export function HeaderNav({ modules }: { modules: NavModule[] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const is = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  const inCompany = companyNav.some((l) => is(l.href))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white/92 backdrop-blur-md transition-shadow",
        scrolled && "shadow-[0_8px_24px_-14px_rgb(8_27_54/0.25)]",
      )}
    >
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-navy focus:px-3 focus:py-2 focus:text-white"
      >
        Lompat ke konten
      </a>

      {/* Architectural top utility bar */}
      <div className="hidden bg-navy text-[12.5px] text-white/75 md:block">
        <div className="container-page flex h-9 items-center justify-between">
          <p className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-[2px] bg-brand-soft" />
            Platform tata kelola arsip digital untuk organisasi teregulasi di Indonesia
          </p>
          <nav aria-label="Tautan cepat" className="flex items-center gap-6">
            <Link href="/portofolio" className="transition-colors hover:text-white hover:underline">
              Portofolio
            </Link>
            <Link href="/platform/keamanan" className="transition-colors hover:text-white hover:underline">
              Keamanan &amp; Kepatuhan
            </Link>
            <Link href="/kontak#kontak-langsung" className="transition-colors hover:text-white hover:underline">
              Hubungi kami
            </Link>
          </nav>
        </div>
      </div>

      {/* Main precision navigation bar */}
      <div className="border-b border-border/90">
        <div ref={barRef} className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link href="/" className="flex min-h-11 items-center" aria-label="Smart Records Center, beranda">
            <Logo />
          </Link>

          <NavigationMenu className="hidden self-stretch lg:flex" aria-label="Menu utama" anchor={barRef} align="center" sideOffset={1}>
            <NavigationMenuList className="h-full">
              <NavigationMenuItem>
                <NavigationMenuTrigger className={trigger} data-active={is("/modul")}>
                  Modul
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <Panel
                    items={modules.map((m, idx) => ({
                      href: m.href,
                      label: m.name,
                      desc: m.short,
                      badge: String(idx + 1).padStart(2, "0"),
                      lead: <IconTile>{m.icon}</IconTile>,
                    }))}
                    footer={{ href: "/modul", label: "Bandingkan ketujuh modul" }}
                    side={
                      <Feature
                        photo={{ src: "/images/server-racks.webp", alt: "Rak server berisi perangkat penyimpanan dan jaringan" }}
                        title="Satu sumber data untuk tujuh modul"
                        text="Setiap modul bekerja pada arsip, aturan, dan jejak audit yang sama. AI di setiap modul hanya mengusulkan; arsiparis yang menetapkan."
                        href="/platform/cara-kerja"
                        cta="Lihat cara kerjanya"
                      />
                    }
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={trigger} data-active={is("/platform")}>
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <Panel
                    items={platformNav.map((l) => ({ href: l.href, label: l.label, desc: l.desc ?? "" }))}
                    side={
                      <Feature
                        title="Periksa jejak audit sendiri"
                        text="Ubah satu entri log contoh, lalu lihat rantai hash putus tepat di entri itu."
                        href="/platform/keamanan#coba-verifikasi"
                        cta="Coba verifikasi"
                      >
                        <ol className="code flex flex-col gap-1 rounded-md border border-border bg-white p-2.5 text-[11px] text-muted-foreground">
                          <li className="flex justify-between gap-2">
                            <span className="text-navy">8 hold.dipasang</span>
                            <span>a7bf02…</span>
                          </li>
                          <li className="flex justify-between gap-2">
                            <span className="text-navy">9 penyusutan.usulan</span>
                            <span>dcf840…</span>
                          </li>
                          <li className="flex justify-between gap-2">
                            <span className="text-navy">10 bukti.ekspor</span>
                            <span>1e0192…</span>
                          </li>
                          <li className="mt-1 flex items-center gap-1 border-t border-border pt-1.5 font-sans font-semibold text-teal-ink">
                            <CheckIcon className="size-3" aria-hidden /> Rantai SHA-256 utuh
                          </li>
                        </ol>
                      </Feature>
                    }
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={trigger} data-active={is("/industri")}>
                  Industri
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <Panel
                    items={sectors.map((s) => ({
                      href: s.href,
                      label: s.label,
                      desc: s.desc ?? "",
                      lead: (
                        <span className="relative block size-14 shrink-0 overflow-hidden rounded-md bg-mist ring-1 ring-border">
                          <Image src={s.photo.src} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                      ),
                    }))}
                    footer={{ href: "/industri", label: "Semua industri" }}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/portofolio" />} aria-current={is("/portofolio") ? "page" : undefined} data-active={is("/portofolio")} className={trigger}>
                  Portofolio
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={trigger} data-active={inCompany}>
                  Perusahaan
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <Panel narrow items={companyNav.map((l) => ({ href: l.href, label: l.label, desc: l.desc ?? "" }))} />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/kontak" />} aria-current={is("/kontak") ? "page" : undefined} data-active={is("/kontak")} className={trigger}>
                  Kontak
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <Button render={<Link href="/kontak" />} nativeButton={false} className="hidden gap-1.5 sm:inline-flex">
              Minta Demo
              <ArrowRightIcon className="size-3.5 transition-transform group-hover/button:translate-x-0.5" aria-hidden />
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Buka menu" />}>
                <MenuIcon aria-hidden />
              </SheetTrigger>
              <SheetContent side="right" showCloseButton={false} className="w-full gap-0 p-0 sm:max-w-sm">
                <div className="flex h-16 items-center justify-between border-b border-border px-4">
                  <SheetTitle className="text-base font-semibold text-navy">Menu</SheetTitle>
                  <SheetClose render={<Button variant="ghost" size="icon" aria-label="Tutup menu" />}>
                    <XIcon aria-hidden />
                  </SheetClose>
                </div>
                <nav aria-label="Menu seluler" className="flex-1 overflow-y-auto px-4" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
                  <Accordion>
                    <MobileGroup title="Modul" links={[...modules.map((m) => ({ href: m.href, label: m.name, icon: m.icon })), { href: "/modul", label: "Semua modul" }]} />
                    <MobileGroup title="Platform" links={platformNav} />
                    <MobileGroup title="Industri" links={[...sectors, { href: "/industri", label: "Semua industri" }]} />
                    <MobileGroup title="Perusahaan" links={companyNav} />
                  </Accordion>
                  <Link href="/portofolio" className="flex min-h-12 items-center border-b border-border text-base font-semibold text-navy">
                    Portofolio
                  </Link>
                  <Link href="/kontak" className="flex min-h-12 items-center border-b border-border text-base font-semibold text-navy">
                    Kontak
                  </Link>
                </nav>
                <div className="border-t border-border p-4">
                  <Button size="lg" className="w-full" render={<Link href="/kontak" onClick={() => setOpen(false)} />} nativeButton={false}>
                    Minta Demo
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border/80 bg-mist text-navy transition-colors group-hover/item:border-brand/25 group-hover/item:bg-brand-wash group-hover/item:text-brand [&_svg]:size-5">
      {children}
    </span>
  )
}

function MobileGroup({ title, links }: { title: string; links: { href: string; label: string; icon?: React.ReactNode }[] }) {
  return (
    <AccordionItem value={title} className="border-b border-border">
      <AccordionTrigger className="min-h-12 items-center py-3 text-base font-semibold text-navy hover:no-underline">{title}</AccordionTrigger>
      <AccordionContent className="[&_a]:no-underline">
        <ul className="flex flex-col pb-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="flex min-h-11 items-center gap-3 rounded-md px-3 text-[0.9375rem] text-body hover:bg-mist hover:text-navy [&_svg]:size-4 [&_svg]:text-muted-foreground">
                {l.icon}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

type PanelItem = { href: string; label: string; desc: string; lead?: React.ReactNode; badge?: string }

function Panel({ items, side, footer, narrow }: { items: PanelItem[]; side?: React.ReactNode; footer?: { href: string; label: string }; narrow?: boolean }) {
  return (
    <div className={cn("grid max-w-[calc(100vw-2rem)] gap-2 p-2", narrow ? "w-[36rem]" : side ? "w-[62rem] grid-cols-[minmax(0,1fr)_17.5rem]" : "w-[52rem]")}>
      <div className="flex flex-col">
        <ul className="grid grid-cols-2 content-start gap-1">
          {items.map((i) => (
            <li key={i.href}>
              <NavigationMenuLink
                render={<Link href={i.href} />}
                className="group/item h-full flex-row items-start justify-start gap-3 rounded-lg p-3 transition-colors hover:bg-mist focus:bg-mist data-active:bg-transparent"
              >
                {i.lead}
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-navy group-hover/item:text-brand">
                    {i.badge && <span className="code text-[11px] font-medium text-muted-foreground">{i.badge}</span>}
                    {i.label}
                  </span>
                  <span className="text-[12.5px] leading-snug text-muted-foreground">{i.desc}</span>
                </span>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
        {footer && (
          <NavigationMenuLink
            render={<Link href={footer.href} />}
            className="mx-1 mt-1 flex-row items-center justify-between gap-2 rounded-none border-t border-border px-2 pt-3 pb-2 text-sm font-semibold text-brand hover:bg-transparent hover:underline focus:bg-transparent"
          >
            {footer.label}
            <ArrowRightIcon className="size-4" aria-hidden />
          </NavigationMenuLink>
        )}
      </div>
      {side && <div className="flex flex-col overflow-hidden rounded-lg border border-border/80 bg-mist">{side}</div>}
    </div>
  )
}

function Feature({
  title,
  text,
  href,
  cta,
  photo,
  children,
}: {
  title: string
  text: string
  href: string
  cta: string
  photo?: { src: string; alt: string }
  children?: React.ReactNode
}) {
  return (
    <>
      {photo && (
        <span className="relative block h-32 shrink-0">
          <Image src={photo.src} alt={photo.alt} fill sizes="280px" className="object-cover" />
        </span>
      )}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-semibold text-navy">{title}</p>
        <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{text}</p>
        {children && <div className="mt-3">{children}</div>}
        <NavigationMenuLink
          render={<Link href={href} />}
          className="mt-auto flex-row items-center gap-1 rounded-none p-0 pt-4 text-sm font-semibold text-brand hover:bg-transparent hover:underline focus:bg-transparent"
        >
          {cta} <ArrowRightIcon className="size-3.5" aria-hidden />
        </NavigationMenuLink>
      </div>
    </>
  )
}
