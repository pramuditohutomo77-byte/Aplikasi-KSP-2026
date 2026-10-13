import React, { useState, useRef } from 'react';
import { AppendixItem } from '../../types/ksp';
import { 
  Paperclip, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ChevronDown, 
  ChevronUp,
  FileCheck,
  Eye,
  Info
} from 'lucide-react';
import mammoth from 'mammoth';

interface AppendicesEditorProps {
  appendices: AppendixItem[];
  onUpdateAppendices: (appendices: AppendixItem[]) => void;
}

export const AppendicesEditor: React.FC<AppendicesEditorProps> = ({
  appendices,
  onUpdateAppendices
}) => {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<{ id: string; msg: string } | null>(null);
  const [expandedPreviewId, setExpandedPreviewId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleToggleInclude = (id: string) => {
    onUpdateAppendices(
      appendices.map(a => a.id === id ? { ...a, included: !a.included } : a)
    );
  };

  const handleUpdate = (id: string, field: keyof AppendixItem, val: any) => {
    onUpdateAppendices(
      appendices.map(a => a.id === id ? { ...a, [field]: val } : a)
    );
  };

  const handleAddAppendix = () => {
    const nextNum = appendices.length + 1;
    const newApp: AppendixItem = {
      id: `app-${Date.now()}`,
      number: `Lampiran ${nextNum}`,
      title: 'Judul Dokumen Lampiran Baru',
      description: 'Deskripsi rincian dokumen lampiran kurikulum.',
      included: true,
      type: 'custom',
      contentSnippet: 'Keterangan isi dan ringkasan lampiran...'
    };
    onUpdateAppendices([...appendices, newApp]);
  };

  const handleDelete = (id: string) => {
    onUpdateAppendices(appendices.filter(a => a.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileUpload = async (id: string, file: File) => {
    setErrorMsg(null);
    setProcessingId(id);

    try {
      const fileName = file.name;
      const fileSize = formatFileSize(file.size);
      const isDocx = fileName.toLowerCase().endsWith('.docx');
      const isTxt = fileName.toLowerCase().endsWith('.txt');

      if (!isDocx && !isTxt) {
        throw new Error('Format berkas tidak didukung. Harap unggah berkas berekstensi .docx (Word) atau .txt');
      }

      let extractedText = '';
      let htmlContent = '';
      let paragraphs: string[] = [];

      if (isDocx) {
        const arrayBuffer = await file.arrayBuffer();
        
        // Extract raw text
        const textResult = await mammoth.extractRawText({ arrayBuffer });
        extractedText = textResult.value.trim();

        // Extract HTML for preview
        try {
          const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
          htmlContent = htmlResult.value;
        } catch {
          // ignore html failure
        }
      } else if (isTxt) {
        extractedText = await file.text();
      }

      // Split into clean paragraphs
      paragraphs = extractedText
        .split(/\r?\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

      if (paragraphs.length === 0) {
        paragraphs = [extractedText || 'Dokumen lampiran tanpa konten teks terdeteksi.'];
      }

      // Update state
      const now = new Date();
      const timeStr = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;

      onUpdateAppendices(
        appendices.map(a => {
          if (a.id === id) {
            return {
              ...a,
              uploadedFileName: fileName,
              uploadedFileSize: fileSize,
              uploadedAt: timeStr,
              extractedText,
              paragraphs,
              htmlContent,
              // Use first 300 chars as content snippet if snippet was empty or placeholder
              contentSnippet: a.contentSnippet && !a.contentSnippet.includes('Keterangan isi dan ringkasan') 
                ? a.contentSnippet 
                : extractedText.slice(0, 250) + (extractedText.length > 250 ? '...' : '')
            };
          }
          return a;
        })
      );

      // Auto expand preview so user can review the extracted text
      setExpandedPreviewId(id);
    } catch (err) {
      console.error('File parsing error:', err);
      setErrorMsg({ id, msg: (err as Error).message || 'Gagal membaca isi berkas.' });
    } finally {
      setProcessingId(null);
    }
  };

  const handleRemoveUploadedFile = (id: string) => {
    onUpdateAppendices(
      appendices.map(a => {
        if (a.id === id) {
          const { uploadedFileName, uploadedFileSize, uploadedAt, extractedText, paragraphs, htmlContent, ...rest } = a;
          return rest;
        }
        return a;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Paperclip className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Kelola Lampiran Dokumen Kurikulum</h2>
            <p className="text-xs text-slate-500">
              Lampiran pendukung resmi: SK Pembagian Tugas (PBM), Kalender Akademik, Roster Pelajaran, Contoh Modul Ajar Deep Learning
            </p>
          </div>
        </div>
        <button
          onClick={handleAddAppendix}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Lampiran Baru</span>
        </button>
      </div>

      {/* Feature Notification / Banner */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 flex items-start gap-3 shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
          <Upload className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-blue-950 flex items-center gap-2">
            <span>Dukungan Unggah Berkas Word Asli (.docx) untuk Setiap Lampiran</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-200/80 text-blue-800">
              Otomatis Menyatu di Word & PDF
            </span>
          </p>
          <p className="text-blue-800 text-[11.5px] leading-relaxed">
            Anda dapat langsung mengunggah berkas Word (misalnya dokumen SK Tim Pengembang, Kalender Akademik, Contoh RPP/Modul Ajar, SOP Sekolah). 
            Ketika Anda mengklik tombol <b>"Ekspor Word (.docx)"</b> atau <b>"Unduh PDF (.pdf)"</b>, seluruh teks paragraf dari berkas yang Anda unggah akan otomatis digabungkan dan dicetak secara utuh di halaman lampiran dokumen!
          </p>
        </div>
      </div>

      {/* Appendices Cards List */}
      <div className="space-y-4">
        {appendices.map((app) => (
          <div
            key={app.id}
            className={`p-5 rounded-2xl border transition-all ${
              app.included
                ? 'bg-white border-slate-200 shadow-xs'
                : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            {/* Header of Item */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={app.included}
                  onChange={() => handleToggleInclude(app.id)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  id={`check-${app.id}`}
                />
                <label htmlFor={`check-${app.id}`} className="cursor-pointer flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {app.number}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{app.title}</span>
                  {app.uploadedFileName && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      <FileCheck className="w-3 h-3 text-emerald-600" />
                      <span>Berkas Terunggah</span>
                    </span>
                  )}
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(app.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                  title="Hapus Lampiran"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inputs & Upload Section */}
            <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
              {/* Metadata: Title & Description */}
              <div className="lg:col-span-6 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Judul Lampiran</label>
                  <input
                    type="text"
                    value={app.title}
                    onChange={(e) => handleUpdate(app.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Deskripsi Singkat Dokumen</label>
                  <textarea
                    rows={2}
                    value={app.description}
                    onChange={(e) => handleUpdate(app.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="Contoh: Keputusan Kepala Sekolah tentang Pembagian Tugas Guru dan Tenaga Kependidikan..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Ringkasan Naskah / Catatan Lampiran
                  </label>
                  <textarea
                    rows={3}
                    value={app.contentSnippet}
                    onChange={(e) => handleUpdate(app.id, 'contentSnippet', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="Keterangan singkat naskah lampiran..."
                  />
                </div>
              </div>

              {/* Upload Word / Document Section */}
              <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50/70 border border-slate-200 rounded-xl p-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Unggah Berkas Word Asli (.docx)</span>
                    </span>
                    {app.uploadedFileName && (
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {app.paragraphs ? `${app.paragraphs.length} Paragraf Terbaca` : 'Teks Terbaca'}
                      </span>
                    )}
                  </div>

                  {/* Hidden Input File */}
                  <input
                    type="file"
                    accept=".docx,.txt"
                    ref={(el) => { fileInputRefs.current[app.id] = el; }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileUpload(app.id, f);
                    }}
                    className="hidden"
                  />

                  {/* If file already uploaded */}
                  {app.uploadedFileName ? (
                    <div className="bg-white border border-emerald-200 rounded-xl p-3.5 space-y-2.5 shadow-2xs">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                            <FileCheck className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-bold text-slate-900 truncate" title={app.uploadedFileName}>
                              {app.uploadedFileName}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {app.uploadedFileSize} • Diunggah {app.uploadedAt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[app.id]?.click()}
                            disabled={processingId === app.id}
                            className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          >
                            Ganti Berkas
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveUploadedFile(app.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Berkas Unggahan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Siap diekspor ke Word & PDF</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => setExpandedPreviewId(expandedPreviewId === app.id ? null : app.id)}
                          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{expandedPreviewId === app.id ? 'Sembunyikan Teks' : 'Lihat / Edit Teks'}</span>
                          {expandedPreviewId === app.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Dropzone / Upload Trigger Button */
                    <div
                      onClick={() => fileInputRefs.current[app.id]?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-xl p-4 text-center cursor-pointer transition-all group"
                    >
                      {processingId === app.id ? (
                        <div className="flex flex-col items-center justify-center py-2 space-y-2">
                          <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
                          <p className="text-xs font-bold text-slate-700">Mengekstrak teks berkas Word (.docx)...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
                          <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-emerald-100 group-hover:text-emerald-700 text-slate-600 flex items-center justify-center transition-colors">
                            <Upload className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-emerald-700 group-hover:underline">
                              Klik untuk Unggah Berkas Word
                            </span>
                            <span className="text-xs text-slate-500"> (.docx)</span>
                          </div>
                          <p className="text-[10px] text-slate-400">
                            Isi berkas akan otomatis diekstrak dan disertakan pada dokumen KSP
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Error Notification */}
                  {errorMsg && errorMsg.id === app.id && (
                    <div className="mt-2 text-[11px] text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMsg.msg}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 text-[10.5px] text-slate-500 italic">
                  * Teks naskah lampiran akan ditempatkan di halaman tersendiri saat ekspor Word (.docx) & PDF.
                </div>
              </div>
            </div>

            {/* Expandable Extracted Content Editor / Preview */}
            {expandedPreviewId === app.id && (app.extractedText || app.paragraphs) && (
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pratinjau & Pengeditan Teks Hasil Ekstraksi Berkas Word</span>
                  </label>
                  <span className="text-[10px] text-slate-500">
                    Anda dapat menyunting teks di bawah ini sebelum diekspor
                  </span>
                </div>
                
                <textarea
                  rows={8}
                  value={app.extractedText || (app.paragraphs ? app.paragraphs.join('\n\n') : '')}
                  onChange={(e) => {
                    const newText = e.target.value;
                    const newParas = newText.split(/\r?\n+/).map(p => p.trim()).filter(p => p.length > 0);
                    onUpdateAppendices(
                      appendices.map(a => a.id === app.id ? { ...a, extractedText: newText, paragraphs: newParas } : a)
                    );
                  }}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-800 leading-relaxed focus:ring-2 focus:ring-emerald-500"
                  placeholder="Isi teks hasil ekstraksi berkas..."
                />

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Jumlah Paragraf: <b>{app.paragraphs?.length || 0}</b></span>
                  <button
                    type="button"
                    onClick={() => setExpandedPreviewId(null)}
                    className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                  >
                    Tutup Pratinjau
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
