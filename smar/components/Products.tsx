"use client";

import { 
  CheckCircle2, 
  User, 
  Smartphone, 
  MessageSquare, 
  Rocket, 
  Target, 
  Zap,
  Box 
} from "lucide-react";
import { useContent } from "@/hooks/useContent";

// Map Icon từ Database (dạng chuỗi) sang Component React
const IconMap: Record<string, React.ReactNode> = {
  User: <User className="w-5 h-5 text-blue-600" />,
  Smartphone: <Smartphone className="w-5 h-5 text-blue-600" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-blue-600" />,
  Rocket: <Rocket className="w-5 h-5 text-red-600" />,
  Target: <Target className="w-5 h-5 text-blue-600" />,
};

export const Products = () => {
  // Lấy dữ liệu từ bảng site_content với key 'sku'
  const { content, loading } = useContent('sku');

  // Hiển thị trạng thái chờ khi dữ liệu đang tải
  if (loading) return (
    <div className="py-24 bg-[#004282] text-center text-blue-100 font-black animate-pulse uppercase">
      Đang tải hệ sinh thái SKU...
    </div>
  );

  // Lọc bỏ các gói đã được đánh dấu ẩn (isHidden) từ Admin
  const activeSkus = (content?.skus || []).filter((sku: any) => !sku.isHidden);

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 lg:px-20 bg-[#004282]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight italic">
            {content?.title || "Hệ Sinh Thái 5 SKU Cốt Lõi"}
          </h2>
          <p className="text-blue-100 opacity-80 text-lg font-medium">
            {content?.subtitle || "Được thiết kế để tăng trưởng theo mô hình 3G (Personal - Product - Business)"}
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {activeSkus.map((sku: any, index: number) => (
            <div
              key={index}
              className={`relative bg-white rounded-[2.5rem] p-8 flex flex-col transition-all duration-500 border-2 ${
                sku.isBestSeller 
                  ? "border-red-500 scale-105 z-10 shadow-[0_30px_60px_rgba(0,0,0,0.2)]" 
                  : "border-transparent hover:-translate-y-2 hover:shadow-xl"
              }`}
            >
              {/* Badge Best Seller */}
              {sku.isBestSeller && (
                <div className="absolute top-0 right-0 bg-[#E31B23] text-white text-[10px] font-black px-5 py-2 rounded-bl-2xl rounded-tr-[2.5rem] uppercase tracking-widest">
                  Best Seller
                </div>
              )}

              {/* Icon & Tag */}
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${sku.isBestSeller ? "bg-red-50" : "bg-gray-50"}`}>
                  {IconMap[sku.icon] || <Box className="w-5 h-5 text-gray-400" />}
                </div>
                <span className="text-[9px] font-black text-gray-400 border border-gray-100 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  {sku.tag}
                </span>
              </div>

              {/* Title & Price */}
              <div className="space-y-1 mb-2">
                <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">
                  {sku.title}
                </h3>
                <p className="text-sm text-gray-400 font-bold">{sku.subtitle}</p>
              </div>
              
              <div className="text-3xl font-black text-[#004282] mb-8 italic tracking-tighter">
                {sku.price}
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-10 flex-grow">
                {sku.features?.map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 ${
                sku.isBestSeller 
                  ? "bg-[#E31B23] text-white shadow-lg shadow-red-200" 
                  : "bg-[#004282] text-white hover:bg-blue-800 shadow-lg shadow-blue-900/10"
              }`}>
                Tư vấn gói này <span className="text-lg">›</span>
              </button>
            </div>
          ))}

          {/* Combo Card (Khối đặc biệt luôn nằm cuối) */}
          <div className="bg-[#E31B23] rounded-[2.5rem] p-10 text-white flex flex-col items-center justify-center text-center shadow-2xl hover:scale-[1.02] transition-all relative overflow-hidden group">
            <Zap className="w-16 h-16 mb-8 text-yellow-300 animate-pulse relative z-10" />
            <h3 className="text-3xl font-black uppercase mb-2 leading-tight tracking-tighter italic relative z-10">
              {content?.combo?.title || "Combo Bán Nhanh"}
            </h3>
            <p className="text-red-100 text-sm mb-8 font-bold opacity-80 uppercase tracking-widest italic z-10">
              Foundation + Storytelling + SaleKits
            </p>
            <div className="text-5xl font-black mb-12 italic tracking-tighter z-10">
              {content?.combo?.price || "Chỉ từ 50M"}
            </div>
            <button className="w-full bg-white text-[#E31B23] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-50 transition-colors shadow-xl relative z-10">
              Nhận Ưu Đãi Combo
            </button>
            
            {/* Decor cho Combo Card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};