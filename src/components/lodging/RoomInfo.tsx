"use client";

import { Users, Maximize, BedDouble, Eye, Wind, Coffee, Wifi, BellRing, Tv, Refrigerator } from "lucide-react";

export function RoomInfo({ roomName = "Premium King Room", price = "₹3499" }) {
  const specs = [
    { icon: <Maximize size={20} />, label: "350 sq.ft." },
    { icon: <Users size={20} />, label: "2 Guests" },
    { icon: <BedDouble size={20} />, label: "King Size Bed" },
    { icon: <Eye size={20} />, label: "City View" },
  ];

  const amenities = [
    { icon: <Wind size={20} />, label: "Air Conditioning" },
    { icon: <Coffee size={20} />, label: "Breakfast Included" },
    { icon: <Wifi size={20} />, label: "Free WiFi" },
    { icon: <BellRing size={20} />, label: "Room Service" },
    { icon: <Tv size={20} />, label: "Smart TV" },
    { icon: <Refrigerator size={20} />, label: "Mini Fridge" },
  ];

  return (
    <div className="py-12 border-b border-[#E5E7EB]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="flex gap-1 text-[#FF8A00] mb-3">
            {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">{roomName}</h1>
        </div>
        <div className="bg-[#FAFAFA] border border-[#E5E7EB] px-8 py-4 rounded-2xl text-center shadow-sm">
          <p className="text-3xl font-bold text-[#FF8A00]">{price}</p>
          <p className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold mt-1">Per Night</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center gap-3 text-[#1A1A1A]">
            <div className="text-[#FF8A00]">{spec.icon}</div>
            <span className="font-semibold">{spec.label}</span>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">About the Room</h3>
        <p className="text-lg text-[#6B7280] leading-relaxed max-w-4xl mb-12">
          Experience premium comfort with modern interiors, luxurious bedding, high-speed WiFi, and beautiful city views. Designed meticulously for both business travelers and families seeking an elegant retreat within Gokul Square.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">Room Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
          {amenities.map((am, i) => (
            <div key={i} className="flex items-center gap-3 text-[#6B7280]">
              <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-[#E5E7EB] text-[#1A1A1A]">
                {am.icon}
              </div>
              <span className="font-medium">{am.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
