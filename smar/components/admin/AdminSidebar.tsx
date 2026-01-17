"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Box, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Hàm xử lý đăng xuất chuyên nghiệp
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  };

  // Danh sách các mục menu để render tự động
  const menuItems = [
    { 
      label: "Dashboard", 
      icon: LayoutDashboard, 
      href: "/admin/dashboard" 
    },
    { 
      label: "Khách hàng (Leads)", 
      icon: Users, 
      href: "/admin/dashboard/leads" 
    },
    { 
      label: "Dịch vụ SKU", 
      icon: Box, 
      href: "/admin/dashboard/sku" 
    },
    { 
      label: "Cấu hình Trang", 
      icon: Settings, 
      href: "/admin/dashboard/config" 
    },
  ];

  return (
    <aside className="w-64 bg-[#002D72] min-h-screen p-6 text-white flex flex-col justify-between sticky top-0">
      <div>
        {/* Logo Brand */}
        <div className="flex items-center gap-2 font-black text-2xl mb-12 tracking-tighter">
          <span className="text-white">SMAR</span>
          <span className="text-[#E31B23] italic text-xs bg-white/10 px-2 py-1 rounded">CMS</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200 group",
                  isActive 
                    ? "bg-white/10 text-white shadow-lg" 
                    : "text-blue-200/60 hover:bg-white/5 hover:text-white"
                )}>
                  <item.icon size={20} className={cn(
                    "transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-[#E31B23]" : ""
                  )} />
                  <span className="font-bold text-xs uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Nút Đăng xuất */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 p-4 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group font-black text-xs tracking-widest uppercase"
      >
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Đăng xuất</span>
      </button>
    </aside>
  );
};