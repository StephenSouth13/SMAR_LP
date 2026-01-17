"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Box, 
  Settings, 
  LogOut, 
  Loader2, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { 
      label: "Tổng quan", 
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
    <aside className="w-72 bg-[#002D72] min-h-screen p-8 text-white flex flex-col justify-between sticky top-0 shadow-[10px_0_30px_rgba(0,0,0,0.1)] z-50">
      <div className="space-y-12">
        {/* Logo Brand & Sub-label */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 font-black text-3xl tracking-tighter">
            <span className="text-white">SMAR</span>
            <span className="text-white text-[10px] bg-[#E31B23] px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">
              2026
            </span>
          </div>
          <p className="text-blue-300/40 text-[9px] font-black uppercase tracking-[0.3em] pl-1">
            Management System
          </p>
        </div>
        
        {/* Main Navigation */}
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div className={cn(
                  "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden",
                  isActive 
                    ? "bg-white/10 text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]" 
                    : "text-blue-200/50 hover:bg-white/5 hover:text-white"
                )}>
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/4 w-1 h-1/2 bg-[#E31B23] rounded-full" />
                  )}

                  <div className="flex items-center gap-4 z-10">
                    <item.icon size={20} className={cn(
                      "transition-all duration-300",
                      isActive ? "text-[#E31B23] scale-110" : "group-hover:scale-110 group-hover:text-blue-200"
                    )} />
                    <span className="font-bold text-[11px] uppercase tracking-widest">
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight size={14} className={cn(
                    "transition-all duration-300",
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  )} />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Quick Link to Site */}
        <div className="pt-8 border-t border-white/5">
           <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 text-blue-300/50 hover:text-white transition-colors group text-[10px] font-black uppercase tracking-widest"
           >
             <ExternalLink size={14} />
             <span>Xem Website</span>
           </Link>
        </div>
      </div>

      {/* Logout Area */}
      <div className="pt-6 border-t border-white/5">
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-4 p-4 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all duration-300 group font-black text-[11px] tracking-[0.2em] uppercase disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          )}
          <span>{isLoggingOut ? "Đang xử lý..." : "Đăng xuất"}</span>
        </button>
      </div>
    </aside>
  );
};