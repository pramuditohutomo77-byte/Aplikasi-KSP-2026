import React, { useState } from 'react';
import { Chapter4Data, ATPItem } from '../../types/ksp';
import { GraduationCap, Plus, Trash2, Sparkles, BookOpen, Layers } from 'lucide-react';

interface Chapter4EditorProps {
  data: Chapter4Data;
  onUpdateData: (data: Chapter4Data) => void;
}

export const Chapter4Editor: React.FC<Chapter4EditorProps> = ({
  data,
  onUpdateData
}) => {
  const [activeTab, setActiveTab] = useState<'atp' | 'modul_ajar'>('atp');

  // ATP Handlers
  const handleUpdateAtp = (id: string, field: keyof ATPItem, val: any) => {
    onUpdateData({
      ...data,
      atpList: data.atpList.map(a => a.id === id ? { ...a, [field]: val } : a)
    });
  };

  const handleAddAtp = () => {
    const newAtp: ATPItem = {
      id: `atp-${Date.now()}`,
      subjectName: 'Matematika Terapan',
      phase: 'Fase D',
      grades: 'Kelas VII, VIII, IX',
      academicYear: '2025/2026',
      learningOutcomes: 'Peserta didik mampu menyelesaikan masalah kontekstual menggunakan penalaran aljabar, geometri, dan analisis data statistika.',
      learningObjectives: [
        'Menganalisis pola bilangan dan perbandingan dalam transaksi ekonomi.',
        'Menerapkan perhitungan bangun ruang untuk memecahkan masalah nyata.'
      ],
      progressionFlow: [
        { grade: 'Kelas VII', steps: ['7.1 Memahami operasi hitung bilangan rasional.', '7.2 Mengidentifikasi bentuk aljabar dasar.'] },
        { grade: 'Kelas VIII', steps: ['8.1 Menganalisis teorema Pythagoras.', '8.2 Mengolah data diagram lingkaran dan batang.'] },
        { grade: 'Kelas IX', steps: ['9.1 Menganalisis fungsi kuadrat.', '9.2 Menguji hipotesis statistika peluang sederhana.'] }
      ]
    };
    onUpdateData({
      ...data,
      atpList: [...data.atpList, newAtp]
    });
  };

  const handleDeleteAtp = (id: string) => {
    onUpdateData({
      ...data,
      atpList: data.atpList.filter(a => a.id !== id)
    });
  };

  // Lesson Plan handlers
  const handleUpdateLessonPlan = (field: string, val: any) => {
    onUpdateData({
      ...data,
      sampleLessonPlan: {
        ...data.sampleLessonPlan,
        [field]: val
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
        <button
          onClick={() => setActiveTab('atp')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'atp'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>A. Lingkup Satuan Pendidikan (Alur Tujuan Pembelajaran / ATP)</span>
        </button>
        <button
          onClick={() => setActiveTab('modul_ajar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'modul_ajar'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>B. Lingkup Kelas (Modul Ajar Pembelajaran Mendalam / Deep Learning)</span>
        </button>
      </div>

      {/* A. ATP */}
      {activeTab === 'atp' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Perencanaan Lingkup Satuan Pendidikan (ATP)</h2>
                <p className="text-xs text-slate-500">Capaian Pembelajaran (CP) diturunkan ke Tujuan Pembelajaran (TP) dan disusun dalam Alur</p>
              </div>
              <button
                onClick={handleAddAtp}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Matriks ATP Mapel</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Rasional Perencanaan Lingkup Satuan Pendidikan</label>
              {data.satuanPendidikanRationale.map((para, idx) => (
                <textarea
                  key={idx}
                  rows={2}
                  value={para}
                  onChange={(e) => {
                    const arr = [...data.satuanPendidikanRationale];
                    arr[idx] = e.target.value;
                    onUpdateData({ ...data, satuanPendidikanRationale: arr });
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
                />
              ))}
            </div>

            {/* List of ATPs */}
            <div className="space-y-6 pt-4">
              {data.atpList.map((atp) => (
                <div key={atp.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{atp.subjectName}</span>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                        {atp.phase} ({atp.grades})
                      </span>
                    </div>
                    {data.atpList.length > 1 && (
                      <button onClick={() => handleDeleteAtp(atp.id)} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Capaian Pembelajaran (CP)</label>
                    <textarea
                      rows={3}
                      value={atp.learningOutcomes}
                      onChange={(e) => handleUpdateAtp(atp.id, 'learningOutcomes', e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tujuan Pembelajaran (TP)</label>
                      <textarea
                        rows={6}
                        value={atp.learningObjectives.join('\n')}
                        onChange={(e) => handleUpdateAtp(atp.id, 'learningObjectives', e.target.value.split('\n'))}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800"
                        placeholder="Satu baris per tujuan pembelajaran..."
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Alur Perkembangan per Jenjang Kelas</label>
                      <div className="space-y-2">
                        {atp.progressionFlow.map((pf, pIdx) => (
                          <div key={pIdx} className="bg-white p-2 border border-slate-200 rounded-lg text-xs">
                            <span className="font-bold text-emerald-800 block mb-1">{pf.grade}</span>
                            <textarea
                              rows={2}
                              value={pf.steps.join('\n')}
                              onChange={(e) => {
                                const newFlow = [...atp.progressionFlow];
                                newFlow[pIdx].steps = e.target.value.split('\n');
                                handleUpdateAtp(atp.id, 'progressionFlow', newFlow);
                              }}
                              className="w-full p-1 text-[11px] bg-slate-50 border border-slate-200 rounded leading-relaxed"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* B. Modul Ajar Deep Learning */}
      {activeTab === 'modul_ajar' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Perencanaan Pembelajaran Lingkup Kelas</h2>
              <p className="text-xs text-slate-500">
                Format Perencanaan Pembelajaran Mendalam (Deep Learning) - Mindful (Berkesadaran), Meaningful (Bermakna), Joyful (Menggembirakan)
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold rounded-full border border-amber-200">
              Standar BSKAP Kemendikdasmen 2025
            </span>
          </div>

          {/* Form Header info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Nama Penyusun Guru</label>
              <input
                type="text"
                value={data.sampleLessonPlan.designerName}
                onChange={(e) => handleUpdateLessonPlan('designerName', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Mata Pelajaran</label>
              <input
                type="text"
                value={data.sampleLessonPlan.subject}
                onChange={(e) => handleUpdateLessonPlan('subject', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Kelas & Semester / Durasi</label>
              <input
                type="text"
                value={`${data.sampleLessonPlan.classSemester} (${data.sampleLessonPlan.duration})`}
                onChange={(e) => handleUpdateLessonPlan('classSemester', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Identifikasi */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">1. Identifikasi & Konteks Pembelajaran</h3>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Karakteristik & Pengalaman Murid</label>
              <textarea
                rows={2}
                value={data.sampleLessonPlan.studentBackground}
                onChange={(e) => handleUpdateLessonPlan('studentBackground', e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Konteks Materi & Isu Nyata</label>
              <textarea
                rows={2}
                value={data.sampleLessonPlan.learningMaterialContext}
                onChange={(e) => handleUpdateLessonPlan('learningMaterialContext', e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Langkah Pembelajaran Mindful, Meaningful, Joyful */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              2. Skenario Aktivitas Pembelajaran Mendalam
            </h3>

            {data.sampleLessonPlan.meetings.map((m, mIdx) => (
              <div key={mIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <input
                  type="text"
                  value={m.title}
                  onChange={(e) => {
                    const meetings = [...data.sampleLessonPlan.meetings];
                    meetings[mIdx].title = e.target.value;
                    handleUpdateLessonPlan('meetings', meetings);
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-emerald-900"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Mindful & Meaningful */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-emerald-800 text-[11px] block mb-1">
                      1. Memahami (Mindful & Meaningful)
                    </span>
                    <textarea
                      rows={4}
                      value={m.mindfulMeaningfulActivities.join('\n')}
                      onChange={(e) => {
                        const meetings = [...data.sampleLessonPlan.meetings];
                        meetings[mIdx].mindfulMeaningfulActivities = e.target.value.split('\n');
                        handleUpdateLessonPlan('meetings', meetings);
                      }}
                      className="w-full p-1.5 text-[11px] bg-slate-50 border border-slate-200 rounded leading-relaxed"
                    />
                  </div>

                  {/* Applying & Joyful */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-teal-800 text-[11px] block mb-1">
                      2. Mengaplikasikan (Meaningful & Joyful)
                    </span>
                    <textarea
                      rows={4}
                      value={m.applyingJoyfulActivities.join('\n')}
                      onChange={(e) => {
                        const meetings = [...data.sampleLessonPlan.meetings];
                        meetings[mIdx].applyingJoyfulActivities = e.target.value.split('\n');
                        handleUpdateLessonPlan('meetings', meetings);
                      }}
                      className="w-full p-1.5 text-[11px] bg-slate-50 border border-slate-200 rounded leading-relaxed"
                    />
                  </div>

                  {/* Reflecting */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-indigo-800 text-[11px] block mb-1">
                      3. Merefleksi (Mindful Reflection)
                    </span>
                    <textarea
                      rows={4}
                      value={m.reflectingActivities.join('\n')}
                      onChange={(e) => {
                        const meetings = [...data.sampleLessonPlan.meetings];
                        meetings[mIdx].reflectingActivities = e.target.value.split('\n');
                        handleUpdateLessonPlan('meetings', meetings);
                      }}
                      className="w-full p-1.5 text-[11px] bg-slate-50 border border-slate-200 rounded leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Asesmen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rancangan Asesmen Formatif</label>
              <textarea
                rows={2}
                value={data.sampleLessonPlan.formativeAssessment}
                onChange={(e) => handleUpdateLessonPlan('formativeAssessment', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rancangan Asesmen Sumatif (Rubrik Kinerja)</label>
              <textarea
                rows={2}
                value={data.sampleLessonPlan.summativeAssessment}
                onChange={(e) => handleUpdateLessonPlan('summativeAssessment', e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
