"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO IMAGE */}
        {/* LOGO FIXED: Uses 'fill' to cover the circle perfectly */}
        <Link href="/">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-purple-500/50 hover:border-purple-400 transition-colors">
            <Image 
              src="/images/logo.jpg" 
              alt="HSC Prod" 
              fill={true}  // <--- This forces it to fill the container
              className="object-cover" // <--- This crops it nicely
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
          <Link href="/about" className="hover:text-purple-400 transition-colors no-underline">
            About
          </Link>
          <Link href="/media" className="hover:text-purple-400 transition-colors no-underline">
            Media
          </Link>
          <Link href="/gallery" className="hover:text-purple-400 transition-colors no-underline">
            Gallery
          </Link>
          <Link href="/contact" className="hover:text-purple-400 transition-colors no-underline">
            Contact
          </Link>
        </div>

        {/* Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl absolute top-full left-0 w-full flex flex-col items-center py-6 space-y-6 text-gray-300 text-lg font-medium shadow-2xl">
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-purple-400 transition-colors no-underline">
            About
          </Link>
          <Link href="/media" onClick={() => setIsOpen(false)} className="hover:text-purple-400 transition-colors no-underline">
            Media
          </Link>
          <Link href="/gallery" onClick={() => setIsOpen(false)} className="hover:text-purple-400 transition-colors no-underline">
            Gallery
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-purple-400 transition-colors no-underline">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
