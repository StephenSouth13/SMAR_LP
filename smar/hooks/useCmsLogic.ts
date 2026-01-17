/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import type { SiteData } from "@/types/cms";

/* -------------------- EMPTY DATA CHUẨN TYPE -------------------- */
const EMPTY_DATA: SiteData = {
  hero: { badge: "", title: "", description: "", image_url: "", revenue_target: "", buttons: [] },
  about: { title: "", description: "", reasons: [] },
  sku: { title: "", subtitle: "", skus: [], combo: { title: "", price: "" } },
  stats: { title: "", description: "", image_url: null, stats: [] },
  testimonials: { testimonials: [], commitments: [] },
  contact: {
    title: "", description: "", email: "", phone: "", address: "",
    google_map_url: "", google_map_embed: "", office_image_url: "",
    office_video_url: "", services: [], cta_label: "", privacy_note: "",
  },
};

export const useCmsLogic = () => {
  const [data, setData] = useState<SiteData>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  /* -------------------- FETCH CMS DATA -------------------- */
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: records, error } = await supabase
        .from("site_content")
        .select("section_name, content");

      if (error) throw error;

      const merged = structuredClone(EMPTY_DATA);

      for (const row of records || []) {
        const key = row.section_name as keyof SiteData;
        if (key in merged) {
          // FIX LỖI 2322: Ép kiểu qua any để tránh TS bắt phải khớp toàn bộ union types
          (merged as any)[key] = row.content;
        }
      }

      setData(merged);
    } catch (err: any) {
      console.error("❌ Fetch CMS error:", err.message);
      setMsg("❌ Lỗi tải dữ liệu CMS");
    } finally {
      setLoading(false);
    }
  }, []);

  /* -------------------- SAVE 1 SECTION -------------------- */
  const handleSave = async <K extends keyof SiteData>(section: K) => {
    setSaving(true);
    setMsg("⏳ Đang lưu...");

    const { error } = await supabase
      .from("site_content")
      .upsert(
        {
          section_name: section,
          content: data[section],
        },
        { onConflict: "section_name" }
      );

    if (error) {
      setMsg("❌ Lỗi lưu: " + error.message);
    } else {
      setMsg("✅ Lưu thành công");
      setTimeout(() => setMsg(""), 3000);
    }

    setSaving(false);
  };

  /* -------------------- UPLOAD MEDIA (GENERIC) -------------------- */
  const handleUpload = async <
    K extends keyof SiteData,
    F extends keyof SiteData[K]
  >(
    e: ChangeEvent<HTMLInputElement>,
    section: K,
    field: F
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMsg("⏳ Đang tải media...");

    const fileName = `${section}_${String(field)}_${Date.now()}`;

    const { error: uploadError } = await supabase.storage
      .from("smar-assets")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setMsg("❌ Upload lỗi: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("smar-assets")
      .getPublicUrl(fileName);

    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: urlData.publicUrl,
      },
    }));

    setMsg("✅ Media đã cập nhật");
    setUploading(false);
    setTimeout(() => setMsg(""), 3000);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    setData,
    loading,
    saving,
    uploading,
    msg,
    handleSave,
    handleUpload,
  };
};