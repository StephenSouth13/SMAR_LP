import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const useContent = (sectionName: string) => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_name', sectionName)
        .single();
      
      if (data) setContent(data.content);
      setLoading(false);
    };
    fetchContent();
  }, [sectionName]);

  return { content, loading };
};