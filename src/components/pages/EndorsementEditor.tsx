import React from 'react';
import { EndorsementConfig, SchoolIdentity } from '../../types/ksp';
import { Award, CheckSquare, MapPin, Calendar, User } from 'lucide-react';

interface EndorsementEditorProps {
  endorsement: EndorsementConfig;
  identity: SchoolIdentity;
  onUpdateEndorsement: (endorsement: EndorsementConfig) => void;
}

export const EndorsementEditor: React.FC<EndorsementEditorProps> = ({
  endorsement,
  identity,
  onUpdateEndorsement
}) => {
  const handleChange = (field: keyof EndorsementConfig, val: any) => {
    onUpdateEndorsement({
      ...endorsement,
      [field]: val
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editor Side */}
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Award className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Pengaturan Lembar Penetapan</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tempat Penetapan</label>
              <input
                type="text"
                value={endorsement.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Contoh: Biring Ere / Jakarta"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Penetapan</label>
              <input
                type="text"
                value={endorsement.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Contoh: 15 Juli 2025"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kalimat Naskah Penetapan
            </label>
            <textarea
              rows={5}
              value={endorsement.statementText}
              onChange={(e) => handleChange('statementText', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Template resmi berdasarkan Keputusan Kepala Satuan Pendidikan dan Standar BSKAP 2025.
            </p>
          </div>

          {/* Penandatangan */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pihak Penandatangan Dokumen
            </h3>

            {/* Kepala Sekolah */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="font-semibold text-slate-800">1. Kepala Satuan Pendidikan (Wajib)</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={endorsement.principalName}
                  onChange={(e) => handleChange('principalName', e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="Nama Kepala Sekolah"
                />
                <input
                  type="text"
                  value={endorsement.principalNip}
                  onChange={(e) => handleChange('principalNip', e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="NIP (bila ada)"
                />
              </div>
            </div>

            {/* Komite Sekolah */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={endorsement.showCommitteeSignature}
                  onChange={(e) => handleChange('showCommitteeSignature', e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                2. Sertakan Tanda Tangan Ketua Komite Sekolah
              </label>
              {endorsement.showCommitteeSignature && (
                <input
                  type="text"
                  value={endorsement.committeeName}
                  onChange={(e) => handleChange('committeeName', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs mt-1"
                  placeholder="Nama Lengkap Ketua Komite Sekolah & Gelar"
                />
              )}
            </div>

            {/* Pengawas Sekolah */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={endorsement.showSupervisorSignature}
                  onChange={(e) => handleChange('showSupervisorSignature', e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                3. Sertakan Pengesahan Pengawas Pembina / Dinas Pendidikan
              </label>
              {endorsement.showSupervisorSignature && (
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <input
                    type="text"
                    value={endorsement.supervisorName}
                    onChange={(e) => handleChange('supervisorName', e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    placeholder="Nama Pengawas Pembina"
                  />
                  <input
                    type="text"
                    value={endorsement.supervisorNip}
                    onChange={(e) => handleChange('supervisorNip', e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    placeholder="NIP Pengawas"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Document Preview of Page 3 */}
      <div className="lg:col-span-6 sticky top-32">
        <div className="bg-white p-8 rounded-2xl border border-slate-300 shadow-md text-slate-900 min-h-[580px] flex flex-col justify-between">
          <div>
            <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
              <h1 className="text-base font-bold tracking-wider uppercase">LEMBAR PENETAPAN</h1>
              <p className="text-xs font-bold text-slate-800 uppercase mt-0.5">
                {identity.curriculumName} {identity.name}
              </p>
              <p className="text-[11px] text-slate-600">
                TAHUN AJARAN {identity.academicYear}
              </p>
            </div>

            <p className="text-xs text-justify leading-relaxed indent-8 text-slate-800 mb-8">
              {endorsement.statementText}
            </p>
          </div>

          <div>
            {/* Signature row */}
            <div className="grid grid-cols-2 gap-4 text-xs pt-4 mb-4">
              <div>
                {endorsement.showCommitteeSignature ? (
                  <div>
                    <p className="text-slate-700">Mengetahui,</p>
                    <p className="font-semibold text-slate-900">Ketua Komite Sekolah</p>
                    <div className="h-16 flex items-end">
                      <div className="text-[10px] text-slate-400 italic">(tanda tangan & stempel)</div>
                    </div>
                    <p className="font-bold underline text-slate-900">{endorsement.committeeName}</p>
                  </div>
                ) : <div />}
              </div>

              <div>
                <p className="text-slate-700">Ditetapkan di : {endorsement.city}</p>
                <p className="text-slate-700">Pada tanggal : {endorsement.date}</p>
                <p className="font-bold text-slate-900 mt-1">Kepala Sekolah</p>
                <div className="h-14 flex items-end">
                  <div className="text-[10px] text-emerald-800 font-serif italic border border-emerald-300 px-2 py-0.5 rounded bg-emerald-50/50">
                    [Tanda Tangan & Cap Resmi]
                  </div>
                </div>
                <p className="font-bold underline text-slate-900 mt-1">{endorsement.principalName}</p>
                {endorsement.principalNip && (
                  <p className="text-[11px] text-slate-600">NIP. {endorsement.principalNip}</p>
                )}
              </div>
            </div>

            {/* Supervisor signature if active */}
            {endorsement.showSupervisorSignature && (
              <div className="border-t border-slate-200 pt-4 text-center text-xs">
                <p className="text-slate-700">Mengesahkan / Mengetahui:</p>
                <p className="font-semibold text-slate-900">Pengawas Satuan Pendidikan</p>
                <div className="h-14 flex items-end justify-center">
                  <div className="text-[10px] text-slate-400 italic">(tanda tangan & NIP)</div>
                </div>
                <p className="font-bold underline text-slate-900">{endorsement.supervisorName}</p>
                {endorsement.supervisorNip && (
                  <p className="text-[11px] text-slate-600">NIP. {endorsement.supervisorNip}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
