"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function TestimonialsImmersive() {
  return (
    <section className="bg-pure-white py-32 md:py-48 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Quote Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <div className="w-12 h-12 mb-10 text-soft-gray">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </div>
            
            <blockquote className="text-[32px] md:text-[40px] font-bold text-almost-black leading-[1.2] tracking-tight mb-12">
              "Moving our retail store to Gokul Square was the best business decision. The footfall is unmatched, and the management is incredibly supportive."
            </blockquote>
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-light-gray" />
              <div>
                <p className="text-[18px] font-bold text-almost-black">Ramesh Kumar</p>
                <p className="text-[14px] text-slate-gray">Owner, Premium Fashion Outlet</p>
              </div>
            </div>
          </motion.div>

          {/* Video Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full aspect-video rounded-[32px] overflow-hidden premium-shadow group"
          >
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/LZXK8_G7Txw?si=TJR863wc-kZaHcZS" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
