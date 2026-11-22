export type ExperienceOrg = {
  id: string
  name: string
  sector: string
  logo: {
    src: string
    alt: string
    width: number
    height: number
    /** True when the logo artwork uses white lettering and needs a navy backing plate on white cards. */
    darkBacking?: boolean
  }
}

export type ExperienceDetail = {
  organization: string
  sector: string
  scope: string
}

export type ApproachPillar = {
  title: string
  subtitle: string
  text: string
}

/** Selected organizations and sectors from Smart_Records_Center_Selected_Experience.pptx. */
export const experienceOrgs: ExperienceOrg[] = [
  {
    id: "adb",
    name: "Asian Development Bank (ADB)",
    sector: "Pembangunan Internasional",
    logo: {
      src: "/images/experience/adb.png",
      alt: "Logo Asian Development Bank (ADB)",
      width: 140,
      height: 140,
    },
  },
  {
    id: "exxonmobil",
    name: "ExxonMobil Indonesia",
    sector: "Energi, Minyak & Gas",
    logo: {
      src: "/images/experience/exxonmobil.png",
      alt: "Logo ExxonMobil Indonesia",
      width: 306,
      height: 80,
    },
  },
  {
    id: "harbour-energy",
    name: "Harbour Energy Indonesia",
    sector: "Energi, Minyak & Gas",
    logo: {
      src: "/images/experience/harbour-energy.png",
      alt: "Logo Harbour Energy Indonesia",
      width: 245,
      height: 80,
      darkBacking: true,
    },
  },
  {
    id: "bp",
    name: "bp Indonesia",
    sector: "Energi, Minyak & Gas",
    logo: {
      src: "/images/experience/bp.jpg",
      alt: "Logo bp Indonesia",
      width: 90,
      height: 90,
    },
  },
  {
    id: "atma-jaya",
    name: "Universitas Katolik Indonesia Atma Jaya",
    sector: "Pendidikan Tinggi",
    logo: {
      src: "/images/experience/atma-jaya.jpg",
      alt: "Logo Universitas Katolik Indonesia Atma Jaya",
      width: 260,
      height: 99,
    },
  },
  {
    id: "hki",
    name: "PT HKI",
    sector: "Infrastruktur & Arsip Korporasi",
    logo: {
      src: "/images/experience/hki.png",
      alt: "Logo PT HKI",
      width: 213,
      height: 84,
    },
  },
  {
    id: "bki",
    name: "PT Biro Klasifikasi Indonesia (Persero)",
    sector: "Maritim & Klasifikasi",
    logo: {
      src: "/images/experience/bki.png",
      alt: "Logo PT Biro Klasifikasi Indonesia (Persero)",
      width: 138,
      height: 90,
      darkBacking: true,
    },
  },
]

/** Grouped scope of professional experience from OUR PORTFOLIO.docx. */
export const experienceDetails: ExperienceDetail[] = [
  {
    organization: "Asian Development Bank (ADB)",
    sector: "Lembaga Pembangunan Internasional",
    scope: "Pengelolaan rekod, pengendalian dokumen, dan tata kelola informasi pada lingkungan lembaga pembangunan internasional.",
  },
  {
    organization: "ExxonMobil Indonesia, Harbour Energy Indonesia & bp Indonesia",
    sector: "Industri Energi, Minyak & Gas",
    scope: "Mencakup pengelolaan dokumen dan arsip Subsurface (Eksplorasi, Sumur & Pengeboran) serta Surface (Rekayasa, Operasi & Pemeliharaan).",
  },
  {
    organization: "Universitas Katolik Indonesia Atma Jaya",
    sector: "Pendidikan Tinggi",
    scope: "Penataan arsip institusi, tata kelola kearsipan, dan pengelolaan pusat arsip (records center) di sektor pendidikan tinggi.",
  },
  {
    organization: "PT HKI",
    sector: "Infrastruktur & Arsip Korporasi",
    scope: "Pengendalian dokumen proyek infrastruktur, pengelolaan arsip korporasi, serta penataan siklus hidup dokumen perusahaan.",
  },
  {
    organization: "PT Biro Klasifikasi Indonesia (Persero)",
    sector: "Maritim, Klasifikasi & Tata Kelola Korporasi",
    scope: "Tata kelola kearsipan, pengelolaan dokumen klasifikasi maritim, serta dukungan kepatuhan dan akuntabilitas korporasi.",
  },
]

export const approachPillars: ApproachPillar[] = [
  {
    title: "Tata Kelola Lebih Dulu",
    subtitle: "Governance First",
    text: "Teknologi harus dibangun berdasarkan kebijakan, proses, klasifikasi, retensi, kewenangan, dan tanggung jawab yang jelas.",
  },
  {
    title: "Kepatuhan Sejak Rancangan",
    subtitle: "Compliance by Design",
    text: "Solusi dirancang dengan mempertimbangkan peraturan perundang-undangan, standar nasional dan internasional, serta kebutuhan audit dan akuntabilitas.",
  },
  {
    title: "Didukung Teknologi Terukur",
    subtitle: "Technology Enabled",
    text: "Kami memanfaatkan teknologi digital, otomasi, metadata, analitik, dan AI secara terukur untuk meningkatkan efektivitas pengelolaan informasi.",
  },
  {
    title: "Berorientasi Nilai Bisnis",
    subtitle: "Business Driven",
    text: "Manajemen rekod bukan sekadar aktivitas administratif. Informasi yang terkelola dengan baik mendukung keputusan bisnis, mitigasi risiko, efisiensi operasional, dan tata kelola perusahaan.",
  },
]

export const experienceDisclaimer =
  "Catatan: Organisasi yang disebutkan di atas merepresentasikan pengalaman profesional dan proyek terpilih dari anggota tim dan/atau penasihat (advisor) Smart Records Center. Ruang lingkup keterlibatan dan afiliasi organisasi dapat berbeda-beda."
