"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Calendar, Users, DoorOpen, Search, ChevronDown } from "lucide-react";

export function LodgingHero() {
  const [isMounted, setIsMounted] = useState(false);
  
  // State for editable mock form
  const [checkIn, setCheckIn] = useState("2026-07-05");
  const [checkOut, setCheckOut] = useState("2026-07-07");
  const [guests, setGuests] = useState("2 Adults");
  const [rooms, setRooms] = useState("1 Room");

  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Select Date";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleDateClick = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      try {
        // Modern browsers support showPicker() to open the calendar dropdown
        if ('showPicker' in HTMLInputElement.prototype) {
          ref.current.showPicker();
        } else {
          ref.current.focus();
        }
      } catch (e) {
        ref.current.focus();
      }
    }
  };

  if (!isMounted) return <div className="h-screen w-full bg-[#FAFAFA]" />;

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center bg-[#FAFAFA]">
      {/* Premium Minimal Luxury Animated CSS Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base light background */}
        <div className="absolute inset-0 bg-[#FAFAFA]" />
        
        {/* Animated glowing orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#FF8A00]/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFC857]/15 rounded-full blur-[100px]"
        />
        
        {/* Optional subtle grid/grain overlay to make it feel tactile */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-overlay" />
      </div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 mt-20 pb-12 lg:pb-0">
        
        {/* Left Side Content */}
        <div className="flex-1 text-left max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold text-[#1A1A1A] mb-6 leading-[1.1] tracking-tight">
              Stay Above <br />
              <span className="text-[#FF8A00] relative">
                The City
                <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFC857]/30 -z-10 rounded-full" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#1A1A1A]/80 mb-2 font-medium">Premium Rooms. Modern Comfort.</p>
            <p className="text-xl md:text-2xl text-[#1A1A1A]/60 mb-8 font-light">Exceptional Hospitality.</p>
            
            <p className="text-lg text-[#6B7280] mb-10 max-w-md leading-relaxed">
              Experience a relaxing stay inside Gokul Square. 
              Enjoy seamless access to shopping, dining, and luxury living.
            </p>
            
            <a href="#rooms" className="inline-flex items-center justify-center px-10 py-5 bg-[#1A1A1A] text-white hover:bg-[#FF8A00] rounded-full font-bold transition-all duration-300 shadow-xl group hover:shadow-[#FF8A00]/30 hover:-translate-y-1">
              Find Your Room
            </a>
          </motion.div>
        </div>

        {/* Right Side: Floating Booking Card */}
        <motion.div 
          className="hidden lg:block w-[420px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        >
          <div className="bg-white p-8 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#E5E7EB] relative overflow-hidden group">
            {/* Hover card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#FF8A00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-8">Check Availability</h3>
            
            <div className="space-y-4 relative z-10">
              
              {/* Custom Check-in Input */}
              <div 
                onClick={() => handleDateClick(checkInRef)}
                className="relative bg-[#FAFAFA] rounded-2xl p-4 flex items-center justify-between border border-[#E5E7EB] hover:border-[#FF8A00] transition-colors cursor-pointer group"
              >
                <input 
                  ref={checkInRef}
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" 
                  style={{ visibility: 'hidden', position: 'absolute', zIndex: -1 }}
                />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#6B7280] group-hover:text-[#FF8A00] transition-colors">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider block">Check-in</span>
                    <p className="text-[#1A1A1A] font-bold mt-0.5 text-base">{formatDate(checkIn)}</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#6B7280]" />
              </div>

              {/* Custom Check-out Input */}
              <div 
                onClick={() => handleDateClick(checkOutRef)}
                className="relative bg-[#FAFAFA] rounded-2xl p-4 flex items-center justify-between border border-[#E5E7EB] hover:border-[#FF8A00] transition-colors cursor-pointer group"
              >
                <input 
                  ref={checkOutRef}
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" 
                  style={{ visibility: 'hidden', position: 'absolute', zIndex: -1 }}
                />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#6B7280] group-hover:text-[#FF8A00] transition-colors">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider block">Check-out</span>
                    <p className="text-[#1A1A1A] font-bold mt-0.5 text-base">{formatDate(checkOut)}</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#6B7280]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Custom Guests Input */}
                <label className="relative bg-[#FAFAFA] rounded-2xl p-4 flex items-center justify-between border border-[#E5E7EB] hover:border-[#FF8A00] transition-colors cursor-pointer block">
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none z-10"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="3 Adults">3 Adults</option>
                    <option value="Family (4+)">Family (4+)</option>
                  </select>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider block flex items-center gap-1">
                      <Users className="w-3 h-3" /> Guests
                    </span>
                    <p className="text-[#1A1A1A] font-bold mt-0.5">{guests}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                </label>

                {/* Custom Rooms Input */}
                <label className="relative bg-[#FAFAFA] rounded-2xl p-4 flex items-center justify-between border border-[#E5E7EB] hover:border-[#FF8A00] transition-colors cursor-pointer block">
                  <select 
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none z-10"
                  >
                    <option value="1 Room">1 Room</option>
                    <option value="2 Rooms">2 Rooms</option>
                    <option value="3+ Rooms">3+ Rooms</option>
                  </select>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider block flex items-center gap-1">
                      <DoorOpen className="w-3 h-3" /> Rooms
                    </span>
                    <p className="text-[#1A1A1A] font-bold mt-0.5">{rooms}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                </label>
              </div>

              <a href="#rooms" className="w-full py-5 mt-6 bg-gradient-to-r from-[#FF8A00] to-[#FFC857] text-white font-bold rounded-2xl shadow-lg hover:shadow-[#FF8A00]/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 block text-center border-none">
                <Search className="w-5 h-5" />
                Search Rooms
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
