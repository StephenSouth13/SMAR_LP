"use client";

import { useContent } from "@/hooks/useContent";

interface StatItem {
  label: string;
  value: string;
  color?: string;
  isHidden?: boolean;
}

interface StatsContent {
  title?: string;
  description?: string;
  image_url?: string;
  stats: StatItem[];
}

export const Stats = () => {
  const { content, loading } = useContent<StatsContent>("stats");

  // Hiển thị trạng thái chờ hoặc ẩn nếu không có nội dung
  if (loading || !content) return null;

  // Lọc danh sách chỉ số không bị ẩn từ CMS
  const activeStats = (content.stats || []).filter((s) => !s.isHidden);
  const hasImage = Boolean(content.image_url);

  return (
    <section
      id="stats"
      className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hệ thống Grid tự động chuyển đổi dựa trên sự tồn tại của ảnh minh họa */}
        <div
          className={`grid grid-cols-1 items-center gap-12 lg:gap-20 ${
            hasImage ? "lg:grid-cols-12" : "lg:grid-cols-1"
          }`}
        >
          {/* PHẦN NỘI DUNG VĂN BẢN (TRÁI) */}
          <div
            className={
              hasImage
                ? "lg:col-span-7"
                : "w-full flex flex-col md:flex-row justify-between items-end gap-8"
            }
          >
            <div className={hasImage ? "max-w-xl" : "max-w-2xl"}>
              <div className="mb-4 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-[#E31B23]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E31B23]">
                  Data Driven 2026
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#004282] uppercase mb-6 italic leading-[1.1] tracking-tighter">
                {content.title ?? "BẢO CHỨNG THÀNH CÔNG"}
              </h2>

              <p className="text-gray-500 font-medium text-base md:text-lg leading-relaxed max-w-xl">
                {content.description ??
                  "SMAR không hứa hẹn suông. Chúng tôi nói bằng dữ liệu và sự tin tưởng của các Brand lớn."}
              </p>
            </div>

            {/* TRƯỜNG HỢP KHÔNG CÓ ẢNH: Hiển thị chỉ số ngay bên cạnh văn bản theo UI tối giản */}
            {!hasImage && (
              <div className="flex gap-10 md:gap-16 pb-2">
                {activeStats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center group border-l border-gray-100 pl-10 first:border-none first:pl-0"
                  >
                    <div
                      className={`text-4xl md:text-6xl font-black italic tracking-tighter transition-transform duration-500 group-hover:scale-110 ${
                        stat.color ?? "text-[#004282]"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PHẦN HÌNH ẢNH (PHẢI) - Chỉ hiển thị khi image_url có giá trị */}
          {hasImage && (
            <div className="lg:col-span-5 relative group">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transition-transform duration-700 group-hover:scale-[1.02]">
                <img
                  src={content.image_url}
                  alt="SMAR Success Stats"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Trang trí phía sau ảnh để tăng tính thẩm mỹ */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-50 rounded-full -z-10 opacity-60 blur-2xl" />
              
              {/* Nếu có ảnh, hiển thị overlay các chỉ số nhỏ lên phía dưới ảnh để tăng độ uy tín */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl z-20 flex justify-around border border-white/50">
                {activeStats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-black italic ${stat.color ?? "text-[#004282]"}`}>
                      {stat.value}
                    </div>
                    <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};