"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Phone } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="bg-light-gray py-32 md:py-48 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[56px] md:text-[80px] font-bold text-almost-black mb-12 tracking-tight leading-[1.1]">
            Ready To Grow <br /> Your Business?
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
            <Link 
              href="/spaces"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-[16px] font-bold rounded-full bg-premium-orange text-pure-white hover:bg-almost-black transition-colors duration-300 shadow-md hover:shadow-xl group"
            >
              View Commercial Spaces <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-[16px] font-bold rounded-full border border-soft-gray bg-pure-white text-almost-black hover:border-premium-orange hover:text-premium-orange transition-colors duration-300 shadow-sm"
            >
              <Calendar size={18} className="mr-3" /> 
              Schedule Visit
            </Link>
            
            <a 
              href="tel:+919876543210"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-[16px] font-bold text-slate-gray hover:text-premium-orange transition-colors duration-300"
            >
              <Phone size={18} className="mr-3" /> 
              Call Owner
            </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
