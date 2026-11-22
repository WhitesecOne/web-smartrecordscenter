import { faq } from "@/lib/faq"
import { modules, type Module } from "@/lib/modules"
import { approachPillars, experienceDetails, experienceDisclaimer } from "@/lib/portfolio"
import { references, sectors, site } from "@/lib/site"

const abs = (path: string) => new URL(path, site.url).href
const orgId = abs("/#organisasi")
const siteId = abs("/#situs")
const appId = abs("/#aplikasi")

/** Organization and WebSite knowledge graph, emitted once per page from the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.entity,
        alternateName: ["SRC", "Smart Records Center Indonesia"],
        url: abs("/"),
        logo: {
          "@type": "ImageObject",
          url: abs("/icon/512"),
          width: 512,
          height: 512,
        },
        email: site.email,
        telephone: site.phone,
        description: site.description,
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        knowsAbout: [
          "Tata Kelola Arsip Digital",
          "Records Management",
          "Information Governance",
          "Verifikasi dan Pemilahan Arsip",
          "Klasifikasi Arsip",
          "Jadwal Retensi Arsip (JRA)",
          "Penyusutan Arsip Digital",
          "Jejak Audit SHA-256",
          "UU No. 43 Tahun 2009 tentang Kearsipan",
          "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi",
          "ISO 15489",
          "ISO 23081",
          "ISO 15836 Dublin Core",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: site.addressParts.street,
          addressLocality: site.addressParts.locality,
          addressRegion: site.addressParts.region,
          postalCode: site.addressParts.postalCode,
          addressCountry: "ID",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: site.email,
            telephone: site.phone,
            areaServed: "ID",
            availableLanguage: ["id", "en"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: site.email,
            telephone: site.phone,
            areaServed: "ID",
            availableLanguage: ["id"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        name: site.name,
        alternateName: "SRC",
        url: abs("/"),
        description: site.description,
        inLanguage: "id-ID",
        publisher: { "@id": orgId },
      },
    ],
  }
}

/** Home page graph: SoftwareApplication, ordered 7-module ItemList, and FAQPage for SEO/AEO/GEO. */
export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": appId,
        name: site.name,
        url: abs("/"),
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Enterprise Records Management & Digital Information Governance",
        operatingSystem: "Web",
        inLanguage: "id-ID",
        description: site.description,
        featureList: modules.map((m, i) => `${i + 1}. ${m.name}: ${m.short}`),
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Instansi Pemerintah, BUMN & BUMD, Perbankan & Keuangan, Korporasi Teregulasi di Indonesia",
        },
        countryOfOrigin: {
          "@type": "Country",
          name: "Indonesia",
        },
        provider: { "@id": orgId },
        publisher: { "@id": orgId },
      },
      {
        "@type": "ItemList",
        name: "Tujuh Modul Smart Records Center",
        description: "Urutan tujuh modul tata kelola arsip digital Smart Records Center dari verifikasi hingga pelaporan kepatuhan.",
        numberOfItems: modules.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: modules.map((m, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: m.name,
          description: m.short,
          url: abs(`/modul/${m.slug}`),
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  }
}

/** Collection graph for /modul listing all 7 modules in canonical lifecycle order. */
export function modulesCollectionGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": abs("/modul") + "#halaman",
        url: abs("/modul"),
        name: "Modul Tata Kelola Arsip Digital",
        description: `Tujuh modul Smart Records Center: ${modules.map((m) => m.name).join(", ")}.`,
        inLanguage: "id-ID",
        isPartOf: { "@id": siteId },
        publisher: { "@id": orgId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: modules.length,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: modules.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: m.name,
            description: m.short,
            url: abs(`/modul/${m.slug}`),
          })),
        },
      },
    ],
  }
}

/** Detailed graph for /modul/[slug] describing each module's features and rules. */
export function moduleDetailGraph(m: Module) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": abs(`/modul/${m.slug}`) + "#halaman",
        url: abs(`/modul/${m.slug}`),
        name: `Modul ${m.name}`,
        description: m.metaDescription,
        inLanguage: "id-ID",
        isPartOf: { "@id": siteId },
        publisher: { "@id": orgId },
        about: {
          "@type": "SoftwareApplication",
          "@id": appId,
          name: `${site.name}: ${m.name}`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: m.lead,
          featureList: m.features.map((f) => `${f.name}: ${f.desc}`),
        },
      },
    ],
  }
}

