"use client";

import { useState, useEffect } from "react";
import FadeIn from "../FadeIn";

interface Venue {
  id: string;
  name: string;
  date: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  description?: string;
}

export default function IRL() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for venues HSC has performed at
    const mockVenues: Venue[] = [
      {
        id: "1",
        name: "Brooklyn Music Hall",
        date: "2024-12-15",
        location: "Brooklyn, NY",
        status: "completed",
        description: "Headlined with local NY Drill artists"
      },
      {
        id: "2", 
        name: "Manhattan Underground",
        date: "2024-11-20",
        location: "Manhattan, NY",
        status: "completed",
        description: "Exclusive showcase event"
      },
      {
        id: "3",
        name: "Queens Warehouse Party",
        date: "2025-01-25",
        location: "Queens, NY", 
        status: "upcoming",
        description: "Jersey Club & NY Drill night"
      },
      {
        id: "4",
        name: "Bronx Hip Hop Summit",
        date: "2025-02-14",
        location: "Bronx, NY",
        status: "upcoming", 
        description: "Producer showcase & networking"
      }
    ];

    setVenues(mockVenues);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-32 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading venues...</div>
      </div>
    );
  }

  const upcomingVenues = venues.filter(v => v.status === "upcoming");
  const pastVenues = venues.filter(v => v.status === "completed");

  return (
    <div className="min-h-screen bg-black pt-32 pb-32 px-4">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        
        <FadeIn>
          <div className="mb-16 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              HSC<span className="text-purple-500"> IRL</span>
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Live performances and venue appearances. 
              We Outside, pop out and support HSC.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-24">
          
          {/* Upcoming Shows */}
          <FadeIn delay={0.1}>
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-purple-600 px-4 text-left">
                Upcoming Shows
              </h2>

              <div className="flex flex-col gap-6">
                {upcomingVenues.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No upcoming shows scheduled.</p>
                    <p className="text-gray-500 text-sm mt-2">Check back soon for new dates!</p>
                  </div>
                ) : (
                  upcomingVenues.map((venue) => (
                    <div 
                      key={venue.id}
                      className="bg-white/5 border border-white/10 hover:border-purple-500/50 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 transition-all hover:bg-white/[0.07]"
                    >
                      <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-bold text-white mb-2">{venue.name}</h3>
                        <p className="text-purple-400 text-sm mb-1">{venue.date}</p>
                        <p className="text-gray-300 text-sm mb-3">{venue.location}</p>
                        {venue.description && (
                          <p className="text-gray-400 text-sm">{venue.description}</p>
                        )}
                      </div>

                      <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
                        <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg px-6 py-3 text-center">
                          <span className="text-purple-300 text-sm font-medium">UPCOMING</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </FadeIn>

          {/* Past Shows */}
          <FadeIn delay={0.2}>
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-8 border-r-4 border-purple-600 px-4 text-right">
                Past Shows
              </h2>

              <div className="flex flex-col gap-6">
                {pastVenues.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No past shows yet.</p>
                    <p className="text-gray-500 text-sm mt-2">First show coming soon!</p>
                  </div>
                ) : (
                  pastVenues.map((venue) => (
                    <div 
                      key={venue.id}
                      className="bg-white/5 border border-white/10 hover:border-purple-500/50 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 transition-all hover:bg-white/[0.07]"
                    >
                      <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-bold text-white mb-2">{venue.name}</h3>
                        <p className="text-purple-400 text-sm mb-1">{venue.date}</p>
                        <p className="text-gray-300 text-sm mb-3">{venue.location}</p>
                        {venue.description && (
                          <p className="text-gray-400 text-sm">{venue.description}</p>
                        )}
                      </div>

                      <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
                        <div className="bg-green-600/20 border border-green-500/30 rounded-lg px-6 py-3 text-center">
                          <span className="text-green-300 text-sm font-medium">COMPLETED</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </FadeIn>

        </div>

        {/* CALL TO ACTION SECTION */}
        <div className="mt-16">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-purple-900/10 to-purple-800/5 rounded-2xl p-12 border border-purple-500/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Want HSC at Your <span className="text-purple-500">Venue?</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Looking to book HSC for a show or event? 
                From club performances to festival appearances, HSC brings the vibe and professionalism you need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
                  Book HSC
                </a>
                <a 
                  href="/contact" 
                  className="px-8 py-3 rounded-full border border-gray-600 text-gray-200 font-medium hover:border-purple-500 hover:text-white transition-colors backdrop-blur-sm bg-black/30"
                >
                  Get Info
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
