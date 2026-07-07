"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "./Section";

type TableStatus = "available" | "booked" | "selected";

interface TableProps {
  id: string;
  status: TableStatus;
  label: string;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

function Table({ id, status, label, onSelect, selectedId }: TableProps) {
  const isSelected = selectedId === id;
  const isBooked = status === "booked";
  
  let bg = "bg-white border-[#E5E7EB]";
  let textColor = "text-[#1A1A1A]";
  if (isBooked) {
    bg = "bg-[#E5E7EB] border-[#E5E7EB]";
    textColor = "text-[#6B7280]";
  } else if (isSelected) {
    bg = "bg-[#FF8A00] border-[#FF8A00]";
    textColor = "text-white";
  }

  return (
    <motion.button
      disabled={isBooked}
      onClick={() => onSelect(id)}
      className={`relative w-16 h-16 md:w-20 md:h-20 border-2 rounded-lg flex items-center justify-center font-medium shadow-sm transition-colors duration-300 ${bg} ${textColor} ${!isBooked && 'hover:border-[#FF8A00]/50'}`}
      whileHover={!isBooked ? { scale: 1.05 } : {}}
      whileTap={!isBooked ? { scale: 0.95 } : {}}
      style={isSelected ? { boxShadow: '0 0 15px rgba(255,138,0,0.4)' } : {}}
    >
      <span className="text-sm">{label}</span>
      
      {/* Small decorative chairs */}
      <div className={`absolute -top-3 w-6 h-2 rounded-full ${isSelected ? 'bg-[#FFC857]' : isBooked ? 'bg-[#D1D5DB]' : 'bg-[#1A1A1A]'}`} />
      <div className={`absolute -bottom-3 w-6 h-2 rounded-full ${isSelected ? 'bg-[#FFC857]' : isBooked ? 'bg-[#D1D5DB]' : 'bg-[#1A1A1A]'}`} />
    </motion.button>
  );
}

export function FloorPlanSection() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedTable(id);
  };

  return (
    <Section className="bg-white" id="floorplan">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-light mb-4 text-[#1A1A1A]">Select Your Space</h2>
        <p className="text-[#1A1A1A]/60 max-w-2xl mx-auto mb-6">Choose from our premium window-side tables, central dining, or private booths.</p>
        <div className="w-24 h-1 bg-[#FF8A00] mx-auto rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto bg-[#FAFAFA] rounded-[32px] p-8 md:p-12 shadow-inner border border-[#E5E7EB]">
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mb-12">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-white border border-[#E5E7EB]" /><span className="text-sm">Available</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#E5E7EB]" /><span className="text-sm">Booked</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#FF8A00]" /><span className="text-sm">Selected</span></div>
        </div>

        <div className="flex flex-col gap-16">
          {/* Window Side */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#6B7280] mb-6 text-center">Window Side (Sunset View)</h3>
            <div className="flex justify-center gap-6 flex-wrap">
              {['W1', 'W2', 'W3', 'W4', 'W5'].map((id, i) => (
                <Table key={id} id={id} label={id} status={i === 2 ? 'booked' : 'available'} selectedId={selectedTable} onSelect={handleSelect} />
              ))}
            </div>
          </div>

          {/* Center */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#6B7280] mb-6 text-center">Center Dining</h3>
            <div className="flex justify-center gap-6 flex-wrap">
              {['C1', 'C2', 'C3', 'C4', 'C5'].map((id, i) => (
                <Table key={id} id={id} label={id} status={i === 0 || i === 4 ? 'booked' : 'available'} selectedId={selectedTable} onSelect={handleSelect} />
              ))}
            </div>
          </div>

          {/* Private Booths */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#6B7280] mb-6 text-center">Private Booths</h3>
            <div className="flex justify-center gap-10 flex-wrap">
              {['P1', 'P2', 'P3'].map((id, i) => (
                <Table key={id} id={id} label={id} status={i === 1 ? 'booked' : 'available'} selectedId={selectedTable} onSelect={handleSelect} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}
