import React, { useState } from 'react';
import { KSPDocument } from '../../types/ksp';
import { calculateKspPageStructure } from '../../utils/pageCalculator';
import { Building, Printer, FileDown, Download, Loader2, Info, FileText } from 'lucide-react';
import { exportKspToWord } from '../../utils/docxExport';
import { exportKspToPdf, triggerBrowserPrint, PdfExportProgress } from '../../utils/pdfExport';
import { MinistryLogo } from '../common/MinistryLogo';

interface FullDocumentViewProps {
  document: KSPDocument;
  onOpenSettings: () => void;
}

export const FullDocumentView: React.FC<FullDocumentViewProps> = ({
  document: doc,
  onOpenSettings
}) => {
  const pageCalc = calculateKspPageStructure(doc);
  const { margins, paperSize, fontFamily, fontSize, lineHeight, showPageNumbers, showWatermark, watermarkText } = doc.printSettings;

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState<PdfExportProgress>({ status: 'idle' });
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Paper Dimensions for Screen Preview
  // A4: 210 x 297 mm
  // F4: 215 x 330 mm
  // Letter: 216 x 279 mm
  const paperAspect = paperSize === 'F4' ? 'aspect-[215/330]' : paperSize === 'Letter' ? 'aspect-[216/279]' : 'aspect-[210/297]';

  const marginStyle: React.CSSProperties = {
    paddingTop: `${margins.top}cm`,
    paddingBottom: `${margins.bottom}cm`,
    paddingLeft: `${margins.left}cm`,
    paddingRight: `${margins.right}cm`,
    fontFamily: fontFamily === 'Times New Roman' ? '"Times New Roman", Times, serif' : fontFamily,
    fontSize: fontSize === '11pt' ? '14px' : '15px',
    lineHeight: lineHeight === '1.5' ? '1.6' : lineHeight === '1.25' ? '1.35' : '1.25'
  };

  const handlePrint = async () => {
    setShowPrintModal(true);
    triggerBrowserPrint();
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      await exportKspToPdf(doc, (progress) => {
        setPdfProgress(progress);
      });
      setTimeout(() => {
        setIsExportingPdf(false);
        setPdfProgress({ status: 'idle' });
      }, 1500);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      setPdfProgress({ status: 'error', message: 'Gagal membuat file PDF: ' + (err as Error).message });
      setTimeout(() => {
        setIsExportingPdf(false);
      }, 4000);
    }
  };

  const handleExportWord = async () => {
    try {
      setIsExportingWord(true);
      await exportKspToWord(doc);
    } catch (err) {
      console.error('Failed to export DOCX:', err);
    } finally {
      setIsExportingWord(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Print Control Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Tampilan Pratinjau Dokumen Utuh Siap Cetak</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Format Standar BSKAP
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Kertas: <span className="font-semibold text-slate-800">{paperSize}</span> • Margin: <span className="font-semibold text-slate-800">Kiri {margins.left}cm, Atas {margins.top}cm, Kanan {margins.right}cm, Bawah {margins.bottom}cm</span> • Font: <span className="font-semibold text-slate-800">{fontFamily} ({fontSize})</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenSettings}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Ubah Kertas & Margin
          </button>

          {/* Export Word Button */}
          <button
            onClick={handleExportWord}
            disabled={isExportingWord}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold rounded-xl transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
            title="Download file Microsoft Word asli (.docx)"
          >
            {isExportingWord ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
            <span>{isExportingWord ? 'Menyiapkan Word...' : 'Ekspor Word (.docx)'}</span>
          </button>

          {/* Download Direct PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 text-xs font-semibold rounded-xl transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
            title="Unduh berkas PDF langsung ke komputer Anda"
          >
            {isExportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" /> : <Download className="w-3.5 h-3.5" />}
            <span>{isExportingPdf ? 'Memproses PDF...' : 'Unduh PDF (.pdf)'}</span>
          </button>

          {/* Trigger Print Dialog */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs shadow-emerald-600/30 cursor-pointer"
            title="Buka dialog cetak browser (bisa simpan ke PDF)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Dokumen</span>
          </button>
        </div>
      </div>

      {/* Print Trigger Modal / Guidance */}
      {showPrintModal && (
        <div className="bg-emerald-950 text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Perintah Cetak Dokumen Telah Dikirim</span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
                Jika peramban Anda membatasi jendela dialog printer di dalam frame, Anda dapat langsung mengunduh berkas PDF utuh di bawah atau gunakan tombol pintas keyboard <b>Ctrl + P</b> (Windows) / <b>Cmd + P</b> (Mac).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                setShowPrintModal(false);
                handleDownloadPdf();
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh File PDF Sekarang</span>
            </button>
            <button
              onClick={() => setShowPrintModal(false)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Helper Notification */}
      {showTip && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-start justify-between gap-3 print:hidden">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Tips Cetak / Simpan PDF:</span>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-emerald-800 text-[11px]">
                <li>Klik <b>"Cetak Dokumen"</b> lalu pada jendela printer browser pilih tujuan <b>"Simpan sebagai PDF" (Save as PDF)</b>.</li>
                <li>Pastikan mencentang opsi <b>"Grafik Latar Belakang" (Background Graphics)</b> agar warna cover dan tabel tercetak penuh.</li>
                <li>Atau klik <b>"Unduh PDF (.pdf)"</b> untuk men-download berkas PDF dokumen secara otomatis tanpa perlu printer browser.</li>
              </ul>
            </div>
          </div>
          <button 
            onClick={() => setShowTip(false)}
            className="text-emerald-600 hover:text-emerald-900 text-[11px] font-bold px-2 py-0.5 hover:bg-emerald-100 rounded-md cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* PDF Export Progress Banner */}
      {isExportingPdf && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-xs text-amber-900 flex items-center gap-3 shadow-md print:hidden">
          <Loader2 className="w-5 h-5 text-amber-600 animate-spin shrink-0" />
          <div className="grow">
            <p className="font-bold">{pdfProgress.message || 'Mempersiapkan dokumen PDF...'}</p>
            {pdfProgress.totalPages && (
              <div className="w-full bg-amber-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
                <div 
                  className="bg-amber-600 h-1.5 transition-all duration-300 rounded-full"
                  style={{ width: `${((pdfProgress.currentPage || 1) / pdfProgress.totalPages) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Printable Container */}
      <div id="printable-ksp-document" className="space-y-8 print:space-y-0 text-slate-900">
        
        {/* ==================== PAGE 1: COVER ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none relative overflow-hidden page-break">
          {showWatermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 rotate-45 text-4xl font-black text-slate-900 uppercase">
              {watermarkText}
            </div>
          )}
          <div 
            className="min-h-[1050px] flex flex-col justify-between text-center p-12 relative text-white"
            style={{
              background: doc.cover.theme === 'geosmart-emerald' 
                ? 'linear-gradient(135deg, #064e3b 0%, #047857 40%, #0f172a 100%)'
                : doc.cover.theme === 'kemdikbud-blue'
                ? 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #0f172a 100%)'
                : doc.cover.theme === 'nusantara-navy'
                ? 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 40%, #090d16 100%)'
                : doc.cover.theme === 'maroon-royal'
                ? 'linear-gradient(135deg, #881337 0%, #be123c 40%, #111827 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #334155 40%, #020617 100%)'
            }}
          >
            {/* Ministry Header */}
            <div>
              <div className="flex items-center justify-center gap-4 mb-4">
                {doc.cover.showMinistryLogo && (
                  <div className="w-16 h-16 rounded-full bg-white p-1.5 shadow-lg flex items-center justify-center">
                    <MinistryLogo className="w-12 h-12" />
                  </div>
                )}
                {doc.cover.showLogo && (
                  <div className="w-16 h-16 rounded-full bg-white p-2 shadow-lg flex items-center justify-center text-emerald-800">
                    <Building className="w-8 h-8" />
                  </div>
                )}
              </div>
              <p className="text-xs uppercase font-bold tracking-widest text-slate-200">
                BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN<br/>
                KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH<br/>
                REPUBLIK INDONESIA
              </p>
            </div>

            {/* Title Section */}
            <div className="my-auto py-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-emerald-200 border border-white/20 mb-4">
                {doc.cover.title}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
                {doc.cover.curriculumBrand}
              </h1>
              <div className="w-24 h-1.5 bg-amber-400 mx-auto my-4 rounded-full"></div>
              <h2 className="text-2xl font-extrabold uppercase text-emerald-100 tracking-wide">
                {doc.cover.schoolName}
              </h2>
              <p className="text-sm font-semibold tracking-wider text-slate-300 uppercase mt-1">
                {doc.cover.regencyInfo}
              </p>
            </div>

            {/* Bottom Meta */}
            <div className="bg-black/30 backdrop-blur-xs rounded-2xl p-4 border border-white/15 max-w-sm mx-auto w-full">
              <p className="text-sm font-bold text-white uppercase tracking-wider">
                {doc.cover.academicYear}
              </p>
              <p className="text-xs font-mono text-slate-300 mt-0.5">
                {doc.cover.npsn}
              </p>
            </div>
          </div>
        </section>

        {/* ==================== PAGE 2: DATA DOKUMEN ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold tracking-wider uppercase text-slate-900">DOKUMEN RESMI</h2>
            <h1 className="text-xl font-black tracking-wide uppercase text-slate-900 mt-1">DATA DOKUMEN KURIKULUM</h1>
            <p className="text-xs text-slate-600 font-semibold uppercase mt-0.5">{doc.identity.name}</p>
          </div>

          <table className="w-full text-xs border-collapse border border-slate-400">
            <tbody>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold w-1/3 bg-slate-50">Nama Sekolah</td>
                <td className="border border-slate-400 p-2.5 font-bold">{doc.identity.name}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">NPSN</td>
                <td className="border border-slate-400 p-2.5">{doc.identity.npsn}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">Status Sekolah</td>
                <td className="border border-slate-400 p-2.5">{doc.identity.status} ({doc.identity.educationType}) - Jenjang {doc.identity.level}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">Status Kepemilikan</td>
                <td className="border border-slate-400 p-2.5">{doc.identity.ownership}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">SK Pendirian Sekolah</td>
                <td className="border border-slate-400 p-2.5">{doc.identity.skEstablishment}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">Tanggal SK Pendirian</td>
                <td className="border border-slate-400 p-2.5">{doc.identity.skEstablishmentDate}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">SK Izin Operasional</td>
                <td className="border border-slate-400 p-2.5">{doc.identity.skOperational}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">Tanggal SK Izin Operasional</td>
                <td className="border border-slate-400 p-2.5">{doc.identity.skOperationalDate}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">Nama Kepala Sekolah</td>
                <td className="border border-slate-400 p-2.5 font-bold">{doc.identity.principalName} {doc.identity.principalNip ? `(NIP. ${doc.identity.principalNip})` : ''}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">Alamat Sekolah</td>
                <td className="border border-slate-400 p-2.5">
                  {doc.identity.address}, {doc.identity.village}, {doc.identity.district}, {doc.identity.regency}, {doc.identity.province} {doc.identity.postalCode}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">Kontak Resmi</td>
                <td className="border border-slate-400 p-2.5">Telp: {doc.identity.phone} | Email: {doc.identity.email} | Web: {doc.identity.website}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2.5 font-bold bg-slate-50">Tahun Ajaran Berlaku</td>
                <td className="border border-slate-400 p-2.5 font-bold text-emerald-800">{doc.identity.academicYear}</td>
              </tr>
            </tbody>
          </table>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-12">Halaman ii</div>
          )}
        </section>

        {/* ==================== PAGE 3: LEMBAR PENETAPAN ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-8">
            <h1 className="text-lg font-bold tracking-wider uppercase text-slate-900">LEMBAR PENETAPAN</h1>
            <p className="text-sm font-bold uppercase text-slate-800 mt-1">
              {doc.identity.curriculumName}<br/>
              {doc.identity.name}
            </p>
            <p className="text-xs text-slate-600 mt-0.5">TAHUN AJARAN {doc.identity.academicYear}</p>
          </div>

          <div className="space-y-6 text-xs text-justify leading-relaxed">
            <p className="indent-8">{doc.endorsement.statementText}</p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-2 gap-8 text-xs">
              <div>
                {doc.endorsement.showCommitteeSignature ? (
                  <div>
                    <p className="text-slate-700">Mengetahui,</p>
                    <p className="font-bold text-slate-900">Ketua Komite Sekolah</p>
                    <div className="h-20 flex items-end">
                      <div className="text-[10px] text-slate-400 italic">(tanda tangan & stempel)</div>
                    </div>
                    <p className="font-bold underline text-slate-900 mt-2">{doc.endorsement.committeeName}</p>
                  </div>
                ) : <div />}
              </div>

              <div>
                <p className="text-slate-700">Ditetapkan di : {doc.endorsement.city}</p>
                <p className="text-slate-700">Pada tanggal : {doc.endorsement.date}</p>
                <p className="font-bold text-slate-900 mt-1">Kepala Sekolah</p>
                <div className="h-20 flex items-end">
                  <div className="text-[10px] text-slate-400 italic">(tanda tangan & cap sekolah)</div>
                </div>
                <p className="font-bold underline text-slate-900 mt-2">{doc.endorsement.principalName}</p>
                {doc.endorsement.principalNip && (
                  <p className="text-[11px] text-slate-600">NIP. {doc.endorsement.principalNip}</p>
                )}
              </div>
            </div>

            {doc.endorsement.showSupervisorSignature && (
              <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs">
                <p className="text-slate-700">Mengesahkan / Mengetahui:</p>
                <p className="font-bold text-slate-900">Pengawas Satuan Pendidikan</p>
                <div className="h-20 flex items-end justify-center">
                  <div className="text-[10px] text-slate-400 italic">(tanda tangan & stempel dinas)</div>
                </div>
                <p className="font-bold underline text-slate-900 mt-2">{doc.endorsement.supervisorName}</p>
                {doc.endorsement.supervisorNip && (
                  <p className="text-[11px] text-slate-600">NIP. {doc.endorsement.supervisorNip}</p>
                )}
              </div>
            )}
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-12">Halaman iii</div>
          )}
        </section>

        {/* ==================== PAGE 4: TIM PENYUSUN ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">TIM PENYUSUN KURIKULUM</h1>
            <p className="text-xs font-bold text-slate-800 uppercase mt-0.5">
              {doc.identity.curriculumName} {doc.identity.name}
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div>
              <h2 className="font-bold text-slate-900 mb-2">A. Penanggung Jawab & Pengarah</h2>
              <table className="w-full border-collapse border border-slate-400 text-left">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-slate-400 p-2">Nama & Gelar</th>
                    <th className="border border-slate-400 p-2">Jabatan dalam Tim</th>
                    <th className="border border-slate-400 p-2">Instansi / Kedudukan</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.team.advisors.map(a => (
                    <tr key={a.id}>
                      <td className="border border-slate-400 p-2 font-bold">{a.name}</td>
                      <td className="border border-slate-400 p-2">{a.role}</td>
                      <td className="border border-slate-400 p-2">{a.affiliationOrSubject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="font-bold text-slate-900 mb-2">B. Tim Pengembang Kurikulum Satuan Pendidikan</h2>
              <table className="w-full border-collapse border border-slate-400 text-left">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-slate-400 p-2">Nama & Gelar</th>
                    <th className="border border-slate-400 p-2">Peran / Tugas</th>
                    <th className="border border-slate-400 p-2">Mata Pelajaran / Posisi</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.team.draftingTeam.map(t => (
                    <tr key={t.id}>
                      <td className="border border-slate-400 p-2 font-bold">{t.name}</td>
                      <td className="border border-slate-400 p-2">{t.role}</td>
                      <td className="border border-slate-400 p-2">{t.affiliationOrSubject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="font-bold text-slate-900 mb-2">C. Penelaah Kurikulum</h2>
              <table className="w-full border-collapse border border-slate-400 text-left">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-slate-400 p-2">Nama & Gelar</th>
                    <th className="border border-slate-400 p-2">Peran Penelaah</th>
                    <th className="border border-slate-400 p-2">Instansi</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.team.reviewers.map(r => (
                    <tr key={r.id}>
                      <td className="border border-slate-400 p-2 font-bold">{r.name}</td>
                      <td className="border border-slate-400 p-2">{r.role}</td>
                      <td className="border border-slate-400 p-2">{r.affiliationOrSubject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-8">Halaman iv</div>
          )}
        </section>

        {/* ==================== PAGE 5: KATA PENGANTAR ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">KATA PENGANTAR</h1>
            <div className="w-16 h-0.5 bg-slate-900 mx-auto mt-2"></div>
          </div>

          <div className="space-y-4 text-xs text-justify leading-relaxed text-slate-800">
            {doc.foreword.paragraphs.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}
          </div>

          <div className="mt-12 flex justify-end">
            <div className="w-64 text-left text-xs">
              <p>{doc.foreword.signingPlace}, {doc.foreword.signingDate}</p>
              <p className="font-bold text-slate-900">{doc.foreword.signatoryTitle}</p>
              <div className="h-16 flex items-end">
                <div className="text-[10px] text-slate-400 italic">(tanda tangan)</div>
              </div>
              <p className="font-bold underline text-slate-900 mt-2">{doc.foreword.signatoryName}</p>
            </div>
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-8">Halaman v</div>
          )}
        </section>

        {/* ==================== PAGE 6: DAFTAR ISI ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">DAFTAR ISI</h1>
            <div className="w-16 h-0.5 bg-slate-900 mx-auto mt-2"></div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-800">
            {pageCalc.items.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-baseline justify-between ${
                  item.level === 1 ? 'font-bold text-slate-900 mt-2.5' : 'text-slate-700 pl-4 font-normal'
                }`}
              >
                <div className="flex items-baseline pr-2">
                  {item.code && <span className="mr-2 font-semibold">{item.code}</span>}
                  <span>{item.title}</span>
                </div>
                <div className="grow mx-2 border-b border-dotted border-slate-300"></div>
                <div className="font-bold text-slate-900">{item.pageNumber}</div>
              </div>
            ))}
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-12">Halaman vi</div>
          )}
        </section>

        {/* ==================== BAB I: KARAKTERISTIK ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">
              BAB I<br/>KARAKTERISTIK SATUAN PENDIDIKAN
            </h1>
          </div>

          <div className="space-y-4 text-xs text-justify leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900">A. Profil Satuan Pendidikan</h2>
            {doc.chapter1.profileDescription.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            <h2 className="text-sm font-bold text-slate-900 pt-2">B. Analisis Sosial, Ekonomi dan Budaya</h2>
            {doc.chapter1.socioEconomicCulture.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            <h3 className="font-semibold text-slate-800">Nilai Kearifan Lokal dan Nilai Luhur:</h3>
            <ul className="list-disc pl-6 space-y-1 text-slate-800">
              {doc.chapter1.localWisdom.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>

            <h2 className="text-sm font-bold text-slate-900 pt-2">C. Karakteristik Pendidik dan Tenaga Kependidikan</h2>
            <p className="indent-8">{doc.chapter1.ptkSummary}</p>
            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-1.5 text-center w-8">No</th>
                  <th className="border border-slate-400 p-1.5">Nama & Kualifikasi</th>
                  <th className="border border-slate-400 p-1.5">Jabatan</th>
                  <th className="border border-slate-400 p-1.5">Mata Pelajaran</th>
                  <th className="border border-slate-400 p-1.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {doc.chapter1.ptkList.map((ptk, idx) => (
                  <tr key={ptk.id}>
                    <td className="border border-slate-400 p-1.5 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 p-1.5">
                      <b>{ptk.name}</b><br/>
                      <span className="text-[10px] text-slate-600">{ptk.qualification}</span>
                    </td>
                    <td className="border border-slate-400 p-1.5">{ptk.position}</td>
                    <td className="border border-slate-400 p-1.5">{ptk.subject}</td>
                    <td className="border border-slate-400 p-1.5">{ptk.employmentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-sm font-bold text-slate-900 pt-2">D. Karakteristik Peserta Didik</h2>
            <p className="indent-8">{doc.chapter1.studentSummary}</p>
            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-1.5">Rombongan Belajar</th>
                  <th className="border border-slate-400 p-1.5 text-center">Jumlah Rombel</th>
                  <th className="border border-slate-400 p-1.5 text-center">Laki-Laki</th>
                  <th className="border border-slate-400 p-1.5 text-center">Perempuan</th>
                  <th className="border border-slate-400 p-1.5 text-center font-bold">Total Siswa</th>
                </tr>
              </thead>
              <tbody>
                {doc.chapter1.studentCohorts.map(sc => (
                  <tr key={sc.id}>
                    <td className="border border-slate-400 p-1.5 font-semibold">{sc.cohortName}</td>
                    <td className="border border-slate-400 p-1.5 text-center">{sc.rombelCount}</td>
                    <td className="border border-slate-400 p-1.5 text-center">{sc.maleCount}</td>
                    <td className="border border-slate-400 p-1.5 text-center">{sc.femaleCount}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{sc.totalCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-sm font-bold text-slate-900 pt-2">E. Sarana dan Prasarana</h2>
            <p className="indent-8">{doc.chapter1.facilitySummary}</p>
            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-1.5 text-center w-8">No</th>
                  <th className="border border-slate-400 p-1.5">Nama Sarana / Prasarana</th>
                  <th className="border border-slate-400 p-1.5 text-center">Jumlah & Satuan</th>
                  <th className="border border-slate-400 p-1.5">Kondisi</th>
                </tr>
              </thead>
              <tbody>
                {doc.chapter1.facilities.map((fac, idx) => (
                  <tr key={fac.id}>
                    <td className="border border-slate-400 p-1.5 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 p-1.5 font-semibold">{fac.name}</td>
                    <td className="border border-slate-400 p-1.5 text-center">{fac.count} {fac.unit}</td>
                    <td className="border border-slate-400 p-1.5">{fac.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-sm font-bold text-slate-900 pt-2">F. Analisis Kemitraan dan Kerjasama</h2>
            <p className="indent-8">{doc.chapter1.partnershipSummary}</p>
            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-1.5 text-center w-8">No</th>
                  <th className="border border-slate-400 p-1.5 w-44">Instansi Mitra</th>
                  <th className="border border-slate-400 p-1.5">Bentuk Kerjasama & Kontribusi</th>
                </tr>
              </thead>
              <tbody>
                {doc.chapter1.partnerships.map((p, idx) => (
                  <tr key={p.id}>
                    <td className="border border-slate-400 p-1.5 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 p-1.5 font-bold">{p.institution}</td>
                    <td className="border border-slate-400 p-1.5">{p.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-8">Halaman {pageCalc.chapter1Start}</div>
          )}
        </section>

        {/* ==================== BAB II: VISI, MISI, TUJUAN ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">
              BAB II<br/>VISI, MISI, DAN TUJUAN SATUAN PENDIDIKAN
            </h1>
          </div>

          <div className="space-y-4 text-xs text-justify leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900">A. Visi Satuan Pendidikan</h2>
            <blockquote className="p-3 bg-emerald-50/50 border-l-4 border-emerald-600 font-bold text-emerald-950 text-sm italic">
              "{doc.chapter2.vision}"
            </blockquote>
            {doc.chapter2.visionNarrative.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            <h2 className="text-sm font-bold text-slate-900 pt-2">B. Misi Satuan Pendidikan</h2>
            <ol className="list-decimal pl-6 space-y-1.5 text-slate-800">
              {doc.chapter2.missions.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ol>

            <h2 className="text-sm font-bold text-slate-900 pt-2">C. Tujuan Satuan Pendidikan</h2>
            <ol className="list-decimal pl-6 space-y-1.5 text-slate-800">
              {doc.chapter2.goals.map((g, idx) => (
                <li key={idx}>{g}</li>
              ))}
            </ol>
            <p className="text-[11px] text-slate-600 italic mt-2">{doc.chapter2.smartAnalysisNotes}</p>
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-8">Halaman {pageCalc.chapter2Start}</div>
          )}
        </section>

        {/* ==================== BAB III: PENGORGANISASIAN ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">
              BAB III<br/>PENGORGANISASIAN PEMBELAJARAN
            </h1>
          </div>

          <div className="space-y-4 text-xs text-justify leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900">A. Intrakurikuler</h2>
            {doc.chapter3.approachRationale.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            {doc.chapter3.curriculumStructureTables.map((tbl, tIdx) => {
              const totalIntraWeek = tbl.items.reduce((acc, curr) => acc + (Number(curr.intraHoursPerWeek) || 0), 0);
              const totalIntraYear = tbl.items.reduce((acc, curr) => acc + (Number(curr.intraHoursPerYear) || 0), 0);
              const totalKokoYear = tbl.items.reduce((acc, curr) => acc + (Number(curr.kokoHoursPerYear) || 0), 0);
              const grandTotalYear = tbl.items.reduce((acc, curr) => acc + (Number(curr.totalHoursPerYear) || 0), 0);

              return (
                <div key={tIdx} className="my-3">
                  <h3 className="font-bold text-slate-800 mb-1">{tbl.title}</h3>
                  <table className="w-full border-collapse border border-slate-400 text-left">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="border border-slate-400 p-1.5">Mata Pelajaran</th>
                        <th className="border border-slate-400 p-1.5 text-center w-24">Intra / Minggu</th>
                        <th className="border border-slate-400 p-1.5 text-center w-24">Intra / Tahun</th>
                        <th className="border border-slate-400 p-1.5 text-center w-24">Koko / Tahun</th>
                        <th className="border border-slate-400 p-1.5 text-center w-24 font-bold">Total JP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tbl.items.map(it => (
                        <tr key={it.id}>
                          <td className="border border-slate-400 p-1.5 font-medium">{it.subjectName}</td>
                          <td className="border border-slate-400 p-1.5 text-center">{it.intraHoursPerWeek}</td>
                          <td className="border border-slate-400 p-1.5 text-center">{it.intraHoursPerYear}</td>
                          <td className="border border-slate-400 p-1.5 text-center">{it.kokoHoursPerYear}</td>
                          <td className="border border-slate-400 p-1.5 text-center font-bold">{it.totalHoursPerYear}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold border-t border-slate-400">
                      <tr>
                        <td className="border border-slate-400 p-1.5">Total Jam Pelajaran Wajib</td>
                        <td className="border border-slate-400 p-1.5 text-center">{totalIntraWeek} JP</td>
                        <td className="border border-slate-400 p-1.5 text-center">{totalIntraYear} JP</td>
                        <td className="border border-slate-400 p-1.5 text-center">{totalKokoYear} JP</td>
                        <td className="border border-slate-400 p-1.5 text-center font-black">{grandTotalYear} JP</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              );
            })}

            <h2 className="text-sm font-bold text-slate-900 pt-2">B. Kokurikuler (Penguatan 8 Dimensi Profil Lulusan)</h2>
            {doc.chapter3.kokurikulerDescription.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-1.5 w-32">Kelas & Dimensi</th>
                  <th className="border border-slate-400 p-1.5 w-44">Tema Proyek</th>
                  <th className="border border-slate-400 p-1.5">Bentuk Aktivitas</th>
                  <th className="border border-slate-400 p-1.5 w-32">Mapel Terkait</th>
                  <th className="border border-slate-400 p-1.5 text-center w-20">Alokasi</th>
                </tr>
              </thead>
              <tbody>
                {doc.chapter3.kokurikulerProjects.map(proj => (
                  <tr key={proj.id}>
                    <td className="border border-slate-400 p-1.5">
                      <b>{proj.classes}</b><br/>
                      <span className="text-[10px] text-slate-600">{proj.dimensions}</span>
                    </td>
                    <td className="border border-slate-400 p-1.5 font-bold text-emerald-900">{proj.theme}</td>
                    <td className="border border-slate-400 p-1.5">
                      <i>{proj.method}</i>
                      <ul className="list-disc pl-4 text-[11px] mt-1 space-y-0.5">
                        {proj.activities.slice(0, 4).map((a, aIdx) => (
                          <li key={aIdx}>{a}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-slate-400 p-1.5">{proj.relatedSubjects}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-bold">{proj.allocationJP} JP</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-sm font-bold text-slate-900 pt-2">C. Ekstrakurikuler</h2>
            {doc.chapter3.ekstrakurikulerDescription.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-1.5 w-36">Nama Kegiatan</th>
                  <th className="border border-slate-400 p-1.5">Tujuan & Karakter</th>
                  <th className="border border-slate-400 p-1.5 w-40">Dimensi Profil Lulusan</th>
                  <th className="border border-slate-400 p-1.5 w-36">Jadwal & Pembina</th>
                </tr>
              </thead>
              <tbody>
                {doc.chapter3.ekstrakurikulerList.map(e => (
                  <tr key={e.id}>
                    <td className="border border-slate-400 p-1.5 font-bold">{e.name}</td>
                    <td className="border border-slate-400 p-1.5">{e.goals.join('; ')}</td>
                    <td className="border border-slate-400 p-1.5">{e.dimensions}</td>
                    <td className="border border-slate-400 p-1.5">
                      {e.timeWeekly}<br/>
                      <small className="text-slate-600">Pembina: {e.coach}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-sm font-bold text-slate-900 pt-2">D. Pengaturan Waktu Pembelajaran</h2>
            <ul className="list-disc pl-6 space-y-1 text-slate-800">
              {doc.chapter3.timeArrangementPrinciples.map((tp, idx) => (
                <li key={idx}>{tp}</li>
              ))}
            </ul>
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-8">Halaman {pageCalc.chapter3Start}</div>
          )}
        </section>

        {/* ==================== BAB IV: PERENCANAAN ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">
              BAB IV<br/>PERENCANAAN PEMBELAJARAN
            </h1>
          </div>

          <div className="space-y-4 text-xs text-justify leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900">A. Perencanaan Lingkup Satuan Pendidikan (ATP)</h2>
            {doc.chapter4.satuanPendidikanRationale.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            {doc.chapter4.atpList.map(atp => (
              <div key={atp.id} className="my-3 p-3 bg-slate-50 border border-slate-300 rounded-lg">
                <h3 className="font-bold text-slate-900 text-xs mb-1">
                  Mata Pelajaran: {atp.subjectName} ({atp.phase})
                </h3>
                <p className="no-indent"><b>Capaian Pembelajaran (CP):</b> {atp.learningOutcomes}</p>
                <div className="my-2">
                  <b>Tujuan Pembelajaran (TP):</b>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5">
                    {atp.learningObjectives.map((o, idx) => (
                      <li key={idx}>{o}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <b>Alur Perkembangan per Kelas:</b>
                  {atp.progressionFlow.map((pf, pfIdx) => (
                    <div key={pfIdx} className="mt-1 pl-2 border-l-2 border-emerald-500">
                      <b>{pf.grade}:</b>
                      <ul className="list-disc pl-4 text-[11px]">
                        {pf.steps.map((st, sIdx) => (
                          <li key={sIdx}>{st}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <h2 className="text-sm font-bold text-slate-900 pt-4">B. Perencanaan Lingkup Kelas (Modul Ajar Deep Learning)</h2>
            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-bold w-1/3 bg-slate-50">Nama Penyusun Guru</td>
                  <td className="border border-slate-400 p-1.5">{doc.chapter4.sampleLessonPlan.designerName}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-bold bg-slate-50">Mata Pelajaran</td>
                  <td className="border border-slate-400 p-1.5 font-bold text-emerald-900">{doc.chapter4.sampleLessonPlan.subject}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-bold bg-slate-50">Kelas & Semester / Durasi</td>
                  <td className="border border-slate-400 p-1.5">{doc.chapter4.sampleLessonPlan.classSemester} ({doc.chapter4.sampleLessonPlan.duration})</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-bold bg-slate-50">Model & Pendekatan</td>
                  <td className="border border-slate-400 p-1.5">{doc.chapter4.sampleLessonPlan.pedagogicalModel} - {doc.chapter4.sampleLessonPlan.pedagogicalApproach}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-bold bg-slate-50">Dimensi Profil Lulusan</td>
                  <td className="border border-slate-400 p-1.5">{doc.chapter4.sampleLessonPlan.targetedDimensions.join(', ')}</td>
                </tr>
              </tbody>
            </table>

            <h3 className="font-bold text-slate-800 mt-2">Skenario Pembelajaran Berkesadaran, Bermakna, dan Menggembirakan:</h3>
            {doc.chapter4.sampleLessonPlan.meetings.map((m, mIdx) => (
              <div key={mIdx} className="my-2 p-3 border border-slate-300 rounded bg-slate-50/50">
                <h4 className="font-bold text-slate-900">{m.title}</h4>
                <div className="mt-1">
                  <b>1. Memahami (Mindful & Meaningful):</b>
                  <ul className="list-disc pl-4 text-[11px]">
                    {m.mindfulMeaningfulActivities.map((act, aIdx) => <li key={aIdx}>{act}</li>)}
                  </ul>
                </div>
                <div className="mt-1">
                  <b>2. Mengaplikasikan (Meaningful & Joyful):</b>
                  <ul className="list-disc pl-4 text-[11px]">
                    {m.applyingJoyfulActivities.map((act, aIdx) => <li key={aIdx}>{act}</li>)}
                  </ul>
                </div>
                <div className="mt-1">
                  <b>3. Merefleksi (Mindful Reflection):</b>
                  <ul className="list-disc pl-4 text-[11px]">
                    {m.reflectingActivities.map((act, aIdx) => <li key={aIdx}>{act}</li>)}
                  </ul>
                </div>
              </div>
            ))}

            <p className="no-indent"><b>Asesmen Formatif:</b> {doc.chapter4.sampleLessonPlan.formativeAssessment}</p>
            <p className="no-indent"><b>Asesmen Sumatif:</b> {doc.chapter4.sampleLessonPlan.summativeAssessment}</p>
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-8">Halaman {pageCalc.chapter4Start}</div>
          )}
        </section>

        {/* ==================== BAB V: EVALUASI ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">
              BAB V<br/>EVALUASI, PENGEMBANGAN PROFESIONAL, DAN PENDAMPINGAN
            </h1>
          </div>

          <div className="space-y-4 text-xs text-justify leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900">A. Evaluasi Kurikulum dan Pembelajaran</h2>
            {doc.chapter5.evaluationIntro.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-1.5 text-center w-8">No</th>
                  <th className="border border-slate-400 p-1.5 w-44">Nama Kegiatan</th>
                  <th className="border border-slate-400 p-1.5 w-32">Frekuensi Waktu</th>
                  <th className="border border-slate-400 p-1.5">Tujuan Evaluasi</th>
                  <th className="border border-slate-400 p-1.5 w-36">Penanggung Jawab</th>
                </tr>
              </thead>
              <tbody>
                {doc.chapter5.evaluationTable.map((ev, idx) => (
                  <tr key={ev.id}>
                    <td className="border border-slate-400 p-1.5 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 p-1.5 font-bold">{ev.activityName}</td>
                    <td className="border border-slate-400 p-1.5">{ev.frequency}</td>
                    <td className="border border-slate-400 p-1.5">{ev.purpose}</td>
                    <td className="border border-slate-400 p-1.5">{ev.pic}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-sm font-bold text-slate-900 pt-2">B. Pengembangan Profesional Pendidik</h2>
            {doc.chapter5.professionalDevIntro.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-1.5 text-center w-8">No</th>
                  <th className="border border-slate-400 p-1.5">Program Pelatihan / Workshop</th>
                  <th className="border border-slate-400 p-1.5 w-28">Waktu</th>
                  <th className="border border-slate-400 p-1.5 w-40">Narasumber</th>
                  <th className="border border-slate-400 p-1.5 w-36">Penanggung Jawab</th>
                </tr>
              </thead>
              <tbody>
                {doc.chapter5.professionalDevTable.map((pr, idx) => (
                  <tr key={pr.id}>
                    <td className="border border-slate-400 p-1.5 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 p-1.5 font-bold">{pr.activityName}</td>
                    <td className="border border-slate-400 p-1.5">{pr.schedule}</td>
                    <td className="border border-slate-400 p-1.5">{pr.speaker}</td>
                    <td className="border border-slate-400 p-1.5">{pr.pic}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-sm font-bold text-slate-900 pt-2">C. Pendampingan & Supervisi Klinis</h2>
            {doc.chapter5.mentoringIntro.map((p, idx) => (
              <p key={idx} className="indent-8">{p}</p>
            ))}

            <table className="w-full border-collapse border border-slate-400 text-left my-2">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-1.5 w-28">Tahapan</th>
                  <th className="border border-slate-400 p-1.5">Uraian Kegiatan Pendampingan</th>
                  <th className="border border-slate-400 p-1.5 w-40">Waktu</th>
                  <th className="border border-slate-400 p-1.5 w-36">Penanggung Jawab</th>
                </tr>
              </thead>
              <tbody>
                {doc.chapter5.mentoringTable.map(m => (
                  <tr key={m.id}>
                    <td className="border border-slate-400 p-1.5 font-bold text-emerald-900">{m.stage}</td>
                    <td className="border border-slate-400 p-1.5">{m.activityDescription}</td>
                    <td className="border border-slate-400 p-1.5">{m.schedule}</td>
                    <td className="border border-slate-400 p-1.5">{m.pic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-8">Halaman {pageCalc.chapter5Start}</div>
          )}
        </section>

        {/* ==================== LAMPIRAN OVERVIEW ==================== */}
        <section className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
          <div className="text-center mb-6">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">LAMPIRAN-LAMPIRAN RESMI</h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Dokumen Pendukung Kurikulum Satuan Pendidikan</p>
            <div className="w-16 h-0.5 bg-slate-900 mx-auto mt-2"></div>
          </div>

          <div className="space-y-4 text-xs text-justify leading-relaxed">
            <p className="indent-8">
              Berikut adalah dokumen pendukung resmi yang menjadi bagian tak terpisahkan dari naskah Dokumen Kurikulum Satuan Pendidikan {doc.identity.name}:
            </p>

            <table className="w-full border-collapse border border-slate-400 text-left my-3">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-400 p-2 text-center w-28">Nomor</th>
                  <th className="border border-slate-400 p-2">Judul Dokumen Lampiran</th>
                  <th className="border border-slate-400 p-2 w-48">Status / Sumber Berkas</th>
                </tr>
              </thead>
              <tbody>
                {doc.appendices.filter(a => a.included).map((app) => (
                  <tr key={app.id}>
                    <td className="border border-slate-400 p-2 font-bold text-emerald-800 text-center">{app.number}</td>
                    <td className="border border-slate-400 p-2">
                      <div className="font-bold text-slate-900">{app.title}</div>
                      <div className="text-[11px] text-slate-500 italic mt-0.5">{app.description}</div>
                    </td>
                    <td className="border border-slate-400 p-2">
                      {app.uploadedFileName ? (
                        <div className="text-emerald-700 font-semibold flex flex-col">
                          <span>Terunggah Word</span>
                          <span className="text-[10px] text-slate-500 truncate">{app.uploadedFileName}</span>
                        </div>
                      ) : (
                        <span className="text-slate-600">Naskah Resmi Satuan Pendidikan</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="indent-8 text-slate-600 italic">
              * Rincian isi dan naskah lengkap dari masing-masing lampiran di atas disajikan pada halaman-halaman lampiran berikut.
            </p>
          </div>

          {showPageNumbers && (
            <div className="text-center text-xs text-slate-400 mt-8">Halaman {pageCalc.appendicesStart}</div>
          )}
        </section>

        {/* ==================== RINCIAN ISI SETIAP LAMPIRAN ==================== */}
        {doc.appendices.filter(a => a.included).map((app, appIdx) => {
          const paragraphsToPrint = 
            (app.paragraphs && app.paragraphs.length > 0)
              ? app.paragraphs
              : app.extractedText
              ? app.extractedText.split(/\r?\n+/).map(p => p.trim()).filter(Boolean)
              : null;

          return (
            <section key={app.id} className="print-page bg-white shadow-xl max-w-4xl mx-auto rounded-xl print:rounded-none print:shadow-none page-break" style={marginStyle}>
              <div className="text-center mb-6">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {app.number}
                </span>
                <h1 className="text-sm font-bold tracking-wider uppercase text-slate-900 mt-2">
                  {app.title}
                </h1>
                <div className="w-12 h-0.5 bg-emerald-600 mx-auto mt-2"></div>
              </div>

              {app.uploadedFileName && (
                <div className="mb-4 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-800">Berkas Word Diunggah:</span>
                    <span className="text-slate-800 font-medium">{app.uploadedFileName}</span>
                    <span className="text-slate-500">({app.uploadedFileSize})</span>
                  </div>
                  {app.uploadedAt && (
                    <span className="text-[11px] text-slate-500 italic">Diunggah: {app.uploadedAt}</span>
                  )}
                </div>
              )}

              {app.description && (
                <p className="text-xs italic text-slate-600 mb-4">{app.description}</p>
              )}

              <div className="space-y-3 text-xs text-justify leading-relaxed text-slate-800">
                {paragraphsToPrint && paragraphsToPrint.length > 0 ? (
                  paragraphsToPrint.map((p, pIdx) => (
                    <p key={pIdx} className="indent-8">{p}</p>
                  ))
                ) : (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-700">
                    {app.contentSnippet || 'Dokumen lampiran tersimpan secara resmi pada arsip kurikulum satuan pendidikan.'}
                  </div>
                )}
              </div>

              {showPageNumbers && (
                <div className="text-center text-xs text-slate-400 mt-8">
                  Halaman {pageCalc.appendicesStart + appIdx + 1}
                </div>
              )}
            </section>
          );
        })}

      </div>
    </div>
  );
};
