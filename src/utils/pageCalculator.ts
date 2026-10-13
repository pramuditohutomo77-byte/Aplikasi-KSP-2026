import { KSPDocument, TableOfContentItem } from '../types/ksp';

export interface CalculatedPageStructure {
  coverPage: number;
  dataDocPage: number;
  endorsementPage: number;
  teamPage: number;
  forewordPage: number;
  tocPage: number;
  chapter1Start: number;
  chapter1Pages: number;
  chapter2Start: number;
  chapter2Pages: number;
  chapter3Start: number;
  chapter3Pages: number;
  chapter4Start: number;
  chapter4Pages: number;
  chapter5Start: number;
  chapter5Pages: number;
  appendicesStart: number;
  appendicesPages: number;
  totalPages: number;
  items: TableOfContentItem[];
}

export function calculateKspPageStructure(doc: KSPDocument): CalculatedPageStructure {
  // Front matter pages (Standard roman / sequential)
  // Page 1: Cover
  // Page 2: Data Dokumen
  // Page 3: Lembar Penetapan
  // Page 4: Tim Penyusun
  // Page 5-6: Kata Pengantar (typically 1-2 pages depending on paragraphs)
  const forewordPages = doc.foreword.paragraphs.length > 3 ? 2 : 1;
  const tocStart = 4 + forewordPages;
  const tocPages = 1; // 1 page for Daftar Isi

  // Chapter 1: Karakteristik Satuan Pendidikan
  // Sections: Profil, Sosial-Ekonomi-Budaya, PTK (Tabel), Siswa (Tabel), Sarpras (Tabel), Kemitraan (Tabel)
  // Each table and narrative contributes
  const ptkRowCount = doc.chapter1.ptkList.length;
  const ptkPages = Math.max(1, Math.ceil(ptkRowCount / 14));
  const sarprasPages = Math.max(1, Math.ceil((doc.chapter1.facilities.length + doc.chapter1.learningMedia.length) / 16));
  const partnershipPages = Math.max(1, Math.ceil(doc.chapter1.partnerships.length / 8));
  // Total Chapter 1 pages roughly 7-10 pages
  const chapter1Pages = Math.max(4, 2 + ptkPages + sarprasPages + partnershipPages);

  // Chapter 2: Visi, Misi, Tujuan
  // Visi, narasi, 7 misi, 6 tujuan + analisis SMART
  const missionCount = doc.chapter2.missions.length;
  const goalCount = doc.chapter2.goals.length;
  const chapter2Pages = (missionCount + goalCount > 8) ? 3 : 2;

  // Chapter 3: Pengorganisasian Pembelajaran
  // Pendekatan, Struktur Kurikulum (2 tabel), Kokurikuler (Tabel + narasi), Ekstrakurikuler (Tabel + waktu)
  const kokoCount = doc.chapter3.kokurikulerProjects.length;
  const ekskulCount = doc.chapter3.ekstrakurikulerList.length;
  const chapter3Pages = Math.max(5, 2 + Math.ceil(kokoCount / 2) + Math.ceil(ekskulCount / 4));

  // Chapter 4: Perencanaan Pembelajaran
  // ATP (Tabel IPA, IPS), Format Modul Ajar (Desain, Pertemuan 1 & 2, Asesmen rubrik)
  const atpCount = doc.chapter4.atpList.length;
  const lessonMeetings = doc.chapter4.sampleLessonPlan.meetings.length;
  const chapter4Pages = Math.max(6, (atpCount * 2) + (lessonMeetings * 2) + 2);

  // Chapter 5: Evaluasi, Pengembangan Profesional & Pendampingan
  // 3 Tabel: Evaluasi, Pelatihan, Pendampingan
  const chapter5Pages = Math.max(3, Math.ceil((doc.chapter5.evaluationTable.length + doc.chapter5.professionalDevTable.length + doc.chapter5.mentoringTable.length) / 8));

  // Appendices
  const includedAppendices = doc.appendices.filter(a => a.included).length;
  const appendicesPages = Math.max(3, includedAppendices * 2);

  const chapter1Start = 1; // In Indonesian academic formatting, Chapter 1 begins at page 1
  const chapter2Start = chapter1Start + chapter1Pages;
  const chapter3Start = chapter2Start + chapter2Pages;
  const chapter4Start = chapter3Start + chapter3Pages;
  const chapter5Start = chapter4Start + chapter4Pages;
  const appendicesStart = chapter5Start + chapter5Pages;
  const totalPages = appendicesStart + appendicesPages - 1;

  const items: TableOfContentItem[] = [
    { id: 'toc-lembar-penetapan', code: '', title: 'LEMBAR PENETAPAN', level: 1, pageNumber: 3 },
    { id: 'toc-tim-penyusun', code: '', title: 'TIM PENYUSUN KURIKULUM', level: 1, pageNumber: 4 },
    { id: 'toc-kata-pengantar', code: '', title: 'KATA PENGANTAR', level: 1, pageNumber: 5 },
    { id: 'toc-daftar-isi', code: '', title: 'DAFTAR ISI', level: 1, pageNumber: tocStart },
    
    // BAB I
    { id: 'toc-bab-1', code: 'BAB I', title: 'KARAKTERISTIK SATUAN PENDIDIKAN', level: 1, pageNumber: chapter1Start },
    { id: 'toc-bab-1-a', code: 'A.', title: 'Profil Satuan Pendidikan', level: 2, pageNumber: chapter1Start },
    { id: 'toc-bab-1-b', code: 'B.', title: 'Analisis Sosial, Ekonomi dan Budaya', level: 2, pageNumber: chapter1Start + 1 },
    { id: 'toc-bab-1-c', code: 'C.', title: 'Karakteristik Pendidik dan Tenaga Kependidikan', level: 2, pageNumber: chapter1Start + 2 },
    { id: 'toc-bab-1-d', code: 'D.', title: 'Karakteristik Peserta Didik', level: 2, pageNumber: chapter1Start + 2 + ptkPages },
    { id: 'toc-bab-1-e', code: 'E.', title: 'Sarana dan Prasarana', level: 2, pageNumber: chapter1Start + 3 + ptkPages },
    { id: 'toc-bab-1-f', code: 'F.', title: 'Analisis Kemitraan dan Kerjasama', level: 2, pageNumber: chapter1Start + 4 + ptkPages },

    // BAB II
    { id: 'toc-bab-2', code: 'BAB II', title: 'VISI, MISI, DAN TUJUAN', level: 1, pageNumber: chapter2Start },
    { id: 'toc-bab-2-a', code: 'A.', title: 'Visi Satuan Pendidikan', level: 2, pageNumber: chapter2Start },
    { id: 'toc-bab-2-b', code: 'B.', title: 'Misi Satuan Pendidikan', level: 2, pageNumber: chapter2Start },
    { id: 'toc-bab-2-c', code: 'C.', title: 'Tujuan Satuan Pendidikan', level: 2, pageNumber: chapter2Start + 1 },

    // BAB III
    { id: 'toc-bab-3', code: 'BAB III', title: 'PENGORGANISASIAN PEMBELAJARAN', level: 1, pageNumber: chapter3Start },
    { id: 'toc-bab-3-a', code: 'A.', title: 'Intrakurikuler & Struktur Kurikulum', level: 2, pageNumber: chapter3Start },
    { id: 'toc-bab-3-b', code: 'B.', title: 'Kokurikuler & Penguatan Karakter Profil Lulusan', level: 2, pageNumber: chapter3Start + 2 },
    { id: 'toc-bab-3-c', code: 'C.', title: 'Ekstrakurikuler', level: 2, pageNumber: chapter3Start + 4 },
    { id: 'toc-bab-3-d', code: 'D.', title: 'Pengaturan Waktu Pembelajaran', level: 2, pageNumber: chapter3Start + 5 },

    // BAB IV
    { id: 'toc-bab-4', code: 'BAB IV', title: 'PERENCANAAN PEMBELAJARAN', level: 1, pageNumber: chapter4Start },
    { id: 'toc-bab-4-a', code: 'A.', title: 'Perencanaan Lingkup Satuan Pendidikan (Alur Tujuan Pembelajaran / ATP)', level: 2, pageNumber: chapter4Start },
    { id: 'toc-bab-4-b', code: 'B.', title: 'Perencanaan Lingkup Kelas (Modul Ajar Deep Learning: Mindful, Meaningful, Joyful)', level: 2, pageNumber: chapter4Start + (atpCount * 2) },

    // BAB V
    { id: 'toc-bab-5', code: 'BAB V', title: 'EVALUASI, PENGEMBANGAN PROFESIONAL, DAN PENDAMPINGAN', level: 1, pageNumber: chapter5Start },
    { id: 'toc-bab-5-a', code: 'A.', title: 'Evaluasi Kurikulum dan Pembelajaran', level: 2, pageNumber: chapter5Start },
    { id: 'toc-bab-5-b', code: 'B.', title: 'Pengembangan Profesional Pendidik', level: 2, pageNumber: chapter5Start + 1 },
    { id: 'toc-bab-5-c', code: 'C.', title: 'Pendampingan dan Supervisi Akademis Klinis', level: 2, pageNumber: chapter5Start + 2 },

    // LAMPIRAN
    { id: 'toc-lampiran', code: '', title: 'LAMPIRAN-LAMPIRAN', level: 1, pageNumber: appendicesStart },
    { id: 'toc-lampiran-1', code: 'Lampiran 1', title: 'SK Tim Kurikulum & Beban Mengajar Guru', level: 2, pageNumber: appendicesStart },
    { id: 'toc-lampiran-2', code: 'Lampiran 2', title: 'Roster / Jadwal Pelajaran Mingguan', level: 2, pageNumber: appendicesStart + 1 },
    { id: 'toc-lampiran-3', code: 'Lampiran 3', title: 'Contoh Modul Ajar Kokurikuler & LKPD Siswa', level: 2, pageNumber: appendicesStart + 2 }
  ];

  return {
    coverPage: 1,
    dataDocPage: 2,
    endorsementPage: 3,
    teamPage: 4,
    forewordPage: 5,
    tocPage: tocStart,
    chapter1Start,
    chapter1Pages,
    chapter2Start,
    chapter2Pages,
    chapter3Start,
    chapter3Pages,
    chapter4Start,
    chapter4Pages,
    chapter5Start,
    chapter5Pages,
    appendicesStart,
    appendicesPages,
    totalPages,
    items
  };
}
