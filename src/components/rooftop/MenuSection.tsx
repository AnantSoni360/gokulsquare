"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import Image from "next/image";

export function MenuSection() {
  const categories = [
    {
      title: "Starters",
      items: [
        { name: "Butter Garlic Prawns", price: "₹650", img: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=2000&auto=format&fit=crop" },
        { name: "Truffle Mushroom Bruschetta", price: "₹450", img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=2000&auto=format&fit=crop" }
      ]
    },
    {
      title: "Main Course",
      items: [
        { name: "Grilled Atlantic Salmon", price: "₹1200", img: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=2000&auto=format&fit=crop" },
        { name: "Saffron Risotto", price: "₹850", img: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?q=80&w=2000&auto=format&fit=crop" }
      ]
    },
    {
      title: "Desserts",
      items: [
        { name: "Dark Chocolate Fondant", price: "₹550", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=2000&auto=format&fit=crop" },
        { name: "Classic Tiramisu", price: "₹450", img: "https://images.unsplash.com/photo-1571115177098-24c42d640a92?q=80&w=2000&auto=format&fit=crop" }
      ]
    }
  ];

  return (
    <Section className="bg-white" id="menu">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-light mb-4">Curated Menu</h2>
        <p className="text-[#1A1A1A]/60 max-w-2xl mx-auto mb-6">Experience our chef's hand-crafted seasonal selections.</p>
        <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full" />
      </div>

      <div className="flex flex-col gap-16">
        {categories.map((cat, i) => (
          <div key={i}>
            <h3 className="text-2xl font-semibold mb-8 text-[#1A1A1A] border-b border-[#E5E7EB] pb-2 inline-block">{cat.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cat.items.map((item, j) => (
                <motion.div 
                  key={j}
                  className="flex items-center gap-6 group cursor-pointer bg-[#FAFAFA] rounded-2xl p-4 transition-colors hover:bg-white hover:shadow-lg border border-transparent hover:border-[#FF8A00]/20"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
                    <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-medium text-lg text-[#1A1A1A] group-hover:text-[#FF8A00] transition-colors">{item.name}</h4>
                    </div>
                    <div className="w-12 border-t-2 border-[#FF8A00] my-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
