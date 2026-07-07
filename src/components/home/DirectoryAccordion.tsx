"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";

export function DirectoryAccordion() {
  const [openFloor, setOpenFloor] = useState<number | null>(0);

  const floors = [
    {
      id: 4,
      name: "The Rooftop (Level 4)",
      businesses: ["Sky Lounge Restaurant", "Gokul Premium Stays"],
      vacancies: 0
    },
    {
      id: 3,
      name: "Third Floor",
      businesses: ["Premium IT Offices", "CA Firms & Consultancies"],
      vacancies: 7
    },
    {
      id: 2,
      name: "Second Floor",
      businesses: ["Boutique Cafes", "Retail Spaces"],
      vacancies: 4
    },
    {
      id: 1,
      name: "First Floor",
      businesses: ["Business Centers", "CA Firms", "Boutique Retail"],
      vacancies: 3
    },
    {
      id: 0,
      name: "Ground Floor",
      businesses: ["Commercial Fronts", "Showrooms", "Retail Businesses"],
      vacancies: 1
    }
  ];

  return (
    <section className="bg-light-gray py-32 md:py-48">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        
        <div className="mb-20">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-slate-gray mb-6">
            Building Directory
          </h2>
          <h3 className="text-[48px] md:text-[64px] font-bold text-almost-black tracking-tight leading-[1.1]">
            Explore the Layout
          </h3>
        </div>

        <div className="flex flex-col border-t border-soft-gray">
          {floors.map((floor) => (
            <div key={floor.id} className="border-b border-soft-gray rounded-[24px] overflow-hidden group hover:-translate-y-1 transition-transform duration-300 relative premium-shadow">
              <div className="absolute inset-0 rounded-[24px] premium-shadow-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <button 
                onClick={() => setOpenFloor(openFloor === floor.id ? null : floor.id)}
                className="w-full flex items-center justify-between py-10 group relative z-10 bg-pure-white px-8"
              >
                <div className="flex items-center gap-12">
                  <span className="text-[18px] font-medium text-slate-gray w-8 text-left">
                    0{floor.id}
                  </span>
                  <span className={`text-[32px] md:text-[40px] font-bold tracking-tight transition-colors ${openFloor === floor.id ? "text-premium-orange" : "text-almost-black group-hover:text-premium-orange"}`}>
                    {floor.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-8">
                  {floor.vacancies > 0 && (
                    <span className="hidden md:inline-flex items-center px-4 py-2 text-[12px] font-bold uppercase tracking-widest rounded-full bg-pure-white text-almost-black shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-premium-orange mr-2 animate-pulse" />
                      {floor.vacancies} Available
                    </span>
                  )}
                  <div className="text-slate-gray transition-transform duration-300">
                    {openFloor === floor.id ? <Minus size={28} /> : <Plus size={28} />}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {openFloor === floor.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12 pl-[5.5rem]">
                      <ul className="flex flex-col gap-4 mb-8">
                        {floor.businesses.map((biz, i) => (
                          <li key={i} className="text-[18px] text-slate-gray">{biz}</li>
                        ))}
                      </ul>
                      
                      {floor.vacancies > 0 && (
                        <a href="/spaces" className="inline-flex items-center text-[16px] font-bold text-premium-orange hover:text-almost-black transition-colors">
                          View Available Spaces <ArrowRight size={18} className="ml-2" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
