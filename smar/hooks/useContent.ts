//D:\Smar\SMAR_LP\smar\hooks\useContent.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface UseContentResult<T> {
  content: T | null;
  loading: boolean;
}

export function useContent<T>(
  sectionName?: string
): UseContentResult<T> {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const fetchContent = async () => {
      setLoading(true);
      
      try {
        // 1. Dùng const cho query để hết lỗi 'prefer-const'
        const query = supabase.from("site_content").select("section_name, content");

        if (sectionName) {
          // 2. Lấy 1 section cụ thể
          const { data, error } = await query
            .eq("section_name", sectionName)
            .single();

          if (!mounted) return;

          if (error) {
            console.error(`[useContent] Error fetching ${sectionName}:`, error);
            setContent(null);
          } else {
            setContent(data?.content as T);
          }
        } 
        else {
          // 3. Lấy toàn bộ và gộp lại (SiteData)
          const { data, error } = await query;

          if (!mounted) return;

          if (error) {
            console.error(`[useContent] Error fetching all content:`, error);
            setContent(null);
          } else if (data) {
            // 4. Định nghĩa kiểu cho Record để hết lỗi 'no-explicit-any'
            const mergedContent = data.reduce<Record<string, unknown>>((acc, row) => {
              acc[row.section_name] = row.content;
              return acc;
            }, {});
            
            setContent(mergedContent as T);
          }
        }
      } catch (err) {
        console.error("[useContent] Unexpected error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchContent();

    return () => {
      mounted = false;
    };
  }, [sectionName]);

  return { content, loading };
}