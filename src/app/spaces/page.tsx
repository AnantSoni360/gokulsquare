"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { spacesData } from "@/data/spaces";
import { SpaceCard } from "@/components/ui/SpaceCard";

export default function SpacesListingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Retail", "Office", "Dining"];

  const filteredSpaces = spacesData.filter((space) => {
    if (activeCategory === "All") return true;
    return space.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-light-gray pt-32 pb-24">
      {/* Header */}
      <section className="bg-light-gray pt-12 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-[56px] md:text-[80px] font-bold text-almost-black tracking-tight leading-[1.1] mb-8">
              Available <br /> Inventory.
            </h1>
            <p className="text-[18px] md:text-[20px] text-slate-gray leading-relaxed">
              Explore our current availability across retail, office, and dining spaces. Each unit is designed with premium finishes and access to world-class amenities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="bg-light-gray pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-[14px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat 
                    ? "bg-almost-black text-pure-white border-almost-black" 
                    : "bg-pure-white text-slate-gray border-soft-gray hover:border-almost-black hover:text-almost-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredSpaces.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredSpaces.map((space) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={space.id}
                >
                  <SpaceCard space={space} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-32 bg-pure-white rounded-[24px] border border-soft-gray">
              <h3 className="text-[24px] font-bold text-almost-black mb-4">No spaces available in this category</h3>
              <p className="text-slate-gray">Please check back later or contact us for upcoming vacancies.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
