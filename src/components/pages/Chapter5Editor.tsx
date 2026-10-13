import React, { useState } from 'react';
import { Chapter5Data, EvaluationItem, ProfessionalDevItem, MentoringItem } from '../../types/ksp';
import { CheckCircle2, Plus, Trash2, Calendar, UserCheck, Award } from 'lucide-react';

interface Chapter5EditorProps {
  data: Chapter5Data;
  onUpdateData: (data: Chapter5Data) => void;
}

export const Chapter5Editor: React.FC<Chapter5EditorProps> = ({
  data,
  onUpdateData
}) => {
  const [activeTab, setActiveTab] = useState<'evaluasi' | 'pengembangan' | 'pendampingan'>('evaluasi');

  // Evaluation handlers
  const handleAddEvaluation = () => {
    const newEv: EvaluationItem = {
      id: `eval-${Date.now()}`,
      activityName: 'Kegiatan Evaluasi Baru',
      frequency: 'Per Semester',
      purpose: 'Meninjau efektivitas pembelajaran',
      pic: 'Wakasek Kurikulum'
    };
    onUpdateData({ ...data, evaluationTable: [...data.evaluationTable, newEv] });
  };

  const handleUpdateEvaluation = (id: string, field: keyof EvaluationItem, val: string) => {
    onUpdateData({
      ...data,
      evaluationTable: data.evaluationTable.map(e => e.id === id ? { ...e, [field]: val } : e)
    });
  };

  const handleDeleteEvaluation = (id: string) => {
    onUpdateData({ ...data, evaluationTable: data.evaluationTable.filter(e => e.id !== id) });
  };

  // Professional Dev handlers
  const handleAddProfDev = () => {
    const newPr: ProfessionalDevItem = {
      id: `prof-${Date.now()}`,
      activityName: 'Pelatihan Baru Pendidik',
      schedule: 'September 2025',
      pic: 'Wakasek Kurikulum',
      speaker: 'Narasumber Ahli'
    };
    onUpdateData({ ...data, professionalDevTable: [...data.professionalDevTable, newPr] });
  };

  const handleUpdateProfDev = (id: string, field: keyof ProfessionalDevItem, val: string) => {
    onUpdateData({
      ...data,
      professionalDevTable: data.professionalDevTable.map(p => p.id === id ? { ...p, [field]: val } : p)
    });
  };

  const handleDeleteProfDev = (id: string) => {
    onUpdateData({ ...data, professionalDevTable: data.professionalDevTable.filter(p => p.id !== id) });
  };

  // Mentoring handlers
  const handleAddMentoring = () => {
    const newM: MentoringItem = {
      id: `ment-${Date.now()}`,
      stage: 'Pelaksanaan',
      activityDescription: 'Kegiatan pendampingan supervisi baru...',
      schedule: 'Tengah Semester',
      pic: 'Kepala Sekolah'
    };
    onUpdateData({ ...data, mentoringTable: [...data.mentoringTable, newM] });
  };

  const handleUpdateMentoring = (id: string, field: keyof MentoringItem, val: string) => {
    onUpdateData({
      ...data,
      mentoringTable: data.mentoringTable.map(m => m.id === id ? { ...m, [field]: val } : m)
    });
  };

  const handleDeleteMentoring = (id: string) => {
    onUpdateData({ ...data, mentoringTable: data.mentoringTable.filter(m => m.id !== id) });
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
        <button
          onClick={() => setActiveTab('evaluasi')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'evaluasi'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          A. Evaluasi Kurikulum & Pembelajaran
        </button>
        <button
          onClick={() => setActiveTab('pengembangan')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'pengembangan'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          B. Pengembangan Profesional Guru (Pelatihan/Workshop)
        </button>
        <button
          onClick={() => setActiveTab('pendampingan')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'pendampingan'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          C. Pendampingan & Supervisi Klinis
        </button>
      </div>

      {/* A. Evaluasi */}
      {activeTab === 'evaluasi' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">A. Evaluasi Kurikulum dan Pembelajaran</h2>
              <p className="text-xs text-slate-500">Jadwal dan instrumen evaluasi jangka pendek dan jangka panjang sekolah</p>
            </div>
            <button
              onClick={handleAddEvaluation}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Jadwal Evaluasi</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Narasi Pengantar Evaluasi</label>
            {data.evaluationIntro.map((para, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={para}
                onChange={(e) => {
                  const arr = [...data.evaluationIntro];
                  arr[idx] = e.target.value;
                  onUpdateData({ ...data, evaluationIntro: arr });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
              />
            ))}
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="px-3 py-2 w-12 text-center">No</th>
                  <th className="px-3 py-2 w-48">Nama Kegiatan</th>
                  <th className="px-3 py-2 w-40">Frekuensi / Waktu</th>
                  <th className="px-3 py-2">Tujuan Evaluasi</th>
                  <th className="px-3 py-2 w-40">Penanggung Jawab</th>
                  <th className="px-3 py-2 w-10 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.evaluationTable.map((ev, idx) => (
                  <tr key={ev.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ev.activityName}
                        onChange={(e) => handleUpdateEvaluation(ev.id, 'activityName', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-900"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ev.frequency}
                        onChange={(e) => handleUpdateEvaluation(ev.id, 'frequency', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <textarea
                        rows={2}
                        value={ev.purpose}
                        onChange={(e) => handleUpdateEvaluation(ev.id, 'purpose', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs leading-relaxed"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ev.pic}
                        onChange={(e) => handleUpdateEvaluation(ev.id, 'pic', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button onClick={() => handleDeleteEvaluation(ev.id)} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* B. Pengembangan Profesional */}
      {activeTab === 'pengembangan' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">B. Pengembangan Profesional Pendidik</h2>
              <p className="text-xs text-slate-500">Agenda pelatihan, workshop kurikulum, dan penguatan kompetensi guru</p>
            </div>
            <button
              onClick={handleAddProfDev}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Program Pelatihan</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Narasi Pengantar</label>
            {data.professionalDevIntro.map((para, idx) => (
              <textarea
                key={idx}
                rows={2}
                value={para}
                onChange={(e) => {
                  const arr = [...data.professionalDevIntro];
                  arr[idx] = e.target.value;
                  onUpdateData({ ...data, professionalDevIntro: arr });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
              />
            ))}
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="px-3 py-2 w-12 text-center">No</th>
                  <th className="px-3 py-2">Nama Program Pelatihan / Workshop</th>
                  <th className="px-3 py-2 w-36">Waktu</th>
                  <th className="px-3 py-2 w-48">Narasumber</th>
                  <th className="px-3 py-2 w-40">Penanggung Jawab</th>
                  <th className="px-3 py-2 w-10 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.professionalDevTable.map((pr, idx) => (
                  <tr key={pr.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={pr.activityName}
                        onChange={(e) => handleUpdateProfDev(pr.id, 'activityName', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-900"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={pr.schedule}
                        onChange={(e) => handleUpdateProfDev(pr.id, 'schedule', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={pr.speaker}
                        onChange={(e) => handleUpdateProfDev(pr.id, 'speaker', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={pr.pic}
                        onChange={(e) => handleUpdateProfDev(pr.id, 'pic', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button onClick={() => handleDeleteProfDev(pr.id)} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* C. Pendampingan */}
      {activeTab === 'pendampingan' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">C. Pendampingan & Supervisi Klinis</h2>
              <p className="text-xs text-slate-500">Tahapan pembinaan persiapan, observasi kelas, dan coaching reflektif</p>
            </div>
            <button
              onClick={handleAddMentoring}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Tahap Pendampingan</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="px-3 py-2 w-32">Tahapan</th>
                  <th className="px-3 py-2">Uraian Kegiatan Pendampingan</th>
                  <th className="px-3 py-2 w-44">Waktu Pelaksanaan</th>
                  <th className="px-3 py-2 w-44">Penanggung Jawab</th>
                  <th className="px-3 py-2 w-10 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.mentoringTable.map((mn) => (
                  <tr key={mn.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2">
                      <select
                        value={mn.stage}
                        onChange={(e) => handleUpdateMentoring(mn.id, 'stage', e.target.value)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-emerald-800"
                      >
                        <option value="Persiapan">Persiapan</option>
                        <option value="Pelaksanaan">Pelaksanaan</option>
                        <option value="Tindak Lanjut">Tindak Lanjut</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <textarea
                        rows={2}
                        value={mn.activityDescription}
                        onChange={(e) => handleUpdateMentoring(mn.id, 'activityDescription', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs leading-relaxed"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={mn.schedule}
                        onChange={(e) => handleUpdateMentoring(mn.id, 'schedule', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={mn.pic}
                        onChange={(e) => handleUpdateMentoring(mn.id, 'pic', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button onClick={() => handleDeleteMentoring(mn.id)} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
