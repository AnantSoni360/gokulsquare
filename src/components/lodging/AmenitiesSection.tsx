"use client";

import { motion } from "framer-motion";
import { Wifi, Clock, Car, Utensils, Bell, WashingMachine, Zap, Tv, Droplets, ShieldCheck } from "lucide-react";

export function AmenitiesSection() {
  const amenities = [
    { icon: <Wifi size={32} />, name: "Free WiFi" },
    { icon: <Clock size={32} />, name: "24x7 Reception" },
    { icon: <Car size={32} />, name: "Secure Parking" },
    { icon: <Utensils size={32} />, name: "Restaurant" },
    { icon: <Bell size={32} />, name: "Room Service" },
    { icon: <WashingMachine size={32} />, name: "Laundry" },
    { icon: <Zap size={32} />, name: "Power Backup" },
    { icon: <Tv size={32} />, name: "Smart TV" },
    { icon: <Droplets size={32} />, name: "Hot Water" },
    { icon: <ShieldCheck size={32} />, name: "24x7 Security" }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">Premium Amenities</h2>
          <p className="text-[#6B7280]">Everything you need for a comfortable stay.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {amenities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center group hover:border-[#FF8A00] transition-colors cursor-default"
            >
              <div className="text-[#6B7280] group-hover:text-[#FF8A00] group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>
              <span className="font-semibold text-[#1A1A1A]">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
