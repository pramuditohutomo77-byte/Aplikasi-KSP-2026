import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  PageBreak,
  Footer,
  PageNumber,
  ShadingType,
  VerticalAlign,
} from 'docx';
import { saveAs } from 'file-saver';
import { KSPDocument } from '../types/ksp';
import { calculateKspPageStructure } from './pageCalculator';

export async function exportKspToWord(doc: KSPDocument): Promise<void> {
  const pageCalc = calculateKspPageStructure(doc);
  const { margins, paperSize, fontFamily, fontSize, lineHeight } = doc.printSettings;

  // Paper Dimensions in twips (1 cm = ~567 twips, 1 inch = 1440 twips)
  // A4: 210 x 297 mm = 11906 x 16838 twips
  // F4 / Folio: 215 x 330 mm = 12189 x 18708 twips
  // Letter: 216 x 279 mm = 12240 x 15840 twips
  let pageWidthTwips = 11906;
  let pageHeightTwips = 16838;
  if (paperSize === 'F4') {
    pageWidthTwips = 12189;
    pageHeightTwips = 18708;
  } else if (paperSize === 'Letter') {
    pageWidthTwips = 12240;
    pageHeightTwips = 15840;
  }

  // Margin conversion to twips
  const topMargin = Math.round(margins.top * 567);
  const bottomMargin = Math.round(margins.bottom * 567);
  const leftMargin = Math.round(margins.left * 567);
  const rightMargin = Math.round(margins.right * 567);

  const baseFont = fontFamily === 'Times New Roman' ? 'Times New Roman' : fontFamily || 'Calibri';
  const baseSize = fontSize === '11pt' ? 22 : 24; // in half-points

  // Line spacing: 240 is single, 276 is 1.15, 300 is 1.25, 360 is 1.5
  const lineSpacing = lineHeight === '1.5' ? 360 : lineHeight === '1.25' ? 300 : 276;

  // Reusable styling helpers
  const brandEmerald = '047857';
  const darkSlate = '1E293B';
  const tableHeaderBg = '047857';
  const tableHeaderLightBg = 'F1F5F9';
  const tableRowAltBg = 'F8FAFC';
  const lightGreenBg = 'ECFDF5';
  const borderColor = '94A3B8';

  const defaultCellBorders = {
    top: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
    left: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
    right: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
  };

  const noBorders = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  // Helper to create body paragraphs
  const createP = (text: string, options?: { bold?: boolean; italic?: boolean; center?: boolean; indent?: boolean; spaceAfter?: number; size?: number; color?: string }) => {
    return new Paragraph({
      alignment: options?.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
      spacing: {
        line: lineSpacing,
        after: options?.spaceAfter ?? 140,
      },
      indent: options?.indent ? { firstLine: 567 } : undefined, // 1cm indent
      children: [
        new TextRun({
          text,
          font: baseFont,
          size: options?.size ?? baseSize,
          bold: options?.bold,
          italics: options?.italic,
          color: options?.color ?? darkSlate,
        }),
      ],
    });
  };

  // Helper to create Headings
  const createH1 = (text: string, subtitle?: string) => {
    const children: TextRun[] = [
      new TextRun({
        text,
        font: baseFont,
        size: baseSize + 6,
        bold: true,
        color: brandEmerald,
      }),
    ];
    if (subtitle) {
      children.push(
        new TextRun({
          text: `\n${subtitle}`,
          font: baseFont,
          size: baseSize + 2,
          bold: true,
          color: darkSlate,
        })
      );
    }
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { before: 280, after: 200 },
      children,
    });
  };

  const createH2 = (text: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.LEFT,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text,
          font: baseFont,
          size: baseSize + 2,
          bold: true,
          color: brandEmerald,
        }),
      ],
    });
  };

  const createH3 = (text: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      alignment: AlignmentType.LEFT,
      spacing: { before: 180, after: 80 },
      children: [
        new TextRun({
          text,
          font: baseFont,
          size: baseSize,
          bold: true,
          color: darkSlate,
        }),
      ],
    });
  };

  const docChildren: any[] = [];

  // =========================================================================
  // 1. HALAMAN JUDUL / COVER
  // =========================================================================
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
      children: [
        new TextRun({
          text: 'BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN',
          font: baseFont,
          size: 20,
          bold: true,
          color: '475569',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: 'KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH',
          font: baseFont,
          size: 22,
          bold: true,
          color: '0F172A',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: 'REPUBLIK INDONESIA',
          font: baseFont,
          size: 20,
          bold: true,
          color: '475569',
        }),
      ],
    }),

    // Spacing
    new Paragraph({ spacing: { after: 400 }, children: [] }),

    // Title box
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'DOKUMEN UTAMA',
          font: baseFont,
          size: 20,
          bold: true,
          color: '059669',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: doc.cover.title,
          font: baseFont,
          size: 32,
          bold: true,
          color: brandEmerald,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 280 },
      children: [
        new TextRun({
          text: doc.cover.curriculumBrand,
          font: baseFont,
          size: 36,
          bold: true,
          color: '0F172A',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: doc.cover.schoolName,
          font: baseFont,
          size: 28,
          bold: true,
          color: brandEmerald,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [
        new TextRun({
          text: doc.cover.regencyInfo,
          font: baseFont,
          size: 22,
          bold: true,
          color: '475569',
        }),
      ],
    }),

    // Bottom Meta Card
    new Paragraph({ spacing: { after: 600 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: `TAHUN AJARAN ${doc.cover.academicYear}`,
          font: baseFont,
          size: 24,
          bold: true,
          color: '0F172A',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: `NPSN : ${doc.cover.npsn}`,
          font: baseFont,
          size: 22,
          color: '475569',
        }),
      ],
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 2. DATA DOKUMEN KURIKULUM (HALAMAN ii)
  // =========================================================================
  docChildren.push(
    createH1('DOKUMEN RESMI', 'DATA DOKUMEN KURIKULUM'),
    createP(doc.identity.name, { bold: true, center: true, spaceAfter: 200 }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        ['Nama Satuan Pendidikan', doc.identity.name],
        ['NPSN', doc.identity.npsn],
        ['Bentuk & Status Satuan', `${doc.identity.status} (${doc.identity.educationType}) - Jenjang ${doc.identity.level}`],
        ['Status Kepemilikan', doc.identity.ownership],
        ['SK Pendirian Sekolah', doc.identity.skEstablishment],
        ['Tanggal SK Pendirian', doc.identity.skEstablishmentDate],
        ['SK Izin Operasional', doc.identity.skOperational],
        ['Tanggal SK Operasional', doc.identity.skOperationalDate],
        ['Kepala Sekolah', `${doc.identity.principalName} ${doc.identity.principalNip ? `(NIP. ${doc.identity.principalNip})` : ''}`],
        ['Alamat Sekolah', `${doc.identity.address}, ${doc.identity.village}, ${doc.identity.district}, ${doc.identity.regency}, ${doc.identity.province} ${doc.identity.postalCode}`],
        ['Kontak Resmi', `Telp: ${doc.identity.phone} | Email: ${doc.identity.email} | Web: ${doc.identity.website}`],
        ['Tahun Ajaran Berlaku', doc.identity.academicYear],
      ].map(([label, val], idx) => (
        new TableRow({
          children: [
            new TableCell({
              width: { size: 35, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              margins: { top: 120, bottom: 120, left: 140, right: 140 },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: label, font: baseFont, size: baseSize, bold: true })],
                }),
              ],
            }),
            new TableCell({
              width: { size: 65, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: idx % 2 === 1 ? tableRowAltBg : 'FFFFFF' },
              borders: defaultCellBorders,
              margins: { top: 120, bottom: 120, left: 140, right: 140 },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: val || '-', font: baseFont, size: baseSize })],
                }),
              ],
            }),
          ],
        })
      )),
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 3. LEMBAR PENETAPAN (HALAMAN iii)
  // =========================================================================
  docChildren.push(
    createH1('LEMBAR PENETAPAN'),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: `${doc.identity.curriculumName}\n${doc.identity.name}\nTAHUN AJARAN ${doc.identity.academicYear}`,
          font: baseFont,
          size: baseSize + 2,
          bold: true,
          color: darkSlate,
        }),
      ],
    }),
    createP(doc.endorsement.statementText, { indent: true, spaceAfter: 300 }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: noBorders,
              children: doc.endorsement.showCommitteeSignature ? [
                createP('Mengetahui,', { spaceAfter: 40 }),
                createP('Ketua Komite Sekolah,', { bold: true, spaceAfter: 500 }),
                createP(doc.endorsement.committeeName, { bold: true, spaceAfter: 0 }),
              ] : [new Paragraph({})],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: noBorders,
              children: [
                createP(`Ditetapkan di : ${doc.endorsement.city}`, { spaceAfter: 40 }),
                createP(`Pada tanggal : ${doc.endorsement.date}`, { spaceAfter: 40 }),
                createP('Kepala Sekolah,', { bold: true, spaceAfter: 500 }),
                createP(doc.endorsement.principalName, { bold: true, spaceAfter: 40 }),
                createP(doc.endorsement.principalNip ? `NIP. ${doc.endorsement.principalNip}` : '', { size: 20 }),
              ],
            }),
          ],
        }),
        ...(doc.endorsement.showSupervisorSignature ? [
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 2,
                borders: noBorders,
                children: [
                  new Paragraph({ spacing: { before: 300 }, children: [] }),
                  createP('Mengesahkan / Mengetahui:', { center: true, spaceAfter: 40 }),
                  createP('Pengawas Satuan Pendidikan,', { bold: true, center: true, spaceAfter: 500 }),
                  createP(doc.endorsement.supervisorName, { bold: true, center: true, spaceAfter: 40 }),
                  createP(doc.endorsement.supervisorNip ? `NIP. ${doc.endorsement.supervisorNip}` : '', { center: true, size: 20 }),
                ],
              }),
            ],
          }),
        ] : []),
      ],
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 4. TIM PENYUSUN KURIKULUM (HALAMAN iv)
  // =========================================================================
  const createTeamTable = (members: Array<{ name: string; role: string; affiliationOrSubject: string }>) => {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['Nama Lengkap & Gelar', 'Peran / Tugas', 'Instansi / Mapel'].map((header, idx) => (
            new TableCell({
              width: { size: idx === 0 ? 40 : 30, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: header, font: baseFont, size: baseSize, bold: true })] })],
            })
          )),
        }),
        ...members.map((m, idx) => (
          new TableRow({
            children: [
              new TableCell({
                borders: defaultCellBorders,
                shading: { type: ShadingType.CLEAR, fill: idx % 2 === 1 ? tableRowAltBg : 'FFFFFF' },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: m.name, font: baseFont, size: baseSize, bold: true })] })],
              }),
              new TableCell({
                borders: defaultCellBorders,
                shading: { type: ShadingType.CLEAR, fill: idx % 2 === 1 ? tableRowAltBg : 'FFFFFF' },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: m.role, font: baseFont, size: baseSize })] })],
              }),
              new TableCell({
                borders: defaultCellBorders,
                shading: { type: ShadingType.CLEAR, fill: idx % 2 === 1 ? tableRowAltBg : 'FFFFFF' },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: m.affiliationOrSubject, font: baseFont, size: baseSize })] })],
              }),
            ],
          })
        )),
      ],
    });
  };

  docChildren.push(
    createH1('TIM PENYUSUN KURIKULUM'),
    createP(`${doc.identity.curriculumName} ${doc.identity.name}`, { bold: true, center: true, spaceAfter: 180 }),
    createH2('A. Penanggung Jawab & Pengarah'),
    createTeamTable(doc.team.advisors),
    createH2('B. Tim Pengembang Kurikulum Satuan Pendidikan'),
    createTeamTable(doc.team.draftingTeam),
    createH2('C. Penelaah Kurikulum'),
    createTeamTable(doc.team.reviewers),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 5. KATA PENGANTAR (HALAMAN v)
  // =========================================================================
  docChildren.push(
    createH1('KATA PENGANTAR'),
    ...doc.foreword.paragraphs.map(p => createP(p, { indent: true, spaceAfter: 160 })),
    new Paragraph({ spacing: { before: 300 }, children: [] }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({ width: { size: 55, type: WidthType.PERCENTAGE }, borders: noBorders, children: [new Paragraph({})] }),
            new TableCell({
              width: { size: 45, type: WidthType.PERCENTAGE },
              borders: noBorders,
              children: [
                createP(`${doc.foreword.signingPlace}, ${doc.foreword.signingDate}`, { spaceAfter: 40 }),
                createP(doc.foreword.signatoryTitle, { bold: true, spaceAfter: 500 }),
                createP(doc.foreword.signatoryName, { bold: true, spaceAfter: 0 }),
              ],
            }),
          ],
        }),
      ],
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 6. DAFTAR ISI (HALAMAN vi)
  // =========================================================================
  docChildren.push(
    createH1('DAFTAR ISI'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: pageCalc.items.map(item => (
        new TableRow({
          children: [
            new TableCell({
              width: { size: 85, type: WidthType.PERCENTAGE },
              borders: noBorders,
              margins: { top: 60, bottom: 60, left: item.level === 2 ? 240 : 0, right: 60 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${item.code ? `${item.code} ` : ''}${item.title}`,
                      font: baseFont,
                      size: baseSize,
                      bold: item.level === 1,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 15, type: WidthType.PERCENTAGE },
              borders: noBorders,
              margins: { top: 60, bottom: 60, left: 60, right: 0 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: String(item.pageNumber),
                      font: baseFont,
                      size: baseSize,
                      bold: item.level === 1,
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      )),
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 7. BAB I: KARAKTERISTIK SATUAN PENDIDIKAN
  // =========================================================================
  docChildren.push(
    createH1('BAB I', 'KARAKTERISTIK SATUAN PENDIDIKAN'),
    createH2('A. Profil Satuan Pendidikan'),
    ...doc.chapter1.profileDescription.map(p => createP(p, { indent: true })),

    createH2('B. Analisis Sosial, Ekonomi dan Budaya'),
    ...doc.chapter1.socioEconomicCulture.map(p => createP(p, { indent: true })),
    createH3('Kearifan Lokal dan Nilai Luhur:'),
    ...doc.chapter1.localWisdom.map(w => createP(`•  ${w}`, { spaceAfter: 80 })),

    createH2('C. Karakteristik Pendidik dan Tenaga Kependidikan'),
    createP(doc.chapter1.ptkSummary, { indent: true }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['No', 'Nama & Kualifikasi', 'Jabatan', 'Mata Pelajaran', 'Status'].map((h, i) => (
            new TableCell({
              width: { size: i === 0 ? 8 : i === 1 ? 32 : 20, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
            })
          )),
        }),
        ...doc.chapter1.ptkList.map((ptk, idx) => (
          new TableRow({
            children: [
              new TableCell({
                borders: defaultCellBorders,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${idx + 1}`, font: baseFont, size: 20 })] })],
              }),
              new TableCell({
                borders: defaultCellBorders,
                children: [
                  new Paragraph({ children: [new TextRun({ text: ptk.name, font: baseFont, size: 20, bold: true })] }),
                  new Paragraph({ children: [new TextRun({ text: ptk.qualification, font: baseFont, size: 18, color: '64748B' })] }),
                ],
              }),
              new TableCell({
                borders: defaultCellBorders,
                children: [new Paragraph({ children: [new TextRun({ text: ptk.position, font: baseFont, size: 20 })] })],
              }),
              new TableCell({
                borders: defaultCellBorders,
                children: [new Paragraph({ children: [new TextRun({ text: ptk.subject, font: baseFont, size: 20 })] })],
              }),
              new TableCell({
                borders: defaultCellBorders,
                children: [new Paragraph({ children: [new TextRun({ text: ptk.employmentStatus, font: baseFont, size: 20 })] })],
              }),
            ],
          })
        )),
      ],
    }),

    createH2('D. Karakteristik Peserta Didik'),
    createP(doc.chapter1.studentSummary, { indent: true }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['Rombongan Belajar', 'Jumlah Rombel', 'Laki-Laki', 'Perempuan', 'Total Siswa'].map(h => (
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
            })
          )),
        }),
        ...doc.chapter1.studentCohorts.map(sc => (
          new TableRow({
            children: [
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: sc.cohortName, font: baseFont, size: 20, bold: true })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${sc.rombelCount}`, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${sc.maleCount}`, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${sc.femaleCount}`, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${sc.totalCount}`, font: baseFont, size: 20, bold: true })] })] }),
            ],
          })
        )),
      ],
    }),

    createH2('E. Sarana dan Prasarana'),
    createP(doc.chapter1.facilitySummary, { indent: true }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['No', 'Nama Sarana / Prasarana', 'Jumlah & Satuan', 'Kondisi'].map((h, i) => (
            new TableCell({
              width: { size: i === 0 ? 8 : i === 1 ? 45 : 22, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
            })
          )),
        }),
        ...doc.chapter1.facilities.map((fac, idx) => (
          new TableRow({
            children: [
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${idx + 1}`, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: fac.name, font: baseFont, size: 20, bold: true })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${fac.count} ${fac.unit}`, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: fac.condition, font: baseFont, size: 20 })] })] }),
            ],
          })
        )),
      ],
    }),

    createH2('F. Analisis Kemitraan dan Kerjasama'),
    createP(doc.chapter1.partnershipSummary, { indent: true }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['No', 'Instansi Mitra', 'Bentuk Kerjasama & Kontribusi'].map((h, i) => (
            new TableCell({
              width: { size: i === 0 ? 8 : i === 1 ? 32 : 60, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
            })
          )),
        }),
        ...doc.chapter1.partnerships.map((p, idx) => (
          new TableRow({
            children: [
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${idx + 1}`, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: p.institution, font: baseFont, size: 20, bold: true })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: p.scope, font: baseFont, size: 20 })] })] }),
            ],
          })
        )),
      ],
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 8. BAB II: VISI, MISI, DAN TUJUAN
  // =========================================================================
  docChildren.push(
    createH1('BAB II', 'VISI, MISI, DAN TUJUAN SATUAN PENDIDIKAN'),
    createH2('A. Visi Satuan Pendidikan'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: lightGreenBg },
              borders: {
                left: { style: BorderStyle.SINGLE, size: 12, color: brandEmerald },
                top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
              },
              margins: { top: 140, bottom: 140, left: 180, right: 180 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `"${doc.chapter2.vision}"`,
                      font: baseFont,
                      size: baseSize + 2,
                      bold: true,
                      italics: true,
                      color: brandEmerald,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    ...doc.chapter2.visionNarrative.map(p => createP(p, { indent: true })),

    createH2('B. Misi Satuan Pendidikan'),
    ...doc.chapter2.missions.map((m, idx) => createP(`${idx + 1}.  ${m}`, { spaceAfter: 100 })),

    createH2('C. Tujuan Satuan Pendidikan'),
    ...doc.chapter2.goals.map((g, idx) => createP(`${idx + 1}.  ${g}`, { spaceAfter: 100 })),
    createP(doc.chapter2.smartAnalysisNotes, { italic: true, size: 20, spaceAfter: 140 }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 9. BAB III: PENGORGANISASIAN PEMBELAJARAN
  // =========================================================================
  docChildren.push(
    createH1('BAB III', 'PENGORGANISASIAN PEMBELAJARAN'),
    createH2('A. Intrakurikuler'),
    ...doc.chapter3.approachRationale.map(p => createP(p, { indent: true })),

    // Curriculum Structure Tables
    ...doc.chapter3.curriculumStructureTables.flatMap(tbl => {
      const totalIntraWeek = tbl.items.reduce((acc, curr) => acc + (Number(curr.intraHoursPerWeek) || 0), 0);
      const totalIntraYear = tbl.items.reduce((acc, curr) => acc + (Number(curr.intraHoursPerYear) || 0), 0);
      const totalKokoYear = tbl.items.reduce((acc, curr) => acc + (Number(curr.kokoHoursPerYear) || 0), 0);
      const grandTotalYear = tbl.items.reduce((acc, curr) => acc + (Number(curr.totalHoursPerYear) || 0), 0);

      return [
        createH3(tbl.title),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              tableHeader: true,
              children: ['Mata Pelajaran', 'Intra / Minggu', 'Intra / Tahun', 'Kokurikuler / Thn', 'Total JP / Thn'].map(h => (
                new TableCell({
                  shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
                  borders: defaultCellBorders,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
                })
              )),
            }),
            ...tbl.items.map(it => (
              new TableRow({
                children: [
                  new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: it.subjectName, font: baseFont, size: 20, bold: true })] })] }),
                  new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${it.intraHoursPerWeek}`, font: baseFont, size: 20 })] })] }),
                  new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${it.intraHoursPerYear}`, font: baseFont, size: 20 })] })] }),
                  new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${it.kokoHoursPerYear}`, font: baseFont, size: 20 })] })] }),
                  new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${it.totalHoursPerYear}`, font: baseFont, size: 20, bold: true })] })] }),
                ],
              })
            )),
            new TableRow({
              children: [
                new TableCell({ shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg }, borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Total Jam Pelajaran Wajib', font: baseFont, size: 20, bold: true })] })] }),
                new TableCell({ shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg }, borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totalIntraWeek} JP`, font: baseFont, size: 20, bold: true })] })] }),
                new TableCell({ shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg }, borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totalIntraYear} JP`, font: baseFont, size: 20, bold: true })] })] }),
                new TableCell({ shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg }, borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${totalKokoYear} JP`, font: baseFont, size: 20, bold: true })] })] }),
                new TableCell({ shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg }, borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${grandTotalYear} JP`, font: baseFont, size: 20, bold: true })] })] }),
              ],
            }),
          ],
        }),
      ];
    }),

    createH2('B. Kokurikuler (Penguatan 8 Dimensi Profil Lulusan)'),
    ...doc.chapter3.kokurikulerDescription.map(p => createP(p, { indent: true })),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['Kelas & Dimensi', 'Tema Proyek', 'Bentuk Aktivitas', 'Mapel Terkait', 'Alokasi'].map(h => (
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
            })
          )),
        }),
        ...doc.chapter3.kokurikulerProjects.map(proj => (
          new TableRow({
            children: [
              new TableCell({
                borders: defaultCellBorders,
                children: [
                  new Paragraph({ children: [new TextRun({ text: proj.classes, font: baseFont, size: 20, bold: true })] }),
                  new Paragraph({ children: [new TextRun({ text: proj.dimensions, font: baseFont, size: 18, color: '64748B' })] }),
                ],
              }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: proj.theme, font: baseFont, size: 20, bold: true, color: brandEmerald })] })] }),
              new TableCell({
                borders: defaultCellBorders,
                children: [
                  new Paragraph({ children: [new TextRun({ text: proj.method, font: baseFont, size: 18, italics: true })] }),
                  ...proj.activities.slice(0, 4).map(act => new Paragraph({ children: [new TextRun({ text: `• ${act}`, font: baseFont, size: 18 })] })),
                ],
              }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: proj.relatedSubjects, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${proj.allocationJP} JP`, font: baseFont, size: 20, bold: true })] })] }),
            ],
          })
        )),
      ],
    }),

    createH2('C. Ekstrakurikuler'),
    ...doc.chapter3.ekstrakurikulerDescription.map(p => createP(p, { indent: true })),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['Nama Kegiatan', 'Tujuan & Karakter', 'Dimensi Profil Lulusan', 'Jadwal & Pembina'].map(h => (
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
            })
          )),
        }),
        ...doc.chapter3.ekstrakurikulerList.map(e => (
          new TableRow({
            children: [
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: e.name, font: baseFont, size: 20, bold: true })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: e.goals.join('; '), font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: e.dimensions, font: baseFont, size: 20 })] })] }),
              new TableCell({
                borders: defaultCellBorders,
                children: [
                  new Paragraph({ children: [new TextRun({ text: e.timeWeekly, font: baseFont, size: 20 })] }),
                  new Paragraph({ children: [new TextRun({ text: `Pembina: ${e.coach}`, font: baseFont, size: 18, color: '64748B' })] }),
                ],
              }),
            ],
          })
        )),
      ],
    }),

    createH2('D. Pengaturan Waktu Pembelajaran'),
    ...doc.chapter3.timeArrangementPrinciples.map(tp => createP(`•  ${tp}`, { spaceAfter: 80 })),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 10. BAB IV: PERENCANAAN PEMBELAJARAN
  // =========================================================================
  docChildren.push(
    createH1('BAB IV', 'PERENCANAAN PEMBELAJARAN'),
    createH2('A. Perencanaan Lingkup Satuan Pendidikan (ATP)'),
    ...doc.chapter4.satuanPendidikanRationale.map(p => createP(p, { indent: true })),

    ...doc.chapter4.atpList.flatMap(atp => [
      createH3(`ATP: ${atp.subjectName} (${atp.phase})`),
      createP(`Capaian Pembelajaran (CP): ${atp.learningOutcomes}`, { bold: false }),
      createP('Tujuan Pembelajaran (TP):', { bold: true }),
      ...atp.learningObjectives.map(tp => createP(`•  ${tp}`, { spaceAfter: 60 })),
      createP('Alur Perkembangan per Kelas:', { bold: true }),
      ...atp.progressionFlow.flatMap(pf => [
        createP(`Tingkat ${pf.grade}:`, { bold: true, spaceAfter: 40 }),
        ...pf.steps.map(step => createP(`  - ${step}`, { spaceAfter: 40 })),
      ]),
    ]),

    createH2('B. Perencanaan Lingkup Kelas (Modul Ajar Deep Learning)'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        ['Nama Penyusun Guru', doc.chapter4.sampleLessonPlan.designerName],
        ['Mata Pelajaran', doc.chapter4.sampleLessonPlan.subject],
        ['Kelas & Semester / Durasi', `${doc.chapter4.sampleLessonPlan.classSemester} (${doc.chapter4.sampleLessonPlan.duration})`],
        ['Model & Pendekatan', `${doc.chapter4.sampleLessonPlan.pedagogicalModel} - ${doc.chapter4.sampleLessonPlan.pedagogicalApproach}`],
        ['Dimensi Profil Lulusan', doc.chapter4.sampleLessonPlan.targetedDimensions.join(', ')],
        ['Tujuan Pembelajaran', doc.chapter4.sampleLessonPlan.learningObjectives.join('\n')],
      ].map(([label, val]) => (
        new TableRow({
          children: [
            new TableCell({
              width: { size: 30, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ children: [new TextRun({ text: label, font: baseFont, size: 20, bold: true })] })],
            }),
            new TableCell({
              width: { size: 70, type: WidthType.PERCENTAGE },
              borders: defaultCellBorders,
              children: [new Paragraph({ children: [new TextRun({ text: val, font: baseFont, size: 20 })] })],
            }),
          ],
        })
      )),
    }),

    createH3('Skenario Pembelajaran Berkesadaran, Bermakna, dan Menggembirakan:'),
    ...doc.chapter4.sampleLessonPlan.meetings.flatMap(m => [
      createP(m.title, { bold: true, spaceAfter: 60 }),
      createP('1. Memahami (Mindful & Meaningful):', { bold: true }),
      ...m.mindfulMeaningfulActivities.map(act => createP(`•  ${act}`, { spaceAfter: 40 })),
      createP('2. Mengaplikasikan (Meaningful & Joyful):', { bold: true }),
      ...m.applyingJoyfulActivities.map(act => createP(`•  ${act}`, { spaceAfter: 40 })),
      createP('3. Merefleksi (Mindful Reflection):', { bold: true }),
      ...m.reflectingActivities.map(act => createP(`•  ${act}`, { spaceAfter: 40 })),
    ]),

    createP(`Asesmen Formatif: ${doc.chapter4.sampleLessonPlan.formativeAssessment}`, { spaceAfter: 80 }),
    createP(`Asesmen Sumatif: ${doc.chapter4.sampleLessonPlan.summativeAssessment}`, { spaceAfter: 140 }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 11. BAB V: EVALUASI, PENGEMBANGAN PROFESIONAL, DAN PENDAMPINGAN
  // =========================================================================
  docChildren.push(
    createH1('BAB V', 'EVALUASI, PENGEMBANGAN PROFESIONAL, DAN PENDAMPINGAN'),
    createH2('A. Evaluasi Kurikulum dan Pembelajaran'),
    ...doc.chapter5.evaluationIntro.map(p => createP(p, { indent: true })),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['No', 'Nama Kegiatan', 'Frekuensi Waktu', 'Tujuan Evaluasi', 'Penanggung Jawab'].map((h, i) => (
            new TableCell({
              width: { size: i === 0 ? 8 : i === 1 ? 25 : i === 2 ? 18 : 28, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
            })
          )),
        }),
        ...doc.chapter5.evaluationTable.map((ev, idx) => (
          new TableRow({
            children: [
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${idx + 1}`, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: ev.activityName, font: baseFont, size: 20, bold: true })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: ev.frequency, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: ev.purpose, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: ev.pic, font: baseFont, size: 20 })] })] }),
            ],
          })
        )),
      ],
    }),

    createH2('B. Pengembangan Profesional Pendidik'),
    ...doc.chapter5.professionalDevIntro.map(p => createP(p, { indent: true })),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['No', 'Program Pelatihan / Workshop', 'Waktu', 'Narasumber', 'Penanggung Jawab'].map((h, i) => (
            new TableCell({
              width: { size: i === 0 ? 8 : i === 1 ? 32 : i === 2 ? 18 : 22, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
            })
          )),
        }),
        ...doc.chapter5.professionalDevTable.map((pr, idx) => (
          new TableRow({
            children: [
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${idx + 1}`, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: pr.activityName, font: baseFont, size: 20, bold: true })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: pr.schedule, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: pr.speaker, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: pr.pic, font: baseFont, size: 20 })] })] }),
            ],
          })
        )),
      ],
    }),

    createH2('C. Pendampingan & Supervisi Klinis'),
    ...doc.chapter5.mentoringIntro.map(p => createP(p, { indent: true })),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['Tahapan', 'Uraian Kegiatan Pendampingan', 'Waktu', 'Penanggung Jawab'].map((h, i) => (
            new TableCell({
              width: { size: i === 0 ? 20 : i === 1 ? 40 : i === 2 ? 20 : 20, type: WidthType.PERCENTAGE },
              shading: { type: ShadingType.CLEAR, fill: tableHeaderLightBg },
              borders: defaultCellBorders,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, font: baseFont, size: 20, bold: true })] })],
            })
          )),
        }),
        ...doc.chapter5.mentoringTable.map(m => (
          new TableRow({
            children: [
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: m.stage, font: baseFont, size: 20, bold: true, color: brandEmerald })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: m.activityDescription, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: m.schedule, font: baseFont, size: 20 })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: m.pic, font: baseFont, size: 20 })] })] }),
            ],
          })
        )),
      ],
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // =========================================================================
  // 12. LAMPIRAN
  // =========================================================================
  docChildren.push(
    createH1('LAMPIRAN-LAMPIRAN RESMI'),
    createP('Berikut adalah dokumen pendukung resmi yang menjadi bagian tak terpisahkan dari Dokumen Kurikulum Satuan Pendidikan ini:', { spaceAfter: 120 }),
    // Summary Table
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ shading: { type: ShadingType.CLEAR, fill: tableHeaderBg }, borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Nomor', font: baseFont, size: 20, bold: true, color: 'FFFFFF' })] })] }),
            new TableCell({ shading: { type: ShadingType.CLEAR, fill: tableHeaderBg }, borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Judul Dokumen Lampiran', font: baseFont, size: 20, bold: true, color: 'FFFFFF' })] })] }),
            new TableCell({ shading: { type: ShadingType.CLEAR, fill: tableHeaderBg }, borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Status / Berkas Sumber', font: baseFont, size: 20, bold: true, color: 'FFFFFF' })] })] }),
          ],
        }),
        ...doc.appendices.filter(a => a.included).map(app => (
          new TableRow({
            children: [
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: app.number, font: baseFont, size: 20, bold: true, color: brandEmerald })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: app.title, font: baseFont, size: 20, bold: true })] }), new Paragraph({ children: [new TextRun({ text: app.description, font: baseFont, size: 18, color: '64748B', italics: true })] })] }),
              new TableCell({ borders: defaultCellBorders, children: [new Paragraph({ children: [new TextRun({ text: app.uploadedFileName ? `Terunggah: ${app.uploadedFileName}` : 'Naskah Terlampir Resmi', font: baseFont, size: 18, color: app.uploadedFileName ? brandEmerald : '334155' })] })] }),
            ],
          })
        )),
      ],
    }),
    new Paragraph({ spacing: { after: 200 }, children: [] })
  );

  // Render Full Content for each included appendix
  doc.appendices.filter(a => a.included).forEach(app => {
    docChildren.push(
      new Paragraph({ children: [new PageBreak()] }),
      createH1(`${app.number.toUpperCase()}: ${app.title.toUpperCase()}`),
      createP(app.description, { italic: true, spaceAfter: 80 })
    );

    if (app.uploadedFileName) {
      docChildren.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { type: ShadingType.CLEAR, fill: lightGreenBg },
                  borders: {
                    left: { style: BorderStyle.SINGLE, size: 12, color: brandEmerald },
                    top: { style: BorderStyle.SINGLE, size: 1, color: 'A7F3D0' },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'A7F3D0' },
                    right: { style: BorderStyle.SINGLE, size: 1, color: 'A7F3D0' },
                  },
                  margins: { top: 100, bottom: 100, left: 140, right: 140 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: `Dokumen Lampiran Diunggah: `, font: baseFont, size: 18, bold: true, color: brandEmerald }),
                        new TextRun({ text: `${app.uploadedFileName} (${app.uploadedFileSize || ''})`, font: baseFont, size: 18, color: darkSlate }),
                        new TextRun({ text: app.uploadedAt ? ` | Diunggah pada: ${app.uploadedAt}` : '', font: baseFont, size: 16, italics: true, color: '64748B' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({ spacing: { after: 120 }, children: [] })
      );
    }

    // Output all paragraphs from uploaded file if available
    const paragraphsToPrint = 
      (app.paragraphs && app.paragraphs.length > 0)
        ? app.paragraphs
        : app.extractedText
        ? app.extractedText.split(/\r?\n+/).map(p => p.trim()).filter(Boolean)
        : null;

    if (paragraphsToPrint && paragraphsToPrint.length > 0) {
      paragraphsToPrint.forEach(para => {
        docChildren.push(createP(para, { indent: true, spaceAfter: 100 }));
      });
    } else if (app.contentSnippet) {
      docChildren.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { type: ShadingType.CLEAR, fill: 'F9FAFB' },
                  borders: {
                    left: { style: BorderStyle.DASHED, size: 4, color: '64748B' },
                    top: { style: BorderStyle.DASHED, size: 4, color: 'CBD5E1' },
                    bottom: { style: BorderStyle.DASHED, size: 4, color: 'CBD5E1' },
                    right: { style: BorderStyle.DASHED, size: 4, color: 'CBD5E1' },
                  },
                  margins: { top: 120, bottom: 120, left: 140, right: 140 },
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: app.contentSnippet, font: baseFont, size: 20, italics: true, color: '334155' })],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({ spacing: { after: 140 }, children: [] })
      );
    }
  });

  // Build the complete docx Document
  const docx = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: baseFont,
            size: baseSize,
            color: darkSlate,
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: pageWidthTwips,
              height: pageHeightTwips,
            },
            margin: {
              top: topMargin,
              bottom: bottomMargin,
              left: leftMargin,
              right: rightMargin,
            },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `${doc.identity.name} | Kurikulum Satuan Pendidikan - Halaman `,
                    font: baseFont,
                    size: 18,
                    color: '94A3B8',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: baseFont,
                    size: 18,
                    bold: true,
                    color: '64748B',
                  }),
                ],
              }),
            ],
          }),
        },
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(docx);
  const cleanSchool = doc.identity.name.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanYear = doc.identity.academicYear.replace(/[/]/g, '-');
  const fileName = `KSP_${cleanSchool}_TP_${cleanYear}.docx`;

  saveAs(blob, fileName);
}
