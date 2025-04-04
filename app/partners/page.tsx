"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PartnersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#3975ac] tracking-tight">
              ZUPUTO
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/pricing", label: "Pricing" },
                { href: "/partners", label: "Partners", active: true },
                { href: "/blog", label: "Blog" },
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
                href="#"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Login
              </Link>
              <Link
                href="#"
                className="rounded-lg px-4 py-2 text-sm font-medium text-white bg-[#3975ac] hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full  text-[#3975ac] text-sm font-semibold tracking-wide uppercase mb-6">
                Our Partners
              </span>
              <h1 className="mx-auto max-w-3xl text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Collaborating with Industry Leaders to Deliver Excellence
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
                We partner with top organizations to bring you unparalleled solutions.
              </p>
            </motion.div>

            {/* Partners Grid - Fixed 3 columns with larger cards */}
            <div className="grid grid-cols-3 gap-10 max-w-5xl mx-auto">
              {[
                { src: "/clientpartnerlogos/adjeley jewelry logo.webp", alt: "Adjeley Jewelry" },
                { src: "/clientpartnerlogos/African Angels Academy.png", alt: "African Angels Academy" },
                { src: "/clientpartnerlogos/MDF LOGO.png", alt: "MDF" },
                { src: "/clientpartnerlogos/MEST LOGO.png", alt: "MEST" },
                { src: "/clientpartnerlogos/DDDD.png", alt: "Sika Amankwa" },
              ].map((partner, index) => (
                <motion.div
                  key={partner.alt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all duration-300 group-hover:shadow-lg">
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className="w-full h-32 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
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