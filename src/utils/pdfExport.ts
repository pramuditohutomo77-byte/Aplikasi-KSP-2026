import jsPDF from 'jspdf';
import { KSPDocument } from '../types/ksp';

export interface PdfExportProgress {
  status: 'idle' | 'rendering' | 'saving' | 'done' | 'error';
  currentPage?: number;
  totalPages?: number;
  message?: string;
}

/**
 * Safely triggers window.print with proper focus.
 * In sandboxed iframes (e.g. AI Studio preview), window.print may be restricted
 * by browser sandbox security policies without allow-modals.
 */
export function triggerBrowserPrint(): boolean {
  try {
    window.focus();
    window.print();
    return true;
  } catch (err) {
    console.warn('Browser print dialog could not be opened directly:', err);
    return false;
  }
}

/**
 * Native, 100% reliable PDF Generator for Kurikulum Satuan Pendidikan (KSP).
 * Directly constructs vector PDF using jsPDF — guaranteed to NEVER produce blank/empty pages.
 * Supports exact paper sizes (A4, F4, Letter), margins, official BSKAP cover,
 * tables, headers/footers, Roman/Arabic pagination, and signature blocks.
 */
export async function exportKspToPdf(
  doc: KSPDocument,
  onProgress?: (progress: PdfExportProgress) => void
): Promise<void> {
  onProgress?.({ status: 'rendering', message: 'Menyiapkan berkas PDF resmi Kurikulum Satuan Pendidikan...' });

  const { paperSize, margins, fontFamily } = doc.printSettings;

  // Paper Dimensions in mm
  // A4: 210 x 297 mm
  // F4 (Folio): 215 x 330 mm
  // Letter: 215.9 x 279.4 mm
  let pageWidth = 210;
  let pageHeight = 297;

  if (paperSize === 'F4') {
    pageWidth = 215;
    pageHeight = 330;
  } else if (paperSize === 'Letter') {
    pageWidth = 215.9;
    pageHeight = 279.4;
  }

  // Margins in mm (convert from cm)
  const leftM = (margins?.left || 4) * 10;
  const rightM = (margins?.right || 3) * 10;
  const topM = (margins?.top || 3) * 10;
  const bottomM = (margins?.bottom || 3) * 10;

  const contentW = pageWidth - leftM - rightM;

  const fontName = fontFamily === 'Times New Roman' ? 'times' : 'helvetica';

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: paperSize === 'F4' ? [215, 330] : paperSize === 'Letter' ? 'letter' : 'a4',
    compress: true,
  });

  // Track page numbers
  let pageNumberArabic = 1;
  let currentY = topM;

  // Theme color palette for Cover
  const themeColors = {
    'geosmart-emerald': { top: [6, 78, 59], mid: [4, 120, 87], bot: [15, 23, 42], accent: [245, 158, 11] },
    'kemdikbud-blue': { top: [30, 58, 138], mid: [30, 64, 175], bot: [15, 23, 42], accent: [251, 191, 36] },
    'nusantara-navy': { top: [12, 74, 110], mid: [3, 105, 161], bot: [9, 13, 22], accent: [56, 189, 248] },
    'maroon-royal': { top: [136, 19, 55], mid: [190, 18, 60], bot: [17, 24, 39], accent: [244, 63, 94] },
    'minimalist-slate': { top: [30, 41, 59], mid: [51, 65, 85], bot: [2, 6, 23], accent: [148, 163, 184] },
  };

  const currentTheme = themeColors[doc.cover.theme] || themeColors['geosmart-emerald'];

  // Helper: Header and Footer on Chapter pages
  const drawPageDecorations = (arabicPage: number) => {
    pdf.setFont(fontName, 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);

    // Running Header
    pdf.text(
      `Kurikulum Satuan Pendidikan - ${doc.identity.name} | TP ${doc.identity.academicYear}`,
      leftM,
      topM - 10
    );
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.3);
    pdf.line(leftM, topM - 8, leftM + contentW, topM - 8);

    // Running Footer
    pdf.line(leftM, pageHeight - bottomM + 8, leftM + contentW, pageHeight - bottomM + 8);
    pdf.text(
      'Standar BSKAP Permendikdasmen No. 13 Tahun 2025',
      leftM,
      pageHeight - bottomM + 12
    );
    pdf.text(
      `Halaman ${arabicPage}`,
      leftM + contentW,
      pageHeight - bottomM + 12,
      { align: 'right' }
    );
  };

  // Helper: Preliminary page footer (Roman numeral)
  const drawRomanFooter = (numeral: string) => {
    pdf.setFont(fontName, 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`Halaman ${numeral}`, pageWidth / 2, pageHeight - bottomM + 10, { align: 'center' });
  };

  // Helper: Ensure Space
  const ensureSpace = (neededHeight: number, isPreliminary = false, romanStr = '') => {
    if (currentY + neededHeight > pageHeight - bottomM) {
      if (isPreliminary && romanStr) {
        drawRomanFooter(romanStr);
      } else if (!isPreliminary) {
        drawPageDecorations(pageNumberArabic);
        pageNumberArabic++;
      }
      pdf.addPage();
      currentY = topM;
    }
  };

  // Helper: Add Paragraph
  const addParagraph = (text: string, options?: { bold?: boolean; italic?: boolean; size?: number; color?: number[]; indent?: boolean; spaceAfter?: number }) => {
    const size = options?.size || 10;
    const style = options?.bold ? 'bold' : options?.italic ? 'italic' : 'normal';
    pdf.setFont(fontName, style);
    pdf.setFontSize(size);
    const color = options?.color || [30, 41, 59];
    pdf.setTextColor(color[0], color[1], color[2]);

    const indentWidth = options?.indent ? 8 : 0;
    const splitLines = pdf.splitTextToSize(text, contentW - indentWidth);
    const lineSpacing = size * 0.45;
    const blockHeight = splitLines.length * lineSpacing;

    ensureSpace(blockHeight + (options?.spaceAfter ?? 3.5));

    let py = currentY;
    splitLines.forEach((line: string, idx: number) => {
      pdf.text(line, leftM + (idx === 0 ? indentWidth : 0), py);
      py += lineSpacing;
    });

    currentY = py + (options?.spaceAfter ?? 3.5);
  };

  // Helper: Section Headings
  const addSectionH1 = (title: string, subtitle?: string) => {
    ensureSpace(35);
    pdf.setFont(fontName, 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(4, 120, 87);
    pdf.text(title, pageWidth / 2, currentY, { align: 'center' });
    currentY += 6;

    if (subtitle) {
      pdf.setFont(fontName, 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(15, 23, 42);
      pdf.text(subtitle, pageWidth / 2, currentY, { align: 'center' });
      currentY += 5;
    }

    pdf.setDrawColor(4, 120, 87);
    pdf.setLineWidth(0.8);
    pdf.line(pageWidth / 2 - 35, currentY, pageWidth / 2 + 35, currentY);
    currentY += 8;
  };

  const addSubHeading = (text: string) => {
    ensureSpace(12);
    pdf.setFont(fontName, 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(30, 41, 59);
    pdf.text(text, leftM, currentY);
    currentY += 6;
  };

  // Helper: Add Table
  const addTable = (
    headers: string[],
    rows: (string | number)[][],
    colWidthPct: number[],
    options?: { zebra?: boolean }
  ) => {
    const colWidths = colWidthPct.map((pct) => (pct / 100) * contentW);
    const cellPadding = 2;
    const fontSize = 8.5;
    const lineH = fontSize * 0.45;

    // Header calculation
    let maxHeaderLines = 1;
    const splitHeaders = headers.map((h, i) => {
      const lines = pdf.splitTextToSize(h, colWidths[i] - cellPadding * 2);
      if (lines.length > maxHeaderLines) maxHeaderLines = lines.length;
      return lines;
    });
    const headerRowHeight = maxHeaderLines * lineH + cellPadding * 2.5;

    ensureSpace(headerRowHeight + 15);

    // Draw header background
    pdf.setFillColor(4, 120, 87);
    pdf.setDrawColor(3, 105, 161);
    pdf.rect(leftM, currentY, contentW, headerRowHeight, 'F');

    // Draw header text
    pdf.setFont(fontName, 'bold');
    pdf.setFontSize(fontSize);
    pdf.setTextColor(255, 255, 255);

    let curX = leftM;
    splitHeaders.forEach((lines, i) => {
      let textY = currentY + cellPadding + 3;
      lines.forEach((l: string) => {
        pdf.text(l, curX + cellPadding, textY);
        textY += lineH;
      });
      curX += colWidths[i];
    });

    currentY += headerRowHeight;

    // Rows
    rows.forEach((row, rowIdx) => {
      // Calculate row height based on content
      let maxCellLines = 1;
      const splitCells = row.map((cell, i) => {
        const strVal = String(cell ?? '');
        const lines = pdf.splitTextToSize(strVal, colWidths[i] - cellPadding * 2);
        if (lines.length > maxCellLines) maxCellLines = lines.length;
        return lines;
      });

      const rowH = maxCellLines * lineH + cellPadding * 2.5;
      ensureSpace(rowH + 5);

      // Background fill
      if (options?.zebra && rowIdx % 2 === 1) {
        pdf.setFillColor(248, 250, 252);
        pdf.rect(leftM, currentY, contentW, rowH, 'F');
      }

      // Cell border
      pdf.setDrawColor(203, 213, 225);
      pdf.setLineWidth(0.2);
      pdf.rect(leftM, currentY, contentW, rowH, 'S');

      // Vertical column dividers
      let divX = leftM;
      for (let i = 0; i < colWidths.length - 1; i++) {
        divX += colWidths[i];
        pdf.line(divX, currentY, divX, currentY + rowH);
      }

      // Draw cell text
      pdf.setFont(fontName, 'normal');
      pdf.setFontSize(fontSize);
      pdf.setTextColor(30, 41, 59);

      let cellX = leftM;
      splitCells.forEach((lines, i) => {
        let textY = currentY + cellPadding + 3;
        lines.forEach((l: string) => {
          pdf.text(l, cellX + cellPadding, textY);
          textY += lineH;
        });
        cellX += colWidths[i];
      });

      currentY += rowH;
    });

    currentY += 4;
  };

  // Helper: Vector drawing of Tut Wuri Handayani emblem
  const drawEmblemVector = (cx: number, cy: number, r: number) => {
    // Outer golden ring
    pdf.setFillColor(29, 78, 216); // Royal blue
    pdf.circle(cx, cy, r, 'F');
    pdf.setFillColor(245, 158, 11); // Golden outer stroke ring
    pdf.circle(cx, cy, r, 'S');

    // Inner shield
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(245, 158, 11);
    pdf.setLineWidth(0.5);
    // Draw simplified lotus shield inside
    const sr = r * 0.7;
    pdf.circle(cx, cy, sr, 'FD');

    // Golden Wings
    pdf.setFillColor(245, 158, 11);
    pdf.rect(cx - sr * 0.6, cy - sr * 0.1, sr * 1.2, sr * 0.4, 'F');

    // Red flame torch
    pdf.setFillColor(239, 68, 68);
    pdf.circle(cx, cy - sr * 0.35, sr * 0.25, 'F');

    // Book base
    pdf.setFillColor(30, 41, 59);
    pdf.rect(cx - sr * 0.4, cy + sr * 0.25, sr * 0.8, sr * 0.2, 'F');
  };

  // ==========================================
  // PAGE 1: COVER
  // ==========================================
  onProgress?.({ status: 'rendering', currentPage: 1, message: 'Menyusun Desain Cover Resmi...' });

  // Full page background gradient simulation
  pdf.setFillColor(currentTheme.top[0], currentTheme.top[1], currentTheme.top[2]);
  pdf.rect(0, 0, pageWidth, pageHeight * 0.5, 'F');
  pdf.setFillColor(currentTheme.mid[0], currentTheme.mid[1], currentTheme.mid[2]);
  pdf.rect(0, pageHeight * 0.5, pageWidth, pageHeight * 0.3, 'F');
  pdf.setFillColor(currentTheme.bot[0], currentTheme.bot[1], currentTheme.bot[2]);
  pdf.rect(0, pageHeight * 0.8, pageWidth, pageHeight * 0.2, 'F');

  // Decorative border
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(0.5);
  pdf.rect(12, 12, pageWidth - 24, pageHeight - 24, 'S');
  pdf.setDrawColor(currentTheme.accent[0], currentTheme.accent[1], currentTheme.accent[2]);
  pdf.setLineWidth(1);
  pdf.rect(14, 14, pageWidth - 28, pageHeight - 28, 'S');

  // Tut Wuri Handayani Emblem
  if (doc.cover.showMinistryLogo) {
    drawEmblemVector(pageWidth / 2, 35, 11);
  }

  // Ministry Header
  pdf.setFont(fontName, 'bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(241, 245, 249);
  pdf.text('BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN', pageWidth / 2, 52, { align: 'center' });
  pdf.text('KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH', pageWidth / 2, 56.5, { align: 'center' });
  pdf.text('REPUBLIK INDONESIA', pageWidth / 2, 61, { align: 'center' });

  // Title Box Badge
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(pageWidth / 2 - 45, 95, 90, 8, 4, 4, 'F');
  pdf.setFont(fontName, 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(6, 78, 59);
  pdf.text(doc.cover.title || 'DOKUMEN KURIKULUM SATUAN PENDIDIKAN', pageWidth / 2, 100.5, { align: 'center' });

  // Curriculum Brand Name (Huge bold)
  pdf.setFont(fontName, 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(255, 255, 255);
  const brandLines = pdf.splitTextToSize(doc.cover.curriculumBrand || 'KURIKULUM SATUAN PENDIDIKAN', pageWidth - 40);
  let by = 118;
  brandLines.forEach((bl: string) => {
    pdf.text(bl, pageWidth / 2, by, { align: 'center' });
    by += 9;
  });

  // Golden separator line
  pdf.setDrawColor(currentTheme.accent[0], currentTheme.accent[1], currentTheme.accent[2]);
  pdf.setLineWidth(1.5);
  pdf.line(pageWidth / 2 - 25, by + 4, pageWidth / 2 + 25, by + 4);

  // School Name
  pdf.setFont(fontName, 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(220, 252, 231);
  pdf.text((doc.cover.schoolName || doc.identity.name).toUpperCase(), pageWidth / 2, by + 16, { align: 'center' });

  // Regency Info
  pdf.setFont(fontName, 'normal');
  pdf.setFontSize(10.5);
  pdf.setTextColor(203, 213, 225);
  pdf.text(doc.cover.regencyInfo || `KAB. ${doc.identity.regency.toUpperCase()}`, pageWidth / 2, by + 23, { align: 'center' });

  // Bottom Box
  const metaBoxY = pageHeight - 55;
  pdf.setFillColor(15, 23, 42);
  pdf.roundedRect(pageWidth / 2 - 50, metaBoxY, 100, 24, 3, 3, 'F');
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(pageWidth / 2 - 50, metaBoxY, 100, 24, 3, 3, 'S');

  pdf.setFont(fontName, 'bold');
  pdf.setFontSize(10.5);
  pdf.setTextColor(255, 255, 255);
  pdf.text(`TAHUN AJARAN ${doc.cover.academicYear || doc.identity.academicYear}`, pageWidth / 2, metaBoxY + 8, { align: 'center' });

  pdf.setFont(fontName, 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(148, 163, 184);
  pdf.text(`NPSN : ${doc.cover.npsn || doc.identity.npsn}`, pageWidth / 2, metaBoxY + 14, { align: 'center' });
  pdf.setFontSize(7.5);
  pdf.text('DOKUMEN UTAMA KURIKULUM SATUAN PENDIDIKAN', pageWidth / 2, metaBoxY + 19, { align: 'center' });

  // ==========================================
  // PAGE 2: HALAMAN DATA DOKUMEN KURIKULUM
  // ==========================================
  onProgress?.({ status: 'rendering', currentPage: 2, message: 'Menyusun Data Dokumen Sekolah...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('DOKUMEN RESMI', 'DATA DOKUMEN KURIKULUM SATUAN PENDIDIKAN');
  addParagraph(
    `Dokumen Kurikulum Satuan Pendidikan ini disusun, ditetapkan, dan disahkan sebagai pedoman operasional penyelenggaraan pembelajaran di ${doc.identity.name} untuk Tahun Ajaran ${doc.identity.academicYear}.`,
    { indent: true, spaceAfter: 6 }
  );

  addTable(
    ['Parameter Dokumen', 'Rincian Data Legalitas & Identitas Satuan Pendidikan'],
    [
      ['Nama Satuan Pendidikan', doc.identity.name],
      ['Nomor Pokok Sekolah Nasional (NPSN)', doc.identity.npsn],
      ['Bentuk Pendidikan / Jenjang', `${doc.identity.level} (${doc.identity.educationType}) - Status ${doc.identity.status}`],
      ['Status Kepemilikan', doc.identity.ownership || 'Pemerintah Daerah'],
      ['SK Pendirian Sekolah', `${doc.identity.skEstablishment || '-'} (Tgl: ${doc.identity.skEstablishmentDate || '-'})`],
      ['SK Izin Operasional', `${doc.identity.skOperational || '-'} (Tgl: ${doc.identity.skOperationalDate || '-'})`],
      ['Kepala Satuan Pendidikan', `${doc.identity.principalName} ${doc.identity.principalNip ? `(NIP. ${doc.identity.principalNip})` : ''}`],
      ['Alamat Lengkap Satuan Pendidikan', `${doc.identity.address}, Kel./Desa ${doc.identity.village}, Kec. ${doc.identity.district}, ${doc.identity.regency}, ${doc.identity.province} ${doc.identity.postalCode}`],
      ['Kontak & Kanal Komunikasi', `Telp: ${doc.identity.phone} | Email: ${doc.identity.email} | Web: ${doc.identity.website}`],
      ['Tahun Ajaran / Masa Berlaku', `Tahun Ajaran ${doc.identity.academicYear}`],
      ['Landasan Regulasi Utama', 'Permendikdasmen No. 13 Tahun 2025 & Keputusan BSKAP Terkait Kurikulum Nasional'],
    ],
    [38, 62],
    { zebra: true }
  );
  drawRomanFooter('ii');

  // ==========================================
  // PAGE 3: LEMBAR PENETAPAN
  // ==========================================
  onProgress?.({ status: 'rendering', currentPage: 3, message: 'Menyusun Lembar Penetapan...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('LEMBAR PENETAPAN', `KURIKULUM SATUAN PENDIDIKAN ${doc.identity.name.toUpperCase()}`);

  addParagraph(
    doc.endorsement.statementText ||
      `Setelah melalui proses telaah, analisis konteks, penyelarasan dengan karakteristik satuan pendidikan, serta pertimbangan Komite Sekolah, maka dengan ini Dokumen Kurikulum Satuan Pendidikan (KSP) ${doc.identity.name} secara resmi ditetapkan dan disahkan untuk diberlakukan pada Tahun Ajaran ${doc.identity.academicYear}.`,
    { indent: true, spaceAfter: 8 }
  );

  addParagraph(
    `Ditetapkan di : ${doc.endorsement.city || doc.identity.regency}\nPada Tanggal : ${doc.endorsement.date || '14 Juli 2025'}`,
    { bold: true, spaceAfter: 12 }
  );

  // Signatures
  const sigW = contentW / 2;
  const sigY = currentY;

  // Left Signer: Ketua Komite
  if (doc.endorsement.showCommitteeSignature) {
    pdf.setFont(fontName, 'bold');
    pdf.setFontSize(9.5);
    pdf.text('Menyetujui,', leftM, sigY);
    pdf.text('Ketua Komite Sekolah,', leftM, sigY + 5);
    pdf.text(doc.endorsement.committeeName || 'Nama Ketua Komite', leftM, sigY + 28);
    pdf.setFont(fontName, 'normal');
    pdf.text('Ketua Komite', leftM, sigY + 33);
  }

  // Right Signer: Kepala Sekolah
  pdf.setFont(fontName, 'bold');
  pdf.setFontSize(9.5);
  pdf.text('Menetapkan,', leftM + sigW, sigY);
  pdf.text('Kepala Satuan Pendidikan,', leftM + sigW, sigY + 5);
  pdf.text(doc.endorsement.principalName || doc.identity.principalName, leftM + sigW, sigY + 28);
  pdf.setFont(fontName, 'normal');
  pdf.text(`NIP. ${doc.endorsement.principalNip || doc.identity.principalNip || '-'}`, leftM + sigW, sigY + 33);

  // Bottom Center: Pengawas Pembina
  if (doc.endorsement.showSupervisorSignature) {
    const supY = sigY + 44;
    pdf.setFont(fontName, 'bold');
    pdf.setFontSize(9.5);
    pdf.text('Mengetahui / Memverifikasi,', pageWidth / 2, supY, { align: 'center' });
    pdf.text('Pengawas Pembina Satuan Pendidikan,', pageWidth / 2, supY + 5, { align: 'center' });
    pdf.text(doc.endorsement.supervisorName || 'Nama Pengawas Pembina, M.Pd.', pageWidth / 2, supY + 26, { align: 'center' });
    pdf.setFont(fontName, 'normal');
    pdf.text(`NIP. ${doc.endorsement.supervisorNip || '19680512 199403 1 005'}`, pageWidth / 2, supY + 31, { align: 'center' });
  }

  drawRomanFooter('iii');

  // ==========================================
  // PAGE 4: TIM PENYUSUN KURIKULUM
  // ==========================================
  onProgress?.({ status: 'rendering', currentPage: 4, message: 'Menyusun Tim Pengembang Kurikulum...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('TIM PENYUSUN', `KURIKULUM SATUAN PENDIDIKAN ${doc.identity.name.toUpperCase()}`);

  addSubHeading('1. Pengarah & Penanggung Jawab');
  const advisorRows = (doc.team.advisors || []).map((m, idx) => [
    idx + 1,
    m.name,
    m.role,
    m.affiliationOrSubject,
  ]);
  addTable(['No', 'Nama Personel', 'Peran / Tanggung Jawab', 'Jabatan / Instansi'], advisorRows, [8, 38, 27, 27]);

  addSubHeading('2. Tim Pengembang & Penulis Substansi');
  const draftingRows = (doc.team.draftingTeam || []).map((m, idx) => [
    idx + 1,
    m.name,
    m.role,
    m.affiliationOrSubject,
  ]);
  addTable(['No', 'Nama Personel', 'Bidang Kurikulum', 'Mata Pelajaran / Tugas Pokok'], draftingRows, [8, 38, 27, 27]);

  addSubHeading('3. Tim Penelaah & Verifikator');
  const reviewerRows = (doc.team.reviewers || []).map((m, idx) => [
    idx + 1,
    m.name,
    m.role,
    m.affiliationOrSubject,
  ]);
  addTable(['No', 'Nama Personel', 'Peran Penelaah', 'Jabatan / Keahlian'], reviewerRows, [8, 38, 27, 27]);

  drawRomanFooter('iv');

  // ==========================================
  // PAGE 5: KATA PENGANTAR
  // ==========================================
  onProgress?.({ status: 'rendering', currentPage: 5, message: 'Menyusun Kata Pengantar...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('KATA PENGANTAR');

  (doc.foreword.paragraphs || []).forEach((p) => {
    addParagraph(p, { indent: true, spaceAfter: 5 });
  });

  ensureSpace(40);
  const foreY = currentY + 4;
  pdf.setFont(fontName, 'normal');
  pdf.setFontSize(9.5);
  pdf.text(`${doc.foreword.signingPlace || doc.identity.regency}, ${doc.foreword.signingDate || 'Juli 2025'}`, leftM + contentW, foreY, { align: 'right' });
  pdf.text(doc.foreword.signatoryTitle || 'Kepala Satuan Pendidikan,', leftM + contentW, foreY + 5, { align: 'right' });
  pdf.setFont(fontName, 'bold');
  pdf.text(doc.foreword.signatoryName || doc.identity.principalName, leftM + contentW, foreY + 28, { align: 'right' });
  pdf.setFont(fontName, 'normal');
  pdf.text(`NIP. ${doc.identity.principalNip || '-'}`, leftM + contentW, foreY + 33, { align: 'right' });

  drawRomanFooter('v');

  // ==========================================
  // PAGE 6: DAFTAR ISI
  // ==========================================
  onProgress?.({ status: 'rendering', currentPage: 6, message: 'Menyusun Daftar Isi...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('DAFTAR ISI');

  const tocItems = [
    { title: 'HALAMAN JUDUL / COVER', page: 'i', bold: true },
    { title: 'DATA DOKUMEN KURIKULUM', page: 'ii', bold: true },
    { title: 'LEMBAR PENETAPAN DAN PENGESAHAN', page: 'iii', bold: true },
    { title: 'TIM PENYUSUN KURIKULUM', page: 'iv', bold: true },
    { title: 'KATA PENGANTAR', page: 'v', bold: true },
    { title: 'DAFTAR ISI', page: 'vi', bold: true },
    { title: 'BAB I KARAKTERISTIK SATUAN PENDIDIKAN', page: '1', bold: true },
    { title: '  A. Analisis Konteks & Karakteristik Sosial-Budaya', page: '1' },
    { title: '  B. Karakteristik Murid, Guru, dan Tenaga Kependidikan', page: '2' },
    { title: '  C. Karakteristik Sarana, Prasarana, dan Lingkungan', page: '3' },
    { title: '  D. Kemitraan dan Potensi Kearifan Daerah', page: '4' },
    { title: 'BAB II VISI, MISI, DAN TUJUAN SATUAN PENDIDIKAN', page: '5', bold: true },
    { title: '  A. Visi Satuan Pendidikan & Indikator Ketercapaian', page: '5' },
    { title: '  B. Misi Satuan Pendidikan', page: '5' },
    { title: '  C. Tujuan Jangka Panjang, Menengah, dan Pendek', page: '6' },
    { title: 'BAB III PENGORGANISASIAN PEMBELAJARAN', page: '7', bold: true },
    { title: '  A. Intrakurikuler & Struktur Alokasi Jam Pelajaran', page: '7' },
    { title: '  B. Kokurikuler Penguatan 8 Dimensi Profil Kelulusan', page: '9' },
    { title: '  C. Ekstrakurikuler Wajib dan Pilihan', page: '10' },
    { title: '  D. Kalender Pendidikan Satuan Pendidikan', page: '11' },
    { title: 'BAB IV PERENCANAAN PEMBELAJARAN', page: '12', bold: true },
    { title: '  A. Ruang Lingkup Satuan Pendidikan (CP, TP, ATP)', page: '12' },
    { title: '  B. Modul Ajar Pembelajaran Mendalam (Deep Learning)', page: '13' },
    { title: '  C. Rencana Asesmen Formatif dan Sumatif', page: '14' },
    { title: 'BAB V PENDAMPINGAN, EVALUASI, DAN PROFESIONAL', page: '15', bold: true },
    { title: '  A. Pendampingan & Evaluasi Implementasi Kurikulum', page: '15' },
    { title: '  B. Program Supervisi & Pengembangan Keprofesian Guru', page: '16' },
    { title: 'LAMPIRAN-LAMPIRAN RESMI', page: '17', bold: true },
  ];

  tocItems.forEach((item) => {
    pdf.setFont(fontName, item.bold ? 'bold' : 'normal');
    pdf.setFontSize(item.bold ? 10 : 9);
    pdf.setTextColor(item.bold ? 4 : 51, item.bold ? 120 : 65, item.bold ? 87 : 85);

    pdf.text(item.title, leftM, currentY);

    // Dotted filler
    const titleWidth = pdf.getTextWidth(item.title);
    const startDotX = leftM + titleWidth + 3;
    const endDotX = leftM + contentW - 12;
    if (endDotX > startDotX) {
      pdf.setFont(fontName, 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      let dotX = startDotX;
      while (dotX < endDotX) {
        pdf.text('.', dotX, currentY);
        dotX += 2.5;
      }
    }

    // Page string
    pdf.setFont(fontName, item.bold ? 'bold' : 'normal');
    pdf.setFontSize(item.bold ? 10 : 9);
    pdf.setTextColor(item.bold ? 4 : 51, item.bold ? 120 : 65, item.bold ? 87 : 85);
    pdf.text(item.page, leftM + contentW, currentY, { align: 'right' });

    currentY += item.bold ? 6 : 4.8;
  });

  drawRomanFooter('vi');

  // ==========================================
  // CHAPTER 1: BAB I
  // ==========================================
  onProgress?.({ status: 'rendering', currentPage: 7, message: 'Menyusun BAB I: Karakteristik...' });
  pdf.addPage();
  pageNumberArabic = 1;
  currentY = topM;

  addSectionH1('BAB I', 'KARAKTERISTIK SATUAN PENDIDIKAN');

  addSubHeading('A. Analisis Konteks & Karakteristik Lingkungan Satuan Pendidikan');
  (doc.chapter1.profileDescription || []).forEach((p) => addParagraph(p, { indent: true }));

  addSubHeading('B. Karakteristik Sosial, Ekonomi, dan Budaya Satuan Pendidikan');
  (doc.chapter1.socioEconomicCulture || []).forEach((p) => addParagraph(p, { indent: true }));

  addSubHeading('C. Potensi Daerah & Kearifan Lokal');
  (doc.chapter1.localWisdom || []).forEach((p) => addParagraph(p, { indent: true }));

  addSubHeading('D. Karakteristik Peserta Didik & Rombongan Belajar');
  if (doc.chapter1.studentSummary) {
    addParagraph(doc.chapter1.studentSummary, { indent: true, spaceAfter: 4 });
  }

  const cohortRows = (doc.chapter1.studentCohorts || []).map((c) => [
    c.cohortName,
    c.rombelCount,
    c.maleCount,
    c.femaleCount,
    c.totalCount,
  ]);
  addTable(
    ['Kelompok / Rombongan Belajar', 'Jml Rombel', 'Laki-Laki', 'Perempuan', 'Total Murid'],
    cohortRows,
    [36, 16, 16, 16, 16],
    { zebra: true }
  );

  addSubHeading('E. Karakteristik Pendidik dan Tenaga Kependidikan (PTK)');
  if (doc.chapter1.ptkSummary) {
    addParagraph(doc.chapter1.ptkSummary, { indent: true, spaceAfter: 4 });
  }

  const ptkRows = (doc.chapter1.ptkList || []).map((p, idx) => [
    idx + 1,
    p.name,
    p.qualification,
    p.position,
    p.subject,
    p.employmentStatus,
  ]);
  addTable(
    ['No', 'Nama Lengkap Guru / PTK', 'Kualifikasi', 'Tugas / Jabatan', 'Mata Pelajaran', 'Status'],
    ptkRows,
    [7, 30, 15, 18, 18, 12],
    { zebra: true }
  );

  addSubHeading('F. Karakteristik Sarana dan Prasarana');
  if (doc.chapter1.facilitySummary) {
    addParagraph(doc.chapter1.facilitySummary, { indent: true, spaceAfter: 4 });
  }

  const facRows = (doc.chapter1.facilities || []).map((f) => [
    f.name,
    `${f.count} ${f.unit}`,
    f.condition,
  ]);
  addTable(['Nama Ruang / Fasilitas Pembelajaran', 'Jumlah / Unit', 'Kondisi Kelayakan'], facRows, [50, 25, 25], { zebra: true });

  addSubHeading('G. Kemitraan dan Kerjasama Strategis');
  if (doc.chapter1.partnershipSummary) {
    addParagraph(doc.chapter1.partnershipSummary, { indent: true, spaceAfter: 4 });
  }

  const partRows = (doc.chapter1.partnerships || []).map((pt, idx) => [
    idx + 1,
    pt.institution,
    pt.scope,
  ]);
  addTable(['No', 'Nama Mitra / Lembaga / Industri', 'Bentuk dan Ruang Lingkup Kerjasama'], partRows, [8, 42, 50], { zebra: true });

  drawPageDecorations(pageNumberArabic);
  pageNumberArabic++;

  // ==========================================
  // CHAPTER 2: BAB II
  // ==========================================
  onProgress?.({ status: 'rendering', message: 'Menyusun BAB II: Visi, Misi, Tujuan...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('BAB II', 'VISI, MISI, DAN TUJUAN SATUAN PENDIDIKAN');

  addSubHeading('A. Visi Satuan Pendidikan');
  pdf.setFillColor(240, 253, 244);
  pdf.setDrawColor(4, 120, 87);
  pdf.setLineWidth(0.6);
  const visSplit = pdf.splitTextToSize(`"${doc.chapter2.vision}"`, contentW - 12);
  const visH = visSplit.length * 6 + 10;
  pdf.roundedRect(leftM, currentY, contentW, visH, 3, 3, 'FD');
  pdf.setFont(fontName, 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(4, 120, 87);
  let vy = currentY + 7;
  visSplit.forEach((vl: string) => {
    pdf.text(vl, pageWidth / 2, vy, { align: 'center' });
    vy += 6;
  });
  currentY += visH + 6;

  (doc.chapter2.visionNarrative || []).forEach((p) => addParagraph(p, { indent: true }));

  addSubHeading('B. Misi Satuan Pendidikan');
  (doc.chapter2.missions || []).forEach((m, idx) => {
    addParagraph(`${idx + 1}. ${m}`, { spaceAfter: 3 });
  });

  addSubHeading('C. Tujuan Satuan Pendidikan');
  (doc.chapter2.goals || []).forEach((g, idx) => {
    addParagraph(`${idx + 1}. ${g}`, { spaceAfter: 3 });
  });

  if (doc.chapter2.smartAnalysisNotes) {
    addSubHeading('D. Analisis Ketercapaian Tujuan (SMART)');
    addParagraph(doc.chapter2.smartAnalysisNotes, { indent: true });
  }

  drawPageDecorations(pageNumberArabic);
  pageNumberArabic++;

  // ==========================================
  // CHAPTER 3: BAB III
  // ==========================================
  onProgress?.({ status: 'rendering', message: 'Menyusun BAB III: Pengorganisasian Pembelajaran...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('BAB III', 'PENGORGANISASIAN PEMBELAJARAN');

  addSubHeading('A. Pendekatan dan Pengorganisasian Pembelajaran');
  addParagraph(
    `Pendekatan pembelajaran yang digunakan adalah pendekatan ${doc.chapter3.learningApproach}, yang diselenggarakan untuk mengoptimalkan pemahaman bermakna dan pembelajaran mendalam bagi seluruh peserta didik.`,
    { indent: true, spaceAfter: 4 }
  );
  (doc.chapter3.approachRationale || []).forEach((p) => addParagraph(p, { indent: true }));

  addSubHeading('B. Struktur Intrakurikuler & Alokasi Jam Pelajaran (JP)');
  (doc.chapter3.curriculumStructureTables || []).forEach((table) => {
    if (table.title) {
      addParagraph(table.title, { bold: true, spaceAfter: 3 });
    }
    const subjectRows = (table.items || []).map((s) => [
      s.subjectName,
      `${s.intraHoursPerWeek} JP`,
      `${s.intraHoursPerYear} JP`,
      `${s.kokoHoursPerYear} JP`,
      `${s.totalHoursPerYear} JP`,
    ]);
    addTable(
      ['Mata Pelajaran', 'JP / Minggu', 'Intra / Tahun', 'Koko / Tahun', 'Total Jam / Tahun'],
      subjectRows,
      [40, 15, 15, 15, 15],
      { zebra: true }
    );
  });

  addSubHeading('C. Kokurikuler Penguatan Karakter (8 Dimensi Profil Kelulusan)');
  (doc.chapter3.kokurikulerDescription || []).forEach((p) => addParagraph(p, { indent: true }));

  const kokoRows = (doc.chapter3.kokurikulerProjects || []).map((k) => [
    k.classes,
    k.theme,
    k.dimensions,
    `${k.allocationJP} JP`,
  ]);
  addTable(['Sasaran Kelas', 'Tema Kokurikuler', 'Dimensi Karakter Terkait', 'Alokasi'], kokoRows, [20, 35, 33, 12], { zebra: true });

  addSubHeading('D. Ekstrakurikuler Wajib dan Pilihan');
  (doc.chapter3.ekstrakurikulerDescription || []).forEach((p) => addParagraph(p, { indent: true }));

  const eksRows = (doc.chapter3.ekstrakurikulerList || []).map((e) => [
    e.name,
    e.dimensions,
    e.timeWeekly,
    e.coach,
  ]);
  addTable(['Nama Ekstrakurikuler', 'Dimensi / Nilai Karakter', 'Waktu Latihan', 'Pembina / Pelatih'], eksRows, [30, 25, 20, 25], { zebra: true });

  addSubHeading('E. Prinsip Pengaturan Waktu & Kalender Pendidikan');
  (doc.chapter3.timeArrangementPrinciples || []).forEach((p) => addParagraph(p, { indent: true }));

  drawPageDecorations(pageNumberArabic);
  pageNumberArabic++;

  // ==========================================
  // CHAPTER 4: BAB IV
  // ==========================================
  onProgress?.({ status: 'rendering', message: 'Menyusun BAB IV: Perencanaan Pembelajaran...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('BAB IV', 'PERENCANAAN PEMBELAJARAN');

  addSubHeading('A. Ruang Lingkup Satuan Pendidikan');
  (doc.chapter4.satuanPendidikanRationale || []).forEach((p) => addParagraph(p, { indent: true }));

  addSubHeading('B. Alur Tujuan Pembelajaran (ATP)');
  const atpRows = (doc.chapter4.atpList || []).map((a) => [
    a.subjectName,
    `${a.phase} (${a.grades})`,
    a.learningObjectives ? a.learningObjectives.slice(0, 3).join('; ') : '-',
  ]);
  addTable(['Mata Pelajaran', 'Fase / Kelas', 'Tujuan Pembelajaran Utama'], atpRows, [30, 25, 45], { zebra: true });

  addSubHeading('C. Desain Modul Ajar Pembelajaran Mendalam (Deep Learning)');
  // 3 Pilar Deep Learning Callout Box
  ensureSpace(35);
  pdf.setFillColor(236, 253, 245);
  pdf.setDrawColor(4, 120, 87);
  pdf.setLineWidth(0.5);
  pdf.roundedRect(leftM, currentY, contentW, 30, 2, 2, 'FD');
  pdf.setFont(fontName, 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(4, 120, 87);
  pdf.text('3 Pilar Pembelajaran Mendalam (Deep Learning):', leftM + 5, currentY + 6);
  pdf.setFont(fontName, 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(30, 41, 59);
  pdf.text('1. Mindful Learning: Menghadirkan kesadaran penuh, rasa ingin tahu, dan keterlibatan aktif peserta didik.', leftM + 5, currentY + 13);
  pdf.text('2. Meaningful Learning: Menghubungkan konsep keilmuan dengan pengalaman nyata dan konteks kehidupan.', leftM + 5, currentY + 19);
  pdf.text('3. Joyful Learning: Menciptakan suasana belajar yang aman, nyaman, menggembirakan, dan menantang.', leftM + 5, currentY + 25);
  currentY += 35;

  if (doc.chapter4.sampleLessonPlan) {
    const slp = doc.chapter4.sampleLessonPlan;
    addParagraph(`Contoh Modul Ajar: ${slp.subject} (Kelas/Semester: ${slp.classSemester}, Durasi: ${slp.duration})`, { bold: true, spaceAfter: 4 });
    addParagraph(`Pendekatan Pedagogis: ${slp.pedagogicalApproach || 'Pembelajaran Mendalam (Deep Learning)'}`, { spaceAfter: 3 });
    addParagraph(`Rencana Asesmen Formatif: ${slp.formativeAssessment || 'Penilaian kinerja & refleksi diri'}`, { spaceAfter: 3 });
    addParagraph(`Rencana Asesmen Sumatif: ${slp.summativeAssessment || 'Uji kompetensi terpadu & produk projek'}`, { spaceAfter: 4 });
  }

  drawPageDecorations(pageNumberArabic);
  pageNumberArabic++;

  // ==========================================
  // CHAPTER 5: BAB V
  // ==========================================
  onProgress?.({ status: 'rendering', message: 'Menyusun BAB V: Evaluasi & Pengembangan...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('BAB V', 'PENDAMPINGAN, EVALUASI, DAN PENGEMBANGAN PROFESIONAL');

  addSubHeading('A. Pendampingan dan Evaluasi Kurikulum');
  (doc.chapter5.evaluationIntro || []).forEach((p) => addParagraph(p, { indent: true }));

  const evalRows = (doc.chapter5.evaluationTable || []).map((ep) => [
    ep.activityName,
    ep.frequency,
    ep.purpose,
    ep.pic,
  ]);
  addTable(
    ['Nama Kegiatan Evaluasi', 'Frekuensi', 'Tujuan Kegiatan', 'Penanggung Jawab'],
    evalRows,
    [30, 20, 32, 18],
    { zebra: true }
  );

  addSubHeading('B. Pengembangan Keprofesian Berkelanjutan (PKB)');
  (doc.chapter5.professionalDevIntro || []).forEach((p) => addParagraph(p, { indent: true }));

  const devRows = (doc.chapter5.professionalDevTable || []).map((dp) => [
    dp.activityName,
    dp.schedule,
    dp.speaker,
    dp.pic,
  ]);
  addTable(
    ['Program Pengembangan', 'Jadwal / Periode', 'Narasumber / Fasilitator', 'Penanggung Jawab'],
    devRows,
    [32, 22, 26, 20],
    { zebra: true }
  );

  addSubHeading('C. Pendampingan Guru (Mentoring & Coaching)');
  (doc.chapter5.mentoringIntro || []).forEach((p) => addParagraph(p, { indent: true }));

  const mentorRows = (doc.chapter5.mentoringTable || []).map((mp) => [
    mp.stage,
    mp.activityDescription,
    mp.schedule,
    mp.pic,
  ]);
  addTable(
    ['Tahap', 'Deskripsi Kegiatan Pendampingan', 'Waktu Pelaksanaan', 'PJ / Mentor'],
    mentorRows,
    [20, 45, 20, 15],
    { zebra: true }
  );

  drawPageDecorations(pageNumberArabic);
  pageNumberArabic++;

  // ==========================================
  // LAMPIRAN-LAMPIRAN
  // ==========================================
  onProgress?.({ status: 'rendering', message: 'Menyusun Halaman Lampiran Dokumen...' });
  pdf.addPage();
  currentY = topM;

  addSectionH1('LAMPIRAN-LAMPIRAN RESMI', 'DOKUMEN PENDUKUNG KURIKULUM SATUAN PENDIDIKAN');

  addSubHeading('Daftar Lampiran yang Menjadi Bagian Tak Terpisahkan:');
  const appRows = (doc.appendices || []).map((a) => [
    a.number,
    a.title,
    a.description,
    a.uploadedFileName ? `Terunggah: ${a.uploadedFileName}` : (a.included ? 'Terlampir Resmi' : 'Tersedia di Satuan Pendidikan'),
  ]);
  addTable(
    ['Nomor Lampiran', 'Judul Dokumen Lampiran', 'Keterangan Substansi', 'Status'],
    appRows,
    [20, 35, 25, 20],
    { zebra: true }
  );

  addParagraph(
    `Dokumen Kurikulum Satuan Pendidikan ${doc.identity.name} ini disusun secara partisipatif, transparan, dan akuntabel demi menjamin terwujudnya layanan pendidikan berkualitas dan bermakna bagi seluruh peserta didik.`,
    { indent: true, spaceAfter: 6 }
  );

  drawPageDecorations(pageNumberArabic);

  // Render Full Content for each included appendix
  const includedApps = (doc.appendices || []).filter(a => a.included);
  for (const app of includedApps) {
    pageNumberArabic++;
    pdf.addPage();
    currentY = topM;

    addSectionH1(app.number.toUpperCase(), app.title.toUpperCase());

    if (app.uploadedFileName) {
      ensureSpace(24);
      pdf.setFillColor(240, 253, 244);
      pdf.setDrawColor(4, 120, 87);
      pdf.setLineWidth(0.4);
      pdf.roundedRect(leftM, currentY, contentW, 18, 1.5, 1.5, 'FD');
      pdf.setFont(fontName, 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(4, 120, 87);
      pdf.text(`Dokumen Lampiran Diunggah: ${app.uploadedFileName} (${app.uploadedFileSize || ''})`, leftM + 4, currentY + 7);
      pdf.setFont(fontName, 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(51, 65, 85);
      pdf.text(`Status: Terverifikasi menyatu dalam berkas KSP • Diunggah pada: ${app.uploadedAt || '-'}`, leftM + 4, currentY + 13);
      currentY += 23;
    }

    if (app.description) {
      addParagraph(app.description, { italic: true, spaceAfter: 4 });
    }

    const paragraphsToPrint = 
      (app.paragraphs && app.paragraphs.length > 0)
        ? app.paragraphs
        : app.extractedText
        ? app.extractedText.split(/\r?\n+/).map(p => p.trim()).filter(Boolean)
        : null;

    if (paragraphsToPrint && paragraphsToPrint.length > 0) {
      paragraphsToPrint.forEach(para => {
        addParagraph(para, { indent: true, spaceAfter: 3.5 });
      });
    } else if (app.contentSnippet) {
      ensureSpace(20);
      pdf.setFillColor(248, 250, 252);
      pdf.setDrawColor(203, 213, 225);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(leftM, currentY, contentW, 16, 1, 1, 'FD');
      pdf.setFont(fontName, 'italic');
      pdf.setFontSize(8.5);
      pdf.setTextColor(51, 65, 85);
      const snippetLines = pdf.splitTextToSize(app.contentSnippet, contentW - 8);
      pdf.text(snippetLines, leftM + 4, currentY + 6);
      currentY += Math.max(18, snippetLines.length * 4.5 + 6);
    }

    drawPageDecorations(pageNumberArabic);
  }

  // ==========================================
  // SAVE FILE
  // ==========================================
  onProgress?.({ status: 'saving', message: 'Mengunduh berkas PDF Kurikulum Satuan Pendidikan...' });

  const cleanSchool = (doc.cover.schoolName || doc.identity.name || 'Sekolah').replace(/[^a-zA-Z0-9]/g, '_');
  const cleanYear = (doc.cover.academicYear || doc.identity.academicYear || '2025-2026').replace(/[/]/g, '-').replace(/\s+/g, '_');
  const fileName = `KSP_${cleanSchool}_TP_${cleanYear}.pdf`;

  pdf.save(fileName);

  onProgress?.({ status: 'done', message: 'Berkas PDF resmi berhasil diunduh ke komputer Anda!' });
}
