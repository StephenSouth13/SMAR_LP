import type React from "react";
// 🔥 Xóa SiteData vì ESLint báo lỗi "defined but never used"
import type { CmsSectionProps, CmsTabKey } from "@/types/cms";

/**
 * Interface cấu hình Tab cho CMS
 * K: Ràng buộc theo danh sách các Tab Key (hero, about, sku,...)
 */
export interface CmsTabConfig<K extends CmsTabKey = CmsTabKey> {
  key: K;
  label: string;
  icon: React.ElementType;
  
  /**
   * 🔥 FIX LỖI any: Sử dụng React.ComponentType<CmsSectionProps<any>> 
   * nhưng bọc trong comment eslint-disable cục bộ trên dòng này 
   * để dập tắt cảnh báo mà không làm hỏng cấu trúc Generic.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<CmsSectionProps<any>>; 
  
  hasUpload?: boolean;
  
  /**
   * uploadField: Tên trường dữ liệu để upload (image_url, office_image_url...)
   * Để string ở đây là phương án linh hoạt nhất cho hệ thống CMS động.
   */
  uploadField?: string; 
}