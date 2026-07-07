"use client";

import { motion } from "framer-motion";
import { Utensils, BedDouble } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FloorFour() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 px-6 md:px-12 relative overflow-hidden text-almost-black font-sans">
      
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />

      {/* Floor Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-[1400px] mx-auto mb-16 relative z-10 text-center"
      >
        <span className="text-[#D66D38] font-bold tracking-widest uppercase text-[14px]">Level 4</span>
        <h1 className="text-[56px] md:text-[72px] font-bold text-almost-black tracking-tight leading-none mb-6 font-serif mt-2">
          The Rooftop
        </h1>
        <p className="text-slate-gray text-[18px] max-w-2xl mx-auto leading-relaxed">
          Experience culinary excellence with panoramic views, and retreat to our exclusive boutique lodging suites designed for ultimate comfort.
        </p>
      </motion.div>

      {/* Dual Highlights: Restaurant & Lodging */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pb-32">
        
        {/* Restaurant Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="group relative h-[500px] rounded-[32px] overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col"
        >
          <div className="relative h-1/2 w-full overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?q=80&w=2070&auto=format&fit=crop"
              alt="Rooftop Restaurant"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          <div className="p-8 flex flex-col flex-1 bg-white relative z-10 -mt-6 rounded-t-[24px]">
            <div className="w-12 h-12 bg-[#FCEDE6] rounded-full flex items-center justify-center text-[#F97316] mb-4 shadow-sm">
              <Utensils size={24} />
            </div>
            <h2 className="text-[28px] font-bold text-almost-black tracking-tight mb-3">Rooftop Dining</h2>
            <p className="text-slate-gray mb-8 flex-1 leading-relaxed">A curated menu of global and local delicacies served against the beautiful backdrop of the Toranagallu skyline.</p>
            <Link 
              href="/rooftop"
              className="w-full block text-center py-4 bg-[#F97316] text-white font-bold rounded-full hover:bg-[#e65c00] transition-colors shadow-md"
            >
              Explore Dining
            </Link>
          </div>
        </motion.div>

        {/* Lodging Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="group relative h-[500px] rounded-[32px] overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col"
        >
          <div className="relative h-1/2 w-full overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury Lodging"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          <div className="p-8 flex flex-col flex-1 bg-white relative z-10 -mt-6 rounded-t-[24px]">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mb-4 shadow-sm">
              <BedDouble size={24} />
            </div>
            <h2 className="text-[28px] font-bold text-almost-black tracking-tight mb-3">Luxury Suites</h2>
            <p className="text-slate-gray mb-8 flex-1 leading-relaxed">Premium accommodations featuring plush interiors, high-speed connectivity, and exceptional room service.</p>
            <Link 
              href="/lodging"
              className="w-full block text-center py-4 bg-white border-2 border-slate-200 text-almost-black font-bold rounded-full hover:border-[#F97316] hover:text-[#F97316] transition-colors"
            >
              View Suites
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