/** HowTo structured data for /platform/cara-kerja explaining the 4-stage record lifecycle. */
export function howToLifecycleGraph() {
  const steps = [
    {
      name: "Dipilah, diklasifikasikan, dan disimpan",
      text: "Dokumen masuk melalui unggahan, email, pemindai, atau API. AI memilah dokumen arsip dari non-arsip, mengekstrak metadata dasar sesuai Dublin Core dan ISO 23081, lalu mengusulkan kode klasifikasi sebelum dikonfirmasi arsiparis dan disimpan ke repositori organisasi.",
    },
    {
      name: "Aktif",
      text: "Arsip digunakan oleh unit pengolah sehari-hari dan ditemukan kembali melalui pencarian teks lengkap serta metadata yang disaring hak akses. Setelah berkas ditutup, masa retensi aktif dihitung otomatis dari JRA.",
    },
    {
      name: "Inaktif",
      text: "Pada tanggal hasil hitungan mesin aturan, arsip berpindah ke pengelolaan unit kearsipan secara otomatis dengan status hanya baca dan izin peminjaman berbatas waktu.",
    },
    {
      name: "Permanen atau musnah",
      text: "Saat jatuh tempo retensi, arsip bernilai guna permanen disimpan di media write-once dan disiapkan paket penyerahannya, sementara arsip lain masuk batch usulan pemusnahan dengan persetujuan berjenjang dan berita acara digital.",
    },
  ]
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Siklus Hidup Tata Kelola Arsip Digital di Smart Records Center",
    description: "Empat tahap perjalanan satu arsip digital dari penerimaan dan pemilahan hingga nasib akhir permanen atau musnah dengan bukti audit berantai hash.",
    inLanguage: "id-ID",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

/** Collection graph for /industri covering the 4 regulated sectors. */
export function industryGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": abs("/industri") + "#halaman",
    url: abs("/industri"),
    name: "Solusi Tata Kelola Arsip per Industri",
    description: "Penerapan Smart Records Center untuk Instansi Pemerintah, BUMN & BUMD, Perbankan & Keuangan, serta Korporasi.",
    inLanguage: "id-ID",
    isPartOf: { "@id": siteId },
    publisher: { "@id": orgId },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sectors.length,
      itemListElement: sectors.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.label,
        description: s.desc,
        url: abs(s.href),
      })),
    },
  }
}

/** Collection graph for /portofolio capturing Selected Professional Experience & Approach Pillars. */
export function portfolioGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": abs("/portofolio") + "#halaman",
    url: abs("/portofolio"),
    name: "Portofolio & Pengalaman Profesional Smart Records Center",
    description: `Pengalaman profesional terpilih tim dan penasihat Smart Records Center lintas sektor teregulasi. ${experienceDisclaimer}`,
    inLanguage: "id-ID",
    isPartOf: { "@id": siteId },
    publisher: { "@id": orgId },
    about: approachPillars.map((p) => ({
      "@type": "Thing",
      name: `${p.title} (${p.subtitle})`,
      description: p.text,
    })),
    mentions: experienceDetails.map((e) => ({
      "@type": "Organization",
      name: e.organization,
      description: `${e.sector}: ${e.scope}`,
    })),
    citation: references.map((r) => `${r.code} ${r.name}`),
  }
}

/** BreadcrumbList mirroring the visible page breadcrumb: Beranda first, current page last. */
export function breadcrumbGraph(crumbs: { href?: string; label: string }[], current?: string) {
  const items = [{ label: "Beranda", href: "/" }, ...crumbs]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: abs(c.href) } : current ? { item: abs(current) } : {}),
    })),
  }
}

/** Typed WebPage/ContactPage/AboutPage graph linked to Organization and WebSite. */
export function pageGraph(type: "WebPage" | "ContactPage" | "AboutPage", path: string, name: string, description: string, about?: object) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": abs(path) + "#halaman",
    url: abs(path),
    name,
    description,
    inLanguage: "id-ID",
    isPartOf: { "@id": siteId },
    publisher: { "@id": orgId },
    ...(about ? { about } : {}),
  }
}
