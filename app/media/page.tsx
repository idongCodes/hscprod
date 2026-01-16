"use client";

import { useState, useEffect } from "react";
import FadeIn from "../FadeIn";
import Image from "next/image";

interface AudioTrack {
  id: string;
  title: string;
  genre: string;
  duration: string;
  audio_url: string;
  artist_image?: string;
  created_at: string;
  updated_at: string;
}

export default function Media() {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const response = await fetch('/api/tracks-auto');
        if (!response.ok) throw new Error('Failed to fetch tracks');
        const audioTracks = await response.json();
        setTracks(audioTracks);
        console.log('Loaded tracks from auto-scanned files:', audioTracks);
      } catch (error) {
        console.error('Error loading tracks:', error);
        // Fallback to hardcoded tracks if auto-scan fails
        setTracks([
          { id: "1", title: "Brooklyn Nights", genre: "NY Drill", duration: "2:45", audio_url: "/audio/drill1.mp3", created_at: "", updated_at: "" },
          { id: "2", title: "Ops Outside", genre: "NY Drill", duration: "3:10", audio_url: "/audio/drill2.mp3", created_at: "", updated_at: "" },
          { id: "3", title: "No Suburban", genre: "NY Drill", duration: "2:55", audio_url: "/audio/drill3.mp3", created_at: "", updated_at: "" },
          { id: "4", title: "Glacier", genre: "NY Drill", duration: "3:05", audio_url: "/audio/drill4.mp3", created_at: "", updated_at: "" },
          { id: "5", title: "Demon Time", genre: "NY Drill", duration: "2:30", audio_url: "/audio/drill5.mp3", created_at: "", updated_at: "" },
          { id: "6", title: "Nightmare", genre: "Dark Trap", duration: "3:20", audio_url: "/audio/trap1.mp3", created_at: "", updated_at: "" },
          { id: "7", title: "Shadow Realm", genre: "Dark Trap", duration: "2:50", audio_url: "/audio/trap2.mp3", created_at: "", updated_at: "" },
          { id: "8", title: "Graveyard Shift", genre: "Dark Trap", duration: "3:15", audio_url: "/audio/trap3.mp3", created_at: "", updated_at: "" },
          { id: "9", title: "Venom", genre: "Dark Trap", duration: "2:40", audio_url: "/audio/trap4.mp3", created_at: "", updated_at: "" },
          { id: "10", title: "Abyss", genre: "Dark Trap", duration: "3:30", audio_url: "/audio/trap5.mp3", created_at: "", updated_at: "" },
          { id: "11", title: "Club Luv", genre: "Jersey Club", duration: "2:15", audio_url: "/audio/jersey1.mp3", created_at: "", updated_at: "" },
          { id: "12", title: "Bounce Back", genre: "Jersey Club", duration: "2:10", audio_url: "/audio/jersey2.mp3", created_at: "", updated_at: "" },
          { id: "13", title: "Bed Squeak Anthem", genre: "Jersey Club", duration: "2:20", audio_url: "/audio/jersey3.mp3", created_at: "", updated_at: "" },
          { id: "14", title: "Fast Life", genre: "Jersey Club", duration: "2:05", audio_url: "/audio/jersey4.mp3", created_at: "", updated_at: "" },
          { id: "15", title: "Heartbeat", genre: "Jersey Club", duration: "2:30", audio_url: "/audio/jersey5.mp3", created_at: "", updated_at: "" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadTracks();
  }, []);

  const genres = Array.from(new Set(tracks.map(track => track.genre)));

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-32 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading beats...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-32 px-4">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        
        <FadeIn>
          <div className="mb-16 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Beats & <span className="text-purple-500">Tracks</span>
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Browse the catalog. All beats are untagged after purchase. 
              Instant download available.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-24">
          {genres.map((genre, sectionIndex) => (
            <FadeIn key={genre} delay={sectionIndex * 0.1}>
              <div className="relative">
                
                <h2 className={`text-2xl font-bold text-white mb-8 border-purple-600 px-4 ${sectionIndex % 2 === 0 ? 'border-l-4 text-left' : 'border-r-4 text-right'}`}>
                  {genre}
                </h2>

                <div className="flex flex-col gap-6">
                  {tracks
                    .filter((t: AudioTrack) => t.genre === genre)
                    .map((track: AudioTrack, i: number) => {
                      const isEven = i % 2 === 0;

                      return (
                        <div 
                          key={track.id}
                          className={`group bg-white/5 border border-white/10 hover:border-purple-500/50 rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 transition-all hover:bg-white/[0.07] ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                          
                          {track.artist_image ? (
                            <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                              <Image 
                                src={track.artist_image} 
                                alt={track.title}
                                width={48}
                                height={48}
                                className="object-cover rounded-full"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                          )}

                          <div className={`flex-1 w-full text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                            <h3 className="text-white font-bold text-lg">{track.title}</h3>
                          </div>

                          <div className="w-full md:w-1/3">
                            <audio 
                              controls 
                              className="w-full h-8 opacity-60 hover:opacity-100 transition-opacity invert hue-rotate-180"
                              onPlay={() => setPlayingId(track.id)}
                            >
                              <source src={track.audio_url} type="audio/mpeg" />
                            </audio>
                          </div>

                        </div>
                      );
                    })}
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

        {/* CALL TO ACTION SECTION */}
        <div className="mt-16">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-purple-900/10 to-purple-800/5 rounded-2xl p-12 border border-purple-500/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to <span className="text-purple-500">Create</span>?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Found a beat you love? Need something custom? Let&apos;s work together to bring your vision to life.
                From individual tracks to full album production, HSC has got you covered.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">License a Beat</h3>
                  <p className="text-gray-300 text-sm">
                    Get exclusive rights to any beat from the catalog above
                  </p>
                </div>
                
                <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">Custom Production</h3>
                  <p className="text-gray-300 text-sm">
                    Tailor-made beats crafted specifically for your unique sound
                  </p>
                </div>
                
                <div className="bg-black/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">Full Projects</h3>
                  <p className="text-gray-300 text-sm">
                    Complete album production from start to finish
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
                  Start Your Project
                </a>
                <a 
                  href="/contact" 
                  className="px-8 py-3 rounded-full border border-gray-600 text-gray-200 font-medium hover:border-purple-500 hover:text-white transition-colors backdrop-blur-sm bg-black/30"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}