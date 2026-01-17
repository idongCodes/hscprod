"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Define links with their corresponding Icons
  const navItems = [
    { 
      name: "About", 
      href: "/about", 
      // User/Profile Icon
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      name: "Media", 
      href: "/media", 
      // Play/Media Icon
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: "Gallery", 
      href: "/gallery", 
      // Grid/Photo Icon
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: "IRL", 
      href: "/irl", 
      // Venue/Location Icon
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657l-1.414-1.414a2 2 0 00-2.828 0l-4.586-4.586a2 2 0 00-2.828 0L16 16m-2-2l1.414-1.414a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: "Contact", 
      href: "/contact", 
      // Mail/Message Icon
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <>
      {/* ----------------- TOP NAVBAR (Logo & Desktop Links) ----------------- */}
      <nav className="fixed top-0 w-full z-50 bg-transparent md:bg-black/50 md:backdrop-blur-md transition-all pointer-events-none md:pointer-events-auto">
        <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-3 flex justify-center md:justify-between items-center pointer-events-auto">
          
          {/* LOGO */}
          <Link href="/">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-purple-500/50 hover:border-purple-400 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Image 
                src="/images/hsc_logo_blk_bg.JPG" 
                alt="HSC Prod" 
                fill={true}
                className="object-cover"
              />
            </div>
          </Link>

          {/* DESKTOP MENU (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href) 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-300 hover:bg-purple-600 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* LOGOUT ICON (only when authenticated) */}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="hidden md:flex items-center justify-center w-10 h-10 text-gray-600 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer rounded-full hover:bg-red-400/10"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}

        </div>
      </nav>

      {/* ----------------- BOTTOM FLOATING PILL (Mobile Icons Only) ----------------- */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-2xl shadow-purple-900/20 flex items-center gap-8">
          
          {/* Home Icon */}
          <Link href="/" className={`transition-colors ${isActive("/") ? "text-purple-500 scale-110" : "text-gray-400 hover:text-white"}`}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
             </svg>
             <span className="sr-only">Home</span>
          </Link>

          {/* Mapped Icons */}
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className={`transition-all duration-300 ${
                isActive(item.href) ? "text-purple-500 scale-110" : "text-gray-400 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}

          {/* Logout Icon (Mobile Only) */}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="md:hidden flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer"
              title="Logout"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="sr-only">Logout</span>
            </button>
          )}

        </div>
      </div>
    </>
  );
}