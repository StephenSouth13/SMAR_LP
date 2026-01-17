"use client";
import { useContent } from "@/hooks/useContent";

export const Hero = () => {
  const { content, loading } = useContent('hero');
  if (loading) return <div className="h-[80vh] bg-gray-50 flex items-center justify-center font-black text-[#004282] animate-pulse">SMAR...</div>;

  return (
    <section className="relative w-full bg-white overflow-hidden py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="z-10 space-y-8">
          <div className="inline-block">
            <span className="bg-red-50 text-red-500 px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-red-100 shadow-sm shadow-red-50">
              {content?.badge || "SMAR 2026: ĐÓNG GÓI GIÁ TRỊ"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#004282] leading-[1.05] tracking-tight whitespace-pre-line italic">
            {content?.title || "Biến Dữ Liệu Con Người Thành Doanh Số Thực"}
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
            {content?.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            {content?.buttons?.map((btn: any, i: number) => (
              <a key={i} href={btn.href} className="w-full sm:w-auto">
                <button className={`w-full px-10 py-5 rounded-2xl font-black text-base transition-all active:scale-95 shadow-lg ${i === 0 ? "bg-[#3361E0] text-white hover:bg-blue-700 shadow-blue-200" : "bg-white text-[#004282] border border-gray-100 hover:bg-gray-50 shadow-gray-100"}`}>
                  {btn.label}
                </button>
              </a>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end group">
          <div className="relative p-4 bg-white rounded-[3.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.08)] border border-gray-50 transition-transform duration-700 group-hover:scale-[1.02]">
            <div className="overflow-hidden rounded-[2.5rem]">
              <img src={content?.image_url || "/image.png"} className="w-full h-auto object-cover md:max-w-[580px]" alt="SMAR 2026" />
            </div>
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-[#E31B23] text-white p-7 md:p-10 rounded-[2rem] shadow-2xl z-20 min-w-[200px] transform hover:-translate-y-2 transition-transform">
              <div className="text-4xl md:text-5xl font-black italic leading-none mb-2">{content?.revenue_target || "1.5B+"}</div>
              <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] opacity-80">Mục Tiêu Doanh Thu 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};