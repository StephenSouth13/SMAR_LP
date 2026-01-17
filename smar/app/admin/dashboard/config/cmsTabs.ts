import { Layout, Info, Box, BarChart3, Quote, Mail } from "lucide-react";
import HeroConfig from "./sections/HeroConfig";
import AboutConfig from "./sections/AboutConfig";
import ProductsConfig from "./sections/ProductsConfig";
import StatsConfig from "./sections/StatsConfig";
import TestimonialsConfig from "./sections/TestimonialsConfig";
import ContactConfig from "./sections/ContactConfig";

import { SiteData, CmsSectionProps } from "@/types/cms";

/* ==============================
   1. MAP KEY -> DATA TYPE (Sử dụng trực tiếp SiteData)
================================ */
export type CmsTabKey = keyof SiteData;

/* ==============================
   2. TAB CONFIG (KEY-DRIVEN)
================================ */
// Sử dụng K extends CmsTabKey để khóa chặt Component với Data tương ứng
export interface CmsTabConfig<K extends CmsTabKey = CmsTabKey> {
  key: K;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType<CmsSectionProps<SiteData[K]>>;
  hasUpload?: boolean;
}

/* ==============================
   3. CMS TAB DEFINITIONS
================================ */
/**
 * Chúng ta sử dụng mảng với kiểu CmsTabConfig<any>[] để có thể chứa 
 * các Object có các Key khác nhau (hero, about, sku...) mà không bị lỗi 
 * bóc tách kiểu dữ liệu khi map trong file page.tsx.
 */
export const CMS_TABS: CmsTabConfig<any>[] = [
  {
    key: "hero",
    label: "Hero Section",
    icon: Layout,
    component: HeroConfig,
    hasUpload: true,
  },
  {
    key: "about",
    label: "About SMAR",
    icon: Info,
    component: AboutConfig,
  },
  {
    key: "sku",
    label: "Dịch vụ SKU",
    icon: Box,
    component: ProductsConfig,
  },
  {
    key: "stats",
    label: "Bảo chứng (Stats)",
    icon: BarChart3,
    component: StatsConfig,
    hasUpload: true,
  },
  {
    key: "testimonials",
    label: "Cảm nhận (Feedback)",
    icon: Quote,
    component: TestimonialsConfig,
  },
  {
    key: "contact",
    label: "Liên hệ (Contact)",
    icon: Mail,
    component: ContactConfig,
    hasUpload: true,
  },
];