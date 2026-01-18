//D:\Smar\SMAR_LP\smar\app\admin\dashboard\page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, 
  Edit3, 
  PlusSquare, 
  Image as ImageIcon, 
  Users, 
  TrendingUp, 
  Layers 
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ leads: 0, sections: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      // Lấy số lượng khách hàng từ bảng contacts
      const { count: leadCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });
      
      // Lấy số lượng section từ bảng site_content
      const { count: sectionCount } = await supabase
        .from('site_content')
        .select('*', { count: 'exact', head: true });
        
      setStats({ leads: leadCount || 0, sections: sectionCount || 0 });
    };
    fetchStats();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#002D72] uppercase tracking-tighter italic">
            Hệ thống quản trị SMAR 2026
          </h1>
          <p className="text-gray-400 font-medium mt-1">
            Chào mừng trở lại, <span className="text-[#002D72] font-bold">Quách Thành Long</span>
          </p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Hệ thống trực tuyến
          </div>
        </div>
      </div>

      {/* Chỉ số nhanh (Stats Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Leads */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 group hover:border-blue-100 transition-all">
          <div className="flex justify-between items-center mb-6">
            <div className="p-4 bg-blue-50 text-[#004282] rounded-2xl group-hover:scale-110 transition-transform">
              <Users size={28}/>
            </div>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <div className="text-4xl font-black text-[#002D72] tracking-tight">{stats.leads}</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Khách hàng tiềm năng</div>
        </div>

        {/* Card 2: Sections */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 group hover:border-red-100 transition-all">
          <div className="flex justify-between items-center mb-6">
            <div className="p-4 bg-red-50 text-[#E31B23] rounded-2xl group-hover:scale-110 transition-transform">
              <Layers size={28}/>
            </div>
            <span className="text-[10px] font-black text-red-500 bg-red-50 px-3 py-1 rounded-full uppercase">Live</span>
          </div>
          <div className="text-4xl font-black text-[#002D72] tracking-tight">{stats.sections}</div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Section Hoạt động</div>
        </div>

        {/* Card 3: Storage/Media */}
        <div className="bg-[#002D72] p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/20 group transition-all">
          <div className="flex justify-between items-center mb-6">
            <div className="p-4 bg-white/10 text-white rounded-2xl group-hover:rotate-12 transition-transform">
              <ImageIcon size={28}/>
            </div>
          </div>
          <div className="text-4xl font-black text-white tracking-tight">Media</div>
          <div className="text-xs font-bold text-blue-200/60 uppercase tracking-[0.2em] mt-2">Quản lý hình ảnh & Video</div>
        </div>
      </div>

      {/* Quick Actions (Hành động nhanh) */}
      <div className="space-y-6">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest ml-2">Thao tác quản trị</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="group flex flex-col gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:bg-[#004282] hover:text-white transition-all shadow-sm hover:shadow-2xl hover:shadow-blue-900/20">
            <div className="p-3 bg-gray-50 text-[#004282] rounded-xl group-hover:bg-white/10 group-hover:text-white transition-colors w-fit">
              <Edit3 size={24}/>
            </div>
            <div className="text-left">
              <div className="font-black text-lg">Sửa Nội Dung</div>
              <div className="text-xs opacity-60 font-medium mt-1 text-gray-500 group-hover:text-blue-100">Edit Text, Banner, Call to action</div>
            </div>
          </button>

          <button className="group flex flex-col gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:bg-[#E31B23] hover:text-white transition-all shadow-sm hover:shadow-2xl hover:shadow-red-900/20">
            <div className="p-3 bg-gray-50 text-[#E31B23] rounded-xl group-hover:bg-white/10 group-hover:text-white transition-colors w-fit">
              <PlusSquare size={24}/>
            </div>
            <div className="text-left">
              <div className="font-black text-lg">Tạo Section</div>
              <div className="text-xs opacity-60 font-medium mt-1 text-gray-500 group-hover:text-red-100">Thêm phần mới vào Landing Page</div>
            </div>
          </button>

          <button className="group flex flex-col gap-4 p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:border-[#004282] transition-all shadow-sm">
            <div className="p-3 bg-gray-50 text-gray-400 rounded-xl w-fit">
              <LayoutDashboard size={24}/>
            </div>
            <div className="text-left">
              <div className="font-black text-lg text-[#002D72]">Cấu hình SEO</div>
              <div className="text-xs font-medium mt-1 text-gray-400 tracking-tight">Tối ưu từ khóa cho Google</div>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}