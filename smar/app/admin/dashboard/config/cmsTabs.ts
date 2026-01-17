import { Layout, Info, Box, BarChart3, Quote, Mail } from "lucide-react";
import HeroConfig from "./sections/HeroConfig";
import AboutConfig from "./sections/AboutConfig";
import ProductsConfig from "./sections/ProductsConfig";
import StatsConfig from "./sections/StatsConfig";
import TestimonialsConfig from "./sections/TestimonialsConfig";
import ContactConfig from "./sections/ContactConfig";

import { SiteData, CmsSectionProps, CmsTabKey } from "@/types/cms";

/**
 * Định nghĩa Interface cho Tab Config.
 * K sử dụng mặc định là CmsTabKey để bóc tách SiteData[K] chính xác.
 */
export interface CmsTabConfig<K extends CmsTabKey = CmsTabKey> {
  key: K;
  label: string;
  icon: React.ElementType;
  // Ép kiểu Component về dạng nhận Generic để tránh lỗi mismatch giữa các Section
  component: React.ComponentType<CmsSectionProps<any>>; 
  hasUpload?: boolean;
}

/**
 * Danh sách các Tab quản trị.
 * Sử dụng Component bọc để bypass lỗi mismatch Type giữa các Section riêng biệt.
 */
export const CMS_TABS: CmsTabConfig[] = [
  {
    key: "hero",
    label: "Hero Section",
    icon: Layout,
    component: HeroConfig as React.ComponentType<CmsSectionProps<any>>,
    hasUpload: true,
  },
  {
    key: "about",
    label: "About SMAR",
    icon: Info,
    component: AboutConfig as React.ComponentType<CmsSectionProps<any>>,
  },
  {
    key: "sku",
    label: "Dịch vụ SKU",
    icon: Box,
    component: ProductsConfig as React.ComponentType<CmsSectionProps<any>>,
  },
  {
    key: "stats",
    label: "Bảo chứng (Stats)",
    icon: BarChart3,
    component: StatsConfig as React.ComponentType<CmsSectionProps<any>>,
    hasUpload: true,
  },
  {
    key: "testimonials",
    label: "Cảm nhận (Feedback)",
    icon: Quote,
    component: TestimonialsConfig as React.ComponentType<CmsSectionProps<any>>,
  },
  {
    key: "contact",
    label: "Liên hệ (Contact)",
    icon: Mail,
    component: ContactConfig as React.ComponentType<CmsSectionProps<any>>,
    hasUpload: true,
  },
];