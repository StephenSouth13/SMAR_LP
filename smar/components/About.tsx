"use client";

import { Zap, Smartphone, ShieldCheck } from "lucide-react";
import { useContent } from "@/hooks/useContent";
// 1. Sử dụng AboutSection đã import
import type { AboutSection } from "@/types/cms";

// 2. Định nghĩa IconMap với kiểu dữ liệu chặt chẽ
const IconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6 text-yellow-500" />,
  Smartphone: <Smartphone className="w-6 h-6 text-blue-500" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-green-500" />,
};

export const About = () => {
  // 3. Truyền Generic <AboutSection> vào hook để content có đầy đủ thuộc tính
  const { content, loading } = useContent<AboutSection>("about");

  if (loading || !content) return null;

  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#004282] uppercase tracking-tight mb-4">
            {content.title || "Tại sao chọn con đường của SMAR?"}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 4. Type của item và index sẽ tự động được suy luận từ AboutSection */}
          {(content.reasons || []).map((item, index) => (
            <div
              key={index}
              className="group p-10 bg-[#F8FAFC] rounded-[2.5rem] transition-all hover:bg-white hover:shadow border"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8">
                {/* 5. Gọi icon an toàn với fallback */}
                {IconMap[item.icon_name] || <Zap className="w-6 h-6 text-gray-300" />}
              </div>
              <h3 className="text-xl font-bold text-[#002D72] mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};