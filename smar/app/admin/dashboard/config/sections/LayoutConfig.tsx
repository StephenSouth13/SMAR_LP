"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Eye, EyeOff, LayoutTemplate, RefreshCw } from "lucide-react";
import {  CmsSectionProps, LayoutSection } from "@/types/cms";

// 1. Bộ khung mặc định cho dự án SMAR
const DEFAULT_SMAR_LAYOUT: LayoutSection[] = [
  { id: "h1", type: "hero", enabled: true },
  { id: "a1", type: "about", enabled: true },
  { id: "p1", type: "sku", enabled: true },
  { id: "s1", type: "stats", enabled: true },
  { id: "t1", type: "testimonials", enabled: true },
  { id: "c1", type: "contact", enabled: true },
];

export default function LayoutConfig({ data, updateData }: CmsSectionProps<LayoutSection[]>) {
  // 2. Khởi tạo state: Phải nằm TRONG hàm LayoutConfig
  const [localLayout, setLocalLayout] = useState<LayoutSection[]>(() => {
    if (Array.isArray(data) && data.length > 0) {
      const filtered = data.filter(item => item.type !== "navbar" && item.type !== "footer");
      return filtered.length > 0 ? (filtered as LayoutSection[]) : DEFAULT_SMAR_LAYOUT;
    }
    return DEFAULT_SMAR_LAYOUT;
  });

  const [hasMounted, setHasMounted] = useState(false);

  // 3. Tránh lỗi Hydration cho DragDropContext
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 4. Đồng bộ dữ liệu từ database khi data thay đổi
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filtered = data.filter(item => item.type !== "navbar" && item.type !== "footer");
      
      // Chỉ tự động nạp nếu state hiện tại đang trống
      if (filtered.length > 0 && localLayout.length === 0) {
        const timer = setTimeout(() => {
          setLocalLayout(filtered as LayoutSection[]);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [data, localLayout.length]);

  // 5. Hàm xử lý cập nhật
  const handleUpdate = (newList: LayoutSection[]) => {
    setLocalLayout(newList);
    updateData(newList);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(localLayout);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    handleUpdate(items);
  };

  const toggleStatus = (id: string) => {
    const next = localLayout.map((item) =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    );
    handleUpdate(next);
  };

  // Render Skeleton khi chưa mount xong
  if (!hasMounted) {
    return (
      <div className="p-20 border-2 border-dashed border-gray-100 rounded-4xl flex flex-col items-center gap-4 bg-gray-50/30">
        <RefreshCw className="animate-spin text-blue-200" size={32} />
        <p className="text-gray-400 font-medium animate-pulse text-sm">Đang tải bố cục hệ thống...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-blue-50/50 p-8 rounded-4xl border border-blue-100/50 flex items-center gap-5">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
          <LayoutTemplate size={28} />
        </div>
        <div>
          <h3 className="font-black text-[#002D72] text-base uppercase tracking-tight italic">
            Cấu trúc Landing Page
          </h3>
          <p className="text-xs text-blue-500/60 font-semibold tracking-wide">
            Kéo thả để sắp xếp thứ tự các Section (Đã lọc Navbar/Footer).
          </p>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="landing-layout">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {localLayout.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`group flex items-center justify-between p-6 bg-white border rounded-4xl transition-all duration-300 ${
                        snapshot.isDragging 
                        ? "shadow-2xl border-blue-600 rotate-1 scale-[1.02] z-50 ring-4 ring-blue-50" 
                        : "border-gray-100 shadow-sm hover:border-blue-200"
                      } ${!section.enabled ? "opacity-50 grayscale bg-gray-50/50" : ""}`}
                    >
                      <div className="flex items-center gap-5">
                        <div 
                          {...provided.dragHandleProps} 
                          className="text-gray-300 group-hover:text-blue-400 cursor-grab active:cursor-grabbing p-2 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                          <GripVertical size={24} />
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">
                            Section Type
                          </p>
                          <h4 className="font-black text-[#002D72] uppercase tracking-wider text-sm">
                            {section.type}
                          </h4>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleStatus(section.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          section.enabled 
                          ? "bg-green-50 text-green-600 hover:bg-green-100 border border-green-100" 
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200 border border-gray-200"
                        }`}
                      >
                        {section.enabled ? (
                          <><Eye size={14} className="stroke-[3px]" /> Hiển thị</>
                        ) : (
                          <><EyeOff size={14} className="stroke-[3px]" /> Đã ẩn</>
                        )}
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {localLayout.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200">
           <p className="text-gray-400 text-sm">Chưa có thành phần nào được cấu hình.</p>
        </div>
      )}
    </div>
  );
}