import React from 'react';
import { CoverConfig, SchoolIdentity, CoverTheme, EducationLevel } from '../../types/ksp';
import { Palette, Sparkles, Building, Check, School } from 'lucide-react';
import { MinistryLogo } from '../common/MinistryLogo';

interface CoverEditorProps {
  cover: CoverConfig;
  identity: SchoolIdentity;
  onUpdateCover: (cover: CoverConfig) => void;
  onUpdateIdentity: (identity: SchoolIdentity) => void;
  onUpdateBoth?: (cover: CoverConfig, identity: SchoolIdentity) => void;
}

export const CoverEditor: React.FC<CoverEditorProps> = ({
  cover,
  identity,
  onUpdateCover,
  onUpdateIdentity,
  onUpdateBoth
}) => {
  const themes: { id: CoverTheme; name: string; bg: string; border: string; accent: string }[] = [
    { id: 'geosmart-emerald', name: 'GeoSmart Emerald (Hijau Karst & Alam)', bg: 'from-emerald-900 via-teal-900 to-slate-950', border: 'border-emerald-500', accent: '#10b981' },
    { id: 'kemdikbud-blue', name: 'Kemdikbud Klasik (Biru & Emas Resmi)', bg: 'from-blue-900 via-indigo-950 to-slate-900', border: 'border-amber-400', accent: '#fbbf24' },
    { id: 'nusantara-navy', name: 'Nusantara Navy (Biru Langit & Maritim)', bg: 'from-sky-950 via-slate-900 to-blue-950', border: 'border-sky-400', accent: '#38bdf8' },
    { id: 'maroon-royal', name: 'Maroon Prestasi (Merah Marun & Emas)', bg: 'from-rose-950 via-red-950 to-slate-950', border: 'border-rose-400', accent: '#f43f5e' },
    { id: 'minimalist-slate', name: 'Minimalis Monokrom (Elegan Akademik)', bg: 'from-slate-900 via-slate-800 to-slate-950', border: 'border-slate-400', accent: '#94a3b8' }
  ];

  // Helper to atomically update both cover and identity without React state race conditions
  const updateCoverAndIdentity = (newCover: CoverConfig, newIdentity: SchoolIdentity) => {
    if (onUpdateBoth) {
      onUpdateBoth(newCover, newIdentity);
    } else {
      onUpdateCover(newCover);
      onUpdateIdentity(newIdentity);
    }
  };

  const handleSchoolNameChange = (val: string) => {
    updateCoverAndIdentity(
      { ...cover, schoolName: val },
      { ...identity, name: val }
    );
  };

  const handleCurriculumBrandChange = (val: string) => {
    updateCoverAndIdentity(
      { ...cover, curriculumBrand: val },
      { ...identity, curriculumName: val }
    );
  };

  const handleAcademicYearChange = (val: string) => {
    const cleanYear = val.replace(/^Tahun\s+Ajaran\s+/i, '').trim();
    updateCoverAndIdentity(
      { ...cover, academicYear: val },
      { ...identity, academicYear: cleanYear || val }
    );
  };

  const handleNpsnChange = (val: string) => {
    const rawNumber = val.replace(/[^0-9]/g, '');
    updateCoverAndIdentity(
      { ...cover, npsn: val },
      { ...identity, npsn: rawNumber || val }
    );
  };

  const handleLevelSwitch = (newLevel: EducationLevel) => {
    let newSchoolName = cover.schoolName;
    // Replace old prefix if matches SMP/SD/SMA/SMK/PAUD
    const regex = /^(SMP|SD|SMA|SMK|PAUD|SLB)\s+/i;
    if (regex.test(newSchoolName)) {
      newSchoolName = newSchoolName.replace(regex, `${newLevel} `);
    } else if (!newSchoolName.startsWith(newLevel)) {
      newSchoolName = `${newLevel} ${newSchoolName}`;
    }

    updateCoverAndIdentity(
      { ...cover, schoolName: newSchoolName },
      { ...identity, level: newLevel, name: newSchoolName }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editor Controls */}
      <div className="lg:col-span-6 space-y-6">
        {/* Theme Picker */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Palette className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Pilihan Tema Desain Cover</h2>
          </div>
          <p className="text-xs text-slate-500 mt-2 mb-4">
            Pilih tema warna dan estetika visual resmi untuk cover dokumen Kurikulum Satuan Pendidikan Anda.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {themes.map((th) => (
              <button
                key={th.id}
                type="button"
                onClick={() => onUpdateCover({ ...cover, theme: th.id })}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  cover.theme === th.id
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs bg-emerald-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`h-8 rounded-lg bg-linear-to-r ${th.bg} mb-2 flex items-center justify-between px-3`}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: th.accent }}></div>
                  {cover.theme === th.id && (
                    <Check className="w-4 h-4 text-white drop-shadow-sm" />
                  )}
                </div>
                <div className="text-xs font-bold text-slate-800">{th.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Fields */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Data & Identitas Halaman Cover</h2>
          </div>

          {/* Quick Level Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-slate-500" />
              <span>Pilih Jenjang Sekolah:</span>
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              {(['SMP', 'SD', 'SMA', 'SMK', 'PAUD'] as EducationLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleLevelSwitch(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    identity.level === lvl
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* School Name */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Nama Satuan Pendidikan / Sekolah <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={cover.schoolName}
              onChange={(e) => handleSchoolNameChange(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-semibold bg-white border border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-slate-900 placeholder:text-slate-400"
              placeholder="Contoh: SMP NEGERI 1 JAKARTA atau SMP SEMEN TONASA II"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Dapat diedit langsung. Perubahan nama sekolah otomatis disinkronkan ke seluruh bab dokumen.
            </p>
          </div>

          {/* Curriculum Brand / Title */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Branding / Nama Kurikulum Sekolah (Teks Utama di Tengah Cover)
            </label>
            <input
              type="text"
              value={cover.curriculumBrand}
              onChange={(e) => handleCurriculumBrandChange(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-bold bg-white border border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-emerald-800 placeholder:text-slate-400"
              placeholder="Contoh: KURIKULUM SATUAN PENDIDIKAN atau KURIKULUM GEOSMART"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Nama branding kurikulum kekhasan sekolah (misal: Kurikulum GeoSmart, Kurikulum Adiwiyata, dll.)
            </p>
          </div>

          {/* Header Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Label Header Dokumen (Paling Atas)
            </label>
            <input
              type="text"
              value={cover.title}
              onChange={(e) => onUpdateCover({ ...cover, title: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-slate-900"
              placeholder="DOKUMEN KURIKULUM SATUAN PENDIDIKAN"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Keterangan Wilayah / Kabupaten
              </label>
              <input
                type="text"
                value={cover.regencyInfo}
                onChange={(e) => onUpdateCover({ ...cover, regencyInfo: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-slate-900"
                placeholder="Contoh: KAB. PANGKAJENE DAN KEPULAUAN"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tahun Ajaran
              </label>
              <input
                type="text"
                value={cover.academicYear}
                onChange={(e) => handleAcademicYearChange(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-slate-900"
                placeholder="Contoh: Tahun Ajaran 2025/2026"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nomor Pokok Sekolah Nasional (NPSN)
            </label>
            <input
              type="text"
              value={cover.npsn}
              onChange={(e) => handleNpsnChange(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono text-slate-900"
              placeholder="Contoh: NPSN : 40310352"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cover.showMinistryLogo}
                onChange={(e) => onUpdateCover({ ...cover, showMinistryLogo: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              <span className="font-medium">Tampilkan Lambang Tut Wuri Handayani</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={cover.showLogo}
                onChange={(e) => onUpdateCover({ ...cover, showLogo: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              <span className="font-medium">Tampilkan Ikon Sekolah</span>
            </label>
          </div>
        </div>
      </div>

      {/* Live Cover Preview */}
      <div className="lg:col-span-6 sticky top-24">
        <div className="bg-slate-800 p-4 rounded-2xl shadow-xl text-white">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Pratinjau Desain Cover (Halaman 1)</span>
            <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
              Ukuran Baku A4
            </span>
          </div>

          {/* Actual Sheet Preview */}
          <div 
            className="w-full aspect-[1/1.414] rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 text-center"
            style={{
              background: cover.theme === 'geosmart-emerald' 
                ? 'linear-gradient(135deg, #064e3b 0%, #047857 40%, #0f172a 100%)'
                : cover.theme === 'kemdikbud-blue'
                ? 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #0f172a 100%)'
                : cover.theme === 'nusantara-navy'
                ? 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 40%, #090d16 100%)'
                : cover.theme === 'maroon-royal'
                ? 'linear-gradient(135deg, #881337 0%, #be123c 40%, #111827 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #334155 40%, #020617 100%)'
            }}
          >
            {/* Top decorative elements */}
            <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 right-0 h-40 bg-white/[0.02] transform -skew-y-6 pointer-events-none"></div>

            {/* Header part */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                {cover.showMinistryLogo && (
                  <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md flex items-center justify-center">
                    <MinistryLogo className="w-10 h-10" />
                  </div>
                )}
                {cover.showLogo && (
                  <div className="w-12 h-12 rounded-full bg-white/95 p-1.5 shadow-md flex items-center justify-center text-emerald-800 font-black text-xs border border-white">
                    <Building className="w-6 h-6 text-slate-800" />
                  </div>
                )}
              </div>
              <div className="text-[10px] tracking-widest uppercase font-semibold text-slate-200/90 leading-tight">
                BADAN STANDAR, KURIKULUM, DAN ASESMEN PENDIDIKAN<br/>
                KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH<br/>
                REPUBLIK INDONESIA
              </div>
            </div>

            {/* Middle Big Typography */}
            <div className="relative z-10 my-auto py-6">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-emerald-200 border border-white/20 mb-3">
                {cover.title}
              </div>

              <div className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight uppercase drop-shadow-md">
                {cover.curriculumBrand}
              </div>

              <div className="w-16 h-1 bg-amber-400 mx-auto my-3 rounded-full"></div>

              <div className="text-base sm:text-lg font-black text-emerald-100 tracking-wide uppercase">
                {cover.schoolName}
              </div>
              <div className="text-xs font-semibold text-slate-300 tracking-wider uppercase mt-1">
                {cover.regencyInfo}
              </div>
            </div>

            {/* Bottom Meta Box */}
            <div className="relative z-10 bg-black/30 backdrop-blur-xs rounded-xl p-3.5 border border-white/10 max-w-xs mx-auto w-full">
              <div className="text-xs font-bold text-white tracking-wider">
                {cover.academicYear}
              </div>
              <div className="text-[11px] text-slate-300 font-mono mt-0.5">
                {cover.npsn}
              </div>
              <div className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider">
                Dokumen Kurikulum Satuan Pendidikan (KSP)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
