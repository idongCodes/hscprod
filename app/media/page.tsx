"use client";

import { useState, useEffect } from "react";
import FadeIn from "../FadeIn";
import { AudioTrack } from "@/lib/database";

export default function Media() {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const response = await fetch('/api/tracks');
        if (!response.ok) throw new Error('Failed to fetch tracks');
        const audioTracks = await response.json();
        setTracks(audioTracks);
      } catch (error) {
        console.error('Error loading tracks:', error);
        // Fallback to hardcoded tracks if API fails
        setTracks([
          { id: "1", title: "Brooklyn Nights", genre: "NY Drill", duration: "2:45", price: 29.99, audio_url: "/audio/drill1.mp3", created_at: "", updated_at: "" },
          { id: "2", title: "Ops Outside", genre: "NY Drill", duration: "3:10", price: 29.99, audio_url: "/audio/drill2.mp3", created_at: "", updated_at: "" },
          { id: "3", title: "No Suburban", genre: "NY Drill", duration: "2:55", price: 29.99, audio_url: "/audio/drill3.mp3", created_at: "", updated_at: "" },
          { id: "4", title: "Glacier", genre: "NY Drill", duration: "3:05", price: 34.99, audio_url: "/audio/drill4.mp3", created_at: "", updated_at: "" },
          { id: "5", title: "Demon Time", genre: "NY Drill", duration: "2:30", price: 29.99, audio_url: "/audio/drill5.mp3", created_at: "", updated_at: "" },
          { id: "6", title: "Nightmare", genre: "Dark Trap", duration: "3:20", price: 24.99, audio_url: "/audio/trap1.mp3", created_at: "", updated_at: "" },
          { id: "7", title: "Shadow Realm", genre: "Dark Trap", duration: "2:50", price: 24.99, audio_url: "/audio/trap2.mp3", created_at: "", updated_at: "" },
          { id: "8", title: "Graveyard Shift", genre: "Dark Trap", duration: "3:15", price: 29.99, audio_url: "/audio/trap3.mp3", created_at: "", updated_at: "" },
          { id: "9", title: "Venom", genre: "Dark Trap", duration: "2:40", price: 24.99, audio_url: "/audio/trap4.mp3", created_at: "", updated_at: "" },
          { id: "10", title: "Abyss", genre: "Dark Trap", duration: "3:30", price: 29.99, audio_url: "/audio/trap5.mp3", created_at: "", updated_at: "" },
          { id: "11", title: "Club Luv", genre: "Jersey Club", duration: "2:15", price: 19.99, audio_url: "/audio/jersey1.mp3", created_at: "", updated_at: "" },
          { id: "12", title: "Bounce Back", genre: "Jersey Club", duration: "2:10", price: 19.99, audio_url: "/audio/jersey2.mp3", created_at: "", updated_at: "" },
          { id: "13", title: "Bed Squeak Anthem", genre: "Jersey Club", duration: "2:20", price: 24.99, audio_url: "/audio/jersey3.mp3", created_at: "", updated_at: "" },
          { id: "14", title: "Fast Life", genre: "Jersey Club", duration: "2:05", price: 19.99, audio_url: "/audio/jersey4.mp3", created_at: "", updated_at: "" },
          { id: "15", title: "Heartbeat", genre: "Jersey Club", duration: "2:30", price: 24.99, audio_url: "/audio/jersey5.mp3", created_at: "", updated_at: "" },
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
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        
        {/* Header */}
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

        {/* GENRE SECTIONS */}
        <div className="space-y-24">
          {genres.map((genre, sectionIndex) => (
            <FadeIn key={genre} delay={sectionIndex * 0.1}>
              <div className="relative">
                
                {/* Genre Title - Alternating Alignment */}
                <h2 className={`text-2xl font-bold text-white mb-8 border-purple-600 px-4 ${sectionIndex % 2 === 0 ? 'border-l-4 text-left' : 'border-r-4 text-right'}`}>
                  {genre}
                </h2>

                {/* Track List */}
                <div className="flex flex-col gap-6">
                  {tracks
                    .filter((t: AudioTrack) => t.genre === genre)
                    .map((track: AudioTrack, i: number) => {
                      // Determine if this is an "Even" or "Odd" row for zig-zag
                      const isEven = i % 2 === 0;

                      return (
                        <div 
                          key={track.id}
                          // Flex-row for even, Flex-row-reverse for odd
                          className={`group bg-white/5 border border-white/10 hover:border-purple-500/50 rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 transition-all hover:bg-white/[0.07] ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                          
                          {/* 1. Play Icon / Visual */}
                          <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </div>

                          {/* 2. Track Info (Alignment flips based on row) */}
                          <div className={`flex-1 w-full text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                            <h3 className="text-white font-bold text-lg">{track.title}</h3>
                            <div className={`flex justify-center gap-3 text-xs text-gray-400 uppercase tracking-wider mt-1 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                              <span>{track.duration}</span>
                              <span>•</span>
                              <span className="text-purple-400">${track.price}</span>
                            </div>
                          </div>

                          {/* 3. Audio Player */}
                          <div className="w-full md:w-1/3">
                            <audio 
                              controls 
                              className="w-full h-8 opacity-60 hover:opacity-100 transition-opacity invert hue-rotate-180"
                              onPlay={() => setPlayingId(track.id)}
                            >
                              <source src={track.audio_url} type="audio/mpeg" />
                            </audio>
                          </div>

                          {/* 4. Buy Button */}
                          <button className="px-6 py-2 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-purple-600 transition-colors shrink-0 uppercase tracking-widest border border-white/5 hover:border-purple-500">
                            Add to Cart
                          </button>

                        </div>
                      );
                    })}
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
}