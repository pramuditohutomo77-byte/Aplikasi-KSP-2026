import React, { useState } from 'react';
import { KSPDocument, TableOfContentItem } from '../../types/ksp';
import { calculateKspPageStructure } from '../../utils/pageCalculator';
import { ListTree, RefreshCw, CheckCircle, Sparkles, BookOpen } from 'lucide-react';

interface TableOfContentsEditorProps {
  document: KSPDocument;
  onUpdateDocument: (doc: KSPDocument) => void;
}

export const TableOfContentsEditor: React.FC<TableOfContentsEditorProps> = ({
  document: doc,
  onUpdateDocument
}) => {
  const [pageOffset, setPageOffset] = useState<number>(0);
  const calculatedStructure = calculateKspPageStructure(doc);

  const [customItems, setCustomItems] = useState<TableOfContentItem[]>(calculatedStructure.items);

  const handleRecalculate = () => {
    const fresh = calculateKspPageStructure(doc);
    setCustomItems(fresh.items.map(item => ({
      ...item,
      pageNumber: item.pageNumber + pageOffset
    })));
  };

  const handlePageNumberChange = (id: string, newPage: number) => {
    setCustomItems(prev => prev.map(item => item.id === id ? { ...item, pageNumber: newPage } : item));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Configuration & Controls */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <ListTree className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Pengaturan Daftar Isi Otomatis</h2>
              <p className="text-xs text-slate-500">Perhitungan halaman otomatis berdasar volume konten</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Sistem Penomoran Dinamis Cerdas</span>
            </div>
            <p className="leading-relaxed text-[11px] text-emerald-800">
              Aplikasi secara otomatis menghitung estimasi jumlah halaman tiap BAB dan sub-bab berdasarkan jumlah paragraf, tabel personil PTK, rombel siswa, sarpras, tabel struktur kurikulum, alur ATP, dan modul ajar yang telah Anda isi.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Offset Penomoran Halaman (Halaman Sisipan)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="20"
                value={pageOffset}
                onChange={(e) => setPageOffset(parseInt(e.target.value) || 0)}
                className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-center font-bold outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-500">
                Tambah offset jika ada halaman tambahan sebelum BAB I
              </span>
            </div>
          </div>

          <button
            onClick={handleRecalculate}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Hitung Ulang & Sinkronkan Halaman</span>
          </button>

          {/* Ringkasan Estimasi */}
          <div className="pt-3 border-t border-slate-100 text-xs space-y-2 text-slate-600">
            <div className="flex justify-between">
              <span>Estimasi Tebal BAB I :</span>
              <span className="font-semibold text-slate-900">{calculatedStructure.chapter1Pages} Halaman</span>
            </div>
            <div className="flex justify-between">
              <span>Estimasi Tebal BAB II :</span>
              <span className="font-semibold text-slate-900">{calculatedStructure.chapter2Pages} Halaman</span>
            </div>
            <div className="flex justify-between">
              <span>Estimasi Tebal BAB III :</span>
              <span className="font-semibold text-slate-900">{calculatedStructure.chapter3Pages} Halaman</span>
            </div>
            <div className="flex justify-between">
              <span>Estimasi Tebal BAB IV :</span>
              <span className="font-semibold text-slate-900">{calculatedStructure.chapter4Pages} Halaman</span>
            </div>
            <div className="flex justify-between">
              <span>Estimasi Tebal BAB V :</span>
              <span className="font-semibold text-slate-900">{calculatedStructure.chapter5Pages} Halaman</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900">
              <span>Total Estimasi Dokumen :</span>
              <span className="text-emerald-700">{calculatedStructure.totalPages} Halaman</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Table of Contents Sheet */}
      <div className="lg:col-span-7">
        <div className="bg-white p-8 rounded-2xl border border-slate-300 shadow-md text-slate-900 min-h-[620px]">
          <div className="text-center pb-4 mb-6 border-b border-slate-200">
            <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">DAFTAR ISI</h1>
            <p className="text-xs text-slate-500 mt-0.5">{doc.identity.curriculumName} {doc.identity.name}</p>
          </div>

          <div className="space-y-1.5 text-xs">
            {customItems.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between py-1 group ${
                  item.level === 1 ? 'font-bold text-slate-900 mt-2' : 'text-slate-700 pl-4 font-normal'
                }`}
              >
                <div className="flex items-baseline min-w-0 pr-2">
                  {item.code && <span className="mr-2 font-semibold shrink-0">{item.code}</span>}
                  <span className="truncate">{item.title}</span>
                </div>
                
                {/* Dot leader */}
                <div className="grow mx-2 border-b border-dotted border-slate-300 h-2"></div>

                {/* Editable Page Number */}
                <div className="flex items-center shrink-0">
                  <input
                    type="number"
                    value={item.pageNumber}
                    onChange={(e) => handlePageNumberChange(item.id, parseInt(e.target.value) || 1)}
                    className="w-12 px-1.5 py-0.5 bg-slate-50 border border-slate-200 group-hover:border-emerald-500 rounded text-center text-xs font-semibold text-slate-800 outline-none"
                    title="Klik untuk mengubah nomor halaman jika diperlukan"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 italic">
            <span>Nomor halaman di atas sinkron dengan naskah cetak dan ekspor Word.</span>
            <span>Halaman {calculatedStructure.tocPage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
