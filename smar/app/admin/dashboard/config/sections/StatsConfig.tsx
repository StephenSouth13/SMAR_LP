"use client";

import { 
  DndContext, 
  closestCenter, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Type, 
  Hash, 
  AlignLeft, 
  BarChart3, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  XCircle
} from "lucide-react";
import Image from "next/image";
import { ChangeEvent } from "react";
// Import interfaces chuẩn từ file types
import { StatItem, StatsSection } from "@/types/cms";

const colorOptions = [
  { name: "Xanh SMAR", value: "text-[#004282]" },
  { name: "Đỏ SMAR", value: "text-[#E31B23]" },
  { name: "Vàng Gold", value: "text-yellow-500" },
  { name: "Xanh Lá", value: "text-green-500" },
];

interface SortableStatItemProps {
  stat: StatItem;
  idx: number;
  updateStat: (idx: number, field: keyof StatItem, value: string | boolean) => void;
  removeStat: (idx: number) => void;
}

/* =====================
    COMPONENT CON: SortableStatItem
===================== */
function SortableStatItem({ stat, idx, updateStat, removeStat }: SortableStatItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: stat.id 
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    position: 'relative' as 'relative',
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center gap-6 transition-all ${
        stat.isHidden ? "opacity-40 grayscale bg-gray-50" : "hover:shadow-md"
      } ${isDragging ? "ring-2 ring-blue-400 z-50 scale-[1.02]" : ""}`}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="cursor-grab active:cursor-grabbing p-2 text-gray-300 hover:text-[#002D72]"
      >
        <GripVertical size={20} />
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex justify-between items-center">
            <span>Con số</span>
            <div className="flex gap-1.5">
              {colorOptions.map(c => (
                <button 
                  key={c.value} 
                  title={c.name}
                  type="button"
                  onClick={() => updateStat(idx, 'color', c.value)}
                  className={`w-3.5 h-3.5 rounded-full border ${c.value.replace('text-', 'bg-')} ${
                    stat.color === c.value ? 'ring-2 ring-offset-1 ring-blue-400' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </label>
          <input 
            className={`w-full bg-gray-50 p-3 rounded-xl font-black text-2xl outline-none italic focus:ring-2 ring-blue-100 transition-all ${stat.color || 'text-[#004282]'}`}
            value={stat.value}
            onChange={(e) => updateStat(idx, 'value', e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nhãn mô tả</label>
          <input 
            className="w-full bg-gray-50 p-3 rounded-xl font-bold text-gray-500 outline-none focus:ring-2 ring-blue-100 uppercase text-xs"
            value={stat.label}
            onChange={(e) => updateStat(idx, 'label', e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 border-l border-gray-50 pl-4">
        <button 
          type="button"
          onClick={() => updateStat(idx, 'isHidden', !stat.isHidden)} 
          className={`p-2 rounded-lg transition-colors ${stat.isHidden ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
          title={stat.isHidden ? "Hiện chỉ số" : "Ẩn chỉ số"}
        >
          {stat.isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
        <button 
          type="button"
          onClick={() => removeStat(idx)} 
          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
          title="Xóa"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

interface StatsConfigProps {
  data: StatsSection;
  updateData: (data: StatsSection) => void;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

/* =====================
    COMPONENT CHÍNH: StatsConfig
===================== */
export default function StatsConfig({ data, updateData, onUpload, uploading }: StatsConfigProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = (data.stats || []).findIndex((s) => s.id === active.id);
      const newIndex = (data.stats || []).findIndex((s) => s.id === over.id);
      updateData({ ...data, stats: arrayMove(data.stats, oldIndex, newIndex) });
    }
  };

  const addStat = () => {
    const newStat: StatItem = { 
      id: `s-${Date.now()}`, 
      value: "0", 
      label: "CHỈ SỐ MỚI", 
      color: "text-[#004282]",
      isHidden: false 
    };
    updateData({ ...data, stats: [...(data.stats || []), newStat] });
  };

  const removeImage = () => {
    if (confirm("Bạn có chắc muốn xóa ảnh minh họa này không?")) {
      updateData({ ...data, image_url: null }); // Xóa ảnh minh họa
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* HEADER: Tiêu đề & Media */}
      <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 tracking-widest">
                <BarChart3 size={14} className="text-blue-500" /> Tiêu đề chính
              </label>
              <input 
                className="w-full p-4 bg-gray-50 rounded-xl font-black text-[#004282] uppercase outline-none focus:ring-2 ring-blue-100 italic text-xl"
                value={data.title || ""}
                onChange={(e) => updateData({ ...data, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 tracking-widest">
                <AlignLeft size={14} className="text-gray-400" /> Nội dung dẫn dắt
              </label>
              <textarea 
                className="w-full p-4 bg-gray-50 rounded-xl text-gray-600 font-medium outline-none focus:ring-2 ring-blue-100 leading-relaxed"
                rows={3}
                value={data.description || ""}
                onChange={(e) => updateData({ ...data, description: e.target.value })}
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 tracking-widest">
                <ImageIcon size={14} className="text-purple-500" /> Media minh họa
              </label>
              {data.image_url && (
                <button 
                  type="button"
                  onClick={removeImage}
                  className="text-[10px] font-black text-red-500 flex items-center gap-1 hover:underline transition-all"
                >
                  <XCircle size={12} /> XÓA ẢNH
                </button>
              )}
            </div>
            
            {/* Vùng hiển thị & Upload Media */}
            <div className="aspect-video bg-gray-50 rounded-4xl overflow-hidden border-2 border-dashed border-gray-100 group relative flex items-center justify-center transition-all hover:border-blue-200">
              {data.image_url ? (
                <Image 
                  src={data.image_url} 
                  alt="Stats Preview" 
                  fill 
                  className="object-cover" 
                  unoptimized 
                  priority // Tối ưu LCP
                  loading="eager"
                />
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-2">
                  <ImageIcon size={40} />
                  <span className="text-[10px] font-bold">CHƯA CÓ MEDIA</span>
                </div>
              )}
              <label className="absolute inset-0 bg-[#002D72]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer font-black text-[10px] tracking-widest z-10 gap-2 text-center p-4">
                <Plus size={24} />
                {uploading ? "ĐANG TẢI LÊN..." : "NHẤN ĐỂ UPLOAD ẢNH/VIDEO"}
                <input type="file" className="hidden" onChange={onUpload} accept="image/*,video/*" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* DANH SÁCH CHỈ SỐ: DND Kit Sortable */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Cấu trúc các chỉ số</h3>
          <button 
            type="button"
            onClick={addStat} 
            className="bg-[#004282] text-white px-8 py-4 rounded-2xl font-black text-xs flex items-center gap-2 hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/10 active:scale-95"
          >
            <Plus size={20} /> THÊM CHỈ SỐ
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={(data.stats || []).map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {data.stats?.map((stat, idx) => (
                <SortableStatItem 
                  key={stat.id} 
                  stat={stat} 
                  idx={idx} 
                  updateStat={(i, f, v) => {
                    const newS = [...data.stats];
                    // Fix lỗi any bằng cách ép kiểu an toàn cho keyof StatItem
                    const targetStat = { ...newS[i] };
                    (targetStat as any)[f] = v;
                    newS[i] = targetStat;
                    updateData({ ...data, stats: newS });
                  }}
                  removeStat={(i) => {
                    if (confirm("Bạn có chắc chắn muốn xóa chỉ số này không?")) {
                      updateData({ ...data, stats: data.stats.filter((_, index) => index !== i) });
                    }
                  }}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}