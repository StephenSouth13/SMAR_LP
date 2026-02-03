//D:\Smar\SMAR_LP\smar\app\admin\dashboard\config\CMS_TABS.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Layout, 
  Info, 
  Box, 
  BarChart3, 
  Quote, 
  Mail, 
  MapPin, 
  Layers, 
  Menu // Import thêm Menu icon
} from "lucide-react";

import HeroConfig from "./sections/HeroConfig";
import AboutConfig from "./sections/AboutConfig";
import ProductsConfig from "./sections/ProductsConfig";
import StatsConfig from "./sections/StatsConfig";
import TestimonialsConfig from "./sections/TestimonialsConfig";
import ContactConfig from "./sections/ContactConfig";
import FooterConfig from "./sections/FooterConfig";
import NavConfig from "./sections/NavConfig";
import LayoutConfig from "./sections/LayoutConfig";

import type { CmsTabConfig } from "./cmsTabs";
import { CmsTabKey } from "@/types/cms";

export const CMS_TABS: CmsTabConfig<CmsTabKey>[] = [
  // 1. Đưa Layout lên đầu để quản lý tổng thể trước
  {
    key: "layout",
    label: "Bố cục (Layout)",
    icon: Layers,
    component: LayoutConfig as any,
  },
  // 2. Navbar cũng là thành phần cố định, nên ở phía trên
  {
    key: "navbar",
    label: "Thanh menu (Nav)",
    icon: Menu, // Đổi sang Menu icon cho trực quan
    component: NavConfig as any,
  },
  {
    key: "hero",
    label: "Hero Section",
    icon: Layout,
    component: HeroConfig as any,
    hasUpload: true,
    uploadField: "image_url",
  },
  {
    key: "about",
    label: "About SMAR",
    icon: Info,
    component: AboutConfig as any,
  },
  {
    key: "sku",
    label: "Dịch vụ SKU",
    icon: Box,
    component: ProductsConfig as any,
  },
  {
    key: "stats",
    label: "Bảo chứng (Stats)",
    icon: BarChart3,
    component: StatsConfig as any,
    hasUpload: true,
    uploadField: "image_url",
  },
  {
    key: "testimonials",
    label: "Cảm nhận (Feedback)",
    icon: Quote,
    component: TestimonialsConfig as any,
  },
  {
    key: "contact",
    label: "Liên hệ (Contact)",
    icon: Mail,
    component: ContactConfig as any,
    hasUpload: true,
    uploadField: "office_image_url",
  },
  {
    key: "footer",
    label: "Chân trang (Footer)",
    icon: MapPin,
    component: FooterConfig as any,
  },
];