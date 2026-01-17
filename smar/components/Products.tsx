import { CheckCircle2, User, Smartphone, MessageSquare, Rocket, Target, Zap } from "lucide-react";

const skus = [
  {
    title: "Personal Brand Foundation",
    subtitle: "Khởi tạo Nhân Hiệu Core",
    price: "18.000.000 đ",
    tag: "SKU CỬA VÀO",
    icon: <User className="w-5 h-5 text-blue-600" />,
    features: [
      "Audit kênh cá nhân toàn diện",
      "Concept & Storytelling độc bản",
      "Bộ Profile 5 ảnh chuyên nghiệp",
      "Website cá nhân chuẩn SEO",
    ],
    buttonClass: "bg-[#004282] text-white",
  },
  {
    title: "Personal Growth",
    subtitle: "Duy trì Nhân Hiệu Chuyên Gia",
    price: "Từ 12.000.000 đ/tháng",
    tag: "RETAINER",
    icon: <Smartphone className="w-5 h-5 text-blue-600" />,
    features: [
      "Quản trị 8-12 bài viết chuyên sâu",
      "Sản xuất 4-8 video Short/TikTok",
      "Quản trị tương tác đa kênh",
      "Cập nhật hình ảnh sự kiện liên tục",
    ],
    buttonClass: "bg-[#004282] text-white",
  },
  {
    title: "Product Storytelling",
    subtitle: "Linh hồn cho Sản phẩm",
    price: "25.000.000 đ",
    tag: "BẮT BUỘC TRƯỚC SALEKITS",
    icon: <MessageSquare className="w-5 h-5 text-blue-600" />,
    features: [
      "Nghiên cứu thị trường & USP",
      "Concept sản phẩm & Slogan",
      "Nội dung Storytelling website/bao bì",
      "Bộ ảnh Concept nghệ thuật (10 ảnh)",
    ],
    buttonClass: "bg-[#004282] text-white",
  },
  {
    title: "SaleKits Thực Chiến",
    subtitle: "Bộ công cụ chốt Sales tối thượng",
    price: "Từ 30.000.000 đ",
    tag: "XƯƠNG SỐNG 2026",
    isBestSeller: true,
    icon: <Rocket className="w-5 h-5 text-red-600" />,
    features: [
      "E-catalogue chuyên nghiệp",
      "Slide Pitching bán hàng",
      "Landing Page chuyển đổi cao",
      "Sales Script & FAQ chốt khách",
      "01 Video giới thiệu sản phẩm",
    ],
    buttonClass: "bg-[#E31B23] text-white",
    cardClass: "border-2 border-red-500 scale-105 z-10 shadow-2xl",
  },
  {
    title: "Product Growth",
    subtitle: "Hỗ trợ Tăng trưởng Doanh số",
    price: "Từ 15.000.000 đ/tháng",
    tag: "RETAINER TĂNG TRƯỞNG",
    icon: <Target className="w-5 h-5 text-blue-600" />,
    features: [
      "Nội dung marketing bán hàng",
      "Sản xuất Video Short-form hàng tuần",
      "Lead Gen / Tối ưu quảng cáo",
      "Chỉ nhận khách đã có SaleKits",
    ],
    buttonClass: "bg-[#004282] text-white",
  },
];

export const Products = () => {
  return (
    <section id ="pricing" className="py-24 px-6 md:px-12 lg:px-20 bg-[#004282]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
            Hệ Sinh Thái 5 SKU Cốt Lõi
          </h2>
          <p className="text-blue-100 opacity-80 text-lg">
            Được thiết kế để tăng trưởng theo mô hình 3G (Personal - Product - Business)
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {skus.map((sku, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-[2rem] p-8 flex flex-col transition-all duration-300 ${sku.cardClass || "hover:-translate-y-2"}`}
            >
              {sku.isBestSeller && (
                <div className="absolute top-0 right-0 bg-[#E31B23] text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl rounded-tr-[2rem] uppercase tracking-widest">
                  Best Seller
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-gray-50 rounded-xl">{sku.icon}</div>
                <span className="text-[9px] font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded-md uppercase">
                  {sku.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{sku.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{sku.subtitle}</p>
              <div className="text-2xl font-black text-[#004282] mb-8">{sku.price}</div>

              <ul className="space-y-4 mb-10 flex-grow">
                {sku.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 ${sku.buttonClass}`}>
                Tư vấn gói này <span className="text-lg">›</span>
              </button>
            </div>
          ))}

          {/* Combo Card (Red Card) */}
          <div className="bg-[#E31B23] rounded-[2rem] p-8 text-white flex flex-col items-center justify-center text-center shadow-xl hover:-translate-y-2 transition-all">
            <Zap className="w-12 h-12 mb-6 text-yellow-300" />
            <h3 className="text-2xl font-black uppercase mb-2 leading-tight">
              Combo Bán Nhanh
            </h3>
            <p className="text-red-100 text-sm mb-6">Foundation + Storytelling + SaleKits</p>
            <div className="text-4xl font-black mb-8 italic">Chỉ từ 50M</div>
            <button className="w-full bg-white text-[#E31B23] py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Nhận Ưu Đãi Combo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};