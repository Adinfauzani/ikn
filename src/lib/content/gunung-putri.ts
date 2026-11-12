export type SourceRef = {
  label: string;
  url: string;
  note?: string;
  accessed?: string;
};

export const gunungPutriSources: SourceRef[] = [
  {
    label: "Kecamatan Gunung Putri, Kabupaten Bogor — Tentang Kami",
    url: "https://kecamatangunungputri.bogorkab.go.id/tentang-kami",
    note: "Profil umum kecamatan, daftar desa, dan komitmen pelayanan (PATEN).",
    accessed: "2026-11-12",
  },
  {
    label: "Kecamatan Gunung Putri, Kabupaten Bogor — Kontak",
    url: "https://kecamatangunungputri.bogorkab.go.id/contact",
    note: "Alamat kantor, email, telepon, dan jam kerja.",
    accessed: "2026-11-12",
  },
  {
    label: "PPID Kabupaten Bogor — Alamat Kantor Kecamatan Gunung Putri dan Kontak",
    url: "https://ppid.bogorkab.go.id/index.php?d=33537&page_title=Alamat_Kantor_Kecamatan_Gunung_Putri_dan_Kontak",
    note: "Informasi kontak perkantoran kecamatan.",
    accessed: "2026-11-12",
  },
  {
    label: "BPS Kabupaten Bogor — Kecamatan Gunung Putri Dalam Angka 2025",
    url: "https://bogorkab.bps.go.id/id/publication/2025/09/26/22356ef59bd60856df195243/kecamatan-gunung-putri-dalam-angka-2025.html",
    note: "Publikasi statistik tahunan (rilis 26 September 2025, Katalog 1102001.3201190). Angka rinci tersedia pada publikasi resmi.",
    accessed: "2026-11-12",
  },
  {
    label: "Google (tautan referensi awal yang diberikan)",
    url: "https://share.google/7QE0zxllfqaNmP4Qp",
    note: "Tautan awal untuk penelusuran; tautan berbagi Google dapat memerlukan akses/JavaScript dan tidak menampilkan detail sumber secara langsung dalam konteks ini.",
    accessed: "2026-11-12",
  },
];

export const gunungPutriProfile = {
  name: "Gunung Putri",
  level: "Kecamatan",
  regency: "Kabupaten Bogor",
  province: "Provinsi Jawa Barat",
  villages: [
    "Gunung Putri",
    "Wanaherang",
    "Tlajung Udik",
    "Bojong Nangka",
    "Cicadas",
    "Bojong Kulur",
    "Ciangsana",
    "Cikeas Udik",
    "Nagrak",
    "Karanggan",
  ],
  office: {
    address: "Jalan Barokah No. 5, Wanaherang, Kode Pos 16965",
    phone: "(021) 8672122 / 082333898977",
    email: "kecgunungputri@bogorkab.go.id",
    hours: "Senin–Jumat, 08:00–16:00",
  },
};

export const gunungPutriSections = {
  overview: [
    "Kecamatan Gunung Putri merupakan salah satu wilayah di Kabupaten Bogor, Provinsi Jawa Barat. Berdasarkan informasi resmi Pemerintah Kecamatan, wilayah ini berada di kawasan timur Kabupaten Bogor dan berbatasan dengan wilayah sekitar termasuk Kota Bekasi, Kota Depok, serta DKI Jakarta.",
    "Kecamatan Gunung Putri membawahi 10 desa. Informasi resmi kecamatan menggambarkan wilayah ini sebagai kawasan yang berkembang dengan aktivitas permukiman, perdagangan, jasa, dan kegiatan ekonomi lainnya; rincian angka dan indikator sektoral tersedia melalui publikasi statistik resmi.",
  ],
  profile: [
    "Wilayah administratif: Kecamatan Gunung Putri, Kabupaten Bogor, Provinsi Jawa Barat, terdiri atas 10 desa.",
    "Gambaran umum, kondisi geografis terperinci, dan karakteristik wilayah: informasi ringkas tersedia pada laman resmi kecamatan; data terukur (luas wilayah, kepadatan, jarak, dan rincian geografis) disajikan dalam publikasi BPS Kecamatan Gunung Putri Dalam Angka.",
    "Informasi administratif lebih rinci (batas wilayah detail, peta resmi, dan data monografi lengkap): Belum tersedia dalam ringkasan ini — rujuk sumber resmi yang tercantum.",
  ],
  infrastructure: [
    "Infrastruktur jalan, transportasi dan aksesibilitas, pendidikan, kesehatan, fasilitas umum, serta sarana dan prasarana masyarakat: data rinci dan terverifikasi per sektor disajikan dalam publikasi statistik resmi (BPS) dan/atau informasi resmi perangkat daerah terkait.",
    "Rincian jumlah fasilitas, kondisi, dan program spesifik yang belum dikonfirmasi dari sumber yang dapat diatribusikan pada ringkasan ini: Belum tersedia.",
  ],
  development: [
    "Program pembangunan, perkembangan kawasan, penataan lingkungan, infrastruktur publik, program pemerintah daerah, dan inovasi pelayanan masyarakat: informasi umum mengenai komitmen pelayanan (termasuk pelayanan administrasi terpadu dan pemanfaatan layanan digital) disebutkan dalam profil resmi kecamatan; rincian program, tanggal, dan institusi penanggung jawab perlu dirujuk ke pengumuman/dokumen resmi terkait.",
    "Capaian dan indikator pembangunan spesifik tanpa rujukan yang dapat diverifikasi: Belum tersedia.",
  ],
  potential: [
    "Potensi ekonomi, UMKM, aktivitas perdagangan, industri dan kawasan usaha, serta kegiatan masyarakat: profil resmi menggambarkan dinamika aktivitas ekonomi dan permukiman di wilayah ini; angka dan rincian sektor ekonomi tersedia pada publikasi BPS dan sumber resmi lainnya.",
    "Data kuantitatif potensi dan ekonomi lokal yang tidak tercantum pada sumber terverifikasi: Belum tersedia.",
  ],
  environment: [
    "Kondisi lingkungan, pengelolaan sampah, ruang terbuka hijau, kebersihan, penghijauan, dan program keberlanjutan: informasi rinci dan terukur perlu mengacu pada data/program resmi instansi terkait dan publikasi statistik.",
    "Program dan capaian lingkungan spesifik tanpa sumber yang dapat diatribusikan: Belum tersedia.",
  ],
};
