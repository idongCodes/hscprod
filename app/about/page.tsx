"use client";

import Image from "next/image";
import FadeIn from "../FadeIn";

export default function About() {
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
              {/* UPDATED HEADING */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                HSC <span className="text-purple-500">Productions</span>
              </h1>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  I am a music producer and audio engineer dedicated to crafting unique soundscapes. 
                  My goal is to help artists find their signature sound and bring their creative vision to life 
                  with industry-standard quality.
                </p>
                <p>
                  With a focus on high-energy instrumentals and clean vocal mixing, I strive to create 
                  music that not only sounds good but feels right. Whether you need a custom beat, 
                  mixing and mastering, or full project production, I'm here to work.
                </p>
              </div>

              {/* Stats / Quick Info */}
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">5+</h3>
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

            </div>

          </div>
        </FadeIn>
      </div>
    </div>
  );
}