"use client";

import { useEffect, useState, useCallback } from "react"; // Thêm useCallback
import { supabase } from "@/lib/supabase";
import { 
  User, 
  Phone, 
  Tag, 
  Calendar, 
  Search, 
  Loader2,
  Inbox,
  ArrowRight
} from "lucide-react";

interface ContactLead {
  id: string;
  full_name: string;
  phone: string;
  service: string;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Sử dụng useCallback để đóng gói hàm fetch dữ liệu
  // Điều này ngăn chặn hàm bị tạo lại vô tận và an toàn khi dùng trong useEffect
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Lỗi truy xuất leads:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. useEffect gọi fetchLeads một cách an toàn
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // 3. Logic filter được giữ nguyên (tối ưu hóa bộ nhớ)
  const filteredLeads = leads.filter(l => 
    l.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.phone.includes(searchTerm)
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-[#002D72] mb-4" size={40} />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Đang truy xuất danh sách khách hàng...</p>
    </div>
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-[#002D72] uppercase italic leading-none">
            Khách hàng liên hệ
          </h2>
          <p className="text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase mt-2">
            Quản trị Data đổ về từ Landing Page
          </p>
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#E31B23] transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Tìm theo tên hoặc số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* DANH SÁCH LEADS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <div 
            key={lead.id} 
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 group-hover:bg-red-50 transition-colors duration-500" />

            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-[#002D72] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                  {lead.full_name.charAt(0)}
                </div>
                <div className="text-[9px] font-black text-gray-400 uppercase flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(lead.created_at).toLocaleDateString('vi-VN')}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-gray-400" />
                  <span className="font-black text-[#002D72] text-lg">{lead.full_name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400" />
                  <a href={`tel:${lead.phone}`} className="font-bold text-gray-600 hover:text-[#E31B23] transition-colors">
                    {lead.phone}
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-dashed border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[#E31B23]" />
                  <span className="text-[10px] font-black uppercase text-[#E31B23] tracking-widest">
                    {lead.service || "Tư vấn chung"}
                  </span>
                </div>
                <button className="text-gray-300 hover:text-[#002D72] transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredLeads.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <Inbox className="text-gray-200 mb-4" size={60} />
          <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Không tìm thấy khách hàng nào</p>
        </div>
      )}
    </div>
  );
}