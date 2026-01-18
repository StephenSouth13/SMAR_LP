//D:\Smar\SMAR_LP\smar\app\page.tsx
"use client";

import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Products } from "@/components/Products";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Navbar } from "@/components/Navbar"; 
import { Footer } from "@/components/Footer"; 

import { useContent } from "@/hooks/useContent";
import { SiteData } from "@/types/cms";

// ... các import giữ nguyên

export default function Home() {
  const { content, loading } = useContent<SiteData>();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const layout = Array.isArray(content?.layout) ? content.layout : [];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Navbar luôn ở ĐÂY - cố định trên cùng */}
      <Navbar />

      {layout.length > 0 ? (
        layout.map((section) => {
          // Ép kiểu string để chặn tuyệt đối
          const sType = section.type as string;
          
          // ĐIỀU KIỆN CHẶN: Nếu ẩn HOẶC là navbar/footer thì biến mất khỏi vòng lặp
          if (!section.enabled || sType === "navbar" || sType === "footer") {
            return null;
          }

          switch (section.type) {
            case "hero": return <Hero key={section.id} />;
            case "about": return <About key={section.id} />;
            case "sku": return <Products key={section.id} />;
            case "stats": return <Stats key={section.id} />;
            case "testimonials": return <Testimonials key={section.id} />;
            case "contact": return <Contact key={section.id} />;
            default: return null;
          }
        })
      ) : (
        /* Dự phòng: Nếu database rỗng, hiện thứ tự mặc định */
        <>
          <Hero />
          <About />
          <Products />
          <Stats />
        </>
      )}

      {/* Footer luôn ở ĐÂY - cố định dưới cùng */}
      <Footer />
    </main>
  );
}
