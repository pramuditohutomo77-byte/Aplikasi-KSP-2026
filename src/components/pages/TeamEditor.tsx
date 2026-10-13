import React from 'react';
import { DraftingTeamConfig, TeamMember } from '../../types/ksp';
import { Users, Plus, Trash2, UserPlus, Shield } from 'lucide-react';

interface TeamEditorProps {
  team: DraftingTeamConfig;
  onUpdateTeam: (team: DraftingTeamConfig) => void;
}

export const TeamEditor: React.FC<TeamEditorProps> = ({
  team,
  onUpdateTeam
}) => {
  const handleAddMember = (group: 'advisors' | 'draftingTeam' | 'reviewers') => {
    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: 'Nama Guru / Pejabat, S.Pd.',
      role: group === 'advisors' ? 'Pengarah' : group === 'draftingTeam' ? 'Anggota Tim Pengembang' : 'Penelaah Kurikulum',
      affiliationOrSubject: 'Guru Mata Pelajaran'
    };
    onUpdateTeam({
      ...team,
      [group]: [...team[group], newMember]
    });
  };

  const handleUpdateMember = (
    group: 'advisors' | 'draftingTeam' | 'reviewers',
    id: string,
    field: keyof TeamMember,
    val: string
  ) => {
    onUpdateTeam({
      ...team,
      [group]: team[group].map(m => m.id === id ? { ...m, [field]: val } : m)
    });
  };

  const handleRemoveMember = (group: 'advisors' | 'draftingTeam' | 'reviewers', id: string) => {
    onUpdateTeam({
      ...team,
      [group]: team[group].filter(m => m.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold">Halaman 4: Tim Penyusun Kurikulum</h2>
            <p className="text-xs text-slate-300">
              Dokumentasi formal personil yang bertanggung jawab dalam perancangan, penyusunan, dan penelaahan KSP
            </p>
          </div>
        </div>
      </div>

      {/* 3 Sections */}
      <div className="space-y-6">
        {/* A. Penanggung Jawab & Pengarah */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">A. Pengarah & Penanggung Jawab Eksternal</h3>
              <p className="text-xs text-slate-500">Kepala Dinas Pendidikan, Puskurjar BSKAP, atau Pejabat Terkait</p>
            </div>
            <button
              onClick={() => handleAddMember('advisors')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Pengarah</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {team.advisors.map((member) => (
              <div key={member.id} className="grid grid-cols-1 md:grid-cols-12 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 items-center">
                <div className="md:col-span-5">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Nama & Gelar</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleUpdateMember('advisors', member.id, 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Jabatan dalam Tim</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleUpdateMember('advisors', member.id, 'role', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Instansi / Kedudukan</label>
                  <input
                    type="text"
                    value={member.affiliationOrSubject}
                    onChange={(e) => handleUpdateMember('advisors', member.id, 'affiliationOrSubject', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button
                    onClick={() => handleRemoveMember('advisors', member.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B. Tim Pengembang Sekolah */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">B. Tim Pengembang Kurikulum Satuan Pendidikan (Internal Sekolah)</h3>
              <p className="text-xs text-slate-500">Kepala Sekolah, Wakil Kepala Sekolah, Guru Mata Pelajaran, dan Tenaga Kependidikan</p>
            </div>
            <button
              onClick={() => handleAddMember('draftingTeam')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Anggota Guru</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {team.draftingTeam.map((member) => (
              <div key={member.id} className="grid grid-cols-1 md:grid-cols-12 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 items-center">
                <div className="md:col-span-5">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Nama & Gelar</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleUpdateMember('draftingTeam', member.id, 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Peran / Tugas</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleUpdateMember('draftingTeam', member.id, 'role', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Tugas / Mata Pelajaran</label>
                  <input
                    type="text"
                    value={member.affiliationOrSubject}
                    onChange={(e) => handleUpdateMember('draftingTeam', member.id, 'affiliationOrSubject', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button
                    onClick={() => handleRemoveMember('draftingTeam', member.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* C. Penelaah Kurikulum */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">C. Tim Penelaah Kurikulum</h3>
              <p className="text-xs text-slate-500">Pengawas Sekolah, Pakar Kurikulum, Mitra Komite</p>
            </div>
            <button
              onClick={() => handleAddMember('reviewers')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Penelaah</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {team.reviewers.map((member) => (
              <div key={member.id} className="grid grid-cols-1 md:grid-cols-12 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 items-center">
                <div className="md:col-span-5">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Nama & Gelar</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleUpdateMember('reviewers', member.id, 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Peran Penelaah</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleUpdateMember('reviewers', member.id, 'role', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Instansi</label>
                  <input
                    type="text"
                    value={member.affiliationOrSubject}
                    onChange={(e) => handleUpdateMember('reviewers', member.id, 'affiliationOrSubject', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button
                    onClick={() => handleRemoveMember('reviewers', member.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
