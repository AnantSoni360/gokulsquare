"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function RoomSlider() {
  const images = [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2000&auto=format&fit=crop", // Bedroom
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop", // Bathroom
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop", // Balcony/View
    "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?q=80&w=2000&auto=format&fit=crop"  // Exterior
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] bg-[#1A1A1A] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Controls */}
      <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === currentIndex ? "bg-[#FF8A00]" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
