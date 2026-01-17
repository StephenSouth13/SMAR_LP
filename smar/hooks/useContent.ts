//D:\Smar\SMAR_LP\smar\hooks\useContent.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface UseContentResult<T> {
  content: T | null;
  loading: boolean;
}

export function useContent<T>(
  sectionName: string
): UseContentResult<T> {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("section_name", sectionName)
        .single();

      if (!mounted) return;

      if (error) {
        console.error(`[useContent] ${sectionName}`, error);
        setContent(null);
      } else {
        setContent(data?.content as T);
      }

      setLoading(false);
    };

    fetchContent();

    return () => {
      mounted = false;
    };
  }, [sectionName]);

  return { content, loading };
}
