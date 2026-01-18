/**
 * FILE: types/cms.ts
 * Trung tâm định nghĩa kiểu dữ liệu cho toàn bộ CMS
 * Chuẩn enterprise – type-safe – hỗ trợ kéo thả & tùy biến Layout
 */

import { ChangeEvent } from "react";
import type { IconName } from "@/lib/iconRegistry";

/* =====================================================
   GENERIC CMS SECTION PROPS
===================================================== */

export type CmsUploadHandler<T> = (
  e: ChangeEvent<HTMLInputElement>,
  field: keyof T
) => Promise<void>;

export interface CmsSectionProps<T> {
  data: T;
  updateData: (data: T) => void;
  onUpload?: CmsUploadHandler<T>;
  uploading?: boolean;
}

/* =====================================================
   LAYOUT SYSTEM (Hệ thống điều phối vị trí)
===================================================== */

export interface LayoutSection {
  id: string;        // ID duy nhất (ví dụ: "hero-123")
  type: "hero" | "about" | "sku" | "stats" | "testimonials" | "contact"| "navbar" | "footer"; 
  enabled: boolean;  // Bật/Tắt hiển thị
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
   SKU SECTION (Hệ sinh thái sản phẩm)
===================================================== */

export interface SKUItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  tag: string;
  icon: string;
  icon_name: IconName;
  isBestSeller?: boolean;
  features: string[];
  isHidden: boolean;
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
   STATS SECTION (Con số bảo chứng)
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
   CONTACT SECTION
===================================================== */

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
   FOOTER SECTION
===================================================== */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  logo_url?: string;
  description?: string;
  copyright?: string;
  socials: {
    linkedin?: string;
    facebook?: string;
    website?: string;
    instagram?: string;
    youtube?: string;
  };
  sub_links: FooterLink[];
}

/* =====================================================
   NAVBAR SECTION
===================================================== */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarSection {
  brandName1: string;
  brandName2: string;
  domainText: string;
  ctaText: string;
  links: NavLink[];
}

/* =====================================================
   GLOBAL SITE DATA (Bản đồ dữ liệu tổng)
===================================================== */

export interface SiteData {
  layout: LayoutSection[]; // Quyết định thứ tự render trên Landing Page
  navbar: NavbarSection;
  hero: HeroSection;
  about: AboutSection;
  sku: SKUSection;
  stats: StatsSection;
  testimonials: TestimonialsSection;
  contact: ContactSection;
  footer: FooterSection;
}

/**
 * Tab key phục vụ routing trong Admin
 */
export type CmsTabKey = keyof SiteData;