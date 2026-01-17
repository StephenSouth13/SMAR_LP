/**
 * FILE: types/cms.ts
 * Trung tâm định nghĩa kiểu dữ liệu cho toàn bộ CMS
 * Chuẩn CMS-driven – Type-safe – Mở rộng dài hạn
 */
import { ChangeEvent } from "react";

export interface CmsSectionProps<T> {
  data: T;
  updateData: (data: T) => void;
  onUpload?: (e: ChangeEvent<HTMLInputElement>) => void;
  uploading?: boolean;
}
import type { IconName } from "@/lib/iconRegistry";

/* =====================================================
   HERO SECTION
===================================================== */
export interface HeroButton {
  label: string;
  href: string;
  primary: boolean;
}

export interface HeroSection {
  badge?: string;
  title?: string;
  description?: string;
  image_url?: string;
  revenue_target?: string;
  buttons?: HeroButton[];
}

/* =====================================================
   ABOUT SECTION
===================================================== */
export interface AboutReason {
  icon_name: IconName;     // 🔥 dùng chung registry
  title: string;
  desc: string;
}

export interface AboutSection {
  title?: string;
  description?: string;
  reasons: AboutReason[];
}

/* =====================================================
   SKU SECTION
===================================================== */
export interface SKUItem {
  title: string;
  subtitle: string;
  price: string;
  tag: string;
  icon_name: IconName;     // 🔥 không còn icon string tự do
  isBestSeller?: boolean;
  features: string[];
}

export interface SKUSection {
  title?: string;
  subtitle?: string;
  skus: SKUItem[];
  combo?: {
    title: string;
    price: string;
  };
}

/* =====================================================
   STATS SECTION
===================================================== */
export interface StatItem {
  id: string;
  value: string;
  label: string;
  color?: string;
  isHidden: boolean;
}

export interface StatsSection {
  title?: string;
  description?: string;
  image_url?: string | null;
  stats: StatItem[];
}

/* =====================================================
   TESTIMONIALS SECTION
===================================================== */
export interface TestimonialItem {
  id: string;
  author_name: string;
  author_role?: string;
  content: string;
  sku_used: string;
  rating?: number;
}

export interface CommitmentItem {
  id: string;
  title: string;
  desc: string;
  icon_name: IconName;     // 🔥 CMS-driven icon
}

export interface TestimonialsSection {
  testimonials: TestimonialItem[];
  commitments: CommitmentItem[];
}

/* =====================================================
   CONTACT SECTION
===================================================== */
// --- CONTACT SECTION TYPES ---
// types/cms.ts
export interface ContactSection {
  title?: string;
  description?: string;

  email?: string;
  phone?: string;
  address?: string;

  google_map_url?: string;
  google_map_embed?: string;

  office_image_url?: string;
  office_video_url?: string;

  services?: string[];

  cta_label?: string;
  privacy_note?: string;
}

/* =====================================================
   MAIN SITE DATA (GLOBAL CMS STATE)
===================================================== */
export interface SiteData {
  hero: HeroSection;
  about: AboutSection;
  sku: SKUSection;
  stats: StatsSection;
  testimonials: TestimonialsSection;
  contact: ContactSection;
}
