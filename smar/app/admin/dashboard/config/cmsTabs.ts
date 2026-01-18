import type React from "react";
import type { CmsSectionProps, CmsTabKey } from "@/types/cms";

/**
 * Interface cấu hình Tab cho CMS
 * K: Ràng buộc theo danh sách các Tab Key (layout, hero, about,...)
 */
export interface CmsTabConfig<K extends CmsTabKey = CmsTabKey> {
  key: K;
  label: string;
  icon: React.ElementType;
  
  /**
   * Component config cho từng Section.
   * Dùng any ở đây là cần thiết vì mỗi Section có cấu trúc Data khác nhau hoàn toàn.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<CmsSectionProps<any>>; 
  
  hasUpload?: boolean;
  
  /**
   * uploadField: Tên trường dữ liệu để upload (image_url, logo_url...)
   */
  uploadField?: string; 
}