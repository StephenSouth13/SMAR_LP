import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Products } from "@/components/Products";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
export const revalidate = 0;
export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section - Tại sao chọn SMAR */}
      <About />


      {/* 3. Products Section - Hệ sinh thái 5 SKU */}
      <Products />
    {/* 4. Stats Section - Bảo chứng thành công (15+ dự án/tháng) */}
      <Stats />
      {/* 5. Testimonials Section - Case Study AMA Vũng Tàu */}
      <Testimonials />

      {/* 6. Contact Section - Form đăng ký và thông tin liên hệ */}
      <Contact />
    </main>
  );
}