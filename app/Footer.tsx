"use client";

import Link from "next/link";
import { useState } from "react";
import AdminLoginModal from "./AdminLoginModal";
import { useAuth } from "./AuthProvider";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const handleAdminClick = () => {
    if (isAuthenticated) {
      // Already authenticated, go directly to dashboard
      window.location.href = '/dashboard';
    } else {
      // Not authenticated, show login modal
      setIsModalOpen(true);
    }
  };

  const handleAdminSuccess = () => {
    login();
    setIsModalOpen(false);
    // Wait a moment for session to be saved before redirecting
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 100);
  };

  return (
    // FIX: Changed 'py-8' to 'pt-8 pb-32 md:pb-8'
    // This adds huge bottom padding on mobile (pb-32) so content clears the nav
    // On desktop (md:pb-8), it returns to normal size
    <footer className="w-full bg-black border-t border-white/10 pt-8 pb-32 md:pb-8 text-center md:text-left">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Copyright */}
        <div className="text-gray-500 text-sm">
          &copy; {currentYear} HSC Prod. All rights reserved.
        </div>

        {/* Right Side: Developer Credit */}
        <div className="text-gray-500 text-sm">
          Website by{" "}
          <Link 
            href="https://idong-essien.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
          >
            idongCodes
          </Link>
        </div>

        {/* Far Right: Admin Login */}
        <div className="text-gray-900 text-sm">
          <button
            onClick={handleAdminClick}
            className="text-gray-700 hover:text-purple-400 transition-colors font-medium flex items-center gap-2 bg-transparent border-none cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Admin
          </button>
        </div>

        <AdminLoginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAdminSuccess}
        />

      </div>
    </footer>
  );
}