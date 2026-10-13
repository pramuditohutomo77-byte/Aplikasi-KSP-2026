import React from 'react';
import { PrintSettings, PaperSize } from '../types/ksp';
import { X, Sliders, FileText, Check } from 'lucide-react';

interface PrintSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PrintSettings;
  onUpdateSettings: (newSettings: PrintSettings) => void;
}

export const PrintSettingsModal: React.FC<PrintSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  const handlePresetChange = (preset: '4-4-3-3' | '4-3-3-3' | '3-3-3-3' | 'custom') => {
    let margins = { ...settings.margins };
    if (preset === '4-4-3-3') {
      margins = { left: 4.0, top: 4.0, right: 3.0, bottom: 3.0 };
    } else if (preset === '4-3-3-3') {
      margins = { left: 4.0, top: 3.0, right: 3.0, bottom: 3.0 };
    } else if (preset === '3-3-3-3') {
      margins = { left: 3.0, top: 3.0, right: 3.0, bottom: 3.0 };
    }
    onUpdateSettings({
      ...settings,
      marginPreset: preset,
      margins
    });
  };

  const handleMarginChange = (side: keyof PrintSettings['margins'], val: number) => {
    onUpdateSettings({
      ...settings,
      marginPreset: 'custom',
      margins: {
        ...settings.margins,
        [side]: val
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 text-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pengaturan Kertas & Tata Letak</h2>
              <p className="text-xs text-slate-500">Sesuaikan ukuran kertas, margin dokumen, font, dan spasi cetak</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 pt-5">
          {/* Paper Size */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Ukuran Kertas Dokumen
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { size: 'A4' as PaperSize, label: 'A4', desc: '210 × 297 mm (Standar Nasional)' },
                { size: 'F4' as PaperSize, label: 'F4 / Folio', desc: '215 × 330 mm (Dokumen Kedinasan)' },
                { size: 'Letter' as PaperSize, label: 'Letter', desc: '216 × 279 mm (Format Kwarto)' },
              ].map(item => (
                <button
                  key={item.size}
                  onClick={() => onUpdateSettings({ ...settings, paperSize: item.size })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    settings.paperSize === item.size
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 text-emerald-950'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm">
                    {item.label}
                    {settings.paperSize === item.size && <Check className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Margin Presets */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Pilihan Standar Margin (Tepi Kertas)
            </label>
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              {[
                { id: '4-4-3-3', label: 'Standar 4-4-3-3', desc: 'Kiri: 4, Atas: 4, Kanan: 3, Bawah: 3' },
                { id: '4-3-3-3', label: 'Resmi 4-3-3-3', desc: 'Kiri: 4, Atas: 3, Kanan: 3, Bawah: 3' },
                { id: '3-3-3-3', label: 'Simetris 3-3-3-3', desc: 'Semua sisi: 3.0 cm' },
              ].map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetChange(preset.id as any)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                    settings.marginPreset === preset.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="font-medium text-slate-900">{preset.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{preset.desc}</div>
                </button>
              ))}
            </div>

            {/* Custom margin controls */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-4 gap-3 text-center">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Kiri (Left)</label>
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="6"
                    value={settings.margins.left}
                    onChange={(e) => handleMarginChange('left', parseFloat(e.target.value) || 3)}
                    className="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-center text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <span className="ml-1 text-xs text-slate-500">cm</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Atas (Top)</label>
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="6"
                    value={settings.margins.top}
                    onChange={(e) => handleMarginChange('top', parseFloat(e.target.value) || 3)}
                    className="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-center text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <span className="ml-1 text-xs text-slate-500">cm</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Kanan (Right)</label>
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="6"
                    value={settings.margins.right}
                    onChange={(e) => handleMarginChange('right', parseFloat(e.target.value) || 3)}
                    className="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-center text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <span className="ml-1 text-xs text-slate-500">cm</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Bawah (Bottom)</label>
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="6"
                    value={settings.margins.bottom}
                    onChange={(e) => handleMarginChange('bottom', parseFloat(e.target.value) || 3)}
                    className="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-center text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <span className="ml-1 text-xs text-slate-500">cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Formatting */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Jenis Huruf (Font)</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => onUpdateSettings({ ...settings, fontFamily: e.target.value as any })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern)</option>
                <option value="Times New Roman">Times New Roman (Klasik/Resmi)</option>
                <option value="Calibri">Calibri (Birokrasi)</option>
                <option value="Arial">Arial (Bersih)</option>
                <option value="Merriweather">Merriweather (Serif Elegan)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ukuran Teks Isi</label>
              <select
                value={settings.fontSize}
                onChange={(e) => onUpdateSettings({ ...settings, fontSize: e.target.value as any })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="12pt">12 pt (Standar Dokumen)</option>
                <option value="11pt">11 pt (Rapat Ringkas)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Spasi Baris</label>
              <select
                value={settings.lineHeight}
                onChange={(e) => onUpdateSettings({ ...settings, lineHeight: e.target.value as any })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="1.5">1.5 Spasi (Standar Naskah)</option>
                <option value="1.25">1.25 Spasi (Proporsional)</option>
                <option value="1.15">1.15 Spasi (Padat)</option>
              </select>
            </div>
          </div>

          {/* Page numbers & Watermark */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={settings.showPageNumbers}
                onChange={(e) => onUpdateSettings({ ...settings, showPageNumbers: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              Tampilkan Nomor Halaman Otomatis
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={settings.showWatermark}
                onChange={(e) => onUpdateSettings({ ...settings, showWatermark: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              Watermark Status Draft
            </label>
          </div>
        </div>

        <div className="mt-7 pt-4 border-t border-slate-100 flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            Terapkan & Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
