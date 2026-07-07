"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Spaces", href: "/spaces" },
    { name: "Lodging", href: "/lodging" },
    { name: "Dining", href: "/restaurant" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <div className={`pointer-events-auto transition-all duration-500 flex items-center justify-between w-full max-w-[1000px] rounded-full px-4 md:px-6 py-3 ${
          isScrolled 
            ? "bg-pure-white/95 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-soft-gray" 
            : "bg-pure-white/80 backdrop-blur-md shadow-sm border border-soft-gray/50"
        }`}>
          
          <div className="flex items-center gap-8 md:gap-12">
            {/* Logo */}
            <Link href="/" className="relative group flex items-center gap-3">
              <Image src="/logo.png" alt="Gokul Square" width={120} height={32} className="h-8 w-auto object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              <span className="text-[18px] font-bold tracking-tight text-almost-black group-hover:text-premium-orange transition-colors hidden sm:block">
                Gokul Square
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className={`text-[14px] font-medium transition-colors ${
                      isActive ? "text-premium-orange" : "text-slate-gray hover:text-almost-black"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sign In / CTA */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/admin" 
                className="text-[14px] font-medium text-slate-gray hover:text-almost-black transition-colors"
              >
                Owner Login
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-2.5 bg-premium-orange text-pure-white text-[14px] font-bold rounded-full hover:bg-almost-black transition-all shadow-md hover:shadow-lg"
              >
                Book Visit
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-almost-black focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
          
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-pure-white flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                <Image src="/logo.png" alt="Gokul Square" width={120} height={32} className="h-8 w-auto object-contain mix-blend-multiply" />
                <span className="text-[20px] font-bold tracking-tight text-almost-black">
                  Gokul Square
                </span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-almost-black bg-light-gray rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[24px] font-bold text-almost-black hover:text-premium-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-[1px] w-full bg-soft-gray my-4" />
              <Link 
                href="/admin" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[20px] font-bold text-slate-gray hover:text-almost-black transition-colors"
              >
                Owner Login
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex justify-center items-center py-4 bg-premium-orange text-pure-white text-[18px] font-bold rounded-full mt-4"
              >
                Book a Visit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
