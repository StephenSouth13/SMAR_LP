"use client";
import { Type, AlignLeft, Info, Trash2, Plus, Zap, Smartphone, ShieldCheck } from "lucide-react";

// Map các icon text sang Component thực tế
const IconMap: Record<string, any> = {
  Zap: <Zap className="w-6 h-6 text-yellow-500" />,
  Smartphone: <Smartphone className="w-6 h-6 text-blue-500" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-green-500" />,
};

export default function AboutConfig({ data, updateData }: any) {
  const addReason = () => {
    const newReasons = [...(data.reasons || []), { icon: "Zap", title: "Lý do mới", desc: "Mô tả lý do..." }];
    updateData({ ...data, reasons: newReasons });
  };

  const removeReason = (index: number) => {
    const newReasons = data.reasons.filter((_: any, i: number) => i !== index);
    updateData({ ...data, reasons: newReasons });
  };

  return (
    <div className="space-y-8">
      {/* Header Config */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Type size={14} className="text-blue-500" /> Tiêu đề Section
            </label>
            <input 
              className="w-full p-4 bg-gray-50 rounded-xl font-bold text-[#004282] border-none outline-none focus:ring-2 ring-blue-100"
              value={data.title || ""}
              onChange={(e) => updateData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <AlignLeft size={14} className="text-gray-400" /> Mô tả tổng quát
            </label>
            <textarea 
              className="w-full p-4 bg-gray-50 rounded-xl text-gray-600 border-none outline-none focus:ring-2 ring-blue-100"
              rows={2}
              value={data.description || ""}
              onChange={(e) => updateData({ ...data, description: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Reasons List Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.reasons?.map((item: any, idx: number) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative group">
            <button 
              onClick={() => removeReason(idx)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  {IconMap[item.icon] || <Info size={20} />}
                </div>
                <select 
                  className="bg-transparent text-[10px] font-bold uppercase outline-none"
                  value={item.icon}
                  onChange={(e) => {
                    const newR = [...data.reasons];
                    newR[idx].icon = e.target.value;
                    updateData({ ...data, reasons: newR });
                  }}
                >
                  <option value="Zap">Icon Sét (Vàng)</option>
                  <option value="Smartphone">Icon Điện thoại (Xanh)</option>
                  <option value="ShieldCheck">Icon Khiên (Xanh lá)</option>
                </select>
              </div>

              <input 
                placeholder="Tiêu đề thẻ"
                className="w-full bg-transparent font-bold text-[#002D72] outline-none border-b border-transparent focus:border-blue-100 pb-1"
                value={item.title}
                onChange={(e) => {
                  const newR = [...data.reasons];
                  newR[idx].title = e.target.value;
                  updateData({ ...data, reasons: newR });
                }}
              />
              
              <textarea 
                placeholder="Mô tả thẻ"
                className="w-full bg-transparent text-sm text-gray-500 outline-none border-none resize-none"
                rows={3}
                value={item.desc}
                onChange={(e) => {
                  const newR = [...data.reasons];
                  newR[idx].desc = e.target.value;
                  updateData({ ...data, reasons: newR });
                }}
              />
            </div>
          </div>
        ))}
        
        <button 
          onClick={addReason}
          className="h-full min-h-[200px] border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center text-gray-300 hover:border-blue-200 hover:text-blue-300 transition-all group"
        >
          <Plus size={32} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase mt-2 tracking-widest">Thêm lý do</span>
        </button>
      </div>
    </div>
  );
}