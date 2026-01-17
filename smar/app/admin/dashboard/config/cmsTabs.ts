import { Layout, Info, Box, BarChart3, Quote, Mail } from "lucide-react";
import HeroConfig from "./sections/HeroConfig";
import AboutConfig from "./sections/AboutConfig";
import ProductsConfig from "./sections/ProductsConfig";
import StatsConfig from "./sections/StatsConfig";
import TestimonialsConfig from "./sections/TestimonialsConfig";
import ContactConfig from "./sections/ContactConfig";

import { SiteData, CmsSectionProps, CmsTabKey } from "@/types/cms";

/**
 * Interface cho Tab Config.
 * Sử dụng ComponentType<any> ở cấp độ thấp nhất để đảm bảo tính linh hoạt khi Build.
 */
export interface CmsTabConfig<K extends CmsTabKey = CmsTabKey> {
  key: K;
  label: string;
  icon: React.ElementType;
  // Giữ any ở đây để bypass sự khác biệt giữa các tham số onUpload của từng Section
  component: React.ComponentType<CmsSectionProps<any>>; 
  hasUpload?: boolean;
}

/**
 * Danh sách các Tab quản trị.
 * Kỹ thuật "as unknown as..." là bắt buộc để bypass strict mode khi build production.
 */
export const CMS_TABS: CmsTabConfig[] = [
  {
    key: "hero",
    label: "Hero Section",
    icon: Layout,
    component: HeroConfig as unknown as React.ComponentType<CmsSectionProps<any>>,
    hasUpload: true,
  },
  {
    key: "about",
    label: "About SMAR",
    icon: Info,
    component: AboutConfig as unknown as React.ComponentType<CmsSectionProps<any>>,
  },
  {
    key: "sku",
    label: "Dịch vụ SKU",
    icon: Box,
    component: ProductsConfig as unknown as React.ComponentType<CmsSectionProps<any>>,
  },
  {
    key: "stats",
    label: "Bảo chứng (Stats)",
    icon: BarChart3,
    component: StatsConfig as unknown as React.ComponentType<CmsSectionProps<any>>,
    hasUpload: true,
  },
  {
    key: "testimonials",
    label: "Cảm nhận (Feedback)",
    icon: Quote,
    component: TestimonialsConfig as unknown as React.ComponentType<CmsSectionProps<any>>,
  },
  {
    key: "contact",
    label: "Liên hệ (Contact)",
    icon: Mail,
    component: ContactConfig as unknown as React.ComponentType<CmsSectionProps<any>>,
    hasUpload: true,
  },
];