/**
 * FILE: types/cms.ts
 * Trung tâm định nghĩa kiểu dữ liệu cho toàn bộ CMS
 * Chuẩn enterprise – type-safe – scale được
 */

import { ChangeEvent } from "react";
import type { IconName } from "@/lib/iconRegistry";

/* =====================================================
   GENERIC CMS SECTION PROPS
===================================================== */

/**
 * Upload handler dùng chung cho toàn bộ CMS
 * field được ràng buộc theo keyof Section
 */
export type CmsUploadHandler<T> = (
  e: ChangeEvent<HTMLInputElement>,
  field: keyof T
) => Promise<void>;

/**
 * Props chuẩn cho mọi Section Config trong Admin
 */
export interface CmsSectionProps<T> {
  data?: T;
  updateData: (data: T) => void;

  // Upload media (image / video / file)
  onUpload?: CmsUploadHandler<T>;
  uploading?: boolean;
}

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
  icon_name: IconName;
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
  icon_name: IconName;
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
  icon_name: IconName;
}

export interface TestimonialsSection {
  testimonials: TestimonialItem[];
  commitments: CommitmentItem[];
}

/* =====================================================
   CONTACT SECTION (NÂNG CAO – MEDIA + MAP)
===================================================== */

export interface ContactSection {
  title?: string;
  description?: string;

  email?: string;
  phone?: string;
  address?: string;

  // Google Map
  google_map_url?: string;
  google_map_embed?: string;

  // Media
  office_image_url?: string;
  office_video_url?: string;

  // Form
  services?: string[];
  cta_label?: string;
  privacy_note?: string;
}

/* =====================================================
   GLOBAL CMS STATE
===================================================== */

export interface SiteData {
  hero: HeroSection;
  about: AboutSection;
  sku: SKUSection;
  stats: StatsSection;
  testimonials: TestimonialsSection;
  contact: ContactSection;
}

/**
 * Key dùng cho CMS Tabs / Router
 */
export type CmsTabKey = keyof SiteData;
