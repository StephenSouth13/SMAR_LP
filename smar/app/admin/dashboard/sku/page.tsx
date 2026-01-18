"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useContent } from "@/hooks/useContent";
import { SKUSection } from "@/types/cms";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  ArrowUpRight, 
  Activity,
  Flame,
  MousePointer2,
  LucideIcon,
  Loader2
} from "lucide-react";

// 1. Định nghĩa Interface cho StatBox để xóa lỗi 'any'
interface StatBoxProps {
  label: string;
  value: string | number;
  sub: string;
  icon: LucideIcon;
  color: string;
}

export default function SkuAnalyticsPage() {
  const { content: skuData, loading: skuLoading } = useContent<SKUSection>("sku");
  const [leadStats, setLeadStats] = useState<Record<string, number>>({});
  const [totalLeads, setTotalLeads] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  // 2. Tối ưu hóa hàm analyzeTrends để tránh lỗi cascading renders
  const analyzeTrends = useCallback(async () => {
    try {
      // Bắt đầu fetch mới set loading
      const { data: contacts, error } = await supabase.from("contacts").select("service");

      if (!error && contacts) {
        const stats: Record<string, number> = {};
        contacts.forEach((c) => {
          if (c.service) {
            stats[c.service] = (stats[c.service] || 0) + 1;
          }
        });
        setLeadStats(stats);
        setTotalLeads(contacts.length);
      }
    } catch (err) {
      console.error("Lỗi phân tích:", err);
    } finally {
      // Đảm bảo loading chỉ tắt sau khi dữ liệu đã sẵn sàng
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    analyzeTrends();
  }, [analyzeTrends]);

  if (skuLoading || loadingStats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-[#E31B23]" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Đang phân tích dữ liệu thị trường...</p>
      </div>
    );
  }

  const skus = skuData?.skus || [];

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-[#002D72] uppercase italic leading-none">
            Xu hướng & Hiệu suất
          </h2>
          <p className="text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase mt-2">
            Phân tích dữ liệu SKU dựa trên nhu cầu thực tế của khách hàng
          </p>
        </div>
        <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 flex items-center gap-3">
          <Activity className="text-blue-600" size={20} />
          <span className="text-xs font-black text-[#002D72] uppercase tracking-tighter">Real-time Data Active</span>
        </div>
      </div>

      {/* 3. TỔNG QUAN CHỈ SỐ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatBox label="Tổng nhu cầu" value={totalLeads} sub="Lượt đăng ký" icon={Users} color="bg-blue-500" />
        <StatBox label="Gói quan tâm nhất" value={getMostPopular(leadStats)} sub="Trending Now" icon={Flame} color="bg-red-500" />
        <StatBox label="SKU Đang chạy" value={skus.length} sub="Danh mục cốt lõi" icon={Package} color="bg-[#002D72]" />
        <StatBox label="Tỉ lệ chuyển đổi" value="~12.5%" sub="Dựa trên Traffic" icon={TrendingUp} color="bg-green-500" />
      </div>

      {/* 4. CHI TIẾT THỐNG KÊ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-[#002D72] uppercase italic flex items-center gap-2">
              <BarChart3 size={20} className="text-red-500" /> Xếp hạng quan tâm
            </h3>
            <span className="text-[10px] font-bold text-gray-300 uppercase">Đơn vị: Lượt chọn</span>
          </div>

          <div className="space-y-6">
            {skus.map((sku) => {
              const count = leadStats[sku.title] || 0;
              const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
              return (
                <div key={sku.id} className="space-y-2 group">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black text-[#002D72] uppercase">{sku.title}</span>
                    <span className="text-xs font-bold text-gray-400">{count} khách quan tâm</span>
                  </div>
                  <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                    {/* Sửa: bg-gradient-to-r -> bg-linear-to-r theo chuẩn mới */}
                    <div 
                      className="h-full bg-linear-to-r from-[#002D72] to-[#E31B23] transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-[#002D72] uppercase italic px-4">Tình trạng SKU</h3>
          {skus.map((sku) => (
            <div key={sku.id} className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${sku.isBestSeller ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
                  {sku.title.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-black text-[#002D72] uppercase">{sku.title}</div>
                  <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{sku.price}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 {sku.isBestSeller && <Flame size={14} className="text-red-500" />}
                 <ArrowUpRight size={16} className="text-gray-200 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          ))}
          <a href="/admin/dashboard/config" className="flex items-center justify-center gap-2 p-4 bg-[#002D72] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg">
             <MousePointer2 size={14} /> Chỉnh sửa cấu hình SKU
          </a>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, sub, icon: Icon, color }: StatBoxProps) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`} />
      <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="text-2xl font-black text-[#002D72] tracking-tighter truncate">{value}</div>
        <p className="text-[9px] font-bold text-gray-300 uppercase mt-1">{sub}</p>
      </div>
    </div>
  );
}

function getMostPopular(stats: Record<string, number>) {
  const entries = Object.entries(stats);
  if (entries.length === 0) return "N/A";
  return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}