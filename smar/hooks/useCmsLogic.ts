/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import type { SiteData } from "@/types/cms";

/* -------------------- EMPTY DATA CHUẨN TYPE -------------------- */
/**
 * Dữ liệu khởi tạo mặc định. 
 * layout: Quyết định thứ tự các section nội dung trên Landing Page.
 */
const EMPTY_DATA: SiteData = {
  layout: [
    { id: "h1", type: "hero", enabled: true },
    { id: "a1", type: "about", enabled: true },
    { id: "s1", type: "sku", enabled: true },
    { id: "st1", type: "stats", enabled: true },
    { id: "t1", type: "testimonials", enabled: true },
    { id: "c1", type: "contact", enabled: true },
  ],
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
  navbar: {
    brandName1: "SM",
    brandName2: "AR",
    domainText: "SALEKITS.VN",
    ctaText: "Tư vấn ngay",
    links: [
      { label: "Về SMAR", href: "#about" },
      { label: "Dịch vụ SKU", href: "#pricing" },
      { label: "Case Study", href: "#blog" },
    ]
  },
  footer: {
    logo_url: "",
    description: "",
    socials: {
      linkedin: "",
      facebook: "",
      website: "",
      instagram: "",
      youtube: ""
    },
    sub_links: []
  }
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
          // Ép kiểu qua any để linh hoạt gán dữ liệu JSON từ DB
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
  /**
   * Lưu một section cụ thể vào database. 
   * @param section Tên section cần lưu (ví dụ: 'hero', 'layout')
   * @param customData Dữ liệu tùy chỉnh nếu không muốn lấy từ state hiện tại
   */
  const handleSave = async <K extends keyof SiteData>(section: K, customData?: any) => {
    setSaving(true);
    setMsg("⏳ Đang lưu...");

    const { error } = await supabase
      .from("site_content")
      .upsert(
        {
          section_name: section,
          content: customData || data[section],
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
  /**
   * Tải ảnh/video lên Storage và cập nhật trực tiếp vào Section tương ứng
   */
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

    try {
      // 1. Upload file lên bucket 'smar-assets'
      const { error: uploadError } = await supabase.storage
        .from("smar-assets")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Lấy URL công khai của file vừa upload
      const { data: urlData } = supabase.storage
        .from("smar-assets")
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // 3. Cập nhật state cục bộ và tự động trigger lưu vào DB
      setData((prev) => {
        const updatedSection = {
          ...prev[section],
          [field]: publicUrl
        };
        
        // Gọi lưu ngay để đảm bảo DB đồng bộ với ảnh mới
        handleSave(section, updatedSection);

        return {
          ...prev,
          [section]: updatedSection,
        };
      });

      setMsg("✅ Media đã cập nhật");
    } catch (err: any) {
      console.error("❌ Upload error:", err.message);
      setMsg("❌ Lỗi tải lên: " + err.message);
    } finally {
      setUploading(false);
      setTimeout(() => setMsg(""), 3000);
    }
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