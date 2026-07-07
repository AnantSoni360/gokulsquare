"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { GlassCard } from "./GlassCard";
import { Utensils, Sunset, Music, Sparkles } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      icon: <Utensils className="w-8 h-8 text-[#FF8A00]" />,
      title: "Premium Cuisine",
      desc: "Chef curated menu.",
    },
    {
      icon: <Sunset className="w-8 h-8 text-[#FF8A00]" />,
      title: "Sunset View",
      desc: "360° city skyline.",
    },
    {
      icon: <Music className="w-8 h-8 text-[#FF8A00]" />,
      title: "Live Music",
      desc: "Weekend performances.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#FF8A00]" />,
      title: "Romantic Ambience",
      desc: "Perfect for celebrations.",
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: any = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

  return (
    <Section className="bg-[#FAFAFA] relative" id="experience">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-light mb-4">The Experience</h2>
        <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full" />
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {experiences.map((exp, idx) => (
          <motion.div key={idx} variants={item}>
            <GlassCard className="p-8 h-full flex flex-col items-center text-center group cursor-pointer bg-white">
              <div className="w-16 h-16 rounded-2xl bg-[#FF8A00]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {exp.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A]">{exp.title}</h3>
              <p className="text-[#1A1A1A]/60">{exp.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
