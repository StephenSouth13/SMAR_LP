"use client";

import { useState } from "react";
import { RefreshCcw, Save, CheckCircle2 } from "lucide-react";
import { useCmsLogic } from "@/hooks/useCmsLogic";
import { CMS_TABS, CmsTabKey } from "./cmsTabs";

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState<CmsTabKey>("hero");
  
  // Custom hook quản lý toàn bộ logic Fetch/Save/Upload với Type SiteData chuẩn
  const { data, setData, loading, saving, uploading, msg, handleSave, handleUpload } = useCmsLogic();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        <p className="font-black text-blue-900 uppercase tracking-widest animate-pulse">
          SMAR CMS Engine Loading...
        </p>
      </div>
    );
  }

  // Tìm Tab cấu hình hiện tại dựa trên activeTab state
  const currentTab = CMS_TABS.find((t) => t.key === activeTab)!;
  const ActiveComponent = currentTab.component;

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-4 md:p-8 animate-in fade-in duration-700">
      
      {/* SIDEBAR TỰ SINH - Render dựa trên CMS_TABS config */}
      <aside className="w-full lg:w-72 space-y-3">
        <div className="px-4 py-2 bg-blue-50 rounded-2xl mb-6 border border-blue-100">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
            Kiến trúc Landing Page
          </h3>
        </div>
        
        <nav className="space-y-2">
          {CMS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center justify-between p-5 rounded-[1.8rem] font-bold transition-all duration-300 ${
                  isActive 
                    ? "bg-[#002D72] text-white shadow-2xl shadow-blue-900/30 translate-x-2 scale-105" 
                    : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100 hover:border-blue-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? "animate-pulse" : ""} />
                  <span className="text-sm tracking-tight">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* CHƯƠNG TRÌNH BIÊN TẬP ĐỘNG */}
      <main className="flex-1 space-y-10">
        
        {/* HEADER CỐ ĐỊNH - Dashboard Controls */}
        <header className="flex justify-between items-center sticky top-0 bg-gray-50/90 backdrop-blur-xl py-6 z-30 border-b border-gray-200/50 transition-all">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[#002D72] uppercase italic tracking-tighter">
              {currentTab.label}
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> 
              Live Editing Mode
            </div>
          </div>

          <div className="flex items-center gap-6">
            {msg && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full border border-green-100 animate-in slide-in-from-right-10 duration-500">
                <CheckCircle2 size={16} />
                <span className="text-xs font-black uppercase tracking-wider">{msg}</span>
              </div>
            )}
            
            <button 
              onClick={() => handleSave(activeTab)} 
              disabled={saving} 
              className="bg-[#E31B23] text-white px-10 py-5 rounded-3xl font-black flex items-center gap-3 active:scale-95 disabled:opacity-50 shadow-[0_20px_40px_-15px_rgba(227,27,35,0.4)] hover:shadow-red-500/50 transition-all duration-500 group"
            >
              {saving ? (
                <RefreshCcw className="animate-spin" size={20} />
              ) : (
                <Save size={20} className="group-hover:rotate-12 transition-transform" /> 
              )} 
              <span className="tracking-widest">LƯU CẤU HÌNH</span>
            </button>
          </div>
        </header>

        {/* COMPONENT ĐƯỢC INJECT ĐỘNG - Hoàn toàn Type-safe */}
        <section className="animate-in slide-in-from-bottom-5 duration-700">
          <ActiveComponent
            data={data[activeTab]}
            updateData={(v: any) => setData((prev) => ({ 
              ...prev, 
              [activeTab]: { ...prev[activeTab], ...v } // Merge dữ liệu an toàn
            }))}
            onUpload={currentTab.hasUpload ? (e) => handleUpload(e, activeTab) : undefined}
            uploading={uploading}
          />
        </section>

      </main>
    </div>
  );
}