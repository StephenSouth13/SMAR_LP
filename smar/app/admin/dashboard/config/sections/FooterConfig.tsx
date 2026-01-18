"use client";

import React from "react";
import Image from "next/image";
import { 
  Linkedin, 
  Facebook, 
  Globe, 
  Instagram, 
  Youtube, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  PlusCircle,
  RefreshCw,
  Type,
  LucideIcon // Thêm import này
} from "lucide-react";
import { FooterSection, CmsSectionProps } from "@/types/cms";

export default function FooterConfig({ 
  data, 
  updateData, 
  onUpload, 
  uploading = false 
}: CmsSectionProps<FooterSection>) {
  
  const d: FooterSection = data || { 
    socials: {}, 
    sub_links: [],
    description: "",
    logo_url: "" 
  };

  const addLink = () => {
    const next = [...(d.sub_links || []), { label: "Liên kết mới", href: "#" }];
    updateData({ ...d, sub_links: next });
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      
      <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-8">
        <h3 className="text-xs font-black uppercase text-gray-400 flex items-center gap-2 tracking-widest">
          <Type size={16} className="text-[#004282]" /> Branding chân trang
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Logo Footer</label>
            <div className="relative h-32 w-full bg-gray-50 rounded-3xl overflow-hidden border-2 border-dashed border-gray-100 group flex items-center justify-center">
              {d.logo_url ? (
                <Image 
                  src={d.logo_url} 
                  alt="Footer Logo" 
                  fill 
                  className="object-contain p-4" 
                  sizes="200px"
                />
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-2">
                  <ImageIcon size={24} />
                  <span className="text-[9px] font-bold uppercase tracking-tighter">Chưa có Logo</span>
                </div>
              )}
              <label className="absolute inset-0 bg-[#004282]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer z-20 gap-2">
                {uploading ? <RefreshCw size={24} className="animate-spin" /> : <PlusCircle size={24} />}
                <span className="font-black text-[10px] tracking-widest uppercase text-center p-2">
                  {uploading ? "Đang tải..." : "Thay đổi Logo"}
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => onUpload?.(e, "logo_url")} // Xóa 'as any'
                  accept="image/*" 
                />
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mô tả Agency</label>
            <textarea 
              className="w-full p-4 bg-gray-50 rounded-3xl text-xs font-medium text-gray-600 outline-none focus:ring-2 ring-blue-50 h-32 resize-none"
              placeholder="Strategic Marketing & Research Agency..."
              value={d.description || ""}
              onChange={(e) => updateData({ ...d, description: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-xs font-black uppercase text-gray-400 flex items-center gap-2 tracking-widest">
          <Globe size={16} className="text-blue-600" /> Hệ thống mạng xã hội
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SocialInput 
            icon={Linkedin} 
            label="LinkedIn" 
            value={d.socials?.linkedin || ""} 
            onChange={(v) => updateData({ ...d, socials: { ...d.socials, linkedin: v } })} 
          />
          <SocialInput 
            icon={Facebook} 
            label="Facebook" 
            value={d.socials?.facebook || ""} 
            onChange={(v) => updateData({ ...d, socials: { ...d.socials, facebook: v } })} 
          />
          <SocialInput 
            icon={Instagram} 
            label="Instagram" 
            value={d.socials?.instagram || ""} 
            onChange={(v) => updateData({ ...d, socials: { ...d.socials, instagram: v } })} 
          />
          <SocialInput 
            icon={Youtube} 
            label="YouTube" 
            value={d.socials?.youtube || ""} 
            onChange={(v) => updateData({ ...d, socials: { ...d.socials, youtube: v } })} 
          />
          <SocialInput 
            icon={Globe} 
            label="Website" 
            value={d.socials?.website || ""} 
            onChange={(v) => updateData({ ...d, socials: { ...d.socials, website: v } })} 
          />
        </div>
      </div>

      <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black uppercase text-gray-400 flex items-center gap-2 tracking-widest">
            <LinkIcon size={16} className="text-red-500" /> Chính sách & Điều khoản
          </h3>
          <button onClick={addLink} className="p-2 bg-gray-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all active:scale-95">
            <Plus size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(d.sub_links || []).map((link, i) => (
            <div key={i} className="flex gap-3 items-center bg-gray-50/50 p-2 rounded-2xl border border-gray-50 group">
              <input 
                className="flex-1 p-2 bg-transparent text-xs font-black text-[#002D72] outline-none" 
                value={link.label}
                onChange={(e) => {
                  const next = [...(d.sub_links || [])];
                  next[i] = { ...next[i], label: e.target.value };
                  updateData({ ...d, sub_links: next });
                }} 
              />
              <input 
                className="flex-1 p-2 bg-transparent text-[10px] font-bold text-gray-400 outline-none" 
                value={link.href}
                onChange={(e) => {
                  const next = [...(d.sub_links || [])];
                  next[i] = { ...next[i], href: e.target.value };
                  updateData({ ...d, sub_links: next });
                }} 
              />
              <button 
                onClick={() => updateData({ ...d, sub_links: d.sub_links?.filter((_, idx) => idx !== i) || [] })}
                className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. Sử dụng LucideIcon thay cho any để xóa lỗi ESLint
interface SocialInputProps {
  icon: LucideIcon;
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const SocialInput = ({ icon: Icon, label, value, onChange }: SocialInputProps) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 ml-1 tracking-tighter">
      <Icon size={12} className="text-gray-300" /> {label}
    </label>
    <input 
      className="w-full p-3 bg-gray-50 rounded-2xl text-xs font-bold text-[#002D72] outline-none border border-transparent focus:border-blue-100 focus:bg-white transition-all" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder="https://..." 
    />
  </div>
);