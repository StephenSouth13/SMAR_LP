"use client";
import { Upload, Type, Plus, Trash2, Sparkles, Target, MousePointer2, AlignLeft, RefreshCw } from "lucide-react";
import Image from "next/image";
import { ChangeEvent } from "react";

interface HeroButton {
  label: string;
  href: string;
  primary: boolean;
}

interface HeroData {
  badge?: string;
  title?: string;
  description?: string;
  image_url?: string;
  revenue_target?: string;
  buttons?: HeroButton[];
}

interface HeroConfigProps {
  data: HeroData;
  updateData: (val: HeroData) => void;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

export default function HeroConfig({ data, updateData, onUpload, uploading }: HeroConfigProps) {
  const addBtn = () => {
    const newBtns = [...(data.buttons || []), { label: "Nút mới", href: "#", primary: false }];
    updateData({ ...data, buttons: newBtns });
  };

  const removeBtn = (index: number) => {
    const newBtns = (data.buttons || []).filter((_, i) => i !== index);
    updateData({ ...data, buttons: newBtns });
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={14} className="text-red-500" /> Nhãn (Badge)
              </label>
              <input 
                className="w-full p-4 bg-gray-50 rounded-xl font-bold text-red-500 border-none outline-none focus:ring-2 ring-red-100 transition-all"
                value={data.badge || ""}
                onChange={(e) => updateData({ ...data, badge: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Type size={14} className="text-blue-500" /> Tiêu đề chính
              </label>
              <textarea 
                className="w-full p-5 bg-gray-50 rounded-2xl font-black text-3xl text-[#004282] border-none outline-none focus:ring-2 ring-blue-100 leading-tight"
                rows={3}
                value={data.title || ""}
                onChange={(e) => updateData({ ...data, title: e.target.value })}
              />
            </div>
        
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <AlignLeft size={14} className="text-gray-400" /> Mô tả (Small Content)
              </label>
              <textarea 
                className="w-full p-5 bg-gray-50 rounded-2xl text-gray-600 font-medium leading-relaxed border-none outline-none focus:ring-2 ring-blue-100"
                rows={4}
                value={data.description || ""}
                onChange={(e) => updateData({ ...data, description: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <MousePointer2 size={14} /> Quản lý Nút bấm
              </label>
              <button onClick={addBtn} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                <Plus size={14} /> THÊM NÚT
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {data.buttons?.map((btn, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-50/50 p-5 rounded-3xl border border-gray-100 group transition-all hover:bg-white hover:shadow-md">
                  <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <input 
                      placeholder="Tên nút"
                      className="bg-white p-3 rounded-xl text-xs font-bold outline-none border border-gray-100 focus:border-blue-200"
                      value={btn.label}
                      onChange={(e) => {
                        const newBtns = [...(data.buttons || [])];
                        newBtns[idx].label = e.target.value;
                        updateData({ ...data, buttons: newBtns });
                      }}
                    />
                    <input 
                      placeholder="Link trỏ đến"
                      className="bg-white p-3 rounded-xl text-xs outline-none border border-gray-100 focus:border-blue-200"
                      value={btn.href}
                      onChange={(e) => {
                        const newBtns = [...(data.buttons || [])];
                        newBtns[idx].href = e.target.value;
                        updateData({ ...data, buttons: newBtns });
                      }}
                    />
                  </div>
                  <button onClick={() => removeBtn(idx)} className="text-gray-300 hover:text-red-500 p-2 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Media</label>
            <div className="aspect-video bg-gray-50 rounded-4xl overflow-hidden border-2 border-dashed border-gray-200 group relative flex items-center justify-center">
              {data.image_url ? (
                <Image src={data.image_url} alt="Preview" fill className="object-cover" unoptimized />
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-2">
                  <Upload size={48} />
                  <span className="text-[10px] font-black uppercase">Chưa có media</span>
                </div>
              )}
              <label className="absolute inset-0 bg-[#002D72]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer font-black text-[10px] tracking-[0.2em] gap-3 z-10">
                {uploading ? <RefreshCw className="animate-spin" size={32} /> : <Upload size={32} />}
                {uploading ? "ĐANG TẢI LÊN..." : "UPLOAD TỪ MÁY TÍNH"}
                <input type="file" className="hidden" onChange={onUpload} accept="image/*,video/*" />
              </label>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Target size={14} className="text-red-500" /> Doanh thu 2026
            </label>
            <input 
              className="w-full p-5 bg-gray-50 rounded-2xl font-black text-2xl text-[#002D72] outline-none border-none focus:ring-2 ring-blue-100 transition-all"
              value={data.revenue_target || ""}
              onChange={(e) => updateData({ ...data, revenue_target: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}