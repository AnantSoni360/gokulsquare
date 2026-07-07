"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function SidebarNav() {
  const [activeId, setActiveId] = useState("overview");
  const [isOpen, setIsOpen] = useState(true);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "experience", label: "Experience" },
    { id: "gallery", label: "Gallery" },
    { id: "floorplan", label: "Floor Plan" },
    { id: "reserve", label: "Reserve" },
    { id: "menu", label: "Menu" },
    { id: "reviews", label: "Reviews" },
    { id: "events", label: "Events" },
    { id: "faq", label: "FAQ" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed top-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg shadow-black/5 text-[#1A1A1A] hover:text-[#FF8A00] transition-colors border border-[#E5E7EB]"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.aside 
            initial={{ width: 0 }}
            animate={{ width: 280 }}
            exit={{ width: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="h-screen sticky top-0 flex-shrink-0 bg-white border-r border-[#E5E7EB] flex flex-col z-40 overflow-hidden"
          >
            <div className="w-[280px] h-full flex flex-col">
              <div className="p-8 border-b border-[#E5E7EB] flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A] whitespace-nowrap">Gokul<br/><span className="text-[#FF8A00]">Square</span></h2>
                  <p className="text-xs uppercase tracking-widest text-[#6B7280] mt-2 font-semibold whitespace-nowrap">Rooftop Dining</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[#6B7280] hover:text-[#FF8A00] transition-colors p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-2">
                {sections.map((section) => {
                  const isActive = activeId === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-medium whitespace-nowrap ${
                        isActive 
                          ? "bg-[#FF8A00] text-white shadow-md shadow-[#FF8A00]/20" 
                          : "text-[#1A1A1A]/70 hover:bg-[#FAFAFA] hover:text-[#FF8A00]"
                      }`}
                    >
                      <span>{section.label}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="activeSidebarIndicator"
                          className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 ml-2"
                        />
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-[#E5E7EB]">
                <a href="#reserve" className="w-full block text-center bg-[#1A1A1A] hover:bg-[#FF8A00] text-white py-3 rounded-xl font-semibold transition-colors duration-300 whitespace-nowrap">
                  Book Table
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
