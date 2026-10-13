import React, { useRef, useState } from 'react';
import { KSPDocument, EducationLevel } from '../types/ksp';
import { 
  FileDown, 
  Printer, 
  Sliders, 
  BookOpen, 
  Upload, 
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Eye
} from 'lucide-react';
import { exportKspToWord } from '../utils/docxExport';
import { exportKspToPdf, triggerBrowserPrint } from '../utils/pdfExport';

interface HeaderProps {
  document: KSPDocument;
  onUpdateDocument: (doc: KSPDocument) => void;
  onOpenSettings: () => void;
  onSwitchLevel: (level: EducationLevel) => void;
  onResetToDefault: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  document: doc,
  onUpdateDocument,
  onOpenSettings,
  onSwitchLevel,
  activeTab,
  onSelectTab
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handlePrint = async () => {
    // Switch to full preview tab so the user can see the document
    if (activeTab !== 'full') {
      onSelectTab('full');
    }
    const success = triggerBrowserPrint();
    if (!success) {
      // Browser blocked window.print() inside iframe sandbox; automatically download PDF!
      showToast('Peramban membatasi cetak langsung di iframe. Mengunduh PDF secara otomatis...', 'info');
      await handleExportPdfDirect();
    } else {
      showToast('Perintah cetak dikirim. Jika jendela printer tidak muncul, klik "Unduh PDF" atau tekan Ctrl+P.', 'info');
    }
  };

  const handleExportWord = async () => {
    try {
      setIsExportingWord(true);
      showToast('Menyiapkan file Microsoft Word (.docx)...', 'info');
      await exportKspToWord(doc);
      showToast('Dokumen Word (.docx) berhasil diunduh!', 'success');
    } catch (err) {
      console.error('Word export error:', err);
      showToast('Gagal membuat file Word: ' + (err as Error).message, 'error');
    } finally {
      setIsExportingWord(false);
    }
  };

  const handleExportPdfDirect = async () => {
    try {
      setIsExportingPdf(true);
      showToast('Sedang memproses dan menyusun seluruh bab berkas PDF...', 'info');
      await exportKspToPdf(doc);
      showToast('Dokumen PDF resmi berhasil diunduh!', 'success');
    } catch (err) {
      console.error('PDF export error:', err);
      showToast('Gagal mengekspor PDF: ' + (err as Error).message, 'error');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(doc, null, 2));
    const downloadAnchor = window.document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Draft_KSP_${doc.identity.name.replace(/[^a-zA-Z0-9]/g, '_')}_${doc.identity.academicYear.replace(/[/]/g, '-')}.json`);
    downloadAnchor.click();
    showToast('Cadangan data KSP (JSON) berhasil disimpan.', 'success');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.identity && parsed.chapter1 && parsed.chapter2) {
          onUpdateDocument(parsed);
          showToast('Data Kurikulum Satuan Pendidikan berhasil dimuat!', 'success');
        } else {
          showToast('Format berkas JSON tidak sesuai struktur KSP.', 'error');
        }
      } catch (err) {
        showToast('Gagal membaca berkas JSON: ' + (err as Error).message, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs print:hidden">
      {/* Toast Notification Banner */}
      {toast && (
        <div className={`px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'error' ? 'bg-rose-600 text-white' :
          'bg-slate-800 text-white'
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
          {toast.type === 'info' && <Loader2 className="w-3.5 h-3.5 shrink-0 animate-spin" />}
          <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & App Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  Penyusun Kurikulum Satuan Pendidikan
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 shrink-0">
                  BSKAP 2025
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                {doc.identity.name} • TP {doc.identity.academicYear} • Permendikdasmen No. 13/2025
              </p>
            </div>
          </div>

          {/* Preset & Actions */}
          <div className="flex items-center gap-2">
            {/* Level selector */}
            <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              {(['SMP', 'SD', 'SMA', 'SMK', 'PAUD'] as EducationLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onSwitchLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    doc.identity.level === lvl
                      ? 'bg-white text-emerald-700 shadow-xs font-bold'
                      : 'hover:text-slate-900'
                  }`}
                  title={`Ganti template ke jenjang ${lvl}`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Margin & Page Settings */}
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Pengaturan Kertas & Margin"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Kertas & Margin</span>
            </button>

            {/* Save/Load JSON */}
            <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 pl-2">
              <button
                onClick={handleExportJson}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Unduh Cadangan Berkas KSP (JSON)"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Buka / Impor Berkas KSP (JSON)"
              >
                <Upload className="w-4 h-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportJson}
                accept=".json"
                className="hidden"
              />
            </div>

            {/* Export Word (.docx) */}
            <button
              onClick={handleExportWord}
              disabled={isExportingWord}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
              title="Ekspor seluruh dokumen ke format resmi Microsoft Word (.docx)"
            >
              {isExportingWord ? <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" /> : <FileDown className="w-3.5 h-3.5 text-blue-600" />}
              <span className="hidden md:inline">Ekspor Word</span>
              <span className="text-[10px] font-bold bg-blue-200/60 text-blue-800 px-1 rounded">.docx</span>
            </button>

            {/* Unduh PDF (.pdf) */}
            <button
              onClick={handleExportPdfDirect}
              disabled={isExportingPdf}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50"
              title="Unduh dokumen langsung dalam format PDF"
            >
              {isExportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" /> : <FileText className="w-3.5 h-3.5 text-amber-700" />}
              <span className="hidden sm:inline">Unduh</span>
              <span>PDF</span>
            </button>

            {/* Print / Cetak PDF */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm shadow-emerald-600/30 cursor-pointer"
              title="Buka dialog cetak browser (dapat langsung Simpan ke PDF)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
