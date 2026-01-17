"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowRight } from "lucide-react"

interface NavbarProps {
  content?: any
  settings?: any
}

export const Navbar = ({ content, settings }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Dữ liệu mặc định theo nhận diện SMAR
  const brandName1 = content?.brandName1 || "SM"
  const brandName2 = content?.brandName2 || "AR"
  const domainText = content?.domainText || "SALEKITS.VN"
  const links = content?.links || [
    { label: "Về SMAR", href: "#about" },
    { label: "Dịch vụ SKU", href: "#pricing" },
    { label: "Case Study", href: "#blog" },
  ]

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b shadow-sm",
        "bg-white/95 backdrop-blur-md border-gray-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="flex items-center font-black text-2xl tracking-tighter">
            <span className="text-[#002D72]">{brandName1}</span>
            <span className="text-[#E31B23]">{brandName2}</span>
          </div>
          <div className="h-5 w-px bg-gray-300 mx-1"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            {domainText}
          </span>
        </div>

        {/* Desktop Menu Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link: any, idx: number) => (
            <a 
              key={idx}
              href={link.href} 
              className="text-sm font-bold text-[#002D72] hover:text-[#E31B23] transition-colors relative group/link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E31B23] transition-all group-hover/link:w-full" />
            </a>
          ))}
          
          {/* Sửa lỗi cú pháp tại đây */}
          <a href="#contact" className="inline-block">
            <button className="bg-[#004282] hover:bg-[#002D72] text-white px-7 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/10 flex items-center gap-2 group">
              Tư vấn ngay
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-[#002D72] hover:bg-gray-100 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay với Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-gray-50 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link: any, idx: number) => (
                <a 
                  key={idx}
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-[#002D72] p-3 hover:bg-blue-50 hover:text-[#E31B23] rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="w-full">
                <button className="w-full bg-[#004282] text-white py-4 rounded-xl font-bold mt-2 shadow-lg active:scale-95 transition-transform">
                  Tư vấn ngay
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar