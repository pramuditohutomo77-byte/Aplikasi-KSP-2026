import React from 'react';
import { ForewordConfig, SchoolIdentity } from '../../types/ksp';
import { HeartHandshake, Plus, Trash2, RotateCcw, Sparkles } from 'lucide-react';

interface ForewordEditorProps {
  foreword: ForewordConfig;
  identity: SchoolIdentity;
  onUpdateForeword: (foreword: ForewordConfig) => void;
}

export const ForewordEditor: React.FC<ForewordEditorProps> = ({
  foreword,
  identity,
  onUpdateForeword
}) => {
  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...foreword.paragraphs];
    updated[index] = val;
    onUpdateForeword({
      ...foreword,
      paragraphs: updated
    });
  };

  const handleAddParagraph = () => {
    onUpdateForeword({
      ...foreword,
      paragraphs: [...foreword.paragraphs, 'Tulis paragraf tambahan di sini...']
    });
  };

  const handleRemoveParagraph = (index: number) => {
    if (foreword.paragraphs.length <= 1) return;
    onUpdateForeword({
      ...foreword,
      paragraphs: foreword.paragraphs.filter((_, idx) => idx !== index)
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editor Side */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">Template Kata Pengantar</h2>
                <p className="text-xs text-slate-500">Prakata resmi Kepala Sekolah berstandar Permendikdasmen 13/2025</p>
              </div>
            </div>
            <button
              onClick={handleAddParagraph}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Paragraf</span>
            </button>
          </div>

          <div className="space-y-4">
            {foreword.paragraphs.map((para, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 relative group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    Paragraf {idx + 1} {idx === 0 ? '(Pembuka & Puji Syukur)' : idx === 1 ? '(Dasar Regulasi 2025)' : idx === 2 ? '(Deep Learning & 8 Profil Lulusan)' : '(Penutup & Apresiasi)'}
                  </span>
                  {foreword.paragraphs.length > 1 && (
                    <button
                      onClick={() => handleRemoveParagraph(idx)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                      title="Hapus paragraf"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <textarea
                  rows={4}
                  value={para}
                  onChange={(e) => handleParagraphChange(idx, e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            ))}
          </div>

          {/* Tanggal & Penandatangan */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tempat Penandatanganan</label>
              <input
                type="text"
                value={foreword.signingPlace}
                onChange={(e) => onUpdateForeword({ ...foreword, signingPlace: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Dokumen</label>
              <input
                type="text"
                value={foreword.signingDate}
                onChange={(e) => onUpdateForeword({ ...foreword, signingDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan Penandatangan</label>
              <input
                type="text"
                value={foreword.signatoryTitle}
                onChange={(e) => onUpdateForeword({ ...foreword, signatoryTitle: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kepala Sekolah</label>
              <input
                type="text"
                value={foreword.signatoryName}
                onChange={(e) => onUpdateForeword({ ...foreword, signatoryName: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Document Sheet Preview */}
      <div className="lg:col-span-5 sticky top-32">
        <div className="bg-white p-7 rounded-2xl border border-slate-300 shadow-md text-slate-900 min-h-[580px] flex flex-col justify-between text-xs">
          <div>
            <div className="text-center pb-4 mb-4">
              <h1 className="text-base font-bold tracking-wider uppercase text-slate-900">KATA PENGANTAR</h1>
              <div className="w-12 h-0.5 bg-slate-800 mx-auto mt-2"></div>
            </div>

            <div className="space-y-3 leading-relaxed text-justify text-slate-800">
              {foreword.paragraphs.map((p, idx) => (
                <p key={idx} className="indent-8 text-[11px] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 flex justify-end">
            <div className="w-56 text-left">
              <p className="text-[11px] text-slate-700">
                {foreword.signingPlace}, {foreword.signingDate}
              </p>
              <p className="text-[11px] font-semibold text-slate-800">
                {foreword.signatoryTitle}
              </p>
              <div className="h-16 flex items-end">
                <div className="text-[9px] text-emerald-800 italic border border-emerald-300 px-2 py-0.5 rounded bg-emerald-50/50">
                  (tanda tangan kepala sekolah)
                </div>
              </div>
              <p className="font-bold underline text-slate-900 mt-1 text-[11px]">
                {foreword.signatoryName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
