"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";

export function StatsSection() {
  const stats = [
    { value: "5000+", label: "Reservations" },
    { value: "4.9★", label: "Average Rating" },
    { value: "150+", label: "Dishes" },
    { value: "98%", label: "Satisfied Guests" },
  ];

  return (
    <Section className="bg-[#FF8A00] text-white" id="stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            className="text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <h3 className="text-4xl md:text-6xl font-bold mb-2">{stat.value}</h3>
            <p className="text-white/80 uppercase tracking-widest text-xs md:text-sm font-semibold">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
