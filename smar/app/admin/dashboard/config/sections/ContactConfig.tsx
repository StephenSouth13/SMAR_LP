"use client";

import Image from "next/image";
import {
  Type, 
  Mail, 
  Phone, 
  MapPin, 
  Image as ImageIcon,
  Video, 
  Plus, 
  Trash2, 
  Lock, 
  MousePointer2, 
  LucideIcon, 
  PlusCircle,
  AlignLeft
} from "lucide-react";
import { ContactSection, CmsSectionProps } from "@/types/cms";

export default function ContactConfig({
  data,
  updateData,
  uploading = false,
  onUpload,
}: CmsSectionProps<ContactSection>) {
  
  const d = data || {};

  return (
    <div className="space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 1. NỘI DUNG DẪN DẮT */}
      <Block title="Nội dung dẫn dắt" icon={Type}>
        <Input
          label="Tiêu đề chính (Section Title)"
          value={d.title || ""}
          onChange={(v) => updateData({ ...d, title: v })}
          highlight
        />
        <Textarea
          label="Mô tả ngắn"
          value={d.description || ""}
          onChange={(v) => updateData({ ...d, description: v })}
        />
      </Block>

      {/* 2. MEDIA THỰC TẾ (UPLOAD ĐỘNG) */}
      <Block title="Hình ảnh / Video văn phòng" icon={ImageIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ảnh văn phòng</label>
            <div className="relative aspect-video bg-gray-50 rounded-3xl overflow-hidden border-2 border-dashed border-gray-100 group flex items-center justify-center">
              {d.office_image_url ? (
                <Image src={d.office_image_url} alt="Office" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-2">
                  <ImageIcon size={32} />
                  <span className="text-[9px] font-bold uppercase">Chưa có ảnh</span>
                </div>
              )}
              <label className="absolute inset-0 bg-[#002D72]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer z-20 gap-2">
                <PlusCircle size={32} />
                <span className="font-black text-[10px] tracking-widest uppercase">{uploading ? "Đang tải..." : "Thay đổi ảnh"}</span>
                <input type="file" className="hidden" onChange={(e) => onUpload?.(e, "office_image_url")} accept="image/*" />
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Video thực tế</label>
            <div className="relative aspect-video bg-gray-50 rounded-3xl overflow-hidden border-2 border-dashed border-gray-100 group flex items-center justify-center">
              {d.office_video_url ? (
                <video src={d.office_video_url} className="w-full h-full object-cover" controls />
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-2">
                  <Video size={32} />
                  <span className="text-[9px] font-bold uppercase">Chưa có video</span>
                </div>
              )}
              <label className="absolute inset-0 bg-[#002D72]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer z-20 gap-2">
                <PlusCircle size={32} />
                <span className="font-black text-[10px] tracking-widest uppercase">{uploading ? "Đang tải..." : "Thay đổi video"}</span>
                <input type="file" className="hidden" onChange={(e) => onUpload?.(e, "office_video_url")} accept="video/*" />
              </label>
            </div>
          </div>
        </div>
      </Block>

      {/* 3. THÔNG TIN LIÊN HỆ */}
      <Block title="Thông tin kết nối" icon={Mail}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input icon={Mail} label="Email nhận tin" value={d.email || ""} onChange={(v) => updateData({ ...d, email: v })} />
          <Input icon={Phone} label="Hotline tư vấn" value={d.phone || ""} onChange={(v) => updateData({ ...d, phone: v })} />
          <Input icon={MapPin} label="Địa chỉ văn phòng" value={d.address || ""} onChange={(v) => updateData({ ...d, address: v })} />
        </div>
      </Block>

      {/* 4. DỊCH VỤ DROPDOWN */}
      <Block title="Danh mục dịch vụ (Dropdown Form)" icon={AlignLeft}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(d.services || []).map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="flex-1 p-3 bg-gray-50 rounded-xl font-bold text-sm outline-none focus:ring-2 ring-blue-100"
                value={s}
                onChange={(e) => {
                  const next = [...(d.services || [])];
                  next[i] = e.target.value;
                  updateData({ ...d, services: next });
                }}
              />
              <button onClick={() => updateData({ ...d, services: d.services?.filter((_, idx) => idx !== i)})} className="p-3 text-gray-300 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => updateData({ ...d, services: [...(d.services || []), ""] })} className="mt-4 flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
          <Plus size={14} /> Thêm dịch vụ mới
        </button>
      </Block>
    </div>
  );
}

/* ---------- UI INTERNAL PARTS (Đã sửa lỗi TypeScript Props) ---------- */
const Block = ({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: React.ReactNode }) => (
  <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-8">
    <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Icon size={18} /></div>
      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">{title}</h3>
    </div>
    <div className="space-y-6">{children}</div>
  </div>
);

const Input = ({ label, value, onChange, icon: Icon, highlight }: { label: string; value: string; onChange: (v: string) => void; icon?: LucideIcon; highlight?: boolean }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 ml-1">
      {Icon && <Icon size={12} className="text-gray-300" />} {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-4 rounded-xl outline-none border border-transparent transition-all focus:ring-4 focus:ring-blue-50 ${
        highlight ? "font-black text-[#E31B23] text-xl bg-gray-50 focus:border-red-100" : "bg-gray-50 font-bold text-[#002D72] focus:border-blue-100"
      }`}
    />
  </div>
);

const Textarea = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">{label}</label>
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-blue-100 focus:ring-4 focus:ring-blue-50 transition-all text-gray-600"
    />
  </div>
);