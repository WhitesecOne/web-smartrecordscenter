import { faq } from "@/lib/faq"
import { modules } from "@/lib/modules"
import { approachPillars, experienceDetails, experienceDisclaimer } from "@/lib/portfolio"
import { companyNav, legalNav, platformNav, references, sectors, site } from "@/lib/site"

export const dynamic = "force-static"

const abs = (path: string) => new URL(path, site.url).href

const lifecycleSummary = [
  "1. Diterima & Dipilah: Dokumen masuk lewat unggahan, email, pemindai, atau API. AI memilah dokumen arsip dari non-arsip (karantina tanpa hapus otomatis), memvalidasi metadata wajib (Dublin Core & ISO 23081), dan mengusulkan kode klasifikasi untuk dikonfirmasi arsiparis.",
  "2. Aktif: Arsip dipakai unit pengolah sehari-hari dan dicari dengan pencarian teks lengkap, OCR, dan filter metadata yang disaring hak akses. Setelah berkas ditutup, masa retensi aktif dihitung otomatis dari JRA.",
  "3. Inaktif: Pada tanggal hasil hitungan mesin aturan, arsip berpindah ke unit kearsipan secara otomatis dengan status hanya baca dan izin peminjaman berbatas waktu.",
  "4. Permanen atau Musnah: Sesuai nasib akhir di JRA, arsip permanen disimpan pada media write-once dan disiapkan paket penyerahannya; arsip lain masuk batch usulan pemusnahan dengan pemisahan tugas pengusul-penyetuju, pengecekan legal hold & arsip vital, eksekusi kriptografis, dan berita acara digital ber-hash SHA-256.",
]

const securityControls = [
  "Jejak audit append-only berantai hash SHA-256 (dapat diuji langsung di browser pada situs)",
  "Pemisahan data dan kunci enkripsi per organisasi (multi-tenant isolation, rancangan)",
  "Kontrol akses berlapis menurut peran, unit kerja, dan tingkat keamanan: Biasa, Terbatas, Rahasia, Sangat Rahasia (rancangan)",
  "Pemisahan tugas (segregation of duties): pengusul batch penyusutan tidak dapat menyetujui batchnya sendiri (rancangan)",
  "Enkripsi saat transit (TLS 1.3) dan enkripsi saat disimpan per arsip dengan KMS/HSM organisasi (rancangan)",
  "Media write-once (WORM) untuk arsip bernilai guna permanen dan checkpoint log audit bertanda tangan (rancangan)",
  "Legal hold otomatis membekukan arsip terkait perkara dari semua usulan penyusutan (rancangan)",
  "Pemusnahan kriptografis dengan penyimpanan hash berkas sebagai bukti permanen (rancangan)",
]

const aiSafetyRules = [
  "Isi dokumen diperlakukan sebagai data, bukan instruksi (prompt-injection resistant); model tidak dapat memicu aksi sendiri.",
  "Keluaran kode klasifikasi divalidasi agar hanya memilih kode yang aktif di skema klasifikasi organisasi.",
  "Usulan AI dengan keyakinan di bawah 0,90 otomatis ditandai wajib review arsiparis.",
  "AI tidak pernah memutuskan pemusnahan, memasang/mencabut legal hold, atau menurunkan tingkat keamanan arsip.",
  "Data organisasi tidak dipakai untuk melatih model AI tanpa persetujuan tertulis.",
]

const glossary = [
  ["Klasifikasi Arsip", "Kode hierarkis berdasarkan fungsi, kegiatan, dan transaksi organisasi yang menjadi alamat tetap arsip serta membawa aturan retensi dan tingkat keamanannya."],
  ["Jadwal Retensi Arsip (JRA)", "Aturan baku organisasi yang menentukan masa simpan aktif, masa simpan inaktif, dan nasib akhir (permanen, musnah, atau dinilai kembali)."],
  ["Verifikasi & Pemilahan Arsip", "Proses memisahkan dokumen bernilai guna sebagai arsip dari dokumen non-arsip (draf sementara, notifikasi sistem, salinan berulang) sebelum masuk repositori final."],
  ["Penyusutan Arsip", "Kegiatan pengurangan jumlah arsip melalui pemindahan arsip inaktif, pemusnahan arsip yang tidak bernilai guna, atau penyerahan arsip statis/permanen."],
  ["Berita Acara Digital", "Dokumen bukti resmi pelaksanaan penyusutan yang memuat daftar arsip, pejabat penyetuju, waktu pelaksanaan, dan hash SHA-256 setiap berkas."],
  ["Legal Hold", "Pembekuan sementara jadwal penyusutan atas arsip yang terkait perkara hukum, sengketa, atau pemeriksaan aktif."],
  ["Arsip Vital", "Arsip yang keberadaannya merupakan persyaratan dasar bagi kelangsungan operasional organisasi dan tidak pernah dimasukkan ke usulan pemusnahan."],
]

/**
 * /llms-full.txt: Complete machine-readable technical, governance, and commercial compendium built from live site data.
 */
