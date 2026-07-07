"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Coffee, Briefcase } from "lucide-react";
import Image from "next/image";

export function HotelOverview() {
  const features = [
    { 
      icon: <MapPin className="text-[#FF8A00]" size={28} />, 
      title: "Prime Location", 
      desc: "Located seamlessly inside Gokul Square with instant access to premium retail." 
    },
    { 
      icon: <Coffee className="text-[#FF8A00]" size={28} />, 
      title: "Rooftop Dining", 
      desc: "Exclusive priority access to our breathtaking panoramic rooftop restaurant." 
    },
    { 
      icon: <ShieldCheck className="text-[#FF8A00]" size={28} />, 
      title: "24/7 Security", 
      desc: "Round-the-clock security and safe, secure parking for your peace of mind." 
    },
    { 
      icon: <Briefcase className="text-[#FF8A00]" size={28} />, 
      title: "Business Ready", 
      desc: "High-speed connectivity and modern conference facilities available." 
    },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8A00]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: Staggered Images */}
        <div className="flex-1 relative w-full aspect-square md:h-[600px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 w-[70%] h-[75%] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#E5E7EB]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?q=80&w=2000&auto=format&fit=crop" 
              alt="Hotel Exterior" 
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-0 right-0 w-[60%] h-[55%] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-4 border-white"
          >
            <Image 
              src="https://images.unsplash.com/photo-1522771731470-ea4c4e46ee1d?q=80&w=2000&auto=format&fit=crop" 
              alt="Premium Interior" 
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 tracking-tight leading-[1.1]">
              Why Stay <br />
              <span className="text-[#FF8A00] relative">
                With Us?
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFC857]/40 -z-10 rounded-full" />
              </span>
            </h2>
            <p className="text-[#6B7280] text-lg mb-12 leading-relaxed max-w-xl font-medium">
              Experience the perfect blend of luxury hospitality and premium retail. Whether you're here for business or leisure, our boutique lodging offers an unparalleled experience right in the heart of Toranagallu.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-[#FAFAFA] p-6 rounded-[24px] border border-[#E5E7EB] hover:border-[#FF8A00]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{feature.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
