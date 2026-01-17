import { Linkedin, Facebook, Globe, Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          {/* Cột 1: Brand & AI Widget */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-[#004282] tracking-tighter">SMAR</span>
              <div className="h-6 w-[1px] bg-gray-300"></div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Strategic Marketing & Research Agency
              </span>
            </div>
            
          </div>
          
          
          
          

          {/* Cột 2: Social Links */}
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-[#0077B5] hover:text-white transition-all shadow-sm">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-red-500 hover:text-white transition-all shadow-sm">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Cột 3: Copyright & Sub-links */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-400 font-medium">
            © 2025 <span className="text-[#002D72] font-bold">SMAR Agency</span>. All rights reserved.
          </div>
          
          <div className="flex gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <a href="https://smar.vn" className="hover:text-[#004282] transition-colors">Smar.vn</a>
            <a href="#" className="hover:text-[#004282] transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-[#004282] transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};