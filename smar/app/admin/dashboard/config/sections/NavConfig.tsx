"use client";

import React from "react";
import { Type, Link as LinkIcon, Plus, Trash2, MousePointer2 } from "lucide-react";
import { NavbarSection, CmsSectionProps } from "@/types/cms";

export default function NavConfig({ data, updateData }: CmsSectionProps<NavbarSection>) {
  const d = data || { brandName1: "SM", brandName2: "AR", domainText: "", links: [], ctaText: "Tư vấn ngay" };

  const addLink = () => {
    const next = [...(d.links || []), { label: "Menu mới", href: "#" }];
    updateData({ ...d, links: next });
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      {/* 1. BRANDING */}
      <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
          <Type size={16} className="text-[#002D72]" /> Cấu hình thương hiệu (Logo)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Brand 1 (Xanh)" value={d.brandName1} onChange={(v) => updateData({ ...d, brandName1: v })} />
          <Input label="Brand 2 (Đỏ)" value={d.brandName2} onChange={(v) => updateData({ ...d, brandName2: v })} />
          <Input label="Domain Text" value={d.domainText} onChange={(v) => updateData({ ...d, domainText: v })} />
        </div>
      </div>

      {/* 2. NAVIGATION LINKS */}
      <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
            <LinkIcon size={16} className="text-red-500" /> Các liên kết điều hướng
          </h3>
          <button onClick={addLink} className="p-2 bg-gray-50 text-[#002D72] rounded-xl hover:bg-blue-50 transition-all">
            <Plus size={18} />
          </button>
        </div>
        <div className="space-y-3">
          {d.links?.map((link, i) => (
            <div key={i} className="flex gap-4 items-center group">
              <input 
                className="flex-1 p-3 bg-gray-50 rounded-xl text-xs font-bold outline-none border border-transparent focus:border-blue-100" 
                value={link.label}
                onChange={(e) => {
                  const next = [...d.links];
                  next[i] = { ...next[i], label: e.target.value };
                  updateData({ ...d, links: next });
                }} 
              />
              <input 
                className="flex-1 p-3 bg-gray-50 rounded-xl text-xs font-medium text-gray-400 outline-none border border-transparent focus:border-blue-100" 
                value={link.href}
                onChange={(e) => {
                  const next = [...d.links];
                  next[i] = { ...next[i], href: e.target.value };
                  updateData({ ...d, links: next });
                }} 
              />
              <button 
                onClick={() => updateData({ ...d, links: d.links.filter((_, idx) => idx !== i) })}
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CTA BUTTON */}
      <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
          <MousePointer2 size={16} className="text-green-500" /> Nút kêu gọi hành động (CTA)
        </h3>
        <Input label="Nội dung nút" value={d.ctaText} onChange={(v) => updateData({ ...d, ctaText: v })} />
      </div>
    </div>
  );
}

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">{label}</label>
    <input 
      className="w-full p-3 bg-gray-50 rounded-xl text-xs font-bold text-[#002D72] outline-none border border-transparent focus:border-blue-100 focus:bg-white transition-all" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);