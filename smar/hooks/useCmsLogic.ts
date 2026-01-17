"use client";

import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import { SiteData } from "@/types/cms";

const EMPTY_DATA: SiteData = {
  hero: { buttons: [] },
  about: { reasons: [] },
  sku: { title: "", subtitle: "", skus: [], combo: { title: "", price: "" } },
  stats: { title: "", description: "", image_url: null, stats: [] },
  testimonials: { title: "", description: "", testimonials: [], commitments: [] },
  contact: { 
    services: [],
    email: "",
    phone: "",
    address: ""
  },
};

export const useCmsLogic = () => {
  const [data, setData] = useState<SiteData>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: records, error } = await supabase
        .from("site_content")
        .select("section_name, content");

      if (error) throw error;

      const merged = (records || []).reduce<SiteData>((acc, row) => {
        const key = row.section_name as keyof SiteData;
        if (Object.prototype.hasOwnProperty.call(acc, key)) {
          acc[key] = row.content;
        }
        return acc;
      }, structuredClone(EMPTY_DATA));

      setData(merged);
    } catch (err: any) {
      console.error("Fetch CMS error:", err.message);
      setMsg("❌ Lỗi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSave = async (section: keyof SiteData) => {
    setSaving(true);
    setMsg("⏳ Đang lưu...");
    
    const { error } = await supabase
      .from("site_content")
      .upsert(
        { section_name: section, content: data[section] },
        { onConflict: "section_name" }
      );

    if (!error) {
      setMsg("✅ Lưu thành công");
      setTimeout(() => setMsg(""), 3000);
    } else {
      setMsg("❌ Lỗi: " + error.message);
    }
    setSaving(false);
  };

  const handleUpload = async <T extends keyof SiteData>(
    e: ChangeEvent<HTMLInputElement>,
    section: T,
    field: keyof SiteData[T] = "image_url" as any
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMsg("⏳ Đang tải media...");
    
    const fileName = `${section}_${field.toString()}_${Date.now()}`;

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

  return { data, setData, loading, saving, uploading, msg, handleSave, handleUpload };
};