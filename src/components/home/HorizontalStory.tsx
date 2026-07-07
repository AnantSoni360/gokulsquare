"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ShieldCheck, Zap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HorizontalStory() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the transform and use exact scroll percentages to prevent lag
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const stories = [
    {
      title: "Prime Location",
      desc: "Situated on the main artery of Toranagallu, offering unmatched visibility and easy access for both local residents and transient highway traffic.",
      icon: <MapPin size={24} className="text-slate-gray group-hover:text-premium-orange transition-colors" />,
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "High Footfall",
      desc: "An integrated ecosystem of shopping, working, and living guarantees a constant, diverse flow of potential customers right past your door.",
      icon: <Users size={24} className="text-slate-gray group-hover:text-premium-orange transition-colors" />,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
    },
    {
      title: "Uninterrupted Operations",
      desc: "100% DG power backup ensures your business never stops. High-speed elevators and a premium maintenance standard.",
      icon: <Zap size={24} className="text-slate-gray group-hover:text-premium-orange transition-colors" />,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    },
    {
      title: "Secure Environment",
      desc: "24/7 manned security and comprehensive CCTV surveillance providing complete peace of mind for business owners and patrons.",
      icon: <ShieldCheck size={24} className="text-slate-gray group-hover:text-premium-orange transition-colors" />,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-pure-white z-20">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Horizontal Scroll Track - Using will-change to prevent lag */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 px-6 md:px-12 w-[500vw] md:w-[300vw] h-full items-center will-change-transform"
        >
          
          {/* Intro Block now acts as the first slide so it doesn't overlap cards */}
          <div className="w-[85vw] md:w-[40vw] shrink-0">
            <h2 className="text-[48px] md:text-[64px] font-bold text-almost-black tracking-tight leading-[1.1]">
              Why Businesses <br /> Choose Gokul Square.
            </h2>
          </div>

          {stories.map((story, index) => (
            <div 
              key={index} 
              className="w-[85vw] md:w-[50vw] lg:w-[40vw] flex flex-col shrink-0 bg-pure-white rounded-[24px] overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-soft-gray relative premium-shadow"
            >
              <div className="absolute inset-0 rounded-[24px] premium-shadow-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="w-full aspect-[16/9] relative overflow-hidden bg-light-gray z-10">
                <Image 
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-8 md:p-12">
                <div className="mb-6">{story.icon}</div>
                <h3 className="text-[24px] md:text-[28px] font-bold mb-4 text-almost-black tracking-tight">
                  {story.title}
                </h3>
                <p className="text-[16px] md:text-[18px] text-slate-gray leading-relaxed mb-8">
                  {story.desc}
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center text-[16px] font-bold text-premium-orange hover:text-almost-black transition-colors"
                >
                  Learn More <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
