/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Type,
  CheckCircle2,
  Trash2,
  Plus,
  Zap,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react";
import { SKUSection, SKUItem, CmsSectionProps } from "@/types/cms";
import { IconName } from "@/lib/iconRegistry"; // Import IconName chuẩn

/* =====================
    SORTABLE ITEM COMPONENT
===================== */
interface SortableSkuItemProps {
  sku: SKUItem;
  idx: number;
  // Sử dụng Generic K để ép kiểu chính xác giá trị theo key của SKUItem
  updateSku: <K extends keyof SKUItem>(idx: number, field: K, value: SKUItem[K]) => void;
  removeSku: (idx: number) => void;
  addFeature: (idx: number) => void;
  removeFeature: (skuIdx: number, fIdx: number) => void;
}

function SortableSkuItem({ sku, idx, updateSku, removeSku, addFeature, removeFeature }: SortableSkuItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: sku.id || `sku-${idx}` 
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
      className={`bg-white p-8 rounded-[2.5rem] border-2 transition-all group ${
        isDragging ? "shadow-2xl ring-2 ring-blue-400" : ""
      } ${
        sku.isHidden ? "opacity-50 grayscale" : ""
      } ${
        sku.isBestSeller ? "border-red-500 shadow-xl shadow-red-50" : "border-gray-50 shadow-sm"
      }`}
    >
      <div className="flex flex-wrap gap-8">
        <div {...attributes} {...listeners} className="absolute left-3 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-2 text-gray-300 hover:text-blue-500 transition-colors">
          <GripVertical size={24} />
        </div>

        <div className="flex-1 min-w-75 space-y-6 ml-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${sku.isBestSeller ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                <Box size={20} />
              </div>
              <div className="flex-1 space-y-2">
                <input
                  className="w-full font-black text-xl text-gray-900 bg-transparent outline-none border-b border-gray-100 focus:border-blue-200"
                  value={sku.title}
                  onChange={(e) => updateSku(idx, "title", e.target.value)}
                />
                <input
                  className="w-full text-xs text-gray-400 bg-transparent outline-none"
                  value={sku.subtitle}
                  onChange={(e) => updateSku(idx, "subtitle", e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => updateSku(idx, "isHidden", !sku.isHidden)}
                className={`p-2 rounded-lg transition-colors ${sku.isHidden ? "bg-gray-100 text-gray-400" : "bg-blue-50 text-blue-600"}`}
              >
                {sku.isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button onClick={() => removeSku(idx)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase">Giá</label>
              <input
                className="w-full p-3 bg-gray-50 rounded-xl font-black text-[#004282] outline-none"
                value={sku.price}
                onChange={(e) => updateSku(idx, "price", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-400 uppercase">Tag</label>
              <input
                className="w-full p-3 bg-gray-50 rounded-xl font-bold text-gray-400 text-xs outline-none uppercase"
                value={sku.tag}
                onChange={(e) => updateSku(idx, "tag", e.target.value)}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-red-600"
              checked={sku.isBestSeller}
              onChange={(e) => updateSku(idx, "isBestSeller", e.target.checked)}
            />
            <span className={`text-[10px] font-black uppercase ${sku.isBestSeller ? "text-red-500" : "text-gray-400"}`}>
              Best Seller Mode
            </span>
          </label>
        </div>

        <div className="w-full lg:w-100 bg-gray-50/50 p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" /> Tính năng
            </label>
            <button onClick={() => addFeature(idx)} className="p-1 hover:bg-green-100 rounded-lg text-green-600">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {(sku.features || []).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-center gap-2">
                <input
                  className="flex-1 bg-white p-2 rounded-xl text-xs outline-none"
                  value={feat}
                  onChange={(e) => {
                    const newF = [...sku.features];
                    newF[fIdx] = e.target.value;
                    updateSku(idx, "features", newF);
                  }}
                />
                <button onClick={() => removeFeature(idx, fIdx)} className="text-gray-300 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================
    MAIN CONFIG COMPONENT
===================== */
export default function ProductsConfig({ data, updateData }: CmsSectionProps<SKUSection>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = (data.skus || []).findIndex((s, i) => (s.id || `sku-${i}`) === active.id);
      const newIndex = (data.skus || []).findIndex((s, i) => (s.id || `sku-${i}`) === over.id);
      const newSkus = arrayMove(data.skus || [], oldIndex, newIndex);
      updateData({ ...data, skus: newSkus });
    }
  };

  const addSku = () => {
    const newSku: SKUItem = {
      id: `sku-${Date.now()}`,
      title: "Gói mới",
      subtitle: "Mô tả",
      price: "0 đ",
      tag: "NEW",
      icon: "box", // Khớp với trường icon: string trong file của bạn
      icon_name: "box" as IconName, // Khớp với trường icon_name: IconName
      isBestSeller: false,
      isHidden: false,
      features: ["Tính năng 1"]
    };
    updateData({ ...data, skus: [...(data.skus ?? []), newSku] });
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="space-y-6 flex-1 mr-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Type size={14} className="text-blue-500" /> Tiêu đề hệ sinh thái
            </label>
            <input
              className="w-full p-4 bg-gray-50 rounded-xl font-black text-[#004282] outline-none"
              value={data.title ?? ""}
              onChange={(e) => updateData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mô tả phụ</label>
            <input
              className="w-full p-4 bg-gray-50 rounded-xl text-gray-500 outline-none"
              value={data.subtitle ?? ""}
              onChange={(e) => updateData({ ...data, subtitle: e.target.value })}
            />
          </div>
        </div>
        <button 
          onClick={addSku}
          className="bg-[#004282] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg"
        >
          <Plus size={20} /> THÊM SKU
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={(data.skus || []).map((s, i) => s.id || `sku-${i}`)} strategy={verticalListSortingStrategy}>
          <div className="space-y-6">
            {(data.skus || []).map((sku, idx) => (
              <SortableSkuItem 
                key={sku.id || `sku-${idx}`} 
                sku={sku} 
                idx={idx} 
                updateSku={<K extends keyof SKUItem>(index: number, field: K, value: SKUItem[K]) => {
                  const newSkus = [...(data.skus || [])];
                  if (field === "isBestSeller" && value === true) {
                    newSkus.forEach((s, i) => newSkus[i] = { ...s, isBestSeller: i === index });
                  } else {
                    newSkus[index] = { ...newSkus[index], [field]: value };
                  }
                  updateData({ ...data, skus: newSkus });
                }}
                removeSku={(index) => {
                  if (confirm("Xóa gói này?")) {
                    const newSkus = (data.skus || []).filter((_, i) => i !== index);
                    updateData({ ...data, skus: newSkus });
                  }
                }}
                addFeature={(skuIdx) => {
                  const newSkus = [...(data.skus || [])];
                  newSkus[skuIdx].features = [...(newSkus[skuIdx].features || []), "Tính năng mới"];
                  updateData({ ...data, skus: newSkus });
                }}
                removeFeature={(skuIdx, fIdx) => {
                  const newSkus = [...(data.skus || [])];
                  newSkus[skuIdx].features = (newSkus[skuIdx].features || []).filter((_, i) => i !== fIdx);
                  updateData({ ...data, skus: newSkus });
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="bg-[#E31B23] p-10 rounded-4xl text-white space-y-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <Zap className="text-yellow-300" />
          <h3 className="font-black uppercase tracking-tighter text-xl text-white">Combo Bán Nhanh (Cố định ở cuối)</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <input
            className="bg-white/10 p-4 rounded-xl font-black text-white outline-none border border-white/20"
            value={data.combo?.title ?? ""}
            onChange={(e) => updateData({ ...data, combo: { ...(data.combo || { title: "", price: "" }), title: e.target.value }})}
          />
          <input
            className="bg-white/10 p-4 rounded-xl font-black text-white italic outline-none border border-white/20"
            value={data.combo?.price ?? ""}
            onChange={(e) => updateData({ ...data, combo: { ...(data.combo || { title: "", price: "" }), price: e.target.value }})}
          />
        </div>
      </div>
    </div>
  );
}