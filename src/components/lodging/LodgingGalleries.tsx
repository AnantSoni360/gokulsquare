"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export function LodgingGalleries() {
  const images = [
    { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1600&auto=format&fit=crop", label: "Lobby" },
    { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop", label: "Suite" },
    { url: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?q=80&w=1600&auto=format&fit=crop", label: "Exterior" },
    { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop", label: "Bedroom" },
    { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop", label: "Bathroom" },
    { url: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1600&auto=format&fit=crop", label: "Reception" }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">Explore the Property</h2>
          <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square md:aspect-[4/3] rounded-[24px] overflow-hidden group cursor-pointer"
            >
              <Image 
                src={img.url} 
                alt={img.label}
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-xl md:text-2xl tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
