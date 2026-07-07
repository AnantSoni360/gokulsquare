"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { GlassCard } from "./GlassCard";
import { Star } from "lucide-react";

export function ReviewsSection() {
  const reviews = [
    { text: "Amazing rooftop ambience. The butter garlic prawns were to die for.", author: "Rahul M." },
    { text: "Perfect for our anniversary. The sunset view is unmatched.", author: "Neha S." },
    { text: "Best sunset in town. The staff was incredibly accommodating.", author: "Arjun K." },
    { text: "A truly premium experience right in the heart of the city.", author: "Priya V." },
  ];

  return (
    <div id="reviews" className="bg-[#1A1A1A] py-24 overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-light mb-4 text-white">Guest Experiences</h2>
        <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full" />
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex space-x-8 px-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {/* Duplicate for seamless infinite scroll */}
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="w-[300px] md:w-[400px]">
              <GlassCard className="p-8 bg-white/10 border-white/20 text-white" hoverGlow={false}>
                <div className="flex gap-1 mb-4 text-[#FFC857]">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg font-light mb-6">"{review.text}"</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#FF8A00]">- {review.author}</p>
              </GlassCard>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
