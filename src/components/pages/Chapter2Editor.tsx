import React from 'react';
import { Chapter2Data } from '../../types/ksp';
import { Target, Plus, Trash2, CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react';

interface Chapter2EditorProps {
  data: Chapter2Data;
  onUpdateData: (data: Chapter2Data) => void;
}

export const Chapter2Editor: React.FC<Chapter2EditorProps> = ({
  data,
  onUpdateData
}) => {
  // Handlers for Mission
  const handleAddMission = () => {
    onUpdateData({
      ...data,
      missions: [...data.missions, 'Melaksanakan aksi pembelajaran baru...']
    });
  };

  const handleUpdateMission = (index: number, val: string) => {
    const updated = [...data.missions];
    updated[index] = val;
    onUpdateData({ ...data, missions: updated });
  };

  const handleDeleteMission = (index: number) => {
    if (data.missions.length <= 1) return;
    onUpdateData({ ...data, missions: data.missions.filter((_, i) => i !== index) });
  };

  // Handlers for Goals
  const handleAddGoal = () => {
    onUpdateData({
      ...data,
      goals: [...data.goals, 'Terwujudnya peningkatan capaian kompetensi...']
    });
  };

  const handleUpdateGoal = (index: number, val: string) => {
    const updated = [...data.goals];
    updated[index] = val;
    onUpdateData({ ...data, goals: updated });
  };

  const handleDeleteGoal = (index: number) => {
    if (data.goals.length <= 1) return;
    onUpdateData({ ...data, goals: data.goals.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      {/* 8 Dimensi Profil Lulusan Reference Card based on BSKAP 2025 */}
      <div className="bg-linear-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <h3 className="text-sm font-bold text-white">Fondasi Utama: 8 Dimensi Profil Lulusan (Permendikdasmen 2025)</h3>
        </div>
        <p className="text-xs text-slate-300 mb-3">
          Sesuai Panduan Pengembangan KSP 2025 (Hal. 2, 8, 20-22), rumusan Visi, Misi, dan Tujuan satuan pendidikan berpusat pada murid dan menyasar delapan dimensi profil lulusan:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, title: 'Keimanan & Ketakwaan', desc: 'Kepada Tuhan YME' },
            { num: 2, title: 'Kewargaan', desc: 'Cinta Tanah Air & Budaya' },
            { num: 3, title: 'Penalaran Kritis', desc: 'Berpikir Analitis & Logis' },
            { num: 4, title: 'Kreativitas', desc: 'Daya Cipta & Inovasi' },
            { num: 5, title: 'Kolaborasi', desc: 'Gotong Royong & Tim' },
            { num: 6, title: 'Kemandirian', desc: 'Regulasi Diri & Adaptif' },
            { num: 7, title: 'Kesehatan', desc: 'Fisik, Mental & Kebugaran' },
            { num: 8, title: 'Komunikasi', desc: 'Ekspresi Efektif & Positif' },
          ].map((dim) => (
            <div key={dim.num} className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[11px] font-black inline-flex items-center justify-center mb-1">
                {dim.num}
              </span>
              <div className="font-bold text-[11px] text-white">{dim.title}</div>
              <div className="text-[10px] text-emerald-200 mt-0.5">{dim.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* A. Visi */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Target className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-bold text-slate-900">A. Visi Satuan Pendidikan</h2>
            <p className="text-xs text-slate-500">Cita-cita bersama jangka panjang berpusat pada murid (Ditinjau 4-5 tahun)</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Kalimat Visi Utama</label>
          <textarea
            rows={2}
            value={data.vision}
            onChange={(e) => onUpdateData({ ...data, vision: e.target.value })}
            className="w-full p-3 bg-emerald-50/50 border border-emerald-300 rounded-xl text-sm font-bold text-emerald-950 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Narasi Penjabaran Nilai & Makna Visi</label>
          {data.visionNarrative.map((para, idx) => (
            <textarea
              key={idx}
              rows={3}
              value={para}
              onChange={(e) => {
                const arr = [...data.visionNarrative];
                arr[idx] = e.target.value;
                onUpdateData({ ...data, visionNarrative: arr });
              }}
              className="w-full p-2.5 mb-2 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          ))}
        </div>
      </div>

      {/* B. Misi */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">B. Misi Satuan Pendidikan</h2>
            <p className="text-xs text-slate-500">Kalimat tindakan nyata terukur untuk mewujudkan visi sekolah</p>
          </div>
          <button
            onClick={handleAddMission}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Misi</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.missions.map((misi, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-1">
                {idx + 1}
              </span>
              <textarea
                rows={2}
                value={misi}
                onChange={(e) => handleUpdateMission(idx, e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              {data.missions.length > 1 && (
                <button
                  onClick={() => handleDeleteMission(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors shrink-0 mt-1"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* C. Tujuan */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">C. Tujuan Satuan Pendidikan (SMART)</h2>
            <p className="text-xs text-slate-500">
              Milestone terukur hasil yang berdampak langsung pada murid (Specific, Measurable, Attainable, Relevant, Time-bound)
            </p>
          </div>
          <button
            onClick={handleAddGoal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Tujuan</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.goals.map((goal, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center shrink-0 mt-1">
                {idx + 1}
              </span>
              <textarea
                rows={2}
                value={goal}
                onChange={(e) => handleUpdateGoal(idx, e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              {data.goals.length > 1 && (
                <button
                  onClick={() => handleDeleteGoal(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors shrink-0 mt-1"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Keselarasan SMART (Evaluated & Reviewed)</label>
          <input
            type="text"
            value={data.smartAnalysisNotes}
            onChange={(e) => onUpdateData({ ...data, smartAnalysisNotes: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 italic"
          />
        </div>
      </div>
    </div>
  );
};
