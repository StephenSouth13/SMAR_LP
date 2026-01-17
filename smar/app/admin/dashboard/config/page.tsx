"use client";

import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import {
  Save,
  RefreshCcw,
  Layout,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import HeroConfig from "./sections/HeroConfig";

/* =====================
   TYPES
===================== */

interface HeroSection {
  title?: string;
  subtitle?: string;
  image_url?: string;
}

interface SiteContentRecord {
  section_name: string;
  content: HeroSection;
}

interface SiteData {
  hero: HeroSection;
}

/* =====================
   COMPONENT
===================== */

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState<keyof SiteData>("hero");
  const [data, setData] = useState<SiteData>({ hero: {} });

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  /* =====================
     FETCH DATA
  ===================== */

  const fetchData = useCallback(async () => {
    const { data: records, error } = await supabase
      .from("site_content")
      .select("*");

    if (error || !records) {
      console.error(error);
      setLoading(false);
      return;
    }

    const formatted = records.reduce<SiteData>(
      (acc, curr: SiteContentRecord) => {
        acc[curr.section_name as keyof SiteData] = curr.content;
        return acc;
      },
      { hero: {} }
    );

    setData(formatted);
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [fetchData]);

  /* =====================
     UPLOAD IMAGE
  ===================== */

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileName = `hero_${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("smar-assets")
      .upload(fileName, file);

    if (uploadError) {
      alert("Lỗi upload: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("smar-assets")
      .getPublicUrl(fileName);

    setData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        image_url: publicData.publicUrl,
      },
    }));

    setMsg("Ảnh đã tải lên!");
    setTimeout(() => setMsg(""), 3000);
    setUploading(false);
  };

  /* =====================
     SAVE DATA
  ===================== */

  const handleSave = async () => {
    setSaving(true);

    const { error } = await supabase.from("site_content").upsert(
      {
        section_name: activeTab,
        content: data[activeTab],
      },
      { onConflict: "section_name" }
    );

    if (error) {
      alert("Lỗi lưu: " + error.message);
    } else {
      setMsg("Lưu thành công!");
      setTimeout(() => setMsg(""), 3000);
    }

    setSaving(false);
  };

  /* =====================
     LOADING
  ===================== */

  if (loading) {
    return (
      <div className="p-20 text-center font-black animate-pulse text-blue-900 uppercase">
        SMAR CMS Loading...
      </div>
    );
  }

  /* =====================
     RENDER
  ===================== */

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-4 md:p-8">
      {/* Sidebar */}
      <div className="w-full lg:w-72 space-y-3">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 ml-4 text-blue-600">
          Quản lý nội dung
        </h3>

        <button
          onClick={() => setActiveTab("hero")}
          className={`w-full flex items-center justify-between p-5 rounded-[1.8rem] font-bold transition-all ${
            activeTab === "hero"
              ? "bg-[#002D72] text-white shadow-xl shadow-blue-900/20 translate-x-2"
              : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <Layout size={18} /> HERO
          </div>
          <ChevronRight
            size={14}
            className={activeTab === "hero" ? "opacity-100" : "opacity-0"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-10">
        <div className="flex justify-between items-center sticky top-0 bg-gray-50/80 backdrop-blur-md py-4 z-20 border-b border-gray-100/50">
          <div>
            <h2 className="text-3xl font-black text-[#002D72] uppercase italic tracking-tighter">
              Cấu hình: {activeTab}
            </h2>
            <p className="text-gray-400 text-xs font-medium mt-1">
              Sửa đổi trực tiếp giao diện SMAR 2026
            </p>
          </div>

          <div className="flex items-center gap-6">
            {msg && (
              <span className="text-green-600 font-bold flex items-center gap-2 text-sm px-4 py-2 bg-green-50 rounded-full">
                <CheckCircle2 size={16} /> {msg}
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#E31B23] hover:bg-red-700 text-white px-10 py-5 rounded-3xl font-black flex items-center gap-3 shadow-2xl shadow-red-200 transition-all active:scale-95 disabled:opacity-50"
            >
              {saving ? (
                <RefreshCcw className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              LƯU CẤU HÌNH
            </button>
          </div>
        </div>

        {activeTab === "hero" && (
          <HeroConfig
            data={data.hero}
            updateData={(val: HeroSection) =>
              setData((prev) => ({ ...prev, hero: val }))
            }
            onUpload={handleUpload}
            uploading={uploading}
          />
        )}
      </div>
    </div>
  );
}
