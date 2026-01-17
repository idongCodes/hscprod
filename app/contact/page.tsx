"use client";

import Link from "next/link";
import ContactForm from "../ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Main Split-Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT SIDE: The Contact Form */}
        <div className="w-full md:w-1/2 p-2 md:p-6 [&>div]:border-none [&>div]:shadow-none [&>div]:bg-transparent [&>div]:max-w-none">
          <ContactForm />
        </div>

        {/* MIDDLE: Vertical Divider */}
        <div className="hidden md:block w-px bg-white/10 my-10"></div>
        <div className="block md:hidden h-px w-full bg-white/10 mx-6"></div>

        {/* RIGHT SIDE: Map & Socials */}
        <div className="w-full md:w-1/2 flex flex-col">
          
          {/* 1. GOOGLE MAP WIDGET */}
          {/* We use h-64 to give it height, and filters to make it 'Dark Mode' */}
          <div className="w-full h-64 md:h-1/2 relative bg-gray-900">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47783.59367272849!2d-71.18375635815695!3d41.70132697208119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e4f8d224213d2d%3A0xc35ceb630043810!2sFall%20River%2C%20MA!5e0!3m2!1sen!2sus!4v1709500000000!5m2!1sen!2sus" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: "grayscale(1) invert(1)" }} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="opacity-80 hover:opacity-100 transition-opacity duration-500"
             ></iframe>
             
             {/* Map Overlay Text (Optional) */}
             <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-xs text-white font-medium">
                📍 Based in Fall River, MA
             </div>
          </div>

          {/* 2. SOCIAL MEDIA SECTION */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-white/[0.02] border-t border-white/10">
            
            <h2 className="text-xl font-bold text-white mb-6">
              Follow me on Social Media
            </h2>

            <div className="flex gap-6 justify-center">
              {/* SoundCloud Icon Link */}
              <Link 
                href="https://soundcloud.com/hunter-cute/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="p-4 rounded-full border border-gray-700 bg-white/5 text-gray-400 group-hover:text-purple-400 group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all duration-300 transform group-hover:scale-110">
                  <svg 
                    className="w-8 h-8" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                  >
                    <path d="M3 17v-3.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V17c0 .8-.7 1.5-1.5 1.5S3 17.8 3 17zm8-10v10c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V7c0-.8.7-1.5 1.5-1.5S11 6.2 11 7zm4-2v12c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V5c0-.8.7-1.5 1.5-1.5S15 4.2 15 5zm8 4v8c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V9c0-.8.7-1.5 1.5-1.5S23 8.2 23 9z"/>
                  </svg>
                </div>
              </Link>

              {/* Instagram Icon Link */}
              <Link 
                href="https://www.instagram.com/hunter__cute/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="p-4 rounded-full border border-gray-700 bg-white/5 text-gray-400 group-hover:text-purple-400 group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all duration-300 transform group-hover:scale-110">
                  <svg 
                    className="w-8 h-8" 
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

      </div>
    </div>
  );
}