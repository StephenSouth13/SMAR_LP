"use client";

import { Award, CheckCircle, Globe, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useContent } from "@/hooks/useContent";
import { TestimonialsSection } from "@/types/cms";

/* ---------------------------------- */
/* ICON MAP – ĐỒNG BỘ VỚI CMS TYPE    */
/* ---------------------------------- */
// Sửa lại thành các key viết thường để khớp với Database/Type hệ thống
const IconMap: Record<string, LucideIcon> = {
  award: Award,
  check: CheckCircle,
  globe: Globe,
};

export const Testimonials = () => {
  const { content, loading } = useContent<TestimonialsSection>("testimonials");

  if (loading || !content) return null;

  const mainTestimonial = content.testimonials?.[0];

  return (
    <section className="pb-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* LEFT: MAIN TESTIMONIAL */}
        <div className="lg:col-span-2 bg-[#F8FAFC] p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden">
          <Quote className="absolute -top-4 -right-4 w-32 h-32 text-blue-100 opacity-20" />

          {mainTestimonial && (
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm font-black text-[#004282] uppercase">
                  {mainTestimonial.author_name.slice(0, 3)}
                </div>

                <div>
                  <h4 className="font-black text-[#002D72] text-lg leading-tight">
                    {mainTestimonial.author_name}
                  </h4>
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(mainTestimonial.rating ?? 5)}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 italic leading-relaxed mb-8 text-sm md:text-base">
                “{mainTestimonial.content}”
              </p>

              <div className="bg-[#E8F1FF] px-6 py-3 rounded-xl flex justify-between items-center border border-blue-50">
                <span className="text-[10px] font-bold text-[#004282] uppercase tracking-widest">
                  Sử dụng SKU
                </span>
                <span className="text-[10px] font-extrabold text-[#002D72] uppercase">
                  {mainTestimonial.sku_used}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: COMMITMENTS */}
        <div className="lg:col-span-3 flex flex-col gap-4 justify-center">
          {content.commitments?.map((com) => {
            // Lấy Icon dựa trên key viết thường
            const Icon = IconMap[com.icon_name] ?? Award;

            // FIX LỖI: So sánh với các giá trị viết thường (award, check, globe)
            const colorClass =
              com.icon_name === "award"
                ? "bg-red-50 text-red-500"
                : com.icon_name === "check"
                ? "bg-blue-50 text-blue-500"
                : "bg-green-50 text-green-500";

            return (
              <div
                key={com.id}
                className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all hover:shadow-md hover:translate-x-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h5 className="font-bold text-[#002D72]">
                    {com.title}
                  </h5>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {com.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};