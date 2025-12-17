import Link from "next/link";
import Image from "next/image";
import ContactForm from "./ContactForm"; // <--- Import the new component

export default function Home() {
  return (
    <div className="w-full bg-black">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
        
        {/* Layer 1: Background Image */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Image 
            src="/images/hero.jpg" 
            alt="Studio Background" 
            fill={true}
            className="object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        {/* Layer 2: Purple Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-900/40 blur-[100px] rounded-full pointer-events-none z-0" />

        {/* Layer 3: Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-xl">
            Create. Capture. <span className="text-purple-500">Inspire.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Welcome to HSC Prod. We specialize in high-quality audio recording and visual storytelling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] w-full sm:w-auto">
              Start a Project
            </Link>
            <Link href="/gallery" className="px-8 py-3 rounded-full border border-gray-600 text-gray-200 font-medium hover:border-purple-500 hover:text-white transition-colors w-full sm:w-auto backdrop-blur-sm bg-black/30">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTACT FORM */}
      <section className="relative py-24 px-4 border-t border-white/10">
        <div className="relative z-10">
           {/* We just drop the component in here! */}
           <ContactForm />
        </div>
      </section>

    </div>
  );
}
