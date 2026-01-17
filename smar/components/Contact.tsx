"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { supabase } from "@/lib/supabase";
import { ContactSection, SKUSection } from "@/types/cms";

export const Contact = () => {
  // Lấy data liên hệ và danh sách SKU để làm menu dropdown động
  const { content: contactData } = useContent<ContactSection>('contact');
  const { content: skuData } = useContent<SKUSection>('sku');
  
  const [formData, setFormData] = useState({ full_name: "", phone: "", service: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase
      .from("contacts")
      .insert([formData]);

    if (!error) {
      setSuccess(true);
      setFormData({ full_name: "", phone: "", service: "" });
      setTimeout(() => setSuccess(false), 5000);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: Contact Info (Dynamic) */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black text-[#E31B23] leading-tight italic uppercase tracking-tighter">
              {contactData?.title || "BÙNG NỔ 2026?"}
            </h2>
            <p className="text-[#002D72]/40 text-lg md:text-xl font-medium max-w-md leading-relaxed">
              {contactData?.description || "Để lại thông tin, đội ngũ chiến lược của SMAR sẽ liên hệ trực tiếp."}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-[#3361E0] group-hover:bg-[#3361E0] group-hover:text-white transition-all shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Email</p>
                <p className="text-[#002D72] font-bold">{contactData?.email || "info@smar.vn"}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-[#3361E0] group-hover:bg-[#3361E0] group-hover:text-white transition-all shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Hotline</p>
                <p className="text-[#002D72] font-bold">{contactData?.phone || "093.xxx.xxxx"}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-[#3361E0] group-hover:bg-[#3361E0] group-hover:text-white transition-all shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Văn phòng</p>
                <p className="text-[#002D72] font-bold text-sm leading-snug">{contactData?.address || "TP.HCM"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Form (Database Driven) */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-gray-50 relative overflow-hidden">
          {success ? (
            <div className="text-center py-20 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-black text-[#002D72] uppercase mb-2">Gửi Thành Công!</h3>
              <p className="text-gray-400 font-bold">SMAR sẽ liên hệ bạn trong 24h tới.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase ml-1">Họ và Tên</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-4 bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-xl outline-none transition-all text-sm font-bold"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase ml-1">Số điện thoại</label>
                <input 
                  required
                  type="tel" 
                  className="w-full p-4 bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-xl outline-none transition-all text-sm font-bold"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase ml-1">Dịch vụ quan tâm</label>
                <div className="relative">
                  <select 
                    className="w-full p-4 bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-xl outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {/* Dữ liệu SKU đổ từ Database */}
                    {skuData?.skus?.map((sku, idx) => (
                      <option key={idx} value={sku.title}>{sku.title}</option>
                    ))}
                    <option value="Combo">Combo Bán Nhanh</option>
                    <option value="Strategic">Tư vấn chiến lược</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full bg-[#E31B23] hover:bg-red-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-100 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3"
              >
                {loading && <Loader2 className="animate-spin" />}
                Đăng Ký Tư Vấn Ngay
              </button>
              
              <p className="text-[9px] text-center text-gray-400 font-black uppercase tracking-[0.2em] mt-4">
                Thông tin được bảo mật bởi SMAR CRM
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};