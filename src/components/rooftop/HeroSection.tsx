"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PremiumButton } from "./PremiumButton";
import Image from "next/image";

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Simulate initial cinematic fade in
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="overview" className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background cinematic element */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[#FAFAFA]"
        initial={{ opacity: 0 }}
        animate={{ opacity: showVideo ? 1 : 0 }}
        transition={{ duration: 2 }}
      >
        {/* Placeholder for cinematic rooftop video/image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=2070&auto=format&fit=crop" 
          alt="Rooftop Dining"
          fill 
          className="object-cover object-center"
        />
        
        {/* Floating elements animation */}
        <motion.div
          className="absolute inset-0 z-10 opacity-30"
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, #FF8A00 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 px-6 max-w-4xl mx-auto mt-20">
        <motion.p 
          className="text-[#FF8A00] font-semibold tracking-[0.2em] uppercase mb-4 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Rooftop Dining
        </motion.p>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-light text-[#1A1A1A] mb-6 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Elevate Your <br />
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF8A00] to-[#FFC857]">
            Dining Experience
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-2xl text-[#1A1A1A]/70 mb-10 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          Reserve your table beneath the city lights. Enjoy handcrafted cuisine, beautiful ambience and sunset views.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <a href="#reserve">
            <PremiumButton size="lg" className="mx-auto">
              Reserve Table
            </PremiumButton>
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#1A1A1A]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-[#FF8A00] to-transparent"
          animate={{ height: ["0px", "48px"], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
