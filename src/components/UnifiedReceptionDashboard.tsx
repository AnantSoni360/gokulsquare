"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Users, Calendar, Utensils, BedDouble } from "lucide-react";

type RequestStatus = "pending" | "approved" | "rejected";
type RequestType = "dining" | "lodging";

interface BaseRequest {
  id: string;
  type: RequestType;
  name: string;
  guests: number;
  status: RequestStatus;
}

interface DiningRequest extends BaseRequest {
  type: "dining";
  time: string;
  date: string;
  table: string;
  occasion: string;
}

interface LodgingRequest extends BaseRequest {
  type: "lodging";
  room: string;
  checkIn: string;
  checkOut: string;
  purpose: string;
  email: string;
  phone: string;
}

type ReservationRequest = DiningRequest | LodgingRequest;

export function UnifiedReceptionDashboard() {
  const [filter, setFilter] = useState<"all" | "dining" | "lodging">("all");
  
  const [requests, setRequests] = useState<ReservationRequest[]>([
    { id: "R1", type: "dining", name: "Anant", guests: 2, time: "7:30 PM", date: "Today", table: "Window Seat", occasion: "None", status: "pending" },
    { id: "L1", type: "lodging", name: "Rahul S.", guests: 4, room: "Luxury Suite", checkIn: "10 July", checkOut: "12 July", purpose: "Leisure", email: "rahul@example.com", phone: "+91 9876543211", status: "pending" },
    { id: "R2", type: "dining", name: "Riya", guests: 5, time: "8:00 PM", date: "Today", table: "Center", occasion: "Birthday", status: "pending" },
    { id: "L2", type: "lodging", name: "Priya M.", guests: 1, room: "Deluxe Room", checkIn: "2 July", checkOut: "3 July", purpose: "Business", email: "priya@example.com", phone: "+91 9876543212", status: "approved" },
    { id: "R3", type: "dining", name: "Kiran M.", guests: 2, time: "6:00 PM", date: "Tomorrow", table: "Private Booth", occasion: "Anniversary", status: "approved" },
  ]);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: action } : req));
  };

  const filteredRequests = requests.filter(r => filter === "all" ? true : r.type === filter);
  
  const pendingRequests = filteredRequests.filter(r => r.status === "pending");
  const processedRequests = filteredRequests.filter(r => r.status !== "pending");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] px-6 md:px-12 pt-32 md:pt-40 pb-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-end border-b border-[#E5E7EB] pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Central Reception</h1>
            <p className="text-[#6B7280] mt-1 text-lg">Manage all property reservations across Dining and Lodging.</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#FF8A00]">Gokul Square</p>
            <p className="text-xs text-[#6B7280] flex items-center justify-end gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Updates
            </p>
          </div>
        </header>

        {/* Filters */}
        <div className="flex gap-4 mb-10">
          <button onClick={() => setFilter("all")} className={`px-6 py-2 rounded-full font-semibold transition-colors ${filter === "all" ? "bg-[#1A1A1A] text-white" : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#1A1A1A]"}`}>All Requests</button>
          <button onClick={() => setFilter("lodging")} className={`px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 ${filter === "lodging" ? "bg-indigo-600 text-white border-transparent" : "bg-white border border-[#E5E7EB] text-indigo-600 hover:bg-indigo-50"}`}>
            <BedDouble size={18} /> Lodging
          </button>
          <button onClick={() => setFilter("dining")} className={`px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 ${filter === "dining" ? "bg-[#FF8A00] text-white border-transparent" : "bg-white border border-[#E5E7EB] text-[#FF8A00] hover:bg-[#FFF4E5]"}`}>
            <Utensils size={18} /> Dining
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Pending Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Action Required</h2>

            <div className="space-y-6">
              <AnimatePresence>
                {pendingRequests.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#6B7280] p-12 border-2 border-dashed border-[#E5E7EB] rounded-[24px] text-center">
                    <Check className="w-12 h-12 mx-auto mb-4 text-[#E5E7EB]" />
                    <p className="text-xl">You're all caught up!</p>
                    <p className="text-sm">No pending requests at the moment.</p>
                  </motion.div>
                )}
                {pendingRequests.map(req => {
                  const isLodging = req.type === "lodging";
                  const colorClass = isLodging ? "text-indigo-600 bg-indigo-50 border-indigo-200" : "text-[#FF8A00] bg-[#FF8A00]/10 border-[#FF8A00]/20";
                  
                  return (
                    <motion.div 
                      key={req.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                      className={`bg-white p-6 md:p-8 rounded-[24px] border-2 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${isLodging ? 'border-indigo-50 hover:border-indigo-100' : 'border-[#FF8A00]/5 hover:border-[#FF8A00]/10'}`}
                    >
                      {/* Top Type Indicator */}
                      <div className={`absolute top-0 right-0 rounded-bl-2xl px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${colorClass}`}>
                        {isLodging ? <BedDouble size={14} /> : <Utensils size={14} />}
                        {req.type}
                      </div>

                      <div className="mb-6 border-b border-[#E5E7EB] pb-6 mt-4">
                        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-1">{req.name}</h3>
                        <p className="text-[#6B7280] text-sm">
                          {isLodging ? `${(req as LodgingRequest).email} • ${(req as LodgingRequest).phone}` : `ID: #${req.id}`}
                        </p>
                      </div>

                      {isLodging ? (
                        // Lodging Details
                        <>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E5E7EB]/50">
                              <div className="flex items-center gap-2 text-[#6B7280] mb-1"><Calendar className="w-4 h-4 text-indigo-500" /> Check-in</div>
                              <span className="font-semibold text-[#1A1A1A]">{(req as LodgingRequest).checkIn}</span>
                            </div>
                            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E5E7EB]/50">
                              <div className="flex items-center gap-2 text-[#6B7280] mb-1"><Calendar className="w-4 h-4 text-indigo-500" /> Check-out</div>
                              <span className="font-semibold text-[#1A1A1A]">{(req as LodgingRequest).checkOut}</span>
                            </div>
                            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E5E7EB]/50">
                              <div className="flex items-center gap-2 text-[#6B7280] mb-1"><Users className="w-4 h-4 text-indigo-500" /> Guests</div>
                              <span className="font-semibold text-[#1A1A1A]">{req.guests}</span>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                              <div className="flex items-center gap-2 text-indigo-700 mb-1 font-semibold uppercase tracking-wider text-[10px]">Room Type</div>
                              <span className="font-bold text-indigo-900">{(req as LodgingRequest).room}</span>
                            </div>
                          </div>
                          {((req as LodgingRequest).purpose) && (
                            <div className="mb-6 p-4 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl text-sm">
                              <span className="font-semibold text-[#1A1A1A]">Purpose:</span> {(req as LodgingRequest).purpose}
                            </div>
                          )}
                        </>
                      ) : (
                        // Dining Details
                        <>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E5E7EB]/50">
                              <div className="flex items-center gap-2 text-[#6B7280] mb-1"><Calendar className="w-4 h-4 text-[#FF8A00]" /> Date</div>
                              <span className="font-semibold text-[#1A1A1A]">{(req as DiningRequest).date}</span>
                            </div>
                            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E5E7EB]/50">
                              <div className="flex items-center gap-2 text-[#6B7280] mb-1"><Clock className="w-4 h-4 text-[#FF8A00]" /> Time</div>
                              <span className="font-semibold text-[#1A1A1A]">{(req as DiningRequest).time}</span>
                            </div>
                            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E5E7EB]/50">
                              <div className="flex items-center gap-2 text-[#6B7280] mb-1"><Users className="w-4 h-4 text-[#FF8A00]" /> Guests</div>
                              <span className="font-semibold text-[#1A1A1A]">{req.guests}</span>
                            </div>
                            <div className="bg-[#FF8A00]/10 p-4 rounded-xl border border-[#FF8A00]/20">
                              <div className="flex items-center gap-2 text-[#FF8A00] mb-1 font-semibold uppercase tracking-wider text-[10px]">Table</div>
                              <span className="font-bold text-[#D66D38]">{(req as DiningRequest).table}</span>
                            </div>
                          </div>
                          {((req as DiningRequest).occasion !== "None") && (
                            <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-xl text-sm text-purple-900">
                              <span className="font-bold">Special Occasion:</span> {(req as DiningRequest).occasion}
                            </div>
                          )}
                        </>
                      )}

                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleAction(req.id, "approved")}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                          <Check className="w-5 h-5" /> Approve & Block
                        </button>
                        <button 
                          onClick={() => handleAction(req.id, "rejected")}
                          className="flex-1 bg-white border-2 border-[#E5E7EB] hover:border-red-500 hover:text-red-500 hover:bg-red-50 text-[#1A1A1A] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <X className="w-5 h-5" /> Reject
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Processed Column */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-[#1A1A1A]">Recent Activity</h2>
            <div className="space-y-4">
              {processedRequests.map(req => {
                const isLodging = req.type === "lodging";
                return (
                  <motion.div 
                    key={req.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-sm flex items-center gap-4 relative overflow-hidden"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${isLodging ? 'bg-indigo-500' : 'bg-[#FF8A00]'}`} />
                    
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${req.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {req.status === 'approved' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A1A]">{req.name}</p>
                      <p className="text-xs text-[#6B7280] mt-1 flex items-center gap-1">
                        {isLodging ? <BedDouble size={12} className="text-indigo-500" /> : <Utensils size={12} className="text-[#FF8A00]" />}
                        {isLodging ? (req as LodgingRequest).room : (req as DiningRequest).table}
                      </p>
                      <p className={`text-[10px] uppercase tracking-widest font-semibold mt-2 ${req.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                        {req.status}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
