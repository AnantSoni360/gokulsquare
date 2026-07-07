"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import Image from "next/image";

export function GallerySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0); // Default to first item expanded

  const images = [
    { url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop", caption: "Premium Dining Area" },
    { url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop", caption: "Cocktail Bar" },
    { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", caption: "Sunset Views" },
    { url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop", caption: "Private Booths" }
  ];

  return (
    <Section className="bg-[#1A1A1A] text-white" id="gallery">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-light mb-4">A Glimpse of Elegance</h2>
        <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row h-[600px] w-full gap-4 max-w-6xl mx-auto overflow-hidden">
        {images.map((img, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <motion.div
              key={idx}
              className="relative overflow-hidden rounded-[24px] cursor-pointer"
              onHoverStart={() => setHoveredIdx(idx)}
              animate={{ 
                flex: isHovered ? 4 : 1 
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
            >
              <Image 
                src={img.url} 
                alt={img.caption}
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end h-full">
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 20
                  }}
                  transition={{ duration: 0.4 }}
                  className="whitespace-nowrap"
                >
                  <p className="text-white text-2xl font-semibold mb-2">{img.caption}</p>
                  <div className="w-12 h-1 bg-[#FF8A00] rounded-full" />
                </motion.div>
                
                {/* Fallback label when not hovered, rotated vertically on desktop */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 0 : 1
                  }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/70 font-semibold tracking-widest uppercase text-xs origin-bottom-left md:-rotate-90 hidden md:block"
                >
                  {img.caption}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
