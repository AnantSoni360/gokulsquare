"use client";

import { motion } from "framer-motion";
import { spacesData } from "@/data/spaces";
import { SpaceCard } from "@/components/ui/SpaceCard";

export default function FloorThree() {
  const floorSpaces = spacesData.filter(s => s.floor.includes("Third"));

  return (
    <div className="min-h-screen bg-light-gray pt-24 px-6 md:px-12">
      
      {/* Floor Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-[1400px] mx-auto mb-16"
      >
        <span className="text-almost-black/60 font-bold tracking-widest uppercase text-[14px]">Level 3</span>
        <h1 className="text-[64px] font-bold text-almost-black tracking-tight leading-none mb-6">
          THIRD FLOOR
        </h1>
        <p className="text-almost-black/80 text-[18px] max-w-2xl leading-relaxed">
          Premium Retail and Entertainment. A dynamic mix of high-end boutique shopping and leisure experiences, designed to maximize visitor engagement before reaching the rooftop.
        </p>
      </motion.div>

      {/* Interactive Floor Plan Area */}
      <div className="max-w-[1400px] mx-auto mb-24 relative">
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
            <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-gray/20 rounded-[24px]">
              <p className="text-slate-gray">No available units mapped to this floor currently.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
