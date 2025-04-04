"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PartnersPage() {
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between">
            <Link
              href="/partners"
              className="text-2xl font-bold tracking-tight text-[#3975ac]"
            >
              ZUPUTO
            </Link>

            <div className="hidden items-center gap-8 md:flex">
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
                    <span className="absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 transform rounded-full bg-[#3975ac]" />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/partners"
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                href="/partners"
                className="rounded-lg bg-[#3975ac] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
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
              className="mb-16 text-center"
            >
              <span className="mb-6 inline-block rounded-full px-4 py-1 font-sans text-sm font-semibold uppercase tracking-wide text-[#3975ac]">
                Our Partners
              </span>
              <h1 className="mx-auto max-w-3xl font-sans text-4xl font-bold leading-normal text-gray-900 md:text-4xl">
                Collaborating with Industry Leaders to Deliver Excellence
              </h1>
              <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-gray-600">
                We partner with top organizations to bring you unparalleled
                solutions.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-8">
              {[
                {
                  src: "/clientpartnerlogos/adjeley jewelry logo.webp",
                  alt: "Adjeley Jewelry",
                },
                {
                  src: "/clientpartnerlogos/African Angels Academy.png",
                  alt: "African Angels Academy",
                },
                { src: "/clientpartnerlogos/MDF LOGO.png", alt: "MDF Africa" },
                { src: "/clientpartnerlogos/MEST-Logo.png", alt: "MEST" },
                {
                  src: "/clientpartnerlogos/Ace-avenue.png",
                  alt: "Ace Avenue",
                },
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
                      className="h-32 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <div className="whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1 text-sm font-medium text-white shadow-lg">
                        {partner.alt}
                      </div>
                      <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-x-4 border-t-4 border-x-transparent border-t-gray-900" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>


<h1 className="text-3xl text-center mt-6">2</h1>
            <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-8">
              {[
                {
                  src: "/clientpartnerlogos/adjeley jewelry logo.webp",
                  alt: "Adjeley Jewelry",
                },
                {
                  src: "/clientpartnerlogos/African Angels Academy.png",
                  alt: "African Angels Academy",
                },
                { src: "/clientpartnerlogos/MDF LOGO.png", alt: "MDF Africa" },
                { src: "/clientpartnerlogos/MEST-Logo.png", alt: "MEST" },
                {
                  src: "/clientpartnerlogos/Ace-avenue.png",
                  alt: "Ace Avenue",
                },
              ].map((partner, index) => (
                <motion.div
                  key={partner.alt}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100/50 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative p-6">
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className="h-36 w-full object-contain transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-b from-gray-900/10 to-gray-900/80 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-center text-lg font-semibold tracking-wide text-white">
                        {partner.alt}
                      </span>
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
