import React, { useState } from 'react';
import { Chapter3Data, SubjectHourItem, KokurikulerItem, EkstrakurikulerItem } from '../../types/ksp';
import { Layers, Plus, Trash2, Calendar, BookOpen, Sparkles, Activity } from 'lucide-react';

interface Chapter3EditorProps {
  data: Chapter3Data;
  onUpdateData: (data: Chapter3Data) => void;
}

export const Chapter3Editor: React.FC<Chapter3EditorProps> = ({
  data,
  onUpdateData
}) => {
  const [activeSection, setActiveSection] = useState<'pendekatan' | 'intrakurikuler' | 'kokurikuler' | 'ekstrakurikuler' | 'waktu'>('intrakurikuler');

  // Intra Table Subject update
  const handleUpdateSubject = (tableIdx: number, subjectId: string, field: keyof SubjectHourItem, val: any) => {
    const updatedTables = [...data.curriculumStructureTables];
    const table = updatedTables[tableIdx];
    table.items = table.items.map(item => {
      if (item.id !== subjectId) return item;
      const numVal = Number(val) || 0;
      const updatedItem = { ...item, [field]: typeof val === 'number' ? numVal : val };
      if (field === 'intraHoursPerYear' || field === 'kokoHoursPerYear') {
        updatedItem.totalHoursPerYear = Number(updatedItem.intraHoursPerYear) + Number(updatedItem.kokoHoursPerYear);
      }
      return updatedItem;
    });
    onUpdateData({ ...data, curriculumStructureTables: updatedTables });
  };

  const handleAddSubject = (tableIdx: number) => {
    const updatedTables = [...data.curriculumStructureTables];
    const newSubj: SubjectHourItem = {
      id: `subj-${Date.now()}`,
      subjectName: 'Mata Pelajaran Baru',
      intraHoursPerWeek: 2,
      intraHoursPerYear: 72,
      kokoHoursPerYear: 36,
      totalHoursPerYear: 108
    };
    updatedTables[tableIdx].items.push(newSubj);
    onUpdateData({ ...data, curriculumStructureTables: updatedTables });
  };

  const handleDeleteSubject = (tableIdx: number, subjectId: string) => {
    const updatedTables = [...data.curriculumStructureTables];
    updatedTables[tableIdx].items = updatedTables[tableIdx].items.filter(item => item.id !== subjectId);
    onUpdateData({ ...data, curriculumStructureTables: updatedTables });
  };

  // Kokurikuler update
  const handleAddKokurikuler = () => {
    const newKoko: KokurikulerItem = {
      id: `koko-${Date.now()}`,
      classes: 'Kelas VII, VIII, IX',
      dimensions: 'Kemandirian, Kolaborasi',
      theme: 'Tema Proyek Baru',
      method: 'Pembelajaran kolaboratif lintas disiplin ilmu',
      activities: ['Perencanaan Awal', 'Eksplorasi Lapangan', 'Pembuatan Produk', 'Refleksi'],
      relatedSubjects: 'IPA, Bahasa Indonesia',
      allocationJP: 80
    };
    onUpdateData({ ...data, kokurikulerProjects: [...data.kokurikulerProjects, newKoko] });
  };

  const handleUpdateKokurikuler = (id: string, field: keyof KokurikulerItem, val: any) => {
    onUpdateData({
      ...data,
      kokurikulerProjects: data.kokurikulerProjects.map(k => k.id === id ? { ...k, [field]: val } : k)
    });
  };

  const handleDeleteKokurikuler = (id: string) => {
    onUpdateData({
      ...data,
      kokurikulerProjects: data.kokurikulerProjects.filter(k => k.id !== id)
    });
  };

  // Ekstrakurikuler update
  const handleAddEkstrakurikuler = () => {
    const newE: EkstrakurikulerItem = {
      id: `ekskul-${Date.now()}`,
      name: 'Ekstrakurikuler Baru',
      goals: ['Mengembangkan minat dan bakat peserta didik.'],
      dimensions: 'Kemandirian, Kolaborasi',
      timeWeekly: '2 JP/pekan',
      coach: 'Pembina Baru, S.Pd.',
      location: 'Lapangan Sekolah'
    };
    onUpdateData({ ...data, ekstrakurikulerList: [...data.ekstrakurikulerList, newE] });
  };

  const handleUpdateEkstrakurikuler = (id: string, field: keyof EkstrakurikulerItem, val: any) => {
    onUpdateData({
      ...data,
      ekstrakurikulerList: data.ekstrakurikulerList.map(e => e.id === id ? { ...e, [field]: val } : e)
    });
  };

  const handleDeleteEkstrakurikuler = (id: string) => {
    onUpdateData({
      ...data,
      ekstrakurikulerList: data.ekstrakurikulerList.filter(e => e.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'intrakurikuler' as const, label: 'A. Intrakurikuler & Beban Belajar' },
          { id: 'kokurikuler' as const, label: 'B. Kokurikuler (7KAIH & 8 Profil)' },
          { id: 'ekstrakurikuler' as const, label: 'C. Ekstrakurikuler' },
          { id: 'pendekatan' as const, label: 'Pendekatan Belajar' },
          { id: 'waktu' as const, label: 'D. Pengaturan Waktu' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSection(t.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeSection === t.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* A. Intrakurikuler */}
      {activeSection === 'intrakurikuler' && (
        <div className="space-y-6">
          {data.curriculumStructureTables.map((tbl, tableIdx) => {
            const totalIntraWeek = tbl.items.reduce((acc, curr) => acc + (Number(curr.intraHoursPerWeek) || 0), 0);
            const totalIntraYear = tbl.items.reduce((acc, curr) => acc + (Number(curr.intraHoursPerYear) || 0), 0);
            const totalKokoYear = tbl.items.reduce((acc, curr) => acc + (Number(curr.kokoHoursPerYear) || 0), 0);
            const grandTotalYear = tbl.items.reduce((acc, curr) => acc + (Number(curr.totalHoursPerYear) || 0), 0);

            return (
              <div key={tableIdx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{tbl.title}</h3>
                    <p className="text-xs text-slate-500">Struktur alokasi jam pembelajaran intrakurikuler dan kokurikuler</p>
                  </div>
                  <button
                    onClick={() => handleAddSubject(tableIdx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Mapel</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px]">
                      <tr>
                        <th className="px-3 py-2.5">Mata Pelajaran</th>
                        <th className="px-3 py-2.5 text-center w-28">Intra / Minggu (JP)</th>
                        <th className="px-3 py-2.5 text-center w-28">Intra / Tahun (JP)</th>
                        <th className="px-3 py-2.5 text-center w-28">Koko / Tahun (JP)</th>
                        <th className="px-3 py-2.5 text-center w-28 font-bold">Total JP / Thn</th>
                        <th className="px-3 py-2.5 text-center w-12">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {tbl.items.map((it) => (
                        <tr key={it.id} className="hover:bg-slate-50">
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={it.subjectName}
                              onChange={(e) => handleUpdateSubject(tableIdx, it.id, 'subjectName', e.target.value)}
                              className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-900"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <input
                              type="number"
                              min="0"
                              value={it.intraHoursPerWeek}
                              onChange={(e) => handleUpdateSubject(tableIdx, it.id, 'intraHoursPerWeek', parseInt(e.target.value) || 0)}
                              className="w-16 px-1.5 py-1 bg-white border border-slate-200 rounded text-center text-xs"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <input
                              type="number"
                              min="0"
                              value={it.intraHoursPerYear}
                              onChange={(e) => handleUpdateSubject(tableIdx, it.id, 'intraHoursPerYear', parseInt(e.target.value) || 0)}
                              className="w-16 px-1.5 py-1 bg-white border border-slate-200 rounded text-center text-xs"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <input
                              type="number"
                              min="0"
                              value={it.kokoHoursPerYear}
                              onChange={(e) => handleUpdateSubject(tableIdx, it.id, 'kokoHoursPerYear', parseInt(e.target.value) || 0)}
                              className="w-16 px-1.5 py-1 bg-white border border-slate-200 rounded text-center text-xs"
                            />
                          </td>
                          <td className="px-3 py-2 text-center font-bold text-emerald-800 text-sm">
                            {it.totalHoursPerYear}
                          </td>
                          <td className="px-3 py-2 text-center">
                            <button
                              onClick={() => handleDeleteSubject(tableIdx, it.id)}
                              className="text-slate-400 hover:text-rose-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold border-t border-slate-200 text-slate-900">
                      <tr>
                        <td className="px-3 py-2.5">Total Jam Pelajaran Terpenuhi</td>
                        <td className="px-3 py-2.5 text-center text-emerald-700">{totalIntraWeek} JP</td>
                        <td className="px-3 py-2.5 text-center text-emerald-700">{totalIntraYear} JP</td>
                        <td className="px-3 py-2.5 text-center text-emerald-700">{totalKokoYear} JP</td>
                        <td className="px-3 py-2.5 text-center text-emerald-800 text-sm font-black">{grandTotalYear} JP</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* B. Kokurikuler */}
      {activeSection === 'kokurikuler' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">B. Kegiatan Kokurikuler & 8 Dimensi Profil Lulusan</h2>
              <p className="text-xs text-slate-500">
                Pembelajaran kolaboratif lintas disiplin, Gerakan 7 Kebiasaan Anak Indonesia Hebat (7KAIH), dan konservasi alam
              </p>
            </div>
            <button
              onClick={handleAddKokurikuler}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Tema Proyek</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.kokurikulerProjects.map((koko) => (
              <div key={koko.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {koko.classes}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{koko.theme}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {koko.allocationJP} JP
                    </span>
                    <button
                      onClick={() => handleDeleteKokurikuler(koko.id)}
                      className="p-1 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Tema / Judul Proyek</label>
                    <input
                      type="text"
                      value={koko.theme}
                      onChange={(e) => handleUpdateKokurikuler(koko.id, 'theme', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Target Dimensi Profil Lulusan</label>
                    <input
                      type="text"
                      value={koko.dimensions}
                      onChange={(e) => handleUpdateKokurikuler(koko.id, 'dimensions', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Bentuk & Metode Pelaksanaan</label>
                    <input
                      type="text"
                      value={koko.method}
                      onChange={(e) => handleUpdateKokurikuler(koko.id, 'method', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Mata Pelajaran Terkait</label>
                    <input
                      type="text"
                      value={koko.relatedSubjects}
                      onChange={(e) => handleUpdateKokurikuler(koko.id, 'relatedSubjects', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Rangkaian Aktivitas Proyek</label>
                  <textarea
                    rows={2}
                    value={koko.activities.join('\n')}
                    onChange={(e) => handleUpdateKokurikuler(koko.id, 'activities', e.target.value.split('\n'))}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed"
                    placeholder="Satu baris per aktivitas..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* C. Ekstrakurikuler */}
      {activeSection === 'ekstrakurikuler' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">C. Kegiatan Ekstrakurikuler</h2>
              <p className="text-xs text-slate-500">Pramuka (wajib) dan ragam ekstrakurikuler pilihan minat bakat</p>
            </div>
            <button
              onClick={handleAddEkstrakurikuler}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Ekstrakurikuler</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="px-3 py-2 w-44">Nama Ekstrakurikuler</th>
                  <th className="px-3 py-2">Tujuan Kegiatan</th>
                  <th className="px-3 py-2 w-48">Dimensi Profil Lulusan</th>
                  <th className="px-3 py-2 w-32">Jadwal & Waktu</th>
                  <th className="px-3 py-2 w-36">Pembina</th>
                  <th className="px-3 py-2 w-10 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ekstrakurikulerList.map((ekskul) => (
                  <tr key={ekskul.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ekskul.name}
                        onChange={(e) => handleUpdateEkstrakurikuler(ekskul.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-900"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <textarea
                        rows={2}
                        value={ekskul.goals.join('; ')}
                        onChange={(e) => handleUpdateEkstrakurikuler(ekskul.id, 'goals', e.target.value.split('; '))}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-800"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ekskul.dimensions}
                        onChange={(e) => handleUpdateEkstrakurikuler(ekskul.id, 'dimensions', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ekskul.timeWeekly}
                        onChange={(e) => handleUpdateEkstrakurikuler(ekskul.id, 'timeWeekly', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ekskul.coach}
                        onChange={(e) => handleUpdateEkstrakurikuler(ekskul.id, 'coach', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => handleDeleteEkstrakurikuler(ekskul.id)}
                        className="text-slate-400 hover:text-rose-500"
                      >
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

      {/* Pendekatan Belajar */}
      {activeSection === 'pendekatan' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">4 Pilihan Pendekatan Pengorganisasian Pembelajaran (BSKAP 2025)</h2>
            <p className="text-xs text-slate-500">Pilih model yang diterapkan di sekolah Anda</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'Mata Pelajaran', title: '1. Mata Pelajaran', desc: 'Setiap pembelajaran dilakukan terpisah antar mapel, tatap muka reguler mingguan.' },
              { id: 'Tematik', title: '2. Tematik', desc: 'Disusun berdasar tema payung besar mengintegrasikan kompetensi berbagai mapel (Cocok untuk SD & PAUD).' },
              { id: 'Terintegrasi', title: '3. Terintegrasi', desc: 'Konsep diajarkan secara terpadu (team teaching) seperti unit IPA terpadu atau IPS terpadu.' },
              { id: 'Blok', title: '4. Sistem Blok', desc: 'Dikelola dalam blok-blok waktu terpisah dengan jam belajar lebih panjang dan intensif (Cocok untuk SMK / Praktikum).' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => onUpdateData({ ...data, learningApproach: m.id as any })}
                className={`p-4 rounded-xl border text-left transition-all ${
                  data.learningApproach === m.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 mb-1">{m.title}</div>
                <div className="text-[11px] text-slate-500 leading-relaxed">{m.desc}</div>
              </button>
            ))}
          </div>

          <div className="pt-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Rasional Pemilihan Pendekatan</label>
            {data.approachRationale.map((para, idx) => (
              <textarea
                key={idx}
                rows={3}
                value={para}
                onChange={(e) => {
                  const arr = [...data.approachRationale];
                  arr[idx] = e.target.value;
                  onUpdateData({ ...data, approachRationale: arr });
                }}
                className="w-full p-2.5 mb-2 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
              />
            ))}
          </div>
        </div>
      )}

      {/* D. Pengaturan Waktu */}
      {activeSection === 'waktu' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">D. Pengaturan Waktu Pembelajaran</h2>
            <p className="text-xs text-slate-500">Prinsip alokasi waktu, hari efektif belajar, dan transisi aktivitas</p>
          </div>

          <div className="space-y-2.5">
            {data.timeArrangementPrinciples.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-1">
                  {idx + 1}
                </span>
                <textarea
                  rows={2}
                  value={rule}
                  onChange={(e) => {
                    const arr = [...data.timeArrangementPrinciples];
                    arr[idx] = e.target.value;
                    onUpdateData({ ...data, timeArrangementPrinciples: arr });
                  }}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
