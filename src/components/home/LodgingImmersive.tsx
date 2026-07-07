"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LodgingImmersive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="bg-pure-white py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center mb-24">
        <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-slate-gray mb-6">
          Gokul Premium Stays
        </h2>
        <h3 className="text-[56px] md:text-[72px] font-bold text-almost-black leading-[1.1] tracking-tight mb-10 max-w-4xl">
          Luxury Lodging for the Modern Executive.
        </h3>
        <Link 
          href="/lodging" 
          className="inline-flex items-center justify-center px-8 py-4 text-[16px] font-bold rounded-full bg-premium-orange text-pure-white hover:bg-almost-black transition-colors duration-300 shadow-sm"
        >
          Book Your Stay <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>

      {/* Massive Edge-to-Edge Image */}
      <div className="max-w-[1400px] mx-auto w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden premium-shadow relative">
        <motion.div 
          style={{ scale, backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')" }}
          className="absolute inset-0 bg-cover bg-center origin-bottom"
        />
      </div>
    </section>
  );
}
