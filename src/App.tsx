import React, { useState, useEffect } from 'react';
import { KSPDocument, EducationLevel, PrintSettings, CoverConfig, SchoolIdentity } from './types/ksp';
import { defaultKspDocument } from './data/defaultKspData';
import { Header } from './components/Header';
import { NavigationTabs, tabsList } from './components/NavigationTabs';
import { PrintSettingsModal } from './components/PrintSettingsModal';
import { CoverEditor } from './components/pages/CoverEditor';
import { DocumentDataEditor } from './components/pages/DocumentDataEditor';
import { EndorsementEditor } from './components/pages/EndorsementEditor';
import { TeamEditor } from './components/pages/TeamEditor';
import { ForewordEditor } from './components/pages/ForewordEditor';
import { TableOfContentsEditor } from './components/pages/TableOfContentsEditor';
import { Chapter1Editor } from './components/pages/Chapter1Editor';
import { Chapter2Editor } from './components/pages/Chapter2Editor';
import { Chapter3Editor } from './components/pages/Chapter3Editor';
import { Chapter4Editor } from './components/pages/Chapter4Editor';
import { Chapter5Editor } from './components/pages/Chapter5Editor';
import { AppendicesEditor } from './components/pages/AppendicesEditor';
import { FullDocumentView } from './components/preview/FullDocumentView';
import { ChevronRight, ChevronLeft, Eye, RotateCcw, Printer } from 'lucide-react';
import { triggerBrowserPrint, exportKspToPdf } from './utils/pdfExport';

const STORAGE_KEY = 'ksp_document_data_v1';

export default function App() {
  const [doc, setDoc] = useState<KSPDocument>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load local KSP data:', e);
    }
    return defaultKspDocument;
  });

  const [activeTab, setActiveTab] = useState<string>('cover');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
    } catch (e) {
      console.error('Failed to save KSP data:', e);
    }
  }, [doc]);

  const handleResetData = () => {
    if (window.confirm('Kembalikan naskah ke template standar resmi BSKAP? Perubahan Anda akan diatur ulang.')) {
      setDoc(defaultKspDocument);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleLevelChange = (level: EducationLevel) => {
    setDoc(prev => ({
      ...prev,
      identity: {
        ...prev.identity,
        level: level,
        name: prev.identity.name.replace(/^(SD|SMP|SMA|SMK|PAUD)\b/i, level)
      },
      cover: {
        ...prev.cover,
        schoolName: prev.cover.schoolName.replace(/^(SD|SMP|SMA|SMK|PAUD)\b/i, level)
      }
    }));
  };

  // Tab navigation sequence
  const tabsSequence = tabsList.map(t => t.id);
  const currentTabIdx = tabsSequence.indexOf(activeTab);

  const goToNextTab = () => {
    if (currentTabIdx < tabsSequence.length - 1) {
      setActiveTab(tabsSequence[currentTabIdx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevTab = () => {
    if (currentTabIdx > 0) {
      setActiveTab(tabsSequence[currentTabIdx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateCoverAndIdentity = (cover: CoverConfig, identity: SchoolIdentity) => {
    setDoc((prev) => ({
      ...prev,
      cover,
      identity,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Main Navigation Header */}
      <Header
        document={doc}
        onUpdateDocument={setDoc}
        onOpenSettings={() => setIsPrintModalOpen(true)}
        onSwitchLevel={handleLevelChange}
        onResetToDefault={handleResetData}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Tabs bar */}
      <NavigationTabs
        activeTab={activeTab}
        onSelectTab={(tabId: string) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Workspace */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab content switcher */}
        {activeTab === 'cover' && (
          <CoverEditor
            cover={doc.cover}
            identity={doc.identity}
            onUpdateCover={(cover) => setDoc({ ...doc, cover })}
            onUpdateIdentity={(identity) => setDoc({ ...doc, identity })}
            onUpdateBoth={handleUpdateCoverAndIdentity}
          />
        )}

        {activeTab === 'document-data' && (
          <DocumentDataEditor
            identity={doc.identity}
            onUpdateIdentity={(identity) => setDoc({ ...doc, identity })}
          />
        )}

        {activeTab === 'endorsement' && (
          <EndorsementEditor
            endorsement={doc.endorsement}
            identity={doc.identity}
            onUpdateEndorsement={(endorsement) => setDoc({ ...doc, endorsement })}
          />
        )}

        {activeTab === 'team' && (
          <TeamEditor
            team={doc.team}
            onUpdateTeam={(team) => setDoc({ ...doc, team })}
          />
        )}

        {activeTab === 'foreword' && (
          <ForewordEditor
            foreword={doc.foreword}
            identity={doc.identity}
            onUpdateForeword={(foreword) => setDoc({ ...doc, foreword })}
          />
        )}

        {activeTab === 'toc' && (
          <TableOfContentsEditor
            document={doc}
            onUpdateDocument={setDoc}
          />
        )}

        {activeTab === 'chapter1' && (
          <Chapter1Editor
            data={doc.chapter1}
            onUpdateData={(chapter1) => setDoc({ ...doc, chapter1 })}
          />
        )}

        {activeTab === 'chapter2' && (
          <Chapter2Editor
            data={doc.chapter2}
            onUpdateData={(chapter2) => setDoc({ ...doc, chapter2 })}
          />
        )}

        {activeTab === 'chapter3' && (
          <Chapter3Editor
            data={doc.chapter3}
            onUpdateData={(chapter3) => setDoc({ ...doc, chapter3 })}
          />
        )}

        {activeTab === 'chapter4' && (
          <Chapter4Editor
            data={doc.chapter4}
            onUpdateData={(chapter4) => setDoc({ ...doc, chapter4 })}
          />
        )}

        {activeTab === 'chapter5' && (
          <Chapter5Editor
            data={doc.chapter5}
            onUpdateData={(chapter5) => setDoc({ ...doc, chapter5 })}
          />
        )}

        {activeTab === 'appendices' && (
          <AppendicesEditor
            appendices={doc.appendices}
            onUpdateAppendices={(appendices) => setDoc({ ...doc, appendices })}
          />
        )}

        {activeTab === 'full' && (
          <FullDocumentView
            document={doc}
            onOpenSettings={() => setIsPrintModalOpen(true)}
          />
        )}

        {/* Step Navigation Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              title="Reset ke template standar kementerian"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Template Standar</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {currentTabIdx > 0 && (
              <button
                onClick={goToPrevTab}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Bagian Sebelumnya</span>
              </button>
            )}

            {currentTabIdx < tabsSequence.length - 1 ? (
              <button
                onClick={goToNextTab}
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Lanjut ke Bagian Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    await exportKspToPdf(doc);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  title="Unduh berkas PDF dokumen resmi"
                >
                  <Eye className="w-4 h-4" />
                  <span>Unduh PDF Resmi</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('full');
                    triggerBrowserPrint();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Dokumen</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Print Settings Modal */}
      <PrintSettingsModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        settings={doc.printSettings}
        onUpdateSettings={(printSettings: PrintSettings) => setDoc({ ...doc, printSettings })}
      />
    </div>
  );
}
