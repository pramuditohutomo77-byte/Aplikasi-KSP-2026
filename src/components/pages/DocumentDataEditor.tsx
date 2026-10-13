import React from 'react';
import { SchoolIdentity } from '../../types/ksp';
import { FileText, Building2, MapPin, Phone, UserCheck, Calendar } from 'lucide-react';

interface DocumentDataEditorProps {
  identity: SchoolIdentity;
  onUpdateIdentity: (identity: SchoolIdentity) => void;
}

export const DocumentDataEditor: React.FC<DocumentDataEditorProps> = ({
  identity,
  onUpdateIdentity
}) => {
  const handleChange = (field: keyof SchoolIdentity, value: any) => {
    onUpdateIdentity({
      ...identity,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Informational Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4.5 text-emerald-950 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
          <FileText className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <h3 className="font-bold text-sm text-emerald-900">Halaman 2: Data Dokumen Kurikulum</h3>
          <p className="text-emerald-800 leading-relaxed">
            Halaman ini memuat identitas yuridis dan administratif satuan pendidikan yang akan dicetak sebagai halaman resmi tepat setelah sampul (cover). Seluruh data ini terhubung otomatis ke Lembar Penetapan, Tim Penyusun, Kata Pengantar, dan Bab-Bab dokumen.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identitas Kelembagaan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Legalitas & Kelembagaan</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Satuan Pendidikan</label>
            <input
              type="text"
              value={identity.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NPSN</label>
              <input
                type="text"
                value={identity.npsn}
                onChange={(e) => handleChange('npsn', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status Sekolah</label>
              <select
                value={identity.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Negeri">Negeri</option>
                <option value="Swasta">Swasta</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bentuk Pendidikan</label>
              <select
                value={identity.educationType}
                onChange={(e) => handleChange('educationType', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Formal">Formal</option>
                <option value="Non-Formal">Non-Formal (Kesetaraan)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Jenjang Pendidikan</label>
              <select
                value={identity.level}
                onChange={(e) => handleChange('level', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-emerald-800"
              >
                <option value="PAUD">PAUD / TK</option>
                <option value="SD">SD / MI</option>
                <option value="SMP">SMP / MTs</option>
                <option value="SMA">SMA / MA</option>
                <option value="SMK">SMK / MAK</option>
                <option value="SLB">SLB / Pendidikan Khusus</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Status Kepemilikan</label>
            <input
              type="text"
              value={identity.ownership}
              onChange={(e) => handleChange('ownership', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Pemerintah Daerah / Yayasan X"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">SK Pendirian Sekolah</label>
              <input
                type="text"
                value={identity.skEstablishment}
                onChange={(e) => handleChange('skEstablishment', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal SK Pendirian</label>
              <input
                type="text"
                value={identity.skEstablishmentDate}
                onChange={(e) => handleChange('skEstablishmentDate', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">SK Izin Operasional</label>
              <input
                type="text"
                value={identity.skOperational}
                onChange={(e) => handleChange('skOperational', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal SK Izin Operasional</label>
              <input
                type="text"
                value={identity.skOperationalDate}
                onChange={(e) => handleChange('skOperationalDate', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pimpinan & Alamat */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Pimpinan & Lokasi Satuan Pendidikan</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kepala Sekolah</label>
              <input
                type="text"
                value={identity.principalName}
                onChange={(e) => handleChange('principalName', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Kepala Sekolah (Jika Ada)</label>
              <input
                type="text"
                value={identity.principalNip}
                onChange={(e) => handleChange('principalNip', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="NIP. ..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Jalan / Kompleks</label>
            <input
              type="text"
              value={identity.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Desa / Kelurahan</label>
              <input
                type="text"
                value={identity.village}
                onChange={(e) => handleChange('village', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kecamatan</label>
              <input
                type="text"
                value={identity.district}
                onChange={(e) => handleChange('district', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kabupaten / Kota</label>
              <input
                type="text"
                value={identity.regency}
                onChange={(e) => handleChange('regency', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kode Pos</label>
              <input
                type="text"
                value={identity.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Telepon</label>
              <input
                type="text"
                value={identity.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Sekolah</label>
              <input
                type="email"
                value={identity.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Website</label>
              <input
                type="text"
                value={identity.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Output Preview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Pratinjau Tabel Data Dokumen Kurikulum (Halaman 2 Resmi)
        </h3>
        <div className="overflow-x-auto border border-slate-300 rounded-xl">
          <table className="w-full text-xs text-left">
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="w-1/3 px-4 py-2.5 font-semibold text-slate-700 bg-slate-50">Nama Sekolah</td>
                <td className="px-4 py-2.5 font-bold text-slate-900">{identity.name}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-semibold text-slate-700 bg-slate-50">NPSN</td>
                <td className="px-4 py-2.5 text-slate-800">{identity.npsn}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-semibold text-slate-700 bg-slate-50">Status / Bentuk</td>
                <td className="px-4 py-2.5 text-slate-800">{identity.status} ({identity.educationType}) - Jenjang {identity.level}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-semibold text-slate-700 bg-slate-50">Status Kepemilikan</td>
                <td className="px-4 py-2.5 text-slate-800">{identity.ownership}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-semibold text-slate-700 bg-slate-50">SK Pendirian & Tanggal</td>
                <td className="px-4 py-2.5 text-slate-800">{identity.skEstablishment} (Tgl: {identity.skEstablishmentDate})</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-semibold text-slate-700 bg-slate-50">SK Izin Operasional & Tanggal</td>
                <td className="px-4 py-2.5 text-slate-800">{identity.skOperational} (Tgl: {identity.skOperationalDate})</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-semibold text-slate-700 bg-slate-50">Nama Kepala Sekolah</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">{identity.principalName} {identity.principalNip ? `(NIP. ${identity.principalNip})` : ''}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-semibold text-slate-700 bg-slate-50">Alamat Lengkap</td>
                <td className="px-4 py-2.5 text-slate-800">
                  {identity.address}, {identity.village}, {identity.district}, {identity.regency}, {identity.province} {identity.postalCode}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
