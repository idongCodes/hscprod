import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "../FadeIn";

export const metadata: Metadata = {
  title: "About HSC - Music Producer & Beatmaker",
  description: "Meet HSC - Professional music producer specializing in hip hop, drill, and trap beats. Discover the journey, experience, and production style.",
  keywords: ["HSC music producer", "hip hop producer", "beatmaker", "music production", "trap beats", "drill beats", "NYC producer", "music artist"],
  openGraph: {
    title: "About HSC - Music Producer",
    description: "Learn about HSC's journey as a music producer and beatmaker in the NYC hip hop scene.",
    type: "profile",
    images: ["/images/hsc_logo_blk_bg.JPG"],
    url: "https://hscprod.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About HSC - Music Producer",
    description: "Professional music producer specializing in hip hop, drill, and trap beats.",
    images: ["/images/hsc_logo_blk_bg.JPG"],
  },
};

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
                    Trap
                  </span>
                  <span className="px-4 py-1 rounded-full border border-gray-700 text-gray-300 text-sm hover:border-white transition-colors">
                    R&B
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

                {/* Social Links */}
                <div className="mt-6 flex gap-4 items-center">
                  <Link 
                    href="https://soundcloud.com/hunter-cute/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-gray-700 bg-white/5 text-gray-400 hover:text-purple-400 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-110"
                    aria-label="SoundCloud"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17v-3.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V17c0 .8-.7 1.5-1.5 1.5S3 17.8 3 17zm8-10v10c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V7c0-.8.7-1.5 1.5-1.5S11 6.2 11 7zm4-2v12c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V5c0-.8.7-1.5 1.5-1.5S15 4.2 15 5zm8 4v8c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V9c0-.8.7-1.5 1.5-1.5S23 8.2 23 9z"/>
                    </svg>
                  </Link>
                  <Link 
                    href="https://www.instagram.com/hunter__cute/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-gray-700 bg-white/5 text-gray-400 hover:text-purple-400 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-3.77 4.933A3.15 3.15 0 005.411 10.08v3.84c0 1.737 1.411 3.146 3.147 3.146h3.858a3.15 3.15 0 003.147-3.146v-3.84a3.15 3.15 0 00-3.147-3.147H8.545zm3.436 1.538c.95 0 1.72.77 1.72 1.72 0 .95-.77 1.72-1.72 1.72-.95 0-1.72-.77-1.72-1.72 0-.95.77-1.72 1.72-1.72zm4.186-2.227a1.07 1.07 0 11-2.14 0 1.07 1.07 0 012.14 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </FadeIn>
      </div>
    </div>
  );
}