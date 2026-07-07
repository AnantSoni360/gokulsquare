"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { GlassCard } from "./GlassCard";
import { PremiumButton } from "./PremiumButton";
import { Loader2, CheckCircle2 } from "lucide-react";

type ReservationState = "idle" | "loading" | "pending" | "confirmed" | "rejected";

export function ReservationSection() {
  const [status, setStatus] = useState<ReservationState>("idle");
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    table: "W1",
    request: ""
  });

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
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section className="bg-[#FAFAFA] relative overflow-hidden" id="reserve">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gradient-to-r from-[#FF8A00]/5 to-[#FFC857]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        
        <GlassCard className="p-8 md:p-12" hoverGlow={false}>
          <AnimatePresence mode="wait">
            
            {status === "idle" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-light mb-2">Reserve Your Table</h2>
                  <p className="text-[#1A1A1A]/60">Select your details for a premium experience.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl px-4 pt-6 pb-2 text-[#1A1A1A] outline-none focus:border-[#FF8A00] transition-colors peer" />
                      <label className="absolute left-4 top-4 text-xs text-[#6B7280] uppercase tracking-wider font-semibold transition-all peer-focus:text-[#FF8A00] peer-focus:top-2 peer-focus:text-[10px] peer-valid:top-2 peer-valid:text-[10px]">Name</label>
                    </div>
                    
                    <div className="relative group">
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl px-4 pt-6 pb-2 text-[#1A1A1A] outline-none focus:border-[#FF8A00] transition-colors peer" />
                      <label className="absolute left-4 top-4 text-xs text-[#6B7280] uppercase tracking-wider font-semibold transition-all peer-focus:text-[#FF8A00] peer-focus:top-2 peer-focus:text-[10px] peer-valid:top-2 peer-valid:text-[10px]">Email Address</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl px-4 pt-6 pb-2 text-[#1A1A1A] outline-none focus:border-[#FF8A00] transition-colors peer" />
                    <label className="absolute left-4 top-4 text-xs text-[#6B7280] uppercase tracking-wider font-semibold transition-all peer-focus:text-[#FF8A00] peer-focus:top-2 peer-focus:text-[10px] peer-valid:top-2 peer-valid:text-[10px]">Phone Number</label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative group">
                      <select name="guests" value={formData.guests} onChange={handleInputChange} className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl px-4 pt-6 pb-2 text-[#1A1A1A] outline-none focus:border-[#FF8A00] transition-colors appearance-none">
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guests</option>)}
                      </select>
                      <label className="absolute left-4 top-2 text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Guests</label>
                    </div>
                    <div className="relative group">
                      <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl px-4 pt-6 pb-2 text-[#1A1A1A] outline-none focus:border-[#FF8A00] transition-colors" />
                      <label className="absolute left-4 top-2 text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Date</label>
                    </div>
                    <div className="relative group">
                      <input type="time" name="time" required value={formData.time} onChange={handleInputChange} className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl px-4 pt-6 pb-2 text-[#1A1A1A] outline-none focus:border-[#FF8A00] transition-colors" />
                      <label className="absolute left-4 top-2 text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Time</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <select name="table" value={formData.table} onChange={handleInputChange} className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl px-4 pt-6 pb-2 text-[#1A1A1A] outline-none focus:border-[#FF8A00] transition-colors appearance-none">
                      <option value="W1">W1 (Window)</option>
                      <option value="W2">W2 (Window)</option>
                      <option value="C1">C1 (Center)</option>
                      <option value="C2">C2 (Center)</option>
                      <option value="P1">P1 (Premium)</option>
                    </select>
                    <label className="absolute left-4 top-2 text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Select Table</label>
                  </div>

                  <div className="relative group">
                    <textarea name="request" rows={2} value={formData.request} onChange={handleInputChange} className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl px-4 pt-6 pb-2 text-[#1A1A1A] outline-none focus:border-[#FF8A00] transition-colors resize-none peer" />
                    <label className="absolute left-4 top-4 text-xs text-[#6B7280] uppercase tracking-wider font-semibold transition-all peer-focus:text-[#FF8A00] peer-focus:top-2 peer-focus:text-[10px] peer-valid:top-2 peer-valid:text-[10px]">Special Request</label>
                  </div>

                  <PremiumButton type="submit" className="w-full py-4 text-lg mt-8" size="lg">
                    Reserve Now
                  </PremiumButton>
                </form>
              </motion.div>
            )}

            {status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <Loader2 className="w-12 h-12 text-[#FF8A00] animate-spin mb-6" />
                <h3 className="text-2xl font-light mb-2">Request Sent</h3>
                <p className="text-[#6B7280] mb-8">Waiting for approval from Reception via WhatsApp.</p>
                <div className="flex flex-col gap-4 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-4 text-sm bg-white/50 p-3 rounded-lg border border-[#FF8A00]">
                    <CheckCircle2 className="w-5 h-5 text-[#FF8A00]" />
                    <span>Request Submitted</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm bg-white/50 p-3 rounded-lg border border-[#E5E7EB]">
                    <Loader2 className="w-5 h-5 text-[#6B7280] animate-spin" />
                    <span>Reception Reviewing</span>
                  </div>
                </div>
              </motion.div>
            )}

            {status === "pending" && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-[#FF8A00]/10 rounded-full flex items-center justify-center mb-6 border-4 border-[#FF8A00]/20 animate-pulse">
                  <div className="w-4 h-4 bg-[#FF8A00] rounded-full" />
                </div>
                <h3 className="text-2xl font-light mb-2">Reservation Request Sent</h3>
                <div className="bg-[#FFC857]/20 text-[#FF8A00] px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider mb-6 inline-block">
                  Pending Approval
                </div>
                <p className="text-[#6B7280] max-w-sm">Our reception team is reviewing your request. You will receive a WhatsApp confirmation shortly.</p>
              </motion.div>
            )}

            {status === "confirmed" && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                </motion.div>
                <h3 className="text-3xl font-light mb-4">Reservation Confirmed!</h3>
                
                <div className="w-full bg-green-50 border border-green-100 rounded-2xl p-6 text-left mb-8 shadow-sm">
                  <p className="text-sm text-green-800 font-semibold mb-4 uppercase tracking-wider border-b border-green-200 pb-2">Booking Details</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-600/70">Name</p>
                      <p className="font-medium text-green-900">{formData.name || 'Guest'}</p>
                    </div>
                    <div>
                      <p className="text-green-600/70">Table No.</p>
                      <p className="font-medium text-green-900">{formData.table}</p>
                    </div>
                    <div>
                      <p className="text-green-600/70">Date</p>
                      <p className="font-medium text-green-900">{formData.date || 'Today'}</p>
                    </div>
                    <div>
                      <p className="text-green-600/70">Time</p>
                      <p className="font-medium text-green-900">{formData.time || '7:30 PM'}</p>
                    </div>
                  </div>
                </div>

                <PremiumButton onClick={() => setStatus("idle")} className="w-full mt-4">
                  Book Another Table
                </PremiumButton>
              </motion.div>
            )}

            {status === "rejected" && (
              <motion.div
                key="rejected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-3xl font-light mb-4">Unavailable</h3>
                <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
                  Sorry, we could not accommodate your request for table {formData.table} at this time.
                </p>
                <PremiumButton onClick={() => setStatus("idle")} className="w-full">
                  Try Different Time
                </PremiumButton>
              </motion.div>
            )}

          </AnimatePresence>
        </GlassCard>
      </div>
    </Section>
  );
}
