"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { GlassCard } from "./GlassCard";
import { PremiumButton } from "./PremiumButton";
import Image from "next/image";

export function EventsSection() {
  const events = [
    { title: "Friday Live Music", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop" },
    { title: "Candle Light Dinner", img: "https://images.unsplash.com/photo-1549488344-c6a6f6fcd153?q=80&w=2070&auto=format&fit=crop" },
    { title: "Weekend Buffet", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop" }
  ];

  return (
    <Section className="bg-[#FAFAFA]" id="events">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-light mb-4">Upcoming Events</h2>
        <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((evt, i) => (
          <GlassCard key={i} className="group overflow-hidden relative h-[400px]">
            <Image src={evt.img} alt={evt.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{evt.title}</h3>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <PremiumButton variant="primary" size="sm">
                  Reserve
                </PremiumButton>
              </div>
            </div>
            
            {/* Orange gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FF8A00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none" />
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
