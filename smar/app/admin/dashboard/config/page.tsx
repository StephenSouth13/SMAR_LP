//D:\Smar\SMAR_LP\smar\app\admin\dashboard\config\page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { RefreshCcw, Save, CheckCircle2 } from "lucide-react";
import { useCmsLogic } from "@/hooks/useCmsLogic";
import { CMS_TABS } from "./CMS_TABS";
import type { CmsTabKey } from "@/types/cms";

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState<CmsTabKey>("hero");

  const {
    data,
    setData,
    loading,
    saving,
    uploading,
    msg,
    handleSave,
    handleUpload,
  } = useCmsLogic();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#002D72] border-t-transparent rounded-full animate-spin" />
        <p className="font-black text-[#002D72] uppercase tracking-widest animate-pulse">
          SMAR CMS Engine Loading...
        </p>
      </div>
    );
  }

  const currentTab = CMS_TABS.find((t) => t.key === activeTab)!;
  const ActiveComponent = currentTab.component as React.ComponentType<any>;

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-4 md:p-8 animate-in fade-in duration-700">
      <aside className="w-full lg:w-72 space-y-3">
        <div className="px-4 py-2 bg-blue-50 rounded-2xl mb-6 border border-blue-100">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
            Kiến trúc Landing Page
          </h3>
        </div>

        <nav className="space-y-2">
          {CMS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === (tab.key as CmsTabKey);

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as CmsTabKey)}
                className={`w-full flex items-center gap-3 p-5 rounded-[1.8rem] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#002D72] text-white shadow-2xl translate-x-2 scale-105"
                    : "bg-white text-gray-400 hover:bg-gray-50 border"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 space-y-10">
        <header className="flex justify-between items-center sticky top-0 bg-gray-50/90 backdrop-blur-xl py-6 z-30 border-b">
          <div>
            <h2 className="text-3xl font-black text-[#002D72] uppercase italic tracking-tighter">
              {currentTab.label}
            </h2>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Live Editing Mode • 2026 Ready
            </div>
          </div>

          <div className="flex items-center gap-6">
            {msg && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full animate-in zoom-in">
                <CheckCircle2 size={16} />
                <span className="text-xs font-black uppercase">{msg}</span>
              </div>
            )}

            <button
              onClick={() => handleSave(activeTab)}
              disabled={saving}
              className="bg-[#E31B23] hover:bg-[#c4161d] text-white px-10 py-5 rounded-3xl font-black flex items-center gap-3 disabled:opacity-50 transition-all shadow-xl shadow-red-100 active:scale-95"
            >
              {saving ? <RefreshCcw className="animate-spin" size={20} /> : <Save size={20} />}
              LƯU CẤU HÌNH
            </button>
          </div>
        </header>

        <section className="min-h-125">
          {ActiveComponent && (
            <ActiveComponent
              data={data[activeTab]}
              updateData={(v: any) =>
                setData((prev: any) => ({
                  ...prev,
                  [activeTab]: { ...prev[activeTab], ...v },
                }))
              }
              onUpload={
                currentTab.hasUpload && currentTab.uploadField
                  ? (e: any) => (handleUpload as any)(e, activeTab, currentTab.uploadField)
                  : undefined
              }
              uploading={uploading}
            />
          )}
        </section>
      </main>
    </div>
  );
}