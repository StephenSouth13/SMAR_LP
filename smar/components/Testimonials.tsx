import { Award, CheckCircle, Globe } from "lucide-react";

export const Testimonials = () => {
  return (
    <section className="pb-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Khối bên trái: Testimonial AMA */}
        <div className="lg:col-span-2 bg-[#F8FAFC] p-8 md:p-10 rounded-[2.5rem] relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm font-bold text-[#004282]">
              AMA
            </div>
            <div>
              <h4 className="font-black text-[#002D72] text-lg">Trung Tâm Ngoại Ngữ AMA Vũng Tàu</h4>
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
            </div>
          </div>
          
          <p className="text-gray-600 italic leading-relaxed mb-8">
            "Hệ thống SaleKits của SMAR thực sự thay đổi cách đội ngũ chúng tôi tiếp cận học viên. 
            Chuyên nghiệp hơn, thuyết phục hơn và rút ngắn thời gian tư vấn đáng kể."
          </p>
          
          <div className="bg-[#E8F1FF] px-6 py-3 rounded-xl flex justify-between items-center">
            <span className="text-[11px] font-bold text-[#004282] uppercase">Sử dụng SKU:</span>
            <span className="text-[11px] font-extrabold text-[#002D72]">SaleKits Thực Chiến + Growth</span>
          </div>
        </div>

        {/* Khối bên phải: 3 cam kết hệ sinh thái */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-[#002D72]">Hệ sinh thái đối tác lớn</h5>
              <p className="text-sm text-gray-500">Á Châu, Satra, Nippon, các Luật sư & Kỷ lục gia đầu ngành.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-[#002D72]">Đội ngũ Cố vấn dày dạn</h5>
              <p className="text-sm text-gray-500">Mối quan hệ sâu rộng với các thương hiệu G3 (Brand lớn).</p>
            </div>
          </div>

          <div className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-[#002D72]">Tiên phong "Phẩm hiệu"</h5>
              <p className="text-sm text-gray-500">Đơn vị duy nhất tập trung làm linh hồn cho sản phẩm ngách.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};