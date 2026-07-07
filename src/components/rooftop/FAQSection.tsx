"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: "Can I cancel my reservation?", a: "Yes, you can cancel your reservation up to 4 hours before your scheduled time without any charges." },
    { q: "Can I modify the time?", a: "Time modifications are subject to availability. Please contact the reception desk or use the link in your confirmation." },
    { q: "Is advance payment needed?", a: "For regular reservations, no advance payment is needed. However, special events or private booth bookings may require a deposit." },
    { q: "Do you have a dress code?", a: "We request smart casual attire. Please avoid flip-flops and athletic wear to maintain the premium dining experience." }
  ];

  return (
    <Section className="bg-white" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-4">Common Questions</h2>
          <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div 
                key={i} 
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-[#FF8A00] bg-[#FF8A00]/5' : 'border-[#E5E7EB] bg-white'}`}
              >
                <button 
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span className={`font-medium text-lg ${isOpen ? 'text-[#FF8A00]' : 'text-[#1A1A1A]'}`}>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FF8A00]' : 'text-[#6B7280]'}`} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-[#1A1A1A]/70">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
