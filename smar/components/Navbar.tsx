"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowRight } from "lucide-react"
import { useContent } from "@/hooks/useContent" // Nạp Hook
import { NavbarSection } from "@/types/cms"

export const Navbar = () => {
  const { content, loading } = useContent<NavbarSection>("navbar")
  const [isOpen, setIsOpen] = useState(false)

  // Fallback data trong khi chờ nạp hoặc lỗi
  const d = content || {
    brandName1: "SM",
    brandName2: "AR",
    domainText: "SALEKITS.VN",
    ctaText: "Tư vấn ngay",
    links: [
      { label: "Về SMAR", href: "#about" },
      { label: "Dịch vụ SKU", href: "#pricing" },
      { label: "Case Study", href: "#blog" },
    ]
  }

  if (loading) return <div className="h-20 bg-white/50 animate-pulse" />

  return (
    <nav className={cn("sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm")}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="flex items-center font-black text-2xl tracking-tighter uppercase italic">
            <span className="text-[#002D72]">{d.brandName1}</span>
            <span className="text-[#E31B23]">{d.brandName2}</span>
          </div>
          <div className="h-5 w-px bg-gray-300 mx-1"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            {d.domainText}
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {d.links?.map((link, idx) => (
            <a key={idx} href={link.href} className="text-sm font-bold text-[#002D72] hover:text-[#E31B23] transition-colors relative group/link">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E31B23] transition-all group-hover/link:w-full" />
            </a>
          ))}
          
          <a href="#contact">
            <button className="bg-[#004282] text-white px-7 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#002D72] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/10 group">
              {d.ctaText}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </div>

        <button className="md:hidden p-2 text-[#002D72]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t border-gray-50 overflow-hidden shadow-xl">
            <div className="flex flex-col p-6 gap-4">
              {d.links?.map((link, idx) => (
                <a key={idx} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-bold text-[#002D72] p-3 hover:bg-blue-50 rounded-xl">
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="w-full">
                <button className="w-full bg-[#004282] text-white py-4 rounded-xl font-bold mt-2">
                  {d.ctaText}
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}