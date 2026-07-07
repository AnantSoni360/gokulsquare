"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function ExperienceStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Keep Y transform minimal to prevent lag
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[800px] bg-light-gray overflow-hidden z-10">
      
      {/* 
        Edge-to-edge Parallax Image 
        Using -top/bottom and will-change to fix the parallax gap overlap
      */}
      <motion.div 
        style={{ y }} 
        className="absolute -top-[15%] -bottom-[15%] left-0 right-0 z-0 will-change-transform"
      >
        <Image 
          src="https://images.unsplash.com/photo-1542314831-c53cd4b85ca1?q=80&w=2070&auto=format&fit=crop"
          alt="The Gokul Square Experience"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Floating White Content Box */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-pure-white/95 backdrop-blur-xl p-12 md:p-24 rounded-[32px] max-w-3xl text-center premium-shadow border border-soft-gray"
        >
          <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-slate-gray mb-6">
            The Gokul Square Experience
          </h2>
          <h3 className="text-[32px] md:text-[56px] font-bold text-almost-black mb-8 leading-[1.1] tracking-tight">
            A Hub That Never Sleeps
          </h3>
          <p className="text-[16px] md:text-[18px] text-slate-gray leading-relaxed max-w-xl mx-auto">
            From your morning coffee on the ground floor to evening dinners at the rooftop restaurant, Gokul Square provides an integrated ecosystem where business and lifestyle seamlessly connect.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
