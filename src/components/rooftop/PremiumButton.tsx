"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface PremiumButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function PremiumButton({
  className,
  children,
  variant = "primary",
  size = "md",
  ...props
}: PremiumButtonProps) {
  const baseStyles = "relative overflow-hidden rounded-full font-medium transition-all duration-300 flex items-center justify-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#FF8A00] to-[#FFC857] text-white shadow-lg shadow-[#FF8A00]/20 hover:shadow-[#FF8A00]/40",
    secondary: "bg-white text-[#1A1A1A] hover:bg-[#FAFAFA] shadow-md shadow-black/5",
    outline: "bg-transparent border border-white/50 text-white hover:bg-white/10 backdrop-blur-sm"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
}
