"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const floors = [
  {
    id: "ground",
    name: "Ground Floor",
    type: "Premium Retail",
    desc: "High footfall commercial spaces perfectly suited for fashion, electronics, and showrooms. Street-level access with huge glass facades.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "first",
    name: "First & Second Floors",
    type: "Modern Workspaces",
    desc: "Quiet, professional, and well-lit office suites. Featuring high-speed internet provisions, 100% power backup, and modern restroom facilities.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "lodging",
    name: "Third Floor",
    type: "Luxury Lodging",
    desc: "A boutique hotel experience right above your business. Beautifully appointed rooms designed for executive stays and premium guests.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "roof",
    name: "Rooftop",
    type: "Sky Dining",
    desc: "An expansive rooftop restaurant offering panoramic views of Toranagallu. The perfect environment for corporate lunches and evening dining.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1934&auto=format&fit=crop"
  }
];

function FloorImage({ floor, idx, scrollYProgress }: { floor: any, idx: number, scrollYProgress: MotionValue<number> }) {
  const start = idx * 0.25;
  const end = (idx + 1) * 0.25;
  
  const inStart = Math.max(0, start - 0.05);
  const inFull = start + 0.05;
  const outStart = end - 0.05;
  const outEnd = Math.min(1, end + 0.05);
  
  const opacity = useTransform(
    scrollYProgress, 
    [inStart, inFull, outStart, outEnd], 
    idx === 0 ? [1, 1, 1, 0] : idx === floors.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  
  return (
    <motion.div
      key={floor.id}
      style={{ opacity }}
      className="absolute inset-0 bg-light-gray"
    >
      <Image 
        src={floor.image}
        alt={floor.name}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-[10000ms] ease-linear scale-110"
      />
    </motion.div>
  );
}

function FloorContent({ floor, idx, scrollYProgress }: { floor: any, idx: number, scrollYProgress: MotionValue<number> }) {
  const start = idx * 0.25;
  const end = (idx + 1) * 0.25;
  
  const inStart = Math.max(0, start - 0.05);
  const inFull = Math.max(0.001, start + 0.05);
  const outStart = Math.min(0.999, end - 0.05);
  const outEnd = Math.min(1, end + 0.05);

  const opacity = useTransform(
    scrollYProgress, 
    [inStart, inFull, outStart, outEnd], 
    idx === 0 ? [1, 1, 1, 0] : idx === floors.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  
  // Completely remove element from DOM flow when invisible to fix overlaps
  const display = useTransform(opacity, (v) => v > 0.05 ? "flex" : "none");
  
  const y = useTransform(
    scrollYProgress,
    [inStart, inFull, outStart, outEnd], 
    idx === 0 ? [0, 0, 0, -40] : idx === floors.length - 1 ? [40, 0, 0, 0] : [40, 0, 0, -40]
  );
  
  return (
    <motion.div
      style={{ opacity, y, display }}
      className="absolute inset-0 flex-col justify-center"
    >
      <span className="text-[14px] font-bold text-slate-gray uppercase tracking-widest mb-4">
        {floor.name}
      </span>
      <h3 className="text-[40px] md:text-[56px] font-bold text-almost-black leading-[1.1] tracking-tight mb-6">
        {floor.type}
      </h3>
      <p className="text-[18px] text-slate-gray leading-relaxed mb-10 max-w-lg">
        {floor.desc}
      </p>
      
      <div>
        <Link 
          href="/spaces" 
          className="inline-flex items-center text-[16px] font-bold text-premium-orange hover:text-almost-black transition-colors group"
        >
          Explore {floor.name} <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export function BuildingExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-light-gray">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-12">
        
        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Images */}
          <div className="flex-1 w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/5] rounded-[32px] overflow-hidden premium-shadow">
            {floors.map((floor, idx) => (
              <FloorImage key={floor.id} floor={floor} idx={idx} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          {/* Right Side: Text Content */}
          <div className="flex-1 w-full relative h-[300px] md:h-[400px]">
            {floors.map((floor, idx) => (
              <FloorContent key={floor.id} floor={floor} idx={idx} scrollYProgress={scrollYProgress} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
