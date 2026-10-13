import React from 'react';
import { 
  FileText, 
  Award, 
  Users, 
  HeartHandshake, 
  ListTree, 
  Compass, 
  Target, 
  Layers, 
  GraduationCap, 
  CheckCircle2, 
  Paperclip,
  Eye,
  Sparkles
} from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  sectionName?: string;
}

export const tabsList: TabItem[] = [
  { id: 'cover', label: 'Cover Depan', badge: 'Desain', icon: FileText, sectionName: 'Halaman Judul & Desain Cover' },
  { id: 'document-data', label: 'Data Dokumen', icon: FileText, sectionName: 'Data Identitas Kurikulum Sekolah' },
  { id: 'endorsement', label: 'Lembar Penetapan', icon: Award, sectionName: 'Surat / Lembar Penetapan Resmi' },
  { id: 'team', label: 'Tim Penyusun', icon: Users, sectionName: 'Daftar Pengarah, Pengembang & Penelaah' },
  { id: 'foreword', label: 'Kata Pengantar', icon: HeartHandshake, sectionName: 'Prakata Kepala Satuan Pendidikan' },
  { id: 'toc', label: 'Daftar Isi', badge: 'Otomatis', icon: ListTree, sectionName: 'Struktur Halaman & Penomoran' },
  { id: 'chapter1', label: 'BAB I', badge: 'Karakteristik', icon: Compass, sectionName: 'Karakteristik Satuan Pendidikan' },
  { id: 'chapter2', label: 'BAB II', badge: 'Visi Misi', icon: Target, sectionName: 'Visi, Misi, dan Tujuan Satuan Pendidikan' },
  { id: 'chapter3', label: 'BAB III', badge: 'Organisasi', icon: Layers, sectionName: 'Pengorganisasian Pembelajaran' },
  { id: 'chapter4', label: 'BAB IV', badge: 'Perencanaan', icon: GraduationCap, sectionName: 'Perencanaan Pembelajaran (ATP & Modul Ajar)' },
  { id: 'chapter5', label: 'BAB V', badge: 'Evaluasi', icon: CheckCircle2, sectionName: 'Evaluasi, Pengembangan & Pendampingan' },
  { id: 'appendices', label: 'Lampiran', icon: Paperclip, sectionName: 'Lampiran SK PBM, Roster & LKPD' },
  { id: 'full', label: 'Dokumen Utuh', badge: 'Pratinjau', icon: Eye, sectionName: 'Tampilan Dokumen Lengkap Siap Cetak' },
];

interface NavigationTabsProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onSelectTab
}) => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-2.5 scrollbar-thin scrollbar-thumb-slate-200">
          {tabsList.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isFullDoc = tab.id === 'full';

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? isFullDoc
                      ? 'bg-emerald-700 text-white shadow-xs font-bold'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold shadow-2xs'
                    : isFullDoc
                    ? 'bg-slate-900 text-white hover:bg-slate-800 font-semibold ml-2'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (isFullDoc ? 'text-white' : 'text-emerald-700') : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive
                        ? isFullDoc ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-200/80 text-emerald-900'
                        : isFullDoc ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
