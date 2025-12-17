"use client";

import Link from "next/link";
import ContactForm from "../ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Main Split-Card Container */}
      <div className="relative z-10 w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT SIDE: The Contact Form */}
        {/* We use a CSS trick ([&>div]:...) to strip the inner card styles so it blends in */}
        <div className="w-full md:w-1/2 p-2 md:p-6 [&>div]:border-none [&>div]:shadow-none [&>div]:bg-transparent [&>div]:max-w-none">
          <ContactForm />
        </div>

        {/* MIDDLE: Vertical Divider (Visible on Desktop only) */}
        <div className="hidden md:block w-px bg-white/10 my-10"></div>
        
        {/* Horizontal Divider (Visible on Mobile only) */}
        <div className="block md:hidden h-px w-full bg-white/10 mx-6"></div>

        {/* RIGHT SIDE: Social Media */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-white/[0.02]">
          
          <h2 className="text-2xl font-bold text-white mb-8">
            Follow me on Social Media
          </h2>

          {/* Instagram Icon Link */}
          <Link 
            href="https://www.instagram.com/hunter__cute/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-4 rounded-full border border-gray-700 bg-white/5 text-gray-400 group-hover:text-purple-400 group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all duration-300 transform group-hover:scale-110">
              {/* Instagram SVG Icon */}
              <svg 
                className="w-10 h-10" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-3.77 4.933A3.15 3.15 0 005.411 10.08v3.84c0 1.737 1.411 3.146 3.147 3.146h3.858a3.15 3.15 0 003.147-3.146v-3.84a3.15 3.15 0 00-3.147-3.147H8.545zm3.436 1.538c.95 0 1.72.77 1.72 1.72 0 .95-.77 1.72-1.72 1.72-.95 0-1.72-.77-1.72-1.72 0-.95.77-1.72 1.72-1.72zm4.186-2.227a1.07 1.07 0 11-2.14 0 1.07 1.07 0 012.14 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          
        </div>

      </div>
    </div>
  );
}
