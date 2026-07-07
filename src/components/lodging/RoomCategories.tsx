"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, BedDouble, Wifi, Coffee } from "lucide-react";
import Image from "next/image";

export function RoomCategories() {
  const rooms = [
    {
      id: "deluxe",
      name: "Deluxe Room",
      price: "₹2499",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2000&auto=format&fit=crop",
      features: [
        { icon: <Users size={16} />, text: "2 Guests" },
        { icon: <BedDouble size={16} />, text: "King Bed" },
        { icon: <Wifi size={16} />, text: "Free WiFi" },
        { icon: <Coffee size={16} />, text: "Breakfast Included" }
      ]
    },
    {
      id: "premium",
      name: "Premium Room",
      price: "₹3499",
      img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2000&auto=format&fit=crop",
      features: [
        { icon: <Users size={16} />, text: "2 Guests" },
        { icon: <BedDouble size={16} />, text: "King Bed" },
        { icon: <Wifi size={16} />, text: "Free WiFi" },
        { icon: <Coffee size={16} />, text: "Breakfast Included" }
      ]
    },
    {
      id: "executive",
      name: "Executive Room",
      price: "₹4999",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
      features: [
        { icon: <Users size={16} />, text: "3 Guests" },
        { icon: <BedDouble size={16} />, text: "King Bed + Sofa" },
        { icon: <Wifi size={16} />, text: "Free WiFi" },
        { icon: <Coffee size={16} />, text: "Breakfast Included" }
      ]
    },
    {
      id: "suite",
      name: "Luxury Suite",
      price: "₹6999",
      img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop",
      features: [
        { icon: <Users size={16} />, text: "4 Guests" },
        { icon: <BedDouble size={16} />, text: "2 King Beds" },
        { icon: <Wifi size={16} />, text: "Free WiFi" },
        { icon: <Coffee size={16} />, text: "Breakfast Included" }
      ]
    }
  ];

  return (
    <section className="py-24 bg-white" id="rooms">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Our Accommodations</h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">Experience refined comfort in our thoughtfully designed rooms and suites.</p>
          <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {rooms.map((room, idx) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-[#FAFAFA] rounded-[32px] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(255,138,0,0.15)] transition-all duration-500 border border-[#E5E7EB] flex flex-col h-[600px]"
            >
              {/* Image Section */}
              <div className="relative h-3/5 w-full overflow-hidden">
                <Image 
                  src={room.img} 
                  alt={room.name} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Price Tag */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[#1A1A1A] font-bold shadow-lg">
                  {room.price} <span className="text-xs font-normal text-[#6B7280]">/ Night</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-1 relative z-10 bg-white">
                <h3 className="text-3xl font-bold text-[#1A1A1A] mb-6 group-hover:text-[#FF8A00] transition-colors">{room.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {room.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-[#6B7280] text-sm font-medium">
                      <div className="text-[#FF8A00]">{f.icon}</div>
                      {f.text}
                    </div>
                  ))}
                </div>

                <div className="mt-auto overflow-hidden">
                  <Link 
                    href={`/lodging/${room.id}`}
                    className="w-full flex items-center justify-center py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold rounded-xl group-hover:bg-[#FF8A00] group-hover:border-[#FF8A00] group-hover:text-white transition-colors duration-300 transform translate-y-2 group-hover:translate-y-0"
                  >
                    View Room Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
