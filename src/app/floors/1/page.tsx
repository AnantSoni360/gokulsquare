"use client";

import { motion } from "framer-motion";
import { spacesData } from "@/data/spaces";
import { SpaceCard } from "@/components/ui/SpaceCard";

export default function FloorOne() {
  const floorSpaces = spacesData.filter(s => s.floor.includes("First"));

  return (
    <div className="min-h-screen bg-pure-white pt-24 px-6 md:px-12">
      
      {/* Floor Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-[1400px] mx-auto mb-16"
      >
        <span className="text-slate-gray font-bold tracking-widest uppercase text-[14px]">Level 1</span>
        <h1 className="text-[64px] font-bold text-almost-black tracking-tight leading-none mb-6">
          FIRST FLOOR
        </h1>
        <p className="text-slate-gray text-[18px] max-w-2xl leading-relaxed">
          A minimalist luxury experience. High-contrast spaces perfect for boutique retail, high-end salons, and premium wellness centers.
        </p>
      </motion.div>

      {/* Interactive Floor Plan Area */}
      <div className="max-w-[1400px] mx-auto mb-24 relative">
        <div className="absolute inset-0 bg-light-gray opacity-20 pointer-events-none rounded-[32px]" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {floorSpaces.length > 0 ? (
            floorSpaces.map((space, i) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + (i * 0.1) }}
              >
                <SpaceCard space={space} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-soft-gray rounded-[24px]">
              <p className="text-slate-gray">No available units mapped to this floor currently.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
