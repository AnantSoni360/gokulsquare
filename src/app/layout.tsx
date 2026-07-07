import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ElevatorSystem } from "@/components/layout/ElevatorSystem";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gokul Square | Where Businesses Find Their Perfect Space",
  description: "Toranagallu's premium commercial destination. Retail, modern offices, luxury lodging, and fine dining.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-pure-white text-almost-black">
        <Navbar />
        <ElevatorSystem>
          <main className="flex-grow">{children}</main>
        </ElevatorSystem>
        <Footer />
      </body>
    </html>
  );
}
