"use client";

import {Menu, X} from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { BrandingSF_Font, Pacifico_Regular } from "@/lib/font";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative w-full bg-transparent">
      {/* Navbar */}
      <div className="flex justify-between items-center py-4 px-8 w-full bg-white">
        <div className={`${Pacifico_Regular.className} text-xl`}>Open Note</div>
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-800 hover:text-black">Pricing</a>
          <a href="#" className="text-gray-800 hover:text-black">Help</a>
          <a href="#" className="text-gray-800 hover:text-black">Blog</a>
          <a href="#" className="text-gray-800 hover:text-black">Updates</a>
          <a href="#" className="text-gray-800 hover:text-black">Sign In</a>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Animated Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-screen backdrop-blur-lg shadow-lg p-6 md:hidden"
        >
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-lg font-semibold ${Pacifico_Regular.className}`}>Open Note</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className={`mt-4 space-y-4 ${BrandingSF_Font.className}`}>
              <a href="#" className="block text-gray-800 hover:text-black">Pricing</a>
              <a href="#" className="block text-gray-800 hover:text-black">Help</a>
              <a href="#" className="block text-gray-800 hover:text-black">Blog</a>
              <a href="#" className="block text-gray-800 hover:text-black">Updates</a>
              <a href="#" className="block text-gray-800 hover:text-black">Sign In</a>
            </nav>
          </div>
        </motion.div>
      )}
    </div>
  );
}
