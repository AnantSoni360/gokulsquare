"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full bg-pure-white pt-40 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Main Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16"
        >
          <div className="flex items-center justify-center gap-4 text-slate-gray font-medium text-[16px] mb-8">
            <span>Commercial Spaces</span>
            <span className="w-1.5 h-1.5 rounded-full bg-soft-gray" />
            <span>Lodging</span>
            <span className="w-1.5 h-1.5 rounded-full bg-soft-gray" />
            <span>Restaurant</span>
          </div>

          <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-gray mb-6">
            GOKUL SQUARE
          </h2>
          
          <h1 className="text-[48px] md:text-[72px] font-bold text-almost-black leading-[1.1] tracking-tight mb-10">
            Where Businesses Find <br /> Their Perfect Space
          </h1>

          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/spaces" 
              className="inline-flex items-center justify-center px-8 py-4 text-[16px] font-bold rounded-full bg-premium-orange text-pure-white hover:bg-white hover:text-almost-black transition-colors duration-300 group"
            >
              Explore Spaces <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
