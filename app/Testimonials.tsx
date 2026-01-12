"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  message: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        const testimonials = await response.json();
        setReviews(testimonials);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        // Fallback to default testimonials if API fails
        setReviews([
          {
            id: "1",
            name: "Yung Fader",
            title: "Producer",
            message: "The drum kits are absolutely lethal. Cleanest 808s I've ever used in a production. HSC really knows how to mix the low end.",
            is_approved: true,
            created_at: "",
            updated_at: ""
          },
          {
            id: "2",
            name: "Melody Queen",
            title: "R&B Artist",
            message: "HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.",
            is_approved: true,
            created_at: "",
            updated_at: ""
          },
          {
            id: "3",
            name: "Da Architect",
            title: "Sound Engineer",
            message: "Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.",
            is_approved: true,
            created_at: "",
            updated_at: ""
          },
          {
            id: "4",
            name: "Spitfire",
            title: "Rapper",
            message: "Bought a lease, recorded the track, and it's already doing numbers on Spotify. HSC production value is industry standard.",
            is_approved: true,
            created_at: "",
            updated_at: ""
          },
          {
            id: "5",
            name: "Neon Keys",
            title: "Producer",
            message: "Collab was smooth. We sent files back and forth and made a banger in 48 hours. Looking forward to the next project.",
            is_approved: true,
            created_at: "",
            updated_at: ""
          },
          {
            id: "6",
            name: "Vocalz Only",
            title: "Artist",
            message: "Finally found a producer who actually listens to the vision instead of just forcing their own style. 10/10 recommend.",
            is_approved: true,
            created_at: "",
            updated_at: ""
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Listen for new testimonials from the form
  useEffect(() => {
    const handleNewTestimonial = (event: CustomEvent) => {
      // Add new testimonial to the top of the list
      setReviews(prevReviews => [event.detail, ...prevReviews]);
    };

    window.addEventListener('newTestimonial', handleNewTestimonial as EventListener);
    
    return () => {
      window.removeEventListener('newTestimonial', handleNewTestimonial as EventListener);
    };
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="text-white text-xl">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
       
       {/* Background Glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

       <div className="max-w-screen-xl mx-auto px-4 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Street Cred</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real feedback from artists and producers creating waves with HSC sounds.
            </p>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.filter(review => review && review.name && review.title && review.message).map((review, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                            {review.name?.[0] || '?'}
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">{review.name}</h3>
                            <p className="text-purple-400 text-xs uppercase tracking-wider font-bold">{review.title}</p>
                        </div>
                    </div>
                    <p className="text-gray-300 italic leading-relaxed">&ldquo;{review.message}&rdquo;</p>
                </div>
            ))}
          </div>
       </div>
    </section>
  );
}
