"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
export function ElevatorSystem({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isTravelling, setIsTravelling] = useState(false);
  const [targetFloor, setTargetFloor] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState<string>("G");
  const [displayNumber, setDisplayNumber] = useState<string>("G");
  const [isHovered, setIsHovered] = useState(false);

  // Determine current floor based on initial URL
  useEffect(() => {
    if (pathname === "/") setCurrentFloor("G");
    else if (pathname.includes("/floors/1")) setCurrentFloor("1");
    else if (pathname.includes("/floors/2")) setCurrentFloor("2");
    else if (pathname.includes("/floors/3")) setCurrentFloor("3");
    else if (pathname.includes("/floors/4") || pathname.includes("/lodging") || pathname.includes("/restaurant") || pathname.includes("/rooftop")) setCurrentFloor("4");
    setDisplayNumber(currentFloor);
  }, [pathname]);

  const floors = [
    { id: "4", label: "4", route: "/floors/4" },
    { id: "3", label: "3", route: "/floors/3" },
    { id: "2", label: "2", route: "/floors/2" },
    { id: "1", label: "1", route: "/floors/1" },
    { id: "G", label: "G", route: "/" },
  ];

  const handleFloorClick = (floorId: string, route: string) => {
    if (currentFloor === floorId || isTravelling) return;
    
    setTargetFloor(floorId);
    setIsTravelling(true);

    // 1. Doors Close (0 -> 800ms)
    setTimeout(() => {
      // 2. Play ding sound & change route while doors are closed
      router.push(route);
      
      // Simulate elevator display changing
      let ticks = 0;
      const interval = setInterval(() => {
        ticks++;
        if (ticks === 1) setDisplayNumber(floorId); // Just a quick jump for now
      }, 400);

      // 3. Travel time & Open Doors (after 1500ms total)
      setTimeout(() => {
        clearInterval(interval);
        setCurrentFloor(floorId);
        setDisplayNumber(floorId);
        setIsTravelling(false);
        setTargetFloor(null);
      }, 1500);

    }, 800);
  };

  return (
    <div className="relative w-full h-full min-h-screen">
      
      {/* 
        MAIN CONTENT
        Adding a mechanical stop-bounce when the elevator arrives.
      */}
      <motion.div 
        animate={{ 
          y: isTravelling ? [0, 4, -4, 4, -2, 0] : [0, -10, 5, -2, 0]
        }}
        transition={{ 
          duration: isTravelling ? 0.4 : 0.8, 
          repeat: isTravelling ? Infinity : 0, 
          ease: isTravelling ? "linear" : "backOut"
        }}
        className="w-full min-h-screen pb-24 pr-20 md:pr-32"
      >
        {children}
      </motion.div>

      {/* LIFT PANEL (Fixed Right) */}
      <motion.div 
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center bg-pure-white/90 backdrop-blur-md rounded-[32px] border border-soft-gray premium-shadow overflow-hidden p-2"
      >
        {/* Elevator Icon (Always visible) */}
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden relative">
          <Image src="/elevator-icon.png" alt="Lift" fill className="object-cover scale-[1.20]" unoptimized />
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 pt-6 pb-2 w-full"
            >
              {/* Digital Display */}
              <div className="w-12 h-10 bg-almost-black rounded-lg flex items-center justify-center border-2 border-slate-gray relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <span className="text-premium-orange font-mono font-bold text-[18px] animate-pulse drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]">
                  {displayNumber}
                </span>
              </div>

              {/* Floor Buttons */}
              <div className="flex flex-col gap-3">
                {floors.map((floor) => {
                  const isActive = currentFloor === floor.id;
                  const isTarget = targetFloor === floor.id;
                  
                  return (
                    <button
                      key={floor.id}
                      onClick={() => handleFloorClick(floor.id, floor.route)}
                      disabled={isTravelling}
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] transition-all duration-300 border-2 active:scale-90 overflow-hidden shrink-0 ${
                        isActive 
                          ? "bg-premium-orange text-pure-white border-premium-orange shadow-[0_0_20px_rgba(234,88,12,0.6)] scale-100" 
                          : isTarget
                          ? "bg-premium-orange/50 text-pure-white border-premium-orange animate-pulse scale-95"
                          : "bg-pure-white text-almost-black border-soft-gray hover:border-premium-orange hover:text-premium-orange hover:scale-105"
                      }`}
                    >
                      {/* Ripple Effect Layer */}
                      {isActive && (
                        <motion.div 
                          layoutId="activeGlow"
                          className="absolute inset-0 rounded-full bg-pure-white/20 animate-ping opacity-50"
                        />
                      )}
                      <span className="relative z-10">{floor.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ELEVATOR DOORS OVERLAY */}
      <div className="fixed inset-0 z-[60] pointer-events-none flex">
        {/* Left Door */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: isTravelling ? "50%" : "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="h-full bg-white border-r border-[#FF8A00]/30 shadow-[20px_0_50px_rgba(0,0,0,0.1)] flex items-center justify-end overflow-hidden relative"
        >
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-overlay" />
          
          {/* Orange door frame trim */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-[#FF8A00]/10" />
          
          {/* Spectacular Split Art Design (Left Half) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center pointer-events-none z-0">
            <div className="relative flex items-center justify-center pointer-events-none">
              {/* Outer Ring */}
              <div className="w-[80vh] h-[80vh] rounded-full border-[12px] border-[#FF8A00]/5 flex items-center justify-center">
                {/* Inner Ring */}
                <div className="w-[65vh] h-[65vh] rounded-full border-[4px] border-[#FF8A00]/10 flex items-center justify-center relative shadow-[inset_0_0_50px_rgba(255,138,0,0.05)]">
                  {/* Geometric Diamonds */}
                  <div className="absolute w-[45vh] h-[45vh] border-[2px] border-[#FF8A00]/20 rotate-45" />
                  <div className="absolute w-[45vh] h-[45vh] border-[2px] border-[#FF8A00]/20 rotate-[22.5deg]" />
                  <div className="absolute w-[45vh] h-[45vh] border-[2px] border-[#FF8A00]/20 rotate-[67.5deg]" />
                  <div className="absolute w-[45vh] h-[45vh] border-[2px] border-[#FF8A00]/20 rotate-[90deg]" />
                  
                  {/* Core Ring */}
                  <div className="absolute w-[30vh] h-[30vh] rounded-full border-[2px] border-[#FF8A00]/30 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                    <div className="w-[15vh] h-[15vh] rounded-full border border-[#FF8A00]/40" />
                  </div>
                </div>
              </div>
              
              {/* Center Emblem (Logo) */}
              <div className="absolute flex flex-col items-center justify-center bg-white rounded-full w-[20vh] h-[20vh] border-[6px] border-[#FF8A00]/30 shadow-[0_0_40px_rgba(255,138,0,0.15)] z-20">
                <span className="text-[#1A1A1A] font-bold text-[2.5vh] tracking-[0.15em] uppercase">Gokul</span>
                <span className="text-[#FF8A00] font-light text-[1.5vh] tracking-[0.2em] uppercase">Square</span>
              </div>
            </div>
          </div>

          {/* Left Door Handle */}
          {isTravelling && (
            <div className="w-1.5 h-64 bg-gradient-to-b from-[#FF8A00]/20 via-[#FF8A00] to-[#FF8A00]/20 rounded-full mr-4 shadow-[0_0_15px_rgba(255,138,0,0.4)] relative z-10" />
          )}
        </motion.div>
        
        {/* Right Door */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: isTravelling ? "50%" : "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="h-full bg-white border-l border-[#FF8A00]/30 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex items-center justify-start overflow-hidden ml-auto relative"
        >
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-overlay" />
          
          {/* Orange door frame trim */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-l from-transparent to-[#FF8A00]/10" />
          
          {/* Spectacular Split Art Design (Right Half) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-0">
            <div className="relative flex items-center justify-center pointer-events-none">
              {/* Outer Ring */}
              <div className="w-[80vh] h-[80vh] rounded-full border-[12px] border-[#FF8A00]/5 flex items-center justify-center">
                {/* Inner Ring */}
                <div className="w-[65vh] h-[65vh] rounded-full border-[4px] border-[#FF8A00]/10 flex items-center justify-center relative shadow-[inset_0_0_50px_rgba(255,138,0,0.05)]">
                  {/* Geometric Diamonds */}
                  <div className="absolute w-[45vh] h-[45vh] border-[2px] border-[#FF8A00]/20 rotate-45" />
                  <div className="absolute w-[45vh] h-[45vh] border-[2px] border-[#FF8A00]/20 rotate-[22.5deg]" />
                  <div className="absolute w-[45vh] h-[45vh] border-[2px] border-[#FF8A00]/20 rotate-[67.5deg]" />
                  <div className="absolute w-[45vh] h-[45vh] border-[2px] border-[#FF8A00]/20 rotate-[90deg]" />
                  
                  {/* Core Ring */}
                  <div className="absolute w-[30vh] h-[30vh] rounded-full border-[2px] border-[#FF8A00]/30 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                    <div className="w-[15vh] h-[15vh] rounded-full border border-[#FF8A00]/40" />
                  </div>
                </div>
              </div>
              
              {/* Center Emblem (Logo) */}
              <div className="absolute flex flex-col items-center justify-center bg-white rounded-full w-[20vh] h-[20vh] border-[6px] border-[#FF8A00]/30 shadow-[0_0_40px_rgba(255,138,0,0.15)] z-20">
                <span className="text-[#1A1A1A] font-bold text-[2.5vh] tracking-[0.15em] uppercase">Gokul</span>
                <span className="text-[#FF8A00] font-light text-[1.5vh] tracking-[0.2em] uppercase">Square</span>
              </div>
            </div>
          </div>

          {/* Right Door Handle */}
          {isTravelling && (
            <div className="w-1.5 h-64 bg-gradient-to-b from-[#FF8A00]/20 via-[#FF8A00] to-[#FF8A00]/20 rounded-full ml-4 shadow-[0_0_15px_rgba(255,138,0,0.4)] relative z-10" />
          )}
        </motion.div>
      </div>

    </div>
  );
}
