import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
export const Contact = () => {
  return (
    <section id ="contact" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Cột trái: Thông tin liên hệ */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black text-[#E31B23] leading-tight">
              BÙNG NỔ 2026?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl font-medium max-w-md leading-relaxed" style={{ color: 'rgba(0, 45, 114, 0.4)' }}>
              Để lại thông tin, đội ngũ chiến lược của SMAR sẽ liên hệ trực tiếp để tư vấn gói SKU phù hợp nhất với mô hình của bạn.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-[#3361E0] group-hover:bg-[#3361E0] group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Email</p>
                <p className="text-[#002D72] font-bold">info@smar.vn</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-[#3361E0] group-hover:bg-[#3361E0] group-hover:text-white transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Hotline</p>
                <p className="text-[#002D72] font-bold">093.xxx.xxxx (Smar.vn)</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-[#3361E0] group-hover:bg-[#3361E0] group-hover:text-white transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Văn phòng</p>
                <p className="text-[#002D72] font-bold text-sm">Innovation Hub, Quận 1 | Quận 7, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Form đăng ký */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-gray-50">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Họ và Tên</label>
              <input 
                type="text" 
                placeholder="Ví dụ: Nguyễn Văn A" 
                className="w-full p-4 bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-xl outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Số điện thoại</label>
              <input 
                type="tel" 
                placeholder="Ví dụ: 090xxxxxxx" 
                className="w-full p-4 bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-xl outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Dịch vụ quan tâm</label>
              <div className="relative">
                <select className="w-full p-4 bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-xl outline-none transition-all text-sm appearance-none cursor-pointer">
                  <option>Personal Brand Foundation</option>
                  <option>Personal Growth</option>
                  <option>Product Storytelling</option>
                  <option>SaleKits Thực Chiến</option>
                  <option>Product Growth</option>
                  <option>Combo Bán Nhanh</option>
                  <option>Tư vấn tổng thể chiến lược</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 italic">
                  ▼
                </div>
              </div>
            </div>

            <button className="w-full bg-[#E31B23] hover:bg-red-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-200 transition-all active:scale-95 uppercase tracking-wider">
              Đăng Ký Tư Vấn Ngay
            </button>
            
            <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest mt-4">
              Cam kết bảo mật thông tin khách hàng 100%
            </p>
          </form>
        </div>

      </div>
    </section>
  );
};