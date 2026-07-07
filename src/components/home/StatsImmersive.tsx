"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Counter = ({ end, suffix = "", label }: { end: number, suffix?: string, label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutExpo = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      setCount(Math.floor(end * easeOutExpo));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end]);

  return (
    <div className="flex flex-col items-center md:items-start w-full">
      <span className="text-[56px] md:text-[72px] font-bold text-almost-black mb-2 tracking-tight">
        {count}{suffix}
      </span>
      <span className="text-[16px] text-slate-gray mb-6">
        {label}
      </span>
      <div className="w-full h-px bg-soft-gray" />
    </div>
  );
};

export function StatsImmersive() {
  const stats = [
    { end: 40, suffix: "+", label: "Commercial Spaces" },
    { end: 15, suffix: "+", label: "Trusted Brands" },
    { end: 120, suffix: "+", label: "Parking Spots" },
    { end: 24, suffix: "/7", label: "Security & Power" },
  ];

  return (
    <section className="bg-pure-white py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16"
        >
          {stats.map((stat, idx) => (
            <Counter key={idx} end={stat.end} suffix={stat.suffix} label={stat.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
