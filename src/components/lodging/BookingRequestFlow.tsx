"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Calendar as CalIcon, ChevronRight, XCircle } from "lucide-react";

type FlowState = "idle" | "loading" | "pending" | "confirmed" | "rejected";

export function BookingRequestFlow({ roomName = "Premium King Room" }) {
  const [status, setStatus] = useState<FlowState>("idle");
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    purpose: "Leisure",
    idType: "Aadhar",
    phone: "",
    email: "",
    requests: ""
  });

  // Mock Calendar State
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "pending" && reservationId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/reservation-status?id=${reservationId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === "CONFIRMED") {
              setStatus("confirmed");
            } else if (data.status === "REJECTED") {
              setStatus("rejected");
            }
          }
        } catch (e) {
          console.error("Polling error", e);
        }
      }, 3000); // Check every 3 seconds
    }
    return () => clearInterval(interval);
  }, [status, reservationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("/api/reserve-lodging", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, roomName })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setReservationId(data.reservation._id);
        setStatus("pending");
      } else {
        console.error("Error booking:", data.error);
        setStatus("idle");
        alert(`Failed: ${data.error}\n\nCheck Vercel logs or your MongoDB/Twilio config.`);
      }
    } catch (err) {
      console.error(err);
      setStatus("idle");
      alert("Something went wrong.");
    }
  };

  const handleChange = (e: any) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="py-12">
      <h3 className="text-3xl font-bold text-[#1A1A1A] mb-8">Request Reservation</h3>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* Left Col: Calendar & Form */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Custom Calendar UI */}
          <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[24px] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-[#1A1A1A] text-lg">July 2026</h4>
              <div className="flex gap-4 text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-white border border-[#E5E7EB] rounded-sm" /> Available</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#E5E7EB] rounded-sm" /> Booked</span>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-[#6B7280] mb-2">
              {['S','M','T','W','T','F','S'].map((d,i) => <div key={i}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                // Mock booked dates
                const isBooked = [4, 5, 12, 13, 25].includes(day);
                const isSelected = selectedDate === day;

                let bg = "bg-white border-[#E5E7EB] text-[#1A1A1A] hover:border-[#FF8A00]";
                if (isBooked) bg = "bg-[#E5E7EB] border-transparent text-[#9CA3AF] cursor-not-allowed";
                if (isSelected) bg = "bg-[#FF8A00] border-[#FF8A00] text-white shadow-md shadow-[#FF8A00]/40";

                return (
                  <button 
                    key={i} 
                    disabled={isBooked}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-xl border flex items-center justify-center font-bold transition-all duration-300 ${bg}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6 bg-white border border-[#E5E7EB] rounded-[24px] p-8 shadow-sm" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase font-bold text-[#6B7280] mb-2 block">Check-in</label>
                <input type="date" name="checkIn" required onChange={handleChange} className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none focus:border-[#FF8A00] transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-[#6B7280] mb-2 block">Check-out</label>
                <input type="date" name="checkOut" required onChange={handleChange} className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none focus:border-[#FF8A00] transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="text-xs uppercase font-bold text-[#6B7280] mb-2 block">Guests</label>
                <select name="guests" onChange={handleChange} className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none focus:border-[#FF8A00]">
                  <option>1</option><option>2</option><option>3</option><option>4</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-[#6B7280] mb-2 block">Purpose</label>
                <select name="purpose" onChange={handleChange} className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none focus:border-[#FF8A00]">
                  <option>Leisure</option><option>Business</option><option>Event</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-[#6B7280] mb-2 block">ID Type</label>
                <select name="idType" onChange={handleChange} className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none focus:border-[#FF8A00]">
                  <option>Aadhar</option><option>Passport</option><option>Driving License</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase font-bold text-[#6B7280] mb-2 block">Phone</label>
                <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none focus:border-[#FF8A00]" />
              </div>
              <div>
                <label className="text-xs uppercase font-bold text-[#6B7280] mb-2 block">Email</label>
                <input type="email" name="email" required onChange={handleChange} className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none focus:border-[#FF8A00]" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-[#6B7280] mb-2 block">Special Requests</label>
              <textarea name="requests" rows={3} onChange={handleChange} className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl px-4 py-3 outline-none focus:border-[#FF8A00] resize-none" placeholder="Early check-in, extra bed, etc." />
            </div>

            <button disabled={status !== "idle"} type="submit" className="w-full py-4 bg-[#1A1A1A] hover:bg-[#FF8A00] text-white font-bold rounded-xl transition-colors shadow-lg disabled:opacity-50 text-lg">
              Send Booking Request
            </button>
          </form>
        </div>

        {/* Right Col: Timeline & Status Box */}
        <div className="lg:col-span-2">
          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              
              {status === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[24px] p-8 text-center text-[#6B7280]">
                  <CalIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Complete the form to request your reservation. No payment is required until approval.</p>
                </motion.div>
              )}

              {status === "loading" && (
                <motion.div key="loading" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-white border border-[#E5E7EB] rounded-[24px] p-12 text-center shadow-lg">
                  <Loader2 className="w-12 h-12 text-[#FF8A00] animate-spin mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-[#1A1A1A] mb-2">Checking Availability...</h4>
                  <p className="text-[#6B7280]">Please wait while we process your request.</p>
                </motion.div>
              )}

              {status === "pending" && (
                <motion.div key="pending" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white border border-[#FF8A00]/30 rounded-[24px] p-8 shadow-xl shadow-[#FF8A00]/5">
                  <div className="w-16 h-16 bg-[#FF8A00]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#FF8A00]/20 animate-pulse">
                    <div className="w-4 h-4 bg-[#FF8A00] rounded-full" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#1A1A1A] text-center mb-2">Request Sent</h4>
                  <p className="text-[#6B7280] text-center mb-8">Waiting for approval from Reception via WhatsApp.</p>

                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#FF8A00] before:to-[#E5E7EB]">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-[#FF8A00] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                        <CheckCircle2 size={14} />
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-[#FF8A00] bg-[#FF8A00]/5 text-sm shadow-sm">
                        Request Submitted
                      </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-[#E5E7EB] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow animate-pulse">
                        <Loader2 size={14} className="animate-spin text-[#6B7280]" />
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-[#E5E7EB] bg-white text-sm">
                        Reception Reviewing
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-center text-[#6B7280] mt-8">Estimated response: Within 15 minutes.</p>
                </motion.div>
              )}

              {status === "confirmed" && (
                <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-green-200 rounded-[24px] p-8 shadow-2xl relative overflow-hidden text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/20 rounded-full blur-[50px] -z-10" />
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h4 className="text-3xl font-bold text-[#1A1A1A] mb-2">Confirmed!</h4>
                  <p className="text-[#6B7280] mb-8">Your stay has been confirmed.</p>

                  <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-6 text-left mb-8 space-y-4">
                    <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                      <span className="text-[#6B7280] text-sm">Reservation ID</span>
                      <span className="font-bold text-[#1A1A1A]">GS20260027</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5E7EB] pb-2">
                      <span className="text-[#6B7280] text-sm">Room</span>
                      <span className="font-bold text-[#1A1A1A]">{roomName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280] text-sm">Status</span>
                      <span className="font-bold text-green-600 bg-green-50 px-2 rounded uppercase text-xs flex items-center gap-1">Confirmed</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-[#FF8A00] text-white font-bold rounded-xl transition-transform hover:scale-105 shadow-lg shadow-[#FF8A00]/20 flex justify-center items-center gap-2">
                    Download Reservation <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {status === "rejected" && (
                <motion.div key="rejected" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-red-200 rounded-[24px] p-8 shadow-2xl relative overflow-hidden text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/20 rounded-full blur-[50px] -z-10" />
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                    <XCircle size={40} />
                  </motion.div>
                  <h4 className="text-3xl font-bold text-[#1A1A1A] mb-2">Unavailable</h4>
                  <p className="text-[#6B7280] mb-8">Sorry, we could not accommodate your request for these dates.</p>
                  <button onClick={() => setStatus("idle")} className="w-full py-4 bg-[#1A1A1A] text-white font-bold rounded-xl transition-transform hover:scale-105 shadow-lg flex justify-center items-center gap-2">
                    Try Different Dates
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
