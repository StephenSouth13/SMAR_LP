//D:\Smar\SMAR_LP\smar\app\admin\dashboard\config\page.tsx
"use client";

import { useState } from "react";
import { RefreshCcw, Save } from "lucide-react";
import { useCmsLogic } from "@/hooks/useCmsLogic";
import { CMS_TABS, CmsTabKey } from "./cmsTabs";

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState<CmsTabKey>("hero");
  const { data, setData, loading, saving, uploading, msg, handleSave, handleUpload } = useCmsLogic();

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-blue-900 uppercase tracking-widest">SMAR CMS Loading...</div>;

  const currentTab = CMS_TABS.find((t) => t.key === activeTab)!;
  const ActiveComponent = currentTab.component;

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-4 md:p-8">
      {/* SIDEBAR TỰ SINH */}
      <aside className="w-full lg:w-72 space-y-3">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 ml-4 text-blue-600">Kiến trúc Landing Page</h3>
        {CMS_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center justify-between p-5 rounded-[1.8rem] font-bold transition-all ${
                isActive ? "bg-[#002D72] text-white shadow-xl translate-x-2" : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              <div className="flex items-center gap-3"><Icon size={18} /> {tab.label}</div>
            </button>
          );
        })}
      </aside>

      {/* CHƯƠNG TRÌNH BIÊN TẬP ĐỘNG */}
      <main className="flex-1 space-y-10">
        <header className="flex justify-between items-center sticky top-0 bg-gray-50/80 backdrop-blur-md py-4 z-20 border-b border-gray-100/50">
          <h2 className="text-3xl font-black text-[#002D72] uppercase italic tracking-tighter">{currentTab.label}</h2>
          <div className="flex items-center gap-6">
            {msg && <span className="text-green-600 font-bold text-sm animate-bounce">{msg}</span>}
            <button onClick={() => handleSave(activeTab)} disabled={saving} className="bg-[#E31B23] text-white px-10 py-5 rounded-3xl font-black flex items-center gap-3 active:scale-95 disabled:opacity-50 shadow-lg shadow-red-100">
              {saving ? <RefreshCcw className="animate-spin" size={20} /> : <Save size={20} />} LƯU CẤU HÌNH
            </button>
          </div>
        </header>

        {/* COMPONENT ĐƯỢC INJECT ĐỘNG */}
        <ActiveComponent
          data={data[activeTab]}
          updateData={(v: any) => setData((prev) => ({ ...prev, [activeTab]: v }))}
          onUpload={currentTab.hasUpload ? (e: any) => handleUpload(e, activeTab) : undefined}
          uploading={uploading}
        />
      </main>
    </div>
  );
}