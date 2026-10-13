import React, { useState } from 'react';
import { Chapter1Data, PTKItem, StudentCohort, FacilityBuildingItem, LearningMediaItem, PartnershipItem } from '../../types/ksp';
import { Compass, Plus, Trash2, Building, Users, GraduationCap, ShieldCheck, HeartHandshake, HelpCircle } from 'lucide-react';

interface Chapter1EditorProps {
  data: Chapter1Data;
  onUpdateData: (data: Chapter1Data) => void;
}

export const Chapter1Editor: React.FC<Chapter1EditorProps> = ({
  data,
  onUpdateData
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F'>('A');

  // PTK handlers
  const handleAddPtk = () => {
    const newItem: PTKItem = {
      id: `ptk-${Date.now()}`,
      name: 'Nama Guru Baru, S.Pd.',
      qualification: 'S1 Kependidikan',
      position: 'Guru Mata Pelajaran',
      subject: 'Mata Pelajaran',
      employmentStatus: 'GTY'
    };
    onUpdateData({ ...data, ptkList: [...data.ptkList, newItem] });
  };

  const handleUpdatePtk = (id: string, field: keyof PTKItem, val: string) => {
    onUpdateData({
      ...data,
      ptkList: data.ptkList.map(item => item.id === id ? { ...item, [field]: val } : item)
    });
  };

  const handleDeletePtk = (id: string) => {
    onUpdateData({ ...data, ptkList: data.ptkList.filter(item => item.id !== id) });
  };

  // Student Cohort handlers
  const handleUpdateCohort = (id: string, field: keyof StudentCohort, val: any) => {
    onUpdateData({
      ...data,
      studentCohorts: data.studentCohorts.map(sc => {
        if (sc.id !== id) return sc;
        const updated = { ...sc, [field]: val };
        if (field === 'maleCount' || field === 'femaleCount') {
          updated.totalCount = Number(updated.maleCount || 0) + Number(updated.femaleCount || 0);
        }
        return updated;
      })
    });
  };

  // Facility handlers
  const handleAddFacility = () => {
    const newF: FacilityBuildingItem = {
      id: `fac-${Date.now()}`,
      name: 'Ruangan / Bangunan Baru',
      count: 1,
      unit: 'Ruang',
      condition: 'Baik'
    };
    onUpdateData({ ...data, facilities: [...data.facilities, newF] });
  };

  const handleUpdateFacility = (id: string, field: keyof FacilityBuildingItem, val: any) => {
    onUpdateData({
      ...data,
      facilities: data.facilities.map(f => f.id === id ? { ...f, [field]: val } : f)
    });
  };

  const handleDeleteFacility = (id: string) => {
    onUpdateData({ ...data, facilities: data.facilities.filter(f => f.id !== id) });
  };

  // Partnership handlers
  const handleAddPartnership = () => {
    const newP: PartnershipItem = {
      id: `part-${Date.now()}`,
      institution: 'Instansi / Mitra Baru',
      scope: 'Dukungan program pembelajaran & fasilitas'
    };
    onUpdateData({ ...data, partnerships: [...data.partnerships, newP] });
  };

  const handleUpdatePartnership = (id: string, field: keyof PartnershipItem, val: string) => {
    onUpdateData({
      ...data,
      partnerships: data.partnerships.map(p => p.id === id ? { ...p, [field]: val } : p)
    });
  };

  const handleDeletePartnership = (id: string) => {
    onUpdateData({ ...data, partnerships: data.partnerships.filter(p => p.id !== id) });
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation bar for BAB I */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'A' as const, label: 'A. Profil Satuan Pendidikan', icon: Compass },
          { id: 'B' as const, label: 'B. Sosial, Ekonomi & Budaya', icon: HeartHandshake },
          { id: 'C' as const, label: 'C. Pendidik & Tenaga Kependidikan', icon: Users },
          { id: 'D' as const, label: 'D. Karakteristik Peserta Didik', icon: GraduationCap },
          { id: 'E' as const, label: 'E. Sarana dan Prasarana', icon: Building },
          { id: 'F' as const, label: 'F. Kemitraan dan Kerjasama', icon: ShieldCheck },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeSubTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-tab A: Profil Satuan Pendidikan */}
      {activeSubTab === 'A' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">A. Profil Satuan Pendidikan</h2>
              <p className="text-xs text-slate-500">Narasi kondisi geografis, keunggulan lingkungan, dan hasil Rapor Pendidikan</p>
            </div>
            <button
              onClick={() => {
                onUpdateData({
                  ...data,
                  profileDescription: [...data.profileDescription, 'Tulis paragraf profil baru...']
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Paragraf</span>
            </button>
          </div>

          <div className="space-y-3.5">
            {data.profileDescription.map((para, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-1 text-[11px] font-bold text-emerald-800">
                  <span>Paragraf {idx + 1}</span>
                  {data.profileDescription.length > 1 && (
                    <button
                      onClick={() => {
                        onUpdateData({
                          ...data,
                          profileDescription: data.profileDescription.filter((_, i) => i !== idx)
                        });
                      }}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <textarea
                  rows={4}
                  value={para}
                  onChange={(e) => {
                    const arr = [...data.profileDescription];
                    arr[idx] = e.target.value;
                    onUpdateData({ ...data, profileDescription: arr });
                  }}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab B: Sosial Ekonomi Budaya */}
      {activeSubTab === 'B' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">B. Analisis Sosial, Ekonomi dan Budaya</h2>
            <p className="text-xs text-slate-500">Latar belakang orang tua, masyarakat sekitar, dan integrasi kearifan lokal</p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">Narasi Sosial & Ekonomi</label>
            {data.socioEconomicCulture.map((para, idx) => (
              <textarea
                key={idx}
                rows={3}
                value={para}
                onChange={(e) => {
                  const arr = [...data.socioEconomicCulture];
                  arr[idx] = e.target.value;
                  onUpdateData({ ...data, socioEconomicCulture: arr });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Poin Nilai Kearifan Lokal Daerah</label>
            {data.localWisdom.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const arr = [...data.localWisdom];
                    arr[idx] = e.target.value;
                    onUpdateData({ ...data, localWisdom: arr });
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab C: Karakteristik Pendidik dan Tenaga Kependidikan */}
      {activeSubTab === 'C' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">C. Karakteristik Pendidik dan Tenaga Kependidikan (PTK)</h2>
              <p className="text-xs text-slate-500">Tabel data profil guru, kualifikasi, mata pelajaran, dan status kepegawaian</p>
            </div>
            <button
              onClick={handleAddPtk}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Guru / Staf</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Ringkasan Narasi PTK</label>
            <textarea
              rows={2}
              value={data.ptkSummary}
              onChange={(e) => onUpdateData({ ...data, ptkSummary: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800"
            />
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="px-3 py-2 w-12 text-center">No</th>
                  <th className="px-3 py-2">Nama & Kualifikasi</th>
                  <th className="px-3 py-2">Jabatan</th>
                  <th className="px-3 py-2">Mata Pelajaran</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 w-10 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ptkList.map((ptk, idx) => (
                  <tr key={ptk.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-center font-bold text-slate-500">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ptk.name}
                        onChange={(e) => handleUpdatePtk(ptk.id, 'name', e.target.value)}
                        className="w-full px-1.5 py-0.5 border border-transparent hover:border-slate-300 focus:border-emerald-500 rounded font-bold text-slate-900 bg-transparent text-xs"
                      />
                      <input
                        type="text"
                        value={ptk.qualification}
                        onChange={(e) => handleUpdatePtk(ptk.id, 'qualification', e.target.value)}
                        className="w-full px-1.5 py-0.5 border border-transparent hover:border-slate-300 focus:border-emerald-500 rounded text-slate-500 bg-transparent text-[11px]"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ptk.position}
                        onChange={(e) => handleUpdatePtk(ptk.id, 'position', e.target.value)}
                        className="w-full px-1.5 py-0.5 border border-transparent hover:border-slate-300 focus:border-emerald-500 rounded text-slate-700 bg-transparent text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ptk.subject}
                        onChange={(e) => handleUpdatePtk(ptk.id, 'subject', e.target.value)}
                        className="w-full px-1.5 py-0.5 border border-transparent hover:border-slate-300 focus:border-emerald-500 rounded text-slate-700 bg-transparent text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={ptk.employmentStatus}
                        onChange={(e) => handleUpdatePtk(ptk.id, 'employmentStatus', e.target.value)}
                        className="w-full px-1.5 py-0.5 border border-transparent hover:border-slate-300 focus:border-emerald-500 rounded text-slate-700 bg-transparent text-xs"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => handleDeletePtk(ptk.id)}
                        className="p-1 text-slate-400 hover:text-rose-500"
                        title="Hapus"
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

      {/* Sub-tab D: Karakteristik Peserta Didik */}
      {activeSubTab === 'D' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">D. Karakteristik Peserta Didik</h2>
            <p className="text-xs text-slate-500">Tabel data rombongan belajar, komposisi gender murid, dan gaya belajar</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Narasi Ringkasan Siswa</label>
            <textarea
              rows={3}
              value={data.studentSummary}
              onChange={(e) => onUpdateData({ ...data, studentSummary: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800"
            />
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Rombongan Belajar</th>
                  <th className="px-4 py-2.5 text-center">Jumlah Rombel</th>
                  <th className="px-4 py-2.5 text-center">Siswa Laki-laki</th>
                  <th className="px-4 py-2.5 text-center">Siswa Perempuan</th>
                  <th className="px-4 py-2.5 text-center font-bold">Total Siswa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.studentCohorts.map((cohort) => (
                  <tr key={cohort.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-semibold text-slate-800">
                      <input
                        type="text"
                        value={cohort.cohortName}
                        onChange={(e) => handleUpdateCohort(cohort.id, 'cohortName', e.target.value)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold w-full"
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <input
                        type="number"
                        min="1"
                        value={cohort.rombelCount}
                        onChange={(e) => handleUpdateCohort(cohort.id, 'rombelCount', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-center text-xs"
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <input
                        type="number"
                        min="0"
                        value={cohort.maleCount}
                        onChange={(e) => handleUpdateCohort(cohort.id, 'maleCount', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-center text-xs"
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <input
                        type="number"
                        min="0"
                        value={cohort.femaleCount}
                        onChange={(e) => handleUpdateCohort(cohort.id, 'femaleCount', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-center text-xs"
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center font-bold text-emerald-800 text-sm">
                      {cohort.totalCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-tab E: Sarana & Prasarana */}
      {activeSubTab === 'E' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">E. Sarana dan Prasarana</h2>
              <p className="text-xs text-slate-500">Daftar ruangan/gedung dan perlengkapan sarana media pembelajaran</p>
            </div>
            <button
              onClick={handleAddFacility}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Bangunan</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Narasi Sarpras</label>
            <textarea
              rows={2}
              value={data.facilitySummary}
              onChange={(e) => onUpdateData({ ...data, facilitySummary: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800"
            />
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="px-3 py-2 w-12 text-center">No</th>
                  <th className="px-3 py-2">Nama Bangunan / Ruangan</th>
                  <th className="px-3 py-2 text-center w-24">Jumlah</th>
                  <th className="px-3 py-2 w-28">Satuan</th>
                  <th className="px-3 py-2 w-32">Kondisi</th>
                  <th className="px-3 py-2 w-10 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.facilities.map((fac, idx) => (
                  <tr key={fac.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-center font-bold text-slate-400">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={fac.name}
                        onChange={(e) => handleUpdateFacility(fac.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        min="1"
                        value={fac.count}
                        onChange={(e) => handleUpdateFacility(fac.id, 'count', parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-center text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={fac.unit}
                        onChange={(e) => handleUpdateFacility(fac.id, 'unit', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={fac.condition}
                        onChange={(e) => handleUpdateFacility(fac.id, 'condition', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-emerald-800 font-semibold"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button onClick={() => handleDeleteFacility(fac.id)} className="text-slate-400 hover:text-rose-500">
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

      {/* Sub-tab F: Analisis Kemitraan */}
      {activeSubTab === 'F' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">F. Analisis Kemitraan dan Kerjasama</h2>
              <p className="text-xs text-slate-500">Kemitraan bersama industri, geopark, dinas lingkungan hidup, puskesmas & komite</p>
            </div>
            <button
              onClick={handleAddPartnership}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Mitra</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Narasi Kemitraan</label>
            <textarea
              rows={2}
              value={data.partnershipSummary}
              onChange={(e) => onUpdateData({ ...data, partnershipSummary: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800"
            />
          </div>

          <div className="space-y-3">
            {data.partnerships.map((part) => (
              <div key={part.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Nama Instansi / Mitra</label>
                  <input
                    type="text"
                    value={part.institution}
                    onChange={(e) => handleUpdatePartnership(part.id, 'institution', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                  />
                </div>
                <div className="md:col-span-7">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Bentuk Kemitraan & Kontribusi Belajar</label>
                  <input
                    type="text"
                    value={part.scope}
                    onChange={(e) => handleUpdatePartnership(part.id, 'scope', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button onClick={() => handleDeletePartnership(part.id)} className="p-1.5 text-slate-400 hover:text-rose-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
