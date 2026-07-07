"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function LodgingReviews() {
  const reviews = [
    { text: "Beautiful rooms and excellent service. Will definitely visit again.", author: "Priya M." },
    { text: "Very clean and comfortable stay. The bed was incredibly plush.", author: "Arjun K." },
    { text: "Perfect location inside the mall. Shopping and dining just an elevator ride away.", author: "Rahul S." },
    { text: "Top notch security and very business-friendly. Fast WiFi.", author: "Neha V." },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">Guest Experiences</h2>
        <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full" />
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex space-x-8 px-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {/* Duplicate for seamless infinite scroll */}
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="w-[350px] md:w-[450px]">
              <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[24px] p-8 h-full">
                <div className="flex gap-1 mb-6 text-[#FF8A00]">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-xl font-medium text-[#1A1A1A] mb-8 leading-relaxed">"{review.text}"</p>
                <p className="text-sm font-bold uppercase tracking-wider text-[#6B7280]">— {review.author}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
