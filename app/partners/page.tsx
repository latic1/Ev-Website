"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PartnersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/partners" className="text-2xl font-bold text-[#3975ac] tracking-tight">
              ZUPUTO
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              {[
                { href: "/partners", label: "Home" },
                { href: "/partners", label: "About" },
                { href: "/partners", label: "Services" },
                { href: "/partners", label: "Pricing" },
                { href: "/partners", label: "Partners", active: true },
                { href: "/partners", label: "Blog" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors ${
                    item.active 
                      ? "text-[#3975ac]" 
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#3975ac] rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/partners"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/partners"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white bg-[#3975ac] hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full  text-[#3975ac] text-sm font-semibold font-sans tracking-wide uppercase mb-6">
                Our Partners
              </span>
              <h1 className="mx-auto max-w-3xl text-4xl md:text-4xl leading-normal font-bold text-gray-900  font-sans">
                Collaborating with Industry Leaders to Deliver Excellence
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg font-sans">
                We partner with top organizations to bring you unparalleled solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 max-w-5xl mx-auto">
              {[
                { src: "/clientpartnerlogos/adjeley jewelry logo.webp", alt: "Adjeley Jewelry" },
                { src: "/clientpartnerlogos/African Angels Academy.png", alt: "African Angels Academy" },
                { src: "/clientpartnerlogos/MDF LOGO.png", alt: "MDF Africa" },
                { src: "/clientpartnerlogos/MEST-Logo.png", alt: "MEST" },
                { src: "/clientpartnerlogos/Ace-avenue.png", alt: "Ace Avenue" },
              ].map((partner, index) => (
                <motion.div
                  key={partner.alt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative rounded-xl bg-white p-6 shadow-md transition-all duration-300 group-hover:shadow-lg">
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className="w-full h-32 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      <div className="bg-gray-900 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                        {partner.alt}
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}