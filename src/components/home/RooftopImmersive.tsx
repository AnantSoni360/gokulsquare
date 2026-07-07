"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RooftopImmersive() {
  return (
    <section className="bg-light-gray py-32 md:py-48 border-y border-soft-gray">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden premium-shadow-hover"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-1000"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop')" }}
          />
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-slate-gray mb-6">
            Sky Lounge
          </h2>
          <h3 className="text-[56px] md:text-[72px] font-bold text-almost-black leading-[1.1] tracking-tight mb-8">
            Dine Above <br /> The City.
          </h3>
          <p className="text-[18px] text-slate-gray leading-relaxed mb-12 max-w-lg">
            Elevate your evening at our rooftop restaurant. Fresh ingredients, masterful chefs, and breathtaking panoramic views of Toranagallu. Perfect for client dinners or relaxing after a long workday.
          </p>
          
          <Link 
            href="/restaurant" 
            className="inline-flex items-center justify-center px-8 py-4 text-[16px] font-bold rounded-full border-2 border-premium-orange text-premium-orange hover:bg-premium-orange hover:text-pure-white transition-colors duration-300"
          >
            Reserve a Table <ArrowRight size={18} className="ml-2" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
