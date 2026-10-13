import { KSPDocument, EducationLevel } from '../types/ksp';

export const initialKspData: KSPDocument = {
  identity: {
    name: 'SMP Semen Tonasa II',
    npsn: '40310352',
    curriculumName: 'KURIKULUM GEOSMART',
    curriculumSubtitle: 'Berbasis Pembelajaran Mendalam (Deep Learning) & Kearifan Karst Geopark',
    status: 'Swasta',
    educationType: 'Formal',
    ownership: 'PT Semen Tonasa / Yayasan Kesejahteraan Semen Tonasa (YKST)',
    skEstablishment: '367/kpst/YKST/12-2022',
    skEstablishmentDate: '29 Desember 2022',
    skOperational: '006/OP.SMP-SWASTA/Disdikbud/V/2024',
    skOperationalDate: '16 Mei 2024',
    principalName: 'Nuraeni, S.Pd.',
    principalNip: '19790514 200501 2 008',
    address: 'Jl. Ketilang No. 2 Kompleks Perumahan PT Semen Tonasa',
    village: 'Desa Biring Ere',
    district: 'Kecamatan Bungoro',
    regency: 'Kabupaten Pangkajene dan Kepulauan',
    province: 'Provinsi Sulawesi Selatan',
    postalCode: '90651',
    website: 'https://smpsementonasa2.sch.id',
    email: 'smp_tonasa2@yahoo.co.id',
    phone: '(0410) 323214',
    academicYear: '2025/2026',
    level: 'SMP'
  },
  cover: {
    theme: 'geosmart-emerald',
    title: 'DOKUMEN KURIKULUM SATUAN PENDIDIKAN',
    curriculumBrand: 'KURIKULUM GEOSMART',
    schoolName: 'SMP SEMEN TONASA II',
    regencyInfo: 'KAB. PANGKAJENE DAN KEPULAUAN',
    academicYear: 'Tahun Ajaran 2025/2026',
    npsn: 'NPSN : 40310352',
    showLogo: true,
    showMinistryLogo: true,
    coverImage: 'geopark'
  },
  endorsement: {
    city: 'Biring Ere',
    date: '15 Juli 2025',
    schoolName: 'SMP Semen Tonasa II',
    academicYear: '2025/2026',
    statementText: 'Setelah dilakukan serangkaian kegiatan analisis karakteristik, refleksi berbasis Rapor Pendidikan, evaluasi, perencanaan, dan lokakarya penyusunan Kurikulum Satuan Pendidikan yang melibatkan kepala sekolah, wakil kepala sekolah, dewan pendidik, tenaga kependidikan, pengawas sekolah, dan komite sekolah, maka Kurikulum SMP Semen Tonasa II secara resmi ditetapkan untuk diberlakukan dan dijalankan pada Tahun Ajaran 2025/2026.',
    principalName: 'Nuraeni, S.Pd.',
    principalNip: '19790514 200501 2 008',
    showCommitteeSignature: true,
    committeeName: 'Ir. H. Muhammad Ilyas, M.T.',
    showSupervisorSignature: true,
    supervisorName: 'Kartini, S.Pd., M.Pd.',
    supervisorNip: '19680312 199303 2 004'
  },
  team: {
    advisors: [
      { id: 'adv-1', name: 'Nurul Haq, S.Pi.', role: 'Pengarah / Pelindung', affiliationOrSubject: 'Kepala Dinas Pendidikan Kab. Pangkep' },
      { id: 'adv-2', name: 'Dr. Laksmi Dewi, M.Pd.', role: 'Narasumber Ahli', affiliationOrSubject: 'Kepala Pusat Kurikulum dan Pembelajaran BSKAP' }
    ],
    draftingTeam: [
      { id: 'tm-1', name: 'Nuraeni, S.Pd.', role: 'Ketua / Penanggung Jawab', affiliationOrSubject: 'Kepala SMP Semen Tonasa II' },
      { id: 'tm-2', name: 'Ramlah, S.Ag.', role: 'Wakil Ketua / Koordinator Teknis', affiliationOrSubject: 'Wakasek Bidang Kurikulum' },
      { id: 'tm-3', name: 'Basri Muhiddin, S.Pd.', role: 'Anggota Tim Pengembang', affiliationOrSubject: 'Wakasek Bidang Kesiswaan / PJOK' },
      { id: 'tm-4', name: 'Hj. Ajeng Triani, S.Pd., M.Pd.', role: 'Anggota Tim Pengembang', affiliationOrSubject: 'Wakasek Sarpras / Bahasa Indonesia' },
      { id: 'tm-5', name: 'Syamsul Bahri, S.Si.', role: 'Anggota Tim Pengembang', affiliationOrSubject: 'Guru Matematika' },
      { id: 'tm-6', name: 'Andi Reski Wahyuni, S.Pd.', role: 'Anggota Tim Pengembang', affiliationOrSubject: 'Guru IPA' },
      { id: 'tm-7', name: 'Jumirah, S.Pd.', role: 'Anggota Tim Pengembang', affiliationOrSubject: 'Guru IPS' },
      { id: 'tm-8', name: 'Nurlina, S.S.', role: 'Anggota Tim Pengembang', affiliationOrSubject: 'Guru Bahasa Inggris' },
      { id: 'tm-9', name: 'Christina, S.Pd.', role: 'Anggota Tim Pengembang', affiliationOrSubject: 'Guru Seni Budaya' },
      { id: 'tm-10', name: 'Abdillah Natsir, S.Pd.', role: 'Anggota Tim Pengembang', affiliationOrSubject: 'Guru Seni Budaya / Pembina OSIS' },
      { id: 'tm-11', name: 'Rismawati, S.E.', role: 'Sekretariat Dokumen', affiliationOrSubject: 'Kepala Tata Usaha' }
    ],
    reviewers: [
      { id: 'rev-1', name: 'Kartini, S.Pd., M.Pd.', role: 'Penelaah Utama', affiliationOrSubject: 'Pengawas SMP Dinas Pendidikan Kab. Pangkep' },
      { id: 'rev-2', name: 'Dr. Yogi Anggraena, M.Si.', role: 'Penelaah Kurikulum', affiliationOrSubject: 'Pusat Kurikulum dan Pembelajaran' },
      { id: 'rev-3', name: 'Ir. H. Muhammad Ilyas, M.T.', role: 'Penelaah Komite', affiliationOrSubject: 'Ketua Komite SMP Semen Tonasa II' }
    ]
  },
  foreword: {
    paragraphs: [
      'Puji syukur kami panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas limpahan rahmat, taufik, dan hidayah-Nya sehingga penyusunan Dokumen Kurikulum Satuan Pendidikan (KSP) SMP Semen Tonasa II Tahun Ajaran 2025/2026 dapat diselesaikan dengan baik. Dokumen kurikulum ini merupakan hasil ikhtiar bersama yang dirumuskan secara partisipatif dan kolaboratif oleh kepala sekolah, tim pengembang kurikulum, dewan guru, tenaga kependidikan, komite sekolah, serta mendapatkan pendampingan intensif dari pengawas sekolah dan dinas pendidikan.',
      'Pengembangan Kurikulum Satuan Pendidikan ini disusun dengan berlandaskan pada regulasi terbaru, yakni Permendikdasmen Nomor 13 Tahun 2025 tentang Perubahan Atas Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 12 Tahun 2024 tentang Kurikulum pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah, serta Permendikdasmen Nomor 10 Tahun 2025 tentang Standar Kompetensi Lulusan (SKL).',
      'Kurikulum ini mengusung kekhasan keunggulan lokal melalui branding "GeoSmart" yang mengintegrasikan pembelajaran kontekstual kawasan UNESCO Global Geopark Maros-Pangkep. Pendekatan utama yang diterapkan adalah Pembelajaran Mendalam (Deep Learning) yang berorientasi pada penciptaan iklim belajar yang berkesadaran (mindful), bermakna (meaningful), dan menggembirakan (joyful), guna mengokohkan pencapaian 8 (delapan) Dimensi Profil Lulusan: (1) Keimanan dan Ketakwaan kepada Tuhan YME, (2) Kewargaan, (3) Penalaran Kritis, (4) Kreativitas, (5) Kolaborasi, (6) Kemandirian, (7) Kesehatan, dan (8) Komunikasi.',
      'Dokumen ini diharapkan menjadi panduan operasional bagi seluruh pendidik dan tenaga kependidikan dalam mengelola proses intrakurikuler, kokurikuler, ekstrakurikuler, serta evaluasi berbasis data (PBD) secara berkelanjutan. Kami menyampaikan apresiasi setinggi-tingginya kepada seluruh pihak yang telah mencurahkan pikiran, waktu, dan dedikasi dalam penyempurnaan dokumen ini. Semoga dokumen KSP ini membawa maslahat bagi pemajuan peradaban dan mutu generasi emas penerus bangsa.'
    ],
    signingDate: '15 Juli 2025',
    signingPlace: 'Biring Ere',
    signatoryTitle: 'Kepala SMP Semen Tonasa II',
    signatoryName: 'Nuraeni, S.Pd.'
  },
  chapter1: {
    profileDescription: [
      'SMP Semen Tonasa II beralamat di Jalan Ketilang No. 2 Kompleks Perumahan PT Semen Tonasa, Desa Biring Ere, Kecamatan Bungoro, Kabupaten Pangkajene dan Kepulauan, Provinsi Sulawesi Selatan. Secara geografis, satuan pendidikan ini menempati wilayah strategis yang berdampingan langsung dengan lanskap perbukitan karst Maros-Pangkep, permukiman karyawan Semen Tonasa, sarana ibadah terpadu Masjid Raya Tonasa, instalasi pengolahan limbah industri hijau, serta Taman Keanekaragaman Hayati (Kehati) dan Taman Edukasi Semen Tonasa.',
      'Keberadaan bentang alam karst yang telah ditetapkan sebagai UNESCO Global Geopark Maros-Pangkep menempatkan sekolah pada posisi ekologis istimewa. Kondisi ini dimanfaatkan secara optimal oleh pihak sekolah sebagai laboratorium alam terbuka (living laboratory) untuk pembelajaran kontekstual berbasis konservasi, geologi, biosfer, dan arkeologi prasejarah (situs Sumpang Bita).',
      'Berdasarkan hasil Rapor Pendidikan tahun 2025, SMP Semen Tonasa II telah memperoleh capaian predikat "Baik" (Kategori Hijau) untuk indikator Kemampuan Literasi, Kemampuan Numerasi, Karakter, Kualitas Pembelajaran, serta Iklim Keamanan dan Kebinekaan Sekolah. Komitmen Perencanaan Berbasis Data (PBD) senantiasa dijadikan kompas penentu prioritas program peningkatan mutu secara berkesinambungan (continuous improvement).'
    ],
    socioEconomicCulture: [
      'Masyarakat sekitar sekolah memiliki latar belakang sosial ekonomi yang majemuk. Sebagian besar orang tua/wali murid merupakan karyawan PT Semen Tonasa, petani ladang tadah hujan, nelayan darat, pedagang lokal, serta Aparatur Sipil Negara (ASN). Hubungan kemitraan antara pihak sekolah, orang tua, dan masyarakat terjalin harmonis dengan tingkat partisipasi komite yang tinggi.',
      'Dalam ranah sosiokultural, lingkungan sekolah mengakar kuat pada kearifan lokal suku Bugis-Makassar, berlandaskan falsafah luhur: Sipakatau (saling memanusiakan dan menghargai harkat martabat sesama), Sipakainge’ (saling mengingatkan dalam kebaikan dan kebenaran), serta Sipakalebbi’ (saling memuliakan tanpa membeda-bedakan status sosial). Nilai-nilai budaya ini selaras dengan 8 Dimensi Profil Lulusan dan menjadi landasan kokoh dalam pengembangan budaya positif di sekolah.'
    ],
    localWisdom: [
      'Pelestarian kearifan lokal karst (kawasan batu gamping purba, gua prasejarah, mata air bawah tanah, fauna endemik kupu-kupu Bantimurung, serta flora langka pegunungan karst).',
      'Pemanfaatan Bahasa Daerah Bugis sebagai mata pelajaran muatan lokal resmi kabupaten serta pelestarian seni tari tradisional, sastra tutur kelong, dan adat istiadat setempat yang berkesadaran lingkungan.'
    ],
    ptkSummary: 'SMP Semen Tonasa II memiliki 26 orang pendidik dan tenaga kependidikan dengan kualifikasi pendidikan 100% sarjana (S1) dan magister (S2). Sebagian besar pendidik telah bersertifikat pendidik profesional, menguasai integrasi teknologi pembelajaran (LMS/Google Workspace for Education), serta telah menyelesaikan pelatihan Pembelajaran Mendalam (Deep Learning).',
    ptkList: [
      { id: 'ptk-1', name: 'Nuraeni, S.Pd.', qualification: 'S1 Pend. Matematika (UNM)', position: 'Kepala Sekolah', subject: 'Matematika', employmentStatus: 'Guru Tetap Yayasan (GTY)' },
      { id: 'ptk-2', name: 'Ramlah, S.Ag.', qualification: 'S1 Pend. Agama Islam (STAI DDI)', position: 'Wakasek Kurikulum', subject: 'Pendidikan Agama Islam', employmentStatus: 'GTY' },
      { id: 'ptk-3', name: 'Basri Muhiddin, S.Pd.', qualification: 'S1 Pend. Olahraga (IKIP Ujung Pandang)', position: 'Wakasek Kesiswaan', subject: 'PJOK', employmentStatus: 'GTY' },
      { id: 'ptk-4', name: 'Hj. Ajeng Triani, S.Pd., M.Pd.', qualification: 'S2 Pend. Bahasa Indonesia (UNISMUH)', position: 'Wakasek Sarpras', subject: 'Bahasa Indonesia', employmentStatus: 'GTY' },
      { id: 'ptk-5', name: 'Sarnah, S.Pd.', qualification: 'S1 PPKn (UVRI Makassar)', position: 'Bendahara Sekolah', subject: 'Pendidikan Pancasila', employmentStatus: 'GTY' },
      { id: 'ptk-6', name: 'Andi Reski Wahyuni, S.Pd.', qualification: 'S1 Pend. Fisika (UNM)', position: 'Guru Mapel / Pembina Olimpiade', subject: 'IPA Terpadu', employmentStatus: 'GTY' },
      { id: 'ptk-7', name: 'Nur Ungki Sari, S.Pd.', qualification: 'S1 Pend. Fisika (UNM)', position: 'Operator Sekolah / Guru Mapel', subject: 'IPA Terpadu', employmentStatus: 'GTY' },
      { id: 'ptk-8', name: 'Syamsul Bahri, S.Si.', qualification: 'S1 Matematika MIPA (UNM)', position: 'Guru Mapel / Pembina Taekwondo', subject: 'Matematika', employmentStatus: 'GTY' },
      { id: 'ptk-9', name: 'Henny Puspita Syarifuddin, S.Pd.', qualification: 'S1 Pend. Matematika (UIN Alauddin)', position: 'Guru Mapel', subject: 'Matematika', employmentStatus: 'GTY' },
      { id: 'ptk-10', name: 'Jumirah, S.Pd.', qualification: 'S1 Pend. Sosiologi (UNM)', position: 'Guru Mapel / Pembina KSN IPS', subject: 'IPS Terpadu', employmentStatus: 'GTY' },
      { id: 'ptk-11', name: 'Nurlina, S.S.', qualification: 'S1 Sastra Inggris (UIM Makassar)', position: 'Kepala Lab IPA / Guru Mapel', subject: 'Bahasa Inggris', employmentStatus: 'GTY' },
      { id: 'ptk-12', name: 'Rahmatiah, S.Pd.I.', qualification: 'S1 Pend. Bhs. Inggris (STAIN Parepare)', position: 'Koordinator LMS / Guru Mapel', subject: 'Bahasa Inggris', employmentStatus: 'GTY' },
      { id: 'ptk-13', name: 'Christina, S.Pd.', qualification: 'S1 Sendratasik (UNM)', position: 'Kepala Perpustakaan / Pembina Seni', subject: 'Seni Budaya', employmentStatus: 'GTY' },
      { id: 'ptk-14', name: 'Abdillah Natsir, S.Pd.', qualification: 'S1 Seni Rupa (UNM)', position: 'Pengelola Lab Komputer / Pembina Pramuka', subject: 'Seni Budaya & Informatika', employmentStatus: 'GTY' },
      { id: 'ptk-15', name: 'Syamsul, S.Pd.', qualification: 'S1 Pend. Bahasa Daerah (UNM)', position: 'Guru Mapel', subject: 'Muatan Lokal Bahasa Bugis', employmentStatus: 'GTY' },
      { id: 'ptk-16', name: 'Amar Ma’ruf Ahmad, S.Hum.', qualification: 'S1 Sejarah & Kebudayaan Islam (UIN)', position: 'Guru Mapel / Pembina PMR', subject: 'Pendidikan Agama Islam', employmentStatus: 'GTY' },
      { id: 'ptk-17', name: 'Hirosima, S.Pd.', qualification: 'S1 Bimbingan Konseling (STKIP)', position: 'Guru BK', subject: 'Bimbingan Konseling', employmentStatus: 'GTY' },
      { id: 'ptk-18', name: 'Rismawati, S.E.', qualification: 'S1 Ekonomi Manajemen', position: 'Kepala Tata Usaha / Pengelola GSE', subject: 'Administrasi Sekolah', employmentStatus: 'Pegawai Tetap Yayasan (PTY)' }
    ],
    studentSummary: 'Total peserta didik terdaftar pada Tahun Ajaran 2025/2026 adalah 311 siswa yang terbagi dalam 11 rombongan belajar (rombel) dengan sebaran 142 laki-laki dan 169 perempuan.',
    studentCohorts: [
      { id: 'sc-1', cohortName: 'Kelas VII (Fase D Awal)', rombelCount: 4, maleCount: 63, femaleCount: 61, totalCount: 124 },
      { id: 'sc-2', cohortName: 'Kelas VIII (Fase D Lanjutan)', rombelCount: 3, maleCount: 39, femaleCount: 39, totalCount: 78 },
      { id: 'sc-3', cohortName: 'Kelas IX (Fase D Akhir)', rombelCount: 4, maleCount: 40, femaleCount: 69, totalCount: 109 }
    ],
    facilitySummary: 'Sarana dan prasarana sekolah dirancang untuk mengakomodasi pembelajaran modern berpusat pada murid, riset lingkungan hidup (Adiwiyata Mandiri), serta literasi digital berkecepatan tinggi.',
    facilities: [
      { id: 'fac-1', name: 'Ruang Kepala Sekolah & Tamu', count: 1, unit: 'Ruang', condition: 'Sangat Baik' },
      { id: 'fac-2', name: 'Ruang Kelas Standar Terpasang Smart TV', count: 13, unit: 'Ruang', condition: 'Sangat Baik' },
      { id: 'fac-3', name: 'Ruang Guru & Ruang Rapat Kerja', count: 1, unit: 'Ruang', condition: 'Sangat Baik' },
      { id: 'fac-4', name: 'Laboratorium Komputer & Jaringan Internet', count: 1, unit: 'Ruang (35 Unit PC)', condition: 'Sangat Baik' },
      { id: 'fac-5', name: 'Laboratorium IPA Terpadu & Mikroskop Digital', count: 1, unit: 'Ruang', condition: 'Baik' },
      { id: 'fac-6', name: 'Perpustakaan Ramah Anak & Sudut Baca Literasi', count: 1, unit: 'Ruang (24.889 Buku)', condition: 'Sangat Baik' },
      { id: 'fac-7', name: 'Musala Sekolah "Al-Ikhlas"', count: 1, unit: 'Bangunan', condition: 'Sangat Baik' },
      { id: 'fac-8', name: 'Ruang Bimbingan Konseling (BK)', count: 1, unit: 'Ruang', condition: 'Baik' },
      { id: 'fac-9', name: 'Ruang UKS & Fasilitas Medis Pertolongan Pertama', count: 1, unit: 'Ruang', condition: 'Baik' },
      { id: 'fac-10', name: 'Rumah Kaca (Greenhouse) & Instalasi Hidroponik', count: 1, unit: 'Area', condition: 'Baik' },
      { id: 'fac-11', name: 'Bank Sampah Sekolah & Rumah Pengomposan', count: 2, unit: 'Unit', condition: 'Baik' },
      { id: 'fac-12', name: 'Lapangan Olahraga Multifungsi (Basket, Futsal, Voli)', count: 1, unit: 'Lapangan Luar', condition: 'Sangat Baik' }
    ],
    learningMedia: [
      { id: 'lm-1', name: 'Smart TV Interaktif 65 Inch di Setiap Kelas', count: 13, unit: 'Unit', condition: 'Sangat Baik' },
      { id: 'lm-2', name: 'LCD Proyektor & Layar Portabel', count: 7, unit: 'Set', condition: 'Baik' },
      { id: 'lm-3', name: 'Sound System & Wireless Speaker Kelas', count: 6, unit: 'Set', condition: 'Baik' },
      { id: 'lm-4', name: 'Kit Praktikum IPA (Fisika, Biologi, Geologi Karst)', count: 50, unit: 'Paket Kit', condition: 'Baik' },
      { id: 'lm-5', name: 'Perangkat Olahraga (Bola, Net, Matras Senam, Matras Taekwondo)', count: 30, unit: 'Set', condition: 'Sangat Baik' },
      { id: 'lm-6', name: 'Alat Musik Tradisional Bugis-Makassar & Rebana', count: 12, unit: 'Set', condition: 'Baik' }
    ],
    partnershipSummary: 'Sekolah membangun kolaborasi sinergis multi-pihak dengan entitas industri, kedinasan pemerintah, dinas kesehatan, aparat teritorial, dan lembaga pelestari geopark tingkat global.',
    partnerships: [
      { id: 'part-1', institution: 'Yayasan Kesejahteraan Semen Tonasa (YKST)', scope: 'Dukungan pendanaan, penyediaan sarana prasarana sekolah, beasiswa siswa berprestasi & prasejahtera.' },
      { id: 'part-2', institution: 'PT Semen Tonasa (Departemen CSR & Keanekaragaman Hayati)', scope: 'Penyediaan akses Taman Kehati, bus operasional studi lapangan, narasumber riset ramah lingkungan.' },
      { id: 'part-3', institution: 'Badan Pengelola UNESCO Global Geopark Maros-Pangkep', scope: 'Narasumber ahli geopark, kurasi materi konservasi karst, penyediaan pemandu di situs geosite (Sumpang Bita, Leang Lonrong).' },
      { id: 'part-4', institution: 'Dinas Pendidikan dan Kebudayaan Kab. Pangkep', scope: 'Pembinaan kurikulum, supervisi akademik manajerial, sinkronisasi kebijakan program daerah.' },
      { id: 'part-5', institution: 'Puskesmas Bungoro', scope: 'Pemeriksaan kesehatan berkala, imunisasi, skrining anemia, penyuluhan kesehatan reproduksi & anti-narkoba.' },
      { id: 'part-6', institution: 'Dinas Lingkungan Hidup (DLH) Kab. Pangkep', scope: 'Pendampingan Gerakan Peduli dan Berbudaya Lingkungan Hidup di Sekolah (PBLHS) / Sekolah Adiwiyata Mandiri.' },
      { id: 'part-7', institution: 'Koramil / Babinsa Bungoro', scope: 'Pelatihan dasar Peraturan Baris Berbaris (PBB), wawasan kebangsaan, dan penanaman disiplin patriotisme.' },
      { id: 'part-8', institution: 'Komite Sekolah & Paguyuban Orang Tua Murid', scope: 'Partisipasi program tahunan sekolah, evaluasi mutu, dukungan pameran hasil karya kokurikuler (Mini Expo).' }
    ]
  },
  chapter2: {
    vision: 'Mewujudkan Peserta Didik yang Unggul, Berkarakter, Berbudaya, Peduli Lingkungan, dan Terkemuka di Indonesia Berlandaskan Profil Pelajar Pancasila.',
    visionNarrative: [
      'Visi SMP Semen Tonasa II dirumuskan sebagai representasi komitmen jangka panjang dalam menghadirkan ekosistem pendidikan yang berpusat pada murid. Visi ini mengintegrasikan keunggulan kognitif dengan pembentukan watak luhur dan kecintaan mendalam terhadap alam semesta serta kebudayaan nusantara.',
      'Melalui paradigma Pembelajaran Mendalam (Deep Learning), visi ini diaktualisasikan dengan memastikan seluruh murid memperoleh pengalaman belajar yang berkesadaran (mindful), bermakna (meaningful), dan menggembirakan (joyful), sehingga mampu tumbuh menjadi insan tangguh, kritis, dan berintegritas tinggi.'
    ],
    missions: [
      'Menyelenggarakan proses pembelajaran yang aktif, inovatif, kreatif, efektif, dan menggembirakan guna mengoptimalkan potensi akademik dan non-akademik peserta didik.',
      'Melaksanakan pembinaan karakter secara holistik dan terintegrasi dalam intrakurikuler, kokurikuler, ekstrakurikuler, dan pembiasaan budaya positif sekolah.',
      'Melestarikan dan menumbuhkembangkan nilai-nilai budaya lokal Bugis-Makassar (Sipakatau, Sipakainge, Sipakalebbi) serta nilai-nilai kebangsaan Indonesia.',
      'Membudayakan gerakan peduli lingkungan melalui konservasi energi, penghijauan terpadu, pemilahan dan pengolahan sampah 3R, serta aksi iklim ramah lingkungan.',
      'Mengintegrasikan edukasi konservasi kawasan UNESCO Global Geopark Maros-Pangkep ke dalam kurikulum kontekstual lintas mata pelajaran.',
      'Meningkatkan kecakapan literasi baca-tulis, numerasi kontekstual, dan literasi digital peserta didik berbasis teknologi informasi dan kecerdasan artifisial etis.',
      'Membangun jejaring kolaborasi dan kemitraan strategis dengan pemangku kepentingan, dunia usaha, institusi kebudayaan, dan masyarakat luas.'
    ],
    goals: [
      'Terwujudnya peningkatan capaian kompetensi literasi dan numerasi peserta didik dengan predikat "Sangat Baik" pada Rapor Pendidikan dan Asesmen Nasional.',
      'Terbentuknya peserta didik yang menginternalisasi 8 Dimensi Profil Lulusan dalam sikap keseharian, memiliki kemandirian, etika luhur, dan disiplin diri.',
      'Terselenggaranya pembelajaran mendalam (deep learning) berbasis proyek kolaboratif kontekstual minimal 3 kali dalam satu tahun ajaran.',
      'Terdokumentasikannya partisipasi aktif 100% murid dalam aksi nyata konservasi lingkungan dan pelestarian Geopark Maros-Pangkep.',
      'Teraihnya prestasi kejuaraan akademik (KSN/Olimpiade Sains) dan non-akademik (FLS2N, O2SN, Seni Tradisional) minimal di tingkat kabupaten dan provinsi.',
      'Terciptanya iklim sekolah yang aman, nyaman, inklusif, toleran, bebas dari segala bentuk perundungan (bullying), kekerasan fisik, maupun diskriminasi.'
    ],
    smartAnalysisNotes: 'Perumusan tujuan telah memenuhi kriteria SMART (Specific, Measurable, Achievable, Relevant, Time-bound) serta prinsip evaluatif-reflektif (Evaluated & Reviewed) selaras dengan kebijakan BSKAP 2025.'
  },
  chapter3: {
    learningApproach: 'Mata Pelajaran',
    approachRationale: [
      'SMP Semen Tonasa II mengorganisasikan muatan kurikulum intrakurikuler berbasis mata pelajaran reguler mingguan yang dipadukan dengan pengorganisasian terintegrasi (unit integratif) dan sistem blok tematik pada program pembelajaran kokurikuler.',
      'Pengorganisasian ini dipilih agar setiap pendidik mata pelajaran dapat mendalami Capaian Pembelajaran (CP) sesuai bidang keahliannya, namun tetap memiliki fleksibilitas tinggi untuk berkolaborasi merancang kegiatan lintas disiplin ilmu yang kontekstual dan bermakna bagi murid.'
    ],
    curriculumStructureTables: [
      {
        title: 'Alokasi Waktu Mata Pelajaran Kelas VII dan VIII (Asumsi 1 Tahun = 36 Minggu, 1 JP = 40 Menit)',
        gradeLabel: 'Kelas VII & VIII',
        items: [
          { id: 'subj-1', subjectName: 'Pendidikan Agama dan Budi Pekerti', intraHoursPerWeek: 2, intraHoursPerYear: 72, kokoHoursPerYear: 36, totalHoursPerYear: 108 },
          { id: 'subj-2', subjectName: 'Pendidikan Pancasila', intraHoursPerWeek: 2, intraHoursPerYear: 72, kokoHoursPerYear: 36, totalHoursPerYear: 108 },
          { id: 'subj-3', subjectName: 'Bahasa Indonesia', intraHoursPerWeek: 5, intraHoursPerYear: 180, kokoHoursPerYear: 36, totalHoursPerYear: 216 },
          { id: 'subj-4', subjectName: 'Matematika', intraHoursPerWeek: 4, intraHoursPerYear: 144, kokoHoursPerYear: 36, totalHoursPerYear: 180 },
          { id: 'subj-5', subjectName: 'Ilmu Pengetahuan Alam (IPA)', intraHoursPerWeek: 4, intraHoursPerYear: 144, kokoHoursPerYear: 36, totalHoursPerYear: 180 },
          { id: 'subj-6', subjectName: 'Ilmu Pengetahuan Sosial (IPS)', intraHoursPerWeek: 3, intraHoursPerYear: 108, kokoHoursPerYear: 36, totalHoursPerYear: 144 },
          { id: 'subj-7', subjectName: 'Bahasa Inggris', intraHoursPerWeek: 3, intraHoursPerYear: 108, kokoHoursPerYear: 36, totalHoursPerYear: 144 },
          { id: 'subj-8', subjectName: 'Pendidikan Jasmani Olahraga dan Kesehatan (PJOK)', intraHoursPerWeek: 2, intraHoursPerYear: 72, kokoHoursPerYear: 36, totalHoursPerYear: 108 },
          { id: 'subj-9', subjectName: 'Informatika', intraHoursPerWeek: 2, intraHoursPerYear: 72, kokoHoursPerYear: 36, totalHoursPerYear: 108 },
          { id: 'subj-10', subjectName: 'Seni dan Budaya (Pilihan: Seni Rupa / Seni Musik)', intraHoursPerWeek: 2, intraHoursPerYear: 72, kokoHoursPerYear: 36, totalHoursPerYear: 108 },
          { id: 'subj-11', subjectName: 'Muatan Lokal: Bahasa Bugis*', intraHoursPerWeek: 2, intraHoursPerYear: 72, kokoHoursPerYear: 0, totalHoursPerYear: 72, isMulok: true }
        ]
      },
      {
        title: 'Alokasi Waktu Mata Pelajaran Kelas IX (Asumsi 1 Tahun = 32 Minggu, 1 JP = 40 Menit)',
        gradeLabel: 'Kelas IX',
        items: [
          { id: 'subj-9-1', subjectName: 'Pendidikan Agama dan Budi Pekerti', intraHoursPerWeek: 2, intraHoursPerYear: 64, kokoHoursPerYear: 32, totalHoursPerYear: 96 },
          { id: 'subj-9-2', subjectName: 'Pendidikan Pancasila', intraHoursPerWeek: 2, intraHoursPerYear: 64, kokoHoursPerYear: 32, totalHoursPerYear: 96 },
          { id: 'subj-9-3', subjectName: 'Bahasa Indonesia', intraHoursPerWeek: 5, intraHoursPerYear: 160, kokoHoursPerYear: 32, totalHoursPerYear: 192 },
          { id: 'subj-9-4', subjectName: 'Matematika', intraHoursPerWeek: 4, intraHoursPerYear: 128, kokoHoursPerYear: 32, totalHoursPerYear: 160 },
          { id: 'subj-9-5', subjectName: 'Ilmu Pengetahuan Alam (IPA)', intraHoursPerWeek: 4, intraHoursPerYear: 128, kokoHoursPerYear: 32, totalHoursPerYear: 160 },
          { id: 'subj-9-6', subjectName: 'Ilmu Pengetahuan Sosial (IPS)', intraHoursPerWeek: 3, intraHoursPerYear: 96, kokoHoursPerYear: 32, totalHoursPerYear: 128 },
          { id: 'subj-9-7', subjectName: 'Bahasa Inggris', intraHoursPerWeek: 3, intraHoursPerYear: 96, kokoHoursPerYear: 32, totalHoursPerYear: 128 },
          { id: 'subj-9-8', subjectName: 'Pendidikan Jasmani Olahraga dan Kesehatan (PJOK)', intraHoursPerWeek: 2, intraHoursPerYear: 64, kokoHoursPerYear: 32, totalHoursPerYear: 96 },
          { id: 'subj-9-9', subjectName: 'Informatika', intraHoursPerWeek: 2, intraHoursPerYear: 64, kokoHoursPerYear: 32, totalHoursPerYear: 96 },
          { id: 'subj-9-10', subjectName: 'Seni dan Budaya (Pilihan)', intraHoursPerWeek: 2, intraHoursPerYear: 64, kokoHoursPerYear: 32, totalHoursPerYear: 96 },
          { id: 'subj-9-11', subjectName: 'Muatan Lokal: Bahasa Bugis*', intraHoursPerWeek: 2, intraHoursPerYear: 64, kokoHoursPerYear: 0, totalHoursPerYear: 64, isMulok: true }
        ]
      }
    ],
    kokurikulerDescription: [
      'Kegiatan kokurikuler di SMP Semen Tonasa II diselenggarakan sebagai wahana penguatan karakter peserta didik yang diturunkan dari 8 Dimensi Profil Lulusan serta pengayaan materi intrakurikuler.',
      'Kokurikuler dilaksanakan melalui pembelajaran kolaboratif lintas disiplin ilmu, gerakan 7 Kebiasaan Anak Indonesia Hebat (7KAIH), dan riset eksploratif pelestarian ekosistem geopark karst.',
      'Alokasi waktu kokurikuler adalah 360 JP per tahun untuk kelas VII-VIII dan 320 JP untuk kelas IX, yang dikemas ke dalam 4 tema proyek utama.'
    ],
    kokurikulerProjects: [
      {
        id: 'koko-1',
        classes: 'Kelas VII, VIII, IX',
        dimensions: 'Penalaran Kritis, Kolaborasi, Kewargaan',
        theme: 'Kearifan Lokal: "Lindungi Geopark-Ku"',
        method: 'Pembelajaran Kolaboratif Lintas Disiplin (IPA, IPS, B. Indonesia, Seni)',
        activities: [
          'Sosialisasi Konsep Geopark & Nilai Konservasi Karst',
          'Studi Lapangan Observasi Ekosistem & Gua Sumpang Bita',
          'Analisis Kerusakan Lingkungan (Perambahan & Sampah)',
          'Pembuatan Produk Solusi (Karya Edukasi, Video Kampanye, Model Biopori)',
          'Penyelenggaraan Mini Expo Geopark di Sekolah',
          'Refleksi Diri & Komitmen Aksi Hijau Berkelanjutan'
        ],
        relatedSubjects: 'IPA, IPS, Bahasa Indonesia, Seni Budaya',
        allocationJP: 120
      },
      {
        id: 'koko-2',
        classes: 'Kelas VII, VIII, IX',
        dimensions: 'Kemandirian, Kreativitas, Komunikasi',
        theme: 'Sekolah Ramah Anak: "Katakan Tidak pada Perundungan"',
        method: 'Inquiry Berbasis Solusi & Kampanye Digital',
        activities: [
          'Survei Rasa Nyaman dan Aman Peserta Didik di Sekolah',
          'FGD Pemetaan Titik Rawan Perundungan',
          'Workshop Pembuatan Poster Digital, Siniar (Podcast), dan Komik Edukasi',
          'Penyusunan Piagam "Kode Etik Murid Ramah Sahabat"',
          'Deklarasi Damai Seluruh Warga Sekolah'
        ],
        relatedSubjects: 'Pendidikan Pancasila, BK, Bahasa Indonesia, Informatika',
        allocationJP: 100
      },
      {
        id: 'koko-3',
        classes: 'Kelas VII, VIII, IX',
        dimensions: 'Kreativitas, Penalaran Kritis, Kolaborasi',
        theme: 'Rekayasa & Teknologi: "Dari Alam untuk Inovasi"',
        method: 'Design Thinking & Pembuatan Prototipe Produk Berkelanjutan',
        activities: [
          'Eksplorasi Potensi Bahan Alam Sekitar (Serat Pelepah, Limbah Cangkang, Tanaman Obat)',
          'Uji Coba Sederhana Pembuatan Produk Bernilai Guna (Briket, Pupuk Cair, Kerajinan Anyaman Karst)',
          'Perhitungan Biaya Pokok Produksi Sederhana (Matematika Finansial)',
          'Pameran Gelar Inovasi Pelajar Mandiri'
        ],
        relatedSubjects: 'IPA, Matematika, Prakarya, Informatika',
        allocationJP: 80
      },
      {
        id: 'koko-4',
        classes: 'Kelas VII, VIII',
        dimensions: 'Kesehatan, Kolaborasi, Kemandirian',
        theme: 'Gerakan 7 Kebiasaan Anak Indonesia Hebat (7KAIH): "Sekolahku Bersih, Ragaku Bugar"',
        method: 'Pembiasaan Harian, Gerakan Jumat Sehat, & Pengelolaan Sampah Sekolah',
        activities: [
          'Pembiasaan Sarapan Bergizi Bersama Seimbang Setiap Selasa',
          'Audit Sampah Plastik & Pembuatan Kompos Organik (Eco-Enzyme)',
          'Gerakan Jalan Santai Eksplorasi Alam & Senam SKJ Bersama',
          'Lomba Kebersihan Kelas Bebas Sampah Plastik'
        ],
        relatedSubjects: 'PJOK, IPA, Pendidikan Agama',
        allocationJP: 60
      }
    ],
    ekstrakurikulerDescription: [
      'Ekstrakurikuler merupakan sarana pengembangan bakat, minat, kepribadian, serta kepemimpinan peserta didik di luar jam wajib intrakurikuler.',
      'Ekstrakurikuler wajib adalah Pendidikan Kepramukaan, dan didukung ragam ekstrakurikuler pilihan di bidang seni, sains, keagamaan, olahraga, dan bela diri.'
    ],
    ekstrakurikulerList: [
      {
        id: 'ekskul-1',
        name: 'Praja Muda Karana (Pramuka) - Wajib',
        goals: ['Menumbuhkan kedisiplinan, kepemimpinan, kemandirian, dan keterampilan bertahan di alam.', 'Membentuk kecintaan pelestarian lingkungan hidup dan bakti sosial kepramukaan.'],
        dimensions: 'Kemandirian, Kewargaan, Kolaborasi, Penalaran Kritis',
        timeWeekly: '2 JP (Jumat 14.10 - 15.30)',
        coach: 'Abdillah Natsir, S.Pd. & Pembina Gudep',
        location: 'Lapangan Utama & Aula Terbuka'
      },
      {
        id: 'ekskul-2',
        name: 'Palang Merah Remaja (PMR)',
        goals: ['Melatih pertolongan pertama pada kecelakaan (PPPK) dan tanggap darurat bencana.', 'Menumbuhkan kepedulian kemanusiaan dan donor darah relawan.'],
        dimensions: 'Kesehatan, Kolaborasi, Kemandirian',
        timeWeekly: '2 JP (Jumat 14.10 - 15.30)',
        coach: 'Amar Ma’ruf Ahmad, S.Hum.',
        location: 'Ruang UKS & Lapangan Olahraga'
      },
      {
        id: 'ekskul-3',
        name: 'Tahfidz Al-Qur’an & Literasi Keagamaan',
        goals: ['Membina tartil bacaan dan hafalan juz 30 Al-Qur’an dengan kaidah tajwid yang benar.', 'Menanamkan akhlak mulia dan spiritualitas mendalam.'],
        dimensions: 'Keimanan dan Ketakwaan kepada Tuhan YME, Kemandirian',
        timeWeekly: '2 JP (Jumat 14.10 - 15.30)',
        coach: 'Ramlah, S.Ag. & Guru PAI',
        location: 'Musala Al-Ikhlas'
      },
      {
        id: 'ekskul-4',
        name: 'Seni Tari Tradisional & Musik Nusantara',
        goals: ['Melestarikan tari tradisional Bugis-Makassar (Tari Paduppa, Tari Pakarena).', 'Menyiapkan peserta FLS2N bidang tari dan vokal solo.'],
        dimensions: 'Kreativitas, Kewargaan, Kolaborasi',
        timeWeekly: '2 JP (Jumat 14.10 - 15.30)',
        coach: 'Christina, S.Pd.',
        location: 'Ruang Seni & Budaya'
      },
      {
        id: 'ekskul-5',
        name: 'Bela Diri Taekwondo & Karate',
        goals: ['Membina kebugaran fisik, refleks, daya tahan, serta sportivitas ksatria.', 'Mencetak atlet berprestasi pada ajang O2SN dan Popda.'],
        dimensions: 'Kesehatan, Kemandirian, Kolaborasi',
        timeWeekly: '2 JP (Jumat 14.10 - 15.30)',
        coach: 'Syamsul Bahri, S.Si. (DAN II Taekwondo)',
        location: 'Lapangan Basket / Hall Olahraga'
      },
      {
        id: 'ekskul-6',
        name: 'Klub Olahraga Prestasi (Futsal & Voli)',
        goals: ['Mengembangkan teknik dasar permainan bola beregu dan strategi pertandingan.', 'Mempererat tali sportivitas antar kelas.'],
        dimensions: 'Kesehatan, Kolaborasi, Kemandirian',
        timeWeekly: '2 JP (Jumat 14.10 - 15.30)',
        coach: 'Basri Muhiddin, S.Pd.',
        location: 'Lapangan Olahraga Luar'
      }
    ],
    timeArrangementPrinciples: [
      'Hari sekolah berlangsung 5 hari kerja (Senin - Jumat) mulai pukul 07.15 hingga 15.30 WITA.',
      'Setiap hari diawali dengan kegiatan pembiasaan karakter 15 menit: Salat Duha / Penguatan Karakter Religi (Senin-Kamis), Tadarus & Doa Bersama (Jumat), serta Upacara Bendera (Senin pagi).',
      'Pembelajaran intrakurikuler dialokasikan 40 menit per JP, diselingi istirahat pagi (20 menit) dan istirahat siang/salat zuhur berjamaah (40 menit).',
      'Pengorganisasian waktu fleksibel mendukung sistem blok (deep exploration) berdurasi 80-120 menit pada jam pelajaran praktikum sains dan proyek kolaboratif.'
    ]
  },
  chapter4: {
    satuanPendidikanRationale: [
      'Perencanaan pembelajaran pada tingkat satuan pendidikan mencakup penetapan Alur Tujuan Pembelajaran (ATP) yang memetakan ketercapaian Capaian Pembelajaran (CP) secara linear dan berkesinambungan dari kelas VII hingga kelas IX (Fase D).',
      'Pada tingkat kelas, pendidik menyusun modul ajar dengan mengadopsi kerangka Pembelajaran Mendalam (Deep Learning) yang memuliakan murid melalui tiga pengalaman belajar: Mindful (Berkesadaran), Meaningful (Bermakna), dan Joyful (Menggembirakan), serta dilengkapi instrumen asesmen autentik formatif dan sumatif.'
    ],
    atpList: [
      {
        id: 'atp-ipa',
        subjectName: 'Ilmu Pengetahuan Alam (IPA Terpadu)',
        phase: 'Fase D (Kelas VII - IX)',
        grades: 'Kelas VII, VIII, IX',
        academicYear: '2025/2026',
        learningOutcomes: 'Pada akhir Fase D, peserta didik mampu menelaah hasil identifikasi makhluk hidup sesuai karakteristiknya; menganalisis klasifikasi materi dan perubahannya; menganalisis sistem organisasi kehidupan; menganalisis interaksi antar makhluk hidup dan lingkungannya dalam merancang upaya konservasi mencegah perubahan iklim; menganalisis hubungan usaha dan energi, gelombang, getaran, serta gejala kemagnetan dan kelistrikan untuk menyelesaikan masalah kontekstual ramah lingkungan.',
        learningObjectives: [
          'Menelaah hasil identifikasi makhluk hidup di lingkungan sekitar dan kawasan karst sesuai dengan karakteristik taksonomi.',
          'Menerapkan pengukuran besaran pokok dan turunan terhadap aspek fisik lingkungan sekitar secara presisi.',
          'Menganalisis klasifikasi materi, sifat asam-basa, dan perubahan wujud zat dalam kehidupan sehari-hari.',
          'Menganalisis sistem interaksi makhluk hidup dan rantai makanan dalam merancang aksi pelestarian keanekaragaman hayati geopark.',
          'Menganalisis konsep usaha, daya, dan transformasi energi terbarukan di lingkungan sekitar.',
          'Mengevaluasi keputusan etis pencegahan dampak zat adiktif dan bahan kimia berbahaya bagi kesehatan tubuh.'
        ],
        progressionFlow: [
          {
            grade: 'Kelas VII (Semester 1 & 2)',
            steps: [
              '7.1 Mengidentifikasi karakteristik makhluk hidup di sekitar sekolah dan kawasan karst.',
              '7.2 Menerapkan teknik pengukuran besaran fisika menggunakan instrumen yang tepat.',
              '7.3 Menelaah wujud materi, perubahan fisika/kimia, dan pemisahan campuran.',
              '7.4 Menganalisis interaksi makhluk hidup dalam ekosistem karst dan dampaknya terhadap keseimbangan alam.'
            ]
          },
          {
            grade: 'Kelas VIII (Semester 1 & 2)',
            steps: [
              '8.1 Menganalisis sistem gerak manusia dan gaya pada benda serta penerapannya.',
              '8.2 Menelaah sistem pencernaan, peredaran darah, pernapasan, dan ekskresi pada manusia.',
              '8.3 Menganalisis gelombang bunyi dan cahaya serta pemanfaatannya dalam teknologi navigasi biota.',
              '8.4 Mengevaluasi zat aditif dan zat adiktif dalam makanan serta dampaknya bagi kebugaran tubuh.'
            ]
          },
          {
            grade: 'Kelas IX (Semester 1 & 2)',
            steps: [
              '9.1 Menganalisis konsep pewarisan sifat materi genetik untuk pemuliaan varietas.',
              '9.2 Menganalisis fenomena listrik statis, dinamis, dan teknologi ramah lingkungan di industri.',
              '9.3 Menganalisis sistem tata surya, dinamika litosfer karst, dan mitigasi bencana gempa/longsor.'
            ]
          }
        ]
      },
      {
        id: 'atp-ips',
        subjectName: 'Ilmu Pengetahuan Sosial (IPS Terpadu)',
        phase: 'Fase D (Kelas VII - IX)',
        grades: 'Kelas VII, VIII, IX',
        academicYear: '2025/2026',
        learningOutcomes: 'Peserta didik memahami keberagaman kondisi geografis Indonesia, konektivitas antarruang, potensi sumber daya alam, dan interaksi sosial masyarakat; menganalisis peranan kegiatan ekonomi, lembaga keuangan, serta sejarah pembentukan toponimi wilayah dan warisan peradaban lokal hingga global.',
        learningObjectives: [
          'Menjelaskan kondisi geografis Indonesia dan konektivitas antarruang dalam pemanfaatan potensi alam lokal.',
          'Menganalisis proses interaksi sosial, pembentukan norma, dan dinamika kebudayaan masyarakat Bugis-Makassar.',
          'Menganalisis peran pelaku ekonomi dan pasar dalam memenuhi kebutuhan hidup berkelanjutan.',
          'Merefleksikan sejarah gua prasejarah Sumpang Bita sebagai jejak peradaban purba nusantara.'
        ],
        progressionFlow: [
          {
            grade: 'Kelas VII',
            steps: [
              '7.1 Memahami letak geografis dan bentang alam lokal dalam kehidupan sosial masyarakat.',
              '7.2 Menganalisis sosialisasi dalam keluarga dan masyarakat serta nilai kearifan lokal.',
              '7.3 Mengidentifikasi aktivitas ekonomi keluarga dan pengelolaan uang saku bijak.'
            ]
          },
          {
            grade: 'Kelas VIII',
            steps: [
              '8.1 Menelaah keragaman masyarakat Indonesia dan integrasi nasional.',
              '8.2 Menganalisis peran pelaku ekonomi dan perdagangan antarpulau.',
              '8.3 Merefleksikan dampak penjajahan dan pergerakan kebangsaan.'
            ]
          },
          {
            grade: 'Kelas IX',
            steps: [
              '9.1 Menganalisis perubahan sosial budaya masyarakat di era globalisasi dan digital.',
              '9.2 Menelaah perdagangan internasional dan peluang ekonomi kreatif lokal.',
              '9.3 Merancang aksi pemberdayaan ekonomi masyarakat berbasis potensi Geopark.'
            ]
          }
        ]
      }
    ],
    sampleLessonPlan: {
      designerName: 'Andi Reski Wahyuni, S.Pd. & Jumirah, S.Pd.',
      schoolName: 'SMP Semen Tonasa II',
      classSemester: 'Kelas VII / Semester Ganjil',
      phaseGrade: 'Fase D / SMP',
      academicYear: '2025/2026',
      subject: 'Kolaborasi Terpadu IPA dan IPS (Unit Integratif)',
      duration: '5 Jam Pelajaran (2 Pertemuan)',
      studentBackground: 'Peserta didik memiliki latar belakang pengalaman yang beragam. Sebagian besar telah mengenal bentang karst dan lingkungan semen tonasa secara visual, namun belum menyadari keunikan interaksi ilmiah antara komposisi batuan kars, flora-fauna gua, dan sejarah sosial ekonomi masyarakat sekitar.',
      learningMaterialContext: 'Materi memadukan klasifikasi makhluk hidup dan ekosistem (IPA) dengan konektivitas ruang dan kearifan lokal konservasi (IPS) bertempat di kawasan geosite Sumpang Bita Geopark Maros-Pangkep.',
      targetedDimensions: ['Penalaran Kritis', 'Kolaborasi', 'Kewargaan', 'Komunikasi'],
      learningObjectives: [
        'Peserta didik mampu mengidentifikasi minimal 3 komponen biotik khas karst dan menjelaskan adaptasi morfologinya secara logis.',
        'Peserta didik mampu menganalisis keterkaitan kondisi geologis karst terhadap mata pencaharian dan kearifan budaya masyarakat lokal.'
      ],
      pedagogicalModel: 'Project Based Learning (PjBL) terintegrasi Inquiry Lapangan',
      pedagogicalApproach: 'Pembelajaran Mendalam (Deep Learning: Mindful, Meaningful, Joyful) berpadu TPACK',
      partnerships: 'Kerja sama dengan Badan Pengelola Geopark Maros-Pangkep & Taman Kehati PT Semen Tonasa',
      learningEnvironments: {
        physical: 'Situs Geosite Karst & Gua Prasejarah Sumpang Bita, Biring Ere',
        virtual: 'Tur Virtual Arkeologi Kemdikbud & Ensiklopedia Digital Geopark Maros-Pangkep'
      },
      digitalTools: ['Aplikasi Google Lens untuk identifikasi flora', 'Kamera smartphone peserta didik', 'Canva untuk lembar presentasi'],
      meetings: [
        {
          meetingNo: 1,
          title: 'Pertemuan 1: Eksplorasi Fenomena Batu Bertunas & Keanekaragaman Karst (Mindful & Meaningful)',
          mindfulMeaningfulActivities: [
            'Guru memantik kesadaran murid dengan menayangkan foto close-up akar beringin yang mencengkeram tebing tebing kapur terjal di Sumpang Bita.',
            'Pertanyaan Pemantik: "Bagaimana pohon ini mampu memperoleh air dan nutrisi pada batu kapur yang begitu keras dan kering? Apa yang membedakannya dengan pepohonan di halaman rumahmu?"',
            'Murid merumuskan hipotesis awal dan mengidentifikasi instrumen observasi ciri adaptasi makhluk hidup.'
          ],
          applyingJoyfulActivities: [
            'Murid bekerja dalam kelompok 4-5 orang untuk menelusuri data digital fauna khas (kelelawar buah, kupu-kupu Bantimurung, anggrek karst).',
            'Pendidik memfasilitasi pembuatan tabel perbandingan habitat alami vs buatan.'
          ],
          reflectingActivities: [
            'Murid melakukan "Check-in Perasaan" dan menuliskan 1 hal menakjubkan yang mereka pelajari tentang daya juang makhluk hidup di batu gamping.',
            'Guru memberikan penguatan konseptual klasifikasi biologi dan keterhubungannya dengan ilmu bumi.'
          ]
        },
        {
          meetingNo: 2,
          title: 'Pertemuan 2: Kunjungan Lapangan & Presentasi Mini Expo Solusi Konservasi (Joyful & Durable)',
          mindfulMeaningfulActivities: [
            'Safety briefing dan penegasan etika riset konservasi: "Jangan mengambil apa pun selain foto, jangan meninggalkan apa pun selain jejak kaki".',
            'Murid melakukan pengamatan langsung struktur batuan karst dan mencatat mikroorganisme serta vegetasi tebing.'
          ],
          applyingJoyfulActivities: [
            'Kelompok mendokumentasikan temuan menggunakan Google Lens dan membuat infografis digital 1 halaman menggunakan tablet/ponsel.',
            'Mini Expo di ruang kelas terbuka: setiap kelompok memaparkan 1 rekomendasi aksi perlindungan geosite dari coretan vandalisme dan sampah plastik.'
          ],
          reflectingActivities: [
            'Murid menilai kontribusi teman sejawat dengan rubrik kolaborasi.',
            'Penutupan dengan ikrar bersama "Sahabat Alam Geopark".'
          ]
        }
      ],
      formativeAssessment: 'Observasi kinerja kelompok menggunakan checklist keterampilan bernalar kritis dan kerja sama tim.',
      summativeAssessment: 'Rubrik penilaian presentasi produk infografis solusi konservasi karst dengan kriteria: Ketepatan Konsep Sains (40%), Kelogisan Solusi Sosial (30%), Kreativitas Visual (15%), dan Kemampuan Berkomunikasi (15%).'
    }
  },
  chapter5: {
    evaluationIntro: [
      'Evaluasi kurikulum dan pembelajaran di SMP Semen Tonasa II dirancang sebagai proses refleksi berkelanjutan untuk memastikan keterlaksanaan program, ketercapaian tujuan satuan pendidikan, serta pemenuhan kebutuhan belajar murid.',
      'Evaluasi kurikulum terbagi atas evaluasi jangka pendek (tahunan/semester) terhadap ketercapaian ATP, efektivitas modul ajar, dan kepuasan belajar murid; serta evaluasi jangka panjang (4-5 tahun) terhadap relevansi visi, misi, dan tujuan satuan pendidikan.'
    ],
    evaluationTable: [
      { id: 'eval-1', activityName: 'Refleksi Harian & Jurnal Pembelajaran Guru', frequency: 'Harian (Setiap selesai unit tatap muka)', purpose: 'Mengetahui respons murid, kendala diferensiasi belajar, dan catatan perbaikan pembelajaran.', pic: 'Guru Mata Pelajaran' },
      { id: 'eval-2', activityName: 'Evaluasi Pembelajaran Akhir Unit / Sumatif', frequency: 'Per Unit Pembelajaran / Tengah Semester', purpose: 'Mengukur ketuntasan tujuan pembelajaran murid dan merancang intervensi remedial/pengayaan.', pic: 'Guru Mapel & Tim Kurikulum' },
      { id: 'eval-3', activityName: 'Rapat Kerja Evaluasi Kurikulum Semester', frequency: 'Akhir Semester Ganjil & Genap', purpose: 'Menelaah distribusi jam mengajar, capaian kokurikuler, dan evaluasi keterlaksanaan kalender akademik.', pic: 'Kepala Sekolah & Wakasek Kurikulum' },
      { id: 'eval-4', activityName: 'Analisis Komprehensif Rapor Pendidikan (PBD)', frequency: 'Tahunan (Bulan Juli awal tahun ajaran)', purpose: 'Mengidentifikasi indikator prioritas (literasi, numerasi, iklim kebinekaan) untuk rencana kerja tahun berikutnya.', pic: 'Tim Penjaminan Mutu & Pengawas Sekolah' }
    ],
    professionalDevIntro: [
      'Program pengembangan profesional pendidik disusun berdasarkan hasil pemetaan kompetensi pada Rapor Pendidikan, observasi kelas, dan evaluasi diri guru (Refleksi Kinerja PMM).',
      'Pendekatan yang dilakukan meliputi pelatihan terstruktur (In-House Training), workshop kolaboratif Komunitas Belajar (Kombel) intra-sekolah, studi tiru, serta partisipasi aktif dalam MGMP tingkat kabupaten.'
    ],
    professionalDevTable: [
      { id: 'prof-1', activityName: 'Sosialisasi & Workshop Penyusunan KSP Revisi 2025 Sesuai Permendikdasmen 13/2025', schedule: 'Juli 2025', pic: 'Wakasek Kurikulum', speaker: 'Pengawas Sekolah & Kepala Sekolah' },
      { id: 'prof-2', activityName: 'Pelatihan Desain Pembelajaran Mendalam (Deep Learning: Mindful, Meaningful, Joyful)', schedule: 'Juli 2025', pic: 'Wakasek Kurikulum', speaker: 'Fasilitator Guru Penggerak / Puskurjar' },
      { id: 'prof-3', activityName: 'Workshop Pengembangan Asesmen Autentik & Rubrik Berbasis 8 Dimensi Profil Lulusan', schedule: 'Agustus 2025', pic: 'Tim Kurikulum', speaker: 'Pengawas Sekolah' },
      { id: 'prof-4', activityName: 'Pelatihan Integrasi Kecerdasan Artifisial (AI) dan LMS dalam Pembelajaran Interaktif', schedule: 'September 2025', pic: 'Koordinator IT & Operator', speaker: 'Praktisi Teknologi Pendidikan' },
      { id: 'prof-5', activityName: 'Penguatan Implementasi Gerakan 7 Kebiasaan Anak Indonesia Hebat (7KAIH)', schedule: 'Oktober 2025', pic: 'Wakasek Kesiswaan', speaker: 'Balai Guru Penggerak Sulsel' },
      { id: 'prof-6', activityName: 'Seminar Lingkungan Hidup & Edukasi Konservasi Karst UNESCO Geopark', schedule: 'November 2025', pic: 'Tim Adiwiyata', speaker: 'Badan Pengelola Geopark & DLH Pangkep' }
    ],
    mentoringIntro: [
      'Pendampingan pendidik dilakukan melalui supervisi akademik klinis yang humanis, mengedepankan coaching dan mentoring sejawat, bukan inspeksi yang menakutkan, dengan alur: Pra-Observasi, Observasi Kelas, dan Pasca-Observasi (Refleksi Bersama).'
    ],
    mentoringTable: [
      { id: 'ment-1', stage: 'Persiapan', activityDescription: 'Pembentukan tim supervisi klinis, penyusunan jadwal supervisi, sosialisasi instrumen observasi kelas, dan dialog pra-observasi.', schedule: 'Awal Semester (Juli & Januari)', pic: 'Kepala Sekolah & Tim Supervisi' },
      { id: 'ment-2', stage: 'Pelaksanaan', activityDescription: 'Observasi proses pembelajaran di kelas menggunakan pendekatan deep learning, pemantauan penggunaan smart TV/media ajar, dan interaksi murid.', schedule: 'Agustus-Oktober & Februari-April', pic: 'Kepala Sekolah & Guru Senior' },
      { id: 'ment-3', stage: 'Tindak Lanjut', activityDescription: 'Umpan balik reflektif (coaching) empat mata, penyusunan rencana aksi perbaikan pembelajaran, tindak lanjut di Komunitas Belajar (Kombel).', schedule: 'November & Mei', pic: 'Kepala Sekolah & Pengawas Sekolah' }
    ]
  },
  appendices: [
    {
      id: 'app-1',
      number: 'Lampiran 1',
      title: 'Surat Keputusan Kepala Sekolah tentang Tim Pengembang Kurikulum dan Pembagian Beban Tugas Mengajar (PBM)',
      description: 'Memuat SK penetapan tim penyusun KSP, uraian tugas, serta SK pembagian beban mengajar semester ganjil/genap tahun ajaran 2025/2026.',
      included: true,
      type: 'sk_pbm',
      contentSnippet: 'Keputusan Kepala SMP Semen Tonasa II Nomor: 09/SMP-ST.II/VII/2025 tentang Pembagian Tugas Mengajar, Bimbingan Konseling, dan Tugas Tambahan Semester Ganjil Tahun Ajaran 2025/2026.'
    },
    {
      id: 'app-2',
      number: 'Lampiran 2',
      title: 'Roster / Jadwal Pelajaran Mingguan Tahun Ajaran 2025/2026',
      description: 'Memuat tabel matriks jadwal pelajaran per kelas dari hari Senin sampai Jumat, alokasi jam duha, intrakurikuler, dan kegiatan kokurikuler/ekstrakurikuler.',
      included: true,
      type: 'roster_jadwal',
      contentSnippet: 'Matriks Roster Pembelajaran Kelas VII A-D, VIII A-C, IX A-D SMP Semen Tonasa II Tahun Ajaran 2025/2026.'
    },
    {
      id: 'app-3',
      number: 'Lampiran 3',
      title: 'Contoh Modul Ajar Kokurikuler Tematik Geopark & LKPD Siswa',
      description: 'Memuat modul ajar lengkap proyek kolaboratif lintas disiplin ilmu bertema "Lindungi Geopark-Ku", rubrik asesmen, dan lembar kerja peserta didik (LKPD).',
      included: true,
      type: 'lkpd_projek',
      contentSnippet: 'Modul Ajar Kokurikuler Kearifan Lokal Geopark Maros-Pangkep dan LKPD Eksplorasi Ciri Kehidupan di Tebing Karst & Gua Prasejarah Sumpang Bita.'
    },
    {
      id: 'app-4',
      number: 'Lampiran 4',
      title: 'SK Bupati Pangkep tentang Penetapan Mata Pelajaran Muatan Lokal Bahasa Daerah',
      description: 'Keputusan Bupati Pangkajene dan Kepulauan Nomor: h.3 Tahun 2025 tentang Penetapan Bahasa Bugis, Makassar, dan Mandar sebagai Muatan Lokal Wajib.',
      included: true,
      type: 'custom',
      contentSnippet: 'Keputusan Bupati Pangkajene dan Kepulauan Nomor h.3 Tahun 2025 tentang Penetapan Bahasa Daerah sebagai Muatan Lokal 2 Jam Pelajaran per Minggu.'
    }
  ],
  printSettings: {
    paperSize: 'A4',
    margins: {
      top: 3.0,
      bottom: 3.0,
      left: 4.0,
      right: 3.0
    },
    marginPreset: '4-3-3-3',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: '12pt',
    lineHeight: '1.5',
    showPageNumbers: true,
    showWatermark: false,
    watermarkText: 'DOKUMEN RESMI KURIKULUM SATUAN PENDIDIKAN'
  }
};

