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
  AlignLeft, 
  BarChart3, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  XCircle,
  RefreshCw
} from "lucide-react";
import Image from "next/image";
import { ChangeEvent } from "react";
import { StatItem, StatsSection, CmsSectionProps } from "@/types/cms";

const colorOptions = [
  { name: "Xanh SMAR", value: "text-[#004282]" },
  { name: "Đỏ SMAR", value: "text-[#E31B23]" },
  { name: "Vàng Gold", value: "text-yellow-500" },
  { name: "Xanh Lá", value: "text-green-500" },
];

/* =====================================================
    COMPONENT CON: SortableStatItem
===================== ================================ */
interface SortableStatItemProps {
  stat: StatItem;
  idx: number;
  // SỬA: Dùng Generic K để đảm bảo Type-safe thay vì dùng any
  updateStat: <K extends keyof StatItem>(idx: number, field: K, value: StatItem[K]) => void;
  removeStat: (idx: number) => void;
}

function SortableStatItem({ stat, idx, updateStat, removeStat }: SortableStatItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: stat.id 
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    position: 'relative' as const,
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

/* =====================================================
    COMPONENT CHÍNH: StatsConfig
===================================================== */
export default function StatsConfig({ 
  data, 
  updateData, 
  onUpload, 
  uploading = false 
}: CmsSectionProps<StatsSection>) {
  const sensors = useSensors(useSensor(PointerSensor));
  const d = data || { title: "", description: "", stats: [], image_url: null };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = (d.stats || []).findIndex((s) => s.id === active.id);
      const newIndex = (d.stats || []).findIndex((s) => s.id === over.id);
      updateData({ ...d, stats: arrayMove(d.stats, oldIndex, newIndex) });
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
    updateData({ ...d, stats: [...(d.stats || []), newStat] });
  };

  const removeImage = () => {
    if (confirm("Bạn có chắc muốn xóa ảnh minh họa này không?")) {
      updateData({ ...d, image_url: null });
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 tracking-widest">
                <BarChart3 size={14} className="text-blue-500" /> Tiêu đề chính
              </label>
              <input 
                className="w-full p-4 bg-gray-50 rounded-xl font-black text-[#004282] uppercase outline-none focus:ring-2 ring-blue-100 italic text-xl"
                value={d.title || ""}
                onChange={(e) => updateData({ ...d, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 tracking-widest">
                <AlignLeft size={14} className="text-gray-400" /> Nội dung dẫn dắt
              </label>
              <textarea 
                className="w-full p-4 bg-gray-50 rounded-xl text-gray-600 font-medium outline-none focus:ring-2 ring-blue-100 leading-relaxed"
                rows={3}
                value={d.description || ""}
                onChange={(e) => updateData({ ...d, description: e.target.value })}
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 tracking-widest">
                <ImageIcon size={14} className="text-purple-500" /> Media minh họa
              </label>
              {d.image_url && (
                <button 
                  type="button"
                  onClick={removeImage}
                  className="text-[10px] font-black text-red-500 flex items-center gap-1 hover:underline transition-all"
                >
                  <XCircle size={12} /> XÓA ẢNH
                </button>
              )}
            </div>
            
            <div className="relative aspect-video bg-gray-50 rounded-4xl overflow-hidden border-2 border-dashed border-gray-100 group flex items-center justify-center transition-all hover:border-blue-200">
              {d.image_url ? (
                <Image 
                  src={d.image_url} 
                  alt="Stats Preview" 
                  fill 
                  className="object-cover" 
                />
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-2">
                  <ImageIcon size={40} />
                  <span className="text-[10px] font-bold">CHƯA CÓ MEDIA</span>
                </div>
              )}
              <label className="absolute inset-0 bg-[#002D72]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer font-black text-[10px] tracking-widest z-10 gap-2 text-center p-4">
                {uploading ? <RefreshCw className="animate-spin" size={24} /> : <Plus size={24} />}
                {uploading ? "ĐANG TẢI LÊN..." : "NHẤN ĐỂ UPLOAD ẢNH"}
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => onUpload?.(e, "image_url")} 
                  accept="image/*" 
                />
              </label>
            </div>
          </div>
        </div>
      </div>

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
          <SortableContext items={(d.stats || []).map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {(d.stats || []).map((stat, idx) => (
                <SortableStatItem 
                  key={stat.id} 
                  stat={stat} 
                  idx={idx} 
                  // FIX LỖI: Sử dụng Generic K thay cho any để khớp Type 100%
                  updateStat={<K extends keyof StatItem>(i: number, f: K, v: StatItem[K]) => {
                    const newS = [...d.stats];
                    newS[i] = { ...newS[i], [f]: v };
                    updateData({ ...d, stats: newS });
                  }}
                  removeStat={(i) => {
                    if (confirm("Bạn có chắc chắn muốn xóa chỉ số này không?")) {
                      updateData({ ...d, stats: d.stats.filter((_, index) => index !== i) });
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