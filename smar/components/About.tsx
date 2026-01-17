"use client";
import { Zap, Smartphone, ShieldCheck } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const IconMap: Record<string, any> = {
  Zap: <Zap className="w-6 h-6 text-yellow-500" />,
  Smartphone: <Smartphone className="w-6 h-6 text-blue-500" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-green-500" />,
};

export const About = () => {
  const { content, loading } = useContent('about');
  if (loading) return null;

  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#004282] uppercase tracking-tight mb-4">
            {content?.title || "Tại sao chọn con đường của SMAR?"}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {content?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(content?.reasons || []).map((item: any, index: number) => (
            <div key={index} className="group p-10 bg-[#F8FAFC] rounded-[2.5rem] transition-all duration-300 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-transparent hover:border-gray-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform">
                {IconMap[item.icon]}
              </div>
              <h3 className="text-xl font-bold text-[#002D72] mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};