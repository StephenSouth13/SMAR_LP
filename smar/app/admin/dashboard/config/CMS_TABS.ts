/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Info, Box, BarChart3, Quote, Mail } from "lucide-react";
import HeroConfig from "./sections/HeroConfig";
import AboutConfig from "./sections/AboutConfig";
import ProductsConfig from "./sections/ProductsConfig";
import StatsConfig from "./sections/StatsConfig";
import TestimonialsConfig from "./sections/TestimonialsConfig";
import ContactConfig from "./sections/ContactConfig";

import type { CmsTabConfig } from "./cmsTabs";
import { CmsTabKey } from "@/types/cms";

export const CMS_TABS: CmsTabConfig<CmsTabKey>[] = [
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
];