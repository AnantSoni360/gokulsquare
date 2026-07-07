"use client";

import { CheckCircle2, MapPin, Calendar, Clock, Download, XCircle } from "lucide-react";
import Image from "next/image";

export default function MyBookingsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-[#E5E7EB] pb-6">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">My Bookings</h1>
          <p className="text-[#6B7280] mt-1">Manage your upcoming and past stays.</p>
        </header>

        <div>
          <h2 className="text-xl font-bold mb-6 text-[#1A1A1A]">Upcoming Stay</h2>
          
          <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#E5E7EB] mb-12">
            <div className="h-48 w-full relative overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2000&auto=format&fit=crop" 
                alt="Room"
                fill
                className="object-cover"
              />
              <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 shadow-lg">
                <CheckCircle2 size={16} /> Confirmed
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-[#1A1A1A] mb-2">Premium King Room</h3>
                  <div className="flex items-center gap-2 text-[#6B7280] text-sm">
                    <MapPin size={16} className="text-[#FF8A00]" />
                    Gokul Square Lodging, Toranagallu
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm text-[#6B7280] uppercase tracking-widest font-semibold mb-1">Reservation ID</p>
                  <p className="text-2xl font-bold text-[#1A1A1A]">GS20260027</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#FAFAFA] p-6 rounded-2xl border border-[#E5E7EB] mb-8">
                <div>
                  <p className="text-xs text-[#6B7280] uppercase font-bold mb-1"><Calendar size={14} className="inline mr-1" /> Check-in</p>
                  <p className="font-semibold text-[#1A1A1A]">5 July 2026</p>
                  <p className="text-xs text-[#6B7280]">2:00 PM</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] uppercase font-bold mb-1"><Calendar size={14} className="inline mr-1" /> Check-out</p>
                  <p className="font-semibold text-[#1A1A1A]">7 July 2026</p>
                  <p className="text-xs text-[#6B7280]">11:00 AM</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] uppercase font-bold mb-1"><Clock size={14} className="inline mr-1" /> Duration</p>
                  <p className="font-semibold text-[#1A1A1A]">2 Nights</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] uppercase font-bold mb-1">Guests</p>
                  <p className="font-semibold text-[#1A1A1A]">2 Adults</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#1A1A1A] hover:bg-[#FF8A00] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <Download size={20} /> Download Reservation Pass
                </button>
                <button className="flex-1 bg-white border-2 border-[#E5E7EB] hover:border-[#1A1A1A] text-[#1A1A1A] py-4 rounded-xl font-bold flex items-center justify-center transition-colors">
                  Modify Request
                </button>
                <button className="px-6 py-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold flex items-center justify-center transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
