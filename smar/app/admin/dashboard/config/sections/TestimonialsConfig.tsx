"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  GripVertical,
  Plus,
  Trash2,
  Quote,
  Award,
  CheckCircle,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  TestimonialItem,
  TestimonialsSection,
  CommitmentItem,
} from "@/types/cms";

/* ---------------------------------- */
/* ICON MAP (TYPE SAFE) */
/* ---------------------------------- */
const IconMap: Record<string, LucideIcon> = {
  Award,
  CheckCircle,
  Globe,
};

/* ---------------------------------- */
/* SORTABLE ITEM */
/* ---------------------------------- */
interface SortableItemProps {
  item: TestimonialItem;
  idx: number;
  updateItem: (
    index: number,
    field: keyof TestimonialItem,
    value: string
  ) => void;
  removeItem: (index: number) => void;
}

function SortableTestimonialItem({
  item,
  idx,
  updateItem,
  removeItem,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 0,
      }}
      className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4 ${
        isDragging ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab p-2 text-gray-300 mt-2"
      >
        <GripVertical size={20} />
      </div>

      <div className="flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            className="font-black text-[#002D72] bg-gray-50 p-2 rounded-lg outline-none text-sm"
            value={item.author_name}
            onChange={(e) =>
              updateItem(idx, "author_name", e.target.value)
            }
            placeholder="Tên tổ chức / khách hàng"
          />

          <input
            className="font-bold text-gray-400 bg-gray-50 p-2 rounded-lg outline-none text-xs"
            value={item.sku_used}
            onChange={(e) =>
              updateItem(idx, "sku_used", e.target.value)
            }
            placeholder="SKU đã sử dụng"
          />
        </div>

        <textarea
          className="w-full bg-gray-50 p-3 rounded-xl text-sm italic text-gray-600 outline-none"
          rows={3}
          value={item.content}
          onChange={(e) => updateItem(idx, "content", e.target.value)}
          placeholder="Nội dung đánh giá..."
        />
      </div>

      <button
        onClick={() => removeItem(idx)}
        className="text-gray-200 hover:text-red-500 p-2"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

/* ---------------------------------- */
/* MAIN CONFIG */
/* ---------------------------------- */
interface Props {
  data: TestimonialsSection;
  updateData: (value: TestimonialsSection) => void;
}

export default function TestimonialsConfig({ data, updateData }: Props) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = data.testimonials.findIndex(
      (t) => t.id === active.id
    );
    const newIndex = data.testimonials.findIndex(
      (t) => t.id === over.id
    );

    updateData({
      ...data,
      testimonials: arrayMove(
        data.testimonials,
        oldIndex,
        newIndex
      ),
    });
  };

  const updateTestimonial = (
    index: number,
    field: keyof TestimonialItem,
    value: string
  ) => {
    const updated = [...data.testimonials];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ ...data, testimonials: updated });
  };

  return (
    <div className="space-y-16 pb-20">
      {/* ------------------ TESTIMONIALS ------------------ */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
            <Quote size={16} /> Cảm nhận khách hàng
          </h3>

          <button
            onClick={() =>
              updateData({
                ...data,
                testimonials: [
                  ...data.testimonials,
                  {
                    id: `t-${Date.now()}`,
                    author_name: "Khách hàng mới",
                    author_role: "",
                    content: "",
                    sku_used: "SKU SMAR",
                    rating: 5,
                  },
                ],
              })
            }
            className="bg-[#002D72] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
          >
            <Plus size={14} /> Thêm đánh giá
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.testimonials.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {data.testimonials.map((t, idx) => (
                <SortableTestimonialItem
                  key={t.id}
                  item={t}
                  idx={idx}
                  updateItem={updateTestimonial}
                  removeItem={(i) =>
                    updateData({
                      ...data,
                      testimonials: data.testimonials.filter(
                        (_, index) => index !== i
                      ),
                    })
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* ------------------ COMMITMENTS ------------------ */}
      <div className="bg-white p-10 rounded-4xl border border-gray-100 shadow-sm space-y-8">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <Award size={16} /> Hệ sinh thái cam kết
        </h3>

        <div className="grid gap-6">
          {data.commitments.map((com, idx) => {
            const Icon = IconMap[com.icon_name] ?? Award;

            return (
              <div
                key={com.id}
                className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl"
              >
                <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm">
                  <Icon size={20} />
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="font-bold text-[#002D72] bg-transparent outline-none border-b border-gray-200 focus:border-blue-400"
                    value={com.title}
                    onChange={(e) => {
                      const updated = [...data.commitments];
                      updated[idx] = {
                        ...updated[idx],
                        title: e.target.value,
                      };
                      updateData({
                        ...data,
                        commitments: updated,
                      });
                    }}
                  />

                  <input
                    className="text-xs text-gray-500 bg-transparent outline-none border-b border-gray-200 focus:border-blue-400"
                    value={com.desc}
                    onChange={(e) => {
                      const updated = [...data.commitments];
                      updated[idx] = {
                        ...updated[idx],
                        desc: e.target.value,
                      };
                      updateData({
                        ...data,
                        commitments: updated,
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
