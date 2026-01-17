"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Lỗi đăng nhập: " + error.message);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center items-center font-black text-3xl tracking-tighter mb-2">
            <span className="text-[#002D72]">SM</span>
            <span className="text-[#E31B23]">AR</span>
            <span className="ml-2 text-xs font-bold text-gray-300 uppercase italic">CMS</span>
          </div>
          <p className="text-gray-400 text-sm font-medium">Hệ thống quản trị nội dung 2026</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Email Quản trị</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
              <input 
                type="email" 
                required
                placeholder="admin@smar.vn"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-2xl outline-none transition-all text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-2xl outline-none transition-all text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#004282] hover:bg-[#002D72] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/10 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? "ĐANG XÁC THỰC..." : "VÀO HỆ THỐNG"}
            {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}