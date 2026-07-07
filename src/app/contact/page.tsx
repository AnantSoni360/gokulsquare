"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-pure-white pt-32 pb-24">
      
      {/* Header */}
      <section className="bg-pure-white pt-12 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-[56px] md:text-[80px] font-bold text-almost-black tracking-tight leading-[1.1] mb-8">
              Get in Touch.
            </h1>
            <p className="text-[18px] md:text-[20px] text-slate-gray leading-relaxed">
              Whether you are looking to lease a commercial space, book a stay, or explore our dining options, our team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content: 2 Columns */}
      <section className="bg-pure-white pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Info & Map */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-12"
            >
              
              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className="w-12 h-12 bg-light-gray rounded-full flex items-center justify-center mb-6">
                    <MapPin className="text-premium-orange" size={24} />
                  </div>
                  <h4 className="text-[14px] font-bold uppercase tracking-widest text-slate-gray mb-3">Location</h4>
                  <p className="text-[16px] text-almost-black font-medium leading-relaxed">
                    Gokul Square<br />
                    Ballari Sandur Road<br />
                    Toranagallu – 583123<br />
                    Ballari District, Karnataka
                  </p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-light-gray rounded-full flex items-center justify-center mb-6">
                    <Phone className="text-premium-orange" size={24} />
                  </div>
                  <h4 className="text-[14px] font-bold uppercase tracking-widest text-slate-gray mb-3">Phone</h4>
                  <p className="text-[16px] text-almost-black font-medium leading-relaxed mb-2">
                    Leasing: +91 98765 43210
                  </p>
                  <p className="text-[16px] text-almost-black font-medium leading-relaxed">
                    Reception: +91 98765 43211
                  </p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-light-gray rounded-full flex items-center justify-center mb-6">
                    <Mail className="text-premium-orange" size={24} />
                  </div>
                  <h4 className="text-[14px] font-bold uppercase tracking-widest text-slate-gray mb-3">Email</h4>
                  <p className="text-[16px] text-almost-black font-medium leading-relaxed">
                    hello@gokulsquare.com
                  </p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-light-gray rounded-full flex items-center justify-center mb-6">
                    <Clock className="text-premium-orange" size={24} />
                  </div>
                  <h4 className="text-[14px] font-bold uppercase tracking-widest text-slate-gray mb-3">Hours</h4>
                  <p className="text-[16px] text-almost-black font-medium leading-relaxed">
                    Mon-Sat: 9:00 AM - 7:00 PM<br />
                    Sunday: Closed (Leasing)
                  </p>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-light-gray relative border border-soft-gray premium-shadow group">
                <iframe 
                  src="https://maps.google.com/maps?q=15.1934407,76.677347&z=17&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale-[10%] opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                ></iframe>
              </div>

            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-light-gray rounded-[32px] p-8 md:p-12 border border-soft-gray">
                <h3 className="text-[32px] font-bold text-almost-black tracking-tight mb-8">
                  Send an Inquiry
                </h3>
                
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold uppercase tracking-widest text-slate-gray">First Name</label>
                      <input 
                        type="text" 
                        placeholder="John"
                        className="w-full bg-pure-white border border-soft-gray rounded-[12px] px-6 py-4 outline-none focus:border-premium-orange transition-colors text-almost-black"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[14px] font-bold uppercase tracking-widest text-slate-gray">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Doe"
                        className="w-full bg-pure-white border border-soft-gray rounded-[12px] px-6 py-4 outline-none focus:border-premium-orange transition-colors text-almost-black"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase tracking-widest text-slate-gray">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91"
                      className="w-full bg-pure-white border border-soft-gray rounded-[12px] px-6 py-4 outline-none focus:border-premium-orange transition-colors text-almost-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase tracking-widest text-slate-gray">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-pure-white border border-soft-gray rounded-[12px] px-6 py-4 outline-none focus:border-premium-orange transition-colors text-almost-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase tracking-widest text-slate-gray">I'm interested in</label>
                    <select className="w-full bg-pure-white border border-soft-gray rounded-[12px] px-6 py-4 outline-none focus:border-premium-orange transition-colors text-almost-black appearance-none cursor-pointer">
                      <option>Leasing a Commercial Space</option>
                      <option>Booking a Luxury Room</option>
                      <option>Restaurant Reservations</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold uppercase tracking-widest text-slate-gray">Message</label>
                    <textarea 
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      className="w-full bg-pure-white border border-soft-gray rounded-[12px] px-6 py-4 outline-none focus:border-premium-orange transition-colors text-almost-black resize-none"
                    ></textarea>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-5 mt-4 rounded-full bg-almost-black text-pure-white font-bold text-[16px] hover:bg-premium-orange transition-colors group">
                    Submit Inquiry <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <p className="text-center text-slate-gray text-[12px] mt-2">
                    By submitting this form, you agree to our Privacy Policy.
                  </p>

                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
