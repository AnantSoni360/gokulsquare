"use client";

import { motion } from "framer-motion";
import { ArrowRight, Maximize, MapPin, Building } from "lucide-react";
import Link from "next/link";

import { spacesData } from "@/data/spaces";
import { SpaceCard } from "@/components/ui/SpaceCard";

export function FeaturedSpaces() {
  // Only show 2-3 featured spaces on the home page that are available
  const spaces = spacesData.filter(s => s.status === "Available Now").slice(0, 3);

  return (
    <section className="bg-pure-white py-32 md:py-48 text-almost-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[72px] font-bold tracking-tight leading-[1.1] text-almost-black">
              Featured Spaces
            </h2>
          </div>
          <Link 
            href="/spaces"
            className="inline-flex items-center text-[16px] font-bold text-almost-black border-b border-almost-black pb-1 hover:text-premium-orange hover:border-premium-orange transition-colors"
          >
            View All Inventory <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {spaces.map((space, idx) => (
            <motion.div 
              key={space.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <SpaceCard space={space} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
