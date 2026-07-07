import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-pure-white text-almost-black pt-24 pb-12 border-t-2 border-premium-orange">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-16 md:gap-12">
        
        {/* Left: Brand & Links */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 w-full md:w-auto">
          <div>
            <Link href="/" className="flex items-center gap-4 mb-8 group inline-flex">
              <Image src="/logo.png" alt="Gokul Square" width={40} height={40} className="h-10 w-auto object-contain mix-blend-multiply" />
              <span className="text-[24px] font-bold tracking-tight text-almost-black group-hover:text-premium-orange transition-colors">
                Gokul Square
              </span>
            </Link>
            <p className="text-[14px] text-slate-gray max-w-xs leading-relaxed">
              Toranagallu's premium commercial destination. Retail, modern offices, luxury lodging, and fine dining.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-4 text-[14px] font-medium text-slate-gray">
              <span className="text-[12px] font-bold uppercase tracking-widest text-almost-black mb-2">Explore</span>
              <Link href="/spaces" className="hover:text-premium-orange transition-colors">Commercial Spaces</Link>
              <Link href="/lodging" className="hover:text-premium-orange transition-colors">Luxury Lodging</Link>
              <Link href="/restaurant" className="hover:text-premium-orange transition-colors">Restaurant</Link>
            </div>
            
            <div className="flex flex-col gap-4 text-[14px] font-medium text-slate-gray">
              <span className="text-[12px] font-bold uppercase tracking-widest text-almost-black mb-2">Company</span>
              <Link href="/about" className="hover:text-premium-orange transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-premium-orange transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-premium-orange transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-4">
          <a href="#" className="w-12 h-12 rounded-full border border-soft-gray flex items-center justify-center text-slate-gray hover:text-premium-orange hover:border-premium-orange hover:bg-light-gray transition-all shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-soft-gray flex items-center justify-center text-slate-gray hover:text-premium-orange hover:border-premium-orange hover:bg-light-gray transition-all shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-soft-gray flex items-center justify-center text-slate-gray hover:text-premium-orange hover:border-premium-orange hover:bg-light-gray transition-all shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-soft-gray flex items-center justify-center text-slate-gray hover:text-premium-orange hover:border-premium-orange hover:bg-light-gray transition-all shadow-sm">
            <MapPin size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
}
