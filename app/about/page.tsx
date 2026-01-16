"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "../FadeIn";

export default function About() {
  // Calculate HSC's age based on birth date August 9, 2001
  const birthDate = new Date('2001-08-09');
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear() - 
    (today.getMonth() < birthDate.getMonth() || 
     (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 flex items-center overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-screen-xl mx-auto w-full relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            
            {/* 1. THE PROFILE IMAGE */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden">
                <Image 
                  src="/images/about.png" 
                  alt="HSC Prod Profile" 
                  fill={true}
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>

            {/* 2. THE BIO TEXT */}
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                HSC <span className="text-purple-500">Productions</span>
              </h1>

              {/* --- NEW SECTION: PERSONAL DETAILS --- */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                   <span>📍 Brooklyn, NY</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                   <span>🇮🇪 Irish</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                   <span>🎂 {age} (Leo)</span>
                </div>
              </div>

              {/* --- NEW SECTION: GENRES --- */}
              <div className="mb-8">
                <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-3">Specializing In</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-4 py-1 rounded-full border border-purple-500/50 text-white text-sm bg-purple-500/10">
                    NY Drill
                  </span>
                  <span className="px-4 py-1 rounded-full border border-gray-700 text-gray-300 text-sm hover:border-white transition-colors">
                    Dark Trap
                  </span>
                  <span className="px-4 py-1 rounded-full border border-gray-700 text-gray-300 text-sm hover:border-white transition-colors">
                    Jersey Club
                  </span>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  HSC is a music producer and audio engineer dedicated to crafting unique soundscapes. 
                  Their goal is to help artists find their signature sound and bring their creative vision to life 
                  with industry-standard quality.
                </p>
                <p>
                  With a focus on high-energy instrumentals and clean vocal mixing, HSC strives to create 
                  music that not only sounds professional but feels right. Whether you need a custom beat, 
                  mixing and mastering, or full project production, HSC is here to work.
                </p>
              </div>

              {/* Stats / Quick Info */}
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">{age - 15}+</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Years Exp</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">100+</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Projects</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">24/7</h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Grind</p>
                </div>
              </div>

              {/* BUTTONS (Stacked) */}
              <div className="mt-8 flex flex-col gap-4 items-center md:items-start">
                
                {/* Beats/Tracks Button */}
                <Link 
                  href="/media" 
                  className="w-full md:w-auto text-center px-8 py-3 rounded-full border border-gray-600 text-gray-200 font-medium hover:border-purple-500 hover:text-white transition-colors backdrop-blur-sm bg-black/30"
                >
                  Beats/Tracks
                </Link>

                {/* Work with Me Button */}
                <Link 
                  href="/contact" 
                  className="w-full md:w-auto text-center px-8 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
                  Work with Me
                </Link>

              </div>

            </div>

          </div>
        </FadeIn>
      </div>
    </div>
  );
}