export function GET() {
  const body = [
    `# ${site.name}: Dokumentasi Lengkap`,
    "",
    `> ${site.description}`,
    "",
    `Ringkasan singkat (llms.txt): ${abs("/llms.txt")}`,
    `Peta situs XML: ${abs("/sitemap.xml")}`,
    "Bahasa situs: Indonesia. Layar produk interaktif di situs memakai data contoh, bukan data pelanggan nyata.",
    "",
    "## 1. Identitas & Kontak Resmi",
    `- Nama platform: ${site.name}`,
    `- Entitas penyelenggara: ${site.entity}`,
    `- Alamat kantor: ${site.address}`,
    `- Email resmi & keamanan: ${site.email}`,
    `- Telepon: ${site.phone}`,
    `- Permintaan demo: ${abs("/kontak")}`,
    `- Opsi penerapan (ditetapkan bersama organisasi): Cloud, On-Premise (dengan HSM organisasi), atau Hibrida.`,
    "",
    "## 2. Posisi & Filosofi Produk",
    '"Digitalisasi dokumen tanpa tata kelola yang baik hanya akan memindahkan masalah dari lemari arsip ke server."',
    "Smart Records Center menyatukan tata kelola kearsipan (governance) dan otomasi AI dalam satu jalur yang sama: aturan klasifikasi, JRA, hak akses, dan penyusutan ditegakkan otomatis pada setiap arsip, dan setiap keputusan manusia maupun usulan AI tercatat sebagai bukti audit yang dapat diverifikasi.",
    "",
    "### Empat Pilar Pendekatan",
    ...approachPillars.map((p) => `- **${p.title} (${p.subtitle})**: ${p.text}`),
    "",
    "## 3. Tujuh Modul Smart Records Center (Urutan Resmi)",
    ...modules.flatMap((m, i) => [
      "",
      `### ${i + 1}. ${m.name}`,
      `- URL kanonis: ${abs(`/modul/${m.slug}`)}`,
      `- Ringkasan: ${m.short}`,
      `- Judul halaman: ${m.title}`,
      `- Penjelasan: ${m.lead}`,
      `- Peran AI (dengan konfirmasi arsiparis): ${m.ai}`,
      "",
      "#### Fitur Utama",
      ...m.features.flatMap((f) => [
        `- **${f.name}**${f.ai ? " *(dibantu AI, ditinjau arsiparis)*" : ""}: ${f.desc}`,
        ...f.points.map((p) => `  - ${p}`),
      ]),
      "",
      "#### Aturan yang Ditegakkan & Bukti Audit",
      ...m.rules.map((r) => `- ${r.part}: ${r.does}. Aturan: ${r.rule}. Bukti: ${r.evidence}.`),
    ]),
    "",
    "## 4. Siklus Hidup Arsip (4 Tahap)",
    ...lifecycleSummary,
    `Detail lengkap: ${abs("/platform/cara-kerja")}`,
    "",
    "## 5. Arsitektur, Keamanan & Batasan AI",
    "### Kontrol Keamanan",
    ...securityControls.map((c) => `- ${c}`),
    "",
    "### Batasan Keamanan AI",
    ...aiSafetyRules.map((r) => `- ${r}`),
    `Detail arsitektur: ${abs("/platform/arsitektur")} | Keamanan & Kepatuhan: ${abs("/platform/keamanan")}`,
    "",
    "## 6. Perbedaan dari Folder Bersama & DMS Umum",
    "- Folder bersama / proses manual: arsip dan non-arsip tercampur, pencarian lambat per folder, retensi dihitung manual di spreadsheet, tidak ada jejak audit terpusat.",
    "- Aplikasi dokumen umum (DMS): fokus berbagi berkas, klasifikasi dan JRA memerlukan kustomisasi berat, log aktivitas biasa mudah diubah admin, tidak dirancang khusus untuk berita acara penyusutan Indonesia.",
    "- Smart Records Center: bawaan (native) untuk pemilahan arsip vs non-arsip, skema Dublin Core & ISO 23081, klasifikasi berversi, mesin aturan JRA, legal hold, penyusutan berjenjang dengan berita acara digital, log append-only SHA-256, dan AI dengan kendali arsiparis.",
    `Tabel perbandingan lengkap: ${abs("/mengapa-kami")}`,
    "",
    "## 7. Solusi per Sektor Teregulasi",
    ...sectors.map((s) => `- **${s.label}** (${abs(s.href)}): ${s.desc}`),
    "",
    "## 8. Portofolio & Pengalaman Profesional Terpilih",
    `Halaman lengkap: ${abs("/portofolio")}`,
    ...experienceDetails.map((e) => `- **${e.organization}** (${e.sector}): ${e.scope}`),
    `> ${experienceDisclaimer}`,
    "",
    "## 9. Acuan Regulasi & Standar Internasional (Referensi Rancangan, Bukan Klaim Sertifikasi)",
    ...references.map((r) => `- ${r.code}: ${r.name}`),
    "- ISO 16175: Kebutuhan fungsional sistem pengelolaan arsip digital",
    "- ISO/IEC 27001: Kerangka kontrol keamanan informasi",
    "",
    "## 10. Glosarium Istilah Kearsipan Indonesia",
    ...glossary.map(([term, def]) => `- **${term}**: ${def}`),
    "",
    "## 11. Daftar Halaman Utama & Legal",
    ...[...platformNav, ...companyNav, ...legalNav].map((l) => `- [${l.label}](${abs(l.href)})${l.desc ? `: ${l.desc}` : ""}`),
    "",
    "## 12. Tanya Jawab Lengkap (FAQ)",
    ...faq.flatMap((f) => ["", `### ${f.q}`, f.a]),
    "",
  ].join("\n")

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