export const getPresetByLevel = (level: EducationLevel): Partial<KSPDocument> => {
  switch (level) {
    case 'SD':
      return {
        identity: {
          ...initialKspData.identity,
          name: 'SD Negeri Unggulan Cendekia',
          level: 'SD',
          curriculumName: 'KURIKULUM SEKOLAH BINA PRESTASI',
          curriculumSubtitle: 'Menyenangkan, Holistik, dan Menguatkan Karakter Transisi PAUD-SD'
        },
        cover: {
          ...initialKspData.cover,
          theme: 'kemdikbud-blue',
          schoolName: 'SD NEGERI UNGGULAN CENDEKIA',
          curriculumBrand: 'KURIKULUM MERDEKA SD',
          title: 'DOKUMEN KURIKULUM SATUAN PENDIDIKAN'
        },
        chapter3: {
          ...initialKspData.chapter3,
          learningApproach: 'Tematik'
        }
      };
    case 'SMA':
      return {
        identity: {
          ...initialKspData.identity,
          name: 'SMA Negeri 1 Prestasi Bangsa',
          level: 'SMA',
          curriculumName: 'KURIKULUM TRANSFORMASI GLOBAL',
          curriculumSubtitle: 'Berorientasi Riset, Kemandirian Akademik, dan Kolaborasi Masa Depan'
        },
        cover: {
          ...initialKspData.cover,
          theme: 'nusantara-navy',
          schoolName: 'SMA NEGERI 1 PRESTASI BANGSA',
          curriculumBrand: 'KURIKULUM TRANSFORMASI RISET'
        }
      };
    case 'SMK':
      return {
        identity: {
          ...initialKspData.identity,
          name: 'SMK Negeri 2 Teknologi Industri',
          level: 'SMK',
          curriculumName: 'KURIKULUM TEKNOVOKASI INDUSTRI',
          curriculumSubtitle: 'Berbasis Teaching Factory, Penyelarasan DUDI & Praktik Kerja Lapangan (PKL)'
        },
        cover: {
          ...initialKspData.cover,
          theme: 'maroon-royal',
          schoolName: 'SMK NEGERI 2 TEKNOLOGI INDUSTRI',
          curriculumBrand: 'KURIKULUM VOKASI UNGGUL'
        },
        chapter3: {
          ...initialKspData.chapter3,
          learningApproach: 'Blok'
        }
      };
    case 'PAUD':
      return {
        identity: {
          ...initialKspData.identity,
          name: 'PAUD Cemerlang Kasih Ibu',
          level: 'PAUD',
          curriculumName: 'KURIKULUM CERIA BERMAKNA',
          curriculumSubtitle: 'Bermain Bermakna, Berkesadaran, dan Stimulasi Tumbuh Kembang Fondasi'
        },
        cover: {
          ...initialKspData.cover,
          theme: 'geosmart-emerald',
          schoolName: 'PAUD CEMERLANG KASIH IBU',
          curriculumBrand: 'KURIKULUM FASE FONDASI'
        },
        chapter3: {
          ...initialKspData.chapter3,
          learningApproach: 'Tematik'
        }
      };
    default:
      return {};
  }
};

export const defaultKspDocument: KSPDocument = initialKspData;
