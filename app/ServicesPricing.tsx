import FadeIn from "./FadeIn";

export default function ServicesPricing() {
  return (
    <section className="relative py-24 px-4 border-t border-white/10">
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Services & <span className="text-purple-500">Pricing</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Professional audio production services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Beats Section */}
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Beats</h3>
              
              <div className="space-y-6">
                <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Pre-Made Beats</h4>
                  <p className="text-3xl font-bold text-white mb-2">$35</p>
                  <p className="text-gray-300 text-sm">High-quality pre-crafted instrumentals ready for your vocals</p>
                </div>
                
                <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Custom Beats</h4>
                  <p className="text-3xl font-bold text-white mb-2">$45</p>
                  <p className="text-gray-300 text-sm">Tailor-made beats crafted specifically for your vision</p>
                </div>
              </div>
            </div>

            {/* Audio Engineering Section */}
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Audio Engineering/Mixing & Mastering</h3>
              
              <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50 mb-6">
                <p className="text-gray-300 text-sm mb-4 italic">
                  (All pre-made beats come mixed/mastered already. This applies to those who need mixing/mastering on their project)
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Beats</h4>
                  <p className="text-3xl font-bold text-white mb-2">$50</p>
                  <p className="text-gray-300 text-sm">Professional mixing and mastering for your beats</p>
                </div>
                
                <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">Vocals/Full Song</h4>
                  <p className="text-3xl font-bold text-white mb-2">$75</p>
                  <p className="text-gray-300 text-sm">Complete vocal processing and full song mixing/mastering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Projects Section */}
          <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-2xl p-8 border border-purple-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Full Project Production</h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
              HSC has experience with crafting beats for full projects as well. No matter if your project ranges from 3 songs to 20+ songs, 
              HSC will work with you to either craft beats or share some pre-made beats that match what you need as a customer 
              for either some of your project or the entire experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]"
              >
                Discuss Your Project
              </a>
              <a 
                href="/media" 
                className="px-8 py-3 rounded-full border border-gray-600 text-gray-200 font-medium hover:border-purple-500 hover:text-white transition-colors backdrop-blur-sm bg-black/30"
              >
                View Beats
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
