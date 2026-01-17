"use client";

import { 
  Upload, 
  Type, 
  Plus, 
  Trash2, 
  Sparkles, 
  Target, 
  MousePointer2, 
  AlignLeft, 
  RefreshCw 
} from "lucide-react";
import Image from "next/image";
import { HeroSection, CmsSectionProps } from "@/types/cms";

/**
 * HeroConfig - Component quản lý nội dung Hero Section
 * Đảm bảo Type-safe 100% không dùng any
 */
export default function HeroConfig({ 
  data, 
  updateData, 
  onUpload, 
  uploading = false 
}: CmsSectionProps<HeroSection>) {
  
  // Đảm bảo dữ liệu luôn tồn tại để tránh lỗi uncontrolled input
  const d = data || { buttons: [] };

  const addBtn = () => {
    const newBtns = [...(d.buttons || []), { label: "Nút mới", href: "#", primary: false }];
    updateData({ ...d, buttons: newBtns });
  };

  const removeBtn = (index: number) => {
    const newBtns = (d.buttons || []).filter((_, i) => i !== index);
    updateData({ ...d, buttons: newBtns });
  };

  const updateBtn = (index: number, field: "label" | "href", value: string) => {
    const newBtns = [...(d.buttons || [])];
    newBtns[index] = { ...newBtns[index], [field]: value };
    updateData({ ...d, buttons: newBtns });
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 animate-in fade-in duration-700">
      {/* CỘT TRÁI: TEXT & BUTTONS */}
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
          <div className="space-y-6">
            {/* BADGE */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Sparkles size={14} className="text-red-500" /> Nhãn (Badge)
              </label>
              <input 
                className="w-full p-4 bg-gray-50 rounded-xl font-bold text-red-500 border-none outline-none focus:ring-2 ring-red-100 transition-all"
                value={d.badge || ""}
                onChange={(e) => updateData({ ...d, badge: e.target.value })}
                placeholder="Ví dụ: CHIẾN LƯỢC 2026"
              />
            </div>

            {/* TITLE */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <Type size={14} className="text-blue-500" /> Tiêu đề chính
              </label>
              <textarea 
                className="w-full p-5 bg-gray-50 rounded-2xl font-black text-3xl text-[#004282] border-none outline-none focus:ring-2 ring-blue-100 leading-tight"
                rows={3}
                value={d.title || ""}
                onChange={(e) => updateData({ ...d, title: e.target.value })}
                placeholder="Nhập tiêu đề lớn..."
              />
            </div>
        
            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <AlignLeft size={14} className="text-gray-400" /> Mô tả (Small Content)
              </label>
              <textarea 
                className="w-full p-5 bg-gray-50 rounded-2xl text-gray-600 font-medium leading-relaxed border-none outline-none focus:ring-2 ring-blue-100"
                rows={4}
                value={d.description || ""}
                onChange={(e) => updateData({ ...d, description: e.target.value })}
                placeholder="Nhập nội dung dẫn dắt ngắn..."
              />
            </div>
          </div>

          {/* BUTTON MANAGEMENT */}
          <div className="pt-8 border-t border-gray-50 space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                <MousePointer2 size={14} /> Quản lý Nút bấm
              </label>
              <button 
                onClick={addBtn} 
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Plus size={14} /> THÊM NÚT
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {d.buttons?.map((btn, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-50/50 p-5 rounded-3xl border border-gray-100 group transition-all hover:bg-white hover:shadow-md">
                  <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <input 
                      placeholder="Tên nút"
                      className="bg-white p-3 rounded-xl text-xs font-bold outline-none border border-gray-100 focus:border-blue-200"
                      value={btn.label}
                      onChange={(e) => updateBtn(idx, "label", e.target.value)}
                    />
                    <input 
                      placeholder="Link trỏ đến"
                      className="bg-white p-3 rounded-xl text-xs outline-none border border-gray-100 focus:border-blue-200"
                      value={btn.href}
                      onChange={(e) => updateBtn(idx, "href", e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => removeBtn(idx)} 
                    className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: MEDIA & TARGET */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Media (Hero Image)</label>
            <div className="relative aspect-square bg-gray-50 rounded-4xl overflow-hidden border-2 border-dashed border-gray-200 group flex items-center justify-center">
              {d.image_url ? (
                <Image 
                  src={d.image_url} 
                  alt="Hero Preview" 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105 duration-500"
                />
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-2">
                  <Upload size={48} />
                  <span className="text-[10px] font-black uppercase">Chưa có media</span>
                </div>
              )}
              
              {/* Overlay Upload */}
              <label className="absolute inset-0 bg-[#002D72]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer z-20 gap-3">
                {uploading ? <RefreshCw className="animate-spin" size={32} /> : <Upload size={32} />}
                <span className="font-black text-[10px] tracking-[0.2em] uppercase">
                  {uploading ? "Đang tải lên..." : "Upload hình ảnh"}
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => onUpload?.(e, "image_url")} 
                  accept="image/*" 
                />
              </label>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
              <Target size={14} className="text-red-500" /> Doanh thu 2026
            </label>
            <input 
              className="w-full p-5 bg-gray-50 rounded-2xl font-black text-2xl text-[#002D72] outline-none border-none focus:ring-2 ring-blue-100 transition-all"
              value={d.revenue_target || ""}
              onChange={(e) => updateData({ ...d, revenue_target: e.target.value })}
              placeholder="Ví dụ: 100 Tỷ"
            />
          </div>
        </div>
      </div>
    </div>
  );
}