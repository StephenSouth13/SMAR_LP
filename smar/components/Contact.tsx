"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { supabase } from "@/lib/supabase";
import { ContactSection } from "@/types/cms";

export const Contact = () => {
  const { content, loading: dataLoading } = useContent<ContactSection>("contact");
  
  const [formData, setFormData] = useState({ full_name: "", phone: "", service: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.from("contacts").insert([formData]);

    if (!error) {
      setSuccess(true);
      setFormData({ full_name: "", phone: "", service: "" });
      setTimeout(() => setSuccess(false), 5000);
    }
    setIsSubmitting(false);
  };

  if (dataLoading) return null;

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: DYNAMIC CONTACT INFO */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black text-[#E31B23] leading-tight italic uppercase tracking-tighter">
              {content?.title || "BÙNG NỔ 2026?"}
            </h2>
            <p className="text-[#002D72]/40 text-lg md:text-xl font-medium max-w-md leading-relaxed">
              {content?.description || "Để lại thông tin, đội ngũ SMAR sẽ liên hệ tư vấn trực tiếp."}
            </p>
          </div>

          <div className="space-y-6">
            <ContactItem icon={Mail} label="Email" value={content?.email} />
            <ContactItem icon={Phone} label="Hotline" value={content?.phone} />
            <ContactItem icon={MapPin} label="Văn phòng" value={content?.address} />
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-gray-50 relative">
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
              <FormField label="Họ và Tên" placeholder="Ví dụ: Nguyễn Văn A">
                <input 
                  required
                  type="text" 
                  className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:bg-white focus:ring-2 ring-blue-100 transition-all text-sm font-bold"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </FormField>

              <FormField label="Số điện thoại" placeholder="090xxxxxxx">
                <input 
                  required
                  type="tel" 
                  className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:bg-white focus:ring-2 ring-blue-100 transition-all text-sm font-bold"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </FormField>

              <FormField label="Dịch vụ quan tâm">
                <div className="relative">
                  <select 
                    required
                    className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:bg-white focus:ring-2 ring-blue-100 transition-all text-sm font-bold appearance-none cursor-pointer"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {content?.services?.map((s, i) => (
                      <option key={i} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">▼</div>
                </div>
              </FormField>

              <button 
                disabled={isSubmitting}
                className="w-full bg-[#E31B23] hover:bg-red-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-100 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : content?.cta_label || "Đăng Ký Ngay"}
              </button>
              
              <p className="text-[9px] text-center text-gray-400 font-black uppercase tracking-[0.2em] mt-4">
                {content?.privacy_note || "Cam kết bảo mật 100%"}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* --- MINI COMPONENTS --- */
const ContactItem = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-6 group">
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-[#3361E0] group-hover:bg-[#3361E0] group-hover:text-white transition-all shadow-sm">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-[#002D72] font-bold">{value || "Đang cập nhật..."}</p>
    </div>
  </div>
);

const FormField = ({ label, children }: any) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black text-gray-400 uppercase ml-1">{label}</label>
    {children}
  </div>
);